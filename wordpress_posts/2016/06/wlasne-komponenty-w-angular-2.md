---
id: 19
index: 8
title: Własne komponenty w Angular 2
date: 2016-06-14T17:27:29.000Z
isMarkdown: false
status: publish
permalink: wlasne-komponenty-w-angular-2
authors:
  - michal-miszczyszyn
guid: https://typeofweb.com/index.php/2016/06/14/wlasne-komponenty-w-angular-2/
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

<p><a href="https://typeofweb.com/2016/06/03/wstep-do-angular-2/">W poprzedniej części kursu Angular 2</a> omówiłem założenia frameworka, tworzenie nowego projektu, podstawy bindingów oraz wreszcie kod pierwszego komponentu. Pominąłem jednak kilka kwestii takich jak <strong>bindingi na własnych komponentach</strong>, pełna składnia bindingu dwukierunkowego, czy możliwość odwoływania się do referencji do obiektów na poziomie szablonów (brzmi skomplikowanie, ale nie jest!). Chciałbym teraz do tych kwestii wrócić. W tym celu odtworzę projekt, który poprzednio <a href="https://typeofweb.com/2016/05/15/struktura-aplikacji-angularjs-czesc-2-komponenty/">zaimplementowałem w AngularJS 1.5</a> gdy opisywałem koncept komponentów. Będzie to prosta lista kontaktów z gravatarami.</p>

<h1 id="koncepcyjnie">Koncepcyjnie</h1>

<p>Powróćmy do projektu aplikacji z tamtego wpisu. Jest to lista kontaktów podzielona na komponenty:</p>

<p><img src="/content/images/2016/05/komponenty-angularjs-projekt-aplikacji-2.png" alt="Koncept aplikacji" /></p>

<p>Zacznijmy budowanie aplikacji od stworzenia potrzebnych komponentów przy pomocy Angular CLI. Główny komponent aplikacji już istnieje (domyślnie stworzony przez <code>ng new {NAZWA PROJEKTU}</code>), wystarczy więc dodać <code>contacts-list</code>, <code>contact-item</code> i <code>gravatar</code>. Do tego również można wykorzystać Angular CLI:</p>

<pre><code class="language-bash">ng generate component contacts-list  
ng g component contact-item  
ng g component gravatar  
</code></pre>

<p>Dodatkowo potrzebujemy serwis, w którym będą przechowywane kontakty:</p>

<pre><code class="language-bash">ng g service contacts  
</code></pre>

<p>Dzięki pomocy Angular CLI, nie musimy już powtarzać wielu manualnych czynności co znacznie przyspiesza pracę z Angular 2.</p>

<p class="important">Określenie „serwis” dotyczy w zasadzie dowolnej klasy w Angularze, która nie jest komponentem. Na przykład modele, wszelkie klasy pomocnicze i pośredniczące.</p>

<h1 id="serwisywangular2">Serwisy w Angular 2</h1>

<p>Kiedy otwieram wygenerowany właśnie przy pomocy Angular CLI serwis, moim oczom ukazuje się podstawowy kod:</p>

<pre><code class="language-typescript">import { Injectable } from '@angular/core';

@Injectable()
export class ContactsService {  
}
</code></pre>

<p>Jest to zwykła klasa z dodanym dekoratorem <code>@Injectable</code>. Do czego jest potrzebny dekorator <code>@Injectable</code>? Jeśli klasa, którą tworzymy wykorzystuje <em>Dependency Injection</em> to musi mieć jakiś dekorator, np. <code>@Injectable</code>. Jest to wymaganie stawiane przez TypeScript – Angular 2 korzysta z metadanych parametrów przekazywanych do konstruktora, aby wstrzyknąć prawidłowe zależności. Te metadane są jednak nieobecne jeśli klasa nie ma żadnego dekoratora! W tym przypadku nie korzystamy (jeszcze) z <em>Dependency Injection</em>, jednak zalecam dodać dekorator ze względu na spójność z resztą aplikacji.</p>

<p class="important">Dobrą praktyką jest dodawanie dekoratora <code>@Injectable</code> do każdego serwisu.</p>

