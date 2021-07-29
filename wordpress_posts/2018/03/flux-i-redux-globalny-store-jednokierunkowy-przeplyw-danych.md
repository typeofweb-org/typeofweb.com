---
id: 18
index: 74
title: 'Flux i Redux: globalny store i jednokierunkowy przepływ danych'
date: 2018-03-29T11:16:34.000Z
isMarkdown: false
status: publish
permalink: flux-i-redux-globalny-store-jednokierunkowy-przeplyw-danych
authors:
  - michal-miszczyszyn
guid: https://typeofweb.com/index.php/2016/06/10/flux-i-redux/
type: post
thumbnail:
  url: https://typeofweb.com/wp-content/uploads/2016/06/pexels-photo-239886.jpeg
  width: 1920
  height: 1280
categories:
  - slug: javascript
    name: JavaScript
  - slug: dobry-kod
    name: Dobry Kod
series:
  slug: react-js
  name: React.js
seo:
  focusKeywords:
    - Redux
    - Flux
---

Na codzień korzystam z <strong>Redux razem z React</strong>. Dawniej używałem też własnej implementacji architektury Flux razem z AngularJS. Postanowiłem napisać o tym koncepcie coś więcej — bo jest to bez wątpienia bardzo ciekawe! <strong>Jednokierunkowy przepływ danych, akcje, dispatcher, action creator, reducer</strong>… to wszystko w tym wpisie :) A do tego klarowne, praktyczne przykłady!

{/_ more _/}

Gdy opisywałem <a href="https://typeofweb.com/2016/05/05/komunikacja-pomiedzy-kontrolerami/">sposoby komunikacji pomiędzy kontrolerami</a> w AngularJS, poniekąd celowo pominąłem pewną alternatywę, która zyskuje ostatnio sporą popularność: Architekturę Flux. Nie wspominałem o Fluksie głównie ze względu na to, że to koncept trochę szerszy niż prosta komunikacja pomiędzy elementami aplikacji o jakiej traktował tamten wpis.

<h2 id="flux">Flux i Redux</h2>

Flux to angielskie słowo oznaczające strumień lub przepływ. Jest to też nazwa <del>biblioteki</del> architektury aplikacji zaproponowanej przez Facebooka. Gigant twierdzi zresztą, że używa Fluksa do budowania swoich aplikacji, a sam koncept stał się ostatnio niezwykle popularny. Podstawą Fluksa jest jeden wzorzec projektowy i jedno proste założenie, dlatego można zacząc z niego korzystać z niezwykłą wręcz łatwością, bez konieczności instalowania dodatkowych bibliotek czy frameworków. <a href="https://szkolenia.typeofweb.com/" target="_blank">zapisz się na szkolenie z Flux i Redux</a>.

<h3 id="cqrs">CQRS</h3>

Flux opiera się o stary, dobry wzorzec projektowy <strong>CQRS</strong>. Skrótowiec rozwija się do <em>Command Query Responsibility Segregation</em>, czyli w luźnym tłumaczeniu rozdzielenie zapytań od rozkazów. Wzorzec ten został pierwszy raz opisany przez Bertranda Meyera i spopularyzowany przez Grega Younga, i zasadniczo opiera się o pomysł, aby <strong>rozdzielić od siebie fragmenty modelu odpowiedzialne za pobieranie informacji od tych odpowiedzialnych za ich modyfikację</strong>.

Dlaczego ma to sens? Jednym z często powtarzanych przykładów jest różnica w częstotliwości odczytywania i zapisywania czegoś przez użytkowników w aplikacji. Wyobraź sobie portal społecznościowy, na którym każdy może czytać posty innych oraz samemu wrzucać nowe ciekawostki ze swojego życia. Zgodnie z <a href="https://pl.wikipedia.org/wiki/Zasada_Pareta">zasadą Pareta</a>, nie pomylisz się bardzo jeśli założysz, że 80% postów pochodzi od 20% użytkowników. Innymi słowy tylko 20% użytkowników coś pisze, a reszta prawie wyłącznie czyta.

