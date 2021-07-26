---
id: 714
index: 46
title: Props czyli atrybuty w React.js
date: 2017-12-12T14:25:59.000Z
isMarkdown: true
status: publish
permalink: props-czyli-atrybuty-react-js
authors:
  - michal-miszczyszyn
guid: https://typeofweb.com/?p=714
type: post
thumbnail:
  url: https://typeofweb.com/wp-content/uploads/2017/10/pexels-photo-340901.jpeg
  width: 1280
  height: 427
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
W tej części nauczysz się <strong>parametryzować komponenty w React.js</strong>. Poznasz pojęcie "props" oraz dowiesz się do czego one (te „propsy”) służą.

To co zrobiliśmy do tej pory było spoko, ale przecież nie będziesz tworzyć nowego komponentu zawsze gdy będziesz chciał(a) wyświetlić inny tekst w aplikacji, prawda? Wyobraź sobie, że masz do zaprojektowania popup, w którym będzie wyświetlony tytuł oraz tekst. Za moment to zaimplementujemy!

<!--more-->
<h2>Projekt</h2>
Zacznijmy od zaprojektowania kodu takiego modala. Będzie to dosłownie kilka prostych linii HTML:
<pre><code class="language-html">&lt;div&gt;
  &lt;dialog open&gt;
    &lt;h1&gt;Tytuł&lt;/h1&gt;
    &lt;p&gt;Treść&lt;/p&gt;
  &lt;/dialog&gt;
&lt;/div&gt;</code></pre>
Nic skomplikowanego. <code>dialog</code> to element wbudowany w HTML5. Następnie zamieniamy taki kod na komponent, czyli tworzymy funkcję, która zwraca JSX:
<pre><code class="language-js">function MojKomponent() {
  return (
    &lt;div&gt;
      &lt;dialog open&gt;
        &lt;h1&gt;Tytuł&lt;/h1&gt;
        &lt;p&gt;Treść&lt;/p&gt;
      &lt;/dialog&gt;
    &lt;/div&gt;
  );
}</code></pre>
Tym sposobem Twoim oczom powinien się ukazać taki oto piękny efekt:

<a href="https://typeofweb.com/wp-content/uploads/2017/10/Screen-Shot-2017-10-24-at-8.58.40-PM.png"><img class="aligncenter size-full wp-image-722" src="https://typeofweb.com/wp-content/uploads/2017/10/Screen-Shot-2017-10-24-at-8.58.40-PM.png" alt="Kurs React.js – komponent bez props" width="318" height="414" /></a>
<h2>Props w React.js</h2>
Niestety teraz aby zmienić tekst, musimy edytować kod samego komponentu, a to jest mało praktyczne. Czy można jakoś sparametryzować to co wyświetla komponent? Tak! Używając tzw. propsów :)

Do tej pory komponentu używaliśmy w taki sposób: <code>&lt;MojKomponent /&gt;</code>. Czyli jest to tak jakby element. A czy możemy dodać tutaj jakieś atrybuty? Właśnie tak! To dokładnie będą nasze propsy. Props to atrybut. Podajmy więc tytuł i treść: <code>&lt;MojKomponent title="Tytuł" content="Treść" /&gt;</code>. Czy to już? Niestety nie. Teraz musimy jeszcze jakoś się odwołać do tych propsów i wyświetlić.
<h3>Propsy to argumenty</h3>
Propsy do komponentów przekazywane są po prostu jako argumenty. A konkretnie: Jeden argument, który jest obiektem. Czy mogłoby być prościej? Chyba nie :) Funkcja przybiera taką postać:
<pre><code class="language-js">function MojKomponent({ title, content }) { … }</code></pre>
<h3 data-height="365" data-theme-id="0" data-slug-hash="BweVZB" data-default-tab="js,result" data-user="mmiszy" data-embed-version="2" data-pen-title="Wstęp do React">Wyświetlanie</h3>
Jak teraz <strong>wyświetlić zawartość takiej zmiennej w JSX</strong>? Jest to również bardzo proste. Wystarczy skorzystać ze składni <code>{nazwa}</code> — i to wszystko!