<p>Stworzony serwis ma za zadanie przechowywać tablicę kontaktów. Zaczynamy więc od zadeklarowania interfejsu reprezentującego kontakt, a następnie dodajemy do klasy serwisu odpowiednie pole z jednym kontaktem (przykładowo). Cała klasa serwisu wygląda tak:</p>

<pre><code class="language-typescript">import {Injectable} from '@angular/core';

export interface Contact {  
  id:number;
  name:string;
  age:number;
  email:string;
}

@Injectable()
export class ContactsService {  
  contacts:Array&lt;Contact&gt; = [{
    id: 1,
    name: 'Tester',
    age: 99,
    email: 'randomemail@com.pl'
  }];
}
</code></pre>

<h1 id="dependencyinjection">Dependency Injection</h1>

<p>Tak napisaną klasę <code>ContactsService</code> możemy wstrzyknąć w dowolne miejsce w aplikacji. <em>Dependency Injection</em> w Angular 2 jest podobne do tego z AngularJS, ale znacznie bardziej rozbudowane i dające więcej możliwości.</p>

<p class="important">Dependency Injection jest wzorcem projektowym, który ma na celu usuwanie ścisłych powiązań pomiędzy komponentami aplikacji. Jest to realizowane poprzez odwrócenie kontroli (<i>Inversion of Control</i>) – komponenty nie tworzą ani nie ładują potrzebnych serwisów, a zamiast tego definiują listę zależności i oczekują, że te zależności zostaną im przekazane. Rozwiązanie to jest niezwykle elastyczne i ułatwia tworzenie aplikacji. Więcej na temat teorii można poczytać choćby <a href=https://pl.wikipedia.org/wiki/Wstrzykiwanie_zale%C5%BCno%C5%9Bci>na wikipedii</a>.</p>

<p>Jednym z nowych elementów DI w Angular 2 jest fakt, że równolegle do drzewa komponentów istnieje również drzewo hierarchicznych zależności, a konfiguracja Dependency Injection może nastąpić na dowolnym poziomie tego drzewa (w dowolnym komponencie). Więcej na ten temat można doczytać <a href="https://angular.io/docs/ts/latest/guide/hierarchical-dependency-injection.html">w dokumentacji</a>. Na potrzeby tego wpisu wystarczy nam informacja, że <strong>aby zależność można było wstrzyknąć, musimy podać również który komponent ją udostępnia</strong>. Robimy to przy pomocy tablicy <code>providers</code> w dekoratorze <code>@Component</code>. Ponieważ chcemy, aby serwis był „globalny”, więc dodajemy tablicę <code>providers</code> w najwyższym komponencie aplikacji. W tym przykładzie akurat do tego samego komponentu wstrzykujemy również instancję serwisu, aby skorzystać z tablicy kontaktów:</p>

<pre><code class="language-typescript">@Component({
  …
  providers: [ContactsService]
})
export class AppComponent {  
  constructor(private contactsService: ContactsService) {
  }
}
</code></pre>

<h1 id="zdarzeniacykluycia">Zdarzenia cyklu życia</h1>

<p><a href="https://typeofweb.com/2016/05/15/struktura-aplikacji-angularjs-czesc-2-komponenty/">Opisywałem już</a> zdarzenia cyklu życia (<em>lifecycle hooks</em>) w AngularJS 1.5 i podobny koncept istnieje również w Angular 2. Krótko mówiąc, chodzi o takie metody w klasie komponentu, które są automatycznie wywoływane przez Angulara gdy komponent jest tworzony, zmieniany lub niszczony. Szczegóły można <a href="https://angular.io/docs/ts/latest/guide/lifecycle-hooks.html">doczytać</a>, w tym przypadku interesuje nas jedno konkretne zdarzenie: tworzenie komponentu.</p>

<p class="important">Dobrą praktyką jest umieszczanie jak najmniej logiki w konstruktorze klasy. Dzięki temu instancjonowanie komponentu jest szybsze, łatwiej nim zarządzać i testować. Bardziej skomplikowane operacje zalecam przenieść do metody <code>ngOnInit</code> z interfejsu <code>OnInit</code>.</p>

