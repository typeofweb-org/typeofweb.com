---
index: 14
title: Dependency Injection w Angular 2
date: 2016-07-19T10:40:43.000Z
isMarkdown: false
status: publish
permalink: dependency-injection-w-angular-2
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

<p>Angular 2 aktywnie korzysta ze wzorca projektowego Dependency Injection. Ten wpis poświęciłem wyłącznie implementacji DI w tym frameworku. Jest ona bardzo rozbudowana i niezwykle ciekawa, a jej dokładne poznanie pozwoli na lepsze zrozumienie wstrzykiwania zależności w Angularze oraz sprawi, że będziemy tworzyć aplikacje bardziej świadomie i łatwiej.</p>

<p class="important">Samemu <a href=https://typeofweb.com/2016/07/07/wzorce-projektowe-dependency-injection/>tematowi Dependency Injection przeznaczyłem osobny wpis</a>. Piszę tam o wzorcu projektowym, niezależnie od implementacji.</p>

<p>Zacznijmy może od tego, że Dependency Injection jest bardzo ważną częścią Angular 2. <strong>Bez korzystania z DI nie możemy budować nawet prostych aplikacji</strong>. Angular 2 ma własny framework DI (który ma być udostępniony jako moduł niezależny od Angulara, do wykorzystania w dowolnej aplikacji). Co takiego robi dla nas DI w Angular 2? Spójrzmy na prosty przykład. Podobny kod widzieliśmy już wielokrotnie:</p>

<pre><code class="language-typescript">// child.component.ts
class MyChildComponent {  
  constructor(private dataService: DataService) { … }
}

// data.service.ts
@Injectable()
export class DataService { … }

// app.component.ts
@Component({
  selector: 'my-app',
  directives: [MyChildComponent],
  providers: [DataService],
  template: `
  &lt;my-child-component&gt;&lt;/my-child-component&gt;
  &lt;my-child-component&gt;&lt;/my-child-component&gt;
  `
})
class MyAppComponent { … }  
</code></pre>

<p>To autentyczny kod z wpisu <a href="https://typeofweb.com/2016/07/02/komunikacja-pomiedzy-komponentami-w-angular-2/">Komunikacja pomiędzy komponentami w Angular 2</a>. Widzimy tutaj komponent <code>MyChildComponent</code>, który do konstruktora ma wstrzykniętą instancję serwisu <code>DataService</code>. Aby wstrzykiwanie w ogóle było możliwe, klasa <code>DataService</code> jest dodatkowo dodana do tablicy <code>providers</code> w komponencie <code>AppComponent</code>. Wcześniej założyliśmy, że to po prostu działa – Angular 2 magicznie wie, że powinien tę zalożność wstrzyknąć i <em>voilà</em> – tak się stawało! Teraz jednak zastanówmy się jak to się dzieje pod maską.</p>

<h1 id="rejestracjazalenoci">Rejestracja zależności</h1>

<p>Zauważmy, że klasa <code>DataService</code> została oznaczona dekoratorem <code>@Injectable</code>. W jakim celu? Jako dobrą praktykę polecam oznaczać wszystkie serwisy jako <code>@Injectable</code>. Jest to informacja dla modułu Angular 2 odpowiedzialnego za wstrzykiwanie zależności, zwanego <strong>injector</strong>. Dzięki temu staje się on świadomy istnienia naszej klasy i pozwala na wstrzykiwanie zależności również do niej.</p>

<p>Tutaj może pojawić się pewna myśl: <em>„Ale przecież nigdy nie korzystaliśmy z żadnego modułu injector!”</em>. Okazuje się, że korzystaliśmy z niego wielokrotnie, ale nigdy świadomie – nie musimy sami tworzyć tego modułu, Angular robi to za nas w trakcie powoływania do życia aplikacji.</p>

<h2 id="bootstrap"><code>bootstrap</code></h2>

