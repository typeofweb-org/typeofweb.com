---
id: 1385
index: 78
title: TDD w React.js z pomocą react-testing-library
date: 2018-04-13T09:28:29.000Z
isMarkdown: true
status: publish
permalink: tdd-react-testing-library
authors:
  - michal-baranowski
guid: https://typeofweb.com/?p=1385
type: post
thumbnail:
  url: >-
    https://typeofweb.com/wp-content/uploads/2018/04/testing-react-testing-library2.jpg
  width: 1200
  height: 800
categories:
  - slug: javascript
    name: JavaScript
  - slug: front-end
    name: Front-end
series:
  slug: react-js
  name: React.js
seo:
  focusKeywords:
    - react-testing-library
---

Jak tworzyć komponenty w React.js zgodnie z TDD dzięki **react-testing-library**? Jak zamockować `axios`? Jak napisać testy odporne na refactoring? To i kilka innych sztuczek w artykule poniżej :)

<!--more-->

Trzymanie się zasad **TDD** (_Test-Driven Development_) pisząc aplikacje po stronie **front-endu** w React.js może wydawać się trudniejsze niż testowanie kodu po stronie **back-endu**.

Musimy w jakiś sposób wyrenderować nasz komponent, zasymulować interakcje użytkownika z przeglądarką, reagować na zmiany propsów i stanu naszego komponentu, a na koniec jeszcze przetestować asynchroniczne metody wywołane przez na przykład kliknięcie w przycisk na stronie.

Aby pokryć te wszystkie scenariusze w naszych testach, dochodzi często do sytuacji, w których stają się one nieczytelne, jeden zależy od drugiego, mockujemy na potęgę i w rezultacie mamy testy napisane wg. antypatternów.

## Szanuj swój czas

Z moich obserwacji dużo osób tworzy cały działający komponent i dopiero wtedy zabiera się za pisanie do niego testów, a następnie okazuje się, że nie da się przetestować go w obecnej implementacji i trzeba go przepisać. Tracimy na tym czas, cierpliwość i pieniądze pracodawcy.

## Dostępne rozwiązania

