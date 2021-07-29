---
id: 17
index: 7
title: Wstęp do Angular 2
date: 2016-06-03T12:05:10.000Z
isMarkdown: false
status: publish
permalink: wstep-do-angular-2
authors:
  - michal-miszczyszyn
guid: https://typeofweb.com/index.php/2016/06/03/wstep-do-angular-2/
type: post
categories:
  - slug: javascript
    name: JavaScript
  - slug: front-end
    name: Front-end
series:
  slug: angular-2
  name: Angular 2
seo: {}
---

<p>Obiecywałem i oto jest: Mój wstęp do tworzenia aplikacji w Angular 2. Chciałbym omówić tutaj podstawy nowego frameworka oraz narzędzia Angular CLI na przykładzie zbudowania od zera prostej <em>Single Page Application</em> – listy zadań. Jest to typowy, wielokrotnie powielany przykład używany do szybkiego poznania nowych front-endowych narzędzi.</p>

W tym kursie korzystam z TypeScript, więc jeśli jeszcze nie znasz tego języka to zapraszam do mojego kursu TypeScript:

https://typeofweb.com/2016/07/11/typescript-czesc-1/

<h1 id="angular2rc">Angular 2 RC</h1>

<p>Na wstępie muszę jasno powiedzieć o tym, że <strong>Angular 2 nie jest jeszcze gotowy na produkcję</strong>. W momencie powstawania tego wpisu najnowszą wersją tego frameworka była <em>Release Candidate 1</em>. Jest to wersja prawie gotowa do wydania, jednak minie jeszcze trochę czasu zanim całość się ustabilizuje. I nie mam tutaj na myśli wyłącznie kodu źródłowego samego Angulara 2 – chodzi mi także o cały ekosystem, narzędzia, dobre praktyki itd.</p>

<p>Zespół Angulara pracuje teraz nad poprawą stabilności i zmniejszeniem liczby ładowanych plików oraz rozmiaru aplikacji opartych o Angular 2, gdyż na chwilę obecną prosty projekt typu Hello, world! na „dzień dobry” wykonuje 294 żądania oraz pobiera 594 kilobajty danych. To może nie mieć znaczenia w niektórych przypadkach (np. specjalistyczne aplikacje albo intranety), ale jednak warto pamiętać, że w tym momencie Angular 2 <strong>jest bardzo ciężki</strong>. Postępy prac można śledzić na <a href="https://github.com/angular/angular/milestones">github.com/angular/angular</a>.</p>

<h1 id="angular2pierwszestarcie">Angular 2: Pierwsze starcie</h1>

<p>Powszechnym problemem przy pracy z AngularJS, szczególnie na początku cyklu życia tego frameworka, był brak dobrych wskazówek i powszechnych praktyk. Pisałem już o tym w innym wpisie: <a href="https://typeofweb.com/2016/05/14/struktura-aplikacji-angularjs-czesc-1/">Struktura aplikacji AngularJS (część 1 ‑ trochę historii)</a>. Zespół Angulara 2 najwyraźniej wziął sobie do serca ten problem, gdyż od samego początku istnieją <strong>oficjalne dobre praktyki</strong> pisania aplikacji opartych o ten framework. Opisane jest w nich w zasadzie wszystko, od struktury folderów, przez nazewnictwo plików aż po formowatowanie. Zasady te zostały podzielone w 10 grup i ponumerowane, dzięki czemu łatwo się do nich odwołać na przykład w trakcie <em>code review</em>. Całość do przeczytania pod <a href="https://angular.io/styleguide">angular.io/styleguide</a>.</p>

<p><strong>Można zadać sobie pytanie dlaczego by nie pójść o krok dalej i całego procesu nie zautomatyzować?</strong> Istnieją przecież narzędzia, które pomagają generować pliki i foldery w odpowiedniej strukturze, testować kod pod kątem zgodności z pewnymi ustaleniami itd. Przykładem mogą być generatory do Yeomana lub bardzo specjalistyczne narzędzie do frameworka Ember: Ember CLI. Zespół Angulara również wpadł na podobnym pomysł i to właśnie na Ember CLI bazuje analogiczny „przybornik” dla Angulara: <a href="https://cli.angular.io">Angular CLI</a>. Przy tworzeniu tej prostej aplikacji będę z niego korzystał.</p>