<p>Aby Dependency Injection mogło działać, Angular musi wiedzieć co i skąd powinien wstrzykiwać. <strong>Dlatego każdą zależność musimy wcześniej zarejestrować</strong>. Kiedyś krótko wspomniałem o tym, że funkcja <code>bootstrap(…)</code> przyjmuje jako drugi argument listę zależności – to właśnie one trafiają do głównego, najwyższego Injectora w Angularze. <strong>Jest to jedna z metod rejestrowania zależności</strong>. Moglibyśmy więc zrobić coś takiego:</p>

<pre><code class="language-typescript">bootstrap(AppComponent,  
         [DataService]); // nie róbcie tego
</code></pre>

<p>I dzięki temu instancja serwisu <code>DataService</code> byłaby dostępna z poziomu każdego komponentu w naszej aplikacji! To działa, jednak <strong>nie jest to najlepszy sposób</strong> na wykorzystanie DI. Drugi argument funkcji <code>bootstrap</code> przewidziany jest do trzech rzeczy:</p>

<ul>
<li>rejestrowania modułów, które naprawdę muszą być globalne i są niezbędne do działania aplikacji <strong>w ogóle</strong> – na przykład Redux</li>
<li>nadpisywania modułów wbudowanych w Angular 2</li>
<li>konfiguracji modułów w zależności od środowiska (np. przeglądarka / serwer)</li>
</ul>

<p>Pozostałe przypadki lepiej jest obsłużyć używając tablicy <code>providers</code> w konkretnych komponentach.</p>

<h2 id="tablicaproviderswkomponentach">Tablica <code>providers</code> w komponentach</h2>

<p>W kodzie wyżej zarejestrowaliśmy serwis <code>DataService</code> na poziomie komponentu <code>AppComponent</code>. Dlaczego? Co prawda sam <code>AppComponent</code> z niego nie korzysta, ale jego dzieci – <code>ChildComponent</code> – już tak. W naszym przykładzie <code>DataService</code> jest serwisem, który ma być współdzielony przez oba komponenty <code>ChildComponent</code>.</p>

<p>Moglibyśmy nie rejestrować tego serwisu w komponencie <code>ApppComponent</code>, a zamiast tego zrobić to w <code>ChildComponent</code>. W takim przypadku jednak <strong>instancje wstrzyknięte do tych komponentu byłyby różne</strong> i nie mogłyby posłużyć do komunikacji! Porównajmy ze sobą dwa poniższe przykłady. Jedyną różnicą jest właśnie miejsce rejestracji serwisu:</p>

<iframe class=large style="height: 450px" src="//embed.plnkr.co/PodZGJjEWPEE0ADqctOa" frameborder="0" allowfullscren="allowfullscren"></iframe>

<iframe class=large style="height: 450px" src="//embed.plnkr.co/kh2eUNmibiwbLVD3DgXI" frameborder="0" allowfullscren="allowfullscren"></iframe>

<p>W pierwszym przypadku rejestracja <code>DataService</code> ma miejsce w komponencie <code>MyChildComponent</code> i przez to każdy z komponentów <code>MyChildComponent</code> otrzymał swoją własną instancję serwisu. W drugim przypadku serwis zostaje zarejestrowany w rodzicu (<code>AppComponent</code>) i dzięki temu komponenty-dzieci współdzielą tę samą instancję <code>DataService</code>. Nasuwa się tutaj jeden ważny wniosek: <strong>Instancje zależności zarejestrowanych w komponencie są współdzielone przez wszystkie jego dzieci</strong>.</p>

<p class="important">Innymi słowy, zależności w Angular 2 są <strong>singletonami</strong> na poziomie danego injectora.</p>

<h1 id="wieleinjectorw">Wiele injectorów</h1>

<p>Widząc zmianę zachowania wstrzykiwania związaną z tym, gdzie zarejestrujemy zależność, możemy zadać sobie pytanie: Czy injector musi zapamiętywać, gdzie zarejestrowane były zależności? <strong>A może injectorów jest kilka?</strong></p>

