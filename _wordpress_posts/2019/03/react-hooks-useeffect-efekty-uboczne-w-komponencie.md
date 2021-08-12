---
index: 103
title: 'React Hooks: useEffect — efekty uboczne w komponencie'
date: 2019-03-05T11:28:36.000Z
isMarkdown: true
status: publish
permalink: react-hooks-useeffect-efekty-uboczne-w-komponencie
authors:
  - michal-miszczyszyn
type: post
thumbnail:
  url: https://typeofweb.com/wp-content/uploads/2019/03/pexels-photo-1762851.jpeg
  width: 1920
  height: 1280
categories:
  - slug: javascript
    name: JavaScript
  - slug: front-end
    name: Front-end
series:
  slug: react-js
  name: React.js
seo:
  metadesc: "useEffect Hook w React: W React 16.8 pojawiły się\_hooki, które pozwalają m.in. na efekty uboczne w funkcjach. Dokładnie temu służy React hook useEffect!"
---

W tym wpisie opowiadam o hooku useEffect w React. Na pewno często musisz wykonywać żądania HTTP wewnątrz komponentów, prawda? Albo nasłuchiwać jakichś subskrypcji? Jak często zdarzyło Ci się wykonywać **dokładnie ten sam kod** w `componentDidMount`, a potem też w `componentDidUpdate`? Mi cały czas się to przytrafia! A do tego jeszcze pamiętać o **posprzątaniu po sobie** w `componentWillUnmount`… Wciąż o tym zapominam. Ale już niedługo: Powitaj `useEffect`!

## useEffect

W React 16.8 pojawiły się hooki, które pozwalają m.in. na tworzenie stanowych komponentów funkcyjnych, a także na wykonywanie efektów ubocznych w funkcjach. Dokładnie temu służy hook `useEffect`.

Jakie to mogą być efekty uboczne? **Wszystko, co dzieje się asynchronicznie lub poza komponentem**:

- zapytania do API (fetch)
- subskrypcje (np. rxjs albo EventEmitter)
- timery (`setTimeout` i `setInterval`)
- aktualizacja `document.title`
- nasłuchiwanie na zdarzenia — np. `resize`
- …

**Żadne z wymienionych rzeczy nie powinny znaleźć się bezpośrednio w komponencie**. Zamiast tego, użyj `useEffect`!

## Pierwszy `useEffect`

Skorzystamy tutaj z przykładu z poprzedniego wpisu:

https://typeofweb.com/2019/02/11/react-hooks-usestate-czyli-stan-w-komponentach-funkcyjnych/

Chcesz, aby `document.title` był aktualizowany za każdym razem, gdy wpisujesz coś w input i filtrujesz listę użytkowników. Użyjesz wtedy dwóch hooków: `useState` i `useEffect`:

```js
function App() {
  const [filteredUsers, setUsers] = React.useState(allUsers);

  function filterUsers(e) {
    const text = e.currentTarget.value;
    const filteredUsers = getFilteredUsersForText(text);
    setUsers(filteredUsers);
  }

  useEffect(() => {
    // 1
    document.title = `Showing ${filteredUsers.length} users!`;
  });

  return (
    <div>
      <input onInput={filterUsers} />
      <UsersList users={filteredUsers} />
    </div>
  );
}
```

Jedyne, co się tutaj zmieniło w stosunku do ostatniego wpisu, to 3 nowe linie:

```js
useEffect(() => {
  // 1
  document.title = `Showing ${filteredUsers.length} users!`;
});
```

Ten krótki kod sprawia, że przy **każdym renderze** wywoła się przekazana do `useEffect` funkcja i zaktualizowany zostanie `document.title`.

## Przy każdym renderze?

Tak. Domyślnie, tak. **W wielu przypadkach to pożądane zachowanie**! Ale tutaj, możesz nieco zoptymalizować. Chciałabyś pewnie, aby nasz efekt wywoływał się wyłącznie wtedy, gdy zmienia się `filteredUsers`. To na tyle popularne zastosowanie, że jest wbudowane w `useEffect`. Nie trzeba korzystać z `componentDidUpdate` i manualnie porównywać zmienionych propsów. Zamiast tego…