Na tej podstawie warto zadać pytanie: Czy sensownie jest, aby fragmenty aplikacji odpowiedzialne za pisanie i za czytanie były połączone i skalowane w tym samym stopniu? Prawdopodobnie nie i prawdopodobnie w analogiczny sposób zasadę Pareta można zastosować z powodzeniem do dowolnej aplikacji internetowej. <strong>Jednym z założeń wzorca CQRS jest rozwiązanie tego problemu</strong>. Warto też jednak pamiętać, że stosowanie CQRS nie zawsze ma sens – Martin Fowler pisze więcej na ten temat na <a href="http://martinfowler.com/bliki/CQRS.html">swoim blogu</a>.

<h2 id="podstawyflux">Podstawy Flux i Redux</h2>

Architektura Flux przewiduje istnienie trzech głównych części<sup id="fnref-1"><a href="#fn-1" rel="footnote">1</a></sup>:

<ul>
    <li><strong>Dispatcher</strong> – odpowiedzialny jest za odbieranie akcji i rozsyłanie ich do odpowiednich Store’ów</li>
    <li><strong>Store</strong> – odpowiadają za przechowywanie informacji</li>
    <li><strong>View</strong> – widok, źródło akcji</li>
</ul>

Dodatkowym założeniem obowiązującym we Fluksie jest to, że <strong>informacje przepływają tylko w jednym, zawsze tym samym kierunku</strong>. Flux rezygnuje z MVC na rzecz jednokierunkowego przepływu danych (<strong>unidirectional data flow</strong>). Istotna jest tutaj całkowita enkapsulacja Store’ów – z zewnątrz można przy pomocy odpowiedniej metody jedynie odczytać zawartość Store’a, niemożliwa jest jednak jego modyfikacja. <strong>Wszelkie zmiany jego zawartości zachodzą poprzez przesłanie odpowiedniej akcji przez Dispatcher</strong>. I w ten sposób jasny staje się przepływ informacji<sup id="fnref-2"><a href="#fn-2" rel="footnote">2</a></sup>:

<img src="/content/images/2016/06/flux-simple-f8-diagram-with-client-action-1300w.png" alt="Architektura Flux" />

Tak to wygląda koncepcyjnie. Więcej na ten temat można poczytać na <a href="https://facebook.github.io/flux/docs/overview.html#content">stronie Fluksa</a>. <strong>Jest to tylko architektura, a więc implementacja tego pomysłu może być w zasadzie dowolna</strong> (np. Redux czy MobX). Facebook udostępnia co prawda swoją bibliotekę <a href="https://facebook.github.io/flux/docs/dispatcher.html">Dispatcher.js</a>, ale nie trzeba z niej wcale korzystać. Implementacji Fluksa jest sporo, ostatni raz gdy sprawdzałem było ich chyba tuzin, niekompletną listę można znaleźć <a href="https://github.com/voronianski/flux-comparison#ready">tutaj</a>. O Fluksie szerzej <a href="http://www.slideshare.net/wookieb/flux-prezentacja">opowiadał na Gdańskim meet.js</a> Łukasz Kużyński. Dalej chciałbym powiedzieć o całkowicie alternatywnej implementacji Fluksa – Redux.

<h2 id="redux">Redux</h2>

<strong>Redux jest implementacją architektury Flux</strong>, do której dodano nieco <strong>programowania funkcyjnego</strong> i skorzystano ze wzorca <storng><a href="http://martinfowler.com/eaaDev/EventSourcing.html">Event Sourcing</a></strong>. Na stronie Reduksa podane są trzy główne zasady, o której opiera się cała filozofia tej biblioteki:

<figure id="attachment_1308" align="alignright" width="1024">
  <a href="https://typeofweb.com/wp-content/uploads/2016/06/redux-logo-e1522339859612.png"><img src="https://typeofweb.com/wp-content/uploads/2016/06/redux-logo-e1522339859612-1024x380.png" alt="Kurs Flux i Redux" width="1024" height="380" class="size-large wp-image-1308" /></a>
  <figcaption>
    Logo Redux
  </figcaption>
</figure>

<h3 id="caystanaplikacjijestprzechowywanywdrzewiewjednym_storze_">Cały stan aplikacji jest przechowywany w drzewie w jednym <em>storze</em></h3>

To założenie sprawia, że rozumowanie na temat stanu aplikacji staje się jeszcze prostsze. Chcesz przesłać stan z serwera do aplikacji lub w drugą stronę? Nie ma najmniejszego problemu, to tylko jeden obiekt. Chcesz zserializować stan i zapisać np. do JSON? Nic prostszego.

