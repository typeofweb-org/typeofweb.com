---
id: 30
index: 19
title: "Kurs TypeScript – część\_3"
date: 2016-08-10T08:22:00.000Z
status: publish
permalink: kurs-typescript-czesc-3
authors:
  - michal-miszczyszyn
guid: https://typeofweb.com/index.php/2016/08/10/kurs-typescript-czesc-3/
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
<p>Kontynuuję serię wpisów na temat TypeScript. Pisząc poprzedni post złapałem się na tym, że dobijałem już do blisko 1800 słów. Uznałem, że to zdecydowanie za dużo jak na jeden wpis i stąd tak szybko kolejna część ;) W tym odcinku mówię o <strong>zaawansowanych typach, aliasach i literałach. Dodatkowo poruszam również temat inferencji typów</strong>. Zapraszam do czytania :)</p>

<p class=important>Zakładam, że czytelnicy są zaznajomieni z JavaScriptem, a w szczególności z konceptami dodanymi w ECMAScript 2015 takimi jak <code>class</code> oraz <code>let</code> i <code>const</code>. Jeśli jednak coś jest niejasne to chętnie odpowiem na pytania w komentarzach.</p>

<h1 id="zaawansowanetypy">Zaawansowane typy</h1>

<p>W poprzednim wpisie przy okazji przykładu z tablicą zwierząt, użyłem czegoś co nazwałem <em>union type</em>. Dla przypomnienia wyglądało to tak:</p>

<pre><code class="language-typescript">const animals:Array&lt;Horse|Dog|ShibaInu|Poodle&gt; = [];  
</code></pre>

<p>Jest to jeden z tzw. typów zaawansowanych. Omówmy je teraz szybko:</p>

<h2 id="_uniontype_"><em>Union type</em></h2>

<p><em>Union type</em> pozwala na opisanie typu, który jest <strong>jednym typem lub drugim typem</strong>. Przykładowo możemy stworzyć funkcję, która jako argument przyjmuje <code>number</code> lub <code>Date</code>:</p>

<pre><code class="language-typescript">function formatDate(date:number|Date) {  
    if (typeof date === "number") {
        // tutaj TypeScript już wie, że data jest liczbą!
        date = new Date(date);
    }
    …
}
</code></pre>

<h2 id="_intersectiontype_"><em>Intersection type</em></h2>

<p><em>Intersection type</em> jest blisko związany z <em>union type</em>, ale pozwala na opisanie typu, który ma cechy kilku typów na raz. Najczęściej wykorzystywany jest z interfejsami. Korzystając z interfejsów z poprzedniej części, wyobraźmy sobie, że chcemy stworzyć funkcję, która oczekuje obiektu będącego na raz <code>Serializable</code> i <code>Drawable</code>:</p>

<pre><code class="language-typescript">function mojaFunkcja(obiekt:Serializable &amp; Drawable) {  
    // obiekt na pewno ma metody toJSON i draw!
}
</code></pre>

<h1 id="aliasytypw">Aliasy typów</h1>

<p>TypeScript pozwala na definiowanie aliasów typów. Możemy na przykład zdefiniować typ <code>Name</code>, który będzie stringiem:</p>

<pre><code class="language-typescript">type Name = string;

class User {  
    firstName:Name;
}
</code></pre>

<p>Dzięki temu potencjalna zmiana jednego typu na drugi będzie łatwiejsza. Dodatkowo poprawia to również czytelność kodu i łatwość jego tworzenia. Spójrzmy na przykład:</p>

<pre><code class="language-typescript">class Process {  
    flag: boolean;
}
</code></pre>

<p>Intuicyjnie, pole o nazwie <code>flag</code> mogłoby być typu <code>boolean</code>, <code>enum</code>, <code>number</code> lub <code>string</code> i każdy z tych typów mógłby mieć sens. Możliwe jest również, że kiedyś w przyszłości będziemy potrzebować zmienić <code>boolean</code> na <code>string</code> (z powodu daleko idącej refaktoryzacji kodu). Jeśli pole <code>flag</code> zadeklarujemy po prostu jako <code>boolean</code>, taka zmiana będzie znacznie trudniejsza. Oprócz klasy będziemy musieli prawdopodobnie również zmodyfikować funkcje, które będą miały na stałe wpisany typ <code>boolean</code>:</p>

