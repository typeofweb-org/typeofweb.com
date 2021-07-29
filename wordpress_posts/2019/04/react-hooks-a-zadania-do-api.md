---
id: 1903
index: 110
title: React Hooks a żądania do API
date: 2019-04-16T09:27:55.000Z
isMarkdown: true
status: publish
permalink: react-hooks-a-zadania-do-api
authors:
  - michal-miszczyszyn
guid: https://typeofweb.com/?p=1903
type: post
thumbnail:
  url: >-
    https://typeofweb.com/wp-content/uploads/2019/04/aquarium-aquatic-blue-137612.jpg
  width: 1920
  height: 888
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

React Hooks mocno upraszczają właściwie wszystko, co do tej pory robiłaś. W jednym z pierwszych odcinków kursu pokazywałem, jak można w szybki sposób pobierać dane z API używając `fetch` w Reakcie. Czy Hooki coś tutaj zmieniają? Ależ tak!

{/_ more _/}

## Fetch do tej pory

Zaczniemy może od przyjrzenia się, jak taki fetch wyglądał do tej pory w klasach:

```jsx
export class App extends React.Component {
  state = {
    contacts: [],
  };

  componentDidMount() {
    fetch('https://randomuser.me/api/?format=json&results=10')
      .then((res) => res.json())
      .then((json) => this.setState({ contacts: json.results }));
  }

  render() {
    return <ContactsList contacts={this.state.contacts} />;
  }
}
```

Co tu się dokładnie dzieje? Najpierw deklaruję state, następnie w `componentDidMount` wykonuję zapytanie do API, czekam na wynik i rezultat zapisuję do stanu. Ten kod pochodzi ze starszego wpisu, tam też znajdziesz więcej wyjaśnień:

https://typeofweb.com/2018/02/27/komunikacja-z-api-w-react-js/

Nie wygląda skomplikowanie, ale czy może być jeszcze prostsze?

## Wchodzą Hooki

Z użyciem znanych Ci już Hooków `useState` i `useEffect` wygląda to tak:

```jsx
function App() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetch('https://randomuser.me/api/?format=json&results=10')
      .then((res) => res.json())
      .then((json) => setContacts(json.results));
  }, []);

  return <ContactsList contacts={contacts} />;
}
```

Zwróć uwagę na jedną ważną rzecz: Jako drugi argument do `useEffect` podałem tutaj pustą tablicę. Po co? Aby `fetch` **nie wykonywał się przy każdym renderze, a tylko za pierwszym razem**!

No ładnie, prawda? Ale wcale nie jest dużo krótsze. Dodajmy więc nowe wymaganie…

## Aktualizacja wyników gdy zmienia się ID

Załóżmy, że Twój komponent ma wyświetlać dane pobrane z API dla danego ID przekazanego mu jako props. W użyciu:

```jsx
<App id={…} />
```

Gdy `id` się zmieni, komponent ma pobrać dane na nowo i wyświetlić. Jak to wygląda w klasie?

```jsx
export class App extends React.Component {
  state = {
    contacts: [],
  };

  fetchData() {
    fetch(`https://randomuser.me/api/?format=json&results=10&seed=${this.props.id}`)
      .then((res) => res.json())
      .then((json) => this.setState({ contacts: json.results }));
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.id !== this.props.id) {
      this.fetchData();
    }
  }

  render() {
    return <ContactsList contacts={this.state.contacts} />;
  }
}
```

Łołoło, trochę nam ten komponent urósł 🤔 A z hookami?

```jsx
function App({ id }) {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetch(`https://randomuser.me/api/?format=json&results=10&seed=${id}`)
      .then((res) => res.json())
      .then((json) => setContacts(json.results));
  }, [id]);

  return <ContactsList contacts={contacts} />;
}
```

To jest nadal tak samo krótkie, jak poprzednio. Zmieniły się tylko 3 fragmenty kodu: Props jako argument do komponentu, fetch pod inny adres i tablica jako drugi argument do `useEffect` już nie jest pusta: `[id]`.

## W tym kodzie jest bug

Jest subtelny i pewnie się na niego nie natkniesz, ale uwierz mi, że w tym kodzie jest bug. Gdy szybko zmienisz wartość ID, wykonają się w krótkim czasie dwa żądania do API. A co się stanie, jeśli odpowiedź na pierwsze żądanie przyjdzie później niż na drugie? Komponent wyświetli nieaktualne dane. Bug!

Aby go naprawić, trzeba anulować poprzednie żądanie. Jak to wygląda w klasie?

```jsx
export class App extends React.Component {
  state = {
    contacts: [],
  };

  controller = new AbortController();

  fetchData() {
    this.controller.abort();
    fetch(`https://randomuser.me/api/?format=json&results=10&seed=${this.props.id}`, { signal: this.controller.signal })
      .then((res) => res.json())
      .then((json) => this.setState({ contacts: json.results }));
  }

  componentDidMount() {
    this.fetchData();
  }

  componentWillUnmount() {
    this.controller.abort();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.id !== this.props.id) {
      this.fetchData();
    }
  }

  render() {
    return <ContactsList contacts={this.state.contacts} />;
  }
}
```

Używam tutaj eksperymentalnego `AbortController`, więc przestudiuj ten kod dokładnie :) Aby anulować żądanie, wywołuję `controller.abort()` — w klasie musiałem sobie zapisać instancję `AbortController`.

Dodatkowo dopisałem też brakujące `componentWillUnmount`, aby komponent nie pobierał niepotrzebnie danych, gdy już zostanie odmontowany.

Z Hookami jest dużo prościej, bo korzystasz z **naturalnego dla JS domknięcia**:

```jsx
function App({ id }) {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`https://randomuser.me/api/?format=json&results=10&seed=${id}`, { signal: controller.signal })
      .then((res) => res.json())
      .then((json) => setContacts(json.results));

    return () => controller.abort();
  }, [id]);

  return <ContactsList contacts={contacts} />;
}
```

Tak, to już!

## Hooki są czystsze

Zwróć uwagę jak bardo porozrzucany jest kod w ostatnim przykładzie w klasie — `constructor`, `componentDidMount`, `componentWillUnmount` i `componentDidUpdate`. W hookach zaś, wszystko jest obok siebie. **Powiązany kod leży blisko**.

Dodatkowo, łatwo mogłabyś się pokusić o stworzenie nowego hooka, który by całą tę logikę enkapsulował. Dzięki temu mogłabyś łatwo go używać w różnych miejscach, bez konieczności duplikowania kodu. To w praktyce niemożliwe przy użyciu klas (chyba, że przez HoC lub zagnieżdżając kolejne komponenty…)

## Pytania?

<a href="https://szkolenia.typeofweb.com/" target="_blank">zapisz się na szkolenie z React</a>. Jeśli chcesz na bieżąco śledzić kolejne części kursu React.js to koniecznie <strong>polub mnie na Facebooku i zapisz się na newsletter.</strong>
<NewsletterForm />
<FacebookPageWidget />