<p>Ten drugi strzał okazuje się strzałem w dziesiątkę! Rzeczywiście, Angular 2 tworzy, równolegle do drzewa komponentów, <strong>drzewo injectorów</strong>. Koncepcyjnie możemy sobie wyobrazić, że injector jest tworzony razem z każdym komponentem, chociaż w rzeczywistości jest to trochę bardziej skomplikowane (i bardziej zomptymalizowane), jednak faktem jest, że <strong>każdy komponent posiada injector</strong>.</p>

<h2 id="hierarchicznedi">Hierarchiczne DI</h2>

<p>Wynika z tego bezpośrednio, że <strong>Dependency Injection w Angular 2 jest hierarchiczne</strong>. Jednak co to oznacza? Kiedy komponent żąda wstrzyknięcia jakiegoś serwisu, Angular próbuje tę zależność spełnić. Sprawdza najpierw injector na poziomie komponentu – jeśli ten nie ma zarejestrowanego serwisu, Angular przechodzi o poziom wyżej i sprawdza injector rodzica. Jeśli ten również go nie posiada – sprawdzany jest kolejny komponent i kolejny, coraz wyżej, aż serwis zostanie odnaleziony. W przeciwnym wypadku – Angular rzuca wyjątek. Na prostym przykładzie. Wyobraźmy sobie takie drzewo komponentów:</p>

<p><img src="/content/images/2016/07/Screenshot-2016-07-11-15-59-13.png" alt="Drzewo komponentów" /></p>

<p>Oraz tak zarejestrowane zależności:</p>

<ul>
<li><code>AppComponent</code> – <code>ServiceA, ServiceB, ServiceC</code></li>
<li><code>ListComponent</code> – <code>ServiceB, ServiceC</code></li>
<li><code>ListItemComponent</code> – <code>ServiceC</code></li>
</ul>

<p>Jeśli <code>ListItemComponent</code> proprosi o wstrzyknięcie zależności <code>ServiceA, ServiceB, ServiceC</code> to otrzyma on te zależności <strong>od najbliższych komponentów w górę</strong>, w których zostały one zarejestrowane, czyli w tym przypadku każdy z serwisów otrzyma od innego komponentu. Wynika z tego, że np. <code>ServiceB</code> i <code>ServiceC</code> zarejestrowane w <code>ListComponent</code> przysłaniają <code>ServiceB</code> i <code>ServiceC</code> zarejestrowane w <code>AppComponent</code>. Wykropkowane linie określają rejestrację zależności, a strzałki wstrzykiwanie:</p>

<p><img src="/content/images/2016/07/Screenshot-2016-07-11-16-20-17.png" alt="Hierarchiczne DI" /></p>

<h2 id="optional"><code>@Optional</code></h2>

<p>W poprzednim akapicie napisałem, że jeśli zależność nie zostanie odnaleziona to Angular rzuca wyjątek. Zazwyczaj jest to zachowanie, którego oczekujemy, bo chroni nas przed typowymi pomyłkami, np. niezarejestrowaną zależnością lub literówką w nazwie. Co jednak, gdy wyjątkowo chcemy, aby Angular daną zależność po prostu zignorował, jeśli nie zostanie ona odnaleziona? Możemy użyć do tego dekoratora <code>@Optional</code>:</p>

<pre><code class="language-typescript">class MyChildComponent {  
  constructor(
      @Optional() private dataService: DataService
  ) { … }
}
</code></pre>

<p>W powyższym przykładzie, jeśli serwis <code>DataService</code> nie został zarejestrowany to <code>dataService</code> przyjmie wartość <code>null</code>.</p>

<h1 id="gdzierejestrowazalenoci">Gdzie rejestrować zależności</h1>

<p>Jak widzimy na powyższych przykładach, decyzja o tym gdzie zarejestrowany został serwis wpływa na zachowanie aplikacji. W takim razie nasuwa się pytanie: <strong>Gdzie rejestrować zależności?</strong></p>

