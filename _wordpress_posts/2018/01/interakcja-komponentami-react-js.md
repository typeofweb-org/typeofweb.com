---
title: Interakcja z komponentami React.js
date: 2018-01-08T02:12:39.000Z
isMarkdown: false
status: publish
permalink: interakcja-komponentami-react-js
authors:
  - michal-miszczyszyn
type: post
thumbnail:
  url: >-
    /public/assets/wp-content/uploads/2017/11/bokeh-blur-blue-white-158658.jpeg
  width: 1920
  height: 1080
categories:
  - slug: javascript
    name: JavaScript
  - slug: front-end
    name: Front-end
series:
  slug: react-js
  name: React.js
seo:
  metadesc: >-
    Tworzenie aplikacji nie miałoby sensu, gdyby użytkownik nie mógł wchodzić z
    nią w interakcje :) W tej części kursu React.js nauczysz się obsługiwać
    zdarzenia wywoływane przez użytkowników: Kliknięcia, ruchy kursorem, zmiany
    w polu tekstowym i tym podobne… Zobaczysz, że obsługa zdarzeń w React.js
    jest bardzo prosta.
---

Tworzenie aplikacji nie miałoby sensu, gdyby użytkownik nie mógł wchodzić z nią w interakcje :) Dzisiaj nauczysz się obsługiwać zdarzenia wywoływane przez użytkowników: Kliknięcia, najechania kursorem, zmiany tekstu w polu tekstowym… oczywiście w React.js.

---

<h2>Zdarzenia w JS</h2>

Wszystkie interakcje użytkownika z aplikacją w przeglądarce opierają się o zdarzenia. W czystym JS, aby takie eventy móc obsługiwać, używamy przeznaczonych do tego funkcji, które tworzą i usuwają tzw. <em>event listenery</em>. Robi się to na przykład przez funkcję <code>addEventListener</code> oraz <code>removeEventListener</code>:

<pre class="lang-javascript"><code>const element = document.querySelector('.my-element');
element.addEventListener('click', () =&gt; {
  alert('Kliknięto!');
});</code></pre>

Taki kod powoduje, że za każdym razem gdy użytkownik kliknie w element o klasie <code>.my-element</code> to zostanie wyświetlony alert z komunikatem. Super, prawda? To już znamy. A gdzie React?!

<h2>Zdarzenia w React</h2>

Zdarzenia w React obsługuje się całkowicie deklaratywnie. Nie musisz pisać tego brzydkiego imperatywnego kodu jaki widzisz powyżej. Nie musisz się też martwić tym, aby w odpowiedniej chwili odpiąć zdarzenia gdy komponent jest niszczony — react robi to za Ciebie.

No ale jak? Poprzez proste i łatwe do zapamiętania atrybuty wprost na elementach! Powyższy przykład w React wyglądałby tak:

<pre class="lang-javascript"><code>function MyComponent() {
  return (
    &lt;button onClick={() =&gt; alert('Kliknięto!')}&gt;Kliknij!&lt;/button&gt;
  );
}</code></pre>

Jak widzisz, dodaję na elemencie prosty atrybut <code>onClick</code>, który reaguje na kliknięcia. Zobacz sam(a):

<CodepenWidget height="265" themeId="0" slugHash="ZaOdgq" defaultTab="js,result" user="mmiszy" embedVersion="2" penTitle="Props czyli atrybuty w React.js">
<a href="http://codepen.io/mmiszy/pen/ZaOdgq/">Zobacz Codepen Props czyli atrybuty w React.js</a>.
</CodepenWidget>

<h2 data-height="265" data-theme-id="0" data-slug-hash="ZaOdgq" data-default-tab="js,result" data-user="mmiszy" data-embed-version="2" data-pen-title="Props czyli atrybuty w React.js">Inne zdarzenia React</h2>

Podobnych zdarzeń w React jest bardzo wiele. Najpopularniejsze to:

