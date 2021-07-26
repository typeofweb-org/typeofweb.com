---
id: 23
index: 12
title: TypeScript – część 1
date: 2016-07-11T06:19:00.000Z
status: publish
permalink: typescript-czesc-1
authors:
  - michal-miszczyszyn
guid: https://typeofweb.com/index.php/2016/07/11/typescript-czesc-1/
type: post
categories:
  - slug: javascript
    name: JavaScript
  - slug: front-end
    name: Front-end
  - slug: back-end
    name: Back-end
series:
  slug: typescript
  name: TypeScript
seo: {}

---
<p>„TypeScript – typowany nadzbiór JavaScriptu, kompilowany do czystego JavaScriptu” – głosi napis na stronie głównej <a href="https://www.typescriptlang.org/">typescriptlang.org</a>. Używam go praktycznie codziennie, w różnych projektach, z różnymi technologiami. Od pewnego czasu, w dużej mierze za sprawą Angulara 2, ale nie tylko, TS zaczął zyskiwać sporą popularność i uznanie w społeczności webdeveloperów.</p>

<p class=important>W tym artykule zakładam, że czytelnicy są zaznajomieni JavaScriptem, a w szczególności z konceptami dodanymi w ECMAScript 2015 takimi jak <code>class</code> oraz <code>let</code> i <code>const</code>.</p>

<h1 id="czymjesttypescript">Czym jest TypeScript</h1>

<p>TypeScript jest darmowym i otwartym językiem programowania stworzonym i rozwijanym przez Microsoft od 2012 roku. <strong>Jest rozwinięciem JavaScriptu, w którym dodano opcjonalne statyczne typowanie</strong> i kilka dodatkowych rzeczy, o których napiszę dalej. TypeScript kompiluje się do JavaScriptu i może być używany zarówno po stronie serwera (node.js), jak i w przeglądarce.</p>

<h2 id="kompilacjawlocie">Kompilacja w locie</h2>

<p>Są dwa sposoby na korzystanie z TypeScriptu. Pierwszy z nich to użycie skryptu <code>typescript.js</code>, który potrafi w locie kompilować kod TypeScript do JavaScriptu. Jest to przydatna możliwość i korzystam z niej zawsze, gdy wrzucam proste przykłady na strony typu <a href="http://plnkr.co">plnkr.co</a>. Niektóre edytory online (jak na przykład <a href="http://codepen.io">CodePen</a>) nie wymagają nawet tego skryptu, a kompilację TypeScript można włączyć w ustawieniach.</p>

<h2 id="typescriptprodukcyjnie">TypeScript produkcyjnie</h2>

<p>W praktyce jednak do budowania aplikacji znacznie lepiej sprawdza się sposób drugi – czyli skompilowanie TypeScriptu i zapisanie kodu wynikowego jako plik z rozszerzeniem <code>.js</code>, a następnie korzystanie z tego pliku. Jest to rozwiązanie znacznie bardziej wydajne i z tego względu lepsze w przypadku tworzenia czegoś więcej niż proste demo.</p>

<h2 id="typescriptplayground">TypeScript Playground</h2>

<p>Dodatkowo TypeScriptem można pobawić się na tzw. placu zabaw – <a href="http://www.typescriptlang.org/play/index.html">TypeScript Playground</a>. Po otwarciu tej strony widoczne są dwa pola tekstowe. W lewym wpisujemy kod TS, w prawym zaś widoczne są efekty kompilacji. Dodatkowo w trakcie edycji w URL-u zapisywany jest kod źródłowy, dzięki czemu możemy go skopiować i komuś wysłać, a ta osoba zobaczy dokładnie to samo co my.</p>

<h1 id="kompatybilno">Kompatybilność</h1>

<p>Wspomniałem, że TS jest nadzbiorem, rozwinięciem JavaScriptu – oznacza to, że <strong>dowolny kod napisany w JavaScript jest również prawidłowym kodem w TypeScripcie</strong>. Ostatecznie kod napisany w TS kompilowany jest do JS. Co z tego? Są to ogromne zalety z kilku powodów.</p>