<p>Najlepszym podejściem jest rejestracja zależności najniżej, jak tylko się da. Innymi słowy – najbliżej komponentu, który tej zależności potrzebuje. Proste przykłady zamieszczam poniżej w tabelce:</p>

<table>  
<thead>  
<tr>  
<th>przykład użycia serwisu</th><th>miejsce rejestracji</th>  
</tr>  
</thead>  
<tbody>  
    <tr>
        <td>stan aplikacji (np. Redux)</td>
        <td>najwyższy komponent aplikacji lub funkcja <code>bootstrap</code></td>
    </tr>
    <tr>
        <td>komunikacja pomiędzy elementami listy</td>
        <td>najbliższy wspólny rodzic, czyli komponent listy</td>
    </tr>
    <tr>
        <td>serwis wspomagający edycję rekordu w tabelce</td>
        <td>komponent, który umożliwia edycję</td>
    </tr>
</tbody>  
</table>

<h1 id="providers">Providers</h1>

<p>Cały czas mówimy o tym, że zależności należy zarejestrować przed użyciem. Jednak do tej pory widzieliśmy tylko jeden sposób rejestracji zależności, poprzez podanie klasy:</p>

<pre><code class="language-typescript">providers: [MyService] // MyService jest klasą  
</code></pre>

<p>Jednak co w sytuacji, gdy nasza zależność nie jest klasą?</p>

<h2 id="tokeny">Tokeny</h2>

<p>Zależności w Angular 2 rozróżniane są na podstawie tzw. <strong>tokenów</strong>. Klasa jest jednym z tokenów, ale możliwości jest więcej. Token może być również po prostu ciągiem znaków – nazwą zależności. Możliwa jest taka rejestracja zależności:</p>

<pre><code class="language-typescript">providers: [  
    { provide: 'MyDependency' useValue: 'Hello, world!' })
]
</code></pre>

<p>Łatwo domyślić się, że zarejestrowaliśmy tutaj zależność o nazwie <code>MyDependency</code>, która po wstrzyknięciu będzie po prostu wartością: <code>’Hello, world!'</code>. Możemy teraz ją wstrzyknąć, ale robimy to również w nieco odmienny sposób:</p>

<pre><code class="language-typescript">class MyChildComponent {  
  constructor(
      @Inject('MyDependency') private myDependency: string
  ) { … }
}
</code></pre>

<p>Używamy dekoratora <code>@Inject(…)</code> i podajemy do niego nazwę zależności.</p>

<p>Powraca tutaj jednak pewien problem: <strong>Używając stringa do reprezentacji zależności możemy przypadkiem mieć konflikt nazw</strong>. Załóżmy, że dwie osoby w zespole stworzą zupełnie różne zależności i obie nazwą <code>'ListHelper'</code><sup id="fnref:1"><a href="#fn:1" rel="footnote">1</a></sup>. Jedna może przypadkiem przysłonić drugą… Do odróżniania zależności potrzebujemy więc czegoś więcej niż prostego stringa. Czegoś <strong>unikatowego</strong> i <strong>symbolicznego</strong>.</p>

<h3 id="opaquetoken"><code>OpaqueToken</code></h3>

<p>Oba te wymagania spełnia specjalny obiekt <code>OpaqueToken</code> udostępniony przez Angulara. Jest to konstruktor, który możemy wykorzystać w następujący sposób:</p>

<pre><code class="language-typescript">// MyDependency.ts
import { OpaqueToken } from '@angular/core';  
export const MY_DEPENDENCY_TOKEN = new OpaqueToken('MyDependency');

// komponent
import { MY_DEPENDENCY_TOKEN, MyDependency } from './MyDependency';  
providers: [  
   {provide: MY_DEPENDENCY_TOKEN, useValue: MyDependency })
]
</code></pre>

<p>Następnie taki <code>OpaqueToken</code> wykorzystujemy również do wstrzykiwania:</p>

