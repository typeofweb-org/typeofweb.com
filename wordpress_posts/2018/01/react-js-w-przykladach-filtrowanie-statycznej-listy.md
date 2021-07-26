---
id: 921
index: 57
title: 'React.js w przykładach: filtrowanie statycznej listy'
date: 2018-01-24T09:19:30.000Z
isMarkdown: true
status: publish
permalink: react-js-w-przykladach-filtrowanie-statycznej-listy
authors:
  - michal-miszczyszyn
guid: https://typeofweb.com/?p=921
type: post
thumbnail:
  url: https://typeofweb.com/wp-content/uploads/2018/01/pexels-photo-417122.jpeg
  width: 1920
  height: 852
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
W jednym z komentarzy ktoś zasugerował mi, abym pokazywał jak najwięcej praktycznych przykładów. Inna osoba pytała konkretnie o przykład filtrowania listy na podstawie tekstu wpisywanego w input. Stwierdziłem, że warto skorzystać z tych sugestii. Oto powstaje seria wpisów, które będą się przeplatały z kursem Reacta jako takim. Tutaj będę pokazywał <strong>konkretne przykłady i implementacje</strong>, bez tłumaczenia teorii. Pierwszym przykładem będzie właśnie taka lista — na razie wersja prosta, ze statycznymi danymi i synchronicznym wyszukiwaniem. Do dzieła!

<!--more-->
<h2>Plan działania</h2>
Chcesz stworzyć listę (np. kontaktów) i wyrenderować ją. Łatwizna. Do tego potrzebujemy input, który będzie wyszukiwarką. Wpisanie czegoś w input ma powodować filtrowanie listy. Dodatkowo jeśli nic nie znaleziono — ma wyświetlić się komunikat. Jeśli nie wiesz, jak to ugryźć to [typeofweb-courses-slogan category="React"]
<p style="text-align: center;"><iframe src="https://www.youtube.com/embed/YWnpOobtug8?rel=0&amp;controls=0&amp;showinfo=0&amp;autoplay=1&amp;loop=1&amp;playlist=YWnpOobtug8" width="560" height="315" frameborder="0" allowfullscreen="allowfullscreen"></iframe></p>
Myślę, że ten przykład w całości zamknie się w jednym/dwóch komponentach.
<h2>HTML</h2>
Najpierw sam HTML:
<pre class="language-html"><code>&lt;input type="search"&gt;
&lt;ul&gt;
  &lt;li&gt;Michał&lt;/li&gt;
  &lt;li&gt;Ania&lt;/li&gt;
  &lt;li&gt;Kasia&lt;/li&gt;
  &lt;li&gt;Tomek&lt;/li&gt;
&lt;/ul&gt;</code></pre>
No łatwiej chyba się nie da ;)
<h2>React.js</h2>
<h3>Lista użytkowników</h3>
Tworzę dwa komponenty: <code>App</code> oraz <code>UsersList</code>. UsersList ma być typowym komponentem „głupim” — tzn. jego renderowanie zależy tylko od przekazanych propsów. Przekażę tam tablicę z listą kontaktów już po przefiltrowaniu, którą <strong>zmapuję na listę elementów</strong>:
<pre class="language-jsx"><code>const UsersList = ({ users }) =&gt; {
  return (
    &lt;ul&gt;
      {users.map(user =&gt; &lt;li key={user}&gt;{user}&lt;/li&gt;)}
    &lt;/ul&gt;
  );
};</code></pre>
<p class="important">Pamiętaj o dodaniu <strong>unikalnego</strong> atrybutu <code>key</code> do każdego elementu zawsze gdy renderowana jest tablica!</p>

