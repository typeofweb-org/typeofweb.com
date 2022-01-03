---
title: React + Redux — filtrowanie listy, proste selektory
date: 2018-04-23T13:37:00.000Z
isMarkdown: true
status: publish
permalink: react-redux-filtrowanie-listy-selektory
authors:
  - michal-miszczyszyn
type: post
thumbnail:
  url: >-
    /public/assets/wp-content/uploads/2018/04/redux-filtrowanie-listy-selektory2.jpeg
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
seo:
  metadesc: >-
    Jak dokładnie wygląda komunikacja pomiędzy komponentami przy użyciu Redux w
    React? W tym wpisie pokazuję jak zaimplementować filtrowanie listy przy
    użyciu Reduksa. Na dokładkę — poznasz pojęcie „selektor” i pewien ważny
    koncept w Reduksie w connect i mapStateToProps!
---

Jak dokładnie wygląda komunikacja pomiędzy komponentami przy użyciu Redux w React? W tym wpisie pokazuję jak zaimplementować filtrowanie listy przy użyciu Reduksa. Na dokładkę — poznasz pojęcie „selektor” i pewien ważny koncept w Reduksie. Do kodu!

---

## Komponenty a Redux

Komunikowanie ze sobą komponentów, które leżą blisko siebie to bułka z masłem. Do tego bynajmniej nie jest potrzebny Redux ;) Jeśli nie pamiętasz to odśwież sobie pamięć na temat [komunikacji komponentów w React](https://typeofweb.com/komunikacja-pomiedzy-komponentami-w-react-js/). Dlatego pozwolę sobie wydzielić zupełnie nowy komponent, który za zadanie będzie miał filtrowanie listy. Będzie to po prostu input ;)

W naszej prostej aplikacji może wyglądać, że nie ma to za bardzo sensu, ale wyobraź sobie, że ten komponent leży daleko od samej listy i **inny sposób komunikacji pomiędzy nimi nie jest możliwy**.

```jsx
class ContactsFilter extends React.Component {
  render() {
    return (
      <div className="ui icon fluid input">
        <input type="text" placeholder="Search..." />
        <i className="search icon" />
      </div>
    );
  }
}
```

Oto nasz komponent do filtrowania. Prosty, prawda? Teraz musimy go „wpiąć” w Reduksa.

## Akcja do filtrowania

Stwórz nową akcję o nazwie `searchContacts` i typie `SEARCH_CONTACTS`:

```javascript
export const searchContacts = (text) => ({
  type: 'SEARCH_CONTACTS',
  text,
});
```

Ta akcja będzie wysyłana po wpisaniu tekstu w pole do szukania :)

## Reducer tekstu do szukania

Stwórz nowy reducer o nazwie `contactsSearch`. Domyślnie wartością ma być pusty string (`''`), a po akcji `SEARCH_CONTACTS` powinna się ona zmienić na wpisany ciąg znaków (`text`):

```javascript
export const contactsSearch = (state = '', action) => {
  switch (action.type) {
    case 'SEARCH_CONTACTS':
      return action.text;
    default:
      return state;
  }
};
```

## Podłączenie akcji do pola

Teraz wystarczy tylko użyć nowego pola w `state` oraz emitować akcję gdy wartość tekstu się zmienia. Dodaj `value` i `onChange` do inputa:

```jsx
<input type="text" placeholder="Search..." value={this.props.contactsSearch} onChange={this.handleSearchChange} />
```

Implementacja metody `handleSearchChange` to po prostu **wywołanie odpowiedniego action creatora** z wpisaną wartością:

```javascript
handleSearchChange = (e) => {
  this.props.searchContacts(e.currentTarget.value);
};
```

