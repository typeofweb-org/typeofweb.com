---
id: 733
index: 48
title: Podział na komponenty w React.js
date: 2017-12-17T10:48:35.000Z
isMarkdown: true
status: publish
permalink: podzial-komponenty-react-js
authors:
  - michal-miszczyszyn
guid: https://typeofweb.com/?p=733
type: post
thumbnail:
  url: https://typeofweb.com/wp-content/uploads/2017/11/pexels-photo-268415.jpeg
  width: 1280
  height: 960
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

W tej części skupisz się na teorii i praktyce dzielenia zaprojektowanych aplikacji na poszczególne komponenty. Zaczniesz też tworzyć prostą appkę — menedżer kontaktów. W planach wyświetlanie, dodawanie i edycja kontaktów. Ale najpierw — musimy przecież zaprojektować HTML i CSS dla tej aplikacji.

<!--more-->
<h2>Projekt</h2>
Przyjrzyj się temu co będziesz budował(a). Będzie to lista kontaktów, ale na początku spójrz tylko na pierwszy widok:

<a href="https://typeofweb.com/wp-content/uploads/2017/11/Screen-Shot-2017-11-03-at-3.42.25-PM.png"><img class="aligncenter wp-image-735 size-large" src="https://typeofweb.com/wp-content/uploads/2017/11/Screen-Shot-2017-11-03-at-3.42.25-PM-e1509722763475-1024x528.png" alt="Komponenty w React.js i JSX" width="1024" height="528" /></a>

<strong>To dzisiaj „potniemy” i podzielimy na komponenty React.js w JSX.</strong>

[typeofweb-courses-slogan category="React"]

Zacznij od napisania kodu HTML i CSS. W przykładzie wykorzystuję framework CSS semantic-ui, ale na dobrą sprawę z łatwością napiszesz wszystko w gołym CSS. Możesz też użyć bootstrapa — do woli. Oto kod HTML:

<pre class="language-html"><code>&lt;header class="ui fixed menu"&gt;
  &lt;nav class="ui container"&gt;
    &lt;a href="#" class="header item"&gt;
      &lt;img class="logo" src="https://typeofweb.com/wp-content/uploads/2017/08/cropped-typeofweb_logo-04-white-smaller-1-e1504359870362.png" /&gt;
      Lista kontaktów
    &lt;/a&gt;
    &lt;div class="header item"&gt;
      &lt;button class="ui button"&gt;Dodaj&lt;/button&gt;
    &lt;/div&gt;
  &lt;/nav&gt;
&lt;/header&gt;
&lt;main class="ui main text container"&gt;
  &lt;ul class="ui relaxed divided list selection"&gt;
    &lt;li class="item"&gt;
      &lt;img src="https://api.adorable.io/avatars/55/typeofweb1.png" class="ui mini rounded image" /&gt;
      &lt;div class="content"&gt;
        &lt;h4 class="header"&gt;Lena&lt;/h4&gt;
        &lt;div class="description"&gt;JavaScript Developer&lt;/div&gt;
      &lt;/div&gt;
    &lt;/li&gt;
    &lt;li class="item"&gt;
      &lt;img src="https://api.adorable.io/avatars/55/typeofweb2.png" class="ui mini rounded image" /&gt;
      &lt;div class="content"&gt;
        &lt;h4 class="header"&gt;Brian&lt;/h4&gt;
        &lt;div class="description"&gt;Human Resources&lt;/div&gt;
      &lt;/div&gt;
    &lt;/li&gt;
    &lt;li class="item"&gt;
      &lt;img src="https://api.adorable.io/avatars/55/typeofweb3.png" class="ui mini rounded image" /&gt;
      &lt;div class="content"&gt;
        &lt;h4 class="header"&gt;Rick&lt;/h4&gt;
        &lt;div class="description"&gt;QA&lt;/div&gt;
      &lt;/div&gt;
    &lt;/li&gt;
  &lt;/ul&gt;
&lt;/main&gt;</code></pre>

Jest tutaj nagłówek z logo i przyciskiem dodawania kontaktów oraz lista z trzema kontaktami. Wygląda dokładnie jak na screenshocie powyżej. Ale chcesz mieć to w React, prawda? Do dzieła!

<p class="important">Na razie nie skupiam się na <strong>sposobach używania kodu CSS do Reacta</strong> i po prostu dodałem <code>&lt;link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.13/semantic.min.css"&gt;</code> do mojego kodu.,</p>

<h2>Podział na komponenty w React.js</h2>
Do tej pory tworzyliśmy jeden komponent i renderowaliśmy go przez funkcję <code>ReactDOM.render</code>. Napisałaś/eś wtedy pewnie coś w stylu <code>&lt;App /&gt;</code>. Czy to oznacza, że własne komponenty są także elementami? Tak jakby. Możemy ich używać w JSX tak, jakby nimi były. Czy to nie jest ekstra?

Myśląc o aplikacji postaraj się ją jakoś logicznie podzielić. Na jak najmniejsze fragmenty. <strong>To będą Twoje komponenty</strong>. Co możemy natychmiast wydzielić w naszej aplikacji? Oczywiście <strong>nawigację na górze</strong> oraz <strong>listę kontaktów</strong>. Świetna myśl! Dalej w oczy rzuca się możliwość odseparowania komponentu dla <strong>poszczególnych kontaktów</strong> — tak, aby nie powielać ich kodu. Dodatkowo, można by się pokusić o stworzenie osobnego komponentu dla <strong>avatarów</strong> — z tego względu, że zawarte jest w nim nieco logiki. Na schemacie wygląda to jakoś tak:

<a href="https://typeofweb.com/wp-content/uploads/2017/11/Screen-Shot-2017-11-03-at-7.13.13-PM-e1509732879504.png"><img class="aligncenter size-large wp-image-739" src="https://typeofweb.com/wp-content/uploads/2017/11/Screen-Shot-2017-11-03-at-7.13.13-PM-e1509732879504-1024x476.png" alt="Schemat komponentów w React.js" width="1024" height="476" /></a>

Wszystko zaplanowane? Czas na kod!

<h2>Komponenty w React.js</h2>
Zacznij od stworzenia jednego komponentu w React i sprawienia, aby się wyświetlał. Potem przejdź do podziału. Pierwsze co musimy zrobić to zamienić wszystkie <code>class</code> na <code>className</code> w HTML. Potem już z górki:
<pre class="language-html"><code>function App() {
  return (
    &lt;div&gt;
      &lt;header className="ui fixed menu"&gt;
        …
      &lt;/header&gt;
      ……
    &lt;/div&gt;
  );
}</code></pre>
To było proste, prawda? To już znasz. Teraz pozostaje wydzielić tylko pozostałe komponenty. Tworzymy <code>AppHeader</code>, <code>ContactsList</code> i <code>ContactItem</code> i wewnątrz nich odpowiedni kod. <code>App</code> ostatecznie będzie wyglądał tak:
<pre class="language-javascript"><code>function App() {
  return (
    &lt;div&gt;
      &lt;AppHeader /&gt;
      &lt;main className="ui main text container"&gt;
        &lt;ContactsList /&gt;
      &lt;/main&gt;
    &lt;/div&gt;
  );
}
ReactDOM.render(, document.getElementById("app"));</code></pre>
<code>AppHeader</code> to łatwizna, więc nawet tutaj nie wrzucam. <code>ContactsList</code> jest nieco ciekawszy, bo wewnątrz używa kolejnego komponentu i przekazuje do niego <strong>propsy</strong>:
<pre class="language-javascript"><code>function ContactsList() {
  return (
    &lt;ul className="ui relaxed divided list selection"&gt;
      &lt;ContactItem
        login="typeofweb1"
        name="Lena"
        department="JavaScript Developer"
      /&gt;
      &lt;ContactItem
        login="typeofweb2"
        name="Brian"
        department="Human Resources"
      /&gt;
      &lt;ContactItem
        login="typeofweb3"
        name="Rick"
        department="QA"
      /&gt;
    &lt;/ul&gt;
  );
}</code></pre>
Mamy tutaj komponent <code>ContactsList</code>, który tworzy listę i wewnątrz niej 3 komponenty <code>ContactItem</code>. Do nich <strong>przekazywane są odpowiednie propsy</strong>: Login, name i department, które służą do sparametryzowania tego co wyświetla komponent. W związku z tym <code>ContactItem</code> przyjmuje 3 propsy jako argument:
<pre class="language-javascript"><code>function ContactItem({ login, name, department }) {
  const imgUrl = `https://api.adorable.io/avatars/55/${login}.png`;
  return (
    &lt;li className="item"&gt;
      &lt;img src={imgUrl} className="ui mini rounded image" /&gt;
      &lt;div className="content"&gt;
        &lt;h4 className="header"&gt;{name}&lt;/h4&gt;
        &lt;div className="description"&gt;{department}&lt;/div&gt;
      &lt;/div&gt;
    &lt;/li&gt;
  );
}</code></pre>
Poniżej efekt końcowy wraz z kodem:
<p class="codepen" data-height="300" data-theme-id="0" data-slug-hash="bYEaNQ" data-default-tab="js,result" data-user="mmiszy" data-embed-version="2" data-pen-title="Props czyli atrybuty w React.js">See the Pen <a href="https://codepen.io/mmiszy/pen/bYEaNQ/">Props czyli atrybuty w React.js</a> by Michał Miszczyszyn (<a href="https://codepen.io/mmiszy">@mmiszy</a>) on <a href="https://codepen.io">CodePen</a>.</p>

<h2>Co dalej?</h2>
W kolejnych wpisach dodasz interakcję (np. kliknięcia) do komponentów. Dodatkowo poznasz stan (<code>state</code>), który potem przyda się nam przy rozbudowie aplikacji. Bez niego praktycznie niemożliwe byłoby tworzenie jakichkolwiek aplikacji, które oprócz wyświetlania treści miałyby robić cos jeszcze :)

Jeśli chcesz na bieżąco śledzić kolejne części kursu React.js to koniecznie <strong>śledź mnie na Facebooku i zapisz się na newsletter.</strong>

<div style="text-align: center; margin-bottom: 40px;">[typeofweb-mailchimp title=""]</div>
<div style="text-align: center;">[typeofweb-facebook-page]</div>
<h2>Ćwiczenie</h2>
<strong>Ćwiczenie:</strong> Stwórz komponent do wyświetlania avatarów i przenieś do niego kod za to odpowiedzialny. Niech ten komponent przyjmuje jako props tylko login. Wrzuć swój kod w komentarzu!

<strong>Ćwiczenie\*:</strong> Zmodyfikuj stworzony komponent z avatarem tak, aby obecne obrazki były wyświetlane gdy login nie jest mailem. Natomiast gdy jest mailem to skorzystaj z Gravatara. Zauważ, że całkowita zmiana działania tego komponentu nie wymaga wprowadzania żadnych zmian w pozostałym kodzie aplikacji!

<div class="grammarly-disable-indicator"></div>
<div class="grammarly-disable-indicator"></div>
