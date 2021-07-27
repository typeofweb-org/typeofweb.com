---
id: 29
index: 18
title: Kurs TypeScript – część 2
date: 2016-08-08T13:55:32.000Z
status: publish
permalink: kurs-typescript-czesc-2
authors:
  - michal-miszczyszyn
guid: https://typeofweb.com/index.php/2016/08/08/kurs-typescript-czesc-2/
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

<p><a href="https://typeofweb.com/2016/07/11/typescript-czesc-1/">Poprzedni wpis na temat TypeScript</a> cieszył się niemałym zainteresowaniem i wiele osób pisało do mnie z pytaniem, kiedy pojawi się kontynuacja. I oto ona! <strong>W tym artykule nauczymy się korzystać z klas, klas abstrakcyjnych i dziedziczenia. Dodatkowo będziemy implementować interfejsy i zobaczymy czym różnią się od klas abstrakcyjnych</strong>. Zapraszam do czytania!</p>

<p class=important>Zakładam, że czytelnicy są zaznajomieni z JavaScriptem, a w szczególności z konceptami dodanymi w ECMAScript 2015 takimi jak <code>class</code> oraz <code>let</code> i <code>const</code>. Jeśli jednak coś jest niejasne to chętnie odpowiem na pytania w komentarzach.</p>

<h1 id="argumentykonstruktora">Argumenty konstruktora</h1>

<p>Zanim przejdziemy dalej, chciałbym zacząć od jednej przydatnej rzeczy. Prawdopodobnie bardzo często będziemy powtarzać kod podobny do tego:</p>

<pre><code class="language-typescript">class X {  
    private pole:typ;
    constructor(wartosc:typ) {
        this.pole = wartosc;
    }
}
</code></pre>

<p>Czyli: definiujemy pole w klasie, a następnie w konstruktorze przyjmujemy wartość jako argument i przypisujemy do tego pola. Czy da się to jakoś krócej zapisać? Otóż tak, da się! TypeScript sprawia, że powyższy zapis jest równoważny temu poniżej:</p>

<pre><code class="language-typescript">class X {  
    constructor(private pole:typ) {}
}
</code></pre>

<h1 id="dziedziczenie">Dziedziczenie</h1>

<p>W poprzednim wpisie pobieżnie omówiłem klasy i podstawy interfejsów w TypeScripcie. Nie napisałem jednak ani słowa o jednej z bardziej znanych cech programowania orientowanego obiektowo: <strong>O dziedziczeniu.</strong></p>

<p class=important>Dziedziczenie jest bez wątpienia przydatnym elementem programowania obiektowego, jednak jego nadużywanie jest bardzo szkodliwym antywzorcem. <strong>Zdecydowanie lepiej jest <a href=https://en.wikipedia.org/wiki/Composition_over_inheritance>faworyzować kompozycję nad dziedziczeniem</a>.</strong></p>

<p>Weźmy typowy, całkowicie oderwany od rzeczywistości przykład, używany chyba we wszystkich kursach programowania obiektowego. Stwórzmy klasę reprezentującą zwierzę!<sup id="fnref:1"><a href="#fn:1" rel="footnote">1</a></sup></p>

<pre><code class="language-typescript">class Animal {  
    constructor(protected name:string) {}

    giveVoice() {
        console.log(`Nazywam sie ${this.name}!`);
    }
}
</code></pre>

<p>W ten sposób stworzyliśmy klasę <code>Animal</code>, którą będziemy nazywać <strong>klasą bazową</strong>, gdyż inne klasy będą po niej dziedziczyć. Dziedziczenie oznacza się słowem kluczowym <code>extends</code>:</p>

<pre><code class="language-typescript">class Dog extends Animal {  
    constructor(protected name:string) {
        super(name);
    }

    giveVoice() {
        console.log('Szczek, szczek!');
        super.giveVoice();
    }

    eat() {
        console.log('Mniam.');
    }
}
</code></pre>

<p>Pojawia się tutaj nowe słowo kluczowe: <code>super</code>. <code>super</code> jest tak jakby odwołniem do klasy bazowej, po której dziedziczymy. Wywołując <code>super(name)</code> wykonujemy wszystkie operacje z konstruktora klasy bazowej. Natomiast wywołanie <code>super.giveVoice()</code> spowoduje wywołanie metody <code>giveVoice()</code> z klasy <code>Animal</code>:</p>

<pre><code class="language-typescript">const pies = new Dog('reksio');  
pies.giveVoice();

// Szczek, szczek!
// Nazywam sie reksio!
</code></pre>

