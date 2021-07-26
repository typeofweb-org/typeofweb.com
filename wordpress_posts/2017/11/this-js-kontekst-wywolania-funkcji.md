---
id: 799
index: 42
title: this w JS — czyli kilka słów o kontekście wywołania funkcji
date: 2017-11-14T17:33:21.000Z
isMarkdown: true
status: publish
permalink: this-js-kontekst-wywolania-funkcji
authors:
  - wojtek-urbanski
guid: https://typeofweb.com/?p=799
type: post
thumbnail:
  url: https://typeofweb.com/wp-content/uploads/2017/11/smilies-2912641_1920.jpg
  width: 1920
  height: 1276
categories:
  - slug: javascript
    name: JavaScript
  - slug: dobry-kod
    name: Dobry Kod
seo:
  focusKeywords:
    - kontekst wywołania
    - this
  focusKeywordSynonyms:
    - kontekstem wywołania, kontekście wywołania, kontekstu wywołania

---
Czy kiedykolwiek spotkałaś(-eś) się z błędem w aplikacji, który wynikał z tego, że "this" było ustawione na coś innego, niż się spodziewałaś/eś? Jeśli tak, to nie jesteś jedyna(-y). W swojej karierze programisty miałem okazję występować w roli rekrutera na ponad 160-ciu rozmowach kwalifikacyjnych na stanowiska front-endowe. Jeśli nauczyło mnie to jednego, to tego, że odpowiedź na pytanie „na co wskazuje <code>this</code>?” albo „co to jest kontekst wywołania?” sprawia największą trudność nie tylko kandydatom, ale również doświadczonym programistom w ich codziennej pracy. <strong>W tym wpisie pokazuję, że <code>this</code> nie jest tak magiczne jakby się mogło wydawać, a kontekst wywołania da się zrozumieć.</strong>

<!--more-->

<h2>Wstęp do "this" w JS</h2>
JavaScript to niezwykły język. Jego składnia jest bardzo podobna do tych znanych z C++ czy z Javy. Bardzo wiele wybacza — błąd w JS niekoniecznie skutkuje niezdatnością strony WWW na której wystąpił do użycia, bardzo często działa ona dalej bez najmniejszego problemu. Oba te aspekty bez wątpienia wpłynęły na to, że jest on tak popularny. W końcu wystarczy napisać kilka linijek w pliku *.js i odświeżyć stronę. To wszystko sprawia, że <strong>pisać w JS można praktycznie bez żadnego wcześniejszego przygotowania</strong>. I dokładnie tak się dzieje.

Z drugiej strony mamy programistów, nie JavaScriptu ogólnie, a konkretnej biblioteki, czy frameworka. Kiedyś było to jQuery, potem Angular.js, a obecnie React.js. Osoby takie często swoją znajomość JS ograniczają właśnie do APi używanego rozwiązania.

Szybko okazuje się jednak, że aplikacja są niewydajne, występują w niej dziwne, nieprzewidziane błędy, a kod jest całkowicie niezrozumiały. <strong>Poznanie fundamentów języka, którego używasz nie tylko pozwoli Ci lepiej zrozumieć co pod spodem robi Twoja aplikacja, ale także zapobiec błędom zanim wystąpią</strong> — jeszcze na etapie pisania kodu. Dzięki temu pisane przez Ciebie aplikacje będą bardziej wydajne i usiane mniejszą ilością błędów, oraz łatwiejsze w dalszym rozwoju, niezależnie od tego czy ostatecznie korzystasz z Reacta, Vue czy <a href="https://typeofweb.com/kurs/angular-2/">Angulara</a>.

<img class="aligncenter wp-image-816 size-large" src="https://typeofweb.com/wp-content/uploads/2017/11/Fullscreen_14_11_2017__16_57-1024x478.png" alt="Błąd JavaScript związany z błędnie ustawionym this" width="1024" height="478" />

Jest to jeden z wielu powodów, dla których warto poznać JavaScript jak najlepiej, na wylot. Po przeczytaniu tego wpisu, mam nadzieję, this w JS będzie jednym z tematów, w których staniesz się ekspertem!
<h2><code>this</code> w programowaniu</h2>
W ogólnie pojętym programowaniu obiektowym słowo kluczowe <code>this</code> ma specjalne znaczenie. Wskazuje na obiekt będący kontekstem wykonania. Najprostszym przykładem jest odwołanie się do pola obiektu w jego metodzie. Aby to zrobić napiszesz <code>this.nazwaPola</code> — wtedy kontekstem jest obiekt, na którym wywołana została ta metoda, a <code>this</code> wskazuje właśnie na niego. Tak działa to w językach z klasycznym modelem obiektowości, np. C++, czy Javie.