<h3 id="stanjesttylkodoodczytuwszystkiezmianyzachodzpoprzezakcje">Stan jest tylko do odczytu; wszystkie zmiany zachodzą poprzez akcje</h3>

<strong>Nic nie modyfikuje stanu bezpośrednio</strong>. Zamiast tego, wysyłane są akcje, które reprezentują intencje. Wszystkie akcje przechodzą przez centralny punkt i są analizowane jedna po jednej w określonej kolejności (reducer). Dzięki temu nie tylko eliminowane są wszelkie <a title="elektronika" href="https://pl.wikipedia.org/wiki/Hazard_(elektronika)">wyścigi</a>, ale też możliwe jest np. zapisywanie zdarzeń w celu łatwiejszego debugowania. Jest to nic innego niż implementacja wzorca <em>Event Sourcing</em> i dzięki temu <strong>trywialna stała się implementacja funkcji, które do tej pory były niezwykle skomplikowane</strong>: na przykład „cofnij” i „powtórz” – który zresztą jest sztandarowym przykładem Reduksa.

<h3 id="abyzdefiniowajakakcjawpywanastannaleynapisa_purefunction_supidfnref3ahreffn3relfootnote3asup">Aby zdefiniować jak akcja wpływa na stan, należy napisać <strong>reducer</strong>, który jest <em>pure function</em><sup id="fnref-3"><a href="#fn-3" rel="footnote">3</a></sup></h3>

<strong>Reducer to funkcja, które przyjmuje poprzedni stan oraz akcję i zwraca zupełnie nowy stan</strong>, nie zmieniając przy okazji obiektu reprezentującego stanu poprzedni (<strong>nie mutują go</strong>). Najczęściej rozpoczyna się od stworzenia jednego reducera, a później, gdy aplikacja się rozrasta, dodaje się kolejne reducery, znajmujące się konkretnymi <strong>fragmentami stanu</strong>.

Wydaje się proste? No i jest bardzo proste. To w zasadzie wszystko co trzeba wiedzieć o Reduksie! Trzy zasady wraz z przykładami kody można znaleźć <a href="http://redux.js.org/docs/introduction/ThreePrinciples.html">w dokumentacji Reduksa</a>. Przejdźmy teraz do konkretów…

<h2 id="aplikacjazredux">Aplikacja z Redux</h2>

Najprostszym i powszechnie powielanym przykładem użycia Redux jest stworzenie aplikacji-licznika, której jedynym zadaniem jest reagowanie na kliknięcia w guziki, które zwiększają i zmniejszają licznik wyświetlany na stronie. Łatwizna! Spójrz na kod źródłowy. To, co Cię interesuje to funkcja reducer oraz stworzenie Store’a:

<pre><code class="language-javascript">// pure reducer function
function counter(state = 0, action) {  
    switch (action.type) {
        case 'INCREMENT':
            return ++state;
        case 'DECREMENT':
            return --state;
    }
    return state;
}
</code></pre>

W pierwszej linijce definiuję, że domyślnie <code>state = 0</code>, gdy ten argument nie będzie zdefiniowany. Może się tak zdarzyć, jeśli jest to stan początkowy i w takim wypadku to reducer powinien wiedzieć jaki jest domyślny stan aplikacji. Przypisuję więc 0, bo to od tej liczby chciałbym zacząć liczyć. Następnie sprawdzam jaka akcja miała miejsce. Zwyczajowo akcje w Reduksie są zwykłymi stringami, więc prosty <code>switch</code> wystarczy. Odpowiednio zwiększam lub zmniejszam licznik i zwracam nowy stan.

<pre><code class="language-javascript">const store = Redux.createStore(counter);  
store.subscribe(render);  
render();  
</code></pre>

Następnie tworzę nowy store oraz wywołuję funkcję <code>store.subscribe(render)</code>, dzięki której <code>render</code> zostanie automatycznie wywołany zawsze, gdzy store się zmieni. Wewnątrz funkcji <code>render</code> pobieram zaś zawartość store’a i wyświetlam w najprotszy możliwy sposób:

