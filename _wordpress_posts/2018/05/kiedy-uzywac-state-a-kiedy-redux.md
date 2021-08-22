---
title: Kiedy używać state, a kiedy Redux?
date: 2018-05-16T07:22:17.000Z
isMarkdown: true
status: publish
permalink: kiedy-uzywac-state-a-kiedy-redux
authors:
  - michal-miszczyszyn
type: post
thumbnail:
  url: https://res.cloudinary.com/type-of-web/wp-content/uploads/2018/05/redux-vs-setstate.jpeg
  width: 1920
  height: 1280
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

Bardzo często osoby poznające bibliotekę Redux próbują przenieść cały stan każdego komponentu do Reduksowego store'a. Czy to ma sens? Czy powinnaś całkowicie przestać używać `setState`?

## Nie ma nic złego w `state`

Naprawdę. Nie ma nic złego w używaniu `setState`.

Ale kiedy użyć `setState`, a kiedy Reduksa? W podjęciu decyzji może Cię wspomóc lista pytań pomocniczych. Znajdziesz je poniżej!

### Czy te dane dotyczą tylko jednego komponentu czy kilku?

Prosta sprawa: Czy dane są wynikiem pracy z jednym komponentem, czy też są „zbierane” z kilku? Ale także **czy w przyszłości się to zmieni?**

Stan budowany na podstawie informacji z pojedynczego komponentu może być po prostu jego `state`.

### Czy używasz danych i przekazujesz je do wielu komponentów?

A teraz czy dane z komponentu będą używane przez wiele komponentów? W różnych częściach aplikacji? Czy potencjalnie mogą być potrzebne gdzieś poza ścisłym sąsiedztwem tego komponentu?

Jeśli korzystasz z tych samych informacji w wielu miejscach to, chociażby ze względu na wygodę, mogą być one w storze. Jeśli nie — może być `state`.

### Czy na podstawie tych danych wyliczasz jakieś inne wartości?

Przykładowo, masz listę kontaktów. Czy będziesz potrzebowała listy „ulubionych kontaktów”? Jedna bez wątpienia ma związek z drugą. Nie ma sensu duplikować pełnych informacji o kontaktach. Ale trudno byłoby to zrealizować w oparciu o lokalny `state` — a więc raczej Redux :)

### Czy przydatne może być zapisanie i odtworzenie tych danych, np. w celu debugowania?

Są takie newralgiczne miejsca w aplikacji, które są podatne na błędy. Wymodelowanie przepływu danych w takich miejscach z użyciem reducerów zdecydowanie ułatwi Ci zrozumienie i naprawienie ewentualnych bugów w przyszłości. Dodatkowo, w celu odtworzenia błędu, możesz logować wszystkie akcje, które wykonuje użytkownik — a następnie łatwo je odtworzyć!

### Czy chcesz cache'ować te dane, aby były zachowane np. po przeładowaniu strony przez użytkownika?

Cache każdego stanu lokalnego komponentu rzadko ma sens. Ale już stanu globalnego aplikacji tak. W przypadku użycia Reduksa jest to także banalnie łatwe! Zastanów się czy teraz lub w przyszłości Twoje dane powinny się zapisywać (np. w `localStorage`) czy nie.

## To Redux czy state?

To tylko pomocnicza lista. Żadna z odpowiedzi nie jest definitywna, ale może skłaniać Cię w kierunku podjęcia takiej lub innej decyzji. Zapamiętaj jedno: **nie ma nic złego w `setState`**, także gdy używasz Reduksa. <a href="https://szkolenia.typeofweb.com/" target="_blank">zapisz się na szkolenie z React i Redux</a>.

Jeśli chcesz na bieżąco dowiadywać się o kolejnych częściach kursu React.js to koniecznie <strong>śledź mnie na Facebooku i zapisz się na newsletter.</strong>
<NewsletterForm />
<FacebookPageWidget />
