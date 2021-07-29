---
id: 2383
index: 124
title: Wady React Hooks
date: 2020-02-13T09:26:57.000Z
isMarkdown: true
status: publish
permalink: wady-react-hooks
authors:
  - michal-miszczyszyn
guid: https://typeofweb.com/?p=2383
type: post
thumbnail:
  url: https://typeofweb.com/wp-content/uploads/2020/02/cover_facebook.png
  width: 1688
  height: 780
categories:
  - slug: wpis
    name: Wpis
series:
  slug: react-js
  name: React.js
seo:
  focusKeywords:
    - Wady hooks
  focusKeywordSynonyms:
    - Wady hooków

---
Od wielu tygodni nie opada kurz po zamieszaniu związanym z React Hooks. Poziom _hype_ przebił wszelki hajpometry, a rozsądna debata na temat kodu została zastąpiona prześciganiem się w pisaniu co raz to sprytniejszych i czystszych (w sensie _pure_) reReact Hooków. Zastanówmy się jednak nad wadami tego rozwiązania.

{/* more */}

Dlaczego tak działamy i po raz n-ty dajemy się ponieść emocjom, mimo tego, że przecież na podstawie wielu doświadczeń mamy świadomość, że to zgubne? Tego nie wiem i na to pytanie nie będę w stanie udzielić odpowiedzi. Uznałem jednak, że radosnemu uniesieniu na temat Hooków przyda się zdroworozsądkowe podejście i szczypta krytyki. A może bardziej pięść w brzuch.

