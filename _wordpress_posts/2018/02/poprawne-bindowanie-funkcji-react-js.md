---
index: 61
title: Poprawne bindowanie funkcji w React.js
date: 2018-02-16T15:34:32.000Z
isMarkdown: false
status: publish
permalink: poprawne-bindowanie-funkcji-react-js
authors:
  - michal-miszczyszyn
type: post
thumbnail:
  url: https://typeofweb.com/wp-content/uploads/2018/01/pexels-photo-70862.jpeg
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
  metadesc: >-
    Wywołanie metody klasy w React.js z render kończy się źle, o ile nie użyjesz
    bind. Wspominałem też o tym w kursie i sam używałem po prostu bind w czasie
    renderowania. Ale czy to dobre rozwiązanie? Co z wydajnością i czytelnością
    takiego kodu? W tym wpisie pokazuję problemy i ich rozwiązania: bind i arrow
    functions.
---

Jak pewnie zauważyłaś/eś — wywołanie metody klasy w React.js z poziomu funkcji <code>render</code> kończy się źle, o ile nie użyjesz <code>bind</code>. Wspominałem też o tym w kursie i sam używałem po prostu <code>bind</code> w czasie renderowania. Ale czy to dobre rozwiązanie? Co z wydajnością i czytelnością takiego kodu?

{/_ more _/}

<h2><code>bind</code> w ogóle</h2>

Zacznijmy może w ogóle od tego po co Ci <code>bind</code> i co ta funkcja robi ;) Otóż w JS-ie metody tak naprawdę nie są metodami, tylko funkcjami. Pewnie myślisz: cooo, co to za różnica? Już wyjaśniam, najlepiej na prostym przykładzie:

<pre class="language-javascript"><code>const obj = {
  value: 'some value',
  method() { return this.value; }
};
obj.method(); // "some value"

const x = obj.method;
x(); // undefined</code></pre>

Czemu tak się dzieje? Po przypisaniu do nowej zmiennej, funkcja <code>method</code> „nie pamięta” już, że była kiedyś częścią obiektu i wewnątrz niej jej <code>this</code> się zmienia — nie wskazuje już na obiekt. Więcej o tym możesz doczytać tutaj:

https://typeofweb.com/this-js-kontekst-wywolania-funkcji/

<h2>Jak to się ma do React.js</h2>

Ale w React.js zawsze używasz <code>{this.myFunction}</code> więc mogłoby by się wydawać, że kontekst powinien być zachowany, no nie? Pomyśl o tym (i przeczytaj linkowany wyżej artykuł). Nie wywołujesz tej funkcji w tym miejscu, tylko przekazujesz <code>this.myFunction</code> do atrybutu… to tak jakbyś zrobił(a) <code>const prop = this.myFunction</code> a następnie wywołał(a) <code>prop(…)</code> — oryginalny kontekst jest gubiony.

<h2>Co z tym zrobić?</h2>

Funkcję możemy sobie <em>zbindować</em> do konkretnego kontekstu. Dokładnie tak jak pokazywałem wcześniej w wielu przykładach. Robiłem to tak:

<pre><code>&lt;input onInput={this.filterUsers.bind(this)} /&gt;</code></pre>

<strong>Ale to nie jest najlepsze rozwiązanie.</strong> Jest przynajmniej kilka powodów:

<ol>
    <li>Ta składnia powoduje, że <strong>przy każdym renderze Tworzona jest nowa funkcja</strong>. To może być problem dla wydajności, szczególnie gdy budujesz coś skomplikowanego albo renderujesz 30+ razy na sekundę. A nawet jeśli nie, to nadal Twój instynkt powinien Ci podpowiadać: „Po co to robić? To niepotrzebne.”</li>
    <li>Z faktu, że tworzona jest nowa funkcja wynika też pewien problem specyficzny dla Reacta — od razu unicestwia to wszelkie automatyczne mechanizmy poprawiające wydajność komponentów! A to już może być problem. <code>shouldComponentUpdate</code> i <code>PureComponent</code> (o których będę pisał w przyszłości) nie poradzą sobie z <code>bind</code> w <code>render</code>. <strong>Tworzona jest nowa funkcja, więc dla Reacta wygląda to tak, jakby to była inna funkcja — a więc renderuje on cały komponent na nowo. Za każdym razem.</strong></li>
    <li>Nie ma punktu trzeciego ;)</li>
</ol>

Najlepiej więc poznać od razu dobre praktyki i je wprowadzić w życie. Czym skorupka za młodu nasiąknie…

<h2>Bind w konstruktorze</h2>

