---
title: Komunikacja pomiędzy komponentami w React.js
date: 2018-02-24T09:15:02.000Z
isMarkdown: false
status: publish
permalink: komunikacja-pomiedzy-komponentami-w-react-js
authors:
  - michal-miszczyszyn
type: post
thumbnail:
  url: /public/assets/wp-content/uploads/2018/02/pexels-photo-207135.jpeg
  width: 1920
  height: 1055
categories:
  - slug: javascript
    name: JavaScript
  - slug: front-end
    name: Front-end
series:
  slug: react-js
  name: React.js
seo:
  metadesc: "Komunikacja pomiędzy komponentami w React to często trudny temat. Wszystko wyjaśniam! Jak przekazywać dane między komponentami? Jak dziecko ma informować o czymś rodzica? No i jak połączyć ze sobą\_dowolne dwa komponenty, które leżą gdzieś\_daleko w aplikacji? Wszystko we wpisie."
---

Przyszedł ten moment, gdy Twoja aplikacja zaczyna się rozrastać i zmagasz się z różnymi problemami z architekturą. Zacznijmy od prostego problemu: Komunikacja pomiędzy komponentami. Ale nie tylko tymi, które są bezpośrednio obok siebie, ale też tymi dowolnie oddalonymi w aplikacji…

---

<p class="important">Napisałem wcześniej podobne artykuły na temat <a href="https://typeofweb.com/komunikacja-pomiedzy-kontrolerami/">AngularJS (link)</a> i <a href="https://typeofweb.com/komunikacja-pomiedzy-komponentami-w-angular-2/">Angular2 (link)</a>. Wiedza tam zawarta jest w dużej części uniwersalna i możesz chcieć do nich zajrzeć.</p>

<h2>Komunikacja w React.js</h2>

React to prosta biblioteka. Zasadniczo nie obchodzi jej w jaki sposób projektujesz architekturę swojej aplikacji. Ale zawarto w niej mechanizm na przekazywanie informacji z jednego komponentu do drugiego — z rodzica do dziecka — przy pomocy propsów. Tak jak robiliśmy to do tej pory. <strong>Ale przekazywać można nie tylko dane, ale też funkcje ;)</strong> W tym wpisie fragmenty kodu, a całość razem z testami znajdziesz na moim GitHubie: <a href="https://github.com/typeofweb/typeofweb-kurs-react/tree/part-4">mmiszy/typeofweb-kurs-react/tree/part-4</a>.

<h2>Rodzic ➜ Dziecko: Propsy</h2>

Rodzic przekazuje do swoich dzieci dane. Przykładowo: Aplikacja zawiera listę kontaktów, które muszą zostać przekazane do komponentu-dziecka, który je wyświetli. Znana sytuacja, prawda? ;)

React informuje nas, że propsy się zmieniły poprzez funkcję <code>componentWillReceiveProps(nextProps)</code> — dzięki czemu można zareagować na zmiany danego propsa. <strong>Ale raczej tego nie rób</strong><strong>. Bo naprawdę rzadko jest to potrzebne.</strong> Troszkę więcej o tym w jednym z poprzednich wpisów:

https://typeofweb.com/metody-cyklu-zycia-komponentu-react-js/

W zasadzie to cała filozofia.

<h2>Dziecko ➜ Rodzic: Propsy (callback)</h2>

A teraz inna sytuacja. Coś się wydarzyło w komponencie-dziecku i musisz poinformować o tym rodzica. Przykładowo: Na naszej liście kontaktów, użytkownik zaznaczył kontakt, a rodzic musi wiedzieć, który kontakt został zaznaczony. Jak to zrobić?

React nie ma two-way data bindingu (jak AngularJS, Angular czy Vue). W tym przypadku to dobrze — bo komunikacja za pośrednictwem tego sposobu często prowadzi do bałaganu. Reactowy sposób jest inny: <strong>Rodzic może przekazać do dziecka funkcję. Następnie dziecko wywoła tę funkcję, gdy zechce poinformować rodzica o zmianach. </strong>To jest tak proste jak brzmi. Na przykładzie z listą kontaktów:

Dodaję nowe pole do <code>state</code> w <code>App</code>: <code>selectedUser</code> — będę tutaj przechowywał użytkownika, który został zaznaczony. Następnie wyświetlam go wewnątrz funkcji <code>render</code>. Pozostały kod pozostawiam bez zmian:

<pre><code class="language-jsx">class App extends React.Component {
  constructor() {
    super();

    this.state = {
      filteredUsers: allUsers,
      selectedUser: null // tutaj
    };
  }

  render() {
    return (
      &lt;div&gt;
        {this.state.selectedUser}
        {/* … */}
      &lt;/div&gt;
    );
  }
}
</code></pre>

Teraz czas na przekazanie funkcji do dziecka. Tworzę więc nową funkcję w tym komponencie i przekazuję ją niżej:

<pre class="language-jsx"><code>onUserSelected = (selectedUser) =&gt; {
  this.setState({
    selectedUser
  });
}

render() {
  return (
    &lt;div&gt;
      {/* … */}
      &lt;UsersList userSelected={this.onUserSelected} users={this.state.filteredUsers} /&gt;
    &lt;/div&gt;
  );
}</code></pre>

Teraz modyfikuję <code>UsersList</code> i wywołuję w nim <code>userSelected</code> gdy użytkownik kliknie na kontakt:

<pre class="language-jsx"><code>&lt;li onClick={userSelected.bind(null, user)} key={user}&gt;{user}&lt;/li&gt;</code></pre>

<h2>Dowolny komponent ➜ Inny Komponent</h2>

Tutaj magia Reacta się kończy ;) No, prawie, ale na temat <code>context</code> opowiem innym razem. Załóżmy na razie, że nie istnieje ;) Jak więc skomunikować ze sobą dwa komponenty, które leżą sobie gdziekolwiek w aplikacji? <strong>Na dowolny znany Ci sposób.</strong> To nie żart. Oto kilka wskazówek:

<ul>
    <li>stwórz funkcję / klasę / obiekt — tzw. serwis, który posłuży Ci do komunikacji. Zaimportuj i użyj go w obu komponentach.</li>
    <li>Przechowuj w nim dane lub wywołuj funkcje — podobnie jak w przypadku komunikacji rodzic ⟺ dziecko</li>
    <li>Przyda Ci się znajomość wzorców projektowych, np. wzorca obserwatora. Więcej na temat samej koncepcji pod koniec <a href="https://typeofweb.com/komunikacja-pomiedzy-kontrolerami/#staredobrewzorceprojektowe">mojego innego wpisu (link)</a>. Może <a href="https://gist.github.com/typeofweb/cea958c4c644b3fffe8537e21a419d4d">ten gist (link)</a> się nada?</li>
    <li>Możesz użyć gotowych paczek, typu <a href="https://www.npmjs.com/package/eventemitter3">EventEmitter3 (link)</a> lub podobnych.</li>
</ul>

<h2>Flux, Redux, MobX i co tam jeszcze…</h2>

Są też pewne ciekawe, rozbudowane i popularne rozwiązania: Architektura <strong>Flux</strong> i wywodzący się z niej słynny <strong>Redux</strong>, a także <strong>MobX</strong>. No i inne podobne biblioteki. Popełniłem już wcześniej jeden wpis na temat Fluksa i Reduksa od strony architektury. Jeśli hasła <em>CQRS</em> albo <em>Event Sourcing</em> nie są Ci obce to śmiało czytaj:

https://typeofweb.com/flux-i-redux-globalny-store-jednokierunkowy-przeplyw-danych/

Natomiast w kontekście Reacta — wrócę do tego, obiecuję ;) To temat pierwszy albo drugi wpis po tym! <a href="https://szkolenia.typeofweb.com/" target="_blank">zapisz się na szkolenie z React</a>.

<h2>Podsumowanie</h2>

Teraz już wiesz jak komponenty rozmawiają ze sobą. <strong>Wiedza na temat architektury aplikacji i wzorców projektowych przydaje się zawsze, niezależnie od frameworka, z którego korzystasz.</strong> Także tutaj. Ponownie — cały kod <strong>wraz z testami</strong> jest dostępny na moim GitHubie: <a href="https://github.com/typeofweb/typeofweb-kurs-react/tree/part-3">https://github.com/typeofweb/typeofweb-kurs-react/tree/part-4</a>

Jeśli chcesz na bieżąco dowiadywać się o kolejnych częściach kursu React.js to koniecznie <strong>śledź mnie na Facebooku i zapisz się na newsletter.</strong>

<NewsletterForm />

<FacebookPageWidget />

<h2>Ćwiczenie</h2>

<strong>Ćwiczenie:</strong>  Użyj biblioteki EventEmitter3 aby skomunikować ze sobą <code>App</code> i <code>UsersList</code> w powyższym przykładzie (bez przekazywania funkcji jako props). Czy udało Ci się bez problemu? Napisz w komentarzu!