<p>Po pierwsze, <strong>aby zacząć korzystać z TS nie trzeba od razu poznawać go w całości</strong> – nowych aspektów można się uczyć i używać fragmentami, a resztę kodu pisać tak jak zwykły JS.</p>

<p>Ponadto <strong>w projekcie, który już jest napisany w JavaScripcie możemy zacząć używać TypeScriptu właściwie w dowolnym momencie</strong>. Aktualnie pracuję zresztą nad jednym projektem, który jest w takim etapie przejściowym – duża część plików jest napisana w czystym JavaScripcie, a nowe moduły już w TypeScripcie.</p>

<p>Daje to ogromną elastyczność oraz pozwala na spróbowanie pracy z TS właściwie w dowolnym miejscu. Dodatkowo jest to odpowiedź na jeden z argumentów przeciwko TS: „<em>Co jeśli TypeScript przestanie być rozwijany</em>”? TS daje nam możliwość łatwego powrotu do JavaScriptu, nawet jeśli część aplikacji jest już napisana w TypeScripcie. Nie musimy przepisywać niczego na nowo, wystarczy tylko skompilować TS do JS i dalej pracować na czystym JavaScripcie.</p>

<h1 id="typy">Typy</h1>

<h2 id="statycznietypowanie">Statycznie typowanie</h2>

<p>Chyba najważniejszą cechą TypeScriptu jest dodanie statycznego, silnego typowania. <strong>Statyczne typowanie oznacza, że zmienne mają nadane typy i te typy nie mogą się zmienić<sup id="fnref:1"><a href="#fn:1" rel="footnote">1</a></sup></strong>. Na przykład poniższy kod jest całkowicie poprawny w JS:</p>

<pre><code class="language-javascript">let x = 1;  
x = 'abc';  
x = new Date();  
</code></pre>

<p>Zmienna <code>x</code> nie ma ustalonego typu. Na początku przechowuje liczbę, potem ciąg znaków, a na koniec obiekt z datą. Czy jest to przydatna możliwość? Bez wątpienia daje nam ogromną możliwość ekspresji. Jednak większość doświadczonych programistów na pewno przyzna, że kod napisany w ten sposób jest podatny na błędy i nieczytelny – i muszę przyznać im całkowitą rację. <strong>W TypeScripcie zmienne mogą mieć ustalony z góry typ</strong> i wtedy niemożliwe jest przypisanie do nich czegoś, co nie jest z tym typem zgodne (na przykład daty do zmiennej z liczbą). </p>

<h2 id="silnetypowanie">Silne typowanie</h2>

<p><strong>Silne typowanie oznacza zaś, że zmienna o ustalonym typie nie może być użyta tam, gdzie oczekiwany jest inny typ<sup id="fnref:2"><a href="#fn:2" rel="footnote">2</a></sup></strong>. Mówiąc prościej: Nie możemy porównać liczby z ciągiem znaków, albo przekazać daty do funkcji, która oczekuje liczby. Spójrzmy na przykład kodu w JS:</p>

<pre><code class="language-javascript">const x = 1;  
if (x === "1") { /* porównanie liczby ze stringiem */ }

function dodaj(a, b) { return a + b; }  
dodaj(1, 2); // 3  
dodaj("1", "2"); // "12"  
</code></pre>

<p>W pierwszym przykładzie porównujemy liczbę ze stringiem. Już na pierwszy rzut oka nie ma to sensu. W drugim przykładzie stworzyliśmy funkcję, która zwraca nieoczekiwane rezultaty, gdy przekażemy parametry o innych typach. Obu tych błędów można uniknąć używając TypeScripta. Co ważniejsze – bez TS te błędy zostaną zauważone dopiero na etapie testowania aplikacji. Natomiast jeśli wykorzystamy TypeScript to <strong>informację o pomyłkach dostaniemy już w trakcie kompilacji kodu</strong>.</p>

<h1 id="typywtypescript">Typy w TypeScript</h1>

<p>Spróbujmy więc poprawić kod z poprzednich przykładów tak, aby błędy zakończyły się niepowodzeniem kompilacji. Następnie przejdziemy do bardziej skomplikowanych przykładów.</p>

