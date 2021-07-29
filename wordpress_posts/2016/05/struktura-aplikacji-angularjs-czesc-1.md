---
id: 15
index: 5
title: "Struktura aplikacji AngularJS (część\_1\_‑\_trochę historii)"
date: 2016-05-14T17:08:00.000Z
isMarkdown: false
status: publish
permalink: struktura-aplikacji-angularjs-czesc-1
authors:
  - michal-miszczyszyn
guid: >-
  https://typeofweb.com/index.php/2016/05/14/struktura-aplikacji-angularjs-czesc-1/
type: post
categories:
  - slug: javascript
    name: JavaScript
  - slug: dobry-kod
    name: Dobry Kod
  - slug: front-end
    name: Front-end
seo: {}
---

<p>W trakcie kilku ostatnich lat pracy z AngularJS obserwuję całkowitą zmianę podejścia do architektury aplikacji internetowych. Była to powolna ewolucja, po drodze mocno inspirowana dobrymi wzorcami projektowymi, szkicem Web Components oraz biblioteką React. Sublimacją tego wysiłku jest powstanie angular2, ale wszystkie wypracowane praktyki wdrożono również do AngularJS 1. Od bałaganu, porozrzucanych zależnych od siebie kontrolerów i pomieszanych <em>scope’ów</em> doszliśmy w końcu do czegoś co może wydawać się dziś oczywiste: <strong>Czystych, prostych, krótkich komponentów, odpowiedzialnych tylko za jedną konkretną funkcję aplikacji</strong>.</p>

<h1 id="trochhistorii">Trochę historii</h1>

<p>Kiedy zacząłem pracować nad pierwszym komercyjnym projektem z użyciem AngularJS, wyszła akurat wersja <code>1.0.5</code> tego frameworka.  Grunt był w wersji <em>release candidate</em>, a Karma nazywała się jeszcze Testacular. To było na początku roku 2013, ale z perspektywy rozwoju <em>webdevelopmentu</em> to wieki temu. W jaki sposób wyglądała początkowo aplikacja, którą tworzyliśmy? Nie było wtedy jeszcze chyba żadnego podręcznika Angulara, który by opisywał tak podstawowe rzeczy jak struktura folderów czy architektura aplikacji (pierwszy taki wpis na blogu znaleźliśmy dopiero kilka tygodni później). Użyliśmy modnego wtedy narzędzia Yeoman i zaczęliśmy projekt przy pomocy <code>yo angular</code>. Otrzymaliśmy całkowicie nieskalowalną, ale używaną chyba przez wszystkich, strukturę katalogów podobną do tej poniżej:</p>

<pre><code>---
aplikacja  
    app.js
    index.html
    controllers/
        app.controller.js
    directives/
        myElement.directive.js
    services/
        appState.service.js
    tests/
        controllers/
            app.controller.test.js
        directives/
            myElement.directive.test.js
        services/
            appState.service.test.js
</code></pre>

<p>Ta prosta struktura nie sprawdza się nawet przy małych aplikacjach jeśli tylko mamy więcej niż kilka kontrolerów. Trudno zarządzać tak ułożonymi plikami, a wdrożenie nowych funkcji sprawia wiele kłopotów. Ten układ folderów pokazywał również inny, poważniejszy problem: W zasadzie <strong>nikt nie wiedział jak zaprojektować architekturę aplikacji</strong> opartej o AngularJS. Na fali mody wszyscy zdawali się zapomnieć o podziale odpowiedzialności i MVC na rzecz MVW<sup id="fnref:1"><a href="#fn:1" rel="footnote">1</a></sup> oraz o dobrych praktykach i wzorcach na rzecz szybkiego tworzenia imponujących aplikacji internetowych. Polecane było używanie <code>ng‑include</code> do zagnieżdżania podwidoków oraz <code>ng‑controller</code> do dodawania do nich logiki biznesowej, a komunikacja pomiędzy kontrolerami była często rozwiązywana np. poprzez odwoływanie się do <code>$parent</code> – czyli bezpośredniego rodzica zależnego od ułożenia html. W skrócie oznaczało to, że <strong>widok musiał być świadomy dokładnie gdzie w hierarchi się znajduje i praktycznie niemożliwe było jego ponowne wykorzystanie w innym miejscu</strong>. Kontrolery były pozornie niezwiązane z widokiem, ale w rzeczywistości nie dało się użyć jednego bez drugiego.</p>