W JavaScript odpowiedź na pytanie „czym jest <code>this</code>” jest trochę bardziej skomplikowana, ponieważ <strong>to, na co wskazuje <code>this</code> zależy nie tylko od sposobu definicji funkcji, ale również od formy i kontekstu wywołania</strong>. Doskonale opisuje to moim zdaniem termin “<em>late binding</em>” (choć oczywiście rozumiany inaczej niż [late binding w klasycznym OOP](https://en.wikipedia.org/wiki/Late_binding)).
<h2>Domyślny this</h2>
Jeśli w kodzie użyjesz słowa kluczowego <strong><code>this</code> poza jakąkolwiek funkcją, to zawsze będzie ono wskazywało na obiekt hosta</strong> — <code>window</code> w przeglądarkach oraz <code>module.exports</code> w node.js. Dla uproszczenia, będę odnosił się do niego jako <code>window</code> w dalszej części artykułu:
<pre class="language-javascript"><code>this; // === window</code></pre>
Podobnie jest w przypadku, <strong>gdy wywołasz funkcję bezpośrednio przez referencję do niej</strong> — <code>this</code> wskazuje w takiej sytuacji na obiekt <code>window</code>:
<pre class="language-javascript"><code>function fun() {
  return this;
};

fun(); // === window</code></pre>
<strong>Specjalnym przypadkiem jest tu sytuacja, gdy funkcja została zdefiniowana w strict mode</strong>. W takim wypadku jedną z konsekwencji jest to, że nie jest już używany domyślny <code>this</code>. Zamiast tego otrzymasz wartość <code>undefined</code>:
<pre class="language-javascript"><code>function fun() {
  “use strict”;
  return this;
};

fun(); // === undefined</code></pre>
<p class="important">Warto pamiętać, że w kontekście modułów ES2015 (<code>import</code> / <code>export</code>) oraz <code>class</code>, tryb strict jest domyślny.</p>

<h2>Metoda obiektu czyli wywołanie z kropką</h2>
Przy ustalaniu "this" kolejnym pod względem ważności sposobem wywołania funkcji jest <strong>wywołanie jej jako metody obiektu</strong>, czyli z kropką po lewej. Obiekt taki nazywany jest obiektem kontekstowym.
<pre class="language-javascript"><code>var o = {
  a: "o object",
  method: function() {
    return this;
  }
};

o.method(); // === o</code></pre>
Przy takim wywołaniu <code>this</code> wskazuje na obiekt będący bezpośrednio w lewej strony kropki — w tym wypadku <code>o</code>.
<pre class="language-javascript"><code>var o = {
  a: "o object",
  method: function() {
    return this;
  }
};

var otherO = {
  a: "otherO object",
  method: o.method
}

otherO.method(); // === otherO</code></pre>
Zwróć uwagę, że po przypisaniu referencji do metody do obiektu <code>otherO</code> i wywołaniu jej jako jego metody <code>this</code> wskazuje właśnie na ten obiekt. Zupełnie ignorowany jest fakt, że oryginalnie ta metoda została zdefiniowana w obiekcie <code>o</code>.
<h3>Przekazanie referencji to nie wywołanie</h3>
Przy tej okazji warto wspomnieć o częstym problemie napotykanym przez programistów. <strong>Przekazujesz do jakiejś funkcji referencję do swojej metody tylko po to, aby dowiedzieć się, że <code>this</code> wskazuje na <code>window</code>, a nie oczekiwany obiekt.</strong> Dzieje się to np. kiedy chcesz przekazać callback jako <code>then</code> w <code>Promise</code>.
<pre class="language-javascript"><code>fetch('https://example.com/endpoint').then(o.method); // === window</code></pre>
Powodem takiego zachowania jest fakt, że mimo przekazania referencji do metody z użyciem obiektu kontekstowego, z kropką, <code>fetch</code> (który zwraca Promise) wywołuje Twoją funkcję w sposób samodzielny, czyli przez referencję:
<pre class="language-javascript"><code>function insideThen(fn) {
  fn();
}</code></pre>
Więcej o Promise'ach możesz przeczytać w tym wpisie:

https://typeofweb.com/2017/10/23/kilka-faktow-na-temat-promise/

Innym, często budzącym zaskoczenie, przypadkiem jest sytuacja, w której <strong>funkcja, do której przekazałaś/eś callback celowo zmienia jego this</strong>. Idealnym przykładem jest przypięcie funkcji jako callbacka dla zdarzenia DOM, np. kliknięcia. W takim wypadku jako this ustawiany jest element DOM, na którym zaszło zdarzenie. Podobnie zachowuje się biblioteka jQuery.
<pre class="language-javascript"><code>lnk.addEventListener("click", o.method); // === kliknięty element DOM</code></pre>
<h2>Wymuszenie konkretnego obiektu jako kontekstu</h2>
Poprzedni przypadek wymagał zmodyfikowania obiektu kontekstowego przez dodanie do niego nowej metody w celu ustawienia konkretnego obiektu jako <code>this</code> metody. Na szczęście <strong>istnieją inne mechanizmy pozwalające sprecyzować czym ma być <code>this</code> podczas lub przed wywołaniem funkcji</strong>.

Zanim zapoznasz się z tymi mechanizmami, warto zwrócić uwagę na dwie cechy JavaScriptu, które nam to umożliwiają. Po pierwsze, <strong>funkcje w JS są tzw. obywatelami pierwszej kategorii (<em>first class citizens</em>) oraz obiektami</strong>. Oznacza to, że <strong>możesz je przekazywać jako parametry do innych funkcji, oraz że same mogą mieć metody</strong>. Po drugie, prototypowa natura JS sprawia, że wszystkie obiekty danego typu mogą mieć dostępne wspólne dla nich pola i metody.
<h3>Metody <code>call</code> i <code>apply</code></h3>
Ustawienie konkretnego obiektu jako <code>this</code> podczas wywołania funkcji możliwe jest przy pomocy metod <code>call</code> i <code>apply</code>:
<pre class="language-javascript"><code>const o = {
  a: "o object",
  method: function() {
    console.log(this, arguments); // wypisuje this oraz przekazane do funkcji argumenty
  }
};

const x = {
  a: "x object"
};

o.method(1, 2); // this === o, [1, 2]
o.method.call(x, 1, 2, 3); // this === x, [1, 2, 3]
o.method.apply(x, [1,2,3]); // this === x, [1, 2, 3]</code></pre>
Jak zapewne zauważyłaś/eś, <code>call</code> i <code>apply</code> różnią się jedynie sposobem w jaki przekazują parametry do wywoływanej funkcji — <strong>pierwsza przyjmuje je jako swoje argumenty, druga przyjmuje je jako tablicę</strong>, której elementy są kolejno podstawiane. Obie metody za pierwszy parametr przyjmują obiekt, który ma zostać użyty jako <code>this</code>.
<h3>Metoda <code>bind</code></h3>
Kolejną dostępną metodą jest <code>bind</code>. W odróżnieniu od poprzedników <strong>nie wywołuje on funkcji na miejscu, ale zwraca referencję do funkcji, której <code>this</code> zawsze wskazuje na przekazany obiekt</strong>. Kolejne parametry przekazane do bind zostaną podstawione jako pierwsze parametry oryginalnej funkcji podczas wywołania — zostanie więc wykonana częściowa aplikacja (<em>partial application</em>) oryginalnej funkcji:
<pre class="language-javascript"><code>const m = o.method.bind(x, 1, 2);
m(3,4); // this === x, [1,2,3,4]
setTimeout(m); // this === x, [1,2]</code></pre>
<strong>Raz zbindowanej funkcji nie można już nadpisać obiektu kontekstowego w ten sam sposób</strong>. Dlatego poniższy kod zadziała inaczej, niż byś tego chciał(a). Zwróć uwagę, że <strong>kolejne parametry zostały zaaplikowane mimo zignorowania nowej wartości this</strong>.
<pre class="language-javascript"><code>const m2 = m.bind(o2, 3, 4);
m2(5, 6); // this === x, [1,2,3,4,5,6]</code></pre>
<h3>Ignorowanie wartości <code>this</code></h3>
Korzystając z powyższych metod w niektórych wypadkach możesz chcieć zignorować wartość <code>this</code> (np. interesuje Cię jedynie ustawienie domyślny wartości argumentów) lub specjalnie ustawić ją na „nic”. Naturalnym pomysłem, który przychodzi do głowy jest użycie <code>null</code> lub <code>undefined</code> jako wartości pierwszego argumentu:
<pre class="language-javascript"><code>const ignored = o.method.call(null, 1); // this === window, [1]</code></pre>
W takiej sytuacji, nasz <strong>nowy kontekst zostanie jednak zignorowany, a w jego miejsce użyte zostanie… tak, window!</strong> Jest to szczególnie ważne, że kod biblioteczny mógłby w ten sposób nadpisać zmienne globalne. Dużo bezpieczniej jest przekazać w takim wypadku pusty obiekt <code>{}</code> lub wynik <code>Object.create(null)</code> czyli pusty obiekt bez prototypu. Obiekt taki jest naprawdę pusty i nie posiada żadnych pól ani metod.
<pre class="language-javascript"><code>o.method.call(Object.create(null), 1); // this === {}, [1]</code></pre>
<h2>Wywołanie z <code>new</code> — funkcje-konstruktory</h2>
<strong>Funkcję w JS możesz wywołać również jako konstruktor, czyli z użyciem operatora <code>new</code></strong>. To, co dokładnie się dzieje podczas wywołania funkcji z <code>new</code> i jak różni się to od języków takich jak C++, czy Java jest materiałem na osobny post. W tym momencie skup się jedynie na tym, że kiedy funkcja jest wywoływana z <code>new</code>, powstaje nowy, pusty obiekt, który następnie jest ustawiany jako kontekst wywołania tej funkcji:
<pre class="language-javascript"><code>function Clazz(a,b) {
  this.a = 1;
  this.b = 2;

  return this;
}

Clazz.prototype.method = function() {
  l("Prototype", this);
};

const toBind = { c: 3 };

const instance = new Clazz(); // this === nowy obiekt
const secondInstance = new (Clazz.bind(toBind))()); // this === nowy obiekt</code></pre>
<p class="important">Wywołanie z <code>new</code> ma tak wysoki priorytet, że nadpisuje nawet <code>this</code> ustawiony za pomocą metody <code>bind</code>.</p>

<h2>Funkcje strzałkowe — arrow functions oraz this w nich</h2>
ECMAScript 6 / 2015, czyli standard na bazie którego powstają implementacje JavaScript, dał nam do dyspozycji nowy sposób definiowania funkcji — <strong>funkcje strzałkowe</strong>. Główną cechą takich funkcji, oprócz skondensowanej składni, jest fakt, że <strong><code>this</code> jest w nich ustawiany w sposób leksykalny i zależy od miejsca, w którym taka funkcja została zdefiniowana</strong>.

Widzisz więc zmianę w porównaniu do standardowego mechanizmu działania <code>this</code> w JavaScript. <strong><code>this</code> w funkcji strzałkowej zawsze wskazuje na to samo, co w funkcji „powyżej”</strong>. Oznacza to, że gdy przekazujesz callback do jakiejś biblioteki, albo wywołujesz <code>setTimeout</code> z wnętrza metody w klasie, nie musisz się martwić, że kontekst wywołania <code>this</code> zostanie zgubiony. Będzie on wskazywał na to, na co wskazywałby w tej funkcji (lub na <code>window</code> dla <em>arrow function</em> zdefiniowanej w zakresie globalnym, poza inną funkcją).
<pre class="language-javascript"><code>function arrowReturner() {
  // this w arrow function poniżej będzie wskazywał na to, na co wskazywałby w tej linijce
  return () =&gt; {
    return this;
  };
}

var firstObj = {
  a: 2
};

var secondObj = {
  a: 3
};

var bar = arrowReturner.call(firstObj);

bar(); // this === firstObj
bar.call(secondObj); // this === firstObj
new bar(); // Uncaught TypeError: bar is not a constructor</code></pre>
<strong>Funkcje strzałkowe nie dają możliwości nadpisania <code>this</code> w jakikolwiek sposób — ostatecznie zawsze zostaną wykonane z tym oryginalnym. Co ciekawe, jest to zasada tak restrykcyjna, że wywołanie arrow function jako konstruktora kończy się błędem.</strong>

Warto jednak pamiętać, że powyższy przykład jest mało życiowy. Głównym zastosowaniem funkcji strzałkowych są wszelkiego rodzaju callbacki i w praktyce raczej nie udostępniasz ich na zewnątrz zwracając referencję.
<h2>Podsumowanie</h2>
Określenie czym będzie <code>this</code> w wykonywanej funkcji wymaga od Ciebie znalezienia miejsca jej definicji oraz bezpośredniego wywołania. Następnie możesz skorzystać z tych 5 zasad w kolejności od najważniejszej do najmniej ważnej:
<ol>
 	<li>arrow function — użyj <code>this</code> z otaczającego <em>scope</em></li>
 	<li>wywołanie z new — użyj nowo tworzonego obiektu</li>
 	<li><code>call</code>/<code>apply</code>/<code>bind</code> — użyj przekazanego obiektu</li>
 	<li>wywołanie z kropką, jako metoda — użyj obiektu, na którym została wywołana</li>
 	<li>domyślnie — <code>undefined</code> w strict mode, obiekt globalny w innym wypadku</li>
</ol>

## Podsumowanie this
Mam nadzieję, że dzięki temu artykułowi odpowiedź na pytanie „czym jest this” stanie się dla Ciebie chociaż trochę łatwiejsza. Jeśli w swojej karierze natrafiłaś(-eś) na jakieś ciekawe lub zabawne problemy związane z wartością kontekstu wywołania <code>this</code>, podziel się nimi w komentarzu!
