---
id: 1416
index: 107
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
  metadesc: >-
    Zdarzenia wywoływane przez użytkownika Vue.js pozwala obsługiwać dyrektywą
    v-on. Zobacz jak podpiąć się pod kliknięcia, focus, czy zdarzenia
    klawiatury.
---

Aby aplikacja była ciekawa, musi pozwalać użytkownikowi na interakcję. Może to być nie tylko wprowadzanie danych do pól formularzy, ale również reagowanie na **zdarzenia kliknięcia**, czy ruchy myszką. Niezależnie od tego, jaki rodzaj interakcji chcesz oprogramować, Vue.js pozwoli Ci obsłużyć go za pomocą dyrektywy `v-on`.

{/_ more _/}

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

<CodepenWidget height="164" themeId="0" slugHash="PBZjWe" defaultTab="result" user="wojtiku" embedVersion="2" penTitle="Zdarzenia z użyciem dyrektywy v-on"><a href="http://codepen.io/wojtiku/pen/PBZjWe/">Zobacz Codepen Zdarzenia z użyciem dyrektywy v-on</a>.</CodepenWidget>

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

<CodepenWidget height="265" themeId="0" slugHash="Mxoovp" defaultTab="result" user="wojtiku" penTitle="Modyfikatory zdarzeń w Vue.js"><a href="http://codepen.io/wojtiku/pen/Mxoovp/">Zobacz Codepen Modyfikatory zdarzeń w Vue.js</a>.</CodepenWidget>

Vue udostępnia także modyfikatory takie jak:

- `.stop` - wywoła `e.stopPropagation()`
- `.prevent` - wywoła `e.preventDefault()`
- `.self` - wywoła Twój kod tylko jeśli zdarzenie wystąpiło bezpośrednio na danym elemencie, a nie jego dziecku
- `.once` - wywoła Twój kod tylko przy pierwszym wystąpieniu zdarzenia
- oraz kilka innych

Chociaż z pomocą modyfikatorów Vue ułatwia jeszcze takie rzeczy jak obsługa klawiatury, to na dziś to wszystko. Do zdarzeń na pewno wrócimy jeszcze w dalszych częściach kursu. <a href="https://szkolenia.typeofweb.com/" target="_blank">zapisz się na szkolenie z Vue.js</a>.

## Pytania?

Jeśli chcesz na bieżąco śledzić kolejne części kursu Vue.js to koniecznie <strong>polub Type of Web na Facebooku i zapisz się na newsletter.</strong>
<NewsletterForm />
<FacebookPageWidget />

## Ćwiczenie

Stwórz prostą aplikację, która będzie liczyła wciśnięcia klawiszy wewnątrz inputa, w którym jest kursor i wyświetlała je na ekranie.