<p>Typy w TypeScript piszemy po znaku dwukropka:</p>

<pre><code class="language-typescript">let x:number;  
</code></pre>

<p>Podobnie można też oznaczać argumenty funkcji oraz typ przez nie zwracany:</p>

<pre><code class="language-typescript">function round(a:number):string {  
    return a.toFixed(2);
}
</code></pre>

<p>Wbudowane podstawowe typy to znane z JavaScriptu:</p>

<ul>
<li><code>boolean</code></li>
<li><code>number</code></li>
<li><code>string</code></li>
<li><code>array</code></li>
</ul>

<p>Dodatkowo TypeScript oferuje również typy bardziej zaawansowane:</p>

<ul>
<li><code>tuple</code></li>
<li><code>enum</code></li>
<li><code>any</code></li>
<li><code>void</code></li>
</ul>

<p>i kilka innych bardziej skomplikowanych konceptów.</p>

<h2 id="boolean">Boolean</h2>

<p>Jeden z najbardziej podstawowych typów. Reprezentuje wartość logiczną, prawdę lub fałsz: <code>true</code>, <code>false</code>.</p>

<h2 id="number">Number</h2>

<p>Liczby zmiennoprzecinkowe znane z JavaScriptu, włączając w to literały heksadecymalne, oktalne i binarne: <code>6</code>, <code>1.2e5</code> <code>0xbeaf</code>, <code>0b1010101</code>, <code>0o765</code>.</p>

<h2 id="string">String</h2>

<p>Ciągi znaków, identyczne do tych w JavaScripcie. Możemy je zapisywać przy pomocy cudzysłowów i apostrofów, wspierane są też <em>template stringi</em>:  </p>

<pre><code class="language-typescript">const x:string = 'Hello';  
const y:string = "world";

const tpl = `${x}, ${y}!`; // Hello, world!  
</code></pre>

<h2 id="array">Array</h2>

<p>Podobnie jak w JS, w TypeScripcie możemy operować na tablicach wartości. Typ tablicowy możemy zapisać na dwa sposoby, a ze względu na to, że przechowują one wartości o określonym typie, podajemy go:  </p>

<pre><code class="language-typescript">const arr1:Array&lt;number&gt; = [1, 2, 3];  
const arr2:number[] = [1, 2, 3];  
</code></pre>

<h2 id="tuple">Tuple</h2>

<p>Tupla to skończona lista elementów. w TypeScripcie jest to tablica, której długość jest dokładnie znana, a typy wszystkich elementów jasno określone:  </p>

<pre><code class="language-typescript">const tuple:[number, string] = [1, 'd'];  
</code></pre>

<h2 id="enum">Enum</h2>

<p>Enumeracja to zbiór nazwanych wartości. Bardzo przydatny dodatek do JavaScriptu, znany z wielu innych języków takich jak C++, Java czy C#. W TS jest to zbiór wartości liczbowych:  </p>

<pre><code class="language-typescript">enum Suit {  
    Spades,
    Hearts,
    Diamonds,
    Clubs
};

const cards:Suit = Suit.Spades; // 0  
</code></pre>

<p>Domyślnie elementy enumeracji są numerowane od zera, ale można to zmienić:</p>

<pre><code class="language-typescript">enum Suit {  
    Spades = 123,
    Hearts,
    Diamonds,
    Clubs
};

// Suit.Hearts to 124
</code></pre>

<h2 id="any">Any</h2>

<p>Czasem może nam się zdarzyć, że nie będziemy w stanie określić typu jakiejś zmiennej – służy do tego <code>any</code>. Zmienne typu <code>any</code> mogą przyjmować dowolne wartości:  </p>

<pre><code class="language-typescript">let x:any = 4;  
x = 'a';  
x = new Date();  
</code></pre>

<p>Typ <code>any</code> może się okazać przydatny w przypadku tablic przechowujących wartości różnych typów:</p>

<pre><code class="language-typescript">const x:Array&lt;any&gt; = [];  
x.push(1);  
x.push('a');  
x.push(new Date);  
</code></pre>

