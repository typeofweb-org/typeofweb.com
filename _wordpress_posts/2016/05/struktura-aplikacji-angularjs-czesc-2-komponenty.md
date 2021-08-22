---
title: "Struktura aplikacji AngularJS (część\_2\_‑\_komponenty)"
date: 2016-05-15T15:46:17.000Z
isMarkdown: false
status: publish
permalink: struktura-aplikacji-angularjs-czesc-2-komponenty
authors:
  - michal-miszczyszyn
type: post
categories:
  - slug: javascript
    name: JavaScript
  - slug: dobry-kod
    name: Dobry Kod
  - slug: front-end
    name: Front-end
seo: {}
---

<p>W poprzednim artykule z tej serii opowiadałem bardziej o osobistych doświadczeniach z początków pracy z AngularJS 1.0 oraz o drodze jaką przebyło środowisko AngularJS - <strong>w skrócie od bałaganu aż do komponentów</strong>. Wspomniałem tam również, że AngularJS 1.5 wprowadził nową pomocniczą funkcję <code>angular.component(…)</code> i na jej wykorzystaniu chciałbym się skupić w tym wpisie. W tym celu napiszę bardzo prosty komponent - listę kontaktów z avatarami.</p>

<p>Jeśli z jakiegoś powodu nie możesz zaktualizować AngularJS do wersji 1.5, Todd Motto napisał skrypt, który dodaje <code>angular.component(…)</code> do AngularJS od wersji 1.3. Dokładne informacje na ten temat można znaleźć na <a href="https://toddmotto.com/angular-component-method-back-ported-to-1.3/">jego blogu</a>.</p>

<h1 id="angularjsakomponenty">AngularJS a komponenty</h1>

<p>Zacznę od przypomnienia czym w ogóle jest komponent. W wielkim skrócie:</p>

<blockquote>
  <p>komponent to zenkapsulowany samowystarczalny element aplikacji, odpowiedzialny za dokładnie jedną funkcję. Zawiera widok i logikę biznesową.</p>
</blockquote>

<p>AngularJS 1.5 wprowadza nową metodę <code>angular.component(…)</code>, która przypomina <code>angular.directive(…)</code>, ale jest od niej znacznie prostsza. Powstała głównie w celu ułatwienia tworzenia komponentów i promowania tego podejścia. Dodatkowo, metoda <code>.component(…)</code> pozwala na pisanie aplikacji w AngularJS 1 w stylu, który jest bliższy angular2 – dzięki czemu potencjalna przesiadka na ten drugi framework powinna być łatwiejsza, przynajmniej z koncepcyjnego punktu widzenia.</p>

<h1 id="skadniaangularcomponent">Składnia <code>angular.component(…)</code></h1>

<p>Komponent w AngularJS to tak naprawdę <strong>uproszczona dyrektywa</strong>. Jakie są różnice? Po pierwsze <strong>komponenty zawsze są elementami</strong>. Nie można stworzyć komponentu będącego atrybutem – do tego nadal trzeba skorzystać z dyrektywy. Ponadto składnia jest znacznie łatwiejsza. Stworzenie komponentu przy pomocy <code>.directive(…)</code> i <code>.component(…)</code> widoczne jest poniżej:</p>

<pre><code class="language-javascript">.directive(‘myList’, function () {
    return {
        restrict: ‘E’,
        scope: {},
        controllerAs: ‘$ctrl’,
        controller: ‘MyListCtrl’,
        bindToController: {
            contacts: ‘=‘
        },
        templateUrl: ‘myList.html’
    };
});

.component(‘myList’, {
    controller: ‘MyListCtrl’,
    bindings: {
        contacts: ‘=‘
    },
    templateUrl: ‘myList.html’
});
</code></pre>

<p>Pierwszą widoczną różnicą jest to, że metoda <code>.component</code> oczekuje tylko nazwy i obiektu z konfiguracją, natomiast metoda <code>.directive</code> oczekiwała nazwy oraz funkcji, która dopiero zwracała obiekt z konfiguracją. Ma to sens w dyrektywach, które nie mają kontrolerów (a mają tylko <em>linking function</em>), bo dzięki tej dodatkowej funkcji można do dyrektywy wstrzyknąć dowolne zależności. Jednak w przypadku komponentu mającego kontroler, zależności można wstrzyknąć bezpośrednio do niego i dzięki temu składnia została uproszczona.</p>

