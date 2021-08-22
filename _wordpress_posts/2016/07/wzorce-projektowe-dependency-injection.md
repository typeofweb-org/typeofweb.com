---
title: 'Wzorce Projektowe: Dependency Injection'
date: 2016-07-07T13:43:00.000Z
isMarkdown: false
status: publish
permalink: wzorce-projektowe-dependency-injection
authors:
  - michal-miszczyszyn
type: post
thumbnail:
  url: https://res.cloudinary.com/type-of-web/wp-content/uploads/2016/07/pexels-photo-262367.jpeg
  width: 1920
  height: 1200
categories:
  - slug: javascript
    name: JavaScript
  - slug: dobry-kod
    name: Dobry Kod
seo: {}
---

Wiele razy wspominałem o wstrzykiwaniu zależności, nigdy jednak nie wytłumaczyłem tego konceptu do końca. Na czym polega wzorzec <em>Dependency Injection</em> i jakie problemy rozwiązuje? W tym artykule chciałbym odpowiedzieć na te pytania oraz omówić teorię stojącą za wstrzykiwaniem zależności.

<h1 id="problempowizanychzalenoci">Problem powiązanych zależności</h1>

Technologia nie ma tutaj dużego znaczenia, gdyż te same koncepcje i problemy pojawiają się w dowolnym języku programowania. Przejdźmy od razu do konkretnego przykładu napisanego w JavaScripcie. Wyobraźmy sobie, że tworzymy aplikację, której jednym z zadań jest wysyłanie maili. Aplikacja w celu wysłania wiadomości potrzebuje stworzyć instancję serwisu odpowiedzialnego za obsługę maili:

<pre><code class="language-javascript">class App {  
    constructor() {
        this.emailService = new EmailService();
    }

    sendEmail(message, receiver) {
        this.emailService.send(message, receiver);
    }
}
</code></pre>

Wysłanie maila następowałoby w taki sposób:

<pre><code class="language-javascript">// bootstrap
const app = new App();  
app.sendEmail(myMessage, address);  
</code></pre>

Na pierwszy rzut oka nie widać właściwie żadnego problemu z tym kodem, prawda? Jednak jeśli się bardziej zastanowimy to dojdziemy do wniosku, że już w tak prostym przypadku pojawia się kilka kłopotów:

<ul>
<li>klasa <code>App</code> jest odpowiedzialna za stworzenie instancji serwisu <code>mailService</code> – oznacza to <strong>zakodowaną na stałe zależność</strong>. W przypadku gdybyśmy chcieli w przyszłości zamienić <code>EmailService</code> na <code>EmailService2</code> musielibyśmy zmodyfikować kod klasy <code>App</code></li>
<li>jeśli zechcemy do klasy <code>EmailService</code> dodać np. obsługę wiadomości SMS to będziemy musieli <strong>nie tylko zmodyfikować tę klasę, ale także klasę <code>App</code></strong></li>
<li>jeśli <code>EmailService</code> samemu będzie potrzebował mieć jakieś zależności to klasa <code>App</code> również musi być ich świadoma i mu je przekazać</li>
<li><strong>testowanie aplikacji jest utrudnione</strong>, gdyż przy każdym uruchomieniu testów odpalana jest także funkcja <code>emailService.send(…)</code> na prawdziwej instancji <code>emailService</code> co  powoduje wysłanie maili; aby temu zaradzić, musielibyśmy przechwycić te wywołania gdzieś na wyższym poziomie, bo nie ma łatwej możliwości podmiany zależności tylko na czas testów</li>
<li>dodatkowo, co ważne szczególnie w przypadku aplikacji JavaScriptowych, musimy zadbać o to, aby plik <code>emailService.js</code> był koniecznie <strong>wczytany przez przeglądarkę przed plikiem <code>app.js</code></strong> – w przeciwnym wypadku klasa <code>EmailService</code> będzie niezdefiniowana i dostaniemy błąd.</li>
</ul>

Tyle problemów, a napisaliśmy ledwie jedną prostą metodę do wysyłania maili! <strong>W przypadku rozwoju aplikacji, im bardziej rozbudowana by ona była, tym utrudnień byłoby więcej.</strong> Ostatecznie skończylibyśmy z gąszczem całkowicie nieczytelnych i niezrozumiałych zależności pomiędzy klasami. Na szczęście istnieje jednak sposób, aby wszystkim tym trudnościom zaradzić: Odwrócenie Sterowania.