<p>Aby wpiąć się w jedno ze zdarzeń cyklu życia, polecane jest zaimplementowanie w klasie komponentu odpowiedniego interfejsu udostępnianego przez Angulara. Chcemy wykonać pewne operacje od razu po stworzeniu komponentu, więc implementujemy interfejs <code>OnInit</code>, który zawiera metodę <code>ngOnInit</code>. Zostanie ona automatycznie wywołana przez Angulara po stworzeniu komponentu. Cały kod klasy ostatecznie wygląda w ten sposób:</p>

<pre><code class="language-typescript">export class AppComponent implements OnInit {  
  public contacts:Array&lt;Contact&gt;;

  ngOnInit() {
    this.contacts = this.contactsService.contacts;
  }

  constructor(private contactsService:ContactsService) {
  }
}
</code></pre>

<h1 id="wejcieiwyjciekomponentu">Wejście i wyjście komponentu</h1>

<p>Widok stworzonego komponentu zawiera w sobie tylko jeden komponent <code>&lt;typeofweb-contacts-list&gt;</code>. Chcielibyśmy do tego komponentu przekazać jako argument tablicę z kontaktami. Jak to zrobić? Opisywałem wcześniej różne rodzaje bindingów w Angular 2. Można przekazać coś do komponentu, odebrać od niego, lub użyć bindingu dwukierunkowego. Służą do tego specjalne dekoratory <code>@Input</code> i <code>@Output</code>, które umieszcza się przed nazwą pola w klasie:</p>

<pre><code class="language-typescript">export class TypeofwebComponent {  
  @Input() name:string;
  @Output() event = new EventEmitter();
}
</code></pre>

<p>Aby teraz przekazać do komponentu atrybut <code>name</code> wystarczy po prostu napisać:</p>

<pre><code class="language-html">&lt;typeofweb-component name="Michał"&gt;&lt;/typeofweb-component&gt;  
&lt;typeofweb-component [name]="variable"&gt;&lt;/typeofweb-component&gt;  
</code></pre>

<p>W pierwszej wersji przekazywany jest ciąg znaków „Michał”, w drugiej przekazana zostanie zawartość zmiennej <code>variable</code>. Skorzystanie z bindingu <code>@Output</code> jest nieco bardziej skomplikowane. Przede wszystkim w kodzie HTML przekazujemy funkcję, którą definiuje się w klasie wyżej:</p>

<pre><code class="language-html">&lt;typeofweb-component (event)=“handler($event)”&gt;&lt;/typeofweb-component&gt;  
</code></pre>

<p>Teraz, aby <code>handler</code> został wywołany, konieczne jest wyemitowanie zdarzenia wewnątrz klasy <code>TypeofwebComponent</code>:</p>

<pre><code class="language-typescript">this.event.emit('Dziala');  
</code></pre>

<p>Nie wspomniałem tutaj o bindingu dwukierunkowym, gdyż nie ma do niego specjalnej składni. Taki binding definiuje się poprzez stworzenie pola z dekoratorem <code>@Input</code> i pola o tej samej nazwie z suffiksem <code>Change</code> z dekoratorem <code>@Output</code>:</p>

<pre><code class="language-html">&lt;typeofweb-component [(name)]=“variable”&gt;&lt;/typeofweb-component&gt;  
</code></pre>

<pre><code class="language-typescript">@Input() name:string;
@Output() nameChange = new EventEmitter();
</code></pre>

<h1 id="referencjanaelement">Referencja na element</h1>

<p>Przy okazji warto wspomnieć o jeszcze jednym specjalnym symbolu używanym w szablonach: <code>#</code> czyli referencji na element. Spójrzmy od razu na przykład. Zakładam, że w klasie komponentu istnieje metoda <code>log</code>, która wypisuje przekazaną wartość do konsoli:</p>

<pre><code class="language-html">&lt;input #mojInput&gt;  
&lt;button (click)="log(mojInput.value)"&gt;Log&lt;/button&gt;  
</code></pre>

<p>Teraz po wpisaniu czegoś w input i kliknięciu w guzik, w konsoli wyświetli się wpisana wartość. Jak to działa? <code>#mojInput</code> oznacza stworzenie lokalnej (w szablonie) zmiennej, która wskazuje na dany element. Pod zmienną <code>mojInput</code> znajduje się w tym przypadku referencja na input, a więc <code>mojInput.value</code> zawiera w sobie wartość wpisaną w pole. Jeśli <code>#</code> zostanie użyty na elemencie, który jest komponentem, to referencja będzie wskazywała na kontroler tego komponentu – więcej <a href="https://angular.io/docs/ts/latest/guide/template-syntax.html#template-reference-variables">w dokumentacji</a>.</p>

