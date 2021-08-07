---
id: 1207
index: 72
title: 'Odpowiadam na pytania: props, nawiasy klamrowe, funkcje vs klasy, import react'
date: 2018-03-26T15:12:56.000Z
isMarkdown: true
status: publish
permalink: odpowiadam-na-pytania-props-nawiasy-klamrowe-funkcje-vs-klasy-import-react
authors:
  - michal-miszczyszyn
guid: https://typeofweb.com/?p=1207
type: post
thumbnail:
  url: https://typeofweb.com/wp-content/uploads/2018/03/pexels-photo-433108.jpeg
  width: 1280
  height: 720
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

Kolejna seria Waszych pytań i moich odpowiedzi na temat React. W komentarzach i na fejsie pojawia się ich mnóstwo, staram się wyłapywać, zapisywać i kompilować w postaci artykułu. Oto one :)

## Wasze pytania i odpowiedzi

### Jaka jest różnica pomiędzy `props="{login}"` a `props={login}`?

To co wpiszesz wewnątrz `""` będzie **traktowane jako ciąg znaków**. A więc `props="{login}"` spowoduje przekazanie do komponentu ciągu znaków `"{login}"`.

Drugia wersja, czyli `props={login}` używa innej składni — nawiasy klamrowe mówią tutaj, że **to co zostanie w nie wpisane, będzie wykonane jak kod JavaScript**. A więc moglibyśmy napisać `props={1+2}` i otrzymać wartość 3. Albo `props={() => {}}` i przekazać funkcję.

A wracając do naszego przykładu: `props={login}` spowoduje ewaluację tego co jest zawarte w zmiennej `login` i przekazanie jej wartości.

### Czy jak tworzę bezstanowy komponent to lepiej korzystać z klas czy funkcji?

Z funkcji. Albo z klas. Cokolwiek działa dla Ciebie. **Keep it simple!**
Są argumenty za jednym i drugim. Umówcie się z zespołem na spójną wersję i tego używajcie :)

### Czym się różnią `import React from 'react'` i `import * as React from 'react'`?

Zapis

```javascript
import React from 'react';
```

**nie jest całkowicie poprawny**. Jest możliwy i działa tylko z Babelem i tylko przy włączonym odpowiednim presecie! Wynika to z tego, że React nie jest napisany z użyciem modułów ES i **nie ma `export default`**.

Prawidłowy import, biorąc pod uwagę istniejący kod Reacta, wygląda tak:

```javascript
import * as React from 'react';
```

Zadziała on zarówno z Babelem z presetem, bez presetów, a także w TypeScripcie.

### Czy mogę pisać `import { Component } from 'react'`?

Całkowicie poprawne jest użycie

```javascript
import { Component } from 'react';
```

Nie ma w tym nic złego i wiele osób poleca taki zapis. Jednak, przynajmniej na razie, JSX wymaga, aby w danym zakresie był zaimportowany React. Więc ostatecznie musimy mieć takie dwie linijki:

```javascript
import * as React from 'react';
import { Component } from 'react';
```

Dla wielu osób nie ma to sensu, więc rezygnują z drugiego importu i zamiast tego używają `React.Component`.

## Masz pytanie?

Na dziś to wszystko. Jeśli masz jakiekolwiek pytania — **nawet te najprostsze** — śmiało zadawaj je w komentarzach pod wpisami 🙂 Chętnie na wszystkie odpowiem! <a href="https://szkolenia.typeofweb.com/" target="_blank">zapisz się na szkolenie z React</a>.
