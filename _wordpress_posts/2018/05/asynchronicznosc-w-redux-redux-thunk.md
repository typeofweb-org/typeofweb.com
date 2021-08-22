---
title: 'Asynchroniczność w Redux: redux-thunk'
date: 2018-05-07T10:24:32.000Z
isMarkdown: false
status: publish
permalink: asynchronicznosc-w-redux-redux-thunk
authors:
  - michal-miszczyszyn
type: post
thumbnail:
  url: https://res.cloudinary.com/type-of-web/wp-content/uploads/2018/04/redux-thunk.jpeg
  width: 1280
  height: 579
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
    Jak wykonywać zapytania do API z użyciem Redux? Czy konieczne jest robienie
    tego w komponencie, dispatch akcji, a potem kolejnej akcji? Poznaj
    redux-thunk — middleware do redux, który umożliwi Ci tworzenie
    asynchronicznych akcji!
---

Do tej pory dane z API pobierałem po prostu w komponencie <code>App</code>, a po przyjściu odpowiedzi wysyłałem odpowiednią akcję (<code>contactsFetched</code>). To działało. Ale wymyśliłem sobie nową funkcję w aplikacji: Możliwość parametryzowania zapytań do API. Posłuży mi do tego nowy komponent. Jak teraz mam wykonywać zapytania do API? Przekazywać coś do store, a to coś wpłynie na <code>App</code>, który wykona zapytanie i zwróci dane znowu do store? Nie brzmi za dobrze. Ale jest lepszy sposób: Poznaj <code>redux-thunk</code>!

---

<h2>redux-thunk</h2>

Może najpierw krótko: Czym jest redux-thunk? Jest to dodatek (a konkretnie <em>middleware</em>) do Reduksa, który pozwala na wysyłanie <strong>akcji, które są funkcjami</strong>. Takie akcje nie trafiają do Twoich reducerów. Ich zadaniem jest <strong>wyemitowanie kolejnych akcji</strong> — jednej lub kilku, po pewnym czasie, asynchronicznie. Przykładowo:

<pre><code class="language-jsx">store.dispatch({ type: 'INCREMENT' }); // (1)

store.dispatch(function (dispatch) {
  dispatch({ type: 'INCREMENT' }); // (2)
  setTimeout(() =&gt; dispatch({ type: 'INCREMENT' }), 1000); // (3)
  setTimeout(() =&gt; dispatch({ type: 'INCREMENT' }), 2000); // (3)
});
</code></pre>

Tutaj od razu wysyłam pierwszą akcję (1) — to mniej więcej to samo co robiłaś do tej pory przez <code>mapDispatchToProps</code>, tylko maksymalnie uprościłem ten kod.

Skupmy się jednak na thunku! Następnie do <code>dispatch</code> przekazuję funkcję — to nie działałoby bez <code>redux-thunk</code>! W tej funkcji (2) natychmiast wywołuję kolejny <code>INCREMENT</code>, a następnie, asynchronicznie, jeszcze dwa kolejne (3). Zobacz to na żywo:

<CodepenWidget height="265" themeId="0" slugHash="MGjJda" defaultTab="js,result" user="mmiszy" embedVersion="2" penTitle="React Redux Thunk Type of Web">
<a href="http://codepen.io/mmiszy/pen/MGjJda/">Zobacz Codepen React Redux Thunk Type of Web</a>.
</CodepenWidget>

Jeśli w demie powyżej widzisz od razu "Licznik: 5" to otwórz je w nowej karcie. Licznik zacznie się od 2 (po dwóch synchronicznych akcjach), a następnie po sekundzie wskoczy 3, po kolejnej 4 i potem 5.

<h2>Zapytania do API w redux-thunk</h2>

A więc jak wykonać zapytanie do API w redux-thunk? Bardzo łatwo ;) W ten sposób:

<pre><code class="language-jsx">const contactsFetched = contacts =&gt; ({ // (4)
  type: "FETCH_CONTACTS_SUCCESS",
  contacts
});