<h1 id="pocztekprojektu">Początek projektu</h1>

<p>Rozpoczęcie nowego projektu opartego o Angular 2 wymaga stworzenia odpowiedniej struktury folderów, zainstalowania TypeScript oraz definicji typów, skonfigurowania środowiska i SystemJS, stworzenia pierwszego komponentu i wywołania funkcji <code>bootstrap</code>. Jest to całkiem sporo zachodu, dlatego przy tym prostym projekcie zdecydowałem się skorzystać z Angular CLI. Zaczynam więc od jego instalacji, wymagany jest node.js w wersji 4 lub nowszej oraz npm:</p>

<pre><code class="language-bash">npm install -g angular-cli  
</code></pre>

<p class="important">Angular CLI jest we wczesnej fazie rozwoju i dlatego komendy, ich działanie oraz konfiguracja projektów mogą ulec w przyszłości zmianie.</p>

<p>Angular CLI powinien być teraz zainstalowany i dostępny globalnie. Komenda to <code>ng</code>, a nową aplikację tworzy się wywołując:</p>

<pre><code class="language-bash">ng new todo_list  
</code></pre>

<p>Przy pomocy tego jednego polecenia otrzymujemy gotowy projekt w Angular 2, razem z TypeScript, SystemJS i wieloma przydatnymi narzędziami oraz testami jednostkowymi i e2e. Automatycznie tworzone jest też repozytorium git oraz instalowane są pakiety npm. Fajne, prawda? :)</p>

<p class="important">Aktualnie Angular CLI umożliwia tworzenie wyłącznie projektów opartych o TypeScript. W przyszłości zostanie dodane wsparcie również dla czystego JavaScriptu.</p>

<p>Aby uruchomić serwer wystarczy wydać polecenie <code>ng serve</code>. Domyślnie aplikacja dostępna jest pod adresem <a href="http://localhost:4200/">http://localhost:4200/</a> Po jego otwarciu naszym oczom powinien ukazać się napis:</p>

<p><img src="/content/images/2016/06/angular-2-todo-list-hello-world.png" alt="Angular 2 Todo List Hello World" /></p>

<h1 id="aplikacjawangular2">Aplikacja w Angular 2</h1>

<p>Aby Angular zaczął działać należy stworzyć główny komponent aplikacji i przekazać go do funkcji <code>bootstrap</code>. W wygenerowanym projekcie dzieje się to w pliku <code>main.ts</code>:</p>

<pre><code class="language-typescript">import { bootstrap } from '@angular/platform-browser-dynamic';  
import { TodoListAppComponent } from './app/';

bootstrap(TodoListAppComponent);  
</code></pre>

<p>Stwórzmy więc komponent <code>TodoListAppComponent</code>. Jego zadaniem będzie na razie wyłącznie wyświetlenie treści zmiennej <code>title</code> wewnątrz nagłówka. Komponent w Angularze 2 jest zwykłą klasą poprzedzoną dekoratorem <code>@Component</code> zaimportowanym z <code>@angular/core</code>.</p>

<p class="important">Jeśli koncept albo składnia dekoratorów jest Ci obca to polecam zapoznać się z oficjalną dokumentacją <a href="https://github.com/Microsoft/TypeScript/wiki/What's-new-in-TypeScript#decorators">dekoratorów w TypeScript</a>. Prawdopodobnie podobne adnotacje/dekoratory niedługo znajdą się w samym JavaScripcie, więc warto się z nimi oswoić już teraz – składnia w TypeScripcie bazuje na proponowanej składni do ECMAScript. Jednak na potrzeby wprowadzenia do Angulara 2 dogłębne studiowanie dokumentacji nie jest potrzebne.</p>

