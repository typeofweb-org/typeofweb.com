---
title: Komunikacja pomiędzy komponentami w Angular 2
date: 2016-07-02T13:29:16.000Z
isMarkdown: false
status: publish
permalink: komunikacja-pomiedzy-komponentami-w-angular-2
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
series:
  slug: angular-2
  name: Angular 2
seo: {}
---

<p>Przed Wami trzecia część kursu Angular 2. W tym wpisie omawiam różne sposoby komunikacji pomiędzy komponentami na prostych przykładach.</p>

<p class="important"><strong>Angular 2 nie jest jeszcze gotowy na produkcję</strong>. W momencie powstawania tego wpisu najnowszą wersją tego frameworka była <em>Release Candidate 4</em>. Jest to wersja prawie gotowa do wydania, jednak minie jeszcze trochę czasu zanim całość się ustabilizuje, a pomiędzy wersjami RC-1, RC-2 i RC-3 pojawiły się dość poważne zmiany (routing, formularze).</p>

<h1 id="interakcjapomidzykomponentami">Interakcja pomiędzy komponentami</h1>

<p>W poprzednich artykułach wspominałem o tym, że jest wiele sposobów na zrealizowanie komunikacji pomiędzy komponentami. Pokazałem również prosty przykład przekazywania danych od rodzica do dziecka przy pomocy <a href="https://typeofweb.com/wlasne-komponenty-w-angular-2/">dekoratora <code>@Input</code></a>. Jednak tak minimalistyczny przypadek  rzadko zdarza się w rzeczywistości i te metody zdecydowanie nie są wystarczające do tworzenia rozbudowanych aplikacji internetowych! Na szczęście sam Angular 2 daje nam co najmniej kilka opcji, z których możemy skorzystać w celu przesyłania informacji pomiędzy komponentami. Możliwości jest wiele i każdą z nich opiszę po krótce.</p>

<h1 id="inputczylikomunikacjarodzicazdzieckiem"><code>@Input</code> czyli komunikacja rodzica z dzieckiem</h1>

<p>Działanie dekoratora <code>@Input</code> pokazywałem już w poprzednim artykule. Pozwala on na przesyłanie danych do komponentu. Jednak co w przypadku gdy chcemy <strong>dowiedzieć się kiedy dokładnie przekazywane dane się zmieniają</strong>? Osobom znającym AngularJS nasuwa się pewnie <code>$watch</code>, jednak w Angularze 2 nie musimy już kombinować w ten sposób!</p>

<p>Zacznijmy od podstawowego kodu. Tworzymy komponent mający jedno pole z adnotacją <code>@Input</code>. W ten sposób z poziomu rodzica możemy przekazać dane do dziecka, jak to już opisywałem:</p>

<pre><code class="language-typescript">@Component({
  selector: 'my-child-component',
  template: `
    prop1: {{ prop1 }}
  `
})
export class MyChildComponent {  
  @Input() prop1:string;
}
</code></pre>

<p>Pierwszą metodą, aby być informowanym o modyfikacjach zachodzących w <code>prop1</code>, jest zamiana tej właściwości w parę setter/getter. Zamiast <code>@Input() prop1:string;</code> piszemy:</p>

<pre><code class="language-typescript">private _prop1;

@Input() set prop1(prop1:string) {
  this._prop1 = `${prop1} decorated!`;
}
get prop1() {  
  return this._prop1;
}
</code></pre>

<p>W momencie zmiany wartości pola <code>prop1</code> zostanie wywołana funkcja. W tym przypadku wykorzystujemy ją do udekorowania przekazanej wartości poprzez dodanie do niej ciągu znaków “ decorated!”. Bardziej przydatnym przykładem mogłoby być np. ustawienie wartości domyślnej gdy <code>prop1</code> jest puste.</p>

<p>Druga metoda to wykorzystanie wspomnianego w poprzednim wpisie zdarzenia cyklu życia <code>ngOnChanges</code>. W klasie komponentu implementujemy interfejs <code>OnChanges</code> i tworzymy metodę <code>ngOnChanges</code>:</p>

<pre><code class="language-typescript">ngOnChanges(changes: SimpleChanges) {  
  const prop2Changes:SimpleChange = changes['prop2'];
  if (prop2Changes) {
    console.log(`prop2 changed!`, changes['prop2']);
  }
}
</code></pre>

