---
index: 88
title: Higher Order Reducers — Redux i powtarzanie kodu
date: 2018-06-28T09:08:28.000Z
isMarkdown: true
status: publish
permalink: higher-order-reducers-redux-i-powtarzanie-kodu
authors:
  - michal-miszczyszyn
type: post
thumbnail:
  url: https://res.cloudinary.com/type-of-web/wp-content/uploads/2018/06/pexels-photo-446280.jpeg
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
  title: '%%title%% %%page%% %%sep%% %%sitename%%'
  metadesc: "Higher Order Reducers — co to takiego? Pokazuję jak używać Higher Order Reducers z biblioteką\_Redux, aby ułatwić sobie tworzenie akcji i reducerów!"
---

Higher Order Reducers — co to takiego? Gdy popracujesz dłużej z Reduksem to na pewno zauważysz pewne powtarzalne wzorce. Napisanie akcji i reducerów do obsługi API to konieczność powtórzenia bardzo podobnego kodu kilka, kilkanaście razy! Czy na pewno jest to konieczne? Z pomocą przychodzą właśnie _Higher Order Reducers_ i kompozycja.

{/_ more _/}

## Definicja Higher Order Reducer

<p class="important">Higher Order Reducer to funkcja, która zwraca reducer i (opcjonalnie) przyjmuje reducer jako argument.</p>

Brzmi zrozumiale? Proste HOR są… proste ;) Ale koncept jest bardziej rozbudowany niż się może początkowo wydawać, szczególnie jeśli weźmiemy pod uwagę kompozycję!

## Zastosowanie

Weźmy sobie jako przykład operowanie na API. Pobieranie danych z endpointa. Musisz obsłużyć takie akcje:

- pobieranie rozpoczęte
- pobieranie zakończone sukcesem (dane)
- błąd pobierania (błąd)

W podstawowej wersji wygląda to tak jak poniżej. Action Creatory:

```js
const dataFetchStarted = () => ({
  type: "FETCH_DATA_STARTED"
});

const dataFetchSucceeded = data => ({
  type: "FETCH_DATA_SUCCESS",
  payload: data
});

const dataFetchErrored = error => ({
  type: "FETCH_DATA_ERROR',
  payload: error
});
```

I do tego reducer:

```js
const data = (state = { data: null, isLoading: false, error: null }, action) => {
  switch (action) {
    case 'FETCH_DATA_STARTED':
      return { data: null, isLoading: true, error: null };
    case 'FETCH_DATA_SUCCESS':
      return { data: action.payload, isLoading: false, error: null };
    case 'FETCH_DATA_ERROR':
      return { data: null, isLoading: false, error: action.payload };
    default:
      return state;
  }
};
```

Natomiast sama akcja asynchroniczna (redux-thunk), która pobierze dane wygląda tak:

```js
export const fetchData = () => (dispatch, getState) => {
  dispatch(dataFetchStarted());
  fetch("endpoint")
    .then(res => res.json())
    .then(json => dispatch(dataFetchSucceeded(json.results)));
    .catch(err => dispatch(dataFetchErrored(err)));
};
```

## Problem

A teraz wyobraź sobie, że dane musisz pobierać, w bardzo podobny sposób, z 2, 3, 4… 10 endpointów. Czy to oznacza, że dla każdego z nich musisz zrobić kopiuj, wklej, znajdź i zamień na powyższym kodzie? Słabo…

Ale jest rozwiązanie: **Higher Order Reducer**

## Rozwiązanie

Jak już wspomniałem, higher order reducer to taka funkcja, która zwraca reducer. W ten sposób możemy reducery tworzyć całkowicie dynamicznie. Na przykład tak:

```js
const asyncReducerFactory = (name) => {
  return (state = { data: null, isLoading: false, error: null }, action) => {
    switch (action.type) {
      case `FETCH_${name}_STARTED`:
        return { data: null, isLoading: true, error: null };
      case `FETCH_${name}_SUCCESS`:
        return { data: action.payload, isLoading: false, error: null };
      case `FETCH_${name}_ERROR`:
        return { data: null, isLoading: false, error: action.payload };
      default:
        return state;
    }
  };
};
```

Jest to funkcja, która przyjmuje tylko nazwę i zwraca reducer. Nazwy akcji są tworzone dynamicznie — na podstawie podanego argumentu `name`.

Jak jej użyć? Zamiast całego poprzedniego reducera napisałbym teraz tylko:

```js
const data = asyncReducerFactory('DATA');
```

A jeśli chciałbym stworzyć reducer dla pobierania kontaktów? Nic prostszego:

```js
const contacts = asyncReducerFactory('CONTACTS');
```

I tak dalej. Kolejne użycia nie wymagają pisania więcej boilerplate'u.

## Higher Order Action Creator

No, ale nadal mam sporo boilerplate'u, prawda? Na szczęście _action creator_ też mogę generować dynamicznie:

```js
const asyncActionCreatorFactory = (name, thunk) => () => {
  return (dispatch) => {
    dispatch({ type: `FETCH_${name}_STARTED` });

    return dispatch(thunk)
      .then((data) => data.json())
      .then((json) => dispatch({ type: `FETCH_${name}_SUCCESS`, payload: json }))
      .catch((err) => dispatch({ type: `FETCH_${name}_ERROR`, payload: err }));
  };
};
```

Ponownie — na podstawie `name` generuję nazwy akcji. `thunk` to pewna asynchroniczna akcja, która (zakładam) wywołuje `fetch` i zwraca Promise.

Jak tego używam?

```js
const fetchContacts = asyncActionCreatorFactory('DATA', (dispatch, getState) => {
  return fetch('endpoint');
});
```

A dla kontaktów?

```js
const fetchContacts = asyncActionCreatorFactory('CONTACTS', (dispatch, getState) => {
  return fetch('https://randomuser.me/api/?format=json&results=10&seed=' + encodeURIComponent(getState().seed));
});
```

Tutaj dodatkowo „przemyciłem” parametr pochodzący z `getState` — tak samo jak we wpisie o redux-thunk.

## Podsumowanie

W taki sposób, korzystając z funkcji wyższego rzędu, można uprościć wiele rzeczy w React i Redux. Tworzenie reducerów, action creatorów, a nawet komponentów! Mam nadzieję, że będziesz już potrafiła szybko stworzyć następne akcje i reducery dla kolejnych endpointów Twojego API! <a href="https://szkolenia.typeofweb.com/" target="_blank">zapisz się na szkolenie z React</a>.

Jeśli chcesz na bieżąco dowiadywać się o kolejnych częściach kursu React.js to koniecznie <strong>śledź mnie na Facebooku i zapisz się na newsletter.</strong>
<NewsletterForm />
<FacebookPageWidget />

## Ćwiczenie

**Ćwiczenie:** Zrefaktoruj kod z naszą listą kontaktów tak, aby skorzystać z napisanych w tym wpisie funkcji. Kod znajdziesz tutaj: [github.com/mmiszy/typeofweb-kurs-react/tree/contacts-list-4-redux](https://github.com/mmiszy/typeofweb-kurs-react/tree/contacts-list-4-redux)