<p>Mała dygresja: Wszystkie nazwy dyrektyw i komponentów zawsze <strong>poprzedzam prefiksem</strong>, który jest unikatowy dla danej aplikacji. Pozwala to zapobiegać konfliktom nazw z komponentami innych autorów. W tym artykule takim prefiksem jest <code>my</code>.</p>

<h2 id="bindings"><code>bindings</code></h2>

<p>Składnia dyrektyw pozwala na określenie, używając parametru <code>scope</code>, czy <em>scope</em> ma być dziedziczony po rodzicu czy izolowany. <strong>W przypadku komponentów <em>scope</em> zawsze jest izolowany</strong> i dlatego do metody <code>.component(…)</code> tego parametru nie trzeba już podawać. Ponadto, osoby korzystające z AngularJS trochę dłużej na pewno pamiętają małe zamieszanie dookoła parametrów <code>scope</code> i <code>bindToController</code> w dyrektywach. Aby ten mętlik jakoś naprawić, składnia komponentów to upraszcza i nie zawiera obu tych atrybutów – zamiast nich ma tylko jeden o nazwie <code>bindings</code>. Mówiąc krótko poniższe fragmenty kodu są równoważne:</p>

<pre><code class="language-javascript">// directive
{
    scope: {},
    bindToController: {
        contacts: ‘=‘
    }
}

// component
{
    bindings: {
        contacts: ‘=‘
    }
}
</code></pre>

<h2 id="dctrl"><code>$ctrl</code></h2>

<p>Celowo pominąłem też parametr <code>controllerAs</code> przy tworzeniu komponentu. Nadal można zdefiniować własny alias dla kontrolera w widoku, jednak teraz możliwe jest także pominięcie tego atrybutu w ogóle i w takim przypadku przyjmie on domyślną wartość: <code>$ctrl</code>:</p>

<pre><code class="language-javascript">// directive
{
    controller: 'MyCtrl',
    controllerAs: '$ctrl'
}

// component
{
    controller: 'MyCtrl'
}
</code></pre>

<h2 id="template"><code>template</code></h2>

<p>Nigdy jeszcze nie skorzystałem z tej możliwości, ale warto pamiętać, iż teraz parametr <code>template</code> może przyjąć nie tylko string zawierający html, ale również funkcję. Ta funkcja zostanie wywołana z dwoma argumentami – <code>$element</code> i <code>$attrs</code> – i musi zwrócić ciąg znaków.</p>

<pre><code class="language-javascript">{
    template($element, $attrs) {
        if ($attrs.isNumeric) {
            return '&lt;input type="number"&gt;';
        } else {
            return '&lt;input type="text"&gt;';
        }
    }
}
</code></pre>

<p>Użyłem tutaj skróconej składni funkcji w obiekcie, dodanej w ES2015. Jest to równoważne zapisowi <code>template: function($element, $attrs)…</code>. W przykładach będę używał również innych elementów z ES2015 takich jak <code>class</code> lub <em>arrow functions</em> w celu pokazania w jaki sposób naprawdę teraz wyglądają tworzone przeze mnie aplikacje. Więcej na temat nowości w ECMAScript w innym wpisie.</p>

<p>Muszę też wspomnieć przy okazji o tym, że możliwe jest także konstruowanie tzw. <strong>komponentów bezstanowych</strong>. Jest to taki komponent, który nie zawiera kontrolera – tylko html i atrybuty. Mówiąc inaczej, jest to element wielokrotnego użytku, który nie ma modelu ani żadnej skomplikowanej logiki:</p>

<pre><code class="language-javascript">{
    bindings: {
        'item': '='
    },
    template: '&lt;div&gt; {{ $ctrl.item }} &lt;/div&gt;'
}
</code></pre>

<h1 id="jednokierunkowy_binding_">Jednokierunkowy <em>binding</em></h1>

