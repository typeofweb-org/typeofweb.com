---
id: 2015
index: 111
title: >-
  useMemo, useCallback, czyli rozwiązanie problemów ze zmieniającymi się
  propsami
date: 2019-05-21T09:31:46.000Z
isMarkdown: true
status: publish
permalink: usememo-usecallback-czyli-rozwiazanie-problemow-ze-zmieniajacymi-sie-propsami
authors:
  - michal-miszczyszyn
guid: https://typeofweb.com/?p=2015
type: post
thumbnail:
  url: >-
    https://typeofweb.com/wp-content/uploads/2019/05/blue-blur-bright-1323594.jpg
  width: 1920
  height: 1279
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

Powszechnym zmartwieniem osób poznających komponenty funkcyjne jest tworzenie funkcji-callbacków przekazywanych dalej jako props. Wszak przy każdym renderze funkcja tworzona jest na nowo! Czy to aby nie marnotrastwo? Czy nie powoduje to problemów? React Hooks `useMemo` i `useCallback` przychodzą na ratunek!

{/_ more _/}

## Problem z funkcjami

Weźmy prosty komponent, w którym tworzony jest callback `handleClick` przekazywany jako props dalej:

```jsx
function MyComponent({ oneProp, anotherProp }) {
  function handleClick() {
    console.log('Clicked!', oneProp, anotherProp);
  }

  return <SpecialButton onClick={handleClick} />;
}
```

Gdy ja pierwszy raz zobaczyłem taki kod, miałem mnóstwo wątpliwości — Ale po co? Dlaczego? Jak to? Przecież to nie ma sensu! Chętnie odpowiem Ci na te pytania osobiście: <a href="https://szkolenia.typeofweb.com/" target="_blank">zapisz się na szkolenie z React</a>.

Przede wszystkim, tworzenie nowej funkcji `handleClick` za każdym razem, gdy renderowany jest komponent wydawało mi się barbarzyństwem. **Czy to aby nie ma tragicznego wpływu na wydajność?**

No i dodatkowo, tworzymy nową funkcję, więc jako props do komponentu `SpecialButton` przekazywana jest zawsze nowa referencja. Oznacza to, że zostanie on przerenderowany za każdym razem.

## Problemy z obiektami

Analogiczna sytuacja występuje, o czym wiele osób zdaje się nie myśleć, gdy w renderze tworzymy nowy obiekt:

```jsx
function MyComponent({ oneProp, anotherProp }) {
  const options = {
    data: oneProp,
    data2: anotherProp,
    // …
  };

  return <SpecialComponent options={options} />;
}
```

Za każdym razem `options` tworzone jest na nowo, i jest nową referencją. Po przekazaniu tego obiektu jako props do `SpecialComponent`, ten przerenderuje się za każdym razem.

## useCallback

Jest taki React Hook, który rozwiązuje pierwszy problem! Nazywa się `useCallback`. Jako pierwszy argument przyjmuje funkcję, a jako drugi taką samą [tablicę zależności, jak `useEffect`](https://typeofweb.com/2019/03/05/react-hooks-useeffect-efekty-uboczne-w-komponencie/).

```jsx
function MyComponent({ oneProp, anotherProp }) {
  const handleClick = React.useCallback(() => {
    console.log('Clicked!', oneProp, anotherProp);
  }, [oneProp, anotherProp]);

  return <SpecialButton onClick={handleClick} />;
}
```

W ten sposób, funkcja przekazana do `React.useCallback` jest **memoizowana**. To znaczy, że dopóki nie zmienią się `oneProp` lub `anotherProp`, dopóty `handleClick` nie będzie nową funkcją.

`React.useCallback` zapamiętuje stworzoną funkcję i dzięki temu komponent `SpecialButton` nie przerenderuje się bez potrzeby!

## useMemo

To React Hook, który zwraca zapamiętaną wartość. W pewnym sensie, to uogólniona wersja `useCallback`. Jako argument przyjmuje **funkcję, która zwraca wartość**.

```jsx
function MyComponent({ oneProp, anotherProp }) {
  const options = useMemo(
    () => ({
      data: oneProp,
      data2: anotherProp,
      // …
    }),
    [oneProp, anotherProp],
  );

  return <SpecialComponent options={options} />;
}
```

W ten sposób obiekt `options` będzie za każdym razem tą samą referencją i komponent `SpecialComponent` nie będzie musiał się przerenderowywać — przynajmniej dopóki nie zmieni się `oneProp` lub `anotherProp`!

## Czy Hooki useCallback i useMemo nie są zbędne?

Napisałem, że React Hook `useMemo` to trochę uogólniona wersja `useCallback` — i to prawda. `useCallback` jest funkcjonalnie równoważny takiemu zapisowi:

```js
const myUseCallback = (fn, deps) => useMemo(() => fn, deps);
```

## Kiedy używać

Z rozsądkiem ;) Nie powiem Ci dokładnie kiedy, ale ja bym używał zawsze, gdy może być z tego jakiś zysk, a nie ma negatywnego wpływu na czytelność.

## Pytania?

Jeśli chcesz na bieżąco śledzić kolejne części kursu React.js to koniecznie <strong>polub mnie na Facebooku i zapisz się na newsletter.</strong>
<NewsletterForm />
<FacebookPageWidget />