<pre><code class="language-javascript">function render() {  
    $$('#result').textContent = store.getState();
}
</code></pre>

Ostatecznie podpinam pod zdarzenia <code>click</code> obu przycisków akcje <code>INCREMENT</code> i <code>DECREMENT</code>:

<pre><code class="language-javascript">store.dispatch({  
    type: 'INCREMENT'
});
</code></pre>

Od teraz po kliknięciu przycisków licznik się zmienia. Zobacz to na własne oczy:

<CodepenWidget height="250" themeId="light" slugHash="xOZWYy" defaultTab="js,result" user="mmiszy" embedVersion="2"><a href="http://codepen.io/mmiszy/pen/xOZWYy/">Zobacz Codepen</a>.</CodepenWidget>

<h2 id="niemutowalnystan">Niemutowalny stan w Redux</h2>

Wspomniałem o tym, że stan zwracany przez reducer musi być całkowicie nowym obiektem – <strong>nie można mutować poprzedniego stanu</strong>. W prostym przykładzie powyżej nie było problemu, ponieważ stanem była liczba, czyli jeden z <strong>typów prostych</strong>, które w JavaScripcie przekazywane są przez wartość (kopiowane).

Weź jednak bardziej skomplikowany przykład. Przyjmijmy, że stan nie jest liczbą, lecz obiektem <code>state = {counter: 0}</code>. W takim przypadku musisz <strong>zwrócić całkowicie nowy obiekt</strong> z powiększonym lub zmniejszonym licznikiem. Z pomocą przychodzi funkcja <code>Object.assign</code>:

<pre><code class="language-javascript">function reducer(state = {counter: 0}, action) {  
    switch (action.type) {
        case 'INCREMENT':
            return Object.assign({}, state, {counter: state.counter + 1});
        case 'DECREMENT':
            return Object.assign({}, state, {counter: state.counter - 1});
    }
    return state;
}
</code></pre>

<code>Object.assign({}, state)</code> oznacza tyle co „skopiuj pola z obiektu <code>state</code> do nowego pustego obiektu”. Kolejne argumenty przekazywane do tej funkcji powodują dodanie lub nadpisanie odpowiednich pól w obiekcie. Więcej na ten temat można doczytać w artykule <a href="https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign">Object.assign na MDN</a>. Jest to niezwykle przydatna funkcja, gdy zależy nam na szybkim <strong>płytkim</strong> skopiowaniu jakiejś struktury danych. Analogiczne rozwiązania dostępne są też w popularnych bibliotekach takich jak <code>lodash</code> albo <code>underscore</code>.

<CodepenWidget height="450" themeId="light" slugHash="dXGmax" defaultTab="js,result" user="mmiszy" embedVersion="2"><a href="http://codepen.io/mmiszy/pen/dXGmax/">Zobacz Codepen</a>.</CodepenWidget>

<h2 id="podsumowanie">Podsumowanie Flux i Redux</h2>

To w zasadzie wszystko, co chciałem dzisiaj napisać. Celowo wydzieliłem posta o Fluksie i Reduksie, bo to architektura bardzo uniwersalna i niezwiązana właściwie z żadnym frameworkiem. <strong>Znajomość uniwersalnych wzorców jest zawsze bardziej cenna niż znajomość konkretnych frameworków</strong>.

W tym wpisie omówiłem podstawowe założenia architektury Flux oraz jej zalety. Opisałem też jedną przykładową, bardzo popularną implementację o nazwie Redux. Zachęcam do komentowania!

<div class="footnotes">
<ol>
    <li id="fn-1" class="footnote">Tłumaczenie Dispatcher jako dyspozytor wydało mi się komiczne, więc pozostanę przy oryginalnych angielskich nazwach. <a title="return to article" href="#fnref-1">↩</a></li>
    <li id="fn-2" class="footnote">Obrazek z <a href="https://facebook.github.io/flux/docs/overview.html#content">https://facebook.github.io/flux/docs/overview.html#content</a> <a title="return to article" href="#fnref-2">↩</a></li>
    <li id="fn-3" class="footnote">Teoretycznie to określenie funkcjonuje w języku polskim jako „czysta funkcja”, ale nie brzmi to dla mnie dobrze <a title="return to article" href="#fnref-3">↩</a></li>
</ol>
</div>
