---
index: 15
title: 1. Weekly JavaScript Challenge
date: 2016-07-25T05:09:00.000Z
isMarkdown: false
status: publish
permalink: weekly-javascript-challenge-1
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

<p>Jakiś czas temu zainspirowałem się dość mocno Facebookową grupą Weekly WebDev Challenge i postanowiłem utworzyć grupę siostrzaną: <a href="https://www.facebook.com/groups/1131907053499522/"><strong>Weekly JavaScript Challenge</strong></a>. Jest to miejsce, w którym średnio raz w tygodniu będę wrzucał nowe zadanie do wykonania. Celem jest wspólna nauka JavaScriptu, <em>code review</em> i wzajemna pomoc.</p>

<h1 id="kilkaliczb">Kilka liczb…</h1>

<p>Pierwszy Weekly JavaScript Challenge dobiegł końca. Na początek muszę powiedzieć, że jestem niezwykle zaskoczony tak pozytywnym odzewem i liczbą komentarzy! Do grupy zapisało się blisko <strong>200</strong> osób, w ankiecie dotyczącej znajomości JS wzięło udział ich prawie <strong>80</strong>, a ok. <strong>15</strong> z nich wykonało pierwsze, dość proste zadanie. <strong>Uważam to za ogromny sukces!</strong></p>

<h1 id="podsumowanie">Podsumowanie</h1>

<p>Ponieważ jednak kilka problemów pojawiło się wielokrotnie, postanowiłem napisać krótkie podsumowanie, które można traktować jak bardzo ogólny poradnik pisania kodu.</p>

<h2 id="komentarzewkodzie">Komentarze w kodzie</h2>

<p>Zdaniem wielu autorytetów, <strong>komentarze w kodzie sugerują problem z czytelnością kodu</strong> (poza wyjątkami takimi jak np. opis skomplikowanych wyrażeń regularnych czy algorytmów). Jeśli czujesz, że dany fragment kodu wymaga komentarza do jego zrozumienia, to prawdopodobnie należy zmodyfikować sam kod i go poprawić. <strong>Komentarze lepiej zamienić w dobrze nazwane zmienne i funkcje.</strong> Zamiast  </p>

<pre><code class="language-javascript">// position
var x = 0;

// start application
function main() { … }  
</code></pre>

<p>znacznie czytelniej jest:</p>

<pre><code class="language-javascript">var position = 0;

function startApplication() { … }  
</code></pre>

<h2 id="singleresponsibilityprinciple">Single Responsibility Principle</h2>

<p>Ważne jest, <strong>aby funkcje wykonywały jedno i tylko jedno zadanie</strong>. To znaczy: Funkcja, która coś liczy nie powinna tego wyświetlać. Funkcja, która dokonuje walidacji nie powinna pokazywać błędów itd. Nazywa się to <a href="https://en.wikipedia.org/wiki/Single_responsibility_principle">Single Responsibility Principle</a> (<a href="https://pl.wikipedia.org/wiki/Zasada_jednej_odpowiedzialności">Zasada Jednej Odpowiedzialności</a>) i jest bardzo dobrą praktyką, która powinna być stosowana w trakcie pisania dowolnego kodu, w dowolnym języku.</p>

<p>Wiele osób jako kontrargument podaje, że taki kod jest mniej wydajny. <em>Czyżby?</em> Ponadto warto zadać sobie pytania: Ile razy pisałam/em aplikację, w której wydajność była krytyczna? Prawdopodobnie mniej niż 1 na 100 razy. A teraz drugie pytanie: Ile razy pisałam/em aplikację, której kod musiał potem czytać i zmieniać inny programista? Prawdopodobnie 100 na 100 razy. <strong>Czytelność i łatwość modyfikacji należy stawiać na pierwszym miejscu</strong>.</p>

<p>I tak przykładowo zły kod wygląda mniej więcej tak:</p>

<pre><code class="language-javascript">// jedyna funkcja w kodzie
// bardzo długa, robi wszystko
// od pobierania danych, przez obliczenia
// aż do wyświetlania
function main() {  
var l = prompt('Podaj liczbe.');  
var x = parseInt(l);  
var v = isNaN(x);  
    if (v) {
        alert('Error!');
    } else {
        for (var i = 2; i * i &lt;= N; ++i) {
            // … i tak dalej
            // i tak dalej …
        }
    }
}
</code></pre>