<h1 id="listakontaktw">Lista kontaktów</h1>

<p>Wróćmy do tworzonej aplikacji. W komponencie <code>ContactsListComponent</code> definiujemy pole przyjmujące tablicę kontaktów:</p>

<pre><code class="language-typescript">@Input() contacts:Array&lt;Contact&gt;;
</code></pre>

<p>a w widoku <code>AppComponent</code> przekazujemy ją jako atrybut:</p>

<pre><code class="language-html">&lt;typeofweb-contacts-list [contacts]="contacts"&gt;&lt;/typeofweb-contacts-list&gt;  
</code></pre>

<p>To jednak… nie działa. Jeszcze. Dodatkowo każdy komponent (lub jego rodzic, patrz punkt o <a href="#dependencyinjection">hierarchicznym <em>Dependency Injection</em></a>) <strong>powinien definować komponenty i dyrektywy, z których będzie korzystał</strong> (analogicznie do tablicy <code>providers</code>). Do dekoratora <code>@Component</code> komponentu <code>AppComponent</code> dodajemy więc:</p>

<pre><code class="language-typescript">directives: [ContactsListComponent]  
</code></pre>

<h1 id="prawiegotowaaplikacja">Prawie gotowa aplikacja</h1>

<p>Korzystając z wiedzy, którą już posiadamy, możemy teraz napisać resztę aplikacji. Po pierwsze definiujemy, że <code>ContactsListComponent</code> będzie korzystał z <code>ContactItemComponent</code>:</p>

<pre><code class="language-typescript">directives: [ContactItemComponent]  
</code></pre>

<p>W widoku listy kontaktów iteruję po wszystkich kontaktach i kolejno je wyświetlam:</p>

<pre><code class="language-html">&lt;ul&gt;  
  &lt;li *ngFor="let contact of contacts"&gt;
    &lt;typeofweb-contact-item [contact]="contact"&gt;&lt;/typeofweb-contact-item&gt;
  &lt;/li&gt;
&lt;/ul&gt;  
</code></pre>

<p>Komponent przyjmuje jako atrybut pojedynczy obiekt z kontaktem:</p>

<pre><code class="language-typescript">@Input() contact:Contact;
</code></pre>

<p>I wyświetla go:</p>

<pre><code class="language-html">&lt;div&gt;Name: {{contact.name}}&lt;/div&gt;  
&lt;div&gt;Age: {{contact.age}}&lt;/div&gt;  
&lt;typeofweb-gravatar [email]="contact.email" size="64"&gt;&lt;/typeofweb-gravatar&gt;  
</code></pre>

<p><em>Voilà</em>! Gotowe. Źródła komponentu <code>typeofweb-gravatar</code> tutaj pominę, ale całość dostępna jest na moim GitHubie: <a href="https://github.com/mmiszy/angular2-contacts-list">github.com/mmiszy/angular2-contacts-list</a>. Efekt prezentuje się poniżej:</p>

<iframe class=large style="height: 350px" src="//embed.plnkr.co/wPYeiHJ53qVytGA3MQ4I/" frameborder="0" allowfullscren="allowfullscren"></iframe>

<h1 id="podsumowanie">Podsumowanie</h1>

<p>W tym artykule opisałem kilka istotnych elementów tworzenia aplikacji w Angular 2. Po pierwsze nowe komendy Angular CLI: <code>ng generate …</code>. Ponadto omówiłem sposoby implementacji wejścia i wyjścia do komponentów, wstrzykiwanie zależności oraz tworzenie pośredniczących serwisów. W kolejnej części dokończę projekt listy zadań w Angular 2 i omówię komunikację pomiędzy komponentami z wykorzystaniem Reduksa. Aby oswoić się z samymi konceptami Reduksa, polecam mój wpis <a href="https://typeofweb.com/2016/06/10/flux-i-redux/">Flux i Redux</a>. Zachęcam do komentowania!</p>
