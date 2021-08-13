---
index: 62
title: 'Odpowiadam na pytania: Babel, ECMAScript, destrukturyzacja, onClick, className'
date: 2018-02-21T18:41:32.000Z
isMarkdown: true
status: publish
permalink: odpowiadam-na-pytania-babel-ecmascript-destrukturyzacja-onclick-classname
authors:
  - michal-miszczyszyn
type: post
thumbnail:
  url: https://res.cloudinary.com/type-of-web/wp-content/uploads/2018/02/pexels-photo-332835.jpeg
  width: 1920
  height: 1040
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
    W komentarzach na blogu i na Facebooku pojawiło się całe mnóstwo różnych
    pytań do mnie. Super! Staram się odpowiadać na nie na biężąco. Ale teraz
    postanowiłem też zebrać je w jednym miejscu wraz z odpowiedziami — i
    stworzyć swego rodzaju kompendium wiedzy ;) Jeśli masz jakieś pytania to
    pisz!
---

W komentarzach na blogu i na Facebooku pojawiło się całe mnóstwo różnych pytań do mnie. Super! Staram się odpowiadać na nie na biężąco. Ale teraz postanowiłem też zebrać je w jednym miejscu wraz z odpowiedziami — i stworzyć swego rodzaju kompendium wiedzy ;) **Jeśli masz jakieś pytania to pisz!** Odpowiem na nie w jednym z kolejnych wpisów.
{/_ more _/}

## Wasze pytania i odpowiedzi

### Babel — co on tak naprawdę robi? Myślałem, że kompiluje tylko ES6, a Ty napisałeś, że ES2017? O co w tym wszystkim chodzi?

Zacznijmy może od usystematyzowania nazewnictwa standardu ECMAScript — ES6 to to samo ES2015. Teraz rokrocznie wydawana jest nowa wersja ECMAScript, dlatego miało sens przejście na taką systematykę nazw. Aktualna „zamrożona” wersja ES to ES2018 — a więc w międzyczasie wyszły ES2015, ES2016, ES2017 i ES2018.

Babel to uniwersalny transpiler. Z dodatkiem odpowiednich wtyczek, presetów, parserów… w zasadzie mógłby pewnie kompilować cokolwiek ;) Możesz więc kompilować nim dowolne elementy kolejnych wersji ES (a nawet więcej!).

Aktualnie [`create-react-app` domyślnie wspiera w Babelu następujące elementy ES](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#supported-language-features-and-polyfills):

- Exponentiation Operator (ES2016)
- Async/await (ES2017)
- Object Rest/Spread Properties (stage 3 proposal)
- Dynamic import() (stage 3 proposal)
- Class Fields and Static Properties (part of stage 3 proposal)
- JSX & Flow

### Używasz destrukturyzacji, a w wielu innych tutorialach tego nie ma… Są jakieś wady/zalety destrukturyzacji propsów?

Mówimy tutaj o składni, której używam często w swoich wpisach:

```jsx
const MyComponent = ({ login, name }) => { // chodzi o { login, name }
  return (…);
};
```

Chodzi konkretnie o ten fragment: `({ login, name })`. Co to oznacza? Jest to tak zwana destrukturyzacja (_destructuring_). Jest to zapis równoważny następującemu:

```jsx
const MyComponent = (props) => {
  const login = props.login;
  const name = props.name;
  return (…);
};
```

lub, znowu używają destrukturyzacji, ale w innym miejscu:

```jsx
const MyComponent = (props) => {
  const { login, name } = props;
  return (…);
};
```

Jest to niesamowite ułatwienie, szczególnie przy tworzeniu komponentów funkcyjnych — od razu odwołuję się po nazwie do odpowiednich propsów.

### Czy do `onClick` można przekazać dwie funkcje? Jak to zrobić?

Można. Ale nie polecam. Prościej, lepiej i ładniej jest przekazywać tam tylko jedną funkcję :) Jeśli w reakcji na zdarzenie (np. kliknięcie) potrzebujesz wywołać dwie funkcje to… stwórz trzecią funkcję i w niej wywołaj te dwie ;)

```jsx
class MyComponent extends React.Component {
  onButtonClick = () => {
    this.firstFunction();
    this.secondFunction();
  };

  firstFunction = () => { … };

  secondFunction = () => { … };

  render() {
    return (
      <button onClick={this.onButtonClick}></button>
    );
  }
}
```

### Czemu w JSX jest `className` a nie po prostu `class`?

Głównie ze względów historycznych, ale też częściowo praktycznych :)

Po pierwsze, początkowo React starał się odwzorowywać **własności** HTML (_properties_, a nie _attributes_). A własność nazywa się właśnie `el.className`.

Po drugie, destrukturyzacja własności o nazwie `class` jest znacznie trudniejsza, bo to słowo zarezerwowane:

```jsx
const { className } = props; // działa
const { class } = props; // nie działa
```

Zresztą `className` to nie jedyny przypadek gdy nazwa w JSX odbiega od HTML. **Warto pamiętać też o `for`**. W JSX jest to `htmlFor`:

```jsx
<label htmlFor="some-id">Label</label> // `htmlFor` w JSX!
```

## Masz pytanie?

To by było na tyle w pierwszej części pytań i odpowiedzi. <a href="https://szkolenia.typeofweb.com/" target="_blank">zapisz się na szkolenie z React</a>. Jeśli masz jakieś dodatkowe pytania — nawet te najprostsze — **śmiało zadawaj je w komentarzach pod wpisami** :) Będę je zbierał i publikował wraz z odpowiedziami.
