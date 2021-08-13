---
index: 57
title: Tworzenie aplikacji React.js dzięki create-react-app
date: 2018-01-29T15:19:49.000Z
isMarkdown: false
status: publish
permalink: tworzenie-aplikacji-react-js-dzieki-create-react-app
authors:
  - michal-miszczyszyn
type: post
thumbnail:
  url: https://typeofweb.com/wp-content/uploads/2018/01/pexels-photo-281260.jpeg
  width: 1920
  height: 1271
categories:
  - slug: javascript
    name: JavaScript
  - slug: front-end
    name: Front-end
series:
  slug: react-js
  name: React.js
seo:
  metadesc: "create-react-app\_to paczka pozwalająca na łatwe stworzenie projektu opartego o React.js. Tworzy dla Ciebie strukturę katalogów i plików, zawiera wszystkie potrzebne na początek narzędzia i pozwala na uruchamianie, testowanie i budowanie aplikacji. Czego chcieć więcej?"
---

Do tej pory pokazałem kilka przykładów z React.js, a wszystkie wrzuciłem na codepen. Jak się pewnie domyślasz, <strong>tworzenie rozbudowanych aplikacji wygląda nieco inaczej</strong>. Dzielisz je na wiele plików, chcesz odpalać testy jednostkowe, a ostatecznie chciałabyś kod zminifikować.  <code>create-react-app</code> to paczka pozwalająca na łatwe stworzenie projektu opartego o React.js. Tworzy dla Ciebie strukturę katalogów i plików, zawiera wszystkie potrzebne na początek narzędzia i pozwala na odpalanie, testowanie i budowanie aplikacji. <strong>Czego chcieć więcej?</strong>

{/_ more _/}

<h2>Początek z <code>create-react-app</code></h2>

<p class="important">Zakładam, że znasz podstawy pracy z <code>node</code> i masz zainstalowany <code>npm</code> przynajmniej 5.2 lub nowszy.</p>

Tego wszystkiego i znacznie więcej nauczymy Cię na szkoleniu: <a href="https://szkolenia.typeofweb.com/" target="_blank">zapisz się na szkolenie z React</a>.

Pracę z <code>create-react-app</code> zaczynamy od wrzucenia na głęboką wodę. Hop, robimy od razu projekt w React:

<pre class="language-bash"><code>npx create-react-app react-test-create-react-app</code></pre>

<pre class="language-bash"><code>Creating a new React app in /Users/michal/htdocs/react-test-create-react-app.

Installing packages. This might take a couple of minutes.
Installing react, react-dom, and react-scripts...</code></pre>

Jak widzisz — instalują się paczki, których nazwy brzmią znajomo — <code>react</code> i <code>react-dom</code>. Dalej jest trochę więcej logów… i wreszcie <strong>instalacja zakończona, projekt stworzony</strong>! Gotowe. To już.

<h2>Narzędzia</h2>

Po zakończeniu instalacji, Twoim oczom ukazuje się instrukcja z komendami, z których możesz korzystać. Wejdź do folderu <code>react-test-create-react-app</code> i wtedy możesz korzystać z takich poleceń:

<ul>
    <li><code>npm start</code> — uruchamia serwer deweloperski — będziemy z tego polecenia korzystać najczęściej</li>
    <li><code>npm run build</code> — buduje wersję produkcyjną gotowej aplikacji — ten kod wrzucasz na serwer</li>
    <li><code>npm test</code> — odpala testy</li>
    <li><code>npm run eject</code> — usuwa <code>create-react-app</code> i kopiuje wszystkie pliki konfiguracyjne do projektu. Dzięki temu możesz je dowolnie zmodyfikować, ale nie będziesz już mógł korzystać z aktualizacji do <code>create-react-app</code>. Na razie tego nie używaj :)</li>
</ul>

Hej, to nie było takie straszne, prawda? Wydaje się nawet całkiem… proste? Tak!

<h2>Odpalamy</h2>

Wpisz więc <code>npm start</code>. Uruchamia się serwer i automatycznie otwiera się http://localhost:3000 w przeglądarce. Powinnaś/powinieneś widzieć taki ekran:

<a href="https://typeofweb.com/wp-content/uploads/2018/01/Screen-Shot-2018-01-10-at-4.16.50-PM.png"><img class="aligncenter size-full wp-image-942" src="https://typeofweb.com/wp-content/uploads/2018/01/Screen-Shot-2018-01-10-at-4.16.50-PM.png" alt="create-react-app starter" width="974" height="664" /></a>

Jeśli to widzisz — wszystko poszło zgodnie z planem :)

Spójrz na widoczny komunikat — możesz już zacząć edytować plik <code>src/App.js</code>, a gdy go zapiszesz, <strong>przeglądarka automatycznie się odświeży i zmiany będą od razu widoczne</strong>. Bardzo wygodne :) Zajrzyj do środka tego pliku, jest tam gotowy jeden komponent <code>App</code>.

<h2>Błędy</h2>

Spróbuj edytować <code>App.js</code> i zrób jakiś błąd. Nie wiem, jakikolwiek, np. zamiast <code>&lt;div</code> napisz <code>&lt;&lt;div</code> i zapisz plik. Spójrz do przeglądarki:

<a href="https://typeofweb.com/wp-content/uploads/2018/01/Screen-Shot-2018-01-10-at-5.45.10-PM.png"><img class="aligncenter size-full wp-image-954" src="https://typeofweb.com/wp-content/uploads/2018/01/Screen-Shot-2018-01-10-at-5.45.10-PM.png" alt="create-react-app error" width="910" height="546" /></a>

A teraz spójrz do konsoli:

<a href="https://typeofweb.com/wp-content/uploads/2018/01/Screen-Shot-2018-01-10-at-5.46.07-PM.png"><img class="aligncenter size-large wp-image-955" src="https://typeofweb.com/wp-content/uploads/2018/01/Screen-Shot-2018-01-10-at-5.46.07-PM-1024x445.png" alt="create-react-app error" width="1024" height="445" /></a>

<code>create-react-app</code> automatycznie informuje Cię o wszystkich błędach składniowych — zarówno w przeglądarce, jak i w konsoli. <strong>Błędy są bardzo czytelnie oznaczone i konkretnie widać co jest do poprawy.</strong>

<h2>Testy</h2>

Uruchom <code>npm test</code>. Zobaczysz taki rezultat:

<a href="https://typeofweb.com/wp-content/uploads/2018/01/Screen-Shot-2018-01-10-at-4.39.13-PM.png"><img class="aligncenter size-full wp-image-944" src="https://typeofweb.com/wp-content/uploads/2018/01/Screen-Shot-2018-01-10-at-4.39.13-PM.png" alt="create-react-app test" width="830" height="340" /></a>

W folderze z aplikacją jest plik <code>App.test.js</code>. Zawiera jeden test. Ten test sprawdza czy komponent renderuje się prawidłowo — i jak widzisz, działa :) <strong>W jednym z kolejnych wpisów przyjrzę się bliżej testowaniu komponentów Reactowych</strong> z użyciem <code>enzyme</code>, którego na razie tutaj brakuje.

<h2>Build</h2>

A teraz spróbuj <code>npm run build</code>. Po chwili zobaczysz komunikat informujący, że wszystko przebiegło pomyślnie oraz rozmiary i nazwy wygenerowanych plików. Nazwy zawierają pewien trochę losowy ciąg (hasz), np. w moim przypadku jest to <code>main.35d639b7.js</code> i <code>main.c17080f1.css</code>. Jeśli zmienisz coś w tych plikach, <strong>nazwy również się zmienią</strong> — dzięki czemu nie masz problemów z cachem przeglądarek (tzw. <em>cache busting</em>).

W folderze <code>build</code> znajdziesz gotowy projekt, który możesz wrzucić na serwer i przetestować (albo po prostu odpalić lokalnie).

<h2>Co dalej?</h2>

W zasadzie to już wszystko co jest Ci potrzebne do pracy! Oczywiście <code>create-react-app</code> ma mnóstwo innych opcji, ale tutaj nie będę wszystkich opisywał :) Jeśli będą Ci potrzebne — wspomnę o nich w kolejnych wpisach!

<h2>FAQ</h2>

<dl>
    <dt>Skąd się wzięły <code>import</code> i <code>export</code> w tym kodzie i dlaczego działają?</dt>
    <dd>Moduły ECMAScript są teraz wygodnym i preferowanym sposobem pracy z React. Działają w <code>create-react-app</code> dlatego, że pod maską zaprzęgnięty do pracy jest <code>babel</code>. Nie myśl o tym na razie. Po prostu działa :)</dd>
    <dt>Czy zapis <code>import React from 'react'</code> jest poprawny?</dt>
    <dd>Nie. Pisałem o tym już w <a href="https://typeofweb.com/klasy-jako-komponenty-react-js/#comment-3670829647">jednym z komentarzy</a>: Taki zapis jest możliwy i <strong>działa tylko z Babelem i tylko przy włączonym odpowiednim presecie</strong>! Wynika to z tego, że React nie jest napisany z użyciem modułów ES i nie ma <code>export default</code>. Prawidłowy import, biorąc pod uwagę istniejący kod reacta, wygląda tak: <code>import * as React from 'react'</code></dd>
    <dt>Co robi i jak działa <code>import './App.css';</code>?</dt>
    <dd>To jeden ze sposobów łączenia CSS z Reactem. Jest ich jeszcze kilka i omówię wszystkie w jednym z kolejnych wpisów. Na razie musisz tylko wiedzieć, że ten zapis powoduje, że style są tak jakby dodawane do jednego arkusza styli.</dd>
    <dt>Czemu po zbudowaniu plik <code>main.js</code> waży więcej od moich plików z kodem?</dt>
    <dd>Pamiętaj, że dołączone są do niego React i React-Dom (a także inne paczki, z których korzystasz).</dd>
    <dt>Stworzyłem aplikację i chciałbym ją wrzucić na jakiś serwer. Jak mogę to zrobić?</dt>
    <dd>Najłatwiej będzie Ci użyć GitHub Pages (bo korzystasz z GitHuba, prawda?). Przejrzyj ten fragment dokumentacji: <a href="https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#github-pages">create-react-app/README.md#github-pages</a></dd>
    <dt>Co jeśli wyjdzie jakaś łatka / zmiana w <code>create-react-app</code>?</dt>
    <dd>Zastosuj się do instrukcji pod konkretną wersją w <a href="https://github.com/facebookincubator/create-react-app/blob/master/CHANGELOG.md">create-react-app/CHANGELOG.md</a>. Najczęściej wystarczy tylko zaktualizować <code>react-scripts</code> i już :)</dd>
</dl>

Jeśli chcesz na bieżąco śledzić kolejne części kursu React.js to koniecznie <strong>śledź mnie na Facebooku i zapisz się na newsletter.</strong>

<NewsletterForm />

<FacebookPageWidget />

<h2>Ćwiczenie</h2>

<strong>Ćwiczenie:</strong> Stwórz nowy projekt z użyciem <code>create-react-app</code>. Spróbuj zaimplementować filtrowanie, które pokazywałem w poprzednim odcinku kursu.

<strong>Ćwiczenie\*:</strong> Zrób build i wrzuć projekt na GitHub Pages. Pochwal się w komentarzu :)