<h3>A co gdy brak wyników?</h3>
Dodaję jeden warunek i renderuję co innego. A więc ostatecznie ten komponent wygląda tak:
<pre class="language-jsx"><code>const UsersList = ({ users }) =&gt; {
  if (users.length &gt; 0) {
    return (
      &lt;ul&gt;
        {users.map(user =&gt; &lt;li key={user}&gt;{user}&lt;/li&gt;)}
      &lt;/ul&gt;
    );
  }

  return (
    &lt;p&gt;No results!&lt;/p&gt;
  );
};</code></pre>
<h3>Komponent <code>App</code></h3>
Logikę filtrowania oraz obsługę zdarzeń zamknę w komponencie <code>App</code>. Mógłbym się pokusić o dalszy podział na mniejsze komponenty, ale przy tak prostym przykładzie nie widzę w tym sensu. Przefiltrowanych użytkowników przechowuję w <code>state</code> i przekazuję do <code>UsersList</code>. Do inputa podpinam obsługę jednego zdarzenia <code>onInput</code>:
<pre class="language-jsx"><code>class App extends React.Component {
  constructor() {
    super();

    this.state = {
      filteredUsers: allUsers
    };
  }

  render() {
    return (
      &lt;div&gt;
        &lt;input onInput={this.filterUsers.bind(this)} /&gt;
        &lt;UsersList users={this.state.filteredUsers} /&gt;
      &lt;/div&gt;
    );
  }
};</code></pre>
Stała <code>allUsers</code> pochodzi „z zewnątrz” — w sumie nieistotne skąd, bo nie mam tutaj żadnego API, store'a ani nic takiego. Po prostu zdefiniuj ją sobie gdziekolwiek. Przynajmniej w tym przykładzie :)
<h3>Implementacja filtrowania</h3>
Samo filtrowanie sprowadza się do:
<ol>
 	<li>Pobrania wpisywanego tekstu z inputa</li>
 	<li>Przefiltrowania tablicy wedle pewnych kryteriów (*)</li>
 	<li>Ustawienia <code>state</code></li>
</ol>
Punkt 2 oznaczyłem gwiazdką, bo to będzie jeszcze osobna funkcja. Kroki 1-3 łatwo zaimplementować:
<pre class="language-jsx"><code>filterUsers(e) {
  const text = e.currentTarget.value;
  const filteredUsers = this.getFilteredUsersForText(text)
  this.setState({
    filteredUsers
  });
}</code></pre>
<h3>Implementacja <code>getFilteredUsersForText</code></h3>
W tym przypadku ta funkcja działa dość prosto. Filtruję zawartość tablicy na podstawie porównania elementu z wpisanym tekstem. Jeśli element zawiera fragment wpisanego tekstu to zostaje :) Ważne: <strong>Porównanie jest niezależnie od wielkości znaków:</strong>
<pre class="language-jsx"><code>getFilteredUsersForText(text) {
  return allUsers.filter(user =&gt; user.toLowerCase().includes(text.toLowerCase()))
}</code></pre>
<h2>Rezultat</h2>
Ostatecznie stworzona aplikacja wygląda tak:
<p class="codepen" data-height="265" data-theme-id="0" data-slug-hash="govXpM" data-default-tab="js,result" data-user="mmiszy" data-embed-version="2" data-pen-title="React.js w przykładach: Filtrowanie listy">See the Pen <a href="https://codepen.io/mmiszy/pen/govXpM/">React.js w przykładach: Filtrowanie listy</a> by Michał Miszczyszyn (<a href="https://codepen.io/mmiszy">@mmiszy</a>) on <a href="https://codepen.io">CodePen</a>.</p>

<h2>Pytania?</h2>
Jak wrażenia? Jeśli masz jakiekolwiek pytania albo coś jest niejasne — <strong>pisz w komentarzu</strong>! To dla mnie cenna informacja zwrotna.

Jeśli chcesz na bieżąco śledzić kolejne części kursu React.js to koniecznie <strong>polub mnie na Facebooku i zapisz się na newsletter.</strong>
<div style="text-align: center; margin-bottom: 40px;">[typeofweb-mailchimp title=""]</div>
<div style="text-align: center;">[typeofweb-facebook-page]</div>

<h2>Ćwiczenie</h2>
<strong>Ćwiczenie:</strong> Jak zmieniłby się kod, gdyby filtrowanie użytkowników działo się np. na backendzie i było asynchroniczne? Czy musiałabyś modyfikować komponent  <code>UsersList</code>? Spróbuj to zaimplementować, przyjmując, że funkcja <code>getFilteredUsersForText</code> jest asynchroniczna i ma taką postać:
<pre class="language-jsx"><code>getFilteredUsersForText(text) {
  return new Promise(resolve =&gt; {
    const time = (Math.random() + 1) * 250;
    setTimeout(() =&gt; {
      const filteredUsers = allUsers.filter(user =&gt; user.toLowerCase().includes(text.toLowerCase()));
      resolve(filteredUsers);
    }, time) ;
  });
}</code></pre>
<strong>Ćwiczenie*:</strong> Spróbuj szybko wpisać coś w input. Czy zawsze wyświetlają się poprawne dane? Takie problemy to tzw. <em>race conditions</em>. Czy umiesz je tutaj jakoś rozwiązać? Pamiętaj, że React.js to tylko biblioteka do budowania widoków, a wiedza na temat rozwiązywania ogólnych problemów jest uniwersalna i bardzo przydatna z dowolnym frameworkiem :)
