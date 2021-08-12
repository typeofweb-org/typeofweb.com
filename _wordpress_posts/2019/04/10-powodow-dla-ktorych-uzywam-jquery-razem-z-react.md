---
index: 105
title: 10 powodów, dla których używam jQuery razem z React
date: 2019-04-01T09:54:18.000Z
isMarkdown: true
status: publish
permalink: 10-powodow-dla-ktorych-uzywam-jquery-razem-z-react
authors:
  - michal-miszczyszyn
type: post
thumbnail:
  url: >-
    https://typeofweb.com/wp-content/uploads/2019/04/12008389615_d62a9dbc0b_b.jpg
  width: 936
  height: 414
categories:
  - slug: javascript
    name: JavaScript
  - slug: front-end
    name: Front-end
seo:
  focusKeywords:
    - React
    - jQuery
  metadesc: >-
    jQuery razem z React — dlaczego ich używam? Czemu warto korzystać z jQuery
    we frameworku React.js? jQuery to wspaniała biblioteka do manipulacji DOM.
---

W dobie frameworków takich jak React i bibliotek takich jak Angular, można by pomyśleć, że jQuery nie ma już prawa bytu. **Nic bardziej mylnego**! Ten najpopularniejszy dawniej framework nadal jest niezwykle przydatny w codziennej pracy!

{/_ more _/}

<p class="important">Wpis powstał z okazji 1. kwietnia 2019 r.</p>

## Ale…

Wiem co teraz myślicie: „Ale przecież wszyscy hejtują jQuery!”. No jasne, na forach i na Facebooku tak. W praktyce jednak… okazuje się, że aż [94% señor developerów używa jQuery w codziennej pracy](https://tofw.pl/4/68bb)!

Jakie są powody? Oto **10 przykładów kodu, które są znacznie krótsze i bardziej czytelne dzięki jQuery**.

## 1. Pobieranie elementów

Bez jQuery zmuszeni jesteśmy używać gołego DOM API, które bez żadnych abstrakcji zmusza do pisania bardzo długiego i nieczytelnego kodu. Wystarczy tylko porównać prosty przykład, czyli pobieranie elementów z DOM na podstawie selektorów CSS.

### DOM API:

```js
document.querySelectorAll('.klasa');
```

### jQuery:

```js
$('.klasa');
```

Dla tak krótkiego zapisu bez wątpienia warto załadować całą bibliotekę jQuery!

## 2. Dodawanie i usuwanie klas

Ewidentnie widoczna jest tutaj ogromna przewaga jQuery:

### DOM API:

```js
el.classList.add('selected');
el.classList.remove('selected');
el.classList.toggle('selected');
```

### jQuery:

```js
$(el).addClass('selected');
$(el).removeClass('selected');
$(el).toggleClass('selected');
```

## 3. Pobieranie rodzica elementu

Tutaj w szczególności widoczna jest ułomność DOM API:

### DOM API:

```js
el.parentNode;
```

### jQuery:

```js
$(el).parent();
```

## 4. Nadpisywanie treści elementu

DOM API nie mogłoby tutaj być chyba bardziej skomplikowane i mylące. jQuery sprawia, że rzeczy stają się proste:

### DOM API:

```js
el.innerHTML = 'Siema';
el.textContent = '<b>Siema</b>';
el.innerHTML;
el.textContent;
```

### jQuery:

```js
$(el).text('Siema');
$(el).html('<b>Siema</b>');
$(el).text();
$(el).html();
```

## 5. Pobieranie atrybutów

### DOM API:

```js
el.getAttribute('tabindex');
```

### jQuery:

```js
$(el).attr('tabindex');
```

## 6. Porównywanie elementów

Tutaj chyba nie muszę komentować, jak bardzo jQuery ułatwia codzienną pracę:

### DOM API:

```js
el1 === el2;
```

### jQuery:

```js
$(el1).is($(el2));
```

## 7. Nasłuchiwanie na zdarzenia

Od pisania tego w gołym DOM API nadal mam koszmary.

### DOM API:

```js
el.addEventListener('click', () => {
  /* … */
});
```

### jQuery:

```js
$(el).on('click', () => {
  /* … */
});
```

## 8. AJAX

Odejdźmy na moment od DOM API, gdyż jQuery to także przydatne abstrakcje do wykonywania między innymi Ajaksów, animacji i innych rzeczy…

### Bez jQuery:

```js
fetch('/api/users')
  .then((response) => response.text())
  .then((body) => {
    console.log(body);
  });
```

### Z jQuery:

```js
$.ajax({
  url: '/api/users',
  type: 'GET'
  success(data) {
    console.log(data);
  }
})
```

Wow, no nie? Po zobaczeniu tego kodu, pewnie nigdy więcej nie będziecie chcieli wykonywać requestów bez jQuery!

## 9. Parsowanie JSON

Tam, gdzie goły JavaScript zawodzi, jQuery jak zwykle dowodzi swojej wyższości:

### Bez jQuery:

```js
JSON.parse(json);
```

### Z jQuery:

```js
$.parseJSON(json);
```

## 10. Zmiana kontekstu funkcji

["This" w funkcjach w JavaScripcie to skomplikowana sprawa](https://typeofweb.com/2017/11/14/this-js-kontekst-wywolania-funkcji/)! Na szczęście jQuery sprawia, że bindowanie, czyli zmiana kontekstu, staje się banalne:

### Bez jQuery:

```js
fn.bind(context);
```

### Z jQuery:

```js
$.proxy(fn, context);
```

## Podsumowanie

<a href="https://szkolenia.typeofweb.com/" target="_blank">zapisz się na szkolenie z React</a>. Mam nadzieję, że tym wpisem chociaż nieco przekonałem Was, dlaczego **warto nadal używać jQuery w 2019 roku**. Oczywiście, ktoś mógłby mi zarzucić, że wybrałem tendencyjne przykłady — takie, w których **zysk z użycia jQuery jest największy**. Oczywiście! Ale na pewno są to operacje, które wykonujecie codziennie.

Nie słuchajcie nigdy fałszywych guru programowania, którzy mówią, aby odrzucać coś tylko dla zasady. jQuery jest, był i będzie znaczącym frameworkiem i wiele osób **używa go razem z React, Vue czy Angularem**. Sto lat, jQuery!