<pre><code class="language-typescript">isProcessFlagValid(flag:boolean) {  
    …
}
</code></pre>

<p>Dobrym rozwiązaniem tego problemu jest stworzenie nowego typu dla tego pola:</p>

<pre><code class="language-typescript">type ProcessFlag = boolean;

class Process {  
    flag: ProcessFlag;
}

isProcessFlagValid(flag:ProcessFlag) {  
    …
}
</code></pre>

<p>Dzięki temu nie musimy pamiętać dokładnie jakiego typu jest to pole w klasie, a w razie potrzeby jego zmiany, łatwo znajdziemy wszystkie miejsca, w których wymagana jest modyfikacja, po prostu szukając odwołania do typu <code>ProcessFlag</code>.</p>

<h2 id="aliasfunkcji">Alias funkcji</h2>

<p>Możliwe jest również zdefiniowanie typu oznaczającego funkcję. Jest to bardzo przydatne przy opisywaniu definicji callbacków przekazywanych do funkcji. Wyobraźmy sobie, że tworzymy bibliotekę, w której jedna z funkcji oczekuje, że inny programista przekaże jako argument funkcję, która jako argument przyjmuje obiekt typu <code>User</code> i zwraca <code>true</code> lub <code>false</code> jeśli użytkownik jest poprawny.</p>

<pre><code class="language-typescript">// nasza biblioteka
type UserCallback = (user:User) =&gt; boolean;

function fetchUser(callback:UserCallback) { … }

// kod użytkownika
function fetchUserCallback(user:User) {  
    if (user.name === 'Michal') {
        return true;
    }
    return false;
}

fetchUser(fetchUserCallback);  
</code></pre>

<p>Dzięki zadeklarowaniu typu callback w powyższy sposób, jeśli użytkownik spróbuje przekazać nieprawidłową funkcję jako argument to otrzyma błąd:</p>

<pre><code class="language-typescript">// blad!
fetchUser((user:User) =&gt; {  
    // zapomnialem zwrocic true lub false
});
</code></pre>

<h1 id="_stringliteraltype_"><em>String Literal Type</em></h1>

<p><strong>Często zdarza mi się potrzeba zadeklarowania tego, że funkcja jako argument może przyjąć nie tyle typ, co konkretne wartości</strong>. Przykładowo tworzymy funkcję, która pobiera pewne rekordy z bazy danych. Chcemy dać użytkownikom możliwość grupowania tych danych po sekundach, minutach, godzinach lub dniach. Rozwiązaniem, które może przyjść do głowy to zadeklarowanie, że funkcja przyjmuje <code>string</code>, a następnie sprawdzenie czy ten string ma odpowiednią wartość:</p>

<pre><code class="language-typescript">function groupRecords(groupBy:string) {  
    if (groupBy === "second" || groupBy === "minute" || groupBy === "hour" || groupBy === "day") {
        …
    } else {
        // blad!
    }
}
</code></pre>

<p>Istniej jednak lepsze rozwiązanie od tego. Zdefiujmy sobie typ <code>GroupBy</code>:</p>

<pre><code class="language-typescript">type GroupBy = 'second'|'minute'|'hour'|'day';

function groupRecords(groupBy:GroupBy) {  
    …
}
</code></pre>

<p>Dzięki temu kompilator sam sprawdzi (w miarę możliwości!), czy podana wartość jest prawidłowa. <em>String literal type</em> świetnie sprawdzi się też jako flaga wspomniana w poprzednim akapicie.</p>

<h1 id="inferencjatypw">Inferencja typów</h1>

<p>O inferencji typów wspominałem już w swoim innym wpisie na temat TypeScripta: <a href="https://typeofweb.com/2016/04/05/typescript-na-serwerze/">TypeScript z node.js?</a>. Ponownie wykorzystam przykład z tamtego wpisu:</p>