<h1 id="_inversionofcontrol_"><em>Inversion of Control</em></h1>

<em>Inversion of Control</em> (IoC) czyli <strong>Odwrócenie Sterowania to paradygmat programowania polegający na zamianie odpowiedzialności pewnych części aplikacji</strong>. Bardzo często Odwrócenie Sterowania opisuje się humorystycznie tzw. Zasadą Hollywood:

<blockquote>
  Nie dzwoń do nas. My zadzwonimy do ciebie.
</blockquote>

Mówiąc jaśniej, w klasycznie napisanej aplikacji to kod programisty wywołuje funkcje z zewnętrznych bibliotek. Natomiast gdy zastosowane jest IoC, to zewnętrzny <em>framework</em> wywołuje kod programisty w odpowiednich momentach. Prosty przykład bez IoC<sup id="fnref-1"><a href="#fn-1" rel="footnote">1</a></sup>:

<pre><code class="language-javascript">const name = window.prompt('Podaj imie!');  
const validatedName = validateName(name);  
const quest = window.prompt('Czego chcesz?');  
const validatedQuest = validateQuest(quest);  
…
</code></pre>

Przepływ informacji jest całkowicie pod kontrolą programisty. Natomiast w przypadku użycia IoC podalibyśmy tylko dwie funkcje służące do walidacji, ale nie od nas zależałoby kiedy zostaną one użyte:

<pre><code class="language-javascript">const framework = new Framework();  
framework.nameValidator = validateName;  
framework.questValidator = validateQuest;  
framework.start();  
</code></pre>

Widzimy tutaj ogromną różnicę w przepływie informacji, a także w sposobie myślenia na temat programu. W przykładzie bez IoC – całkowita kontrola programisty nad wszystkim. Tutaj – brak kotroli. To framework wywołuje nasz kod, a nie my. Stąd nazwa tego wzorca projektowego – Odwrócenie Sterowania.

<p class="important">Różnica pomiędzy biblioteką a frameworkiem jest płynna, ale większość architektów aplikacji zgadza się, że główną różnicą pomiędzy nimi jest fakt, że biblioteki to zbiór funkcji, które są wywoływane przez programistę, natomiast framework korzysta ze wzorca <em>Inversion of Control</em> i to on wywołuje kod programisty.</p>

<h1 id="wzorzecprojektowy_dependencyinjection_">Wzorzec projektowy <em>Dependency Injection</em></h1>

<em>Dependency Injection</em>, czyli Wstrzykiwanie Zależności, jest wzorcem projektowym oryginalnie pochodzącym ze środowiska programistów Java. Jest to implementacja paradygmatu Odwrócenia Sterowania. Właściwie jest to implementacja tak bardzo popularna, że powszechne jest używanie tych dwóch pojęć zamiennie – co nie jest do końca poprawne.

Podstawową zasadą działania <em>Dependency Injection</em> jest posiadanie serwisu, który <strong>zajmuje się uzupełnianiem potrzebnych zależności</strong>. Sam pomysł Wstrzykiwania Zależności można zrealizować na wiele różnych sposobów. Omówmy po krótce kilka z nich<sup id="fnref-2"><a href="#fn-2" rel="footnote">2</a></sup>:

<h2 id="constructorinjection">Constructor Injection</h2>

Koncepcja ta opiera się o pomysł, aby wykorzystać konstruktor do przekazywania zależności. Najprostsza implementacja może wyglądać tak, że zależności tworzymy ręcznie, a następnie przekazujemy je do konstruktora:

<pre><code class="language-javascript">// app.js
class App {  
    constructor(emailService) {
        this.emailService = emailService;
    }

    sendEmail(message, receiver) {
        this.emailService.send(message, receiver);
    }
}

// main.js
const emailService = new EmailService();  
const app = new App(emailService);  
</code></pre>

Nie jest to jednak rozwiązanie wygodne, głównie dlatego, że musimy pamiętać także o zależnościach zależności… Lepiej byłoby, gdyby nasz framework mógł za nas zarządzać wszystkimi zależnościami i o wszystkich pamiętać! W wielu językach może to zostać zrealizowane automatycznie przez framework już na postawie typów argumentów podanych w konstruktorze, jednak nie w JavaScripcie. Z powodu braku rozbudowanego systemu typów częstym pomysłem jest więc <strong>identyfikowanie zależności po nazwach</strong>. Kod z przykładu z mailem mógłby zostać przepisany w ten sposób<sup id="fnref-3"><a href="#fn-3" rel="footnote">3</a></sup>:

<pre><code class="language-javascript">// app.js
class App {  
    static $inject = ['EmailService'];

    constructor(emailService) {
        this.emailService = emailService;
    }

    sendEmail(message, receiver) {
        this.emailService.send(message, receiver);
    }
}

// main.js
const framework = new Framework();  
framework.registerDependency('EmailService', EmailService);  
const app = framework.instantiate(App);  
</code></pre>

Deklarujemy, że klasa <code>App</code> potrzebuje zależności o nazwie <code>EmailService</code>. Następnie podajemy frameworkowi informację o tym w jaki sposób może stworzyć sobie taką zależność – w tym przypadku jest to instancja klasy <code>EmailService</code>. Od razu widoczne jest z jaką łatwością moglibyśmy tę zależność <strong>podmienić na dowolną inną</strong> bez konieczności modyfikowania pliku app.js. Na przykład w trakcie testów jednostkowych możemy podstawić <code>EmailServiceMock</code> zamiast prawdziwego <code>EmailService</code>:

<pre><code class="language-javascript">const framework = new Framework();  
framework.registerDependency('EmailService', EmailServiceMock);  
const app = framework.instantiate(App);

app.sendEmail('test', 'michal@example.com');  
expect(EmailServiceMock.send).toHaveBeenCalledWith('test', 'michal@example.com');  
</code></pre>

<h2 id="setterinjection">Setter Injection</h2>

Założenia podobne, tylko sposób realizacji nieco inny: Zamiast podawać zależności do konstruktora, najpierw tworzymy instancję, a dopiero później ustawiamy zależności na stworzonym obiekcie:

<pre><code class="language-javascript">// app.js
class App {  
    sendEmail(message, receiver) {
        this.emailService.send(message, receiver);
    }
}

// main.js
const app = new App();  
app.emailService = new EmailService();  
</code></pre>

W niektórych platformach i środowiskach powyższy kod można zamienić na całkowicie deklaratywny plik .xml lub .json z konfiguracją, co ma ogromny sens! Na przykład w Javie:

<pre><code class="language-xml">&lt;beans&gt;  
    &lt;bean id="App" class="App"&gt;
        &lt;property name="emailService"&gt;
            &lt;ref local="EmailService" /&gt;
        &lt;/property&gt;
    &lt;/bean&gt;
&lt;/beans&gt;  
</code></pre>

<h2 id="interfaceinjection">Interface Injection</h2>

Chodzi o używanie do DI interfejsów, a nie konkretnych klas – jednak całkowicie pominę ten koncept, gdyż JavaScript nie zna pojęcia interfejsów w ogóle. Sygnalizuję tylko, że coś takiego istnieje – więcej można doczytać na przykład <a href="http://martinfowler.com/articles/injection.html">u Martina Fowlera</a>.

<h1 id="servicelocator">Service Locator</h1>

Alternatywną w stosunku do <em>Dependency Injection</em> implementacją zarządzania zależnościami jest wzorzec <em>Service Locator</em>. Opiera się on o wykorzystanie obiektu zwanego <em>Service Locator</em>, który służy do pobierania zależności wtedy, gdy są one nam potrzebne:

<pre><code class="language-javascript">// app.js
class App {  
    constructor() {
        this.emailService = ServiceLocator.get('EmailService');
    }

    sendEmail(message, receiver) {
        this.emailService.send(message, receiver);
    }
}

// emailService.js
ServiceLocator.provide('EmailService', EmailService);

// main.js
const app = new App();  
</code></pre>

Ciekawostką jest to, że <em>Dependency Injection</em> i <em>Service Locator</em> absolutnie się wzajemnie nie wykluczają. <strong>Oba te wzorce mogą być wykorzystywane w tej samej aplikacji</strong>, a nawet w tej samej klasie. Możemy na przykład za pomocą DI wstrzyknąć obiekt ServiceLocator, a potem z niego korzystać:

<pre><code class="language-javascript">// app.js
class App {  
    static $inject = ['ServiceLocator'];

    constructor(ServiceLocator) {
        this.emailService = ServiceLocator.get('EmailService');
    }

    sendEmail(message, receiver) {
        this.emailService.send(message, receiver);
    }
}

// emailService.js
ServiceLocator.provide('EmailService', EmailService);

