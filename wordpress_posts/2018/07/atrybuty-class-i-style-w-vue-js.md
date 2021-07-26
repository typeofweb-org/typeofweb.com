---
id: 1505
index: 96
title: Atrybuty class i style w Vue.js
date: 2018-07-25T17:36:46.000Z
isMarkdown: true
status: publish
permalink: atrybuty-class-i-style-w-vue-js
authors:
  - wojtek-urbanski
guid: https://typeofweb.com/?p=1505
type: post
thumbnail:
  url: >-
    https://typeofweb.com/wp-content/uploads/2018/07/audio-audio-mixer-close-up-744321.jpg
  width: 4288
  height: 2848
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
    - class i style vue

---
Czym dla mnie jest Vue.js? To przede wszystkim genialne "developer experience", czyli taki UX, ale w odniesieniu do wygody korzystania z narzędzia przydatnego w pracy programisty. Świetnym tego przykładem jest fakt, że Vue traktuje inaczej dwa atrybuty html - `class` i `style` - sprawiając, że korzystanie z tego frameworka jest przyjemniejsze. Tego, co dokładnie się tam dzieje dowiesz się z tego tekstu.

Dynamicznie bindując atrybuty `class` oraz `style` możesz oczywiście używać stringów. Jednak często będziesz chcieć np. zaaplikować jakąś klasę, czy styl tylko pod pewnym warunkiem. Wtedy okaże się, że ręczne łączenie stringów jest bardzo niewygodne oraz, co ważniejsze, podatne na błędy. Dlatego w przypadku styli i klas, możesz do `v-bind` przekazać również obiekt.

## Dynamiczne `class`y

Przekazując obiekt podczas bindowania klasy, możesz ją dynamicznie dodawać lub usuwać w zależności od tego, czy wartość dostępna pod kluczem ją reprezentującym jest prawdziwa:

```css
.enabled {
  color: green;
}
```
```javascript
new Vue({
  data() {
    return {
      isEnabled: true
    };
  }
}).$mount("#app");
```
```html
<div id="app">
  <label :class="{ enabled: isEnabled }">
    <input type="checkbox" v-model="isEnabled" />
    Kliknij mnie!
  </label>
</div>
```
<p data-height="265" data-theme-id="0" data-slug-hash="mLWPZb" data-default-tab="result" data-user="wojtiku" data-embed-version="2" data-pen-title="mLWPZb" class="codepen">See the Pen <a href="https://codepen.io/wojtiku/pen/mLWPZb/">mLWPZb</a> by Wojciech Urbański (<a href="https://codepen.io/wojtiku">@wojtiku</a>) on <a href="https://codepen.io">CodePen</a>.</p>

Oczywiście umieszczając w obiekcie więcej pól, możesz w ten sposób zarządzać dodawaniem/usuwaniem większej liczby klas.

Dodając dynamicznie klasy do elementów, bardzo często będziesz w sytuacji, gdy element ma np. 2-3 klasy przypisane do niego na stale oraz jedną klasę dynamiczną. Oczywiście pisanie wtedy obiektów w stylu `{ klasa1: true, klasa2: true, klasa3: dynamicznyBoolean }` byłoby uciążliwe i monotonne. Właśnie dlatego możesz jednocześnie użyć na elemencie zwykłej, "statycznej" klasy oraz zbindować ją dynamicznie, a Vue inteligentnie połączy je ze sobą.

```html
<div
  class="klasa-statyczna inna-klasa"
  :class="{ 'klasa-zalezna-od-warunku': isEnabled }"
>
  to takie proste!
</div>
```

Oprócz obiektów, możesz użyć też tablicy. Jej elementy mogą być albo stringami, albo obiektami. W pierwszym przypadku zostaną po prostu dopisane do atrybutu klasy jako rozdzielone spacją. Co ważne, elementy takiej tablicy mogą pochodzić z pól data. Obiekty obecne w tablicy dodadzą klasy odpowiadające swoim kluczom, o ile ich wartości będą prawdziwe - dokładnie tak, jak opisałem to wyżej.

```javascript
new Vue({
  data() {
    return {
      someClass: 'some-weird-class',
      dynamicClasses: {
        first: true,
        second: false
      },
      isEnabled: true,
      isHighlighted: false
    };
  }
}).$mount("#app");
```
```html
<div id="app">
  <p class="static-class" :class="[isEnabled ? 'enabled' : null, someClass, dynamicClasses, {highlighted: isHighlighted}]">
    Element, który ma je wszystkie!
  </p>
</div>
```
Powyższy element będzie miał klasy: `enabled`, `some-weird-class`, `first` oraz `second`. Takie konfiguracje dają ogromne możliwości. W praktyce, korzystam jednak głównie ze składni z obiektem napisanym wprost w szablonie (czyli tej, którą zademonstrowałem jako pierwszą).

## Dynamiczne `style`

Atrybut `style` również jest specjalnie traktowany przez Vue. Tutaj także dostajesz do dyspozycji składnię obiektową, która działa trochę inaczej niż w przypadku `class`, ale za to bardzo jest podobna do zwykłego CSS. Klucze pól obiektu odpowiadają właściwościom CSS, a ich wartości... wartościom :).

Co ważne, klucze w takim obiekcie możesz pisać zarówno używając `kebab-case`, jak i `camelCase` - czyli po CSSowemu i JSowemu. Wybór należy do Ciebie.

```javascript
new Vue({
  data() {
    return {
      selectedColor: null,
      underline: false
    };
  }
}).$mount("#app");
```
```html
<div id="app">
  <label :style="{'background-color': selectedColor}">
    Wybierz kolor:
    <select v-model="selectedColor">
      <option disabled>Wybierz kolor</option>
      <option>lightyellow</option>
      <option>lightgreen</option>
      <option>lightblue</option>
      <option>lightpink</option>
    </select>
  </label>
  <label :style="{textDecoration: underline ? 'underline' : 'none' }">
    <input type="checkbox" v-model="underline" /> Underline?
  </label>
</div>
```
<p data-height="265" data-theme-id="0" data-slug-hash="bMqwom" data-default-tab="result" data-user="wojtiku" data-embed-version="2" data-pen-title="v-bind:style" class="codepen">See the Pen <a href="https://codepen.io/wojtiku/pen/bMqwom/">v-bind:style</a> by Wojciech Urbański (<a href="https://codepen.io/wojtiku">@wojtiku</a>) on <a href="https://codepen.io">CodePen</a>.</p>

Tutaj również możesz użyć notacji tablicowej, aby złączyć ze sobą kilka obiektów.

Chociaż czasami spotkasz się z sytuacją, gdzie użycie styli inline jest konieczne, to pamiętaj, że generalnie nie powinno się ich używać - wpływają źle na modularność i reużywalność Twojego kodu HTML i CSS. Tam gdzie to możliwe, lepiej przypisać dane style do klasy i to ją dodawać lub usuwać z elementu. [typeofweb-courses-slogan category="Vue.js"]

## Ćwiczenie

Wiesz już jak dynamicznie dodawać do elementu klasy i style inline. Użyj tej wiedzy do zrobienia prostego color pickera. Stwórz element input typu `color`, którego zmiana będzie zmieniała kolor tła elementu. Zadanie bonusowe: użyj do tego celu 3 inputów typu `range` odpowiadającym składowym R, G i B. Podziel się rozwiązaniem w komentarzu!
