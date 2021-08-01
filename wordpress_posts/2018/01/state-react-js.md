---
id: 748
index: 51
title: Stan komponentów React.js
date: 2018-01-11T14:34:52.000Z
isMarkdown: false
status: publish
permalink: state-react-js
authors:
  - michal-miszczyszyn
guid: https://typeofweb.com/?p=748
type: post
thumbnail:
  url: https://typeofweb.com/wp-content/uploads/2017/11/pexels-photo-370799.jpeg
  width: 1280
  height: 800
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
    Przyszedł czas na poznanie tajemniczego "state" w React.js. Udało nam się
    tworzyć komponenty, które pięknie wyświetlały przekazane propsy, ale trzeba
    przyznać szczerze: Bez wewnątrznego stanu nie da się zbudować funkcjonalnej
    aplikacji. Dzisiaj nauczysz się taki stan dodawać i wykorzystywać :)
---

Przyszedł czas na poznanie tajemniczego <code>state</code> w React.js. Udało nam się tworzyć komponenty, które pięknie wyświetlały przekazane propsy, ale trzeba przyznać szczerze: <strong>Bez wewnątrznego stanu nie da się zbudować funkcjonalnej aplikacji</strong>. Dzisiaj nauczysz się taki stan dodawać i wykorzystywać :)

{/_ more _/}

Zacznijmy może od typowego przykładu powielonego w wielu kursach: Licznika. Stwórz komponent, który ma dwa przyciski (plus i minus) oraz <code>output</code> na wyświetlanie wyniku. Początkowo wartość wynosi 0, kliknięcie w przycisk odpowiednio zwiększa lub zmniejsza liczbę. Umiesz już obsłużyć kliknięcia, potrafisz też wyświetlać dane. Jak jednak je modyfikować?

<h2>Propsy są niemutowalne</h2>

<strong>Propsów nie da się zmienić z wnętrza komponentu</strong>. A jeśli spróbujesz to <em>pewnie</em> Ci się uda, ale będziesz mieć ogromne problemy — niespójne dane na ekranie, a może nawet jakieś błędy. Generalnie: <strong>Straszne rzeczy</strong>. Co do zasady: <strong>Propsów nie zmieniamy z wnętrza komponentu, do którego zostały one przekazane. I kropka.</strong>

<h2>Wchodzi <code>state</code></h2>

A więc tutaj pojawia się słynny state. Do czego służy? Do przechowywania stanu komponentu. Ponadto, <strong>state można mutować dzięki funkcji <code>setState</code></strong>. A więc jest to dokładnie ten brakujący element układanki, którego poszukujemy! Tak, tak, to właśnie w <code>state</code> będziesz przechowywać licznik, który chcesz zaimplementować.

Wszystko na temat stanu wyjaśniamy na szkoleniach. Jeśli coś jest dla Ciebie niejasne to <a href="https://szkolenia.typeofweb.com/" target="_blank">zapisz się na szkolenie z React</a>.

Jeszcze jedna mała uwaga: Do <code>state</code> nie dobierzesz się w funkcyjnych komponentach. Stąd też ich nazwa: <strong>Stateless Functional Components</strong>. Potrzebna będzie klasa. Skoro to jest już jasne, weźmy się za pisanie kodu:

<pre class="language-javascript"><code>class App extends React.Component {
  render() {
    return (
      &lt;div&gt;
        &lt;button&gt;+&lt;/button&gt;
        &lt;output&gt;{this.state.counter}&lt;/output&gt;
        &lt;button&gt;-&lt;/button&gt;
      &lt;/div&gt;
    );
  }
}</code></pre>

Tak mniej-więcej będzie wyglądała nasza funkcja <code>render</code>. Jednak jeśli teraz odpalisz ten kod to dostaniesz w konsoli wyjątek, coś podobnego do <code>Cannot read property 'counter' of null</code>. Chwila drapania się po głowie i… no jasne, przecież nigdzie nie podaliśmy czym w ogóle jest <code>state</code>! Do tego potrzebny nam będzie <strong>konstruktor klasy</strong>. Dopisz na początku swojego komponentu:

<pre class="language-javascript"><code>  constructor() {
    super();
    this.state = {counter: 0};
  }</code></pre>

Przypomnę tylko, że jeśli klasa po czymś dziedziczy (tak jak tutaj po <code>React.Component</code>) to wewnątrz konstruktora musisz wywołać <code>super()</code>. Potem <strong>ustawiasz <code>state</code> na taki, jaki ma on być domyślnie</strong> — zanim zostaną wykonane jakiekolwiek akcje przez użytkownika. Teraz aplikacja renderuje się poprawnie, aczkolwiek nic spektakularnego się jeszcze nie dzieje!

<h2><code>this</code> w React</h2>

Dopisujemy dwa <code>onClick</code> do przycisków i dwie metody w klasie: Jedna do zwiększania, a druga do zmniejszania wartości w liczniku. Posłuży do tego funkcja <code>setState</code>, w której odpowiednio ustawiamy licznik na (<code>obecna wartość + 1</code>) lub (<code>obecna wartość - 1</code>):

<pre class="language-html"><code>&lt;button onClick={this.increment}&gt;+&lt;/button&gt;</code></pre>

<pre class="language-javascript"><code>  increment() {
    this.setState({
      counter: this.state.counter + 1
    })
  }</code></pre>

Jednak po kliknięciu w przycisk dostajemy tylko błąd: <code>Cannot read property 'setState' of undefined</code>. Cooo?

Wspominałem, że przy klasach pojawi nam się błąd związany z <code>this</code>. Każdy kto zna JS widzi już w czym problem:<strong> <code>this</code> w momencie wywołania funkcji <code>increment</code> nie jest związane z instancją komponentu</strong>. Jak rozwiązać ten problem?

<strong>Jest kilka sposobów, które omówię później.</strong> Na razie weźmiemy najprostszy: <code>bind</code>. Zmień kod w JSX:

<pre class="language-html"><code>&lt;button onClick={this.increment.bind(this)}&gt;+&lt;/button&gt;</code></pre>

<strong>Woah, działa!</strong>

<CodepenWidget height="265" themeId="0" slugHash="GOjvBM" defaultTab="js,result" user="mmiszy" embedVersion="2" penTitle="Stan komponentów React.js"><a href="http://codepen.io/mmiszy/pen/GOjvBM/">Zobacz Codepen Stan komponentów React.js</a>.</CodepenWidget>

<h2>Ćwiczenie</h2>

<strong>Ćwiczenie:</strong> Dodaj dwa nowe liczniki. Pierwszy, który będzie zliczał wszystkie kliknięcia w przyciski (tzn. kliknięcie w <code>+</code> i <code>-</code> daje 0 na obecnym liczniku oraz 2 na nowym liczniku), oraz drugi, który będzie zliczał podwójne kliknięcia (tzw. <em>double click</em>) <strong>na elemencie z wynikiem</strong>. Jak wygląda teraz Twój <code>state</code>? Czy napotkałaś/eś jakieś problemy, albo coś Cię zaskoczyło? Napisz o tym w komentarzu :)