// main.js
const framework = new Framework();  
framework.registerDependency('ServiceLocator', ServiceLocator);  
const app = framework.instantiate(App);  
</code></pre>

Kluczową zaletą obu rozwiązań jest usunięcie ścisłej zależności pomiędzy klasami.

<h1 id="implementacje">Implementacje</h1>

Ponieważ zajmuję się głównie webdevelopmentem, to przy okazji podam kilka implementacji DI w JavaScripcie:

<ul>
<li><a href="https://github.com/inversify/InversifyJS">InversifyJS</a></li>
<li><a href="https://github.com/young-steveo/bottlejs">BottleJS</a></li>
<li><a href="https://github.com/avighier/simple-dijs">simple-dijs</a></li>
<li><a href="https://github.com/linkedin/inject">inject</a></li>
<li><a href="http://absurdjs.com/pages/client-side-components/dependency-injection/">AbsurdJS</a></li>
<li><a href="https://github.com/NickQiZhu/di.js">di.js</a></li>
</ul>

Dowolną z tych bibliotek możemy wykorzystać we własnym projekcie.

<h1 id="naprzykadzie">Na przykładzie…</h1>

Dependency Injection jest używane w wielu frameworkach do budowania aplikacji. Pierwszym z brzegu przykładem jest AngularJS 1.x, w którym wstrzykiwanie zależności od samego początku było jedną z głównych cech. Co prawda ta konkretna implementacja pozostawia wiele do życzenia, jednak niezwykle ułatwia na przykład testowanie aplikacji – w czasie testów bez problemu można było podstawić <em>mocki</em> zamiast prawdziwych zależności:

<pre><code class="language-javascript">// definiujemy serwis o nazwie 'MyService'
// od tej pory może być używany w Dependency Injection
angular.service('MyService', class MyService {  
    showMessage() {
        alert('Message!');
    }
});

// wstrzykujemy zależność np. do kontrolera
angular.controller('MyController', class MyController {  
    static $inject = ['MyService'];

    constructor(myService) {
        myService.showMessage();
    }
});
</code></pre>

Dodatkową ciekawostką jest to, że w AngularJS zaimplementowano zarówno <em>Dependency Injection</em> (a dokładnie to <em>Constructor Injection</em>), jak i <em>Service Locator</em> (<code>$injector</code>):

<pre><code class="language-javascript">// używamy Service Locator
const myService = $injector.get('MyService');  
</code></pre>

<em>Dependency Injection</em> jest oczywiście używane również w innych frameworkach, np. Ember.js, czy Angular 2. Konkretnie implementacji w Angular 2 poświęcę cały osobny wpis, gdyż jest to temat bardzo ciekawy i rozbudowany. Według dokumentacji DI z Angular 2 ma być dostępne jako biblioteka, niezależnie od całego frameworka.

<h1 id="problemyzdi">Problemy z DI</h1>

Znacznie bardziej doświadczeni ode mnie programiści zauważają, że <em>Dependency Injection</em>, jak każdy wzorzec projektowy, może być nadużywane – przez co efekty są odwrotne do zamierzonych, a kod staje się mniej czytelny i trudniejszy w zarządzaniu. Uncle Bob napisał na Twitterze:

<blockquote>
  <strong>Odwrócenie Sterowania to dobry pomysł. I tak jak wszystkie dobre pomysły, powinien być stosowany z umiarem.</strong>
</blockquote>

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">IoC is a good idea.  Like all good ideas, it should be used with moderation.</p>&mdash; Uncle Bob Martin (@unclebobmartin) <a href="https://twitter.com/unclebobmartin/status/308980513929035776">March 5, 2013</a></blockquote>

<h2 id="chciwykontroler">Chciwy kontroler</h2>

Mam przed sobą kod, który samemu napisałem parę lat temu. Jest to akurat fragment aplikacji w AngularJS, gdzie wykorzystywane było <em>Dependency Injection</em>. Konstruktor jednego z kontrolerów wygląda tak:

<pre><code class="language-javascript">function ($scope, $rootScope, $routeParams, $location, $filter, conferenceApi, shortUrlMetaService, timeAndDateService, appState, metaService) { … }  
</code></pre>