<pre><code class="language-typescript">import { MY_DEPENDENCY_TOKEN } from './MyDependency';

class MyChildComponent {  
  constructor(
      @Inject(MY_DEPENDENCY_TOKEN) private myDependency: string
  ) { … }
}
</code></pre>

<h2 id="zaawansowanezalenoci">Zaawansowane zależności</h2>

<p>Jak można zobaczyć w przykładzie wyżej, tablica <code>providers</code> przyjmuje nie tylko klasy, lecz  również obiekty, które pozwalają na bardziej zaawansowaną konfigurację. Omówmy teraz sposoby rejestracji zależności:</p>

<h3 id="usevaluewartoci"><code>useValue</code> - wartości</h3>

<p>Dodanie do obiektu własności <code>useValue</code> pozwala na podmianę zależności na konkretną wartość. Jest to bardzo przydatne w przypadku konfigurowania wartości, które zależą od informacji dostępnych dopiero w trakcie uruchamiania aplikacji – przykładowo adres strony. Dodatkowo <code>useValue</code> przydaje się w trakcie pisania testów jednostkowych, gdyż pozwala w łatwy sposób podmienić zależność na jej mock:</p>

<pre><code class="language-typescript">{ provide: DataService, useValue: dataServiceMock }
</code></pre>

<h3 id="useclassklasy"><code>useClass</code> – klasy</h3>

<p>Możemy skorzystać z tego atrybutu, aby podmienić klasę na jej alternatywną implementację. Przydatne np. w zależności od środowiska lub w trakcie testów jednostkowych:</p>

<pre><code class="language-typescript">class DataService { … }  
class LocalStorageDataService { … }  
…
{ provide: DataService, useClass: LocalStorageDataService }
</code></pre>

<p class="important">Jeśli myślisz teraz o <strong>wzorcu projektowym strategia</strong> – to dobrze. Jest to jeden ze scenariuszy gdy <code>useClass</code> jest przydatne.</p>

<h3 id="useexistingtworzeniealiasw"><code>useExisting</code> - tworzenie aliasów</h3>

<p>DI w Angular 2 umożliwia również tworzenie aliasów zależności. Jednym z zastosowań jest przysłanianie pewnych metod w zależności od sposobu wstrzyknięcia. Przykładem może być stworzenie wersji serwisu „tylko do odczytu”. Pod spodem nadal jest to ten sam serwis, jednak w zależności od tego co wstrzykujemy, otrzymujemy dostęp tylko do pewnych metod:</p>

<pre><code class="language-typescript">class DataService {  
    private data: Array&lt;string&gt;;
    add(value:string) {
        this.data.push(value);
    }
    getLast():string {
        return this.data[this.data.length - 1];
    }
}

abstract class ReadonlyDataService {  
    getLast: () =&gt; string;
}

{ provide: ReadonlyDataService, useExisting: DataService }
</code></pre>

<p>Jeśli teraz wstrzykniemy <code>ReadonlyDataService</code>, będziemy mieli dostęp tylko do metody <code>getLast</code> – mimo, że w rzeczywistości będziemy pracować na instancji klasy <code>DataService</code>.</p>

<h3 id="usefactoryfabryka"><code>useFactory</code> – fabryka</h3>

<p>Według dokumentacji należy skorzystać z tej własności wtedy, gdy tworzona zależność jest <strong>kombinacją wstrzykniętych serwisów i stanu aplikacji</strong>. Fabryka jest funkcją, która zwraca wartość. Przykładowo:</p>

<pre><code class="language-typescript">{
    provide: MY_DEPENDENCY_TOKEN,
    useFactory: myDependencyFactor(true),
    deps: [DataService]
}
</code></pre>

<p>Zauważmy, że w trakcie rejestracji przekazujemy do fabryki argument zależny od stanu aplikacji. W tym przypadku jest to <code>true</code> – mógłby to być na przykład parametr ustawiany w trakcie budowania aplikacji, oznaczający czy aplikacja jest w trybie debug, czy nie, ale równie dobrze może to być dowolna wartość, obiekt… cokolwiek. Dodatkowo fabryka wymaga też zależności zarejestrowanych w Angularze (<code>DataService</code>). Nasza <code>myDependencyFactory</code> wygląda tak:</p>