<ul>
    <li>onClick</li>
    <li>onChange</li>
    <li>onInput</li>
    <li>onMouseOver</li>
    <li>onMouseEnter</li>
    <li>onDragStart</li>
    <li>…</li>
</ul>

I tak dalej, i tym podobne. Listę wszystkich eventów w React można znaleźć tutaj: <a href="https://reactjs.org/docs/events.html" target="_blank" rel="noopener">Dokumentacja SyntheticEvent</a>.

<h2>Obsługa zdarzeń w React.js</h2>

Jak widać na powyższym przykładzie, zdarzenia obsługuje się poprzez przekazanie do atrybutu funkcji. Ale czy taki zapis to jedyna możliwość? Oczywiście nie! Nie musisz przecież tworzyć funkcji wewnątrz JSX, a <strong>wręcz jest to niewskazane</strong>. Najlepiej funkcję zdefiniować wcześniej i dalej tylko się do niej odwołać:

<pre class="lang-jsx"><code>function onClickHandler() {
  alert('Kliknięto!');
}
function MyComponent() {
  return (
    &lt;button onClick={onClickHandler}&gt;Kliknij!&lt;/button&gt;
  );
}</code></pre>

Tutaj przydatna okazuje się często możliwość definiowania metod w klasie:

<pre class="lang-jsx"><code>class App extends React.Component {
  render() {
    return &lt;button onClick={this.onClickHandler}&gt;Kliknij!&lt;/button&gt;;
  }
  onClickHandler() {
    alert("Kliknięto!");
  }
}</code></pre>

<p class="important">Możesz się tutaj natknąć na problem z <code>this</code>, ale temat na jeden z kolejnych wpisów. Z tym też sobie poradzimy :)</p>

<h2>Event w React.js</h2>

Standardowo w JS do <em>event-listenerów</em> przekazywany jest obiekt (zwyczajowo nazywany <code>event</code> lub w skrócie <code>e</code>). Zawiera on informacje o zdarzeniu. Pozwala także przerwać propagację (<code>stopPropagation</code>) lub zapobiec wykonaniu domyślnych akcji (<code>preventDefault</code>). Jak to wygląda w React.js? <strong>Podobnie, ale nie dokładnie tak samo.</strong>

Każda funkcja przekazana jako atrybut do nasłuchiwania na zdarzenia, zostanie wywołana z obiektem typu <code>SyntheticEvent</code>. Cóż to za twór? Jest to Reactowa implementacja, która przede wszystkim <strong>jest identyczna niezależnie od przeglądarki — a to ogromna zaleta!</strong> Obiekt ten również posiada metody takie jak <code>preventDefault</code> czy <code>stopPropagation</code>, a także wiele różnych pól, np:

<ul>
    <li>currentTarget</li>
    <li>target</li>
    <li>bubbles</li>
    <li>timeStamp</li>
    <li>type</li>
</ul>

Oraz wiele innych, w zależności od rodzaju konkretnego zdarzenia. Dodatkowo każdy taki obiekt ma jeszcze własność <code>nativeEvent</code>, która pozwala na dobranie się do natywnej implementacji eventów w danej przeglądarce (jeśli potrzebujesz). Konkretne informacje w linkowanej już <a href="https://reactjs.org/docs/events.html" target="_blank" rel="noopener">dokumentacji SyntheticEvent</a>.

Czy to nie jest mega proste? Jeśli czegoś nie rozumiesz to koniecznie <a href="https://szkolenia.typeofweb.com/" target="_blank">zapisz się na szkolenie z React</a>.

Jeśli chcesz na bieżąco śledzić kolejne części kursu React.js to koniecznie <strong>śledź mnie na Facebooku i zapisz się na newsletter.</strong>

<NewsletterForm />

<FacebookPageWidget />

<h2>Ćwiczenie</h2>

<b>Ćwiczenie:</b> Napisz aplikację, która nasłuchuje na wiele różnych zdarzeń i loguje je do konsoli. Podziel się kodem w komentarzu!
