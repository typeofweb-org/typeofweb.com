---
title: Dyrektywy warunkowe w Vue.js
date: 2018-07-04T18:58:00.000Z
isMarkdown: true
status: publish
permalink: dyrektywy-warunkowe-w-vue-js
authors:
  - wojtek-urbanski
type: post
thumbnail:
  url: /assets/wp-content/uploads/2018/07/pexels-photo-581669.jpeg
  width: 1280
  height: 860
categories:
  - slug: javascript
    name: JavaScript
  - slug: front-end
    name: Front-end
series:
  slug: vue-js
  name: Vue.js
seo:
  focusKeywords:
    - dyrektywy warunkowe
  metadesc: >-
    Darmowy kurs Vue.js: dyrektywy warunkowe `v-if`, `v-else`, `v-else-if` oraz
    `v-show`. Dynamiczne ukrywanie i pokazywanie elementów.
---

Pisząc aplikacje w Vue.js często spotkasz się z sytuacją, w której wyświetlenie lub nie danego elementu będzie zależało od wartości zmiennej. Właśnie do tego służą dyrektywy warunkowe `v-if`, `v-else`, `v-else-if`, (oraz w pewnym sensie `v-show`), które odpowiadają **instrukcjom warunkowym** znanym z JavaScript. To właśnie te dyrektywy Ci dziś zademonstruję.

## Pokazywanie i ukrywanie elementów za pomocą dyrektywy `v-if`

Najbardziej podstawową dyrektywą umożliwiającą pokazywanie elementów **warunkowo** jest dyrektywa `v-if`. Odpowiada ona instrukcji warunkowej `if (warunek) { /*...kod...*/ }` w JavaScript. Jeśli wartość przekazanego do niej wyrażenia będzie prawdziwa, to element zostanie dodany do drzewa DOM. Jeśli będzie fałszywa, w ogóle się tam nie pojawi.

```javascript
new Vue({
  data() {
    return {
      text: '',
    };
  },
}).$mount('#app');
```

```html
<div id="app">
  <input v-model="text" />
  <p v-if="text === ''">Wpisz coś</p>
</div>
```

<CodepenWidget height="265" themeId="0" slugHash="MGYZyL" defaultTab="result" user="wojtiku" embedVersion="2" penTitle="v-if">
<a href="http://codepen.io/wojtiku/pen/MGYZyL/">Zobacz Codepen v-if</a>.
</CodepenWidget>

Na powyższym przykładzie możesz zobaczyć jak proste jest używanie dyrektywy `v-if` - wpisz coś do pola tekstowego. Warunek `text === ''` jest spełniony wtedy, gdy pole `text` jest puste i to właśnie wtedy pokazywany jest tekst "Wpisz coś".

## Scenariusz alternatywny z `v-else`

Jeśli na podstawie jednego warunku chcesz obrać jeden z dwóch scenariuszy, możesz użyć dyrektywy `v-else`. Nie przyjmuje ona żadnej wartości, a element zawierający `v-else` **musi następować bezpośrednio po** elemencie zawierającym `v-if` (lub po ` v-else-if`, o której za chwilę). Inaczej Vue nie będzie w stanie stwierdzić do czego odnosi się dany `v-else`.

```html
<div id="app">
  <input v-model="text" />
  <p v-if="text === ''">Wpisz coś</p>
  <p v-else>Dzięki!</p>
</div>
```

<CodepenWidget height="265" themeId="0" slugHash="pVvqGM" defaultTab="html,result" user="wojtiku" embedVersion="2" penTitle="v-else">
<a href="http://codepen.io/wojtiku/pen/pVvqGM/">Zobacz Codepen v-else</a>.
</CodepenWidget>

Jeśli **alternatyw może być więcej**, użyj dyrektywy `v-else-if`, której wartością będzie kolejny warunek - zupełnie jak w normalnym JS.

```html
<div id="app">
  <input v-model="text" />
  <p v-if="text === ''">Wpisz coś</p>
  <p v-else-if="text === 'tajne'">Zgadłaś/eś!</p>
  <p v-else>Nie zgadłaś/eś :(</p>
</div>
```

## Chowanie i pokazywanie elementów z użyciem `v-show`

Czasami napotkasz na sytuację, w której dodanie/usunięcie elementu przez `v-if`/`v-else` będzie z różnych względów **niepożądane**. Możesz wtedy użyć dyrektywy `v-show`, która w przypadku, kiedy warunek **nie jest spełniony** nadaje elementowi styl `display: none;`. Oznacza to, że jest on zawsze obecny w drzewie DOM, ale czasami po prostu niewidoczny.

Warto wspomnieć, że **dyrektywa `v-else` nie działa razem z `v-show`**. Mogę Ci wyjaśnić ze szczegółami, dlaczego tak jest na szkoleniu: <a href="https://szkolenia.typeofweb.com/" target="_blank">zapisz się na szkolenie z Vue.js</a>. Aby osiągnąć ten efekt musisz po prostu powtórzyć `v-show` z odwróconym warunkiem. Ilustruje to poniższy przykład.

<CodepenWidget height="265" themeId="0" slugHash="wjBNGZ" defaultTab="html,result" user="wojtiku" embedVersion="2" penTitle="v-show">
<a href="http://codepen.io/wojtiku/pen/wjBNGZ/">Zobacz Codepen v-show</a>.
</CodepenWidget>

## Ćwiczenie

Użyj narzędzi dla programistów w przeglądarce, z której korzystasz i zobacz na własne oczy czym różnią się od siebie dyrektywy `v-if`/`v-else` oraz `v-show`.