Jednym z rozwiązań jest wykonywanie <strong>bind w konstruktorze klasy</strong>. Jest to popularne wyjście z sytuacji chyba głównie dlatego, że sposób, który opiszę dalej (moim zdaniem lepszy) nie jest jeszcze oficjalnie w specyfikacji ECMAScript — jest nadal tylko szkicem roboczym. W każdym razie, <code>bind</code> w konstruktorze polega na <strong>nadpisaniu metody przy pomocy zbindowanej funkcji</strong>. Na przykład o tak:

<pre class="language-jsx"><code>class App extends React.Component {
  constructor() {
    super();

    this.filterUsers = this.filterUsers.bind(this); // tutaj bind!
  }

  filterUsers(e) {
    ……
  }

  render() {
    return (
      &lt;div&gt;
        &lt;input onInput={this.filterUsers} /&gt;
      &lt;/div&gt;
    );
  }
};</code></pre>

W ten sposób nie musisz już używać <code>bind</code> w renderze, a Twoja funkcja pozostaje niezmienna od powstania komponentu aż do jego zniszczenia. To rozwiązuje problem. <strong>Ale jest brzydkie</strong>. I trzeba o tym pamiętać.

<h2>Arrow function</h2>

Znasz funkcje strzałkowe, prawda? Unikalną cechą tych funkcji jest to, że posiadają leksykalne <code>this</code>, a więc są (tak jakby) automatycznie zbindowane. To upraszcza sprawę. Możesz ich użyć w <code>render</code> i to zadziała:

<code>&lt;input onInput={(e) =&gt; this.filterUsers(e)} /&gt;</code>

Ale mamy tutaj znowu problemy z początku artykułu: Przy każdym renderze tworzona jest nowa funkcja. Tego nie chcesz. Dodatkowo trzeba pamiętać, aby przekazać wszystkie argumenty z jednej funkcji do drugiej… a to jest co najmniej niewygodne.

<h2>Arrow function x 2</h2>

No i w końcu dochodzę do <strong>mojego ulubionego rozwiązania</strong>. Wymaga to użycia funkcji strzałkowej (yay 😁) i własności w klasie, która niestety jest nadal tylko szkicem i nie trafiła jeszcze oficjalnie do ECMAScript (nay 😥).

<strong>Nota poboczna:</strong> Mówię o specyfikacji „Class Fields &amp; Static Properties”, która szybko raczej nie zostanie ukończona gdyż ostatnio doszło do połączenia jej z „Private Fields Proposal” i powstał wspólny „Class field declarations for JavaScript”. Jest to niby już „stage 3” (z 4 możliwych), ale, sam(a) rozumiesz, sprawa nie jest tak prosta jak się pozornie zdaje…

Jednakże, same <strong>„class fields” są zaimplementowane w Babel i powszechnie używane</strong>. Tak powszechnie, że są też <strong>domyślnie wykorzystywane przez <code>create-react-app</code></strong>! To chyba rozwiązuje problemy, no nie? Nie musisz się tym martwić: Bierz i korzystaj!

Pomysł jest prosty: <strong>Zdefiniuj własność w klasie, ale zamiast zwykłej funkcji użyj funkcji strzałkowej!</strong> O tak:

<pre class="language-jsx"><code>class App extends React.Component {
  filterUsers = (e) =&gt; {
    ……
  }

  render() {
    return (
      &lt;div&gt;
        &lt;input onInput={this.filterUsers} /&gt;
      &lt;/div&gt;
    );
  }
};</code></pre>

I już :) To moje ulubione rozwiązanie bo jest proste i nie wymaga dodatkowego kodu. No i działa razem w <code>create-react-app</code> od razu.

<p class="important">Można tak skonfigurować <code>ESLint</code>, aby wyłapywał kiedy używasz zwykłej funkcji zamiast arrow function w klasie — tam gdzie jest to potrzebne.</p>

<h2>Podsumowanie</h2>

Mam nadzieję, że już rozumiesz naturę problemu. Na pewno potrafisz też już go rozwiązać i znasz wady/zalety poszczególnych sposobów. Ostatni wydaje się wygodny, prawda? ;) <a href="https://szkolenia.typeofweb.com/" target="_blank">zapisz się na szkolenie z React</a>.

Jeśli chcesz na bieżąco śledzić kolejne części kursu React.js to koniecznie <strong>śledź mnie na Facebooku i zapisz się na newsletter.</strong>

<NewsletterForm />

<FacebookPageWidget />

<h2>Ćwiczenie</h2>

<strong>Ćwiczenie:</strong> Przepisz kod aplikacji napisanej w <code>create-react-app</code> tak, aby korzystał z <em>arrow functions</em>. Napisz w komentarzu czy takie rozwiązanie Ci się podoba.
