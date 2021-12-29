---
title: 'React Hooks: useState — wiele stanów, callbacki i inne niuanse'
date: 2019-02-15T12:03:18.000Z
isMarkdown: true
status: publish
permalink: react-hooks-usestate-wiele-stanow-callbacki-i-inne-niuanse
authors:
  - michal-miszczyszyn
type: post
thumbnail:
  url: /assets/wp-content/uploads/2019/02/pexels-photo-911254.jpeg
  width: 1920
  height: 1022
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
    React.useState. Dalsza część o React Hooks. Wiele stanów w komponencie
    funkcyjnym? Funkcja zmieniająca stan? Tak, to wszystko w Hooku useState w
    React!
---

W poprzednim wpisie omówiłem wstępnie React Hook useState. Pod postem na blogu oraz na Facebooku pojawiło się wiele komentarzy z pytaniami. Chciałbym odpowiedzieć na nie i wyjaśnić kilka niuansów tutaj. Jak to jest z rozbudowanym stanem? Czy można wywoływać `useState` w jednym komponencie wiele razy? I jak budować stan w oparciu o istniejący? To wszystko w tym wpisie.

---

## setState przyjmuje funkcję lub stan

W poprzednim przykładzie pokazywałem tylko najprostsze wywołanie `useState` i funkcji zmieniającej stan:

```jsx
function App() {
  const [counter, setCounter] = React.useState(0);

  return (
    <div>
      {counter}
      <button onClick={() => setCounter(counter + 1)}>+</button>
    </div>
  );
}
```

Sporo kodu, ale skup się na tym fragmencie: `setCounter(counter + 1)`. Ustawiam tutaj nowy stan używając poprzedniego stanu. Mogę też jednak zrobić to nieco inaczej i przekazać do `setCounter` funkcję:

```jsx
setCounter((counter) => counter + 1);
```

W ten sposób sprawiłem, że sama zmiana stanu stała się całkowicie niezależna od stałych (i zmiennych) znajdujących się w danym zasięgu. Dodatkowo daje to tę przewagę, że **taką funkcję można łatwiej przenieść poza komponent**!

## useState nadpisuje stan

W odróżnieniu od `this.setState(…)` w klasach, `useState` **nadpisuje cały stan** podaną wartością. Dla przypomnienia: `this.setState(…)` łączy podaną wartość z istniejącym stanem. Jest to zupełnie inne zachowanie i trzeba na nie zwrócić uwagę:

```jsx
// wewnątrz klasy
state = { a: 1 };

// …

this.setState({ b: 2 });
// `this.state` teraz to { a: 1, b : 2 }
```

Porównaj to z zachowaniem `useState`:

```jsx
function MyComponent() {
  const [state, setState] = React.useState({ a: 1 });

  // …
  setState({ b: 2 });
  // `state` teraz to { b: 2 }
}
```

Można by się pokusić o użycie formy funkcyjnej `setState` i ręczne połączenie starych wartości z nowymi:

```jsx
setState((state) => ({ ...state, b: 2 }));
// `state` to teraz { a: 1, b: 2 }
```

**Ale nie zalecam takiego rozwiązania**. Zamiast tego…

## `useState` można wywołać wiele razy

W klasycznym podejściu, w klasach, `this.state` przechowywało cały stan danego komponentu. W przypadku Hooków można to zrobić inaczej! `useState` możesz wywołać wiele razy:

```jsx
function MyComponent() {
  const [counter, setCounter] = React.useState(0);
  const [position, setPosition] = React.useState('top');

  // …
}
```

W ten sposób w jednym „stanie” trzymam **tylko rzeczy dotyczące jednego konceptu**. Nie muszę mieszać wszystkiego ze sobą w wielkim `this.state`. Ponadto, ogromną zaletą tego rozwiązania jest to, że takie kawałki stanu mogę sobie łatwo wydzielić do **własnych Hooków**. Jak to zrobić? O tym w jednym z kolejnych wpisów.

Alternatywą dla przechowywania rozbudowanego stanu jest też Hook `useReducer`. O nim również nieco później.

## Stan początkowy może być funkcją

`React.useState(…)` jako argument przyjmuje stan początkowy. Możesz też podać tam funkcję, aby uzyskać specjalne zachowanie. Taka **funkcja będzie wywołana tylko raz, przy zamontowaniu komponentu, a jako stan początkowy zostanie ustawiona zwrócona przez nią wartość**.

```jsx
function MyComponent(props) {
  const [state, setState] = React.useState(() => {
    return calculations(props);
  });
}
```

W jakim przypadku ma sens tak skomplikowany zapis? **Wtedy, gdy funkcja `calculations` jest skomplikowana, a jej wywołanie może zająć chwilę**. W takim wypadku nie ma sensu wywoływać jej przy każdym renderze, a zamiast tego możesz użyć dodatkowej funkcji przekazanej do Hooka `useState(…)`. W praktyce — **pewnie Ci się to zbyt często nie przyda**.

## Pytania?

<a href="https://szkolenia.typeofweb.com/" target="_blank">zapisz się na szkolenie z React</a>. Jeśli chcesz na bieżąco śledzić kolejne części kursu React.js to koniecznie <strong>polub mnie na Facebooku i zapisz się na newsletter.</strong>
<NewsletterForm />
<FacebookPageWidget />

## Podsumowanie

Omówiłem tutaj kilka niuansów związanych z Hookiem `useState` w Reakcie. Możesz mieć teraz wrażenie, że to strasznie skomplikowana sprawa, skoro stworzyłem o tym aż dwa wpisy. tak naprawdę jednak Hooki to znaczne uproszczenie dla istniejących obecnie API i na pewno przyjemnie będzie Ci się z nich korzystało.
