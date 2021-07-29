---
id: 1847
index: 104
title: 'React Hooks: useState, czyli stan w komponentach funkcyjnych'
date: 2019-02-11T16:55:10.000Z
isMarkdown: true
status: publish
permalink: react-hooks-usestate-czyli-stan-w-komponentach-funkcyjnych
authors:
  - michal-miszczyszyn
guid: https://typeofweb.com/?p=1847
type: post
thumbnail:
  url: https://typeofweb.com/wp-content/uploads/2019/02/pexels-photo-1520145.jpeg
  width: 1919
  height: 1036
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
Wbudowanych Hooków w React jest kilka, a jeszcze więcej możesz tworzyć sam(a). Zaczniemy jednak od podstawowego wbudowanego Hooka `useState`. Dodamy stan do komponentu funkcyjnego!

{/* more */}

## Komponenty funkcyjne
Na początek krótka informacja od twórców React. Do tej pory komponenty będące funkcjami nazywały się **Stateless Functional Component**. Od momentu wprowadzenia Hooków ta nazwa nie miałaby dłuższej sensu. Dlatego od teraz takie komponenty nazywamy **Function Component**.

## useState — stan
Zgodnie z konwencją, **nazwy React Hook zaczynają się od słowa _use_**. Mamy więc `useState`, `useEffect`, `useContext` itd. W tym wpisie będę mówił tylko o tym pierwszym, kolejne wkrótce :)

Weźmy pierwszy najprostszy przykład z hookami: Dodanie stanu do komponentu funkcyjnego. Zróbmy licznik ;)

```jsx
function App() {
  const [counter, setCounter] = React.useState(0);
  
  return (
    <div>
      {counter}
      <button onClick={() => setCounter(counter + 1)}>+</button>
    </div>
  );
};
```

Co tu się dzieje? Wywołuję funkcję `React.useState(0);`. Jest to Hook. Ten Hook zwraca tablicę z dwoma elementami:

1. To stan
2. To funkcja zmieniająca stan

Użyłem tutaj destrukturyzacji tablicy i nazwałem stan `counter`, a funkcję zmieniającą stan `setCounter`. Jest to zgodne z konwencją, ale w zasadzie te **nazwy mogłyby być zupełnie dowolne**.

Dodatkowo, warto zwrócić uwagę, że `useState` jako argument przyjmuje **stan początkowy** — w moim przypadku liczbę 0.

Stała `counter` zawiera aktualny stan. Na początku jest to stan początkowy, czyli 0. Jeśli wywołam funkcję `setCounter(…)` to stan zostanie zmieniony i w kolejnym renderze `counter` **będzie zawierał nową wartość**.

Sprawdźmy jak to działa w praktyce:

<CodepenWidget height="265" themeId="0" slugHash="zedadL" defaultTab="js,result" user="mmiszy" embedVersion="2" penTitle="React.js w przykładach: Filtrowanie listy"><a href="http://codepen.io/mmiszy/pen/zedadL/">Zobacz Codepen React.js w przykładach: Filtrowanie listy</a>.</CodepenWidget>

## Ale co to w ogóle jest Hook?
Abstrakcyjnie: Hooki to mechanizm mocno inspirowany [**State Monad z Haskella**](https://mmhaskell.com/monads-5/). **Pozwalają na przechowywanie stanu pomiędzy kolejnymi wywołaniami funkcji**, bez konieczności martwienia się mutacjami czy jakimiś referencjami.

Jak to działa pod podszewką? W telegraficznych skrócie: React wywołuje Twoją funkcję (komponent funkcyjny) i może przechowywać sobie związany z nią stan. Przed wywołaniem komponentu funkcyjnego, React wie dokładnie, który komponent jest wywoływany i który stan powinien zostać „włożony” do Hooków. Po zakończeniu wywołania funkcji, React sprawdza czy stan się zmienił i odkłada na odpowiednie miejsce. **React robi za Ciebie dokładnie to, co do tej pory było robione manualnie przez Ciebie w metodach cyklu życia**. To ogromne ułatwienie!

## Filtrowanie listy z Hookami
Wróćmy do przykładu, który był implementowany w tym kursie już 2 razy:

https://typeofweb.com/2018/01/24/react-js-w-przykladach-filtrowanie-statycznej-listy/

Zamiast używać klasy, `setState` i `this.state`, użyj Hooka `useState`. Pomijam fragmenty, które się powtarzają w stosunku do starego kodu:

```jsx
function App() {
  const [filteredUsers, setUsers] = React.useState(allUsers);

  function filterUsers(e) {
    const text = e.currentTarget.value;
    const filteredUsers = getFilteredUsersForText(text);
    setUsers(filteredUsers);
  }
  
  return (
    <div>
      <input onInput={filterUsers} />
      <UsersList users={filteredUsers} />
    </div>
  );
};
```

W momencie wpisania czegoś w input, wywoływana jest funkcja `filterUsers`, która filtruje listę i wywołuje `setUsers` pochodzące z Hooka. Ot, cała filozofia. Stan jest _gdzieś_ przechowywany i nie bardzo obchodzi nas gdzie. To po prostu działa.

<CodepenWidget height="265" themeId="0" slugHash="ErvLzo" defaultTab="js,result" user="mmiszy" embedVersion="2" penTitle="React.js w przykładach: Filtrowanie listy"><a href="http://codepen.io/mmiszy/pen/ErvLzo/">Zobacz Codepen React.js w przykładach: Filtrowanie listy</a>.</CodepenWidget>

## Pytania?
<a href="https://szkolenia.typeofweb.com/" target="_blank">zapisz się na szkolenie z React</a>. Jeśli chcesz na bieżąco śledzić kolejne części kursu React.js to koniecznie <strong>polub mnie na Facebooku i zapisz się na newsletter.</strong>
<NewsletterForm />
<FacebookPageWidget />

## Ćwiczenie
**Ćwiczenie**: Przepisz jakiś komponent z klasy na Hooka `useState`. Jak wrażenia?