Jak już pewnie wiesz z poprzedniego wpisu na temat [Redux i `connect`](https://typeofweb.com/react-redux-kurs-wprowadzenie-i-podstawy/) zarówno action creator jak i sama wartość pochodzą z funkcji `mapStateToProps` i `mapDispatchToProps`:

```jsx
import { connect } from 'react-redux';
import { searchContacts } from './actions';

// ……

const mapStateToProps = (state) => {
  return {
    contactsSearch: state.contactsSearch,
  };
};

const mapDispatchToProps = { searchContacts };

export const ContactsFilterContainer = connect(mapStateToProps, mapDispatchToProps)(ContactsFilter);
```

## Po co selektor?

Teraz cały **przepływ danych od inputa do Reduksa i z powrotem do inputa** działa prawidłowo. Musisz jeszcze tylko przefiltrować kontakty! **Zrób to w funkcji `mapStateToProps` w `App.jsx`:**

```jsx
const mapStateToProps = (state) => {
  return {
    contacts: state.contacts, // o tutaj
  };
};
```

Implementacja filtrowania nie jest trywialna i będzie to całkiem spory kawałek logiki. Dlatego **wyniesiemy ją sobie do osobnego pliku w osobnej funkcji** — zwanej **selektorem**. Po co?

- nie mieszamy logiki z przepływem danych (`mapStateToProps` ma być możliwie proste)
- **łatwiej przetestować jednostkowo** sam selektor niż mieszankę `mapStateToProps` z logiką filtrowania
- do selektorów można **dodać cache** (memoize), aby przyśpieszyć filtrowanie elementów

## Implementacja selektora

Stwórz folder `selectors`, a w nim plik `getFilteredContacts.js`. W środku taką funkcję, która jako argumenty przyjmuje kontakty oraz tekst i zwraca przefiltrowaną tablicę kontaktów:

```jsx
export const getFilteredContacts = (contacts, text) => {
  const contactsSearch = text.toLowerCase();

  return contacts.filter((contact) => {
    const { first, last } = contact.name;

    return first.toLowerCase().includes(contactsSearch) || last.toLowerCase().includes(contactsSearch);
  });
};
```

Filtrujemy tylko po imieniu i nazwisku; wielkość znaków jest ignorowana. Teraz już wystarczy, że tylko zmodyfikujesz `App.jsx`:

```jsx
const mapStateToProps = (state) => {
  return {
    contacts: getFilteredContacts(state.contacts, state.contactsSearch),
  };
};
```

## Efekt

Zobacz sam(a):

<p style="text-align: center;"><iframe src="https://www.youtube.com/embed/ZA5QAJElskI?rel=0&amp;controls=0&amp;showinfo=0&amp;autoplay=1&amp;loop=1&amp;playlist=ZA5QAJElskI" width="560" height="315" frameborder="0" allowfullscreen="allowfullscreen"></iframe></p>

Kod znajdziesz jak zwykle na moim GitHubie: [github.com/mmiszy/typeofweb-kurs-react/tree/contacts-list-3-redux](https://github.com/mmiszy/typeofweb-kurs-react/tree/contacts-list-3-redux)

## Podsumowanie

Płynnie poruszasz się po Reduksie ;) Jak Ci się podoba do tej pory? <a href="https://szkolenia.typeofweb.com/" target="_blank">zapisz się na szkolenie z React i Redux</a>.

Jak filtrowanie listy w Reduksie wypada w porównaniu do zaimplementowanego wcześniej [filtrowania statycznej listy](https://typeofweb.com/react-js-w-przykladach-filtrowanie-statycznej-listy/)? Pewnie wygląda Ci to na mnóstwo niepotrzebnego zachodu. Ale warto zauważyć, że teraz **input do wyszukiwania mógłby się znaleźć w dowolnym miejscu aplikacji**, a tekst do wyszukania nie musi przechodzić w górę i w dół przez kolejne komponenty, żeby trafić do listy. Dodatkowo zyskałaś/eś możliwość filtrowania listy na różne sposoby — np. teraz trywialne byłoby dodanie przycisku "Znajdź wszystkich o imieniu Magda".

Jeśli chcesz na bieżąco dowiadywać się o kolejnych częściach kursu React.js to koniecznie <strong>śledź mnie na Facebooku i zapisz się na newsletter.</strong>
<NewsletterForm />
<FacebookPageWidget />

## Ćwiczenie

**Ćwiczenie**: Dodaj do selektora cache (memoize). Możesz skorzystać z biblioteki `reselect`.
