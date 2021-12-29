---
title: 'React Hooks: Piszemy własne hooki!'
date: 2020-06-10T11:07:22.000Z
isMarkdown: true
status: publish
permalink: react-hooks-wlasne-hooki
authors:
  - michal-miszczyszyn
type: post
thumbnail:
  url: >-
    /assets/wp-content/uploads/2020/06/react-hooks-wlasne-hooki.png
  width: 1688
  height: 780
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
    Tworzenie własnych hooków w React jest niezwykle proste. Pokazuję, jak
    działają useDocumentTitle, usePrevious oraz useApi!
---

Niewątpliwą zaletą React Hooks jest to, jak łatwo możemy wydzielać fragmenty logiki do własnych hooków. W tym artykule pokazuję Ci, jak napisać swoje hooki, jakie obowiązują zasady i jak sprawić, aby Twój kod był lepszy!

---

## Własny React Hook

Przy tworzeniu własny hooków obowiązują nas te same reguły, co tych wbudowanych: **nazwa każdego hooka musi zaczynać się od "use"**. Hook jest zwykłą funkcją, a w środku niej możemy wywoływać inne funkcje! Dzięki temu kompozycja wielu hooków staje się bajecznie prosta i nie wymaga żadnych skomplikowanych technik. To tylko zwykłe funkcje.

## useDocumentTitle

Zacznijmy od czegoś prostego: Hook, który zmienia tytuł strony na podany. Dla przypomnienia, w [artykule na temat `useEffect`](https://typeofweb.com/react-hooks-useeffect-efekty-uboczne-w-komponencie/) zaimplementowaliśmy to w ten sposób:

```ts
useEffect(() => {
  document.title = `Nowy tytuł!`;
});
```

Jest to bardzo prosta, żeby nie powiedzieć naiwna implementacja, ale na pewno spełnia swoje zadanie. Jak stworzyć z niej własny hook? O tak:

```ts
const useDocumentTitle = (title) => {
  useEffect(() => {
    document.title = title;
  }, [title]);
};
```

Następnie w komponencie użyjemy go w taki sposób:

```ts
useDocumentTitle('Mój tytuł');
```

Łał, to było proste, no nie? Stworzyliśmy zwykłą funkcję, w której wywołujemy hook i to tyle.

Dodajmy coś jeszcze, np. przywracanie oryginalnego tytułu, gdy komponent jest odmontowywany:

```ts
const useDocumentTitle = (title) => {
  const defaultTitle = useRef(document.title); // 1

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    // 2
    return () => {
      document.title = defaultTitle.current;
    };
  }, []);
};
```

Tutaj w linijce oznaczonej numerem 1 zapisujemy istniejący `document.title` do refa. Następnie w drugim `useEffect` zwracamy funkcję, która zostanie wywołana tylko przy odmontowywaniu komponentu i ustawiamy w niej `document.title` na oryginalną wartość zapisaną w refie.

## usePrevious

Czasem potrzebne nam informacje o **poprzedniej** wartości danego propsa. O ile w klasach nie było z tym problemu, tak w komponentach funkcyjnych musimy zadbać o to już sami:

```ts
const usePrevious = (value) => {
  const ref = useRef(); // 1

  useEffect(() => {
    ref.current = value; // 3
  }, [value]);

  return ref.current; // 2
};
```

W tym przypadku tworzymy pusty ref (1), zwracamy **poprzednią** wartość (2), a następnie zapisujemy do refa nową(3). Dzieje się tak dlatego, że `useEffect` uruchamia się asynchronicznie.

Najczęściej jednak zamiast używać `usePrevious`, możemy ten sam problem rozwiązać inaczej i prościej, np. poprzez dodanie danego propsa do tablicy zależności `useEffect`. Wtedy React sam za nas porówna starą i nową wartość!

## useApi

A gdyby tak… w hooku zamknąć pobieranie danych z API? To proste! Weźmy kod podobny do tego z [artykułu o Hookach i API](https://typeofweb.com/react-hooks-a-zadania-do-api/) i zamieńmy na własny hook, którego będziemy mogli używać w wielu miejscach w naszej aplikacji. Pierwsze podejście wygląda tak:

```ts
const useApi = (path) => {
  const [response, setResponse] = useState({ data: null, isLoading: true, error: null });

  useEffect(() => {
    setResponse({ data: null, isLoading: true, error: null });
    fetch('https://rickandmortyapi.com/api/' + path)
      .then((res) => res.json())
      .then((data) => setResponse({ data, isLoading: false, error: null }))
      .catch((error) => setResponse({ data: null, isLoading: false, error }));
  }, [path, setResponse]);

  return response;
};
```

Nie jest to jeszcze zbyt piękne, ale działa całkiem nieźle:

```jsx
function App() {
  const [page, setPage] = React.useState(10);
  const { data, isLoading } = useApi(`character/?page=${page}`);

  return (
    <>
      {isLoading && 'Loading…'}
      <button onClick={() => setPage((p) => p + 1)}>Next</button>
      <ul>
        {data?.results.map((character) => (
          <li key={character.id}>{character.name}</li>
        ))}
      </ul>
    </>
  );
}
```

Naszego hooka możemy poprawić na dwa sposoby. Po pierwsze, pozbyć się z niego logiki odpowiedzialnej za pobieranie danych z API – tzn. jest to coś całkowicie niezależnego od Reacta. Chcemy wywołać tylko `getData(…)` i tyle, a nie martwić się o jakieś `res.json()` i inne podobne historie. Przykładowo (upraszczając):

```ts
const doFetch = async (path) => {
  const res = await fetch('https://rickandmortyapi.com/api/' + path);
  if (res.ok) {
    return res.json();
  }
  throw await res.json();
};
```

Drugą poprawką będzie [użycie `useReducer`](https://typeofweb.com/usereducer-przenoszenie-logiki-poza-komponent/), aby pozbyć się nadmiaru kodu z samego useEffect:

```ts
const apiReducer = (state, action) => {
  switch (action.type) {
    case 'FETCHING':
      return { data: null, isLoading: true, error: null };
    case 'SUCCESS':
      return { data: action.payload, isLoading: false, error: null };
    case 'ERROR':
      return { data: null, isLoading: false, error: action.payload };
  }
  return state;
};

const useApi = (path) => {
  const [response, dispatch] = useReducer(apiReducer, { data: null, isLoading: false, error: null });

  useEffect(() => {
    dispatch({ type: 'FETCHING' });
    doFetch(path)
      .then((data) => dispatch({ type: 'SUCCESS', payload: data }))
      .catch((error) => dispatch({ type: 'ERROR', payload: error }));
  }, [path]);

  return response;
};
```

Kod jest znacznie dłuższy, ale wydaje mi się też bardziej czytelny, bo oddzielone zostały od siebie elementy niezależnej logiki. Efekt:

<CodepenWidget height="485" themeId="light" slugHash="LYpaaPN" defaultTab="js,result" user="mmiszy" penTitle="React Hooks: Własny hook useApi">
<a href="http://codepen.io/mmiszy/pen/LYpaaPN/">Zobacz Codepen React Hooks: Własny hook useApi</a>.
</CodepenWidget>

## Podsumowanie

To tylko kilka podstawowych hooków, zachęcam do tworzenia własnych. To mega proste :) **Pochwal się w komentarzu, jakie inne ciekawe hooki znasz!**

Jeśli chcesz na bieżąco dowiadywać się o kolejnych częściach kursu React.js to koniecznie <strong>śledź mnie na Facebooku i zapisz się na newsletter.</strong>
<NewsletterForm />
<FacebookPageWidget />
