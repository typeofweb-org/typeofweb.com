---
title: Leniwe ładowanie komponentów w React dzięki import
date: 2018-06-04T11:05:42.000Z
isMarkdown: true
status: publish
permalink: leniwe-ladowanie-komponentow-w-react-dzieki-import
authors:
  - michal-miszczyszyn
type: post
thumbnail:
  url: https://res.cloudinary.com/type-of-web/wp-content/uploads/2018/04/pexels-photo-417122.jpeg
  width: 1280
  height: 568
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
    Czy w React da się ładować komponenty leniwie? A więc masz już sporą
    aplikację. Chcesz ją jakoś zoptymalizować. Do głowy przychodzi Ci,
    oczywiście, podział jej na kilka części, które będą ładowane na żądanie,
    dopiero gdy będą potrzebne — tzw. lazy load. Z pomocą przychodzi operator
    import(…) — po prostu!
---

Czy w React da się ładować komponenty leniwie? A więc masz już sporą aplikację. Chcesz ją jakoś zoptymalizować. Do głowy przychodzi Ci, oczywiście, podział jej na kilka części, które będą ładowane na żądanie, dopiero gdy będą potrzebne — tzw. _lazy load_. Z pomocą przychodzi operator `import(…)` — po prostu!

## Operator `import(…)`

Składni `import something from 'something'` używasz na pewno codziennie. W skrócie, powoduje ona, że dana zależność ładowana jest zanim reszta kodu zostanie uruchomiona. W praktyce, jeśli używasz webpacka, cały kod łączony jest w jeden plik (lub kilka) i moduły ładują się synchronicznie.

Ale `import` to także operator, który można użyć w sposób podobny do funkcji: `import(…)`. Służy on do **dynamicznego ładowania modułów** na żądanie. **Leniwie**. I zwraca `Promise`. Brzmi dobrze?

## Leniwy komponent React

A więc zastanów się jak można by użyć tego operatora do leniwego ładowania komponentów w React:

- Komponent musi się ładować na żądanie, dopiero gdy będzie miał być wyświetlony.
- Mogę stworzyć komponent (np. `AsyncComponent`), który jako prop przyjmie funkcję ładującą komponent, i wyświetli gdy będzie taka potrzeba.
- Użyję do tego metody `componentDidMount` oraz `setState` i operatora `import(…)`

Tak mniej-więcej wyglądał mój proces myślowy ;) Do dzieła!

## Asynchroniczny komponent

Robię dokładnie to, co napisałem. Tworzę komponent, który po wyświetleniu wywoła przekazaną funkcję (która załaduje komponent) i go wyświetli, gdy już będzie gotowy:

```jsx
export class AsyncComponent extends React.Component {
  state = { Component: null, isLoading: false }; // (1)

  componentDidMount() {
    if (!this.state.Component && !this.state.isLoading) {
      // (2)
      this.setState({ isLoading: true }, this.loadComponent); // (3)
    }
  }
}
```

Początkowy stan (1) — komponentu nie ma, ładowanie się jeszcze nie rozpoczęło. Następnie w `componentDidMount`, o ile jeszcze nie ma komponentu i nie jest on właśnie ładowany (2), ustawiam `isLoading` na `true` i ładuję komponent. Jak wygląda `this.loadComponent`?

```jsx
loadComponent = () => {
  this.props.componentProvider().then((Component) => {
    // (4)
    this.setState({ Component, isLoading: false }); // (5)
  });
};
```

Wywołuję przekazaną funkcję (4), a gdy komponent się załaduje to ustawiam go w `state` (5). Pozostaje tylko render:

```jsx
render() {
  const { Component } = this.state;
  if (Component) {
    return <Component />;
  }
  return null;
}
```

I już!

## Operator `import(…)`

Nowego komponentu używam w taki sposób, z operatorem `import()`:

```jsx
<AsyncComponent
  componentProvider={() => import('./AnotherComponent').then((module) => module.AnotherComponent) /* (6) */}
/>
```

Tutaj tkwi cała magia (6). Operator `import(…)` załaduje moduł przekazany jako argument i zwróci Promise z tym modułem!

## Dodatkowe propsy

Okej, a co jeśli chcesz przekazać do `AnotherComponent` jakieś propsy? To prostsze niż się wydaje! Dodaj do `AsyncComponent` nowy props, np. o nazwie `componentProps` (7) i użyj operator _spread_ (8):

```jsx
const componentProps = { props: 'lalala', anotherValue: 123 };
<AsyncComponent
  componentProps={componentProps} /* (7) */
  componentProvider={() => import('./AnotherComponent').then((module) => module.AnotherComponent)}
/>;
```

A w samym `AsyncComponent` zmieniam tylko metodę `render`:

```jsx
render() {
  const { Component } = this.state;
  if (Component) {
    return <Component {...this.props.componentProps} />; /* (8) */
  }
  return null;
}
```

## Efekt

Jeśli teraz zajrzysz do zakładki Network to zobaczysz tam dodatkowe żądanie — np. o nazwie `1.chunk.js`. To właśnie to!

<a href="https://res.cloudinary.com/type-of-web/wp-content/uploads/2018/04/Screen-Shot-2018-04-23-at-8.46.42-PM.png"><img src="https://res.cloudinary.com/type-of-web/wp-content/uploads/2018/04/Screen-Shot-2018-04-23-at-8.46.42-PM.png" alt="Lazy load komponentów React" title="Leniwe ładowanie komponentu w React" width="832" height="118" class="aligncenter size-full wp-image-1465" /></a>

Cały kod znajdziesz na GitHubie: [github.com/mmiszy/typeofweb-kurs-react/tree/contacts-list-5-async](https://github.com/mmiszy/typeofweb-kurs-react/tree/contacts-list-5-async)

## Podsumowanie

Tajemna wiedza, którą Ci tutaj przekazałem przyda Ci się w bardziej rozbudowanych aplikacjach. Wyobraź sobie na przykład, że Twoje komponenty są leniwie doładowywane gdy zmienia się adres strony — pobierane jest to, co akurat się przyda. Brzmi jak marzenie? ;) <a href="https://szkolenia.typeofweb.com/" target="_blank">zapisz się na szkolenie z React</a>.

Jeśli chcesz na bieżąco dowiadywać się o kolejnych częściach kursu React.js to koniecznie <strong>śledź mnie na Facebooku i zapisz się na newsletter.</strong>
<NewsletterForm />
<FacebookPageWidget />

## Ćwiczenie

**Ćwiczenie**: Zrefaktoruj `App.jsx` z poprzedniej części tak, aby komponent `ContactsList` był ładowany tylko jeśli kontakty są załadowane i jest więcej niż 0 (`this.props.contacts`).
