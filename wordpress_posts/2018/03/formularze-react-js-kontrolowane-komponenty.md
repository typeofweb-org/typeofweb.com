---
id: 1125
index: 69
title: Formularze w React.js — kontrolowane komponenty
date: 2018-03-06T09:14:25.000Z
isMarkdown: true
status: publish
permalink: formularze-react-js-kontrolowane-komponenty
authors:
  - michal-miszczyszyn
guid: https://typeofweb.com/?p=1125
type: post
thumbnail:
  url: https://typeofweb.com/wp-content/uploads/2018/03/pexels-photo-97558.jpeg
  width: 1920
  height: 1243
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

Dzisiaj zajmiesz się imlementacją formularzy w React.js. Już wcześniej dokonywałaś/eś interakcji z polami formularza — ale raczej w prosty sposób. Dzisiaj o formularzach kontrolowanych w React.js

## Kontrolowane formularze w React.js

Kontrolowane komponenty w React.js (_Controlled Components_) — to takie komponenty, których wewnętrzny stan jest kontrolowany przez Reacta. O czym mówię? Weźmy prosty kod:

```jsx
<input onChange={this.handleChange} />
```

Ten `input` **nie** jest kontrolowany przez Reacta dlatego, że jego zawartość jest kontrolowana tylko przez użytkownika i przeglądarkę. React na nią nie wpływa. A tutaj ten sam input, ale już kontrolowany:

```jsx
<input value={this.state.value} onChange={this.handleChange} />
```

Teraz jeśli spróbujesz coś wpisać w taki input — to aby zmiany były w ogóle widoczne, musisz też na bieżąco aktualizować wartość w `state.value`. Jakby to miało wyglądać? Jest to dość proste:

```jsx
class MyFirstForm extends React.Component {
  state = { value: '' };

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  };

  render() {
    return <input value={this.state.value} onChange={this.handleChange} />;
  }
}
```

Tym sposobem React jest **jedynym źródłem prawdy**.

## Elementy w formularzach

Przyjrzysz się teraz innym elementom, których używasz w formularzach :) Wszystkie mogą być kontrolowane:

### `select`

Tutaj warto zwrócić uwagę na dwie rzeczy:

- żaden option nie ma atrybutu `selected` znanego z HTML
- element `<select>` ma atrybut `value`

Odpowiednia wartość `value` sprawia, że React sam automatycznie wie, który element na liście jest wybrany i poprawnie renderuje formularz:

```jsx
class MyFirstForm extends React.Component {
  state = { value: 'blue' };

  render() {
    return (
      <select value={this.state.value} onChange={this.handleChange}>
        <option value="red">Czerwony</option>
        <option value="blue">Niebieski</option>
        <option value="green">Zielony</option>
      </select>
    );
  }
}
```

W powyższym przykładzie wybrany będzie Niebieski.

### `textarea`

W HTML-u element `textarea` zachowuje się nieco inaczej niż pozostałe inputy. Jego wartość określona jest przez jego dziecko, a nie przez atrybut:

```html
<textarea>Zawartość</textarea>
```

W React jest inaczej. Ustandaryzowano to i wykorzystywany jest atrybut `value`:

```jsx
<textarea value={this.state.value} />
```

Dzięki temu `textarea` możesz traktować tak jak inne pola formularza bez konieczności robienia wyjątków :)

### `checkbox` i `radio`

Te inputy mają, podobnie jak w HTML, specjalny atrybut `checked` do którego należy przekazać zmienną typu `boolean` — `true` lub `false`.

```jsx
<input type="checkbox" checked={this.state.isChecked} />
```

## Demo

Przyszedł czas na demo — przykład kontrolowanego formularza w React.js:

<p data-height="465" data-theme-id="0" data-slug-hash="mXZLwp" data-default-tab="js,result" data-user="mmiszy" data-embed-version="2" data-pen-title="Kurs React.js — niekontrolowany formularz — typeofweb.com" class="codepen">See the Pen <a href="https://codepen.io/mmiszy/pen/mXZLwp/">Kurs React.js — niekontrolowany formularz — typeofweb.com</a> by Michał Miszczyszyn (<a href="https://codepen.io/mmiszy">@mmiszy</a>) on <a href="https://codepen.io">CodePen</a>.</p>

## Podsumowanie

Przedstawiłem tutaj podstawowy sposób obsługi formularzy w React.js. W kolejnym odcinku kursu porozmawiamy o formularzach niekontrolowanych. [typeofweb-courses-slogan category="React"]

Jeśli chcesz na bieżąco dowiadywać się o kolejnych częściach kursu React.js to koniecznie <strong>śledź mnie na Facebooku i zapisz się na newsletter.</strong>

<div style="text-align: center; margin-bottom: 40px;">[typeofweb-mailchimp title=""]</div>
<div style="text-align: center;">[typeofweb-facebook-page]</div>

## Ćwiczenie

**Ćwiczenie**: Spróbuj tak zmienić obsługę formularza, aby niepotrzebne było używanie osobnej funkcji `handle…Change` dla każdego elementu.
