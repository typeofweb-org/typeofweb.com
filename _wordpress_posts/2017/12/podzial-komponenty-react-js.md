---
title: Podział na komponenty w React.js
date: 2017-12-17T10:48:35.000Z
isMarkdown: false
status: publish
permalink: podzial-komponenty-react-js
authors:
  - michal-miszczyszyn
type: post
thumbnail:
  url: /public/assets/wp-content/uploads/2017/11/pexels-photo-268415.jpeg
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

---

<h2>Projekt</h2>

Przyjrzyj się temu co będziesz budował(a). Będzie to lista kontaktów, ale na początku spójrz tylko na pierwszy widok:

<a href="/public/assets/wp-content/uploads/2017/11/Screen-Shot-2017-11-03-at-3.42.25-PM.png"><img class="aligncenter wp-image-735 size-large" src="/public/assets/wp-content/uploads/2017/11/Screen-Shot-2017-11-03-at-3.42.25-PM-e1509722763475-1024x528.png" alt="Komponenty w React.js i JSX" width="1024" height="528" /></a>

<strong>To dzisiaj „potniemy” i podzielimy na komponenty React.js w JSX.</strong>

<a href="https://szkolenia.typeofweb.com/" target="_blank">zapisz się na szkolenie z React</a>.

Zacznij od napisania kodu HTML i CSS. W przykładzie wykorzystuję framework CSS semantic-ui, ale na dobrą sprawę z łatwością napiszesz wszystko w gołym CSS. Możesz też użyć bootstrapa — do woli. Oto kod HTML:

<pre class="language-html"><code>&lt;header class="ui fixed menu"&gt;
  &lt;nav class="ui container"&gt;
    &lt;a href="#" class="header item"&gt;
      &lt;img class="logo" src="/public/assets/wp-content/uploads/2017/08/cropped-typeofweb_logo-04-white-smaller-1-e1504359870362.png" /&gt;
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

<CodepenWidget height="300" themeId="0" slugHash="bYEaNQ" defaultTab="js,result" user="typeofweb" embedVersion="2" penTitle="Props czyli atrybuty w React.js">
<a href="http://codepen.io/typeofweb/pen/bYEaNQ/">Zobacz Codepen Props czyli atrybuty w React.js</a>.
</CodepenWidget>

<h2>Co dalej?</h2>

W kolejnych wpisach dodasz interakcję (np. kliknięcia) do komponentów. Dodatkowo poznasz stan (<code>state</code>), który potem przyda się nam przy rozbudowie aplikacji. Bez niego praktycznie niemożliwe byłoby tworzenie jakichkolwiek aplikacji, które oprócz wyświetlania treści miałyby robić cos jeszcze :)

Jeśli chcesz na bieżąco śledzić kolejne części kursu React.js to koniecznie <strong>śledź mnie na Facebooku i zapisz się na newsletter.</strong>

<NewsletterForm />

<FacebookPageWidget />

<h2>Ćwiczenie</h2>

<strong>Ćwiczenie:</strong> Stwórz komponent do wyświetlania avatarów i przenieś do niego kod za to odpowiedzialny. Niech ten komponent przyjmuje jako props tylko login. Wrzuć swój kod w komentarzu!

<strong>Ćwiczenie\*:</strong> Zmodyfikuj stworzony komponent z avatarem tak, aby obecne obrazki były wyświetlane gdy login nie jest mailem. Natomiast gdy jest mailem to skorzystaj z Gravatara. Zauważ, że całkowita zmiana działania tego komponentu nie wymaga wprowadzania żadnych zmian w pozostałym kodzie aplikacji!

<div class="grammarly-disable-indicator"></div>
