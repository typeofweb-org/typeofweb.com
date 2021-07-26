---
id: 1468
index: 83
title: 'Asynchroniczność w Redux: redux-thunk'
date: 2018-05-07T10:24:32.000Z
isMarkdown: true
status: publish
permalink: asynchronicznosc-w-redux-redux-thunk
authors:
  - michal-miszczyszyn
guid: https://typeofweb.com/?p=1468
type: post
thumbnail:
  url: https://typeofweb.com/wp-content/uploads/2018/04/redux-thunk.jpeg
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
seo: {}

---
Do tej pory dane z API pobierałem po prostu w komponencie `App`, a po przyjściu odpowiedzi wysysyłałem odpowiednią akcję (`contactsFetched`). To działało. Ale wymyśliłem sobie nową funkcję w aplikacji: Możliwość parametryzowania zapytań do API. Posłuży mi do tego nowy komponent. Jak teraz mam wykonywać zapytania do API? Przekazywać coś do store, a to coś wpłynie na `App`, który wykona zapytanie i zwróci dane znowu do store? Nie brzmi za dobrze. Ale jest lepszy sposób: Poznaj `redux-thunk`!

<!--more-->

## redux-thunk

Może najpierw krótko: Czym jest redux-thunk? Jest to dodatek (a konkretnie _middleware_) do Reduksa, który pozwala na wysyłanie **akcji, które są funkcjami**. Takie akcje nie trafiają do Twoich reducerów. Ich zadaniem jest **wyemitowanie kolejnych akcji** — jednej lub kilku, po pewnym czasie, asynchronicznie. Przykładowo:

```jsx
store.dispatch({ type: 'INCREMENT' }); // (1)

store.dispatch(function (dispatch) {
  dispatch({ type: 'INCREMENT' }); // (2)
  setTimeout(() => dispatch({ type: 'INCREMENT' }), 1000); // (3)
  setTimeout(() => dispatch({ type: 'INCREMENT' }), 2000); // (3)
});
```

Tutaj od razu wysyłam pierwszą akcję (1) — to mniej więcej to samo co robiłaś do tej pory przez `mapDispatchToProps`, tylko maksymalnie uprościłem ten kod.

Skupmy się jednak na thunku! Następnie do `dispatch` przekazuję funkcję — to nie działałoby bez `redux-thunk`! W tej funkcji (2) natychmiast wywołuję kolejny `INCREMENT`, a następnie, asynchronicznie, jeszcze dwa kolejne (3). Zobacz to na żywo:

<p data-height="265" data-theme-id="0" data-slug-hash="MGjJda" data-default-tab="js,result" data-user="mmiszy" data-embed-version="2" data-pen-title="React Redux Thunk Type of Web" class="codepen">See the Pen <a href="https://codepen.io/mmiszy/pen/MGjJda/">React Redux Thunk Type of Web</a> by Michał Miszczyszyn (<a href="https://codepen.io/mmiszy">@mmiszy</a>) on <a href="https://codepen.io">CodePen</a>.</p>

Jeśli w demie powyżej widzisz od razu "Licznik: 5" to otwórz je w nowej karcie. Licznik zacznie się od 2 (po dwóch synchronicznych akcjach), a następnie po sekundzie wskoczy 3, po kolejnej 4 i potem 5.

## Zapytania do API w redux-thunk
A więc jak wykonać zapytanie do API w redux-thunk? Bardzo łatwo ;) W ten sposób:

```jsx
const contactsFetched = contacts => ({ // (4)
  type: "FETCH_CONTACTS_SUCCESS",
  contacts
});

export const fetchContacts = () => (dispatch) => { // (5)
  fetch("https://myapi.local/contacts)
    .then(res => res.json())
    .then(json => dispatch(contactsFetched(json.results)));
};
```

Tutaj widzisz standardowy _action creator_, taki jak w poprzednim artykule (4). Posłuży on do poinformowania aplikacji o tym, że dane już zostały pobrane — dokładnie tak jak było wcześniej. Zmianą jest **przeniesienie samego `fetch` do action creatora** `fetchContacts` poniżej (5). Dzięki `redux-thunk` możliwe stało się **wywołanie fetch, a potem wywołanie kolejnej akcji** gdy nadejdą dane. Super, prawda?