Na nasze szczęście istnieje wiele bibliotek, które rozwiązują nam problem renderowania komponentu (np. [Enzyme](https://typeofweb.com/2018/02/09/testowanie-aplikacji-react-js-podstawy-enzyme/)), mockowania odpowiedzi z servera (np. [MockAxios](https://github.com/ctimmerm/axios-mock-adapter)), ale często mają nie do końca jasne API jak w przypadku tego pierwszego — czym do cholery różni się od siebie _Shallow_, _Mount_ i _Render_ i którego powinienem użyć?!?

## O projekcie

Na potrzeby artykułu stworzymy małą aplikację, która po kliknięciu w przycisk będzie pobierała z zewnętrznego [API](https://api.icndb.com/jokes/random) losowy kawał, w którym główną rolę pełni Chuck Norris. Będziemy stopniowo pisać testy z pomocą **react-testing-library**, a następnie tworzyć komponent i starać się żeby testy przeszły.

Pisząc testy będziemy mieć w głowie to zdanie:

https://twitter.com/kentcdodds/status/977018512689455106

## Zaczynamy

Projekt stworzymy z boilerplate [create-react-app](https://typeofweb.com/2018/01/29/tworzenie-aplikacji-react-js-dzieki-create-react-app/), [Axios](https://github.com/axios/axios) użyjemy do pobierania danych z zewnętrznego API, do uruchamiania testów [Jest](https://facebook.github.io/jest/)'a, do mockowania zewnętrznego API [MockAxios](https://github.com/ctimmerm/axios-mock-adapter), a do renderowania komponentów, triggerowania akcji i obsługi asynchronicznych metod [react-testing-library](https://github.com/kentcdodds/react-testing-library) — świetnej i ultra lekkiej biblioteki stworzonej przez cytowanego już wcześniej [_Kent C. Dodds_](https://twitter.com/kentcdodds).

Generujemy projekt z create-react-app wg. instrukcji, a następnie instalujemy dodatkowe zależności (_do stworzenia projektu możemy użyć także_ [_CodeSandbox_](https://codesandbox.io/s/new)):

```
npm install axios
npm install --save-dev axios-mock-adapter react-testing-library
```

### Struktura

Tworzymy podobną sktrukture plików jak poniżej:

```
 - src
	 - __tests__
		 - jokeGenerator.test.js
	 - joke.js
	 - jokeGenerator.js
	 - index.js
```

### Piszemy pierwszy test

Zaczniemy od napisania testu do komponentu **Joke**, którego funkcją będzie wyświetlenie tekstu przekazanego przez propsy (`jokeGenerator.test.js`):

```jsx
test('Joke komponent otrzymuje propsy, a następnie renderuje text', () => {
  const { getByTestId } = render(<Joke text="The funniest joke this year." />);

  expect(getByTestId('joke-text')).toHaveTextContent('The funniest joke this year.');
});
```

Już tłumaczę co tu się dzieje. Idąc od góry widzimy funkcję `render` zaimportowaną z paczki **react-testing-library**. Przekazujemy do niej nasz jeszcze nie istniejący komponent.

Funkcja ta zwraca obiekt zawierający kilka przydatnych metod ([pełna lista metod](https://github.com/kentcdodds/react-testing-library#render)) min. `getByTestId` — zwraca nam element HTML przyjmując `data-testid` jako argument.

Czym jest `data-testid`? Jest to unikalny atrybut elementu na podstawie którego możemy napisać odpowiedni selektor HTML.
Korzystając z tej metody możemy napisać expecta, który oczekuje, że innerHTML będzie równy "_The funniest joke this year_".

<p class="important">Dzięki <code>data-testid</code> nasze testy stają się odporne na refactoring ponieważ polegamy na wartościach, które w kodzie już raczej się nie zmienią. Należy jednak korzystać z tego z rozwagą, chcemy przecież aby nasz test odzwierciedlał to, jak użytkownik będzie z aplikacji korzystał.
Dlatego najlepiej stosować <code>data-testid</code>, gdy metody <code>getByText</code>/<code>queryByText</code> zawiodą.</p>

```
npm test
```

Uruchamiamy testy i widzimy:

```
Joke is not defined
```

Tego się spodziewaliśmy! `Joke` jeszcze nie istnieje, stworzyliśmy do tej pory tylko pusty plik `joke.js`.
Napisaliśmy test, w którym jasno widać czego od komponentu oczekujemy. Teraz naszym zadaniem jest nie dotykając już testu sprawić, aby test przeszedł (`joke.js`):

```jsx
export default ({ text }) => <div data-testid="joke-text">{text}</div>;
```

Po przeładowaniu testów jeśli zrobiłaś wszystko tak jak ja, test powinien przejść :)

### Drugi komponent

Zadaniem drugiego komponentu będzie pobranie losowego kawału z [API](https://api.icndb.com/jokes/random) po kliknięciu w przycisk, zapisanie go w _state_ komponenetu i wyrenderowanie dzięki znanemu już nam `Joke`.

Startujemy oczywiście od napisania testu. Jest to większy komponent, zatem test będziemy pisać stopniowo i będziemy starali się żeby jak najczęściej był „zielony”.

```jsx
test("Komponent 'JokeGenerator' pobiera randomowego suchara i go renderuje", async () => {
  const { getByText } = render(<JokeGenerator />);

  expect(getByText('Brak suchara')).toBeTruthy();
});
```

Widzimy znaną już nam funkcję `render`, tylko tym razem wyciągamy z niej `getByText`. Jak łatwo się domyśleć, zwraca nam element HTML z podanym przez nas tekstem jeśli takowy oczywiście istnieje.

> Chuck Norris can overflow your stack just by looking at it.

Odświeżamy testy i mamy:

```
JokeGenerator is not defined
```

Wiemy co z tym zrobić:

```jsx
export default class JokeGenerator extends React.Component {
  render() {
    return <div />;
  }
}
```

Rezultat:

```
Unable to find an element with the text: **Brak suchara**. This could be because the text is broken up by multiple elements. In this case, you can provide a function for your text matcher to make your matcher more flexible.
```

Chcemy wyświetlić powyższy tekst gdy nie mamy w _state_ żadnego kawału:
Wiemy co z tym zrobić:

```jsx
export default class JokeGenerator extends React.Component {
  state = {
    joke: null,
  };

  render() {
    const { joke } = this.state;

    return <React.Fragment>{!joke && <div>Brak suchara</div>}</React.Fragment>;
  }
}
```

Teraz chcę zasymulować kliknięcie w przycisk przez użytkownika i zobaczyć wiadomość, że mój kawał się ładuje, a domyślny tekst **Brak Suchara** znika. Użyjemy w tym celu metody `Simulate`.

```jsx
import { render, Simulate } from 'react-testing-library';
Simulate.click(getByTestId('laduj-suchara'));

expect(queryByText('Brak suchara')).toBeNull();

expect(querybyText('Ładuję...')).not.toBeNull();
```

`queryByText` różni się od `getByText` tym, że ten pierwszy gdy nie znajdzie elementu zwraca `null`, a ten drugi rzuca błędem.

Po przeładowaniu testów:

```
Unable to find an element by: [data-testid="laduj-suchara"]
```

Tworzymy buttona i przy okazji metode która ustawi nam `loading` state na `true`.

```jsx
export default class JokeGenerator extends React.Component {
  state = {
    joke: null,
    loading: false,
  };

  loadJoke = () => {
    this.setState({ loading: true });
  };

  render() {
    const { joke, loading } = this.state;

    return (
      <React.Fragment>
        {!joke && !loading && <div>Brak suchara</div>}
        {loading && <div>Ładuję...</div>}

        <button onClick={this.loadJoke} type="button" data-testid="laduj-suchara">
          Załaduj losowy kawał
        </button>
      </React.Fragment>
    );
  }
}
```

Testy elegancko przechodzą. Zamockujmy teraz odpowiedź z serwera używając `MockAxios`.

```jsx
import MockAxios from 'axios-mock-adapter';
```

Zaraz **nad** pierwszym testem dopiszmy ten fragment kodu:

```jsx
const mock = new MockAxios(axios, { delayResponse: Math.random() * 500 });

afterAll(() => mock.restore());
```

Na początku drugiego testu, w którym testujemy `JokeGenerator` dodajmy:

```javascript
mock.onGet().replyOnce(200, {
  value: {
    joke: 'Really funny joke!',
  },
});
```

A na końcu tego samego testu:

```jsx
await wait(() => expect(queryByText('Ładuję...')).toBeNull());

expet(queryByTestId('joke-text')).toBeTruthy();
```

Metoda `wait` (importujemy ją tak samo jak `Simulate` i `render`) czeka (domyślnie 4500ms) na callbacka dopóki ten nie przestanie zwracać erroru. Interwał w jakim sprawdzane jest wyrażenie w callbacku to domyślnie 50ms.

Dzięki tej metodzie możemy testować min. asynchroniczne działania w naszej aplikacji.

Co ciekawe `wait` dostępne jest jako oddzielna [paczka](https://github.com/TheBrainFamily/wait-for-expect) (`react-testing-library` z tej paczki korzysta). Stworzył ją [Łukasz Gandecki](https://twitter.com/lgandecki) z [The Brain Software House](http://team.thebrain.pro/).

Po tych modyfikacjach powinniśmy dostać taki błąd:

```
Expected value to be truthy, instead received:
null
```

Aby nasz test zaczął ponownie przechodzić musimy zmodyfikować naszą metode `loadJoke`:

```jsx
loadJoke = async () => {
  this.setState({ loading: true });

  const {
    data: {
      value: { joke },
    },
  } = await axios.get('https://api.icndb.com/jokes/random');

  this.setState({ loading: false, joke });
};
```

oraz wyrenderować nasz kawał przy użyciu `Joke`:

```jsx
{
  joke && !loading && <Joke text={joke} />;
}
```

Test powinien ponownie zrobić się zielony, a my mamy pewność, że wszystko działa.

<p class="important">Zauważcie, że jeszcze ani razu nie otworzyliśmy przeglądarki i nie przetestowaliśmy tego ręcznie, ale dzięki temu w jak pisaliśmy testy (w sposób w jaki użytkownik normalnie korzysta z aplikacji) mamy 100% pewność, że nasza mała aplikacja po prostu działa.</p>

Dodajmy na koniec `JokeGenerator` do `index.js` i odpalmy przeglądarke:

```jsx
const App = () => (
  <div style={styles}>
    <JokeGenerator />
  </div>
);
```

## Bonus

Sposób w jaki napisaliśmy nasze testy umożliwia nam wykorzystanie ich jako testów **e2e** bez dodawania ani jednej linijki kodu.

Wystarczy, że zakomentujemy fragmenty kodu odpowiedzialne za mockowanie Axios'a i gotowe! Uruchom teraz testy, a będą korzystać z prawdziwego API.

## Podsumowanie

W razie problemów kod całego projektu dostępny jest na [CodeSandbox](https://codesandbox.io/s/6yq6v1xk3).

Zachęcam do zapoznania się z pełną dokumentacją `react-testing-library`. Mamy do dyspozycji więcej metod do znajdywania elementów w naszym wirtualnym DOM-ie, zwracania wartości tekstu z elementu itd. [typeofweb-courses-slogan category="React Testing Library"]

Mam nadzieję, że dzięki mnie czegoś się dzisiaj nauczyliście i wykorzystacie parę technik w Waszych projektach.

_[Michał Baranowski](https://github.com/mbaranovski)_