<p>Klasę <code>Dog</code> nazywa się klasą pochodną. Dodatkowo warto zauważyć, że klasa <code>Dog</code> nie tylko dziedziczy po klasie <code>Animal</code>, ale również dodaje nową metodę <code>eat</code>. Oczywiście <strong>klasy pochodne mogą rozszerzać klasy bazowe</strong> – taki jest ich główny cel.</p>

<h2 id="dziedziczeniewielopoziomowe">Dziedziczenie wielopoziomowe</h2>

<p>Wiele nowych klas może dziedziczyć po klasie <code>Animal</code> – moglibyśmy stworzyć na przykład klasy <code>Horse</code> i <code>Pig</code>. Dodatkowo <strong>po klasach pochodnych również mogą dziedziczyć kolejne klasy</strong>. W tym przypadku można by się pokusić o stworzenie klasy <code>ShibaInu</code> i <code>Poodle</code>, które dziedziczyłyby po klasie <code>Dog</code>.</p>

<pre><code class="language-typescript">class Horse extends Animal {  
    constructor(protected name:string) {
        super(name);
    }

    giveVoice() {
        console.log('Parsk, parsk!');
        super.giveVoice();
    }
}

class ShibaInu extends Dog {  
    constructor(protected name:string) {
        super(name);
    }

    giveVoice() {
        console.log('Ale jestem slodki!');
        super.giveVoice();
    }
}
</code></pre>

<p class=important>TypeScript nie posiada dziedziczenia wielokrotnego (<em>multiple inheritance</em>). Wynika to bezpośrednio z idei prototypowego dziedziczenia w JavaScript. Obejściem tego ograniczenia jest przykładowo skorzystanie z mixinów.</p>

<h1 id="polimorfizm">Polimorfizm</h1>

<p>Ogromną zaletą dziedziczenia jest nie tylko współdzielnie kodu pomiędzy różnymi klasami, ale także <strong>polimorfizm</strong>. O teorii można sobie doczytać, bo polimorfizm ma wiele aspektów teoretycznych. W tym przypadku mam na myśli to, że w niektórych warunkach <strong>instancje klasy <code>Horse</code> czy <code>ShibaInu</code> można traktować tak, jakby były instancjami klasy <code>Animal</code></strong>. Przykładowo wyobraźmy sobie, że chcemy stworzyć tablicę przechowującą różne zwierzęta. Jak poprawnie zadeklarować typ takiej tablicy? Korzystając z zaawansowanych typów, możemy użyć tzw. <em>union type</em> (więcej o tym w kolejnym wpisie z tej serii):</p>

<pre><code class="language-typescript">const animals:Array&lt;Horse|Dog|ShibaInu|Poodle&gt; = [];  
</code></pre>

<p>Jednak to w tym przypadku całkowicie niepotrzebne, a do tego byłoby trudne w utrzymaniu, gdyż przy tworzeniu nowej klasy pochodnej musielibyśmy ją tutaj dopisać. Możemy jednak zadeklarować taką tablicę po prostu, <strong>jako przechowującą obiekty typu <code>Animal</code></strong>, gdyż wszystkie nasze zwierzęta po tej klasie dziedziczą:</p>

<pre><code class="language-typescript">const animals:Array&lt;Animal&gt; = [];  
</code></pre>

<p>Możemy więc teraz stworzyć taką tablicę, wrzucić do niej różne zwierzęta i wywołać na wszystkich po kolei w pętli metodę <code>giveVoice</code>:  </p>

<pre><code class="language-typescript">const piesek = new Dog('Burek');  
const qn = new Horse('Rafał');  
const animals:Array&lt;Animal&gt; = [piesek, qn];  
for (const animal of animals) {  
    animal.giveVoice();
}
</code></pre>

<p>Musimy być jednak świadomi, że w ten sposób ograniczamy sobie niejako możliwości wywoływania metod na obiektach z tej tablicy wyłącznie do metod zadeklarowanych w klasie <code>Animal</code>. Przykładowo nie mamy dostępu do metody <code>eat</code> dodanej w klasie <code>Dog</code>:</p>

<pre><code class="language-typescript">const piesek = new Dog('Burek');  
const animals:Array&lt;Animal&gt; = [piesek];  
piesek.eat() // ok!  
animals[0].eat() // błąd! widoczne są tylko metody z klasy Animal  
</code></pre>

<h1 id="protected"><code>protected</code></h1>

<p>W poprzedniej części wspominałem o dwóch modyfikatorach dostępu: <code>public</code> i <code>private</code>. Tutaj jednak użyłem czegoś innego: <code>protected</code>. Jest to koncept powszechnie wykorzystywany w różnych językach programowania i nie chcę poświęcać mu tutaj więcej uwagi. Powiem tylko, że <code>protected</code> daje taki sam rezultat jak <code>private</code>, za wyjątkiem sytuacji, w których korzystamy z dziedziczenia. <strong>Do pól zadeklarowanych jako <code>protected</code> możemy uzyskać dostęp również z poziomu klas pochodnych</strong>, a do pól <code>private</code> nie.</p>