export const fetchContacts = () =&gt; (dispatch) =&gt; { // (5)
  fetch("https://myapi.local/contacts)
    .then(res =&gt; res.json())
    .then(json =&gt; dispatch(contactsFetched(json.results)));
};
</code></pre>

Tutaj widzisz standardowy <em>action creator</em>, taki jak w poprzednim artykule (4). Posłuży on do poinformowania aplikacji o tym, że dane już zostały pobrane — dokładnie tak jak było wcześniej. Zmianą jest <strong>przeniesienie samego <code>fetch</code> do action creatora</strong> <code>fetchContacts</code> poniżej (5). Dzięki <code>redux-thunk</code> możliwe stało się <strong>wywołanie fetch, a potem wywołanie kolejnej akcji</strong> gdy nadejdą dane. Super, prawda?

<p class="important">W praktyce sama funkcja do pobierania danych z API byłaby wyniesiona do osobnego pliku — za warstwę abstrakcji. Dzięki temu kod byłby testowalny i łatwy do modyfikacji. Wtedy ten fragment wyglądałby jakoś tak:</p>

<pre class="language-jsx"><code>export const fetchContacts = () => (dispatch) => {
  ContactsApi.getAll().then(contacts => dispatch(contactsFetched(contacts)));
};</code></pre>

<h2>Dodaj to do aplikacji</h2>

To zaimplementuj nową funkcję w appce. Dodaj <code>select</code>, którym będzie można sparametryzować zapytanie. Wyobraź sobie, że tym selectem możesz przełączyć czy chcesz widzieć listę wszystkich kontaktów, tylko ulubionych kontaktów, czy tych nielubianych ;) W naszym API zasymulujemy to przez podane parametru <code>seed</code>.

Założenia są takie:

<ul>
<li>wszystko to co mamy do tej pory nadal działa:

<ul>
<li>aplikacja się otwiera,</li>
<li>kontakty się automatycznie wczytują,</li>
<li>filtrowanie po imionach działa,</li>
</ul></li>
<li>dodatkowo: po wybraniu seeda kontakty się przeładowują,</li>
<li>filtrowanie nadal działa niezależnie od seeda</li>
</ul>

Wszystko jasne? Zaczynam od kodu z poprzedniego wpisu: <a href="https://github.com/mmiszy/typeofweb-kurs-react/tree/contacts-list-3-redux">github.com/mmiszy/typeofweb-kurs-react/tree/contacts-list-3-redux</a>

<h2>redux-thunk i fetch</h2>

Modyfikuję więc punkt startowy naszej appki, czyli plik <code>App.jsx</code>. <strong>Zamiast zapytania do API, wywoła on po prostu odpowiednią akcję</strong>, która już zajmie się resztą:

<pre><code class="language-jsx">// App.jsx
componentDidMount() {
  this.props.fetchContacts() // tutaj był wcześniej fetch
}
</code></pre>

Poza tym w samym App.jsx nic więcej nie zmienia! Napisz teraz komponent <code>SeedPicker</code> i potrzebne akcje.

<h2>SeedPicker</h2>

Tak, jak opisałem wcześniej, SeedPicker ma być zwykłym <code>select</code>-em z kilkoma predefiniowanymi wartościami do wyboru. Zmiana wartości ma skutkować wysłaniem akcji.

<pre><code class="language-jsx">// SeedPicker.jsx
class SeedPicker extends React.Component {
  render() {
    return (
      &lt;div className="field"&gt;
        &lt;select
          className="ui dropdown fluid"
          onChange={this.handleSeedChange} // (6)
          value={this.props.seed}
        &gt;
          &lt;option value="default-seed"&gt;Default seed&lt;/option&gt;
          &lt;option value="one-seed"&gt;One seed&lt;/option&gt;
          &lt;option value="another-seed"&gt;Another seed&lt;/option&gt;
        &lt;/select&gt;
      &lt;/div&gt;
    );
  }

  handleSeedChange = e =&gt; {
    this.props.changeSeedAndFetch(e.currentTarget.value); // (7)
  };
}
</code></pre>

Oto ten komponent ;) Przy zmianie wartości, wywoływana jest metoda (6), która wywoła z kolei funkcję przekazaną jako props (7). Ta funkcja zostanie dostarczona przez <code>connect</code> z <code>react-redux</code> i wyśle akcję — dokładnie tak jak do tej pory:

<pre><code class="language-jsx">// SeedPicker.jsx
const mapStateToProps = (state) =&gt; { // (8)
  return {
    seed: state.seed
  };
};
const mapDispatchToProps = { changeSeedAndFetch }; // (9)

export const SeedPickerContainer = connect(mapStateToProps, mapDispatchToProps)( // (10)
  SeedPicker
);
</code></pre>

Standardowe nazewnictwo funkcji i obiektów: w <code>mapStateToProps</code> tworzysz potrzebny props <code>seed</code> (8). Do <code>mapDispatchToProps</code> przekazujesz akcję, którą za chwilę stworzysz (9). Gotowy komponent <code>SeedPickerContainer</code> to wynik wywołania funkcji <code>connect</code> (10).

<h2>Nowe akcje</h2>

Istniejące już akcje <code>searchContacts</code> i <code>contactsFetched</code> pozostają bez zmian. Pojawia się kilka nowych:

<ul>
<li><code>changeSeed</code></li>
<li><code>fetchContacts</code></li>
<li><code>changeSeedAndFetch</code></li>
</ul>

Po kolei:

<h3>changeSeed</h3>

<pre><code class="language-jsx">export const changeSeed = seed =&gt; ({
  type: "CHANGE_SEED",
  seed
});
</code></pre>

Analogiczna akcja do <code>searchContacts</code>, przekazujemy tekst, nic więcej się nie dzieje.

<h3>fetchContacts</h3>

<pre><code class="language-jsx">export const fetchContacts = () =&gt; (dispatch, getState) =&gt; { // (11)
  fetch(
    "https://randomuser.me/api/?format=json&amp;results=10&amp;seed=" +
      encodeURIComponent(getState().seed)
  )
    .then(res =&gt; res.json())
    .then(json =&gt; dispatch(contactsFetched(json.results)));
};
</code></pre>

Tutaj robi się ciekawiej! Jest to akcja działająca dzięki <code>redux-thunk</code> — funkcja.

Zwróć uwagę na to, że zwracana funkcja <strong>przyjmuje dwa argumenty</strong> — <code>dispatch</code> i <code>getState</code> (11). Ten drugi jest przydatny, gdy działanie akcji ma zależeć od wartości zapisanych w storze — w tym przypadku tak jest, gdyż potrzebujesz parametru <code>seed</code> do zapytania. Dalej wykonywany jest po prostu <code>fetch</code> z odpowiednim adresem (+ <code>seed</code>!), a <strong>po przyjściu danych wysyłana jest kolejna akcja</strong> — <code>contactsFetched</code> (już istniejąca).

<h3>changeSeedAndFetch</h3>

<pre><code class="language-jsx">export const changeSeedAndFetch = seed =&gt; dispatch =&gt; {
  dispatch(changeSeed(seed)); // (12)
  dispatch(fetchContacts()); // (13)
};
</code></pre>

Teraz dopiero zrobiło się ciekawie ;) Ta akcja robi 2 rzeczy: Zmienia seed (dzięki akcji <code>changeSeed</code> (12)), a następnie inicjuje ponowne pobranie kontaktów (już z nowym seedem — (13)). Jak widzisz, <strong>nowe akcje mogą korzystać z już istniejących</strong>: komponować je i wywoływać w różnej kolejności, także asynchronicznie.

<h2>reducer</h2>

Jeszcze jedna formalność: Brakujący <em>reducer</em> dla pola seed:

<pre><code class="language-jsx">export const seed = (state = 'default-seed', action) =&gt; {
  switch (action.type) {
    case 'CHANGE_SEED':
      return action.seed;
    default:
      return state
  }
}
</code></pre>

<p class="important">Jeśli widzisz bliźniacze podobieństwo tego reducera do reducera <code>contactsSearch</code> i wydaje Ci się to zbędną duplikacją kodu to… masz rację. Ten problem rozwiązuje się używając tzw. <strong>Higher-Order Reducers</strong>. Poświęcę temu pojęciu osobny wpis.</p>

<h2>Efekt</h2>

Zobacz tutaj:

<p style="text-align: center;"><iframe src="https://www.youtube.com/embed/jlcRfRs1IRU?rel=0&amp;controls=0&amp;showinfo=0&amp;autoplay=1&amp;loop=1&amp;playlist=jlcRfRs1IRU" width="560" height="476" frameborder="0" allowfullscreen="allowfullscreen"></iframe></p>

Kod znajdziesz jak zwykle na moim GitHubie: <a href="https://github.com/mmiszy/typeofweb-kurs-react/tree/contacts-list-4-redux">github.com/mmiszy/typeofweb-kurs-react/tree/contacts-list-4-redux</a>

<h2>Podsumowanie</h2>

Wygląda dobrze, prawda? Umiesz już tworzyć asynchroniczne akcje, wywoływać je jedna po drugiej i reagować na zmiany. Świetna robota! <a href="https://szkolenia.typeofweb.com/" target="_blank">zapisz się na szkolenie z React i Redux</a>.

Jeśli chcesz na bieżąco dowiadywać się o kolejnych częściach kursu React.js to koniecznie <strong>śledź mnie na Facebooku i zapisz się na newsletter.</strong>

<NewsletterForm />

<FacebookPageWidget />

<h2>Ćwiczenie</h2>

<strong>Ćwiczenie</strong>: Zrefaktoruj plik z akcjami tak, aby nie było w nim żadnego wywołania <code>fetch</code> — tylko abstrakcje. Stwórz plik o nazwie <code>ContactsApi</code> i tam umieść funkcję do pobierania kontaktów.