<p><img src="/content/images/2016/05/stara-architektura-angularjs-2.png" alt="Dawna architektura aplikacji w AngularJS" /></p>

<p>U nas kontrolerów na początek miało być kilkadziesiąt, do tego co najmniej tuzin różnych własnych dyrektyw i przynajmniej drugie tyle serwisów, dlatego niedługo później zdecydowaliśmy się na generalne porządki… Autentyczny fragment kodu z tamtego okresu zamieszczam poniżej. Trudno się w tym połapać, ale gdy już się dokładnie przyjrzeć to widać, że np. <code>ConferenceListCtrl</code> niepotrzebnie używany jest dwukrotnie w jednym widoku, a przepływ danych jest całkowicie niejasny. Patrząc na ten fragment HTML nie wiem nawet teraz gdzie miałbym zacząć, aby móc np. <code>details.html</code> wykorzystać ponownie w innym miejscu aplikacji.</p>

<pre><code class="language-html">&lt;!-- history.html --&gt;  
&lt;ng-include src="'list.html'"&gt;&lt;/ng-include&gt;  
&lt;ng-include src="'conference.html'"&gt;&lt;/ng-include&gt;

&lt;!-- list.html --&gt;  
&lt;div ng-show="showList" ng-controller="ConferenceListCtrl"&gt;  
    …
&lt;/div&gt;

&lt;!-- conference.html --&gt;  
&lt;div ng-controller="ConferenceListCtrl"&gt;  
    &lt;ng-include src="'details.html'"&gt;&lt;/ng-include&gt;
&lt;/div&gt;

&lt;!-- details.html --&gt;  
&lt;div ng-controller="ConferenceDetailsCtrl"&gt;  
    …
&lt;/div&gt;  
</code></pre>

<h1 id="ewolucja">Ewolucja</h1>

<p>Początkowo autorzy AngularJS nie rekomendowali żadnej struktury projektu. Tłumaczyli to dowolnością i elastycznością frameworka. Dzięki temu na wielu blogach pojawiały się kolejne propozycje struktur i nazewnictwa plików <a href="http://stackoverflow.com/questions/18542353/angularjs-folder-structure">tworzone przez użytkowników</a>. W lutym 2014 na oficjalnym blogu AngularJS ukazał się <a href="http://blog.angularjs.org/2014/02/an-angularjs-style-guide-and-best.html">wpis</a> mówiący w końcu o najlepszych praktykach i strukturze. Twórcy Angulara opublikowali <a href="https://docs.google.com/document/d/1XXMvReO8-Awi1EZXAXS4PzDzdNvV6pGcuaF4Q9821Es/pub">dokument</a>, który opisuje w jaki sposób ich zdaniem powinna wyglądać aplikacja w Angularze.</p>

<p>Taki podział folderów od razu sugeruje też inne podejście do planowania aplikacji – <strong>podejście komponentowe</strong>. Dodatkową pomocą jest, dostępna od wersji 1.5, nowa funkcja <code>angular.component(…)</code>, która umożliwia łatwiejsze tworzenie komponentów. Widać tutaj zresztą silną inspirację biblioteką React oraz ideą Web Componentów, a sam koncept jest moim zdaniem świetny i przede wszystkim zgodny z dobrze znanymi wzorcami projektowymi.</p>

<blockquote>
  <p>W skrócie komponent to zenkapsulowany samowystarczalny element aplikacji, odpowiedzialny za dokładnie jedną funkcję. Zawiera widok i logikę biznesową.</p>
</blockquote>