<p>Metoda ta przyjmuje obiekt opisany interfejsem <code>SimpleChanges</code>, w którym kluczami są zmieniające się właściwości, a wartościami są specjalne obiekty typu <code>SimpleChange</code>. W tym przypadku interesują nas zmiany właściwości <code>prop2</code>, więc jeśli takowe są to wyświetlamy informację przy pomocy <code>console.log(…)</code>. Obiekt typu <code>SimpleChange</code> zawiera w sobie pola <code>previousValue</code> i <code>currentValue</code> oraz metodę <code>isFirstChange()</code>. Więcej można doczytać w dokumentacji <a href="https://angular.io/docs/ts/latest/api/#!?apiFilter=simplechange">SimpleChange</a>. Tutaj działający przykład komunikacji rodzica z dzieckiem:</p>

<iframe class=large style="height: 350px" src="//embed.plnkr.co/7pk97xu3Erjx4ZeSGheK/" frameborder="0" allowfullscren="allowfullscren"></iframe>

<h1 id="outputczylikomunikacjadzieckazrodzicem"><code>@Output</code> czyli komunikacja dziecka z rodzicem</h1>

<p>Działanie dekoratora <code>@Output</code> pokazywałem już w poprzednim wpisie, więc nie chcę się tutaj rozwodzić. Dla formalności krótki przykład. W komponencie-dziecku tworzymy pole z adnotacją <code>@Output</code> do którego przypisujemy nową instancję <code>EventEmitter</code>. Następnie w odpowiednim momencie wywołujemy metodę <code>emit</code> na tej instancji, gdy chcemy powiadomić rodzica o zmianach:</p>

<pre><code class="language-typescript">@Output() onProp = new EventEmitter&lt;string&gt;();

onInput(value:string) {  
  this.onProp.emit(value);
}
</code></pre>

<p>Rodzic zać ustawia odpowiedni callback na komponencie-dziecku:</p>

<pre><code class="language-html">&lt;my-child-component (onProp)="changed($event)"&gt;&lt;/my-child-component&gt;  
</code></pre>

<p>Zobaczcie cały kod w interaktywnym przykładzie:</p>

<iframe class=large style="height: 350px" src="//embed.plnkr.co/DbwcCoKtybLMvaJf9kuY/" frameborder="0" allowfullscren="allowfullscren"></iframe>

<h1 id="refczylilokalnareferencjanakomponentdziecko"><code>#ref</code> czyli lokalna referencja na komponent-dziecko</h1>

<p>W Angular 2 rodzic może stworzyć sobie lokalną referencję na własności klasy komponentu-dziecka. Wyobraźmy sobie, że mamy komponent, który wykonuje jakieś asynchroniczne operacje. Chcielibyśmy mieć możliwość kontrolowania tego komponentu z zewnątrz: zatrzymania jego pracy, wznowienia jej oraz odczytania postępu wyrażonego w procentach. Nic prostszego! W szablonie rodzica tworzymy lokalną referencję na komponent-dziecko i możemy korzystać ze wszystkich metod i własności klasy dziecka:</p>

<pre><code class="language-html">&lt;my-child-component #child&gt;&lt;/my-child-component&gt;

progress: {{ child.progress * 100 }}%  
&lt;button (click)="child.start()"&gt;start&lt;/button&gt;  
&lt;button (click)="child.stop()"&gt;stop&lt;/button&gt;  
</code></pre>

<p>Fragment kodu klasy komponentu-dziecka wygląda tak:</p>

<pre><code class="language-typescript">export class MyChildComponent {  
  progress = 0;

  start() {
    …
  }

  stop() {
    …
  }
}
</code></pre>

<p>Tutaj można zobaczyć cały kod prezentujący lokalną referencję na dziecko.</p>

<iframe class=large style="height: 350px" src="//embed.plnkr.co/MXROVGkaig7MdisvXXWv/" frameborder="0" allowfullscren="allowfullscren"></iframe>

<h1 id="viewchildczylireferencjanadzieckowklasierodzica"><code>@ViewChild</code> czyli referencja na dziecko w klasie rodzica</h1>

<p>Zaprezentowana przed chwilą metoda świetnie sprawdzi się w prostych przypadkach, ma jednak jedno poważne ograniczenie: <strong>Cała logika związana z referencją na komponent-dziecko musi być zawarta w szablonie rodzica</strong>. Innymi słowy, klasa rodzica nie ma dostępu do dziecka. Problem ten można rozwiązać używając dekoratora <code>@ViewChild</code> w klasie rodzica. Aby dostać referencję na komponent-dziecko używamy tej adnotacji w podobny sposób jak <code>@Input</code> czy <code>@Output</code>:</p>

<pre><code class="language-typescript">export class ParentComponent {  
  @ViewChild(MyChildComponent) private childComponent:MyChildComponent;

  get progress():number {
    return this.childComponent.progress;
  }

  start() {
    this.childComponent.start();
  }

  stop() {
    this.childComponent.stop();
  }
}
</code></pre>