<p>W poprzednim artykule wspomniałem już o nowym rodzaju <em>bindingu</em>: <strong>jednokierunkowym</strong>. Do uzyskania takiego <em>bindingu</em> używa się symbolu <code>&lt;</code>. Oznacza on, że <strong>zmiany w rodzicu będą widoczne w komponencie, natomiast zmiany w komponencie nie staną się widoczne dla rodzica</strong>. Nic nie oddaje tego lepiej niż interaktywny przykład. W trakcie edycji pierwszego pola wartość automatycznie kopiowana jest również do drugiego (wewnątrz komponentu). Natomiast zmiany dokonane w drugim polu nie są już widoczne w pierwszym:</p>

<CodepenWidget height="265" themeId="light" slugHash="VaNVOZ" defaultTab="result" user="mmiszy" embedVersion="2">
<a href="http://codepen.io/mmiszy/pen/VaNVOZ/">Zobacz Codepen</a>.
</CodepenWidget>

<p>Istotnym jest, aby pamiętać, że mowa tutaj o zmianach wartości prostej (jak powyżej) lub referencji. Jeśli do <em>bindingu</em> przekazany jest obiekt i w komponencie zmienione zostanie jakieś pole tego obiektu to <strong>taka zmiana będzie widoczna w rodzicu</strong>. Jeśli natomiast cały obiekt zostanie nadpisany to modyfikacja nie będzie propagowana. Jest to zachowanie znane każdemu programiście JavaScript:</p>

<pre><code class="language-javascript">// component
{
    bindings: {
        'item': '&lt;' // referencja obiektu
    },
    controller() {
        this.item.name = 'test'; // jest widoczna w rodzicu
        this.item = {name: 'test'}; // nie jest widoczna w rodzicu
    }
}
</code></pre>

<h1 id="zdarzeniawkomponencie">Zdarzenia w komponencie</h1>

<p>Dawniej, by być informowanym o zmianach atrybutów przekazanych do dyrektywy należało użyć funkcji <code>$scope.$watch(…)</code>. Aby móc  wykonać jakieś operacje gdy dyrektywa były usuwana ze strony, trzeba było nasłuchiwać na odpowiednie zdarzenie <code>$destroy</code> używając <code>$scope.$on(…)</code>. Na szczęście nie jest to potrzebne w przypadku komponentów. W zasadzie wstrzykiwanie zmiennej <code>$scope</code>, poza rzadkimi przypadkami, w ogóle nie jest już przydatne w komponentach. Informowanie o wymienionych wyżej sytuacjadh zostało rozwiązane inaczej: Poprzez <strong>zdarzenia cyklu życia komponentu</strong> (ang. <em>lifecycle hooks</em>).</p>

<p>W wersji 1.5.0 AngularJS wprowadzono obsługę jednej metody kontrolera komponentu <code>$onInit</code>, a od wersji 1.5.3 dodano jeszcze trzy: <code>$onChanges</code>, <code>$onDestroy</code> i <code>$postLink</code>. Więcej informacji można znaleźć <a href="https://github.com/angular/angular.js/commit/9cd9956dcbc8382e8e8757a805398bd251bbc67e">na GitHubie</a>, a tutaj krótkie podsumowanie:</p>

<ul>
<li><code>$onInit</code> – wywoływana gdy komponent zostanie skonstruowany a jego <em>bindingi</em> zainicjalizowane; jeśli jakaś logika znajduje się w kontruktorze to warto przenieść ją do tej metody,</li>
<li><code>$onChanges</code> – wywoływana zawsze, gdy <em>bindingi</em> jednokierunkowe się zmienią; argumentem przekazywanym do tej metody jest obiekt, którego kluczami są nazwy <em>bindingów</em>, które się zmieniły, a wartościami obiekty w postaci <code>{ currentValue: …, previousValue: … }</code>,</li>
<li><code>$onDestroy</code> – wywoływana gdy dany komponent jest niszczony (usuwany ze strony); wewnątrz tej metody należy np. zwolnić zasoby i usunąć nasłuchiwanie na zdarzenia,</li>
<li><code>$postLink</code> – wywoływana gdy kontroler tego komponentu oraz jego dzieci zakończą fazę linkowania; wewnątrz tej funkcji powinno się dokonywać manipulacji na DOM.</li>
</ul>