<p>Dekorator <code>@Component</code> przyjmuje jako argument obiekt z konfiguracją. Na tę chwilę ważne są dla nas tylko dwa atrybuty: <code>selector</code> oraz <code>template</code>. Pierwszy z nich definiuje w jaki sposób będziemy identyfikować nasz komponent i ma składnię podobną do selektorów z CSS. Zapis <code>'todo-list-app'</code> oznacza, że komponent będzie dostępny jako nowy element HTML: <code>&lt;todo-list-app&gt;</code>. Atrybut <code>template</code> oczywiście definiuje szablon HTML dla naszego komponentu. Podobnie jak w AngularJS, aby wypisać tekst wewnątrz szablonu używamy <code>{{</code> i <code>}}</code>:</p>

<pre><code class="language-typescript">import { Component } from '@angular/core';

@Component({
  selector: 'todo-list-app',
  template: `&lt;h1&gt;{{ title }}&lt;/h1&gt;`
})
export class TodoListAppComponent {  
  title = 'todo-list works!';
}
</code></pre>

<p>Tak zdefiniowany komponent może zostać użyty w pliku <code>index.html</code>:</p>

<pre><code class="language-html">&lt;todo-list-app&gt;&lt;/todo-list-app&gt;  
</code></pre>

<h1 id="szablonistylewosobnympliku">Szablon i style w osobnym pliku</h1>

<p>Rzadko kiedy szablon HTML zawieram wewnątrz pliku .ts z komponentem. Myślę, że dobrym wzorcem jest wydzielanie styli oraz szablonów do osobnych plików. Angular 2 oczywiście również na to pozwala i dekorator <code>@Component</code> zawiera odpowiednie atrybuty: <code>templateUrl</code> i <code>styleUrls</code> – pierwszy z nich przyjmuje ścieżkę do pliku, a drugi tablicę ścieżek, gdyż komponent może mieć tylko jeden szablon, ale wiele plików ze stylami. Warto tutaj zwrócić uwagę, że <strong>domyślnie te ścieżki muszą być bezwzględne</strong>. Przy naszej małej aplikacji nie stanowi to najmniejszego kłopotu, jednak przy większych projektach może rodzić pewne problemy. Rozwiązaniem jest wykorzystanie atrybutu <code>moduleId</code>, można o tym przeczytać <a href="https://angular.io/docs/ts/latest/guide/component-styles.html#appendix-2-loading-styles-with-relative-urls">w dokumentacji</a>.</p>

<p>Koniecznie muszę wspomnieć o tym, że <strong>style podane jako atrybut do komponentu są lokalne</strong>. Oznacza to, że dodanie do stworzonego komponentu styli jak poniżej <strong>nie</strong> spowoduje, że wszystkie elementy H1 na stronie będą czerwone:</p>

<pre><code class="language-typescript">@Component({
    …
    styles: ['h1 { color: red; }']
})
</code></pre>

<p>Angular 2 wkłada trochę wysiłku w to, aby style działały wyłącznie per-komponent. Jak to się dzieje? Jeśli teraz przyjrzymy się wygenerowanemu HTML-owi to zauważymy, że Angular 2 automatycznie dodaje dziwnie wyglądające atrybuty do elementów w aplikacji i te same atrybuty dopisywane są również do treści stylów. Sposób generowania nazw tych atrybutów nie jest w tym momencie istotny, liczy się efekt: <strong>style stają się niejako lokalne dla komponentu</strong>.</p>

<p><img src="/content/images/2016/06/Angular-2-scope-styles.png" alt="Angular 2 lokalne style" /></p>

<h1 id="listazada">Lista zadań</h1>