<p class=important>Zawsze polecam spróbować zrefaktorować kod tak, aby określenie typu było możliwe. <strong>Używanie typu <code>any</code> niweczy wszystkie zalety typowania</strong>.</p>

<h2 id="void">Void</h2>

<p>Ten typ oznacza „brak wartości”. Powszechnie używa się go do oznaczania funkcji, które nic nie zwracają:  </p>

<pre><code class="language-typescript">function showAlert(text:string):void {  
    window.alert(text);
}
</code></pre>

<h2 id="poprawionykod">Poprawiony kod</h2>

<p>Wróćmy więc do oryginalnego kodu. Po dodaniu typów będzie on wyglądał na przykład tak:</p>

<pre><code class="language-typescript">const x:number = 1;  
if (x === "1") { /* Błąd kompilacji! */ }

function dodaj(a:number, b:number) { return a + b; }  
dodaj(1, 2); // 3  
dodaj("1", "2"); // Błąd kompilacji!  
</code></pre>

<p>Wszystkie błędy polegające na niekonsekwentnych użyciu typów, albo na pomyleniu typów zostają wyłapane już przez kompilator!</p>

<h1 id="klasyiinterfejsy">Klasy i interfejsy</h1>

<p>TypeScript posiada również koncept klas znany z ECMAScript 2015. Pozwala to na myślenie bardziej orientowane-obiektowo i znacznie upraszcza składnię, choć w rzeczywistości pod maską całość opiera się o konstruktory i dziedziczenie prototypowe. Stwórzmy przykładową klasę:</p>

<pre><code class="language-typescript">class Animal {  
    name:string;

    constructor(givenName:string) {
        this.name = givenName;
    }

    sayHello():string {  
            return `Hello, my name is ${this.name}!`;
    }
}

const dog = new Animal('Burek');  
dog.sayHello() // 'Hello, my name is Burek!';  
</code></pre>

<p>Klasa ta posiada jedno pole typu <code>string</code> o nazwie <code>name</code> oraz jedną metodę zwracającą <code>string</code> – <code>sayHello</code>. Dodatkowo zdefiniowaliśmy również konstruktor, który przyjmuje imię i zapisuje je w polu <code>name</code>. Wewnątrz metody <code>sayHello</code> odwołujemy się do pola <code>name</code> poprzez <code>this.name</code>.</p>

<h2 id="privatepublic">Private, public</h2>

<p>Osoby znające inne języki obiektowe na pewno zastanawiają się czy <strong>TypeScript pozwala na tworzenie pól i metod prywatnych</strong>. Otóż tak, pozwala! Domyślnie wszystkie elementy klasy są publiczne, jednak można to zmienić poprzedzając ich deklarację słowem kluczowym <code>private</code>. Podobnie, można również <em>explicite</em> dodać słowo kluczowe <code>public</code>. Pole <code>name</code> oznaczyłem jako prywatne, bo nie chcę, aby dostęp do tego pola był możliwy z zewnątrz, natomiast metoda <code>sayHello</code> ma być dostępna dla wszystkich:</p>

<pre><code class="language-typescript">class Animal {  
    private name:string;

    constructor(givenName:string) {
        this.name = givenName;
    }

    public sayHello():string {  
            return `Hello, my name is ${this.name}!`;
    }
}
</code></pre>

<p class=important>Dobrą praktyką jest oznaczanie jako <code>private</code> wszystkiego co tylko się da, tak aby z zewnątrz był dostęp wyłącznie do tych pól i metod, które są potrzebne. Nazywa się to <strong>enkapsulacją</strong> lub hermetyzacją.</p>

<h2 id="interfejsy">Interfejsy</h2>

<p>Deklaracja klasy z użyciem słowa kluczowego <code>class</code> tworzy w TypeScripcie tak naprawdę dwie rzeczy:</p>

<ul>
<li>typ reprezentujący instancje</li>
<li>funkcję konstruktora</li>
</ul>