<p>A kod znacznie lepszy:</p>

<pre><code class="language-javascript">function startPrimesApp() {  
    const N = getNumberFromUser();

    if (!isValid(N)) {
        displayError();
        return;
    }

    const result = computePrimeNumbers(N);
    displayResult(result);
}

// reszta funkcji
// …
</code></pre>

<p>Od razu widać jasny podział odpowiedzialności pomiędzy funkcje, a kod jest znacznie bardziej czytelny.</p>

<h2 id="onclickonload"><code>onclick</code>, <code>onload</code></h2>

<p>Wiele osób skorzystało z atrybutu <code>onclick=“funkcja()”</code> w HTML-u. Prawdopodobnie dlatego, że to najłatwiejszy sposób i nadal można go często znaleźć w wielu kursach JS. Dlaczego to problem? Głównie dlatego, że skorzystanie z <code>onclick</code> w HTML-u wymaga stworzenia funkcji <code>funkcja()</code> o globalnym zasięgu – a zmienne globalne to coś czego zawsze należy unikać. Dodatkowym problemem jest fakt, że w taki sposób trudno jest dynamicznie dodawać i usuwać funkcje nasłuchujące na zdarzenia w trakcie działania aplikacji.</p>

<p>Jak więc zrobić to lepiej? Nasłuchiwać na zdarzenia najlepiej z poziomu JavaScriptu przy pomocy funkcji <code>addEventListener</code> (lub <code>.on</code> w jQuery).</p>

<h2 id="innerhtml"><code>innerHTML</code></h2>

<p>Wiele wrzuconych rozwiązań wykorzystywało własność <code>innerHTML</code> tylko do tego, aby wyświetlać tekst. <strong>To błąd!</strong> <code>innerHTML</code>, jak sama nazwa wskazuje, służy do dodania kodu HTML do strony. To znaczy, że jeśli napiszemy taki kod:</p>

<pre><code class="language-javascript">el.innerHTML = '&lt;h1&gt;Hej&lt;/h1&gt;';  
</code></pre>

<p>To zobaczymy:</p>

<h1>Hej</h1>

<p>Jeśli natomiast użyjemy <code>textContent</code>:</p>

<pre><code class="language-javascript">el.textContent = '&lt;h1&gt;Hej&lt;/h1&gt;';  
</code></pre>

<p>to rezultat będzie inny:</p>

<p>&lt;h1>Hej&lt;/h1></p>

<p>Kod został automatycznie zamieniony na tekst.</p>

<p><code>innerHTML</code> w większości przypadków jest całkowicie niepotrzebne. Dodatkowo to poważny problem, gdyż łatwo tutaj popełnić błąd (nawet najmniejszy, często niezauważalny) i sprawić, że cała aplikacja stanie się <strong>podatna na ataki <a href="https://pl.wikipedia.org/wiki/Cross-site_scripting">XSS</a></strong>. W skrócie, zastanówcie się co się stanie, gdy wykonam taki lub podobny kod:</p>

<pre><code class="language-javascript">var dane = prompt();  
el.innerHTML = dane;  
</code></pre>

<p>To, co użytkownik wpisze w prompt() zostanie dodane do wnętrza elementu. A co jeśli użytkownik wpisze <code>&lt;script&gt;…&lt;/script&gt;</code> lub coś podobnego? No właśnie… (więcej na ten temat pod koniec wpisu)</p>

<p>Zamiast <code>innerHTML</code> w większości przypadków do dodawania tekstu można użyć <code>textContent</code>.</p>

<h2 id="przypadkowezmienneglobalne">Przypadkowe zmienne globalne</h2>

<p>Pominięcie słowa kluczowego <code>var</code> (lub <code>let</code>, <code>const</code>) powoduje przypadkowe stworzenie zmiennej globalnej! Musimy o tym pamiętać. Trzeba na to uważać lub skorzystać z tzw. “strict mode”, w którym próba utworzenia takiej zmiennej powoduje błąd:</p>

<pre><code class="language-javascript">x = 1; // zmienna globalna  
</code></pre>

<pre><code class="language-javascript">'use strict';  
x = 1; // Uncaught ReferenceError: x is not defined  
</code></pre>