<p>W prostym przykładzie poniżej nie znalazłem niestety miejsca aby pokazać możliwości wszystkich tych metod, używam tylko <code>$onInit</code> oraz <code>$onChanges</code>. Warto jednak pamiętać o ich istnieniu.</p>

<h1 id="konkretnyprzykad">Konkretny przykład</h1>

<p>Stwórzmy aplikację w AngularJS, który zawiera w sobie listę kontaktów. Każdy kontakt będzie miał imię, wiek oraz email, dodatkowo wyświetlony będzie również jego Gravatar. Efekt końcowy wygląda w ten sposób:</p>

<p><img src="https://res.cloudinary.com/type-of-web/content/images/2016/05/komponenty-angularjs-lista-kontaktow.png" alt="AngularJS lista kontaktów" /></p>

<p>Tworzenie jakiejkolwiek aplikacji warto zacząć od koncepcyjnego podziału na komponenty. Daje to lepszy pogląd na całokształt tworzonego projektu oraz pomaga wstępnie zidentyfikować potrzeby. W tym celu biorę powyższy obrazek i oznaczam na nim granice poszczególnych komponentów. Dokładnie w ten sposób zostanie zaimplementowana ta aplikacja:</p>

<p><img src="https://res.cloudinary.com/type-of-web/content/images/2016/05/komponenty-angularjs-projekt-aplikacji-2.png" alt="AngularJS projekt aplikacji" /></p>

<p>Pisanie kodu z użyciem Angulara zaczyna się zazwyczaj od zdefiniowania modułu aplikacji, w tym przypadku będzie to jedyny moduł: <code>const app = angular.module('myApp', []);</code>. Dla skrócenia i poprawy czytelności zakładam, że zmienna <code>app</code> istnieje wszędzie. Dodatkowo pomijam tutaj implementację serwisów, ale pełny kod zamieszczam na CodePen oraz na GitHubie na końcu wpisu. Cały HTML aplikacji wygląda w ten sposób:</p>

<pre><code class="language-html">&lt;div ng-app="myApp"&gt;  
  &lt;my-app&gt;&lt;/my-app&gt;
&lt;/div&gt;  
</code></pre>

<p>Widać tutaj jeden główny komponent. Pozostałe elementy będą zawarte w jego szablonie. W tym przypadku komponent aplikacji również nie jest zbyt rozbudowany, jedynym jego zadaniem jest pobranie kontaktów z serwisu <code>ContactsService</code> oraz przekazanie ich do do komponentu listy kontaktów. Dla ułatwienia kontakty są pobierane tutaj synchronicznie, choć oczywiście mogłyby one pochodzić np. z API.</p>

<pre><code class="language-javascript">app.component('myApp', {  
    template: `
    &lt;my-contacts-list contacts="$ctrl.contacts"&gt;&lt;/my-contacts-list&gt;
    `,
    controller: 'MyAppCtrl'
});

app.controller('MyAppCtrl', class MyAppCtrl {  
    constructor(ContactsService) {
        this.ContactsService = ContactsService;
    }

    $onInit() {
        this.contacts = this.ContactsService.contacts;
    }
});
</code></pre>

<p><code>&lt;my-contacts-list&gt;</code> jest komponentem bezstanowym, który tylko przyjmuje tablicę kontaktów oraz dla każdego z nich tworzy element <code>&lt;my-contact-item&gt;</code> i przekazuje do niego obiekt z kontaktem:</p>

<pre><code class="language-javascript">app.component('myContactsList', {  
    bindings: {
        'contacts': '&lt;'
    },
    template: `
    &lt;ul&gt;
        &lt;li ng-repeat="contact in $ctrl.contacts track by contact.id"&gt;
            &lt;my-contact-item contact="contact"&gt;&lt;/my-contact-item&gt;
        &lt;/li&gt; 
    &lt;/ul&gt;
    `
});
</code></pre>

<p><code>&lt;my-contact-item&gt;</code> również jest komponentem bezstanowym. Jego zadaniem jest wyświetlenie imienia i wieku danego kontaktu, oraz  stworzenie elementu z avatarem:</p>

