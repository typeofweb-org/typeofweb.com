---
id: 650
index: 45
title: Pierwszy komponent w React.js
date: 2017-12-08T14:30:58.000Z
isMarkdown: true
status: publish
permalink: pierwszy-komponent-react-js
authors:
  - michal-miszczyszyn
guid: https://typeofweb.com/?p=650
type: post
thumbnail:
  url: https://typeofweb.com/wp-content/uploads/2017/10/pexels-photo-175773.jpeg
  width: 1280
  height: 853
categories:
  - slug: javascript
    name: JavaScript
  - slug: front-end
    name: Front-end
series:
  slug: react-js
  name: React.js
seo: {}
---

W tym wpisie pokażę prosty <strong>komponent React.js</strong>, opiszę jego budowę i podstawowe elementy. Napiszemy też (razem) pierwszą pełnoprawną aplikację w React, którą będziesz mogła/mógł uruchomić u siebie na dysku. Będzie to baza do dalszych części <strong>kursu React.js</strong>.

<!--more-->

Wróćmy do poprzedniego przykładu, tak zwanego Hello World, w React.js. Oto on, tym razem w pełnej okazałości:

<pre><code class="language-html">&lt;!DOCTYPE html&gt;
&lt;html lang="pl"&gt;

&lt;head&gt;
  &lt;meta charset="UTF-8"&gt;
  &lt;title&gt;Pierwszy komponent w React.js&lt;/title&gt;
  &lt;script src="https://unpkg.com/react/umd/react.development.js"&gt;&lt;/script&gt;
  &lt;script src="https://unpkg.com/react-dom/umd/react-dom.development.js"&gt;&lt;/script&gt;
  &lt;script src="https://unpkg.com/babel-standalone/babel.js"&gt;&lt;/script&gt;
&lt;/head&gt;

&lt;body&gt;
  &lt;div id="app"&gt;&lt;/div&gt;
  &lt;script type="text/babel"&gt;
    ReactDOM.render(
      &lt;h1&gt;Witaj, świecie!&lt;/h1&gt;,
      document.getElementById('app')
    );
  &lt;/script&gt;
&lt;/body&gt;

&lt;/html&gt;</code></pre>

Jeśli teraz skopiujesz ten kod i zapiszesz pod nazwą <code>index.html</code> , a następnie otworzysz w przeglądarce to zobaczysz napis „Witaj, świecie!”. <strong>Ale jak to działa?</strong>

<h2>Hello, world React.js</h2>
<h3>Biblioteki react.js, react-dom.js</h3>
Do działania Reacta w przeglądarce potrzebujesz przynajmniej dwóch bibliotek: <code>react.js</code> oraz <code>react-dom.js</code>. Ta pierwsze to wszystkie koncepty i funkcje React, natomiast ta druga odpowiada konkretnie za renderowanie efektów w przeglądarce.

Skąd ten podział? Wynika on z tego, że <strong>aplikacje napisane w React możemy renderować nie tylko w przeglądarkach internetowych</strong>, ale też np. na okularach VR (<code>react-vr</code>), natywnie na urządzeniach mobilnych (<code>react-native</code>) albo po stronie serwera w node.js (<code>react-dom/server</code>).

Wracając do kodu — chcesz renderować w przeglądarce, więc dodajesz te dwa pliki. To tyle.

<h3>Babel.js</h3>
Linijkę poniżej widzisz też dodany plik babel.js. Ale co to w ogóle jest Babel? Wspominałem już, że będę korzystał ze składni <strong>JSX</strong>, czyli takiego HTML-a wewnątrz JavaScript. Składnia ta nie jest wspierana bezpośrednio przez przeglądarki (jeszcze?), więc potrzebuję narzędzia, które tę składnię „przetłumaczy” na coś dla przeglądarek zrozumiałego. Więcej dokładnie o tym jak wygląda kod bez JSX powiem później, tutaj tylko krótko: Chcę używać JSX, więc dodaję Babela. I tyle :)

<strong>Babel</strong> dodatkowo też zamienia kod napisany w ES2017 na kod zrozumiały również dla starszych przeglądarek — np. ES5. Dzięki temu ten komponent zadziała nawet pod Internet Explorer ;)