<p class=important>W praktyce sama funkcja do pobierania danych z API byłaby wyniesiona do osobnego pliku — za warstwę abstrakcji. Dzięki temu kod byłby testowalny i łatwy do modyfikacji. Wtedy ten fragment wyglądałby jakoś tak:</p>
<pre class="language-jsx"><code>export const fetchContacts = () => (dispatch) => {
  ContactsApi.getAll().then(contacts => dispatch(contactsFetched(contacts)));
};</code></pre>

## Dodaj to do aplikacji
To zaimplementuj nową funkcję w appce. Dodaj `select`, którym będzie można sparametryzować zapytanie. Wyobraź sobie, że tym selectem możesz przełączyć czy chcesz widzieć listę wszystkich kontaktów, tylko ulubionych kontaktów, czy tych nielubianych ;) W naszym API zasymulujemy to przez podane parametru `seed`.

Założenia są takie:

* wszystko to co mamy do tej pory nadal działa:
  * aplikacja się otwiera,
  * kontakty się automatycznie wczytują,
  * filtrowanie po imionach działa,
* dodatkowo: po wybraniu seeda kontakty się przeładowują,
* filtrowanie nadal działa niezależnie od seeda

Wszystko jasne? Zaczynam od kodu z poprzedniego wpisu: [github.com/mmiszy/typeofweb-kurs-react/tree/contacts-list-3-redux](https://github.com/mmiszy/typeofweb-kurs-react/tree/contacts-list-3-redux)

## redux-thunk i fetch
Modyfikuję więc punkt startowy naszej appki, czyli plik `App.jsx`. **Zamiast zapytania do API, wywoła on po prostu odpowiednią akcję**, która już zajmie się resztą:

```jsx
// App.jsx
componentDidMount() {
  this.props.fetchContacts() // tutaj był wcześniej fetch
}
```

Poza tym w samym App.jsx nic więcej nie zmienia! Napisz teraz komponent `SeedPicker` i potrzebne akcje.

## SeedPicker
Tak, jak opisałem wcześniej, SeedPicker ma być zwykłym `select`-em z kilkoma predefiniowanymi wartościami do wyboru. Zmiana wartości ma skutkować wysłaniem akcji.

```jsx
// SeedPicker.jsx
class SeedPicker extends React.Component {
  render() {
    return (
      <div className="field">
        <select
          className="ui dropdown fluid"
          onChange={this.handleSeedChange} // (6)
          value={this.props.seed}
        >
          <option value="default-seed">Default seed</option>
          <option value="one-seed">One seed</option>
          <option value="another-seed">Another seed</option>
        </select>
      </div>
    );
  }

  handleSeedChange = e => {
    this.props.changeSeedAndFetch(e.currentTarget.value); // (7)
  };
}
```

Oto ten komponent ;) Przy zmianie wartości, wywoływana jest metoda (6), która wywoła z kolei funkcję przekazaną jako props (7). Ta funkcja zostanie dostarczona przez `connect` z `react-redux` i wyśle akcję — dokładnie tak jak do tej pory:

```jsx
// SeedPicker.jsx
const mapStateToProps = (state) => { // (8)
  return {
    seed: state.seed
  };
};
const mapDispatchToProps = { changeSeedAndFetch }; // (9)

export const SeedPickerContainer = connect(mapStateToProps, mapDispatchToProps)( // (10)
  SeedPicker
);
```

Standardowe nazewnictwo funkcji i obiektów: w `mapStateToProps` tworzysz potrzebny props `seed` (8). Do `mapDispatchToProps` przekazujesz akcję, którą za chwilę stworzysz (9). Gotowy komponent `SeedPickerContainer` to wynik wowyołania funkcji `connect` (10).

## Nowe akcje
Istniejące już akcje `searchContacts` i `contactsFetched` pozostają bez zmian. Pojawia się kilka nowych:

* `changeSeed`
* `fetchContacts`
* `changeSeedAndFetch`

Po kolei:
### changeSeed
```jsx
export const changeSeed = seed => ({
  type: "CHANGE_SEED",
  seed
});
```

Analogiczna akcja do `searchContacts`, przekazujemy tekst, nic więcej się nie dzieje.
### fetchContacts
```jsx
export const fetchContacts = () => (dispatch, getState) => { // (11)
  fetch(
    "https://randomuser.me/api/?format=json&results=10&seed=" +
      encodeURIComponent(getState().seed)
  )
    .then(res => res.json())
    .then(json => dispatch(contactsFetched(json.results)));
};
```

Tutaj robi się ciekawiej! Jest to akcja działająca dzięki `redux-thunk` — funkcja.

Zwróć uwagę na to, że zwracana funkcja **przyjmuje dwa argumenty** — `dispatch` i `getState` (11). Ten drugi jest przydatny, gdy działanie akcji ma zależeć od wartości zapisanych w storze — w tym przypadku tak jest, gdyż potrzebujesz parametru `seed` do zapytania. Dalej wykonywany jest po prostu `fetch` z odpowiednim adresem (+ `seed`!), a **po przyjściu danych wysyłana jest kolejna akcja** — `contactsFetched` (już istniejąca).
### changeSeedAndFetch
```jsx
export const changeSeedAndFetch = seed => dispatch => {
  dispatch(changeSeed(seed)); // (12)
  dispatch(fetchContacts()); // (13)
};
```

Teraz dopiero zrobiło się ciekawie ;) Ta akcja robi 2 rzeczy: Zmienia seed (dzięki akcji `changeSeed` (12)), a następnie inicjuje ponowne pobranie kontaktów (już z nowym seedem — (13)). Jak widzisz, **nowe akcje mogą korzystać z już istniejących**: komponować je i wywoływać w różnej kolejności, także asynchronicznie.

## reducer
Jeszcze jedna formalność: Brakujący _reducer_ dla pola seed:

```jsx
export const seed = (state = 'default-seed', action) => {
  switch (action.type) {
    case 'CHANGE_SEED':
      return action.seed;
    default:
      return state
  }
}
```

<p class=important>Jeśli widzisz bliźniacze podobieństwo tego reducera do reducera <code>contactsSearch</code> i wydaje Ci się to zbędną duplikacją kodu to… masz rację. Ten problem rozwiązuje się używając tzw. <strong>Higher-Order Reducers</strong>. Poświęcę temu pojęciu osobny wpis.</p>

## Efekt
Zobacz tutaj:

<p style="text-align: center;"><iframe src="https://www.youtube.com/embed/jlcRfRs1IRU?rel=0&amp;controls=0&amp;showinfo=0&amp;autoplay=1&amp;loop=1&amp;playlist=jlcRfRs1IRU" width="560" height="476" frameborder="0" allowfullscreen="allowfullscreen"></iframe></p>

Kod znajdziesz jak zwykle na moim GitHubie: [github.com/mmiszy/typeofweb-kurs-react/tree/contacts-list-4-redux](https://github.com/mmiszy/typeofweb-kurs-react/tree/contacts-list-4-redux)

## Podsumowanie
Wygląda dobrze, prawda? Umiesz już tworzyć asynchroniczne akcje, wywoływać je jedna po drugiej i reagować na zmiany. Świetna robota! [typeofweb-courses-slogan category="React i Redux"]

Jeśli chcesz na bieżąco dowiadywać się o kolejnych częściach kursu React.js to koniecznie <strong>śledź mnie na Facebooku i zapisz się na newsletter.</strong>
<div style="text-align: center; margin-bottom: 40px;">[typeofweb-mailchimp title=""]</div>
<div style="text-align: center;">[typeofweb-facebook-page]</div>

## Ćwiczenie
**Ćwiczenie**: Zrefaktoruj plik z akcjami tak, aby nie było w nim żadnego wywołania `fetch` — tylko abstrakcje. Stwórz plik o nazwie `ContactsApi` i tam umieść funkcję do pobierania kontaktów.
