---
id: 1196
index: 69
title: Formularze w React.js — niekontrolowane komponenty
date: 2018-03-20T12:13:30.000Z
isMarkdown: true
status: publish
permalink: formularze-w-react-js-niekontrolowane-komponenty
authors:
  - michal-miszczyszyn
guid: https://typeofweb.com/?p=1196
type: post
thumbnail:
  url: https://typeofweb.com/wp-content/uploads/2018/03/pexels-photo-72161.jpeg
  width: 1280
  height: 636
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
    Formularze niekontrolowane (Uncontrolled Components) w React.js. Po co
    istnieją? Jakie są ich zastosowania? Jest to druga część wpisu na temat
    formularzy w React.js — tym razem formularze tak zwane „niekontrolowane”.
    Dowiesz się do czego służą i jak ich używać!
---

Część druga formularzy w React.js — tym razem formularze tak zwane „niekontrolowane” — czyli _Uncontrolled Components_. Czym są i jak się ich używa? No i po co Ci w ogóle formularze niekontrolowane w React.js?

## Niekontrolowane formularze — _Uncontrolled Components_

W większości przypadków poleca się używanie jednak kontrolowanych formularzy. Jak już wcześniej pisałem, w kontrolowanych formularzach to React jest jedynym źródłem danych i tylko React kontroluje treść. **W formularzach niekontrolowanych**, dane są obsługiwane przez przeglądarkę (przez DOM).

## Obsługa formularzy niekontrolowanych

W poprzednim odcinku kursu, aby obsłużyć pole formularza, musiałaś/eś dodać do niego najczęściej prop `value` oraz funkcję do `onChange`. To jednak nie jest jedyne wyjście. Można też użyć `ref`.

## Czym jest `ref`

`ref` to nic innego jak referencja na element w DOM. Stworzysz ją używając props `ref` na elemencie lub komponencie i przekazując do niego funkcję:

```jsx
<input ref={(input) => (this.input = input)} />
```

Zawartość inputa będzie kontrolowana przez użytkownika, przeglądarkę i DOM. A wartość będziesz mogła/mógł pobrać na przykład dopiero gdy będzie Ci potrzebna. Modyfikując przykład z poprzedniego odcinka:

```jsx
class MyFirstForm extends React.Component {
  render() {
    return (
      <div>
        <input ref={(input) => (this.input = input)} />
        <button onClick={this.submitForm}>Submit</button>
      </div>
    );
  }

  submitForm = () => {
    console.log(this.input.value); // zawartość inputa
  };
}
```

## Domyślne wartości

W niekontrolowanym polu formularza nie możesz ustawić atrybutu `value` (bo wtedy stanie się kontrolowany ;) ). Jak więc przypisać domyślne wartości polom? Powstał do tego osobny props o nazwie `defaultValue`:

```jsx
<input ref={(input) => (this.input = input)} defaultValue="Type of Web" />
```

## Input type file

W React jest jeden wyjątek — `<input type="file" />` zawsze **musi być niekontrolowany**. Wynika to z ograniczeń samego DOM — wszak do takiego inputowi nie możemy ustawić żadnej wartości programistycznie :) Możemy ją tylko ewentualnie pobrać po tym jak użytkownik doda plik. Przykładowy formularz:

```jsx
class FileInput extends React.Component {
  render() {
    return (
      <form onSubmit={this.submitForm}>
        <label>
          <input type="file" ref={(input) => (this.fileInput = input)} />
        </label>
        <button type="submit">Submit</button>
      </form>
    );
  }

  submitForm = (e) => {
    e.preventDefault();
    console.log(this.fileInput.files[0].name);
  };
}
```

## Kontrolowane czy niekontrolowane?

Jako dobrą praktykę polecam używać **formularzy kontrolowanych** dopóki naprawdę nie potrzebujesz czegoś co dają **niekontrolowane**.
Ale **nie słuchaj mnie**. Sam(a) wyrób sobie opinię :) Poczytaj, potestuj, i koniecznie <a href="https://szkolenia.typeofweb.com/" target="_blank">zapisz się na szkolenie z React</a>.

## Demo

<CodepenWidget height="265" themeId="0" slugHash="YaWmXN" defaultTab="js,result" user="mmiszy" embedVersion="2" penTitle="Kurs React.js — niekontrolowany formularz — typeofweb.com">
<a href="http://codepen.io/mmiszy/pen/YaWmXN/">Zobacz Codepen Kurs React.js — niekontrolowany formularz — typeofweb.com</a>.
</CodepenWidget>

## Podsumowanie

Umiesz już obsługiwać formularze na różne sposoby :) Brawo Ty! A więc nie pozostało już Ci wiele do nauczenia się w React. Właściwie wiedza, którą już posiadasz powinna Ci pozwolić na tworzenie rozbudowanie aplikacji! Czas na **połączenie Reacta z innymi bibliotekami**! W kolejnym odcinku.

Jeśli chcesz na bieżąco dowiadywać się o kolejnych częściach kursu React.js to koniecznie <strong>śledź mnie na Facebooku i zapisz się na newsletter.</strong>
<NewsletterForm />
<FacebookPageWidget />

## Ćwiczenie

Przerób cały formularz z poprzedniego odcinka na niekontrolowane elementy:
[codepen.io/mmiszy/pen/mXZLwp](https://codepen.io/mmiszy/pen/mXZLwp)
