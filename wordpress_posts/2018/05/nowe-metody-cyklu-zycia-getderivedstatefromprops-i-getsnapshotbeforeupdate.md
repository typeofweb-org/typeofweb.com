---
id: 1566
index: 86
title: 'Nowe metody cyklu życia: getDerivedStateFromProps i getSnapshotBeforeUpdate'
date: 2018-05-29T10:18:46.000Z
isMarkdown: true
status: publish
permalink: nowe-metody-cyklu-zycia-getderivedstatefromprops-i-getsnapshotbeforeupdate
authors:
  - michal-miszczyszyn
guid: https://typeofweb.com/?p=1566
type: post
thumbnail:
  url: https://typeofweb.com/wp-content/uploads/2018/05/pexels-photo-920120.jpeg
  width: 1280
  height: 854
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

Od wersji React 16.3 funkcje `componentWillMount`, `componentWillReceiveProps` i `componentWillUpdate` zostają oznaczone jako _deprecated_. Pojawiają się też dwie nowe metody cyklu życia: `getDerivedStateFromProps` i `getSnapshotBeforeUpdate`. Co to dla nas oznacza? Do czego one służą? Jak ich używać?

<!--more-->

Informacje o pozostałych _lifecycle methods_ w React znajdziesz tutaj:

https://typeofweb.com/2018/01/18/metody-cyklu-zycia-komponentu-react-js/

## Co złego w starych metodach?

W React wprowadzony zostaje powoli _Async Rendering_ — czyli asynchroniczne renderowanie aplikacji kawałek po kawałku przez silnik Reacta. Jest to jedna z przyczyn, dla których **w React 17 usunięte zostaną 3 metody cyklu życia**:

- `componentWillReceiveProps`
- `componentWillMount`
- `componentWillUpdate`

Nawiasem mówiąc, często te funkcje były źle rozumiane i niewłaściwie wykorzystywane:

### componentWillReceiveProps

Przykładowo, zamiast dobrej architektury komponentów, _Single Responsibility Principle_, podziału na komponenty prezentacyjne i kontenery, wiele osób wrzuca kilka odpowiedzialności do jednego komponentu, a na zmiany reaguje przez `componentWillReceiveProps`. Niedobrze. **Ta metoda powinna być wykorzystywana sporadycznie**, tylko w rzadkich przypadkach. Często niestety widzę ją w użyciu do obsługi prostego przepływu danych w aplikacji.

### componentWillMount

Bardzo powszechnym nieporozumieniem jest używanie tej metody do wykonywania zapytań do API! Wiele osób myśli, że asynchroniczne zapytanie wysłane wewnątrz funkcji `componentWillMount` zdąży zwrócić dane zanim komponent się wyrenderuje. To jednak całkowite **niezrozumienie działania Reacta**. Komponent się wyrenderuje niezależnie od tego co zrobisz w `componentWillMount`, a brak danych, na czas oczekiwania na nie, musisz obsłużyć w `render`.

Dodatkowo, przy _Async Rendering_, React nie daje gwarancji, że wywoła tę funkcję tylko raz — może to zrobić wielokrotnie. Ponadto, do samego końca nie wiadomo czy do zamontowania komponentu naprawdę dojdzie — może się bowiem zdarzyć tak, że metoda `componentWillMount` zostanie wywołana (kilka razy!), a następnie rendering zostanie przerwany (np. użytkownik kliknie "wstecz" w przeglądarce) — i tym sposobem komponent nigdy się nie zamontuje.

### componentWillUpdate

Prawdę mówiąc nigdy nie użyłem tej metody. Ale z tego co słyszałem, są osoby, które używały jej do zapisywania na boku stanu w locie w reakcji na zmianę `props`. _Coooo?_ — powinnaś teraz zapytać. Dokładnie. To nie brzmi jak dobry pomysł.
Inne zastosowania to animacje i przygotowanie na zmiany w DOM.

## Co się stanie ze starymi metodami?

Od **React 16.3** zostają wprowadzone nowe metody, które docelowo zastąpią stare:

- `UNSAFE_componentWillReceiveProps`
- `UNSAFE_componentWillMount`
- `UNSAFE_componentWillUpdate`

Jednocześnie istnieją też nadal metody z nazwami bez prefiksów — jak dotąd.

Od **React 16.x** (w bliskiej przyszłości) użycie metod bez prefiksu `UNSAFE_` spowoduje wyświetlenie ostrzeżenia w konsoli.

Od **React 17** stare metody zostaną usunięte całkowicie (tylko metody z `UNSAFE_` będą dalej działać).

Prefiks `UNSAFE_` ma zniechęcać do używania tych funkcji ;) Mam nadzieję, że skutecznie!

## Co zamiast?

Jednocześnie wprowadzone zostają 2 nowe funkcje:

- `getDerivedStateFromProps`
- `getSnapshotBeforeUpdate`

Mają one zastąpić stare metody i całkowicie pokryć zakres ich użycia. Po kolei:

### getDerivedStateFromProps

Jest to metoda **statyczna**:

```jsx
class MyComponent extends React.Component {
  static getDerivedStateFromProps(props, state) {
    // ...
  }
}
```

Jest ona wywoływana po zainstancjonowaniu komponentu, a także po jakiejkolwiek zmianie propsów (technicznie rzecz biorąc zostanie ona wywołana zawsze przy przerenderowaniu rodzica, nawet gdy propsy się nie zmieniają). Dodatkowo, od wersji 16.4, wywoływana jest ona także **zawsze przy zmianie state** komponentu. Zadaniem tej funkcji jest zwrócić obiekt reprezentujący zmiany w `state`, albo `null` jeśli zmiany w `state` nie są potrzebne.

### getSnapshotBeforeUpdate

Ta metoda zostanie wywołana tuż przed przerenderowaniem komponentu. Służy ona do przechowania jakiegoś stanu (snapshota) na czas renderowania. Tenże "snapshot" będzie dostępny jako 3 argument w funkcji `componentDidUpdate` już po przerenderowaniu:

```jsx
class MyComponent extends React.Component {
  getSnapshotBeforeUpdate(prevProps, prevState) {
    // ...
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // ...
  }
}
```

Co może być takim snapshotem? Aby Cię nakierować o jakie rzeczy chodzi: Np. pozycja scrolla w Twoim komponencie. Zapisujesz wysokość scrolla, komponent się przerenderowuje (i możliwe, że scroll się przesuwa lub jest gubiony bo zmienia się DOM), a następnie w `componentDidUpdate` przywracasz pozycję scrolla.

## Popularne przypadki użycia

Chciałbym tutaj krótko przedstawić popularne przypadki użycia starych metody i sposoby na zaimplementowanie ich z użyciem nowych.

### Zapytania do API; subskrypcje

Wspomniałem, że wiele osób próbuje robić je w `componentWillMount` z powodu braku zrozumienia działania tej metody. Zamiast tego **wykorzystaj `componentDidMount`**. Tak samo wszelkie subskrypcje — i nie zapomnij ich usunąć w `componentWillUnmount`!

```jsx
class MyComponent extends React.Component {
  componentDidMount() {
    this.subscription = subscribe(this.onSubscriptionChange);
  }

  componentWillUnmount() {
    this.subscription.cancel(); // !
  }
}
```

### Reagowanie na zmiany propsów

Załóżmy, że zawsze gdy zmieni się konkretny props, chcesz wyświetlić informację o tym użytkownikowi. Często realizowane przez funkcję `componentWillReceiveProps`. Teraz użyj `componentDidUpdate`. Początkowo może to nie być 100% intuicyjne, ale kod wszystko rozjaśnia:

```jsx
class MyComponent extends React.Component {
  componentDidUpdate(prevProps, prevState) {
    if (this.props.notification !== prevProps.notification) {
      displayNotification(this.props.notification);
    }
  }
}
```

Podobnie zaimplementujesz **pobieranie danych z API po zmianie propsów**. Sprawdź co się zmieniło i wykonaj zapytanie:

```jsx
class MyComponent extends React.Component {
  fetchData(id) {
    if (this._asyncRequest) {
      this._asyncRequest.cancel();
    }
    this._asyncRequest = someAsyncRequest(id);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.id !== prevProps.id) {
      this.fetchData(this.props.id);
    }
  }

  componentDidMount() {
    this.fetchData(this.props.id);
  }

  componentWillUnmount() {
    this._asyncRequest.cancel();
  }
}
```

### Zmiana state po zmianie propsów

To właściwie wszystko co robi funkcja `getDerivedStateFromProps`. Wyobraź sobie komponent, który dostaje listę userów jako props, a wewnątrznie może je jakoś filtrować (na podstawie słowa wpisanego w input — `state.search`). Po zmianie propsów chcemy zapisać w `state` przefiltrowanych użytkowników na podstawie obecnie wpisanego filtra:

```jsx
class MyComponent extends React.Component {
  static getDerivedStateFromProps(props, state) {
    if (props.users !== state.users) {
      return {
        filteredUsers: filterUsers(props.users, state.search),
      };
    }
    return null;
  }
}
```

## Podsumowanie

Mam nadzieję, że pomogłem Ci zaktualizować swoją wiedzę na temat **metod cyklu życia w React**. [typeofweb-courses-slogan category="React"] Pamiętaj o tym tworząc kolejne komponenty i stopniowo refaktoruj te już istniejące. Jeśli są dobrze napisane to raczej nie będzie z tym problemu. Natomiast jeśli napotkasz gdzieś wspomniane tutaj metody — to zawsze sygnał ostrzegawczy — bardzo możliwe, że z danym komponentem jest coś nie tak ;)

Jeśli chcesz na bieżąco dowiadywać się o kolejnych częściach kursu React.js to koniecznie <strong>śledź mnie na Facebooku i zapisz się na newsletter.</strong>

<div style="text-align: center; margin-bottom: 40px;">[typeofweb-mailchimp title=""]</div>
<div style="text-align: center;">[typeofweb-facebook-page]</div>

Więcej informacji: [reactjs.org/blog/2018/03/27/update-on-async-rendering.html](https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html)