```js
useEffect(() => {
  document.title = `Showing ${filteredUsers.length} users!`;
}, [filteredUsers]); // 2
```

Dodaję do `useEffect` drugi argument. Jest to tablica wartości, na podstawie których React podejmuje decyzję, czy dany efekt wywołać ponownie, czy nie.

<p class="important">Jeśli podajesz tablicę jako argument do <code>useEffect</code>, to koniecznie zwróć uwagę, aby zawierała ona listę <strong>wszystkich</strong> wartości z komponentu, które są używane w samym hooku.</p>

Demo: <a href="https://codepen.io/mmiszy/pen/dLdpdx" target="_blank" rel="noopener noreferrer">React Hooks w przykładach: useEffect</a>.

## Sprzątanie po sobie

Bardzo częstym wymaganiem jest, dodatkowo, wykonanie jakiejś akcji (jakiegoś „efektu”), gdy trzeba po sobie posprzątać. Na przykład, gdy komponent jest odmontowywany, albo po prostu przerenderowywany. Ten przypadek również jest obsłużonyn przez `useEffect`! Wystarczy wewnątrz niego **zwrócić funkcję**:

```js
useEffect(() => {
  const subscription = props.status$.subscribe(handleStatusChange); // 3

  return () => {
    // 4
    subscription.unsubscribe();
  };
});
```

W linii (3) podpinam się pod jakąś subskrypcję — w tym przypadku załóżmy, że jest to strumień rxjs. Moja funkcja „sprzątająca”, którą zwracam (4) usuwa subskrypcję, bo nie będzie już potrzebna.

<p class="important">Pamiętaj, aby zawsze usuwać wszelkie subskrypcje i timery, gdy nie są już potrzebne!</p>

Zwróć uwagę, że `subscribe` i `unsubscribe` wywoływane są teraz przy **każdym renderze**! To dobre zachowanie. Pomaga uniknąć subtelnych błędów, gdy zapominamy się ponownie podpiąć pod subskrypcję, gdy ta się zmienia. **Dopóki nie sprawia to problemów — ja bym się tym szczególnie nie przejmował**.

Są jednak sytuacje, gdy podpinanie subskrypcji na nowo przy każdym renderze jest niedopuszczalne i niepotrzebne. Kiedy? No na przykład wtedy, gdy z subskrypcją związane są jakieś kolejne efekty uboczne — np. skasowanie naszego timera (i przez to pomyłka w odliczaniu czasu), albo wysłanie kolejnego żądania do websocketów z prośbą o odpięcie i potem ponowne podpięcie do nasłuchiwania na zdarzenia.

W takiej sytuacji, jak już pisałem wcześniej, wystarczy jako drugi argument `useEffect` przekazać tablicę. W tym przypadku byłoby to:

```js
useEffect(() => {
  const subscription = props.status$.subscribe(handleStatusChange);

  return () => {
    subscription.unsubscribe();
  };
}, [props.status$]); // 5
```

Mówisz tutaj Reaktowi: „usuń tę subskrypcję i stwórz ją na nowo tylko wtedy, gdy zmieni się `props.status$`”. To genialne ułatwienie i prosta optymalizacja!

## A jakby tak klasą?

Porównaj teraz powyższy kod z analogicznym kodem w Reaktowej klasie:

```js
  componentDidMount() {
    this.subscription = props.status$.subscribe(this.handleStatusChange);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.status$ !== this.props.status$) {
      this.subscription.unsubscribe();
      this.subscription = props.status$.subscribe(this.handleStatusChange);
    }
  }

  componentWillUnmount() {
    this.subscription.unsubscribe();
  }
```

**Ten kod robi dokładnie to samo, a jest dwukrotnie dłuższy!**

## Pytania?

<a href="https://szkolenia.typeofweb.com/" target="_blank">zapisz się na szkolenie z React</a>. Jeśli chcesz na bieżąco śledzić kolejne części kursu React.js to koniecznie <strong>polub mnie na Facebooku i zapisz się na newsletter.</strong>
<NewsletterForm />
<FacebookPageWidget />
