---
title: State w React.js 2
date: 2018-01-15T12:51:05.000Z
isMarkdown: false
status: publish
permalink: state-react-js-2
authors:
  - michal-miszczyszyn
type: post
thumbnail:
  url: /public/assets/wp-content/uploads/2017/11/pexels-photo-137141.jpeg
  width: 1280
  height: 888
categories:
  - slug: javascript
    name: JavaScript
  - slug: front-end
    name: Front-end
series:
  slug: react-js
  name: React.js
seo:
  metadesc: >-
    Kontynuacja kursu React.js — state. W tym wpisie rozwijam temat state,
    opisuję dokładniej jak działa setState i jakie argumenty przyjmuje.
    Opowiadam o przekazywaniu do niego funkcji (updatera) oraz drugiej funkcji
    (callbacka), a także po prostu o zmianie stanu przy pomocy prostego obiektu
    w React.
---

Pod koniec poprzedniego wpisu zadałem podchwytliwe ćwiczenie dotyczące <code>state</code> w React.js. Jeśli jeszcze go nie wykonałaś/eś to teraz jest ten moment, aby wrócić i spróbować ;) W tym wpisie rozwijam temat <code>state</code>, opisuję dokładniej jak działa <code>setState</code> i jakie argumenty przyjmuje.

---

Zacznijmy może od wykonania ćwiczenia z poprzedniego wpisu. Zadanie brzmiało tak:

<blockquote>Dodaj dwa nowe liczniki. Pierwszy, który będzie zliczał wszystkie kliknięcia w przyciski (tzn. kliknięcie w <code>+</code> i <code>-</code> daje 0 na obecnym liczniku oraz 2 na nowym liczniku), oraz drugi, który będzie zliczał podwójne kliknięcia (tzw. <em>double click</em>) <strong>na elemencie z wynikiem</strong>.</blockquote>

Wydaje się proste, ale implementacja odkrywa przez Tobą pewien ważny szczegół dotyczący działania funkcji <code>setState</code>. W jaki sposób chcielibyśmy tutaj aktualizować stan? Musimy przechowywać jeden licznik z sumą, drugi zliczający łączne kliknięcia oraz trzeci, który będzie przechowywał podwójne kliknięcia. <strong>To co jest tutaj istotne to fakt, że w momencie pojedynczego kliknięcia aktualizujesz tylko dwa liczniki, a trzeci pozostaje bez zmian.</strong> Jak to najprościej zaimplementować?

<h2>Jak działa <code>setState</code>?</h2>

<pre class="language-javascript"><code>increment() {
    this.setState({
      sumCount: this.state.counter + 1
      totalCount: this.state.totalCount + 1
      doubleClickCount: this.state.dblClickCount
    })
  }</code></pre>

Działa, po prostu do <code>doubleClickCount</code> zawsze przypisana zostaje niezmieniona wartość <code>this.state.doubleClickCount</code>. <strong>Ale czy to konieczne?</strong> Co by było, gdyby stan komponentu składał się nie z 3, a z 15 pól? Nie dyskutujmy teraz czy to dobre rozwiązanie, tylko zastanów się jak by musiała wyglądać każda aktualizacja stanu… właśnie.

Na szczęście <code>setState</code> jest mądrzejsze i automatycznie <strong>łączy obecny stan z tym podanym mu jako argument — i nadpisuje tylko podane własności. To co się nie zmienia pomijasz:</strong>

<pre class="language-javascript"><code>increment() {
    this.setState({ // doubleClickCount pozostanie niezmienne
      sumCount: this.state.counter + 1
      totalCount: this.state.totalCount + 1
    })
  }</code></pre>

A tutaj w pełni działające rozwiązanie:

<CodepenWidget height="265" themeId="0" slugHash="eevevJ" defaultTab="js,result" user="mmiszy" embedVersion="2" penTitle="Stan komponentów React.js">
<a href="http://codepen.io/mmiszy/pen/eevevJ/">Zobacz Codepen Stan komponentów React.js</a>.
</CodepenWidget>