<p>Przejdźmy więc do konkretów: Lista zadań w Angular 2. Na potrzeby tego wpisu pełną implementację umieszczę w jednym komponencie. To jest prawdopodobnie coś, czego nie chcesz robić w prawdziwych aplikacjach i pisałem już o tym we wpisie <a href="https://typeofweb.com/2016/05/15/struktura-aplikacji-angularjs-czesc-2-komponenty/">Struktura aplikacji AngularJS (część 2 ‑ komponenty)</a>. Więcej o podziale na komponenty oraz o komunikacji pomiędzy nimi z użyciem Redux w Angular 2 napiszę w kolejnym wpisie.</p>

<p>Prosta lista zadań powinna zawierać input oraz listę z zadaniami. Do tego powinna być możliwość oznaczenia każdego z zadań jako wykonane - wystarczy prosty checkbox. HTML może wyglądać w następujący sposób:</p>

<pre><code class="language-html">&lt;h1&gt;Lista zadań&lt;/h1&gt;  
&lt;label&gt;  
  Nowe zadanie: &lt;input type="text"&gt;
&lt;/label&gt;

&lt;ul&gt;  
  &lt;li&gt;
    &lt;input type="checkbox"&gt; Moje zadanie
  &lt;/li&gt;
&lt;/ul&gt;  
</code></pre>

<h1 id="bindingi">Bindingi</h1>

<p>Osoby znające AngularJS napewno są zaprzyjaźnione z <em>two-way data binding</em> i dyrektywą <code>ng-model</code>. Jednak powszechnym problemem była mała czytelność szablonów HTML – zapis <code>&lt;moja-dyrektywa atrybut=“costam”&gt;</code> mogła oznaczać zarówno binding dwukierunkowy pomiędzy <code>atrybut</code> a <code>costam</code>, jak i przypisanie do <code>atrybut</code> ciągu znaków <code>”costam"</code>. Nie było to jasne na podstawie samego szablonu i aby się upewnić należało zajrzeć do kodu źródłowego dyrektywy, i sprawdzić czy <code>atrybut</code> został zadeklarowany jako <code>@</code> czy jako <code>=</code>.</p>

<p><strong>W Angularze 2 koncept bindingów został mocno rozbudowany, ale jednocześnie stał się też bardziej klarowny</strong>. Możliwe jest teraz zdefiniowanie różnych bindingów używając składni w HTML. Bindingi można podzielić na trzy kategorie<sup id="fnref:1"><a href="#fn:1" rel="footnote">1</a></sup>:</p>

<table>  
    <thead>
        <th>Kierunek</th>
        <th>Składnia</th>
        <th>Typ bindingu</th>
    </thead>
    <tbody>
        <tr>
            <td>Jednokierunkowy od źródła danych do widoku</td>
            <td>

<pre><code class="language-html">{{expression}}
[target]="expression"
bind-target="expression"  
</code></pre>

            </td>
            <td>
            Interpolacja<br>
            Właściwość<br>
            Atrybut<br>
            Klasa<br>
            Style<br>
            </td>
        </tr>
        <tr>
            <td>Jednokierunkowy od widoku do źródła danych</td>
            <td>

<pre><code class="language-html">(target)="statement"
on-target="statement"  
</code></pre>

            </td>
            <td>
            Zdarzenie
            </td>
        </tr>
        <tr>
            <td>Dwukierunkowy</td>
            <td>

<pre><code class="language-html">[(target)]="expression"
bindon-target="expression"  
</code></pre>

            </td>
            <td>
            Dwukierunkowy
            </td>
        </tr>
    </tbody>

</table>

<p>Jak widzimy, bindingi w Angular 2 otoczone są <code>[]</code> lub <code>()</code>, albo poprzedzone jednym z prefiksów <code>bind-</code>, <code>on-</code> lub <code>bindon-</code>. Zarówno użycie znaków interpunkcyjnych jak i prefiksów jest sobie równoważne i zależy wyłącznie od preferencji programisty. Dzięki odróżnieniu od siebie bindingów, składnia szablonów staje się bardziej czytelna. </p>

<h1 id="interakcjazelementami">Interakcja z elementami</h1>

<p>Dość teorii! Przejdźmy do praktyki. Chcemy, aby tekst w inpucie był zsynchronizowany z polem w naszej klasie. Możemy to zrobić na dwa sposoby:</p>