<strong>Zależności jest zdecydowanie zbyt wiele.</strong> A to tylko jeden z wielu kontrolerów, w którym DI było nadużywany w taki sposób. W czym problem? Jasne jest, że ten kontroler nie ma tylko jednego zadania – musi być świadomy istnienia i potrafić obsłużyć tak różne aspekty aplikacji jak formatowanie daty (<code>timeAndDateService</code>), ustawianie meta danych (<code>metaService</code>) czy sprawdzanie aktualnego adresu URL (<code>$location</code>). Uważajmy na podobne zapędy. <strong>Chciwe kontrolery powinny być zrestrukturyzowane</strong>.

<strong>Co jednak w sytuacji, gdy naprawdę potrzebujemy tak wielu zależności do wypełnienia tylko jednego zadania?</strong> Przykładowo rozwiązując problem cyklicznych zależności (poniżej) rozbijamy jedną zależność na pięć różnych i każdej z nich potrzebujemy w jednym miejscu. Co w takim wypadku? <strong>Warto wtedy zainteresować się wzorcem projektowym o nazwie fasada (<em>façade</em>)</strong>. Więcej szczegółów można przeczytać na przykład w świetnym artykule Marka Seemanna: <a href="http://blog.ploeh.dk/2010/02/02/RefactoringtoAggregateServices/">Refactoring to <del>Aggregate</del> Facade Services</a>.

<h2 id="zalenocicykliczne">Zależności cykliczne</h2>

Częstym problemem jest również powstawanie zależności cyklicznych (<em>Circular Dependency</em>) – to znaczy takich sytuacji, w których <strong>dwie klasy polegają na sobie wzajemnie</strong>. W zasadzie to najprostszy przypadek, znacznie gorzej jest gdy klasa A polega na klasie B, a ta na klasie C, która polega znowu na klasie A… Refaktoryzacja takiego kodu nie jest czymś trywialnym.

Jeśli kiedykolwiek zdarzy się nam taki błąd to jest to jasny objaw, że <strong>któraś z klas nie spełnia <a href="https://pl.wikipedia.org/wiki/Zasada_jednej_odpowiedzialno%C5%9Bci">Zasady Jednej Odpowiedzialności</a></strong> (<em>Single Responsibility Principle</em>). Na pewno uda się ją rozbić na dwie (lub więcej) mniejszych klas wypełniających tylko jedno proste zadanie. W ten sposób zależności cykliczne zostaną wyeliminowane.

<h1 id="podsumowanie">Podsumowanie</h1>

Pamiętając o potencjalnych problemach i nadużyciach <em>Dependency Injection</em>, korzystajmy z niego świadomie. DI bez wątpienia może <strong>poprawić modularność aplikacji, ułatwić jej rozbudowę, zarządzanie kodem oraz testowanie</strong>. Dzięki temu łatwiejsze staje również pisanie kodu zgodnie z <a href="https://pl.wikipedia.org/wiki/SOLID_" title="programowanie_obiektowe">SOLID</a>, a w szczególności z Zasadą Jednej Odpowiedzialności oraz <a href="https://pl.wikipedia.org/wiki/Zasada_otwarte-zamkni%C4%99te">Zasadą otwarte-zamknięte</a> (<em>Open/Closed Principle</em>). Jak powiedział Ward Cunningham, <strong>wstrzykiwanie zależności jest kluczowym elementem zwinnej architektury</strong>:

<blockquote>
  Dependency Injection is a key element of agile architecture.
</blockquote>

Warto poznawać wzorce projektowe, niezależnie od konkretnych implementacji i trendów. Szczególnie w webdevelopmencie, frameworki przychodzą i odchodzą, ale <strong>znajomość wzorców projektowych jest czymś uniwersalnym</strong> i sprawdzi się niezależnie od kontekstu, aplikacji, frameworka, czy technologii.

<div class="footnotes"><ol><li class="footnote" id="fn-1"><p>Luźno na podstawie <a href="http://martinfowler.com/bliki/InversionOfControl.html">http://martinfowler.com/bliki/InversionOfControl.html</a> <a href="#fnref-1" title="return to article">↩</a></p></li>
<li class="footnote" id="fn-2"><p>Na podstawie <a href="http://martinfowler.com/articles/injection.html">http://martinfowler.com/articles/injection.html</a> <a href="#fnref-2" title="return to article">↩</a></p></li>
<li class="footnote" id="fn-3"><p>Dla poprawy czytelności zastosowałem składnię statycznego pola, której nie ma jeszcze w ECMAScript – jest dopiero propozycją do standardu <a href="#fnref-3" title="return to article">↩</a></p></li></ol></div>