## Po co nam React Hooks?
Po co nam hooki? Żeby ułatwić wprowadzenie Suspense, żeby ludzie nie robili głupich rzeczy, żeby nie było mutacji, żeby kod się lepiej minifikował, żeby można było wydzielać logikę zawierającą stan poza komponenty. Zalety te opisywałem w artykule [React Hooks — wprowadzenie i motywacja](https://typeofweb.com/react-hooks-wprowadzenie-i-motywacja/). Jeśli spojrzysz na to z dystansu, to dostrzeżesz, że **React, niczym socjalizm, świetnie rozwiązuje problemy, które sam stworzył**.

## Reaktywność i mutacje
Głównym argumentem za unikaniem mutacji w React jest utrata spójności pomiędzy interfejsem, a danymi. To brzmi świetnie i bez kontekstu tylko bym przytakiwał. **Mutacje są be i nie lubię mutacji. Tyle, że inne frameworki pokazują, że wcale nie musi tak być.** Knockout, Angular, Vue.js, Svelte dowodzą, że idea reaktywności i sprytnych mutacji działa lepiej, jest bardziej przystępna i zrozumiała dla ludzi, niż całkowita czystość, do której dąży React. „Czystość”, huh? Wrócimy do tego.

Bardzo znaną biblioteką do zarządzania stanem w React jest MobX. Dlaczego stał się tak popularny? Bo pozwala na mutacje i nie straszy negatywnymi konsekwencjami. Ludzie lubią mutacje. Ludzie chcą mutować dane. **Dajcie ludziom mutacje w kontrolowanym środowisku,** jak MobX, jak Vue.js, a nie zrobią sobie krzywdy i będą mega produktywni. Tak, pisze to człowiek, który absolutnie uwielbia paradygmaty programowania funkcyjnego. Ale nader wszystko lubię pragmatyzm.

## Czystość
Czystość funkcji jest często wskazywana jako ogromna zaleta Reacta. Tyle, że **komponenty funkcyjne korzystające z Hooków wcale nie są _pure functions_.** To kłamstwo, które zostało bezmyślnie powtórzone przez tysiące osób, ale mimo to nie stało się prawdą.

Czysta funkcja to taka, która dla tych samych danych zawsze zwraca ten sam rezultat, a jej wynik zależy wyłącznie od przekazanych do niej argumentów. _Pure function_ jest na przykład `const fn = x => x + 2;`, a nie jest `const fn = x => x + Math.random();`. Komponenty funkcyjne używające React Hooks nie są więc _pure_, bo ich wynik zależy właśnie od Hooków!

Autorzy później poprawili się, że chodziło o czystość tylko w pewnym sensie. Jakim? Czy to ułatwia, czy utrudnia zrozumienie Hooków osobom zaprzyjaźnionym z programowaniem funkcyjnym? A wszystkim pozostałym? Znowu: nie jestem w stanie odpowiedzieć na te pytania, ale sądzę, że powstałe zamieszanie w nazewnictwie nie pomaga nikomu.

## Krytyka React Hooks
Skoro już jesteśmy przy nazwach, i tak, wiem, to w sumie nieistotne, nazwy można zmienić, bla bla bla… Srsly, [`useEffect`](https://typeofweb.com/react-hooks-useeffect-efekty-uboczne-w-komponencie/)? Chodzi o efekt algebraiczny? Efekt uboczny? O co chodzi? Ani o jedno, ani o drugie, a o funkcję wywoływaną przy każdym renderze! Szybko powstała paczka, która tę niejasną nazwę zmienia i rozbija na 3 hooki: `useDidMount`, `useDidUpdate` i `useWillUnmount`, bo tak naprawdę tym właśnie jest `useEffect`, a nie żadnym „efektem”.

**Żeby było bardziej myląco, to efekty algebraiczne w React też są.** Na tyle, na ile pozwala na to sam język, ale są. Rzucanie wyjątku z Promisem w środku w renderze, jak głupio by nie brzmiało, to właśnie Reactowa próba implementacji efektów algebraicznych.

## Subtelne bugi
Autorzy Hooków mówią, że Hooki pozwalają uwolnić się od subtelnych bugów w aplikacjach, takich, jak np. zapominanie o pozbyciu się subskrypcji, gdy komponent jest usuwany z drzewa. To półprawda. Czyli, że kłamstwo. **Ten problem istnieje, ale Hooki go nie rozwiązują.** Robiłem code review wielu fragmentów kodu, w których autorzy zapominali usunąć subskrypcje w `useEffect`, pomimo Hooków, pomimo dokumentacji, która co rusz o tym wspomina.

```ts
class Component1 extends React.Component {
  componentDidMount() {
    this.props.subscribe();
  }
}

function Component2({subscribe}) {
  React.useEffect(() => {
    subscribe();
  });
}
```

W powyższym przykładzie oba komponenty mają ten sam bug. Co gorsza, komponent funkcyjny ma również drugi błąd. Potrafisz dostrzec, jaki?

Czy lepszą dokumentacją, ewangelizacją albo zasadami ESLint można naprawić ten problem? Pewnie tak. Ale wtedy **to nie ma absolutnie żadnego związku z Hookami.**

## Refy
Każdy, kto próbuje używać Hooków w końcu natknie się na ten sam problem: Bardzo prosty kod po przeniesieniu z klasy do funkcji działa niepoprawnie, ale w niezwykle subtelny sposób. Dobrym przykładem jest jakiekolwiek wywołanie asynchroniczne i odnoszenie się do `props`: w komponentach klasowych zawartość `props` będzie zawsze aktualna, nawet asynchronicznie po jakimś czasie. **Natomiast w funkcyjnych będą to propsy z momentu wywołania asynchronicznej operacji.** Jeśli pomiędzy wywołaniem, a zakończeniem działania propsy się zmienią, to w przypadku komponentu funkcyjnego nasza asynchroniczna funkcja tego nie zobaczy.

Jest to zrozumiałe i wynika z prostej różnicy pomiędzy komponentami funkcyjnymi, a klasowymi: W funkcyjnym render polega na wywołaniu ponownie funkcji, a więc przekazaniu zupełnie nowego obiektu props jako argument. Asynchroniczny callback trzyma jednak referencję do poprzedniego obiektu props, a nie tego nowego. Komponenty klasowe tego problemu nie mają, bo, uwaga, jest tam ukryta mutacja! Tak. `this` jest mutowalne i React je mutuje podmieniając stare `this.props` na nowe `this.props`. Tym sposobem asynchroniczny callback zawsze może się odwołać do aktualnych propsów.

```ts
class Component1 extends React.Component {
  componentDidMount() {
    this.props.subscribe(() => {
      console.log(this.props.value);
    });
  }
}

function Component2({subscribe, value}) {
  React.useEffect(() => {
    subscribe(() => {
      console.log(value);
    });
  });
}
```

Powyższy komponent funkcyjny, oprócz znanych nam już dwóch bugów, ma też nowy błąd: Odwołuje się do nieaktualnych propsów (_stale props_). **Żeby popełnić taką pomyłkę w komponencie klasowym, trzeba się naprawdę natrudzić.**

Teraz, jak rozwiązać ten problem w Hookach? **Użyć mutowalnych refów.** Ta mutacja, która do tej pory była ukryta, kontrolowana i działa się samoistnie (robił ją za nas React) teraz będzie musiała być robiona ręcznie, w sposób niekontrolowany, ze wszystkimi idącymi za tym zagrożeniami i wadami. Wow, to jest pewnie ta reklamowana czystość.

## Eslint
ESLint miał naprawić wszystko. Rzeczywiście, czasem jego podpowiedzi do Hooków są naprawdę sprytne. **Ale częściej nie.** Wziąłem kod powyżej i doprowadziłem do stanu używalności (naprawiłem jeden bug). Hook wygląda teraz tak:

```ts
React.useEffect(() => {
  subscribe(() => {
    setValues(vals => [...vals, value]);
  });
}, []);
```

Efekt to aplikacja, która pozornie działa, ale nadal ma najważniejszy bug: **odczytuje nieaktualne już propsy.** Oczekiwanym efektem jest to, że oba komponenty renderują tę samą listę.

<a href="https://typeofweb.com/wp-content/uploads/2020/02/react-hooks-use-effect-before.gif"><img src="https://typeofweb.com/wp-content/uploads/2020/02/react-hooks-use-effect-before.gif" alt="" width="320" height="279" class="aligncenter size-full wp-image-2387" /></a>

Ale, ale, chwila, moment, eslint daje mi jakieś ostrzeżenie!

> React Hook React.useEffect has missing dependencies: 'subscribe' and 'value'. Either include them or remove the dependency array. If 'subscribe' changes too often, find the parent component that defines it and wrap that definition in useCallback.

No dobra, dodajmy `subscribe` i `value` do tablicy. Co się wtedy stanie? Ostrzeżenie zniknęło. Kod wygląda tak, jak widać poniżej. Ale czy działa?

```ts
React.useEffect(() => {
  subscribe(() => {
    setValues(vals => [...vals, value]);
  });
}, [subscribe, value]);
```

<a href="https://typeofweb.com/wp-content/uploads/2020/02/react-hooks-use-effect-after.gif"><img src="https://typeofweb.com/wp-content/uploads/2020/02/react-hooks-use-effect-after.gif" alt="" width="320" height="279" class="aligncenter size-full wp-image-2386" /></a>

Co się dzieje? Jest tylko gorzej! Nie ma ostrzeżeń. Kod źle działa. Eslincie, miałeś byś taki mądry 🤔 Kod dostępny live tutaj: [https://codesandbox.io/s/divine-violet-z0uyq](https://codesandbox.io/s/divine-violet-z0uyq)

Powyższy fragment jest uproszczoną wersją autentycznego kodu jednej z osób, której robiłem code review. I tak, **nie ufała mi, kiedy mówiłem, żeby przestała ślepo słuchać eslinta, bo bug jest gdzieś indziej.** Nie uwierzyła, że musi użyć refa. Poszła szukać rozwiązania poza Type of Web. W końcu: przepisała z powrotem na klasę.

## useCallback, useMemo
Ktoś zwrócił mi uwagę, że znęcam się tylko na `useEffect`, który jest przecież najtrudniejszym z hooków. Racja. Porozmawiajmy o pozostałych.

[`useCallback` i `useMemo`](https://typeofweb.com/usememo-usecallback-czyli-rozwiazanie-problemow-ze-zmieniajacymi-sie-propsami/) – funkcje potrzebne tylko dlatego, bo React Hooks tworzy więcej problemów, niż rozwiązuje. Spójrzmy na przykład klasy:

```js
class Component3 extends React.PureComponent {
  render() {
    function doSomething() {
      //…
    }
    
    return <AnotherComponent onSth={doSomething} />
  }
}
```

Mamy tutaj buga: przy każdym renderze tworzona jest nowa funkcja `doSomething`, więc komponent `AnotherComponent` będzie się przerenderowywał zawsze, nawet jeśli _de facto_ to będzie dokładnie taka sama funkcja. Rozwiązania są dwa, ale jedno banalne: **Nie tworzyć funkcji w renderze!**

```js
class Component3 extends React.PureComponent {
  doSomething = () => {
    // … this.props …
  }
  render() {
    return <AnotherComponent onSth={this.doSomething} />
  }
}
```

Dzięki temu zawsze odwołujemy się do tej samej referencji do tej samej funkcji i komponent `AnotherComponent` nie musi się bez sensu przerenderowywać. Jak to wygląda z hookami?

```js
function Component4(props) {
  function doSomething() {
    // … props …
  }

  return <AnotherComponent onSth={doSomething} />
}
```

Mamy buga. Jak go rozwiązujemy? Używając hooka `useCallback`!

```js
function Component4(props) {
  const doSomething = React.useCallback(() => {
    // … props …
  }, [/* tu podajemy te propsy, których używamy */]);

  return <AnotherComponent onSth={doSomething} />
}
```

To nieco zaciemnia kod. A teraz zdaj sobie sprawę z tego, że **w `React.useCallback` musisz opakować każdą funkcję, którą przekazujesz do innego komponentu. Każdą jedną.** I w każdej z nich pilnować tablicy zależności. A jeśli w funkcji znajdą się operacje asynchroniczne? Jesteś skazana/y na Refy!

Jeszcze jedno, o czym wcześniej nie wspomniałem: Normalnie w aplikacji większość komponentów klasowych dziedziczy po `React.PureComponent`. Zamiana `React.PureComponent` na `React.Component` i odwrotnie to tylko kilka znaków, nie zaciemnia kodu w ogóle. W przypadku Hooków, niestety, musimy cały komponent opakować w `React.memo`. A więc tak naprawdę powyższy kod wyglądałby o w ten sposób:

```js
const Component4 = React.memo((props) => {
  const doSomething = React.useCallback(() => {
    // … props …
  }, [/* tu podajemy te propsy, których używamy */]);

  return <AnotherComponent onSth={doSomething} />
});
```

**Według mnie to ogromny narzut mentalny i zaciemnienie kodu.**

## Błędy
Autorzy Hooków mówią, że Hooki pozwalają uwolnić się od subtelnych bugów w aplikacjach, ale nie wspominają, że przynoszą one jeszcze więcej miejsc, w których takie błędy potencjalnie można zrobić. Co gorsza, trudno na pierwszy rzut oka dostrzec, co jest z takim kodem nie tak, a jeszcze trudniej znaleźć rozwiązanie. O ile **w przypadku klas każdy jest w stanie wykombinować lepszy lub gorszy sposób, tak w przypadku Hooków jesteśmy skazani na jedną słuszną pseudo-funkcyjną metodę rozwiązywania problemów.** Przypomina mi się konwersacja, którą niedawno miałem z koleżanką:

– Zobacz, jaki napisałem Hook, ale super, prawda?
– No, wygląda nieźle. Ale niestety w takim i takim bardzo rzadkim przypadku nie zadziała.
– Uh. Okej. (…) Przepisałem to na klasę, zobacz.
– Znacznie prościej.

Jeśli mi nie wierzysz, to zaimplementuj hook `useInterval`, który wywołuje przekazaną funkcję co jakiś czas. Bez googlania. W klasie to przecież banał, nie? W Hookach nie powinno to być dużo trudnie… **OŻ W MORDĘ.**

Klasa. Trochę sobie utrudniłem dodając reagowanie na zmianę propsa `time` powodujące ustawienie nowego interwału:

```ts
class Component5 extends React.Component {
  timerId = 0;
  
  startInterval = () => {
    clearInterval(this.timerId);
    this.timerId = setInterval(() => this.props.callback(123), this.props.time);
  }

  componentDidMount() {
    this.startInterval();
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }
  
  componentDidUpdate(props) {
    if (this.props.time !== props.time) {
      this.startInterval();
    }
  }
}
```

Wydaje mi się, że ten kod jest w stanie przeczytać i zrozumieć każda osoba, która miała do czynienia z jakimkolwiek językiem programowania.

Funkcja:

```ts
function useInterval(callback, delay) {
  const savedCallback = React.useRef();

  // Remember the latest callback.
  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  React.useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

function Component6({ callback, time }) {
  useInterval(callback, time);
}
```

useRef? Dwa useEffect? Ale dlaczego? Czy Twoje rozwiązanie przypomina powyższe? Ten kod wziąłem z bloga Dana Abramova. **Sam bym pewnie go napisał, ale zajęłoby to tydzień.** Nie można jakoś tak… łatwiej? Można! Klasą.

## Reużywalność logiki
Teraz na pewno ktoś rozpocznie linię argumentacyjną pod tytułem `npm install use-interval`. **Hooki można łatwo wydzielać i przenosić. Łatwiej, niż analogiczny kod z klasy, to prawda. Tylko co z tego?** Ile kodu jesteś w stanie zainstalować z npm? Czy weryfikujesz jego poprawność? Czy autorki i autorzy paczek na npm nie popełniają błędów? O ile łatwiej jest popełnić taki lub podobny, bardzo subtelny błąd w Hookach? Poza tym, nieco mniej wygodny, ale równie „reużywalne” fragmenty kodu można tworzyć używając HoC lub render propsów.

## Po co nam Hooki
Każdy zna taką osobę, która próbuje realizować jakiś projekt poboczny w 100% podążając za jednym paradygmatem albo w jednym ezoterycznym języku, no nie? Trochę się podśmiewamy z braku realistycznego podejścia do życia, ale też odczuwamy podziw do oddania się ideom. **Każdy lubi się pochwalić napisaniem super skomplikowanego kodu, który jednak jest czysty i zgodny z jakimiś pryncypiami.**

No i dokładnie takie są moje odczucia względem React Hooks. **Tak, jakbym patrzył na kod tego rąbniętego znajomego, który wszystko pisze w Haskellu i podtyka innym pod nos mówiąc „pochwal mnie, jaki jestem mądry”. Dokładnie tak się czuję, gdy patrzę na React Hooks.**

Wiele osób przychodzi do mnie, żeby pokazać mi Hooki, które zostały przez nie napisane. **Hooki, które rozwiązują naprawdę banalne problemy, ale z powodów opisanych wcześniej, sam kod jest skomplikowany i zawoalowany.** `useInterval`. `useDebounce`. Gdyby ten sam problem rozwiązały przy pomocy klasy, nigdy nie przyszłyby się chwalić, bo napisanie klasy nie wzbudzałoby takiego podziwu, gdyż byłoby łatwe, proste, przyjemne i czytelne. Wow, hook, wow, pure, coś tam coś tam algebraic effect coś tam, wow. Chcę zapytać: _But why?_

## Postęp
Niektórzy mówią mi, że mam rację, ale nie da się inaczej. Że tak jest dobrze. Że lepiej, niż było. Że to postęp. Żebym spojrzał z szerszej perspektywy na zalety React Hooks.

Wzdycham wtedy i mówię: Moi drodzy, nie urodziłem się wczoraj. **Lata temu z zacięciem broniłem rozwiązań, które wydawały mi się rewolucyjne, bo sądziłem, że nie da się tego samego problemu rozwiązać lepiej.** Przykładem niech będzie router Angulara i dynamiczne ładowanie komponentów. Wtedy zdawało mi się, że nie da się lepiej. Dzisiaj wiem, że byłem krótkowzroczny, a prostsze i jednocześnie bardziej elastyczne rozwiązania były w zasięgu ręki. Da się. Zawsze się da.

**Czasem potrzeba stworzyć potworka, żeby ktoś ze społeczności powiedział „mam lepszy pomysł”,** a frustracja przy pracy z potworkiem popchnęła większą rzeszę ludzi do spróbowania tego lepszego pomysłu. Trzeba tylko zrobić krok wstecz.

## Podsumowanie
Czy Hooki rozwiązują te problemy, których rozwiązanie obiecali nam twórcy? Trochę. Wprowadzają też sporo nowych kłopotów. Pytam więc: **czy da się lepiej, a przede wszystkim prościej? Wygląda na to, że tak.** Spójrzmy na Svelte. [Spójrzmy na Vue.js 3](https://vue-composition-api-rfc.netlify.com/#summary). A potem spójrzmy na Reacta. Coś zdecydowanie poszło nie tak.

**A jakie jest Twoje zdanie? Napisz koniecznie w komentarzach!**