<ol>
<li>Używamy dwóch bindingów. Jeden z nich to synchronizacja atrybutu w klasie do wartości w inpucie, a drugi to podpięcie się pod zdarzenie <code>input</code> i aktualizacja wartości w klasie gdy wpisujemy coś w inpucie.  </li>
<li>Użycie bindingu dwukierunkowego (który tak naprawdę jest dwoma bindigami; stąd jego składnia to połączenie obu rodzajów bindingów).</li>
</ol>

<p>Druga opcja wydaje się być prostsza i rzeczywiście - <strong>w przypadku edycji formularzy binding dwukierunkowy jest niezwykle przydatny</strong>. Użyję tutaj specjalnej dyrektywy dostarczanej przez framework – <code>ngModel</code>. Oprócz synchronizacji umożliwia ona także walidację pola oraz obsługę błędów, ale więcej na ten temat można doczytać w dokumentacji. Modyfikuję więc klasę i szablon:</p>

<pre><code class="language-typescript">export class TodoListAppComponent {  
  newTodoTitle:string = '';
}
</code></pre>

<pre><code class="language-html">&lt;input [(ngModel)]="newTodoTitle"&gt;  
</code></pre>

<p>I już! Od teraz zawartość inputa oraz wartość pola <code>newTodoTitle</code> w klasie komponentu będą zsynchronizowane. </p>

<p>Następnym krokiem jest sprawienie, aby po wciśnięciu klawisza ENTER zostało stworzone nowe zadanie o wpisanym tytule, a input stał się pusty. Użyjemy do tego bindingu do zdarzenia <code>keyup</code>, które jest wywoływane zawsze gdy wciśnięty (a właściwie to puszczony) zostaje jakiś klawisz na klawiaturze. Aby wykrywać tylko wciśnięcie klawisza ENTER, musielibyśmy przefiltrować wszystkie te zdarzenia (np. sprawdzając kod klawisza w <code>event.which</code>). Okazuje się jednak, że jest to na tyle częsta potrzeba, iż Angular 2 zawiera w sobie skróconą składnię umożliwającą prostsze wykrywanie naciśnięć niektórych klawiszy: <code>keyup.enter</code>.</p>

<pre><code class="language-html">&lt;input … (keyup.enter)="addTodo()"&gt;  
</code></pre>

<pre><code class="language-typescript">export class TodoListAppComponent {  
  …
  addTodo() {
    console.log(this.newTodoTitle);
  }
}
</code></pre>

<p>Jeśli teraz wpiszemy coś w pole i wciśniemy ENTER to w konsoli powinien pojawić się wpisany tekst.</p>

<h1 id="wywietlanieelementw">Wyświetlanie elementów</h1>

<p>Kolejnym krokiem będzie stworzenie tablicy przechowującej nasze elementy z listy zadań oraz wyświetlenie tej listy pod inputem. Bez dalszej zwłoki, przejdźmy od razu do kodu:</p>

<pre><code class="language-typescript">interface Todo {  
  title:string;
  complete:boolean;
}
export class TodoListAppComponent {  
  todos:Array&lt;Todo&gt; = [];
}
</code></pre>

<p>Najpierw definiuję interfejs <code>Todo</code>, a następnie pole będące tablicą tychże zadań. Początkowo tablica jest pusta, ale do testów możemy ręcznie dodać do niej kilka elementów:</p>

<pre><code class="language-typescript">  todos:Array&lt;Todo&gt; = [{
    title: 'kupić chleb',
    complete: true
  }, {
    title: 'zrobić kanapkę',
    complete: false
  }];
</code></pre>

<p>Następnie wyświetlimy te elementy na stronie. Posłuży nam do tego dyrektywa <code>ngFor</code> dostarczona przez framework:</p>

<pre><code class="language-html">&lt;li *ngFor="let todo of todos"&gt;  
  &lt;input type="checkbox" [(ngModel)]="todo.complete"&gt;
  {{ todo.title }}
