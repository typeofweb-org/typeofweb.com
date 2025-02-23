---
title: 2. Weekly JavaScript Challenge
date: 2016-07-27T09:34:00.000Z
isMarkdown: false
status: publish
permalink: weekly-javascript-challenge-2
authors:
  - michal-miszczyszyn
type: post
categories:
  - slug: inicjatywy
    name: Inicjatywy
  - slug: dobry-kod
    name: Dobry Kod
seo: {}
---

Dobiega końca <a href="https://www.facebook.com/events/1091460824257459">drugi Weekly JavaScript Challenge</a>, którego jestem organizotorem. Jeśli jeszcze nie wiesz o co chodzi, to już wyjaśniam! Jest to <a href="https://www.facebook.com/groups/1131907053499522">grupa na Facebooku</a>, na której mniej-więcej raz w tygodniu pojawia się nowe zadanie do wykonania w JavaScripcie. Celem istnienia grupy jest wzajemna pomoc i nauka JS-a. A wszystko to <em>pro bono</em>, dla powszechnego dobra i całkowicie za darmo. Zachęcam wszystkich początkujących programistów do spróbowania swoich sił w zadaniach!

W <strong>2. Weekly JavaScript Challenge</strong> udział wzięło <strong>14</strong> osób. Trzymamy równy poziom :) Przy okazji chciałem bardzo serdecznie podziękować wszystkim początkującym programistkom i programistom, którzy z ogromnym zapałem rozwiązują kolejne zadania, a także pomagają i komentują prace innych. Dzięki!

Pamiętajcie, że <strong>w trakcie trwania kolejnych „czelendży” nadal możliwe jest wrzucanie rozwiązań do poprzednich zadań</strong>!

<h1 id="podsumowanie">Podsumowanie</h1>
Ponownie udało mi się zidentyfikować kilka ogólnych problemów, które się powtarzają. Poniżej krótkie podsumowanie, w którym starałem się zawrzeć bardzo ogólne porady i dobre praktyki odnośnie pisania JavaScriptu, a także najczęściej popełnianie błędy. Zapraszam do czytania!
<h2 id="matematykawjavascripcie">Matematyka w JavaScripcie</h2>
W wielu miejscach w Internecie można natknąć się na zaskoczone osoby pytające dlaczego JavaScript nie umie dodawać:
<pre><code class="language-javascript">0.1 + 0.2 // 0.30000000000000004  
</code></pre>
<strong>Co?</strong> Ale jak to 0.30000000000000004?

Nie jest to żaden szczególny wymysł twórców JavaScriptu, ani tym bardziej błąd w implementacji. Jest to rezultat podążania za specyfikacją IEEE 754, która definiuje w jaki sposób należy przeprowadzać operacje na liczbach zmiennoprzecinkowych i „problem” ten nie dotyczy tylko JavaScriptu.

Z tego względu <strong>nie należy nigdy przeprowadzać obliczeń finansowych na liczbach zmiennoprzecinkowych w JS.</strong> Służą do tego specjalne biblioteki takie jak na przykład BigInteger.js. Więcej na ten temat można doczytać na stronie o zabawnym adresie <a href="http://0.30000000000000004.com">0.30000000000000004.com</a>

<h2 id="zdarzeniachangeiinput">Zdarzenia <code>change</code> i <code>input</code></h2>
Nasłuchiwanie na zdarzenie <code>change</code> na elemencie <code>&lt;input&gt;</code> albo <code>&lt;textarea&gt;</code> nie działa dokładnie tak, jak wiele osób by oczekiwało. Zdarzenie to jest wysyłane dopiero w momencie, gdy zmiany zostały zakończone – czyli np. po opuszczeniu inputa. Aby być informowanym o zmianie każdej literki lepiej podpiąć się pod zdarzenie <code>input</code>:
<CodepenWidget height="250" themeId="light" slugHash="zBadLo" defaultTab="result" user="typeofweb" embedVersion="2">
<a href="http://codepen.io/typeofweb/pen/zBadLo/">Zobacz Codepen</a>.
</CodepenWidget>

<h2 id="wzorceiantywzorce">Wzorce i antywzorce</h2>
Pisałem już o zasadzie jednej odpowiedzialności w poprzednim podsumowaniu. Napisałem tam, że ważne jest, aby funkcje wykonywały jedno i tylko jedno zadanie. Słusznie. <strong>Jednak podążanie tylko za tą jedną zasadą nie czyni jeszcze kodu idealnym.</strong> Dobrych wzorców programowania jest co najmniej kilka, więcej można poczytać np. o <a title="programowanie_obiektowe" href="https://pl.wikipedia.org/wiki/SOLID_">SOLID</a> albo o <a href="https://blog.codinghorror.com/code-smells/"><em>code smells</em></a> wg. Jeffa Atwooda.

Przykładowo: Można świetnie rozwiązać ten challenge zgodnie z Single Responsibility Principle, ale gdyby chcieć do aplikacji później dodać nową jednostkę, wymagana byłaby modyfikacja w więcej niż jednym miejscu, gdyż lista jednostek jest przechowywana w HTML-u, ale ich wartości już w kodzie JS. Rozwiązanie? Zmodyfikować kod w taki sposób, aby <strong>zmiana jednej funkcji aplikacji wymagała zmiany tylko jednego miejsca w kodzie</strong>.

