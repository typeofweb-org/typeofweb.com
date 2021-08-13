---
index: 107
title: "useReducer —\_przenoszenie logiki poza komponent"
date: 2019-05-07T15:16:31.000Z
isMarkdown: true
status: publish
permalink: usereducer-przenoszenie-logiki-poza-komponent
authors:
  - michal-miszczyszyn
type: post
thumbnail:
  url: >-
    https://res.cloudinary.com/type-of-web/wp-content/uploads/2019/05/blue-blue-sky-bright-1323732.jpg
  width: 1280
  height: 853
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

`useReducer` to alternatywa dla `useState`. Ale po co i kiedy jej używać? W skrócie: Gdy logika komponentu się rozrasta i chcemy oddzielić ją całkowicie od widoku. Zgodnie z dobrymi praktykami!

{/_ more _/}

## Użycie `useReducer`

`useReducer` i `useState` pełnią bardzo podobne role: Służą do ustawiania stanu komponentu. Robią to jednak w inny sposób. Przypominam: `useState` przyjmuje stan początkowy, a zwraca aktualny stan i funkcję do ustawiania stanu:

```js
const [count, setCount] = useState(0);
```

Więcej o tym doczytasz w artykule:

https://typeofweb.com/react-hooks-usestate-czyli-stan-w-komponentach-funkcyjnych/

Dla odmiany, `useReducer` jako argument przyjmuje **reducer** i stan początkowy, a zwraca stan oraz funkcję `dispatch`:

```js
const [count, dispatch] = useReducer(countReducer, 0);
```

[Jeśli znasz Reduksa](https://typeofweb.com/react-redux-kurs-wprowadzenie-i-podstawy/), to na pewno od razu kojarzysz ten koncept!

## Napiszmy reducer

Kontynuujmy przykład z prostym licznikiem. Tak, wiem, banały, ale od czegoś trzeba zacząć 🙄

```jsx
function countReducer(state, action) {
  switch (action.type) {
    case 'increment':
      return state + 1;
    case 'decrement':
      return state - 1;
  }
}

function App() {
  const [count, dispatch] = React.useReducer(countReducer, 0);

  return (
    <div>
      {counter}
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
    </div>
  );
}
```

Po kliknięciu w przyciski wysyłane są akcje: `increment` i `decrement`. Są one obsługiwane przez `countReducer`, który odpowiednio zwiększa lub zmniejsza licznik o 1.

<CodepenWidget height="485" themeId="light" slugHash="QRbpPa" defaultTab="js,result" user="mmiszy" penTitle="React Hooks: useReducer">
<a href="http://codepen.io/mmiszy/pen/QRbpPa/">Zobacz Codepen React Hooks: useReducer</a>.
</CodepenWidget>

## Pytania?

<a href="https://szkolenia.typeofweb.com/" target="_blank">zapisz się na szkolenie z React</a>. Jeśli chcesz na bieżąco śledzić kolejne części kursu React.js to koniecznie <strong>polub mnie na Facebooku i zapisz się na newsletter.</strong>
<NewsletterForm />
<FacebookPageWidget />

## Podsumowanie

`useReducer` jest dobrym zamiennikiem `useState` w sytuacjach, gdy potrzebujemy wymodelować **bardziej rozbudowane komponenty i ich stany**. Możliwość łatwego **wydzielenia reducera oraz testowania go jednostkowo** to wisienka na torcie. `useReducer` na pewno się przyda!