&lt;/li&gt;  
</code></pre>

<p>Użyta tutaj składnia <code>let todo of todos</code> przypomina składnię pętli <code>for-of</code> w ECMAScript i na niej była bazowana. Oko przykuwa jednak inny drobny szczegół – zamiast <code>ngFor</code> napisałem <code>*ngFor</code>. <strong>To bardzo ważne!</strong> Dyrektywa <code>ngFor</code> jest jedną z niewielu tzw. <strong>dyrektyw strukturalnych, które potrafią dodawać i usuwać elementy z drzewa DOM</strong>. Zapis <code>*ngFor</code> jest tak naprawdę uproszczeniem pełnej składni, która w tym przypadku wyglądałaby tak:</p>

<pre><code class="language-html">&lt;template ngFor let-todo [ngForOf]="todos"&gt;  
  &lt;li&gt;
    &lt;input type="checkbox" [(ngModel)]="todo.complete"&gt;
    {{ todo.title }}
  &lt;/li&gt;
&lt;/template&gt;  
</code></pre>

<p>Trzeba przyznać, że uproszczenie to jest znaczące :)</p>

<p>Nie pozostaje już teraz nic innego niż dopisać ciało metody <code>addTodo</code>. Najpierw sprawdzam czy został wpisany już jakiś tekst – jeśli nie to nic nie robię. Następnie tworzę nową zmienną typu <code>Todo</code> i przypisuję do niej wpisany tytuł oraz ustawiam domyślnie, że zadanie nie zostało jeszcze wykonane. Na koniec dodaję nowy element do tablicy i czyszczę input: </p>

<pre><code class="language-typescript">addTodo() {  
  if (!this.newTodoTitle) {
    return;
  }

  const newTodo:Todo = {
    title: this.newTodoTitle,
    complete: false
  };
  this.todos.push(newTodo);

  this.newTodoTitle = '';
}
</code></pre>

<h1 id="prawieefektkocowy">Prawie efekt końcowy…</h1>

<p>Aplikacja już prawie gotowa. Jest piękna:</p>

<p><img src="/content/images/2016/06/Angular-2-todo-list.png" alt="Angular 2 todo list" /></p>

<iframe style="width: 100%; height: 250px" src="//embed.plnkr.co/P9Xj5rX4quhOsghzj4BX/" frameborder="0" allowfullscren="allowfullscren"></iframe>

<p>Na tym zakończę ten wpis. Nauczyliśmy się jak stworzyć prosty projekt oparty o framework Angular 2 i TypeScript. Omówiłem pobieżnie rodzaje bindingów w nowym angularze i sposób tworzenia komponentów. Opisałem też podstawy obsługi interakcji użytkownika z aplikacją. Zachęcam do komentowania :)</p>

<p>Podstawy są, <strong>pozostaje jednak kilka problemów</strong>. Po pierwsze pomieszałem trochę odpowiedzialności – komponent teraz przechowuje listę zadań, odpowiada za ich edycję, dodawanie i wyświetlanie. Nie powinno tak być, dlatego fragment aplikacji <strong>należy wydzielić do osobnego serwisu</strong>. Dodatkowo cała aplikacja to tak naprawdę tylko jeden komponent. To działa w tak prostym przypadku, ale nie jest do końca zgodne ze sztuką – dlatego stworzoną listę zadań <strong>powinienem podzielić na mniejsze komponenty</strong>, a komunikację pomiędzy nimi zaimplementować przy pomocy pośredniczącego serwisu, np. używając Redux. To wszystko postaram się zrobić w kolejnym wpisie.</p>

<div class="footnotes"><ol><li class="footnote" id="fn:1"><p>Kopia tabelki z <a href="https://angular.io/docs/ts/latest/guide/template-syntax.html#binding-syntax-an-overview">https://angular.io/docs/ts/latest/guide/template-syntax.html#binding-syntax-an-overview</a> <a href="#fnref:1" title="return to article">↩</a></p></li></ol></div>