<pre><code class="language-typescript">export function myDependencyFactory(isDebug) {  
    return (dataService: DataService) =&gt; {
        if (isDebug) {
            …
        } else {
            …
        }
    };
}
</code></pre>

<h3 id="usefactoryvsusevalue"><code>useFactory</code> vs <code>useValue</code></h3>

<p>Uważne osoby dostrzegły pewnie, że we wpisie <a href="https://typeofweb.com/2016/07/04/angular-2-i-redux/">Angular 2 i Redux</a> wykorzystałem <code>useFactory</code>, podczas gdy mógłbym to zrobić prościej i skorzystać z <code>useValue</code>. Przypomnijmy sobie fragment kodu:</p>

<pre><code class="language-typescript">const appStoreFactory = () =&gt; {  
  const appStore = createStore(rootReducer, undefined, window.devToolsExtension &amp;&amp; window.devToolsExtension());
  return appStore;
};
provide('AppStore', { useFactory: appStoreFactory })  
</code></pre>

<p>Czy ten kod nie byłby równoważny z następującym?</p>

<pre><code class="language-typescript">const appStore = createStore(rootReducer, undefined, window.devToolsExtension &amp;&amp; window.devToolsExtension());  
provide('AppStore', { useValue: appStore })  
</code></pre>

<p>Na pierwszy rzut oka: Tak. <strong>Jednak po głębszej analizie okazuje się, że ich zachowania minimalnie się różnią</strong>. Jeśli wykorzystalibyśmy ten drugi, prostszy kod, nie moglibyśmy skorzystać z wtyczki Redux do Chrome, gdyż zmiany w niej wprowadzane nie miałyby odzwierciedlenia w aplikacji. Dlaczego? <strong>Ponieważ kod wewnątrz <code>useFactory</code> wykonywany jest po stworzeniu przez Angulara tzw. <code>Zone</code></strong>. Warto o tym pamiętać. Więcej na ten temat tego czym jest w ogóle <code>Zone</code> w Angularze w innej części kursu Angular 2.</p>

<h1 id="zaawansowanedi">Zaawansowane DI</h1>

<p>Czy to już wszystko, co oferuje DI w Angularze? <strong>Absolutnie nie.</strong> Jednak pozostałe elementy są tak szczegółowe, że nie zmieściłyby się w tym wpisie! W razie potrzeby warto doczytać o takich aspektach jak wstrzykiwanie rodzica w komponencie-dziecku, dekoratorach <code>@Host</code> i <code>@SkipSelf</code> oraz funkcji <code>forwardRef</code>. Szczegółowe informacje na te tematy można znaleźć <a href="https://angular.io/docs/ts/latest/cookbook/dependency-injection.html#!#find-a-parent-component-by-injection">w dokumentacji</a>.</p>

<h1 id="podsumowanie">Podsumowanie</h1>

<p>W tej części kursu Angular 2 omówiłem Dependency Injection w Angularze. Jest to moduł bardzo rozbudowany i szczegółowo opisałem wiele  jego możliwości. Warto pamiętać o potencjale, który DI nam daje – o drzewie injectorów i zastępowaniu istniejących zależności mockami w czasie testów. Mam nadzieję, że wiedza, którą tutaj zawarłem pomoże w bardziej świadomym tworzeniu aplikacji w Angular 2. Zachęcam do komentowania :)</p>

<div class="footnotes"><ol><li class="footnote" id="fn:1"><p>“Są tylko dwie rzeczy trudne w informatyce - pierwsza to nazewnictwo, druga to inwalidacja cache.” Za nazwę ListHelper ktoś powinien oberwać ;) <a href="#fnref:1" title="return to article">↩</a></p></li></ol></div>
