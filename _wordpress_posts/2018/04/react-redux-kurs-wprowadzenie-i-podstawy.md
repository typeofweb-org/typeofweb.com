---
title: 'React + Redux — kurs: wprowadzenie i podstawy'
date: 2018-04-06T11:54:56.000Z
isMarkdown: true
status: publish
permalink: react-redux-kurs-wprowadzenie-i-podstawy
authors:
  - michal-miszczyszyn
type: post
thumbnail:
  url: https://res.cloudinary.com/type-of-web/wp-content/uploads/2018/03/redux-kurs-typeofweb.png
  width: 887
  height: 400
categories:
  - slug: javascript
    name: JavaScript
  - slug: front-end
    name: Front-end
series:
  slug: react-js
  name: React.js
seo:
  focusKeywords:
    - Redux
  metadesc: >-
    Redux + React! Kurs Reacta dorobił się odcinka o Reduksie! Powoli wprowadzę
    Cię świat Reduksa, nauczysz się używać tej łatwej biblioteki, poznasz
    koncepty stojące za nią i napiszesz prostą aplikację. Redux: Oto wpis, na
    który wszyscy czekali!
---

Redux! Kurs Reacta dorobił się odcinka o Reduksie! Powoli wprowadzę Cię świat Reduksa, nauczysz się używać tej łatwej biblioteki, poznasz koncepty stojące za nią i napiszesz prostą aplikację.

Redux: Oto wpis, na który wszyscy czekali! :) Nie będzie teorii. Od razu zaczniemy używać Reduksa. Bo on jest tak naprawdę niesamowicie łatwy w obsłudze. Brzmi dobrze? Zaczynajmy!

---

<p class="important">Układ folderów przedstawiony w tym wpisie jest maksymalnie prosty. O strukturze większej aplikacji będę pisał jeszcze później.</p>

## Teoria

Jeśli jednak interesuje Cię teoria stojąca za Flux i Redux znajdziesz ją w innym moim wpisie:

https://typeofweb.com/flux-i-redux-globalny-store-jednokierunkowy-przeplyw-danych/

Na pewno warto przeczytać o wzorcach projektowych stojących za Reduksem! Warto też zajrzeć do <a href="https://redux.js.org">dokumentacji Redux</a>.

## Redux w praktyce

