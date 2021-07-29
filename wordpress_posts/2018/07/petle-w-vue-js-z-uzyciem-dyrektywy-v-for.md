---
id: 1496
index: 95
title: Pętle w Vue.js z użyciem dyrektywy v-for
date: 2018-07-13T12:34:07.000Z
isMarkdown: true
status: publish
permalink: petle-w-vue-js-z-uzyciem-dyrektywy-v-for
authors:
  - wojtek-urbanski
guid: https://typeofweb.com/?p=1496
type: post
thumbnail:
  url: >-
    https://typeofweb.com/wp-content/uploads/2018/04/audience-auditorium-bleachers-391535.jpg
  width: 5472
  height: 3648
categories:
  - slug: wpis
    name: Wpis
series:
  slug: vue-js
  name: Vue.js
seo:
  focusKeywords:
    - pętla v-for

---
Pisząc aplikacje w Vue.js bardzo często bedziesz chciał(a) wyświetlić **listę elementów w pętli** na podstawie tablicy. Właśnie w tym celu "język szablonów" wbudowany w Vue.js udostępnia dyrektywę `v-for`. W najprostszej postaci odpowiada ona pętli `for` znanej z JavaScriptu.

{/* more */}

## Wyświetlanie listy przy użyciu dyrektywy `v-for`

Dyrektywa `v-for` używa specjalnej składni `aktualnyElementy in tablicaZDanymi` gdzie `tablicaZDanymi` jest... **źródłową tablicą** z danymi, a `aktualnyElementy` jest swego rodzaju **zmienną lokalną** wskazującą na aktualny element tablicy. Możesz to zobaczyć na poniższym przykładzie:

```javascript
new Vue({
  data() {
    return {
      fruits: ["Apple", "Pear", "Plum", "Banana"]
    };
  }
}).$mount("#app");
```
```html
<ul>
  <li v-for="fruit in fruits">
    {{ fruit }}
  </li>
</ul>
```

<CodepenWidget height="265" themeId="0" slugHash="odZvvE" defaultTab="result" user="wojtiku" embedVersion="2" penTitle="v-for"><a href="http://codepen.io/wojtiku/pen/odZvvE/">Zobacz Codepen v-for</a>.</CodepenWidget>

## Dostęp do indeksu elementu

Wewnąątrz pętli `v-for` możesz też korzystać z **indeksu elementu**, który właśnie jest iterowany. Składnia zmienia wtedy formę na `(element, index) in tablica`. Oto przykład:

```javascript
new Vue({
  data() {
    return {
      prefix: "I <3",
      fruits: ["Apple", "Pear", "Plum", "Banana"]
    };
  }
}).$mount("#app");
```
```html
<div id="app">
    <div v-for="(fruit, index) in fruits">
      {{ index }} - {{ prefix }} {{ fruit }}
    </div>
</div>
```
<CodepenWidget height="265" themeId="0" slugHash="BxWajL" defaultTab="result" user="wojtiku" embedVersion="2" penTitle="v-for z indeksem"><a href="http://codepen.io/wojtiku/pen/BxWajL/">Zobacz Codepen v-for z indeksem</a>.</CodepenWidget>

Zwróć też uwagę na fakt, że wewnątrz pętli `v-for`, oprócz nowych zmiennych, masz normalny **dostęp do wszystkich pól danych** znajdujących się na instancji Vue. W powyższym przykładzie w każdej iteracji odnoszę się do pola `prefix`. <a href="https://szkolenia.typeofweb.com/" target="_blank">zapisz się na szkolenie z Vue.js</a>.

## Pętla v-for na obiekcie

Vue pozwala iterować nie tylko po tablicach, ale również obiektach. W swojej standardowej formie `value in someObject` pod `value` podstawione zostaną kolejne wartości pól obiektu. Możesz dostać się też do kluczy obiektu oraz indeksów za pomocą odpowiednio `(value, key) in someObject` i `(value, key, index) in someObject`. Tak wygląda to w akcji:

```javascript
new Vue({
  data() {
    return {
      fruits: {
        "Apple": 4,
        "Pear": 3,
        "Plum": 5,
        "Banana": 2
      }
    };
  }
}).$mount("#app");
```
```html
<div id="app">
    <div v-for="(quantity, fruit, index) in fruits">
      {{ index }}. {{ quantity }}x {{ fruit }}
    </div>
</div>
```
<CodepenWidget height="265" themeId="0" slugHash="vjxOeb" defaultTab="result" user="wojtiku" embedVersion="2" penTitle="v-for na obiekcie"><a href="http://codepen.io/wojtiku/pen/vjxOeb/">Zobacz Codepen v-for na obiekcie</a>.</CodepenWidget>

## Ćwiczenie

Świetnie - wiesz już jak działa pętla `v-for` w Vue.js! Użyj tej wiedzy aby wyświetlić zagnieżdżoną listę, albo inaczej mówiąc listę list. Możesz posłużyć się poniższym Code Penem. Zdefiniowałem tam listę kategorii, a w każdej z kategorii listę produktów. Po prostu kliknij "edit on CodePen" i do dzieła! Nie zapomnij zamieścić swojego rozwiązania w komentarzu.

<CodepenWidget height="265" themeId="0" slugHash="ZoeGPa" defaultTab="html,result" user="wojtiku" embedVersion="2" penTitle="v-for - zadanie"><a href="http://codepen.io/wojtiku/pen/ZoeGPa/">Zobacz Codepen v-for - zadanie</a>.</CodepenWidget>