<p>Czasem jednak ten konstruktor nie jest nam potrzebny i jedyne czego chcemy to <strong>zdefiniować kształt obiektu</strong>. Innymi słowy, używamy obiektów o określonej strukturze i chcemy to jakoś opisać. Przykładowo chcemy opisać obiekt reprezentujący wiadomość. Wiadomość ma treść, nadawcę i odbiorcę, i w JavaScripcie wygląda tak:</p>

<pre><code class="language-javascript">const message = {  
    text: 'Hello',
    sender: 'Michal',
    receiver: 'Anna'
};
</code></pre>

<p>Możemy sformalizować kształt tego obiektu tworząc <strong>interfejs</strong>:</p>

<pre><code class="language-typescript">interface Message {  
    text:string;
    sender:string;
    receiver:string;
}
const message:Message = {  
    text: 'Hello',
    sender: 'Michal',
    receiver: 'Anna'
};
</code></pre>

<p>Dzięki temu jeśli na przykład zrobimy literówkę lub przypiszemy do <code>message</code> przez pomyłkę inną zmienną – dostaniemy błąd:  </p>

<pre><code class="language-typescript">const message:Message = {  
    text: 'Hello',
    sender: 'Michal',
    recevier: 'Anna'    // Błąd kompilacji! Literówka!
};
</code></pre>

<p class=important>Na potrzeby tego wpisu interfejsy możemy traktować jako wymagania stawiane obiektom, jednak <strong>ich możliwości są znacznie większe</strong> i opiszę to w kolejne części kursu TypeScript.</p>

<h1 id="definicjetypw">Definicje typów</h1>

<p>Wszystko jest pięknie, gdy w aplikacje znajduje się wyłącznie kod napisany w TypeScripcie. Co jednak, gdy chcemy z poziomu TypeScript skorzystać z istniejących bibliotek, które napisane w TS nie są? Brakuje przecież informacji o typach.</p>

<h2 id="plikidts">Pliki <code>.d.ts</code></h2>

<p>Odpowiedzią na ten problem są pliki z rozszerzeniem <code>.d.ts</code> – są to tzw. pliki definicji i zawierają wyłącznie informacje o typach, bez implementacji. Pliki te możemy pobrać przy pomocy narzędzia o nazwie <a href="https://github.com/typings/typings"><code>typings</code></a>. Przykładowo chcemy mieć informację o typach dla biblioteki <code>bluebird</code>, wydajemy więc polecenie:  </p>

<pre><code class="language-bash">typings install bluebird  
</code></pre>

<p>Pliki automatycznie są pobieranie, a niewielka konfiguracja naszego środowiska pozwoli nam z nich korzystać. Więcej na ten temat można doczytać w dokumentacji <a href="https://github.com/typings/typings">typings/typings</a>.</p>

<h1 id="podsumowanie">Podsumowanie</h1>

<p>W tym wprowadzeniu do TypeScript poznaliśmy podstawy tego języka. Dowiedzieliśmy się jakie podstawowe typy są dostępne i w jaki sposób ich używać. Ponadto nauczyliśmy się tworzyć klasy z publicznymi i prywatnymi polami i metodami oraz poznaliśmy podstawy interfejsów.</p>

<p>W kolejnej części nauczymy się używać bardziej zaawansowanych klas, klas abstrakcyjnych oraz dziedziczenia. Do tego będziemy też implementować interfejsy w klasach i skorzystamy z bardziej zaawansowanych typów, a także dowiemy się co to jest inferencja typów i dlaczego jest taka fajna :) Zachęcam do komentowania!</p>

<div class="footnotes"><ol><li class="footnote" id="fn:1"><p>za <a href="https://pl.wikipedia.org/wiki/Typowanie_statyczne">https://pl.wikipedia.org/wiki/Typowanie_statyczne</a> <a href="#fnref:1" title="return to article">↩</a></p></li>
<li class="footnote" id="fn:2"><p>za <a href="https://pl.wikipedia.org/wiki/Typowanie_silne">https://pl.wikipedia.org/wiki/Typowanie_silne</a> <a href="#fnref:2" title="return to article">↩</a></p></li></ol></div>
