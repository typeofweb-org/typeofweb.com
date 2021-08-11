---
id: 1092
index: 64
title: Komunikacja z API w React.js
date: 2018-02-27T06:58:57.000Z
isMarkdown: true
status: publish
permalink: komunikacja-z-api-w-react-js
authors:
  - michal-miszczyszyn
guid: https://typeofweb.com/?p=1092
type: post
thumbnail:
  url: https://typeofweb.com/wp-content/uploads/2018/02/pexels-photo-194094.jpeg
  width: 1920
  height: 979
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
    Bardzo często powracającym wątkiem jest pytanie o to, w jaki sposób
    zaimplementować komunikację z API w React.js. Moja odpowiedź może Cię nieco
    zaskoczyć: React nie ma nic do tego. Możesz to robić absolutnie dowolnie.
    Pokażę jak użyć fetch do pobrania danych z REST API w React.js
---

Bardzo często powracającym wątkiem jest pytanie o to, w jaki sposób zaimplementować komunikację z API w React.js. Moja odpowiedź może Cię nieco zaskoczyć: **React nie ma nic do tego**. Możesz to robić absolutnie dowolnie.

{/_ more _/}

## Plan

Rozpatrzę teraz popularny przypadek: W momencie załadowania aplikacji, potrzebuję pobrać jakieś dane z API. Gdy już będą gotowe — chcę je wyświetlić. Brzmi dobrze? Rozbuduję więc swój poprzedni przykład: Znaną i lubianą listę kontaktów ;)

Wracam do kodu stąd:

https://typeofweb.com/2017/12/17/podzial-komponenty-react-js/