<pre><code class="language-javascript">app.component('myContactItem', {  
    bindings: {
        'contact': '&lt;'
    },
    template: `
    &lt;div&gt;Name: {{$ctrl.contact.name}}&lt;/div&gt;
    &lt;div&gt;Age: {{$ctrl.contact.age}}&lt;/div&gt;
    &lt;my-gravatar email="$ctrl.contact.email" size="64"&gt;&lt;/my-gravatar&gt;
    `
});
</code></pre>

<p><code>&lt;my-gravatar&gt;</code> to komponent, który łatwo wykorzystać ponownie w dowolnym miejscu aplikacji. Zależy tylko od przekazanego mu adresu email oraz opcjonalnego rozmiaru avatara. Wywołuje on metodę z serwisu <code>GravatarService</code>, która zwraca odpowiedni URL Gravatara, który z kolei jest używany do wyświetlenia obrazka. Warto zwrócić uwagę, że w przypadku zmiany przekazanego do tego komponentu adresu email, <code>gravatarUrl</code> również <strong>automatycznie się zmieni</strong> dzięki metodzie <code>$onChanges</code>:</p>

<pre><code class="language-javascript">app.component('myGravatar', {  
    bindings: {
        'email': '&lt;',
        'size': '@'
    },
    template: `
        &lt;img ng-src="{{ $ctrl.gravatarUrl }}"&gt;
    `,
    controller: 'MyGravatarCtrl'
});

app.controller('MyGravatarCtrl', class MyGravatarCtrl {  
    constructor(GravatarService) {
        this.GravatarService = GravatarService;
    }

    $onChanges() {
        this.updateGravatarUrl();
    }

    $onInit() {
        this.updateGravatarUrl();
    }

    updateGravatarUrl() {
        this.gravatarUrl = this.GravatarService
            .getGravatarUrl(this.email, this.size);
    }
});
</code></pre>

<p>W ten oto sposób zgodnie z najlepszymi praktykami AngularJS, powstała prosta aplikacja komponentowa. Opisałem większość istotnych elementów nowej funkcji <code>angular.component(…)</code> oraz zasady budowania aplikacji opartych o komponenty. Co prawda <strong>nie dotknąłem nawet takich tematów jak komunikacja pomiędzy komponentami czy reagowanie na zdarzenia</strong>, bo to tematy na tyle rozbudowane, że zasługują na osobny wpis. Co nieco na ten temat napisałem już w innym artykule: <a href="https://typeofweb.com/komunikacja-pomiedzy-kontrolerami/">Komunikacja pomiędzy kontrolerami</a>.</p>

<p>Na koniec jeszcze  kilka uwag. Wszędzie użyłem <code>template</code> zamiast <code>templateUrl</code>. Dlaczego? Tylko ze względu na prostotę przykładu. W praktyce prawie zawsze używam <code>templateUrl</code>, a szablony zapisuję w osobnych plikach HTML. Oczywiście podobnie każdy kontroler i każdy komponent powinny znaleźć się <strong>w osobnych plikach, pogrupowane logicznie razem w foldery</strong>. Ma to znaczenie tylko z punktu widzenia poprawienia czytelności kodu i ułatwienia procesu tworzenia aplikacji gdyż na serwerze produkcyjnym i tak wszystkie angularowe szablony są osadzane z powrotem w środku plików JS, a z kolei te pliki są łączone razem w jedną dużą paczkę (choć to akurat może się zmienić gdy HTTP/2 stanie się bardziej popularne).</p>

<p>Cały kod, łącznie z pominiętymi tutaj fragmentami dostępny jest na <a href="https://gist.github.com/mmiszy/3736f131fe7cb7a1d37be892dcc00bab">gist.github.com/mmiszy/3736f131fe7cb7a1d37be892dcc00bab</a></p>

<CodepenWidget height="465" themeId="light" slugHash="zqXyOM" defaultTab="js,result" user="mmiszy" embedVersion="2">
<a href="http://codepen.io/mmiszy/pen/zqXyOM/">Zobacz Codepen</a>.
</CodepenWidget>