<h2 id="nawiasyklamrowe">Nawiasy klamrowe</h2>

<p>To często kwestia preferencji, ale większość osób jednak zgadza się, że przy każdym if/elsie powinny znaleźć się klamry <code>{ … }</code>, nawet jeśli zajmuje on tylko jedną linijkę. Dlaczego? Jeśli ich nie ma to kod automatycznie jest mniej czytelny i łatwo o błąd. Jeśli to Cię nadal nie przekonuje to warto pamiętać, że słynny <a href="http://embeddedgurus.com/barr-code/2014/03/apples-gotofail-ssl-security-bug-was-easily-preventable/">krytyczny błąd bezpieczeństwa w OS X</a> wynikał właśnie z braku nawiasów klamrowych…</p>

<p>Dlatego taki kod:</p>

<pre><code class="language-javascript">if (x)  
    doSomething(x);
else doSomethingElse();  
</code></pre>

<p>lepiej przepisać w ten sposób:</p>

<pre><code class="language-javascript">if (x) {  
    doSomething(x);
} else {
    doSomethingElse();
}
</code></pre>

<h2 id="nan"><code>NaN</code></h2>

<p>Wartość <code>NaN</code> w JavaScripcie jest bardzo wyjątkowa. Porównanie <code>NaN === NaN</code> zwraca <code>false</code>. Dlatego nie da się w ten sposób sprawdzić czy coś zawiera <code>NaN</code>, czy nie. Jak to więc zrobić poprawnie? Aby sprawdzić czy coś przyjęło wartość <code>NaN</code> najlepiej skorzystać z funkcji <code>Number.isNaN</code>.</p>

<p>Istnieje również globalna funkcja <code>isNaN</code>, która jedna zwraca nieco inne wyniki niż <code>Number.isNaN</code>. Zawsze lepiej jest korzystać z <code>Number.isNaN</code>, gdyż globalna funkcja <code>isNaN</code> może dać nieoczekiwane rezultaty…</p>

<pre><code class="language-javascript">isNaN('hej'); // true ?  
isNaN(undefined); // true ?  
Number.isNaN('hej'); // false  
Number.isNaN(undefined); // false  
</code></pre>

<h1 id="nakoniec">Na koniec</h1>

<p>Ogółem: <strong>Było całkiem nieźle</strong>. Cieszy mnie dobra frekwencja, a mam nadzieję, że w kolejnym zadaniu udział weźmie jeszcze więcej osób. Powoli będę też podnosił poziom <a href="https://www.facebook.com/groups/1131907053499522/">Weekly JavaScript Challenge</a>. Zaczęliśmy od czegoś prostego, ale już na kolejny ogień idzie prosta aplikacja do przeliczania miar w JavaScripcie, a następnie wykorzystanie szablonów do tworzenia widoków…</p>

<p>Pomysłów mam całe mnóstwo! Zachęcam gorąco do brania udziału, nawet jeśli zadania będą się wydawać pozornie banalne. Dla wprawionego programisty nie powinny być problemem, a początkujący będą mogli się szybko podszkolić patrząc na rozwiązania bardziej doświadczonych koleżanek i kolegów. I co najważniejsze – jedni i drudzy mogą się czegoś nauczyć. Ja już się nauczyłem całkiem sporo :)</p>

<h1 id="rozwiniciedotxssiinnerhtml">*Rozwinięcie dot. XSS i <code>innerHTML</code></h1>

<p>W rzeczywistości w nowych przeglądarkach ten kod nie dałby żadnego rezultatu:</p>

<pre><code class="language-javascript">el.innerHTML = '&lt;script&gt;alert(1);&lt;/script&gt;';  
</code></pre>

<p>Specyfikacja HTML5 mówi, że skrypt dodany w ten sposób nie powinien się wykonać. Są jednak sposoby, aby to obejść i nadal móc zaatakować aplikację przy pomocy <code>innerHTML</code>:</p>

<pre><code class="language-javascript">el.innerHTML = '&lt;img src=a onerror=alert(1)&gt;';  
</code></pre>

<p>A podobnych metod jest oczywiście znacznie więcej! Między innymi dlatego zapewnienie bezpieczeństwa plikacji jest tak trudne.</p>
