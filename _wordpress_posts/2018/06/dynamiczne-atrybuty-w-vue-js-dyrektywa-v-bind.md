---
title: Dynamiczne atrybuty w Vue.js - dyrektywa v-bind
date: 2018-06-25T07:45:37.000Z
isMarkdown: true
status: publish
permalink: dynamiczne-atrybuty-w-vue-js-dyrektywa-v-bind
authors:
  - wojtek-urbanski
type: post
thumbnail:
  url: >-
    https://res.cloudinary.com/type-of-web/wp-content/uploads/2018/04/blur-book-business-273016.jpg
  width: 4928
  height: 3264
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
    - v-bind
  metadesc: "Dyrektywy w Vue.js to specjalne atrybuty z przedrostkiem v-. W tej części kursu Vue.js dowiesz się jak przekazać dynamiczne dane za pomocą\_dyrektywy v-bind."
---

W poprzednim wpisie pokazałem Ci jak wyświetlić **dynamiczne dane w Vue.js** za pomocą wąsów, czyli podwójnych nawiasów klamrowych (`{{ nazwaZmiennej }}`). Dziś dowiesz się jak przekazać je do atrybutów elementu HTML za pomocą dyrektywy `v-bind`.

---

## Dyrektywa `v-bind`

Dyrektywy w Vue.js to specjalne atrybuty z przedrostkiem `v-`. Wartością takiej dyrektywy jest wyrażenie JavaScript. Dyrektywy mają za zadanie reaktywne aktualizowanie drzewa DOM zawsze gdy wartość przekazanego wyrażenia się zmieni. Vue udostępnia kilka wbudowanych dyrektyw takich jak `v-if`, `v-for`, czy `v-bind`.

Niektóre dyrektywy przyjmują po dwukropku parametr. Tak właśnie jest w tym przypadku: `v-bind:nazwaAtrybutuHtml`. Dla przykładu, dynamiczne zbindowanie wartości to atrybutu `href` możesz osiągnąć za pomocą `v-bind:href="nazwaZmiennej"` tak, jak w poniższym przykładzie.

```js
new Vue({
  data() {
    return {
      text: 'Type of Web',
      destination: 'https://typeofweb.com/',
    };
  },
}).$mount('#app');
```

```html
<div id="app">
  <a v-bind:href="destination">{{ text }}</a>
  <br />
  <input v-model="destination" />
</div>
```

<CodepenWidget height="265" themeId="0" slugHash="JLBgpv" defaultTab="html,result" user="wojtiku" embedVersion="2">
<a href="http://codepen.io/wojtiku/pen/JLBgpv/">Zobacz Codepen</a>.
</CodepenWidget>

`v-bind` będziemy później używać również do dynamicznego przekazywania danych do zagnieżdżonych komponentów Vue. Opowiem Ci o tym więcej w jednej z kolejnych lekcji.

## Skrócona składnia `v-bind`

Vue.js w wielu miejscach robi odstępstwa od reguły aby ułatwić użytkownikom życie. Tak właśnie jest w przypadku `v-bind`. Jak pewnie zauważysz pisząc we Vue.js, jest to bardzo szeroko wykorzystywana dyrektywa. Z tego powodu twórcy frameworka postanowili ułatwić życie programist(k)om i udostępnili dla niej również skrócony zapis.

```html
<div id="app">
  <a :href="destination">{{ text }}</a>
</div>
```

Powyższy kod jest równoważny temu, czego użyliśmy wcześniej - wystarczy, że nazwę atrybutu poprzedzisz znakiem dwukropka, a zostanie on dynamicznie zbindowany. Zapis taki jest bardzo zwięzły i czytelny, przez co to głównie ta wersja jest wykorzystywana na co dzień.

## Bindowanie wielu atrybutów jednocześnie

Czasami będziesz chciał(a) zbindować kilka atrybutów naraz. Możesz w tym celu przekazać dyrektywie `v-bind` obiekt. Jego klucze zostaną użyte jako nazwy atrybutów, a wartości zostaną odpowiednio zbindowane.

```js
new Vue({
  data() {
    return {
      text: 'Type of Web',
      linkAttrs: {
        href: 'https://typeofweb.com/',
        title: 'Blog o programowaniu',
      },
    };
  },
}).$mount('#app');
```

```html
<div id="app">
  <a v-bind="linkAttrs">{{ text }}</a>
</div>
```

Powyższy kod dynamicznie ustawi na linku zarówno atrybut `href`, jak i `title`. Jeśli wydaje Ci się to nieco zagmatwane, to nie obawiaj się pytać w komentarzach pod wpisem albo na szkoleniu! <a href="https://szkolenia.typeofweb.com/" target="_blank">zapisz się na szkolenie z Vue.js</a>.

## Ćwiczenie

Spróbuj użyć dyrektywy `v-bind`, aby stworzyć proste narzędzie do sprawdzania jak wygląda obrazek o zadanym URL. Aby to osiągnąć, dynamicznie zbinduj atrybut `src` tagu `<img />`. Podziel się swoim rozwiązaniem w komentarzach!
