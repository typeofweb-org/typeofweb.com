---
id: 1420
index: 97
title: Metody oraz pola typu computed w Vue.js
date: 2018-09-28T16:39:45.000Z
isMarkdown: true
status: publish
permalink: metody-oraz-pola-typu-computed-w-vue-js
authors:
  - wojtek-urbanski
guid: https://typeofweb.com/?p=1420
type: post
thumbnail:
  url: https://typeofweb.com/wp-content/uploads/2018/09/computed.jpg
  width: 887
  height: 400
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
    - pola computed
---

Czasami musisz zrobić coś więcej, niż tylko **wyświetlić pola komponentu** w szablonie. Np. mając pola `firstName` i `lastName` chcesz wyświetlić pełne imię i nazwisko osoby. Oczywiście możesz zrobić to za pomocą wyrażenia w szablonie `{{ firstName + ' ' + lastName }}`. Jest to jednak mało efektywne, i to z kilku powodów. Co, jeśli tę samą wartość musisz wyświetlić w innym miejscu? Co, jeśli potrzebujesz jej również w jednej z metod komponentu? Możesz rozwiązać ten problem używając metod, albo pól wyliczonych (ang. computed).

<CodepenWidget height="265" themeId="0" slugHash="YvRbKV" defaultTab="html,result" user="wojtiku" embedVersion="2" penTitle="Metody i computed - 1"><a href="http://codepen.io/wojtiku/pen/YvRbKV/">Zobacz Codepen Metody i computed - 1</a>.</CodepenWidget>

## Metody komponentów

Vue.js pozwala definiować **metody**, które potem możesz zawołać nie tylko z **szablonu komponentu**, ale również z innych metod. Aby dodać metodę do komponetu, musisz zdefiniować w nim obiekt `methods` (1). Pola tego obiektu będą metodami dostępnymi w komponencie (2). Aby odnieść się do takiej metody w szablonie, musisz ująć jej nazwę w wąsy i umieścić po niej nawiasy - `{{ nazwaMetody() }}` (3)- zupełnie tak jakbyś wołał/a funkcję. Powyższy przykład z użyciem metody wyglądałby następująco:

```javascript
new Vue({
  data() {
    return {
      favouriteNumber: 42, // (5)
      firstName: 'Wojciech',
      lastName: 'Urbański',
    };
  },
  methods: {
    // (1)
    fullName() {
      // (2)
      console.log('Metoda została zawołana'); // (4)
      return this.firstName + ' ' + this.lastName;
    },
  },
}).$mount('#app');
```

```html
<div id="app">
  <input type="number" v-model="favouriteNumber" />
  <p>Metoda: {{ fullName() }}</p>
  <!-- (3) -->
</div>
```

Pewnie zauważyłeś, że do tego przykładu, pozornie bez potrzeby, dodałem pole `favouriteNumber` oraz input pozwalający na jego zmianę. W metodzie umieściłem też wywołanie `console.log` (4). Jeśli otworzysz konsolę i zaczniesz zmieniać wartość pola `favouriteNumber` to zauważysz, że metoda `fullName` jest wywoływana **przy każdej takiej zmianie** - oznacza to, że Vue chcąc zaktualizować widok za każdym razem ją wywołuje. I to zupełnie bez sensu. Oczywiście jest to tylko prosty przykład, ale możliwe, że w Twojej aplikacji będziesz chciała np. przefiltrować bardzo dużą tablicę. Wtedy obciążenie będzie już znaczne. Na szczęście jest na to rozwiązanie!

<CodepenWidget height="265" themeId="0" slugHash="VdVOeW" defaultTab="html,result" user="wojtiku" embedVersion="2" penTitle="Metody i computed - 2"><a href="http://codepen.io/wojtiku/pen/VdVOeW/">Zobacz Codepen Metody i computed - 2</a>.</CodepenWidget>

## Pola wyliczone, czyli computed properties

Najważniejszą cechą pól computed jest fakt, że **wyniki tych wyliczeń zostaną zachowane** (cache) przez Vue i przeliczone ponownie dopiero wtedy, gdy będzie to potrzebne. Pozwoli Ci to uniknąć sytuacji z powyższego przykładu.

Pola wyliczone definiujemy w sekcji `computed` (1) komponentu Vue. W najprostrzej postaći wyglądają one dokładnie tak samo jak metody (2). Różnią się jednak sposobem odnoszenia w szablonach, który jest bliźniaczy do zwykłych pól danych - `{{ fullName }}` (3). Zwracane przez nie wartości są zapamiętywane przez framework i przeliczane tylko, jeśli jedno z pól potrzebnych do obliczenia wartości się zmieni. Do tak zdefiniowanego pola wyliczonego nie możesz nic przypisać. Jego wartość jest **tylko do odczytu**.

```javascript
new Vue({
  data() {
    return {
      favouriteNumber: 42,
      firstName: 'Wojciech',
      lastName: 'Urbański',
    };
  },
  computed: {
    // (1)
    fullName() {
      // (2)
      console.log('Wartość pola została wyliczona');
      return this.firstName + ' ' + this.lastName;
    },
  },
}).$mount('#app');
```

```html
<div id="app">
  <input type="number" v-model="favouriteNumber" /><br />
  <input type="tezt" v-model="firstName" />
  <p>Metoda: {{ fullName }}</p>
  <!-- (3) -->
</div>
```

<CodepenWidget height="265" themeId="0" slugHash="OEaYOB" defaultTab="html,result" user="wojtiku" embedVersion="2" penTitle="Metody i computed - 3"><a href="http://codepen.io/wojtiku/pen/OEaYOB/">Zobacz Codepen Metody i computed - 3</a>.</CodepenWidget>

Kod jest również bardziej czytelny. Logika wyliczania `fullName` jest zamknięta w jednej, prostej funkcji, a na dodatek odnosimy się do niej nie jako do metody, ale jako do tego, czym rzeczywiście jest - pola danych, które w tym wypadku jest wyliczone.

Wprawdzie pola typu computed chowają jeszcze kilka asów w rękawie, ale na dziś to wszystko. Poruszymy ten temat ponownie w dalszych częściach kursu. <a href="https://szkolenia.typeofweb.com/" target="_blank">zapisz się na szkolenie z Vue.js</a>.

## Ćwiczenie

**Otwórz konsolę w swojej przeglądarce** i zmieniając wartości pól `favouriteNumber` oraz `firstName` zobacz jak zachowuje się computed property. Teraz jego wartość jest aktualizowana tylko wtedy, kiedy trzeba! Dzięki takiemu podejściu nasze aplikacje wykonują mniej niepotrzebnej pracy i są bardziej wydajne.