<h3>script type="text/babel"</h3>
Babel jednak automatycznie nie działa na wszystkich skryptach na stronie. Kod, który ma być przez niego obsługiwany wymaga oznaczenia przy pomocy atrybutu <code>type</code>. Możemy użyć wartości text/babel lub text/jsx. Dzięki temu Babel bierze kod, transpiluje i przekazuje do przeglądarki :) I tak działa ta prosta aplikacja. Na potrzeby prostych przykładów możesz z tego korzystać. <strong>Później dowiesz się, jak przygotować swój kod tak, aby działał jak najlepiej i najwydajniej na produkcji dzięki <code>webpack</code>.</strong>
<h3>ReactDOM.render(…)</h3>
W kodzie, który widzisz powyżej, używam tylko jednej funkcji: <strong><code>ReactDOM.render</code></strong> Co ta funkcja robi? Bierze kod napisany w JSX, w którym zdefiniowano <span style="text-decoration: underline;">co</span> ma być wyświetlone oraz element <span style="text-decoration: underline;">gdzie</span> ma być wyświetlona wyrenderowana aplikacja.

W tym przypadku renderujemy tylko napis „Witaj, świecie!” wewnątrz elementu o <code>id="app"</code>. Bez problemu możemy ten przykład pozmieniać. Wystarczy tylko znajomość HTML:

<pre><code class="language-javascript">ReactDOM.render(
  &lt;div&gt;
    &lt;h1&gt;Witaj, świecie!&lt;/h1&gt;
    &lt;h2&gt;Jestem ambitna/y, więc przerabiam kurs React.js!&lt;/h2&gt;
  &lt;/div&gt;,
  document.getElementById('app')
);</code></pre>

Ale ten przykład również nie jest zbyt ciekawy, prawda? Przecież aplikacje mają być interaktywne i „żywe”. Do tego będziesz musiał(a) zbudować <strong>komponent w React.js</strong>.

<h2>Komponenty</h2>
Wiele razy padło już słowo „komponent”, ale nie napisaliśmy jeszcze żadnego. Czas to zmienić! Najprostszy komponent to po prostu funkcja:
<pre><code class="language-javascript">function MojKomponent() {
  return (
    &lt;div&gt;
      &lt;h1&gt;Witaj, świecie!&lt;/h1&gt;
      &lt;h2&gt;Jestem ambitna/y, więc przerabiam kurs React.js!&lt;/h2&gt;
    &lt;/div&gt;
  );
}</code></pre>
To naprawdę tak proste :) Tworzysz funkcję i w środku niej zwracasz JSX. Następnie tej funkcji możesz użyć w znanym już kodzie:
<pre><code class="language-javascript">ReactDOM.render(
  &lt;MojKomponent /&gt;,
  document.getElementById('app')
);</code></pre>
<p data-height="265" data-theme-id="0" data-slug-hash="aLrLaK" data-default-tab="js,result" data-user="mmiszy" data-embed-version="2" data-pen-title="Wstęp do React">Zauważ, że funkcji <code>MojKomponent</code> używam tutaj tak,<strong> jakby była nowym elementem w HTML!</strong> Sprawia to, że budowanie aplikacji z komponentów jest bajecznie łatwe i przyjemne. Zobaczmy to na żywo:</p>
<p class="codepen" data-height="265" data-theme-id="0" data-slug-hash="aLrLaK" data-default-tab="js,result" data-user="mmiszy" data-embed-version="2" data-pen-title="Wstęp do React">Zobacz Pen <a href="https://codepen.io/mmiszy/pen/aLrLaK/">Pierwszy komponent w React.js</a> by Michał Miszczyszyn (<a href="https://codepen.io/mmiszy">@mmiszy</a>) na <a href="https://codepen.io">CodePen</a>.</p>
<p data-height="265" data-theme-id="0" data-slug-hash="aLrLaK" data-default-tab="js,result" data-user="mmiszy" data-embed-version="2" data-pen-title="Wstęp do React">W kolejnej części opiszę jak wygląda parametryzowanie komponentów: Nauczysz się wpływać na komponenty dzięki mechanizmowi tzw. <code>props</code>.</p>

[typeofweb-courses-slogan category="React"]

Jeśli chcesz na bieżąco śledzić kolejne części kursu React.js to koniecznie <strong>zapisz się na newsletter i śledź mnie na Facebooku.</strong>

<div style="text-align: center; margin-bottom: 40px;">[typeofweb-mailchimp title=""]</div>
<div style="text-align: center;">[typeofweb-facebook-page]</div>
<h2 data-height="265" data-theme-id="0" data-slug-hash="aLrLaK" data-default-tab="js,result" data-user="mmiszy" data-embed-version="2" data-pen-title="Wstęp do React">Ćwiczenie</h2>
<strong>Ćwiczenie:</strong> Weź przykład powyżej i stwórz kolejne komponenty i spróbuj je wyświetlić obok siebie. Opisz w komentarzach jeśli jest z tym jakiś problem!
<div class="grammarly-disable-indicator"></div>