<h1 id="interfejsy">Interfejsy</h1>

<p>Wspominałem już o interfejsach, za pomocą których możemy deklarować „kształt” obiektu. Jednak interfejsy dają nam znacznie większe możliwości. Przede wszystkim: <strong>Interfejsy możemy implementować w klasach</strong>. Oznacza to, że możemy wymusić na programiście zaimplementowanie konkretnych metod w klasie, aby klasa <strong>spełniała interfejs</strong>. Przykładowo wyobraźmy sobie, że nasza funkcja przyjmuje tylko i wyłącznie obiekty, które mają zdefiniowaną funkcję <code>toJSON</code>. Aby to zaznaczyć, tworzymy interfejs:</p>

<pre><code class="language-typescript">interface Serializable {  
    toJSON():string;
}

function naszaFunkcja(obiekt:Serializable) {  
    obiekt.toJSON(); // ta funkcja tutaj na pewno jest!
}
</code></pre>

<p>Teraz możemy wymusić na klasie implementację tej metody. Używamy do tego słowa <code>implements</code>:</p>

<pre><code class="language-typescript">class User implements Serializable {  
    toJSON() {
        return '{}';
    }
}

const user = new User();  
naszaFunkcja(user);  
</code></pre>

<p>Gdybyśmy nie zaimplementowali metody <code>toJSON</code> w klasie to otrzymalibyśmy błąd kompilacji.</p>

<h2 id="implementacjawieluinterfejsw">Implementacja wielu interfejsów</h2>

<p>Warto zwrócić jeszcze uwagę na to, że <strong>klasa może implementować kilka interfejsów w tym samym czasie</strong> – w odróżnieniu od dziedziczenia; <strong>dziedziczyć można tylko po jednej klasie</strong> na raz. Kolejne implementowane interfejsy wystarczy napisać po przecinku:</p>

<pre><code class="language-typescript">interface Drawable {  
    draw(ctx:CanvasRenderingContext2D):void;
}

class User implements Serializable, Drawable {  
    toJSON() {
        return '{}';
    }

    draw(ctx:CanvasRenderingContext2D) {
        ctx.drawImage(…);
    }
}
</code></pre>

<p>Poza metodami i polami, w interfejsach możliwe jest również zadeklarowanie konstruktorów, <em>index signatures</em> i wywołań (<em>callable interface</em>). Interfejsy możemy też rozszerzać. Jednak nie wystarszy mi miejsca, aby to wszystko tutaj opisać, dlatego żądnych wiedzy odsyłam do <a href="https://www.typescriptlang.org/docs/handbook/interfaces.html">dokumentacji TypeScript</a>.</p>

<h1 id="klasyabstrakcyjne">Klasy abstrakcyjne</h1>

<p>Klasy abstrakcyjne to klasy bazowe, po których można dziedziczyć, ale nie można ich instancjonować. Czym się więc różnią od interfejsów? Przede wszystkim <strong>klasy abstrakcyjne nie tylko zawierają deklaracje pól i metod, ale mogą też zawierać ich implementacje</strong>. Mogą, ale nie muszą. Idealnym kandydatem na klasę abstrakcyjną jest w takim razie wspomniana wcześniej klasa <code>Animal</code>, gdyż jej raczej nie chcemy instancjonować bezpośrednio. Dodajmy też do niej deklarację metody <code>eat</code>, ale bez implementacji (tzw. <strong>metodę abstrakcyjną</strong>). W ten sposób każda klasa pochodna będzie musiała zaimplementować <code>eat</code>:</p>

<pre><code class="language-typescript">abstract class Animal {  
    constructor(protected name:string) {}

    giveVoice() {
        console.log(`Nazywam sie ${this.name}!`);
    }

    abstract eat():void;
}

const animal = new Animal(''); // blad!  
</code></pre>

<h1 id="podsumowanie">Podsumowanie</h1>

<p>Starałem się najkrócej jak się da omówić tutaj <strong>aspekty TypeScripta związane z klasami, klasami abstrakcyjnymi i interfejsami</strong>. Po takiej dawce wiedzy możemy już z łatwością przystąpić do pisania aplikacji w TypeScripcie. W kolejnym wpisie poruszę temat typów zaawansowanych oraz inferencji typów. Zachęcam do komentowania i zadawania pytań!</p>

<div class="footnotes"><ol><li class="footnote" id="fn:1"><p>Codziennie implementuję aplikacje dla ZOO i tam klasa Animal jest niezwykle przydatna! <a href="#fnref:1" title="return to article">↩</a></p></li></ol></div>
