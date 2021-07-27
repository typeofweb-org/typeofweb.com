---
id: 1331
index: 90
title: Pierwszy komponent Vue.js
date: 2018-06-18T11:15:12.000Z
isMarkdown: true
status: publish
permalink: pierwszy-komponent-vue-js
authors:
  - wojtek-urbanski
guid: https://typeofweb.com/?p=1331
type: post
thumbnail:
  url: https://typeofweb.com/wp-content/uploads/2018/04/vue-js-puzzle.jpg
  width: 5988
  height: 4000
categories:
  - slug: javascript
    name: JavaScript
  - slug: front-end
    name: Front-end
series:
  slug: vue-js
  name: Vue.js
seo: {}
---

Vue.js jest reaktywnym frameworkiem JavaScript. Znaczy to, że dowolna zmiana danych używanych do wyświetlania strony sprawia, że widok automatycznie jest aktualizowany tak, aby odzwierciedlić tę zmianę.

<!--more-->

## Dodanie Vue.js do strony

Żeby zacząć korzystać z Vue, wystarczy, że dodasz odpowiedni tag `<script>` do pliku html:

```html
<script src="https://cdn.jsdelivr.net/npm/vue@2.5.16/dist/vue.js"></script>
```

W dalszych częściach kursu omówimy bardziej skomplikowane techniki dołączania Vue.js do Twojej strony, ale pamiętaj, że powyższy sposób w zupełności wystarczy i jest poprawny. Nie potrzebujesz niczego więcej by zacząć pracę!

## Pierwszy komponent

Wyświetlanie danych we Vue odbywa się dzięki tzw. **wąsom** znanym z wielu języków szablonów (takich jak Handlebars). Wystarczy, że nazwę zmiennej owiniesz w podwójne nawiasy klamrowe (`{{ appTitle }}`), a framework sam **poszuka odpowiedniego pola z danymi i wyświetli jego wartość**. Zadba również o to, żeby zaktualizować wyświetlany tekst, gdy wartość ta ulegnie zmianie:

```html
<div id="app">
  <h1>{{ appTitle }}</h1>
</div>
```

Aby Vue mogło zmienić zwykłe dane w reaktywne, musisz zwrócić je z metody `data()`. Dzięki temu framework będzie w stanie **śledzić ich zmiany i odpowiednio aktualizować elementy DOM**.

Teraz musisz już tylko zainicjalizować nową instancję Vue i podłączyć ją do elementu DOM za pomocą metody `$mount`:

```javascript
new Vue({
  data() {
    return {
      appTitle: 'Pierwsza aplikacja Vue!',
    };
  },
}).$mount('#app');
```

## Reaktywność `v-model`

Właśnie napisałaś/eś swoją pierwszą aplikację używając Vue.js. Szkoda tylko, że jest taka nudna — nie robi nic poza wyświetlaniem tekstu.

Zróbmy coś ciekawszego! :) W tym celu wykorzystamy dyrektywę `v-model`. Odpowiada ona za **powiązanie wartości inputa z polem danych**. W tym wypadku ustawia ona `value` inputa na wartość pola `appTitle` i podpina się pod zdarzenie `input` w celu aktualizacji pola `appTitle` kiedy użytkownik coś w nie wpisze:

```html
<div id="app">
  <input v-model="appTitle" />
  <h1>{{ appTitle }}</h1>
</div>
```

Gratulacje! Teraz Twoja aplikacja jest dynamiczna! Oczywiście to dopiero początek tego, co potrafi Vue.js — **więcej w kolejnych częściach kursu** lub na szkoleniu: [typeofweb-courses-slogan category="Vue.js"]

<p data-height="400" data-theme-id="0" data-slug-hash="RMJPoK" data-default-tab="html,result" data-user="wojtiku" data-embed-version="2" data-pen-title="RMJPoK" class="codepen">See the Pen <a href="https://codepen.io/wojtiku/pen/RMJPoK/">RMJPoK</a> by Wojciech Urbański (<a href="https://codepen.io/wojtiku">@wojtiku</a>) on <a href="https://codepen.io">CodePen</a>.</p>

**Aby być na bieżąco z kolejnymi wpisami, zapisz się na newsletter poniżej i śledź Type of Web na Facebooku! :)**

<div style="text-align: center; margin-bottom: 40px;">[typeofweb-mailchimp title=""]</div>
<div style="text-align: center;">[typeofweb-facebook-page]</div>

## Ćwiczenie

W wąsach możesz wpisać nie tylko nazwę pola danych, ale również wyrażenie JavaScript np. `{{ "To jest " + appTitle }}`. Wykorzystaj to, aby wyświetlić na ekranie liczbę dwa razy większą niż wpisana w pole formularza liczba.