<p class="important">Jeśli chcemy robić z komponentem-dzieckiem coś bardziej skomplikowanego to musimy poczekać na jego zainicjalizowanie. Mamy pewność, że tak się stało dopiero w zdarzeniu cyklu życia <code>ngAfterViewInit</code>.</p>

<p>Dla porównania prezentuję dokładnie ten sam przykład co w poprzednim akapicie, jednak zaimplementowany z użyciem <code>@ViewChild</code>:</p>

<iframe class=large style="height: 400px" src="//embed.plnkr.co/PnmD1az3mIr4b57j3wzg/" frameborder="0" allowfullscren="allowfullscren"></iframe>

<p class="important">Jeśli komponentów-dzieci jest kilka możemy skorzystać z dekoratora <code>@ViewChildren</code>, który pobiera kilka komponentów-dzieci i zwraca jako <a href=https://angular.io/docs/js/latest/api/core/index/QueryList-class.html><code>QueryList</code></a>, który jest żywą obserwowalną kolekcją</p>

<h1 id="komunikacjaprzypomocyserwisu">Komunikacja przy pomocy serwisu</h1>

<p>W bardziej rozbudowanych aplikacjach komunikacja pomiędzy rodzicem a dzieckiem to jedno, natomiast <strong>bardzo potrzebny jest również sposób na przesyłanie informacji pomiędzy komponentami, które są od siebie bardziej oddalone</strong>. W szczególności: Pomiędzy komponentami, które nie wiedzą gdzie wzajemnie znajdują się w strukturze aplikacji. Użycie do tego pośredniczącego serwisu jest bardzo uniwersalne. Dodatkowo możemy tutaj użyć biblioteki <code>rxjs</code>, z której korzysta zresztą sam Angular 2.</p>

<p class="important"><code>rxjs</code> jest biblioteką implementującą reaktywne programowanie funkcyjne (FRP) w JavaScripcie. Jest to dość skomplikowany koncept wymagający zmiany myślenia o programowaniu, dlatego na potrzeby tego artykułu skorzystamy tylko z podstawowych możliwości <code>rxjs</code>. Więcej można doczytać <a href=http://reactivex.io/rxjs/>w dokumentacji</a>.</p>

<p>Przykładowy serwis zamieszczam poniżej. Publiczne pole <code>data$</code> jest tym, co będą mogły obserwować komponenty (za pośrednictwem tego pola będą odbierać informacje). Metoda <code>addData</code> posłuży im zaś do przesyłania danych.</p>

<pre><code class="language-typescript">@Injectable()
export class DataService {  
  private dataSource = new Subject&lt;string&gt;();
  data$ = this.dataSource.asObservable();

  addData(value:string) {
    this.dataSource.next(value);
  }
}
</code></pre>

<p>Aby skorzystać z takiego serwisu tradycyjnie dodajemy go do tablicy <code>providers</code> w dekoratorze klasy, która jest wspólnym rodzicem komunikujących się ze sobą komponentów. Następnie wstrzykujemy go do konstruktorów komponentów-dzieci i używamy:</p>

<pre><code class="language-typescript">class MyChildComponent {  
  addData() {
    this.dataService.addData('data');
  }

  constructor(private dataService: DataService) {
    dataService.data$.subscribe((value:string) =&gt; {
      console.log('Data!', value);
    });
  }
}
</code></pre>

<p>Podobnie jak w poprzednich przypadkach, tutaj również wrzucam interaktywny przykład wykorzystania pośredniczącego serwisu z <code>rxjs</code>:</p>

<iframe class=large style="height: 350px" src="//embed.plnkr.co/EDc2L3K1xeFdso5yXjBa/" frameborder="0" allowfullscren="allowfullscren"></iframe>

<h1 id="podsumowanie">Podsumowanie</h1>

<p>Opisałem kilka różnych sposobów komunikacji pomiędzy komponentami sugerowanych przez twórców Angular 2. <strong>Są to metody, które znajdą zastosowanie głównie w prostych przypadkach i raczej nie sprawdzą się do komunikowania się wielu komponentów</strong>. W celu zarządzania stanem całej aplikacji oraz przesyłania danych pomiędzy odległymi komponentami zastosowałbym raczej bibliotekę Redux. <a href="https://typeofweb.com/flux-i-redux-globalny-store-jednokierunkowy-przeplyw-danych/">Koncept Reduksa już opisywałem</a>, a jego konkretne zastosowanie w aplikacji Angular 2 znajdzie się w kolejnym wpisie, który już jest w trakcie powstawania :)</p>