<h2 id="lakonicznenazwy">Lakoniczne nazwy</h2>
Konfucjusz podobno powiedział, że „<em>mądrość zaczyna się od prawidłowego nazwania rzeczy</em>”. W zasadzie to nigdy nie dowiemy się, czy te słowa naprawdę padły z jego ust, czy tylko miał bystrego PR-owca, niemniej jednak <strong>to zdanie sprawdzi się jako świetny wzorzec pisania czytelnego kodu</strong>.

Spójrzmy na przykłady źle nazwanych funkcji i zmiennych:

<pre><code class="language-javascript">var userString = 'michal';  
var user_name = 'michal';

function isNumber(x) {  
    if (!Number.isFinite(x)) {
        alert('Error!');
    }
}

function toMetres(a, b) {  
    return a * b;
}

class FileHandle {  
    openFile() { … }
    close() { … }
}
</code></pre>

Po kolei:

<ul>
 	<li><code>userString</code> – nazwa zawiera w sobie typ. To niepotrzebne, nie przekazuje żadnej dodatkowej informacji, a do tego jeśli typ miałby się zmienić to musielibyśmy zmienić również nazwę zmiennej</li>
 	<li><code>user_name</code> – tutaj w zasadzie nie ma problemu w samym nazewnictwie tej zmiennej, ale w kontekście całego kodu widoczna jest niekonsekwencja – spójniej byłoby nazwać ją <code>userName</code></li>
 	<li><code>isNumber</code> – funkcje, który nazwy zaczynają się od “is” lub “has” zwyczajowo powinny coś sprawdzać i zwracać <code>true</code> lub <code>false</code> – to nawet brzmi naturalnie. Tutaj <code>isNumber</code> dokonuje walidacji i wyświetla błąd, więc nazwa nie jest odpowiednia.</li>
 	<li><code>toMetres</code> – nazwa całkowicie nie oddaje tego, co ta funkcja robi! Nazwy funkcji powinny być czasownikami, wtedy znacznie lepiej przekazują intencje programisty.</li>
 	<li><code>FileHandle</code> – nazwa tej klasy jest okej, chodzi mi o jej metody: <code>openFile</code> i <code>close</code>. To bardzo niespójne! Jeśli widzimy funkcję o nazwie <code>openFile</code> to można oczekiwać, że będzie również funkcja <code>closeFile</code>. Tutaj jednak nazywa się ona tylko <code>close</code>.</li>
</ul>
Ogółem: <strong>nie bójmy się dłuższych i bardziej opisowych nazw</strong>! Programowałem trochę w iOS (Objective-C) gdzie nazywa funkcji są niezwykle rozwlekłe. Nabyłem w tym środowisku kilku nawyków. I tak na przykład ja funkcję <code>toMetres</code> zamieniłbym na <code>calculateMetresFromUnits</code> lub podobną, równie długą.
<h2 id="this"><code>this</code></h2>
Och, to nieszczęsne <code>this</code> w JavaScripcie. Nierozumiane i niekochane przez nikogo. Mi samemu zajęło bardzo dużo czasu, aby poznać i zrozumieć niuanse z nim związane. W skrócie: funkcje wywoływane są w kontekście. Kontekst może się zmieniać. Trzeba o tym pamiętać. To tyle. <strong>To naprawdę tylko tyle i aż tyle</strong>. Spójrzmy na przykładowy kod:
<pre><code class="language-javascript">'use strict';

const obiekt = {  
 a: 123,
getA() {
return this.a;
}
};

const inneGetA = obiekt.getA;

obiekt.getA(); // 123  
inneGetA(); // ??  
</code></pre>
Co się stanie, gdy wywołamy naszą funkcję <code>inneGetA</code>? Wiele osób instynktownie uznaje, że <code>inneGetA</code> jest tylko referencją na <code>obiekt.getA</code> i dlatego powinno zwrócić wartość 123. <strong>Tak się jednak nie dzieje</strong>. <code>inneGetA</code> rzeczywiście „wskazuje” na <code>getA</code>, jednak wywołanie <code>inneGetA()</code> <strong>odbywa się już w innym kontekście</strong>. Stąd otrzymujemy błąd: <code>Uncaught TypeError: Cannot read property 'a' of undefined</code>. Sprawa jest jeszcze ciekawsza, gdyż kontekst można zmieniać:

<pre><code class="language-javascript">inneGetA.call({a: 1}) // 1  
inneGetA.apply({a: 2}) // 2  
inneGetA.bind({a: 3})() // 3  
</code></pre>

Więcej na ten temat można doczytać w tym wpisie:

https://typeofweb.com/this-js-kontekst-wywolania-funkcji/

<h3 id="thisiaddeventlistener"><code>this</code> i <code>addEventListener</code></h3>
I teraz sedno tego akapitu. Co zrobi poniższy kod?
<pre><code class="language-javascript">const App = {  
    displayMessage() {
        console.log('dziala!');
    },
    handleInputChange() {
        this.displayMessage();
    }
};

input.addEventListener('change', App.handleInputChange);  
</code></pre>
Oczywiście rzuci błąd <code>Uncaught TypeError: this.displayMessage is not a function</code>. Funkcja <code>handleInputChange</code> wywoływana jest w innym kontekście – a więc <code>this.displayMessage</code> nie istnieje. Jedno z możliwych rozwiązań to użycie <code>bind</code>:

<pre><code class="language-javascript">input.addEventListener('change', App.handleInputChange.bind(App));  
</code></pre>
<h1 id="nakoniec">Na koniec</h1>
Zachęcam do wzięcia udziału w kolejnym Weekly JavaScript Challenge! Ja też się całkiem sporo teraz uczę dzięki uczestnikom i myślę, że każdy może wynieść coś dla siebie nawet z najprostszych zadań.