Do aplikacji z listą kontaktów (źródło tutaj: [github.com/mmiszy/typeofweb-kurs-react/tree/contacts-list-1](https://github.com/mmiszy/typeofweb-kurs-react/tree/contacts-list-1)) dodasz Reduksa. Kontakty będą <strong>zapisywane w storze</strong>. Jeśli chcesz sobie odświeżyć wątek to zajrzyj do wpisu na temat <a href="https://typeofweb.com/komunikacja-z-api-w-react-js/">łączenia Reacta z API</a>.

Zacznij od zainstalowania paczek `redux` i `react-redux`:

```
npm install --save react-redux redux
```

Praca z Reduksem składa się z 3 kroków:

1. Stworzenie **store**
2. Zdefiniowanie **akcji**
3. Napisanie **reducerów**

<p class="important">To co mnie bardzo przytłaczało na początku pracy z Reduksem to ilość kodu, który musiałem napisać, a który „nic nie robił”. Nie martw się jednak! To tylko pozory. Im bardziej rozbudowana stanie się Twoja aplikacja tym tego kodu jest mniej, a zalety posiadania spójnego stanu są nieocenione.</p>

## Store w React

**Store przechowuje stan całej Twojej aplikacji.** Stwórz plik `store.js`, a w nim tylko kilka linii kodu:

```javascript
import { createStore } from 'redux';
import reducers from './reducers';

export const store = createStore(reducers);
```

Następnie musisz sprawić, aby React mógł z tego store'a korzystać. Podstawowym sposobem na to jest zmodyfikowanie Twojego kodu w `index.js` i użycie **komponentu `<Provider>`**. Do tego komponentu musisz przekazać props `store`:

```javascript
import { store } from './store';
import { Provider } from 'react-redux';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
```

## Akcje w Redux

**Akcje reprezentują zmiany stanu aplikacji.** Użycie akcji to jedyny sposób na zmianę czegokolwiek w storze. Potrzebna Ci będzie (na razie) tylko jedna akcja reprezentująca nadejście danych z API. Nazwijmy ją `FETCH_CONTACTS_SUCCESS`.

Stwórz folder `actions` a w nim plik `index.js`. Umieścisz w nim funkcje zwracające akcje dla zadanych argumentów (**action creators**). Na razie jest tylko jeden action creator:

```javascript
export const contactsFetched = (contacts) => ({
  type: 'FETCH_CONTACTS_SUCCESS',
  contacts,
});
```

## Reducery w Redux

**Reducer to funkcja, która przyjmuje stan aplikacji oraz akcję i na tej podstawie generuje nowy, zaktualizowany stan.** Nasz reducer nazwiemy `contacts`. A więc w folderze `reducers` stwórz plik `contacts.js`:

```javascript
export const contacts = (state = [], action) => {
  // (1)
  switch (
    action.type // (2)
  ) {
    case 'FETCH_CONTACTS_SUCCESS':
      return [...action.contacts];
    default:
      return state;
  }
};
```

A CO TU SIĘ WYDARZYŁO? Spokojnie, powoli ;)
Reducer to nic innego jak funkcja, która przyjmuje obecny stan i akcję (1). Następnie sprawdza jaka to akcja (2). Jeśli jest to `FETCH_CONTACTS_SUCCESS` to oznacza, że mamy nową listę kontaktów i możemy cały obecny stan nią właśnie zastąpić. **W każdym innym przypadku — zwracamy stan bez zmian**.

### `combineReducers`

Jak teraz powiedzieć reduksowi, aby użył Twojego reducera? Ponieważ reducerów może być wiele w aplikacji (a każdy z nich może operować na wycinku stanu), musisz je jakoś połączyć. Służy do tego funkcja `combineReducers`. Do folderu `reducers` dodaj plik `index.js`:

```javascript
import { combineReducers } from 'redux';
import { contacts } from './contacts';

export default combineReducers({
  contacts,
});
```

## Połączenie Redux + React

Uff, to było skomplikowane. Szczęśliwie, to tylko troszkę boilerplate'u, a sama praca z Reduksem dalej jest już bardzo przyjemna!

Co teraz? **Podłączamy aplikację do Reduksa**! Jak? Używając funkcji `connect`.

Plan jest taki: „Udekorujesz” komponent `App` dzięki funkcji `connect` (jest to HoC, o którym będę pisał później). `connect` jako argumenty przyjmuje dwie funkcje zwyczajowo nazywane `mapStateToProps` i `mapDispatchToProps`

- `mapStateToProps` — jako argument przyjmuje cały stan i musi zwrócić propsy dla danego komponentu
- `mapDispatchToProps` — jako argument przyjmuje funkcję lub obiekt z action creatorami

## `connect`

Kilka linii kodu wyraża więcej niż tysiąc słów:

```jsx
import { connect } from 'react-redux';
import { contactsFetched } from './actions';

const mapStateToProps = (state) => {
  return {
    contacts: state.contacts, // (1)
  };
};
const mapDispatchToProps = { contactsFetched }; // (2)

export const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App); // (3)
```

W `mapStateToProps` zwracam interesujący mnie fragment stanu. Pamiętaj, że `state` w prawdziwej aplikacji może mieć kilka…dziesiąt własności. Mój komponent potrzebuje tylko `contacts`, więc **tylko tyle mu przekazuję** (1).

Dalej `mapDispatchToProps` definiuję jako obiekt z jednym action creatorem (2).

I ostatecznie eksportuję nowy komponent `AppContainer`, który powstaje w wyniku wywołania funkcji `connect` (3).

Pozostaje tylko użyć już nowo powstałego komponentu. W index.js zamiast `<App />` używam `<AppContainer />`.

## Nic się nie zmieniło

Zaiste. Nic się nie zmieniło, bo jeszcze nie użyłem nidzie _action creatora_ (nadążasz?). Usuwam `state` z komponentu `App` i zamiast tego polegam tylko na action creatorach i storze:

```jsx
class App extends React.Component {
  componentDidMount() {
    fetch('https://randomuser.me/api/?format=json&results=10')
      .then((res) => res.json())
      .then((json) => this.props.contactsFetched(json.results)); // (1)
  }

  render() {
    return (
      <div>
        <AppHeader />
        <main className="ui main text container">
          <ContactsList contacts={this.props.contacts} /> {/* (2) */}
        </main>
      </div>
    );
  }
}
```

Jak widzisz, zamiast `setState` używam `this.props.contactsFetched` (1). A do komponentu `ContactsList` przekazuję `this.props.contacts` (2).
Cały kod źródłowy tutaj: [github.com/mmiszy/typeofweb-kurs-react/tree/contacts-list-2-redux](https://github.com/mmiszy/typeofweb-kurs-react/tree/contacts-list-2-redux)

<p class="important">Przedstawiony tutaj sposób na pracę z asynchronicznymi funkcjami i Reduksem jest najprostszym z możliwych. W kolejnych wpisach przedstawię inne metody obsługi *asynchroniczności w Redux*.</p>

## Podsumowanie

Czujesz się podtopiona/y? Taki był zamiar. Napisaliśmy mnóstwo kodu, a efekt jest taki sam, jak wcześniej (a nawet gorszy!). Po co to wszystko?
Szczęśliwie ten boilerplate pisze się tylko raz. A rozbudowa tej aplikacji będzie teraz znacznie prostsza! **Zobaczysz sam(a) w kolejnym wpisie** :) <a href="https://szkolenia.typeofweb.com/" target="_blank">zapisz się na szkolenie z React i Redux</a>.

Jeśli chcesz na bieżąco dowiadywać się o kolejnych częściach kursu React.js to koniecznie <strong>śledź mnie na Facebooku i zapisz się na newsletter.</strong>
<NewsletterForm />
<FacebookPageWidget />

## Ćwiczenie

**Ćwiczenie:** Dodaj do aplikacji napis „Ładowanie” w trakcie pobierania danych z API. Nie używaj `.length` ;)
Hint: Dodaj nową własność w storze, która będzie przechowywała informację o tym czy trwa pobieranie.