Ostatecznie otrzymujemy taki kod:
<pre><code class="language-js">function MojKomponent({ title, content }) {
  return (
    &lt;div&gt;
      &lt;dialog open&gt;
        &lt;h1&gt;{title}&lt;/h1&gt;
        &lt;p&gt;{content}&lt;/p&gt;
      &lt;/dialog&gt;
    &lt;/div&gt;
  );
}</code></pre>
<h3 data-height="365" data-theme-id="0" data-slug-hash="BweVZB" data-default-tab="js,result" data-user="mmiszy" data-embed-version="2" data-pen-title="Wstęp do React">Ostateczny efekt</h3>
Teraz już nie pozostaje nic innego jak wyrenderować ten komponent. Podobnie jak dotychczas:
<pre><code class="language-js">ReactDOM.render(
  &lt;MojKomponent
    title="I co, duma?"
    content="To było prostsze niż by się mogło wydawać, prawda?"
  /&gt;,
  document.getElementById("app")
);</code></pre>
<h2>Domyślne propsy</h2>
Co się wydarzy gdy nie podasz jakiegoś propsa i spróbujesz go wyświetlić? Na szczęście nic złego. Zostanie potraktowany jak pusty string <code>""</code> i nic się nie pokaże. Lepsze to niż wyświetlenie użytkownikom np. <code>undefined</code>, prawda? :) Ale na pewno nie idealne! Właśnie dlatego możemy podać <strong>domyślne propsy</strong>.

Najprościej możesz to zrobić korzystając ze składni ES2015, z której już i tak korzystamy :) Do argumentów można dopisać domyślne wartości. Po znaku <code>=</code> po prostu podajemy stringa, który ma się wyświetlić gdy danego atrybutu na komponencie nie ma:
<pre><code class="language-js">function MojKomponent({ title = "Modal", content }) { // tutaj podajemy domyślne propsy
  return (
    &lt;div&gt;
      &lt;dialog open&gt;
        &lt;h1&gt;{title}&lt;/h1&gt;
        &lt;p&gt;{content}&lt;/p&gt;
      &lt;/dialog&gt;
    &lt;/div&gt;
  );
}</code></pre>
Teraz przy próbie wyrenderowania <code>&lt;MojKomponent /&gt;</code> zamiast tytułu pokaże się napis "Modal", a w miejsce treści nie pokaże się nic (pusty element <code>&lt;p&gt;</code>).
<h2>Demo</h2>
<p class="codepen" data-height="365" data-theme-id="0" data-slug-hash="BweVZB" data-default-tab="js,result" data-user="mmiszy" data-embed-version="2" data-pen-title="Props czyli atrybuty w React.js">See the Pen <a href="https://codepen.io/mmiszy/pen/BweVZB/">Props czyli atrybuty w React.js</a> by Michał Miszczyszyn (<a href="https://codepen.io/mmiszy">@mmiszy</a>) on <a href="https://codepen.io">CodePen</a>.</p>

<h2>Co dalej?</h2>
[typeofweb-courses-slogan category="React"]

W kolejnej części nauczysz się jak dzielić aplikację na komponenty. Rozpoczniesz też budowę „prawdziwej” aplikacji! Jeśli chcesz na bieżąco śledzić kolejne części kursu React.js to koniecznie <strong>śledź mnie na Facebooku i zapisz się na newsletter.</strong>
<div style="text-align: center; margin-bottom: 40px;">[typeofweb-mailchimp title=""]</div>
<div style="text-align: center;">[typeofweb-facebook-page]</div>
<h2>Ćwiczenie</h2>
<strong>Ćwiczenie:</strong> Zrób eksperyment z propsami. Spróbuj przekazać zamiast stringa kolejno: liczbę, obiekt, tablicę i funkcję. Co można z nimi zrobić? Czy da się przekazać tam HTML? Napisz w komentarzu!
