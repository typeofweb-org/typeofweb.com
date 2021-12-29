---
title: Klasy jako komponenty React.js
date: 2017-12-19T12:26:57.000Z
isMarkdown: false
status: publish
permalink: klasy-jako-komponenty-react-js
authors:
  - michal-miszczyszyn
type: post
thumbnail:
  url: /assets/wp-content/uploads/2017/11/pexels-photo-80277.png
  width: 1920
  height: 1280
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
    Kurs React.js. Po co klasy w React? Przeważająca liczba moich komponentów to
    funkcje, jednak mają one spore ograniczenia. Jakie? To wszystkow tym wpisie!
---

Do tej pory używaliśmy prostych funkcji i z nich tworzyliśmy komponenty React. Mimo, że przeważająca część komponentów, które tworzę są właśnie takimi prostymi funkcjami, to jednak nie wszystkie. Funkcje są bardzo przydatne, jednak poniekąd ograniczone. Jak więc inaczej można tworzyć komponenty w React.js? <strong>Używając klas</strong>!

---

<h2>Stateless Functional Component</h2>

SFC, albo Stateless Functional Component — tak profesjonalnie nazywają się te komponenty, które do tej pory tworzyliśmy. Bezstanowe, funkcyjne — dokładnie takie one są :) Spróbujmy przepisać SFC, które wcześniej stworzyliśmy na klasę:

<pre class="language-javascript"><code>function ContactItem({ login, name, department }) {
  const imgUrl = `https://api.adorable.io/avatars/55/${login}.png`;
  return (
    &lt;li className="item"&gt;
      &lt;img src={imgUrl} className="ui mini rounded image" /&gt;
      &lt;div className="content"&gt;
        &lt;h4 className="header"&gt;{name}&lt;/h4&gt;
        &lt;div className="description"&gt;{department}&lt;/div&gt;
      &lt;/div&gt;
    &lt;/li&gt;
  );
}</code></pre>

<h2>Class w React.js</h2>

Korzystamy z klas znanych z ES2015. Klasa ta koniecznie musi dziedziczyć po <code>React.Component</code> (lub <code>PureComponent</code> — o tym kiedy indziej). Implementujemy w niej tylko jedną metodę: <code>render</code>. Oto kod poniżej:

<pre class="language-javascript"><code>class ContactItem extends React.Component {
  render() {
    const { login, name, department } = this.props
    const imgUrl = `https://api.adorable.io/avatars/55/${login}.png`;
    return (
      &lt;li className="item"&gt;
        &lt;img src={imgUrl} className="ui mini rounded image" /&gt;
        &lt;div className="content"&gt;
          &lt;h4 className="header"&gt;{name}&lt;/h4&gt;
          &lt;div className="description"&gt;{department}&lt;/div&gt;
        &lt;/div&gt;
      &lt;/li&gt;
    );
  }
}</code></pre>

Widzisz jakieś znaczące różnice?

<h2>Po co Ci class w React.js?</h2>

Na razie nie widać żadnej przewagi klasy nad funkcją. I rzeczywiście — <strong>przy takich komponentach (prezentacyjnych) lepiej jest napisać funkcję niż klasę.</strong> Gdzie klasy wygrywają i co możemy z nimi zrobić?

Klasy nie istnieją bez powodu :) Oto kilka możliwości. Wszystkie omówimy w kolejnych częściach tego kursu:

<ul>
    <li>możliwość definiowania stanu komponentu (<code>state</code>), który sprawi, że Twoja aplikacja zacznie „żyć”</li>
    <li>dostęp do metod cyklu życia komponentu (<em>lifecycle methods</em>), dzięki którym będziemy mogli reagować na różne wydarzenia</li>
    <li>możliwość definiowania fragmentów komponentów (każda funkcja może zwracać JSX!) jako metod w klasie — poprawa czytelności kodu</li>
    <li>możliwość tworzenia metod pomocniczych, z których można korzystać wewnątrz funkcji <code>render</code>. Na przykład do walidacji danych (przykład poniżej)</li>
</ul>

Przykładowo, jeśli korzystasz z jakiegoś modułu do formularzy w React, pewnie możesz napisać kod podobny do tego:

<pre class="language-javascript"><code>class MyForm extends React.Component {
  render() {
    return (
      &lt;Input name="nip" validate={[this.validateInput]} /&gt;
    )
  }

  validateInput(value) {
    return value &amp;&amp; value.length === 10;
  }
}</code></pre>

<h2>Co dalej?</h2>

Interakcje z komponentami. Poznasz też <code>state</code> oraz metody cyklu życia. Czytanie ponad 40 artykułów może być przytłaczające, więc może <a href="https://szkolenia.typeofweb.com/" target="_blank">zapisz się na szkolenie z React</a>.

Jeśli chcesz na bieżąco śledzić kolejne części kursu React.js to koniecznie <strong>śledź mnie na Facebooku i zapisz się na newsletter.</strong>

<NewsletterForm />

<FacebookPageWidget />

<h2>Ćwiczenie</h2>

<strong>Ćwiczenie:</strong> Przepisz pozostałe komponenty na klasy. Czy napotkałeś/aś jakieś trudności? Napisz w komentarzu!
