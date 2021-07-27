---
id: 1416
index: 108
title: Obsługa zdarzeń w Vue.js za pomocą dyrektywy v-on
date: 2019-03-10T12:36:33.000Z
isMarkdown: true
status: publish
permalink: obsluga-zdarzen-w-vue-js-za-pomoca-dyrektywy-v-on
authors:
  - wojtek-urbanski
guid: https://typeofweb.com/?p=1416
type: post
thumbnail:
  url: >-
    https://typeofweb.com/wp-content/uploads/2019/03/audience-band-bright-1047442.jpg
  width: 5000
  height: 2500
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
    - Zdarzenia
---

Aby aplikacja była ciekawa, musi pozwalać użytkownikowi na interakcję. Może to być nie tylko wprowadzanie danych do pól formularzy, ale również reagowanie na **zdarzenia kliknięcia**, czy ruchy myszką. Niezależnie od tego, jaki rodzaj interakcji chcesz oprogramować, Vue.js pozwoli Ci obsłużyć go za pomocą dyrektywy `v-on`.

<!--more-->

## Dyrektywa `v-on`

Dzięki dyrektywie `v-on` możesz nasłuchiwać na **zdarzenia DOM** i wykonać kod JavaScript gdy one zajdą. Wartością dyrektywy `v-on` może być nazwa metody dostępnej w komponencie (1), ale również zwykłe wyrażenie JavaScript (2).

```javascript
new Vue({
  data() {
    return {
      counter: 0,
    };
  },
  methods: {
    increment() {
      this.counter = this.counter + 1;
    },
    decrement() {
      this.counter = this.counter - 1;
    },
  },
}).$mount('#app');
```

```html
<div id="app">
  Licznik: {{ counter }}
  <button>+</button>
  <!-- (1) -->
  <button>-</button>
  <!-- (2) -->
</div>
```

<p class="codepen" data-height="164" data-theme-id="0" data-slug-hash="PBZjWe" data-default-tab="result" data-user="wojtiku" data-embed-version="2" data-pen-title="Zdarzenia z użyciem dyrektywy v-on">See the Pen <a href="https://codepen.io/wojtiku/pen/PBZjWe/">Zdarzenia z użyciem dyrektywy v-on</a> by Wojciech Urbański (<a href="https://codepen.io/wojtiku">@wojtiku</a>) on <a href="https://codepen.io">CodePen</a>.</p>

Dyrektywę `v-on`, podobnie jak `v-bind`, możesz zapisać też w **formie skróconej**. Wtedy nazwa zdarzenia poprzedzona jest znakiem małpy, np. `@click` (2). Ta bardzo wygodna forma zapisu jest tym, czego będziesz używać najczęściej do nasłuchiwania na zdarzenia.

## Modyfikatory zdarzeń

Obsługując zdarzenia, często będziesz chcieć wykonać pewne **standardowe operacje** takie jak `e.preventDefault()`, czy wywołać kod jedynie jeśli kliknięto dokładnie w dany element (a nie np. w jego dziecko).

Do tej pory sposobem na zrobienie tych rzeczy było **ręczne wywołanie** ich w funkcji obsługującej dane zdarzenie (1). Wadą takiego rozwiązania jest jednak to, że **mieszamy logikę obsługi zdarzeń** przeglądarki z logiką biznesową naszej aplikacji. Oczywiście powtarzanie tego typu fragmentów kodu jest również **nużące**.

Na szczęście Vue daje name rozwiązanie w postaci **modyfikatorów dyrektyw**, które w przypadku `v-on` zmieniają zachowanie podpiętej pod dane zdarzenie funkcji. Aby użyć modyfikatora, musisz **napisać jego nazwę po nazwie zdarzenia oddzielając go kropką**. Przykładem, którego prawdopodobnie będziesz używać najczęściej, jest modyfikator `.prevent`, którego użycie w naszym przypadku wygląda `@click.prevent="counter += 1"` (2).

```javascript
new Vue({
  data() {
    return {
      counter: 0,
    };
  },
  methods: {
    onClick(e) {
      e.preventDefault(); // (1)
      this.counter = this.counter + 1;
    },
  },
}).$mount('#app');
```

```html
<!-- (2) -->
<ul id="app">
  <li><a href="http://typeofweb.com/" @click="onClick">preventDefault po staremu</a></li>
  <li><a href="http://typeofweb.com/" @click.prevent="counter += 1">preventDefault z Vue</a></li>
  <li>Licznik kliknięć: {{ counter }}</li>
</ul>
```

<p class="codepen" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid black; margin: 1em 0; padding: 1em;" data-height="265" data-theme-id="0" data-default-tab="result" data-user="wojtiku" data-slug-hash="Mxoovp" data-pen-title="Modyfikatory zdarzeń w Vue.js">See the Pen <a href="https://codepen.io/wojtiku/pen/Mxoovp/">
Modyfikatory zdarzeń w Vue.js</a> by Wojciech Urbański (<a href="https://codepen.io/wojtiku">@wojtiku</a>)
on <a href="https://codepen.io">CodePen</a>.</p>

Vue udostępnia także modyfikatory takie jak:

- `.stop` - wywoła `e.stopPropagation()`
- `.prevent` - wywoła `e.preventDefault()`
- `.self` - wywoła Twój kod tylko jeśli zdarzenie wystąpiło bezpośrednio na danym elemencie, a nie jego dziecku
- `.once` - wywoła Twój kod tylko przy pierwszym wystąpieniu zdarzenia
- oraz kilka innych

Chociaż z pomocą modyfikatorów Vue ułatwia jeszcze takie rzeczy jak obsługa klawiatury, to na dziś to wszystko. Do zdarzeń na pewno wrócimy jeszcze w dalszych częściach kursu. [typeofweb-courses-slogan category="Vue.js"]

## Pytania?

Jeśli chcesz na bieżąco śledzić kolejne części kursu Vue.js to koniecznie <strong>polub Type of Web na Facebooku i zapisz się na newsletter.</strong>

<div style="text-align: center; margin-bottom: 40px;">[typeofweb-mailchimp title=""]</div>
<div style="text-align: center;">[typeofweb-facebook-page]</div>

## Ćwiczenie

Stwórz prostą aplikację, która będzie liczyła wciśnięcia klawiszy wewnątrz inputa, w którym jest kursor i wyświetlała je na ekranie.