Jeśli to nie jest dla Ciebie jasne, nie ma w tym nic złego :) Możesz zadać nam pytanie w komentarzu! <a href="https://szkolenia.typeofweb.com/" target="_blank">zapisz się na szkolenie z React</a>.

<h2 data-height="265" data-theme-id="0" data-slug-hash="eevevJ" data-default-tab="js,result" data-user="mmiszy" data-embed-version="2" data-pen-title="Stan komponentów React.js">Funkcja przekazana do <code>setState</code></h2>

Widzisz, że do <code>setState</code> możemy po prostu przekazać obiekt, który zostanie połączony z obecnym stanem i nadpisze podane własności. I to, do niedawna, była jedyna opcja. Od Reacta 16 polecanym sposobem aktualizowania stanu jest przekazanie do <code>setState</code> <strong>funkcji, a nie obiektu.</strong> Taka funkcja to tzw. <strong>updater. </strong>Jak to działa? Updater to taka funkcja, która jako argument przyjmuje obecny stan i jako wynik zwraca obiekt, który zostanie połączony z istniejącym stanem. Przykładowo dla nas:

<pre class="language-javascript"><code>  increment() {
    this.setState(prevState =&gt; {
      return {
        sumCount: prevState.sumCount + 1,
        totalCount: prevState.totalCount + 1
      };
    });
  }</code></pre>

Jakie są zalety tego rozwiązania względem po prostu przekazania obiektu do <code>setState</code>? <strong>W tym przypadku żadne</strong>. <code>setState</code> jest asynchroniczne (o tym zaraz) i sprawia problemy, gdy wywołamy je kilka razy pod rząd — tutaj pomoże nam <strong>updater</strong>. Dodatkowo, <strong>updater</strong> pomaga poprawić wydajność aplikacji — <strong>jeśli w updaterze zwrócisz <code>null</code> to nie zostanie wykonany ponowny render</strong>. Poświęcę temu wszystkiemu inny wpis!

<h2><code>setState</code> i callback</h2>

Dokładnie tak jak w nagłówku. Co to oznacza? Najprościej mówiąc, że <strong>wywołanie <code>setState</code> nie zmienia stanu <em>od razu</em>, tylko dopiero <em>po jakimś czasie</em></strong>. Czyli, przykładowo, próba odczytania stanu od razu po jego zmianie przez <code>setState</code> pokaże nam nadal stary, nieaktualny stan. Otwórz konsolę i kliknij w przycisk w tym przykładzie:

<CodepenWidget height="200" themeId="0" slugHash="KyWZby" defaultTab="result,js" user="mmiszy" embedVersion="2" penTitle="Stan komponentów React.js">
<a href="http://codepen.io/mmiszy/pen/KyWZby/">Zobacz Codepen Stan komponentów React.js</a>.
</CodepenWidget>

Jak naprawić ten problem? Otóż <strong><code>setState</code> przyjmuje też drugi argument: callback</strong>. Jeśli jako drugi argument przekażesz funkcję to zostanie ona wywołana w momencie, gdy stan będzie już zaktualizowany. Spójrz po prostu na przykład (z widoczną konsolą):

<CodepenWidget height="200" themeId="0" slugHash="ZaerWq" defaultTab="js,result" user="mmiszy" embedVersion="2" penTitle="Stan komponentów React.js">
<a href="http://codepen.io/mmiszy/pen/ZaerWq/">Zobacz Codepen Stan komponentów React.js</a>.
</CodepenWidget>

Jeśli chcesz na bieżąco dowiadywać się o kolejnych częściach kursu React.js to koniecznie <strong>śledź mnie na Facebooku i zapisz się na newsletter.</strong>

<NewsletterForm />

<FacebookPageWidget />

<h2>Ćwiczenie</h2>

<strong>Ćwiczenie: </strong>Napisz komponent, który będzie miał dwa inputy na imię i nazwisko. Obok, powinien się wyświetlać tekst wpisany w te pola (imię nazwisko). Użyj do tego atrybutu <code>onInput</code> oraz funkcji <code>setState</code>.

Napisz w komentarzu jak Ci się podoba obsługa formularzy w React. Poświęcę temu jeden z kolejnych odcinków, więc chcę wiedzieć już teraz jakie masz uwagi :)