<p>Rezygnujemy z <code>ng-controller</code> i <code>ng-include</code> na rzecz zagnieżdżonych komponentów. Jest to rozwiązanie lepsze bo tworzone są <strong>małe fragmenty kodu, które łatwo jest testować, a przepływ danych pomiędzy nimi jest jasny i przejrzysty</strong>. Do tego automatycznie każdy taki komponent może być użyty w dowolnym miejscu gdyż nie zależy od otaczających go elementów – tylko od swoich atrybutów. Przykładowa implementacja jednego komponentu <code>&lt;app‑conference‑details&gt;</code> znajduje się nieco dalej. Więcej można przeczytaj na blogu <a href="https://toddmotto.com/exploring-the-angular-1-5-component-method/">Todd Motto</a>, serdecznie polecam cały jego wpis.</p>

<p><img src="/content/images/2016/05/architektura-komponentowa-angularjs.png" alt="Architektura komponentowa w AngularJS" /></p>

<p>Poprzedni kod HTML mógłby zostać przepisany na przykład na coś podobnego do tego:</p>

<pre><code class="language-html">&lt;!-- app-history-component --&gt;  
&lt;app-conference-list conferences=“$ctrl.conferences”&gt;  
&lt;/app-conference-list&gt;  
&lt;app-conference-details conference=“$ctrl.selectedConference”&gt;  
&lt;/app-conference-details&gt;  
</code></pre>

<p>Teraz dokładnie widoczne jest skąd pochodzą dane, a szczegóły implementacyjne komponentów są właściwie nieistotne. Komponent <code>&lt;app‑conference‑details&gt;</code> można by bez problemu ponownie wykorzystać w innym miejscu na stronie, a jedynym warunkiem jest podanie mu <code>conference</code> jako atrybutu. Kod JS tego jednego komponentu może wyglądać tak:</p>

<pre><code class="language-javascript">angular  
    .module('app')
    .component('appConferenceDetails', {
        controller: 'ConferenceDetails',
        bindings: {
            'conference': '&lt;'
        }
    });
</code></pre>

<p>Warto zwrócić również uwagę na specjalny rodzaj <em>bindingu</em> widoczny tutaj: <code>&lt;</code>. Jest to <em>binding</em> jednokierunkowy – oznacza to, że zmiany w <code>conference</code> będą przekazywane do tego komponentu, ale jeśli <code>conference</code> zostanie nadpisane wewnątrz niego to rodzic nie zostanie o tym poinformowany. Zmiany w atrybucie płyną w dół, ale nie w górę – czyli dokładnie coś czego tutaj potrzebujemy.</p>

<p>Na zakończenie dodam, że opisana wyżej hipotetyczna refaktoryzacja na komponenty jednak nigdy nie doszła do skutku, gdyż rzadko kiedy jest czas aby kompletnie przebudować coś co działa w zasadzie prawidłowo, szczególnie że projekt dzisiaj jest już <em>legacy</em>. Zdobytą wiedzę na temat komponentów na szczęście stosuję z powodzeniem w innych projektach i chętnie tym doświadczeniem się podzielę. Więcej szczegółów na temat komponentów w AngularJS napiszę w kolejnej części.</p>

<h1 id="angular2">Angular2</h1>

<p>Nawiasem mówiąc, w ten sposób naturalną drogą rozwoju dochodzimy do koncepcji, które są w zasadzie fundamentami budowy aplikacji w Angular2, albo prawdopodobnie jakimkolwiek nowoczesnym frameworku <em>Single Page Applications</em>. Niezależnie komponenty i dane przekazywane od rodzica do dziecka. Więcej na temat tworzenia aplikacji w samym Angularze2 napiszę już wkrótce, gdyż właśnie teraz staram się uporządkować wiedzę na ten temat.</p>

<div class="footnotes"><ol><li class="footnote" id="fn:1"><p>Model-View-Whatever <a href="#fnref:1" title="return to article">↩</a></p></li></ol></div>
