---
id: 1022
index: 58
title: React.js na GitHub Pages dzięki create-react-app
date: 2018-01-31T16:14:36.000Z
isMarkdown: false
status: publish
permalink: react-js-na-github-pages-dzieki-create-react-app
authors:
  - michal-miszczyszyn
guid: https://typeofweb.com/?p=1022
type: post
thumbnail:
  url: https://typeofweb.com/wp-content/uploads/2018/01/pexels-photo-405031.jpeg
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
seo:
  metadesc: "create-react-app pozwala na łatwe tworzenie aplikacji React.js. Ale posiada też nieco ukrytą funkcję: Prosty deploy na GitHub Pages. GitHub Pages jest idealnym miejscem dla prostych aplikacji, dem i Twojego portfolio! W tym wpisie pokazuję\_jak łatwo zrobić deploy aplikacji React.js (create-react-app) na GitHub Pages."
---

Bardzo często początkujący pytają mnie gdzie mogą łatwo wrzucić nieco bardziej rozbudowany projekt, żeby go pokazać. Nie mają swojego hostingu, na Codepenie nie będzie to wygodne jeśli aplikacja podzielona jest na wiele plików. Co robić? Zazwyczaj odpowiadam: <strong>GitHub Pages.</strong>

<h2>GitHub Pages</h2>

GitHub Pages to specyficzny rodzaj hostingu. Pozwala Ci hostować i udostępnić innym to, <strong>co wrzucisz do repozytorium na GitHubie</strong>. Wystarczy tylko włączyć jedną opcję w ustawieniach repo i już:

<a href="https://typeofweb.com/wp-content/uploads/2018/01/Screenshot-2018-01-29-20.11.18.png"><img class="aligncenter size-large wp-image-1023" src="https://typeofweb.com/wp-content/uploads/2018/01/Screenshot-2018-01-29-20.11.18-1024x803.png" alt="GitHub Pages i create-react-app" width="1024" height="803" /></a>

A więc jeśli stworzysz sobie repozytorium <code>github.com/imię/nazwa</code> to Twój GitHub Pages będzie dostępne pod adresem <code>imię.github.io/nazwa</code>. <strong>Można też ustawić własną domenę.</strong>

GitHub Pages umożliwia też stworzenie strony nie dla repozytorium, ale <strong>dla Twojego konta na GitHubie</strong>. Wystarczy, że stworzysz repozytorium o nazwie <code>nazwa.github.io</code> i skonfigurujesz GitHub Pages na nim. Będzie to też adres Twojej strony. Podobnie tworzy się też <strong>GitHub Pages dla organizacji</strong>.

Wszystko to możemy Ci wyjaśnić też na szkoleniu. <a href="https://szkolenia.typeofweb.com/" target="_blank">zapisz się na szkolenie z React</a>.

<h2>create-react-app i GitHub Pages</h2>

W poprzednim wpisie z serii kursu React.js wspomniałem, że <code>create-react-app</code> umożliwia automatyczne publikowanie aplikacji na GitHub Pages. Czy to naprawdę takie proste? Postanowiłem to samemu przetestować i podzielić się wrażeniami. <strong>Spojler: Tak, to naprawdę mega łatwe :P</strong>

Jeśli masz już gotową appkę i repozytorium na GitHubie, to przede wszystkim dodaj wszystko, zrób commita i pusha ;) Jeśli to już gotowe to teraz tak:

<h3>1. Dodaj <code>homepage</code> do <code>package.json</code></h3>

Musisz dodać nowe pole <code>homepage</code> do Twojego pliku <code>package.json</code>. To pole powinno zawierać adres GitHub Pages, na które wrzucasz dany projekt. A więc we wspomnianym wcześniej przykładzie, będzie to:

<pre class="language-json"><code>{
  "homepage": "https://imię.github.io/nazwa",
  …
}</code></pre>

<h3>2. Zainstaluj paczkę i dodaj skrypty</h3>

Zainstaluj pomocniczą paczkę <code>gh-pages</code>. Jest to proste narzędzie do publikowania rzeczy na GitHubie. Jedno polecenie: <code>npm install --save gh-pages</code>

Następnie dodaj dwa nowe skrypty do swojego <code>package.json</code>:

<pre class="language-json"><code>{
  "scripts": {
      "predeploy": "npm run build",
      "deploy": "gh-pages -d build",
      …
  }
}</code></pre>

<h3>3. Zrób deploy</h3>

Tak, to naprawdę już ;) Prawie gotowe. Wywołaj tylko <code>npm run deploy</code>.

<h3>4. Skonfiguruj GitHub Pages</h3>

Ustaw, aby GitHub Pages korzystało ze stworzonego właśnie brancha <code>gh-pages</code>. U mnie wygląda to tak jak na pierwszym obrazku:

<a href="https://typeofweb.com/wp-content/uploads/2018/01/Screenshot-2018-01-29-20.11.18.png"><img class="aligncenter size-medium wp-image-1023" src="https://typeofweb.com/wp-content/uploads/2018/01/Screenshot-2018-01-29-20.11.18-300x235.png" alt="GitHub Pages i create-react-app" width="300" height="235" /></a>

<h2>Rezultat?</h2>

Gotowe! Efekt możesz zobaczyć u mnie: <a href="https://mmiszy.github.io/typeofweb-kurs-react">mmiszy.github.io/typeofweb-kurs-react</a>

Jeśli chcesz na bieżąco śledzić kolejne części kursu React.js to koniecznie <strong>śledź mnie na Facebooku i zapisz się na newsletter.</strong>

<NewsletterForm />

<FacebookPageWidget />

<h2>Ćwiczenie</h2>

<strong>Ćwiczenie:</strong> Jeśli już testowałaś/eś GitHub Pages, to spróbuj <a href="https://www.netlify.com/">Netlify</a> albo <a href="https://zeit.co/now">Now</a>, albo z innego hostingu. Podziel się wrażeniami w komentarzu :)
