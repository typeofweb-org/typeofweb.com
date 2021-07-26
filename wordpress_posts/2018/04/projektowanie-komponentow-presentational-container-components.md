---
id: 1457
index: 81
title: 'Projektowanie komponentów: Presentational & Container Components'
date: 2018-04-30T19:53:07.000Z
isMarkdown: true
status: publish
permalink: projektowanie-komponentow-presentational-container-components
authors:
  - michal-miszczyszyn
guid: https://typeofweb.com/?p=1457
type: post
thumbnail:
  url: >-
    https://typeofweb.com/wp-content/uploads/2018/04/presentational-container-components2.jpg
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
Często w różnych artykułach poświęconych Reactowi i Reduksowi napotkasz takie sformułowania jak _Presentational and Container Components_ albo _Skinny and Fat Components_ albo _Dumb and Smart Components_ i być może jeszcze kilka innych podobnych ;) Wszystkie te określenia oznaczają to samo: Podział komponentów na 2 rodzaje: Służące prezentacji oraz zawierające logikę.

<!--more-->

## Presentational Components
Bardzo lubię określenie _dumb_, bo ono naprawdę oddaje sedno takich komponentów. To komponenty głupie. Obchodzi je tylko **jak rzeczy wyglądają**.

Komponent prezentacyjny definiuje to jak coś wygląda. Może zawierać inne komponenty, na pewno będzie też zawierał inne elementy HTML. Co istotne: Nie zależy od zewnętrznych serwisów ani części aplikacji. Nie wykonuje żądań do API. Nie wie co to Redux. Nie korzysta z akcji. Nie mutuje danych.

Komponent głupi czasem może mieć swój stan (w sensie `setState`), ale jest to stan lokalny, związany z interfejsem.

## Container Components
Robią wszystko to, czego nie robią komponenty prezentacyjne ;) Definiują to **jak rzeczy działają**.

Taki mądry komponent definiuje sposób działania aplikacji. Logikę biznesową. Może zawierać inne komponenty, albo (rzadziej) jakieś proste elementy HTML, ale nie definiuje wyglądu. Dostarcza dane oraz callbacki do komponentów prezentacyjnych. Wywołuje akcje, pobiera dane z API, korzysta ze `store` Reduksa.

## Po co?
Jest kilka powodów, aby dzielić komponenty w taki sposób:

* _Single Responsibility Principle_ — jedna z najważniejszych zasad w architekturze aplikacji. Jeden komponent jest źródłem informacji, a inny wie jak coś ma wyglądać. Podział odpowiedzialności.
* Testowalność — komponenty prezentacyjnie testuje się banalnie. **Nie musisz praktycznie niczego mockować**. Dostarczasz dane, robisz _shallow rendering_ i sprawdzacz czy elementy się poprawnie wyrenderowały.
* Reużywalność (zabijcie mnie za to słowo) — Komponenty prezentacyjne można bardzo łatwo użyć w różnych miejscach, w różnych kontekstach. Przykładowo, jeśli masz komponent, który renderuje kafelki z miniaturkami filmów, to możesz go łatwo użyć na stronie głównej do wyświetlanie najnowszych filmów i na stronie profilu użytkownika do wyświetlenia polubionych przez nią filmów. To ten sam komponent, tylko dwa różne źródła danych (dwa różne _Container Components_).
* Łatwość tworzenia styleguida albo storybooków — Komponenty prezentacyjne mogą bez problemu istnieć zupełnie poza całą aplikacją, jeśli tylko otrzymają poprawne dane jako propsy. Dzięki temu można stworzyć prostą stronkę, na której designerki będą mieli wyrenderowane wszystkie komponenty i będą mogli je dopracowywać i testować.

## Przykład
Jak to wygląda w praktyce? Weźmy wspomniany wcześniej przykład z filmami. Chcemy renderować ich listę pobraną z API:

```jsx
class MoviesList extends React.Component {
  state = { movies: [], isLoading: false };

  componentDidMount() {
    this.setState({ isLoading: true });
    fetch("/api/movies")
      .then(res => res.json())
      .then(movies => this.setState({ movies, isLoading: false }))
  }

  render() {
    if (this.state.isLoading) {
      return <p>Ładowanie…</p>;
    }

    return (
      <ul>
        {this.state.movies.map(movie => <li>{movie.title}</li>)}
      </ul>
    );
  }
}
```

Ten komponent bez wątpienia robi zbyt wiele rzeczy: Pobiera dane z API, a następnie je renderuje. Do tego, jest on na stałe związany z konkretną końcówką API — a więc użycie listy filmów na stronie profilu użytkownika jest niemożliwe bez duplikacji kodu! **To nie powinno w ogóle przejść _code review_**! Należałoby go podzielić na dwa osobne komponenty: _Dumb_ i _Smart_:

```jsx
class MoviesList extends React.Component {
  render() {
    if (this.props.isLoading) {
      return <p>Ładowanie…</p>;
    }

    return (
      <ul>
        {this.props.movies.map(movie => <li>{movie.title}</li>)}
      </ul>
    );
  }
}
```

```jsx
class MoviesListContainer extends React.Component {
  state = { movies: [], isLoading: false };

  componentDidMount() {
    this.setState({ isLoading: true });
    fetch("/api/movies")
      .then(res => res.json())
      .then(movies => this.setState({ movies, isLoading: false }))
  }

  render() {
    return <MoviesList movies={this.state.movies} isLoading={this.state.isLoading} />
  }
}
```

Teraz bez problemu komponent `MoviesList` może być użyty w kilku miejscach niezależnie, z różnymi danymi!

## Od czego zacząć?
Przede wszystkim: Nie utrudniaj sobie życia. Chodzi o to, aby kod uprościć, a nie na siłę komplikować.

Pisz kod tak, jak lubisz — a dopiero gdy zaczniesz dostrzegać korzyści płynące z podziału na komponenty _Presentational_ i _Container_ — wtedy zacznij ich używać ;) **To nie jest kult. To rozsądek.**

## Redux
A jak to się ma do Reduksa? Jeśli używasz Reduksa to naturalnie automatycznie tworzysz dwa rodzaje komponentów. **Praktycznie cały Twój kod to tak naprawdę komponenty prezentacyjne**. Funkcja `connect` bierze taki komponent i zwraca nic innego jak właśnie _Container Component_! Przywołując przykład z poprzedniego wpisu:

```jsx
// to jest Twój komponent prezentacyjny — zauważ, że korzysta tylko z przekazanych propsów!
class ContactsFilter extends React.Component {
  render() {
    return (
      …
    );
  }

  handleSearchChange = e => {
    this.props.searchContacts(e.currentTarget.value);
  };
}

// tutaj tworzony jest Container Component:
const mapStateToProps = state => {
  return {
    contactsSearch: state.contactsSearch
  };
};

const mapDispatchToProps = { searchContacts };

export const ContactsFilterContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactsFilter);
```

Czy teraz ma to sens? [typeofweb-courses-slogan category="React i Redux"]

Jeśli chcesz na bieżąco dowiadywać się o kolejnych częściach kursu React.js to koniecznie <strong>śledź mnie na Facebooku i zapisz się na newsletter.</strong>
<div style="text-align: center; margin-bottom: 40px;">[typeofweb-mailchimp title=""]</div>
<div style="text-align: center;">[typeofweb-facebook-page]</div>

## Ćwiczenie
**Ćwiczenie:** Zrefaktoruj plik [App.jsx](https://github.com/mmiszy/typeofweb-kurs-react/blob/contacts-list-3-redux/src/App.jsx) z poprzedniego odcinka. Zmień go tak, aby podział na komponenty _smart_ i _dumb_ był zachowany również tutaj. Podziel się kodem w komentarzu!