<pre><code class="language-typescript">function fn(b:boolean) {  
    if (b === true) {
        return 1;
    } else {
        return 2;
    }
}
</code></pre>

<p>Ta funkcja zwraca liczbę i jest to ewidentne. TypeScript również jest tego pewien i dlatego <strong>nie musimy tutaj podawać zwracanego typu</strong>. TypeScript inferuje, że jest to <code>number</code>:</p>

<pre><code class="language-typescript">const liczba:number = fn(true); // dziala!  
</code></pre>

<p>Możemy pójść nawet o krok dalej. Skoro fakt, że <code>fn</code> zwraca lizbę jest oczywisty, to czy w ogóle konieczne jest deklarowanie <code>liczba:number</code>? Nie!</p>

<pre><code class="language-typescript">const liczba = fn(true); // dziala!  
</code></pre>

<p>Ponownie TypeScript inferuje, że zmienna <code>liczba</code> jest typu <code>number</code>. Ten kod oraz poprzedni są sobie całkowicie równoważne.</p>

<p>W sytuacjach, które są dwuznaczne TypeScript wyświetli błąd i zmusi do zadeklarowania odpowiedniego typu:</p>

<pre><code class="language-typescript">function fn2(b:boolean):string|number {  
    if (b === true) {
        return 1;
    } else {
        return 'lol';
    }
}
</code></pre>

<p>Bez deklaracji <code>string|number</code> otrzymalibyśmy błąd:</p>

<blockquote>
  <p>No best common type exists among return expressions.</p>
</blockquote>

<p>Inferencja typów działa również gdy od razu przypisujemy do zmiennej lub stałej wartości:</p>

<pre><code class="language-typescript">const tab1 = [0, 1, 'lel']; // Array&lt;number|string&gt;  
const tab2 = [0, null]; // Array&lt;number&gt;  
const tab3 = [new Dog('leszek'), new Horse('rafal')]; // Array&lt;Dog|Horse&gt;  
</code></pre>

<p>Dwie pierwsze linijki są chyba oczywiste. Jednak w ostatnim przypadku (odwołuję się tutaj do kodu z poprzedniego wpisu) klasy <code>Dog</code> i <code>Horse</code> mają wspólną klasę bazową <code>Animal</code>, a więc moglibyśmy przecież oczekiwać, że tablica <code>tab3</code> będzie typu <code>Animal</code>! <strong>Tak się jednak nie dzieje i TypeScript jasno informuje o tym w swojej dokumentacji</strong>. Aby otrzymać taki efekt w tablicy musiałaby się znaleźć instancja klasy <code>Animal</code> – w przeciwnym wypadku musimy ręcznie zadeklarować typ. To wszystko dla naszego dobra, uwierzcie mi na słowo :)</p>

<pre><code class="language-typescript">const tab3:Array&lt;Animal&gt; = [new Dog('leszek'), new Horse('rafal')]; // Array&lt;Animal&gt;  
</code></pre>

<p><strong>Dzięki rozbudowanemu mechanizmowi inferencji typów kod staje się o wiele bardziej zwięzły i prostszy do pisania</strong> bez utraty zalet statycznego typowania. Wiele długich i formalnych definicji możemy po prostu pominąć. Inferencja typów jest elementem praktycznie każdego nowoczesnego języka programowania, między innymi C#, Go, C++, Haskell, Swift czy Rust.</p>

<h1 id="podsumowanie">Podsumowanie</h1>

<p>I to by było na tyle w tym wpisie! Dowiedzieliśmy się całkiem sporo na temat typów zaawansowanych: <em>union type</em> i <em>intersection type</em>. Ponadto nauczyliśmy się definiować aliasy typów oraz funkcji. Doceniliśmy również zwięzłość kodu, jaką daje nam inferencja typów :)</p>

<p>W kolejnym wpisie z serii wykorzystamy zdobytą wiedzę i spróbujemy przepisać prosty widget napisany w JS na TypeScript. Zachęcam do komentowania i zadawania pytań!</p>