Gotowa implementacja z tej części kursu dostępna jest tutaj: [github.com/mmiszy/typeofweb-kurs-react/tree/contacts-list-1](https://github.com/mmiszy/typeofweb-kurs-react/tree/contacts-list-1)

## Przygotowanie

Nieco zmieniam tamten przykład. Przede wszystkim to komponent `App` będzie „dostarczycielem” danych do `ContactsList`. Przekaże tablicę jako `props`:

```jsx
export const App = () => {
  return (
    <div>
      <AppHeader />
      <main className="ui main text container">
        <ContactsList contacts={[]} />
      </main>
    </div>
  );
};
```

Tę tablicę za moment wypełnię danymi z API. Przykładowy obiekt z API wygląda tak:

```json
{
  "gender": "female",
  "name": { "title": "mrs", "first": "célia", "last": "lopez" },
  "location": {
    "street": "3403 rue paul-duvivier",
    "city": "dunkerque",
    "state": "var",
    "postcode": 52018
  },
  "email": "célia.lopez@example.com",
  "login": {
    "username": "purplelion429",
    "password": "spoiled",
    "salt": "nUY17qZz",
    "md5": "2660f36114ad97ebbb38729d1e1ad935",
    "sha1": "14e893bf4d76c2e6bc942846d557acc3c1fa3223",
    "sha256": "d032a528a2da82f5b9ef37d3c3277c9255fef5de73db1e979402c2ee86fe4cf2"
  },
  "dob": "1956-01-28 09:02:34",
  "registered": "2011-05-16 19:04:38",
  "phone": "04-98-07-66-00",
  "cell": "06-33-63-47-98",
  "id": { "name": "INSEE", "value": "256045054319 82" },
  "picture": {
    "large": "https://randomuser.me/api/portraits/women/80.jpg",
    "medium": "https://randomuser.me/api/portraits/med/women/80.jpg",
    "thumbnail": "https://randomuser.me/api/portraits/thumb/women/80.jpg"
  },
  "nat": "FR"
}
```

Ja chciałbym z tego wyciągnąć:

- pełne imię i nazwisko
- numer telefonu
- link do avatara
- coś unikalnego co posłuży za atrybut `key` (wymagany przy tablicach elementów)

Wymaga to tylko wyjęcia i połączenia niektórych pól:

```javascript
const avatarUrl = contact.picture.thumbnail;
const { title, first, last } = contact.name;
const name = `${title} ${first} ${last}`.trim();
const phone = contact.phone;
const key = contact.login.username;
```

Ostatecznie cały komponent:

```jsx
export class ContactsList extends React.Component {
  contactToContactItem = (contact) => {
    const avatarUrl = contact.picture.thumbnail;
    const { title, first, last } = contact.name;
    const name = `${title} ${first} ${last}`.trim();
    const phone = contact.phone;
    return <ContactItem key={key} avatarUrl={avatarUrl} name={name} phone={phone} />;
  };

  render() {
    return <ul className="ui relaxed divided list selection">{this.props.contacts.map(this.contactToContactItem)}</ul>;
  }
}
```

Nic nadzwyczajnego, to wszystko już na pewno widziałaś/eś w poprzednich odcinkach kursu. Idźmy dalej… został tylko jeden komponent, który wyświetla podane informacje:

```jsx
export const ContactItem = ({ avatarUrl, name, phone }) => {
  return (
    <li className="item">
      <img src={avatarUrl} className="ui mini image rounded" alt="" />
      <div className="content">
        <h4 className="header">{name}</h4>
        <div className="description">{phone}</div>
      </div>
    </li>
  );
};
```

**Uff!** To tyle jeśli chodzi o przygotowania.

## Pobieranie danych z REST API w React.js

Do sedna! Chcę pobierać listę kontaktów z API [randomuser.me](https://randomuser.me/documentation#howto). Potrzebne mi będzie jedno żądanie `GET`. Najprościej zrobić je przy pomocy `fetch` wbudowanego w przeglądarkę :)

Jak wspomniałem wcześniej, dobrym miejscem na wykonanie pytania do API jest funkcja `componentDidMount(…)`. Tam też umieszczę swój kod. Wykonam żądanie, poczekam na odpowiedź, a wynik zapiszę w `state`. Następnie przekażę to do komponentu `ContactsList`:

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
    return (
      <div>
        <AppHeader />
        <main className="ui main text container">
          <ContactsList contacts={this.state.contacts} />
        </main>
      </div>
    );
  }
}
```

Działa!

## Spinner na czas ładowania…

No tak, działa, ale jednak efekt nie jest idealny. Początkowo renderuje się zupełnie pusta lista, a dopiero po chwili pojawiają się dane. Zmienię to. Chcę, aby na początku wyświetlał się napis `Ładowanie…`:

```jsx
{
  contacts ? <ContactsList contacts={contacts} /> : 'Ładowanie…';
}
```

Korzystam z faktu, że wyrażenia wewnątrz `{` i `}` w JSX są wykonywane niemal jak zwykły JavaScript — i mogę tutaj użyć operatora trójoperandowego. W prawdziwej aplikacji zamiast napisu `Ładowanie…` prawdopodobnie chciałbym dodać jakiś spinner, który zamknąłbym np. w `LoadingComponent` :)

Możemy Cię nauczyć tego wszystkiego szybciej: <a href="https://szkolenia.typeofweb.com/" target="_blank">zapisz się na szkolenie z React</a>.

## Podsumowanie

Poznałaś/eś właśnie podstawowy sposób pobierania i wyświetlania danych z REST API w React.js. To nie było takie trudne, prawda? Cały kod: [github.com/mmiszy/typeofweb-kurs-react/tree/contacts-list-1](https://github.com/mmiszy/typeofweb-kurs-react/tree/contacts-list-1)

Jeśli chcesz na bieżąco dowiadywać się o kolejnych częściach kursu React.js to koniecznie <strong>śledź mnie na Facebooku i zapisz się na newsletter.</strong>
<NewsletterForm />
<FacebookPageWidget />

## Ćwiczenie

**Ćwiczenie:** Dodaj do aplikacji guzik „odśwież”, który spowoduje ponowne pobranie i wyrenderowanie listy kontaktów (dane z randomuser.me są losowe, więc za każdym razem będą inne).
