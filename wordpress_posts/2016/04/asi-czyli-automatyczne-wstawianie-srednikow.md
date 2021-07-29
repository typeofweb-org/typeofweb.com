---
id: 12
index: 2
title: ASI czyli automatyczne wstawianie średników
date: 2016-04-12T19:19:06.000Z
isMarkdown: false
status: publish
permalink: asi-czyli-automatyczne-wstawianie-srednikow
authors:
  - michal-miszczyszyn
guid: >-
  https://typeofweb.com/index.php/2016/04/11/asi-czyli-automatyczne-wstawianie-srednikow/
type: post
thumbnail:
  url: https://typeofweb.com/wp-content/uploads/2016/04/business-2717066_1280.jpg
  width: 1280
  height: 847
categories:
  - slug: javascript
    name: JavaScript
  - slug: dobry-kod
    name: Dobry Kod
  - slug: front-end
    name: Front-end
  - slug: back-end
    name: Back-end
seo: {}

---
Specyfikacja ECMAScript zawiera w sobie wiele zaskakujących elementów i mechanizmów, i gorąco polecam się z nią zapoznać. Jeśli język, którym napisano specyfikację wydaje się być odstraszający, to warto przeczytać chociaż serię artykułów <a href="http://dmitrysoshnikov.com/ecmascript/chapter-1-execution-contexts/">ECMA-262-3 in detail</a> i <a href="http://dmitrysoshnikov.com/ecmascript/es5-chapter-0-introduction/">ECMA-262-5 in detail</a> których autorem jest Dmitry Soshnikov. Dmitry omawia w nich specyfikację ES i sposób działania JavaScriptu, ale robi to w sposób bardzo przystępny w zasadzie dla każdego dociekliwego odbiorcy.

Ja chciałbym jednak dzisiaj skupić się na jednym konkretnym mechanizmie zawartym w specyfikacji ES: <em>Automatic Semicolon Insertion</em> (ASI) – czyli automatycznym wstawianiu średników. Składnia JavaScriptu na pierwszy rzut oka podobna jest z grubsza do składni Javy czy C++ – od razu uwagę na siebie zwracają <code>{</code>, <code>}</code> i <code>;</code>. Jednak okazuje się, że ES pozwala na coś, co dla progamistów dwóch wymienionych języków byłoby nie do pomyślenia: <strong>swobodne pomijanie średnika na końcach wyrażeń</strong>.
<h1 id="asiwth">ASI, WTH?</h1>
Na początku swojej kariery programisty JS niejednokrotnie znajdowałem w napisanym przeze mnie kodzie miejsca, w których brakowało średników i zachodziłem w głowę dlaczego ten kod w ogóle bez nich działał. Weźmy prosty przykład:
<pre><code class="language-javascript">console.log(‘Hello, world!’)  
</code></pre>
Powyższy kod zostanie bez problemu zinterpretowany i uruchomiony we wszystkich znanych mi silnikach JavaScript, pomimo braku średnika na końcu lini. WTH? Moje zdziwinie było ogromne, więc zacząłem szukać skąd się bierze ta pozorna magia. Wtedy pierwszy raz usłyszałem o ASI. Jako osoba, która zaczynała naukę programowania od C, podchodziłem do tego ułatwienia z dużym dystansem, ale jednocześnie próbowałem z niego czasem skorzystać. <em>Może to bardziej w duchu JS</em> – myślałem i uparcie kasowałem wstawiane średniki tak, aby się do tej składni przyzwyczaić. <strong>Skoro interpreter sam wstawia je za mnie to co mogłoby pójść źle</strong>?
<h1 id="asiniewystarczajcoautomatyczne">ASI niewystarczająco automatyczne</h1>
W ramach testów ASI napisałem kod podobny do tego poniżej:
<pre><code class="language-javascript">console.log('test')  
[1,2,3].map(x =&gt; x * x)
</code></pre>
Co powinno się wydarzyć? Teoretycznie najpierw w konsoli ma pojawić się słowo “test”, a później wykona się mapowanie wartości z tablicy. Tak rzeczywiście by się stało, gdyby po pierwszej linijce znalazł się średnik. Jak więc ten kod interpretowany jest zgodnie ze specyfikacją?
<pre><code class="language-javascript">Uncaught TypeError: Cannot read property '3' of undefined  
</code></pre>
Że co? Przeanalizujmy co się wydarzyło. <code>3</code> na pewno wzięła się stąd, że wyrażenie <code>1,2,3</code> daje po prostu <code>3</code> (operator przecinka). Nie zaglądając jeszcze do specyfikacji można dojść do wniosku, że kod został więc zinterpretowany w ten sposób:
<pre><code class="language-javascript">console.log('test’)[3].map(x =&gt; x * x)  
</code></pre>
I wszystko jasne! Ta linia oznacza tyle co: <em>Wykonaj funkcję <code>console.log(‘test’)</code>, weź zwróconą przez nią wartość i pobierz z niej element leżący pod indeksem <code>3</code>. Ten element powinien mieć metodę <code>map</code>, którą wykonaj.</em> Wyjątek rzucany jest już po wykonaniu <code>console.log(‘test’)</code>, które zwraca <code>undefined</code>. Inny przykład, prosto ze specyfikacji:
<pre><code class="language-javascript">a = b + c  
(d + e).print()
</code></pre>
interpretowane jako:
<pre><code class="language-javascript">a = b + c(d + e).print()  
</code></pre>
Warto zauważyć, że zarówno moja oryginalna intencja, jak i sposób zinterpretowania jej zgodnie ze specyfikacją są całkowicie poprawnymi sposobami odczytania tego kodu. Czy da się w związku z tym odróżnić od siebie te dwa przypadki? Tak, ale <strong>wyłącznie poprzez wstawienie średnika po pierwszym wyrażeniu</strong>. Czy podobnych nieprzewidywalnych przypadków może być więcej? <strong>Niestety tak.</strong>
<h1 id="pocojestasi">Po co jest ASI?</h1>
Aby się definitywnie dowiedzieć o co w tym wszystkim chodzi sięgam do <a href="http://www.ecma-international.org/ecma-262/6.0/#sec-automatic-semicolon-insertion">sekcji 11.9 specyfikacji ECMAScript 2015</a>. Dociekliwi mogą przeczytać ją w całości, ja tutaj skupię się tylko na istotnych fragmentach. Są dokładnie 3 zasady zgodnie z którym średniki są wstawiane automatycznie (i kilka wyjątków):
<ol>
 	<li>Kiedy napotkany znak (zwany <em>offending token</em>) nie jest dozwolony w danym miejscu to średnik wstawiany jest tuż przed tym znakiem pod warunkiem, że spełniony jest jeden z podpunktów:
<ul>
 	<li><em>offending token</em> i poprzedni znak są od siebie oddzielone końcem linii</li>
 	<li><em>offending token</em> to <code>}</code></li>
 	<li>poprzedni znak to <code>)</code> i wstawiony średnik byłby zakończeniem instrukcji <code>do-while</code></li>
</ul>
</li>
 	<li>Kiedy interpreter napotka koniec kodu źródłowego, ale nie jest w stanie go zrozumieć to średnik wstawiany jest na jego końcu.</li>
 	<li>Kiedy napotkany jest tzw. <em>restricted production</em> i w miejscu, w którym nie powinno być końca linii znajduje się znak końca linii to średnik jest wstawiany przed tym znakiem.</li>
</ol>
Pomijam nawet wyjątki od tych reguł, ale łał, czy to już nie brzmi trochę skomplikowanie? I co to w ogóle oznacza w praktyce? Po pierwsze okazuje się, że <strong>w JavaScripcie białe znaki zmieniają sposób interpretowania wyrażeń</strong> – w odróżnieniu chociażby od wspomnianego C++. Znów bardzo prosty przykład:
<pre><code class="language-javascript">123 ‘hello, world!’

123  
‘hello, world!’
</code></pre>
Pierwsza linijka kodu jest niepoprawna. Średnik nie zostanie automatycznie wstawiony po <code>123</code>. W drugim przypadku jednak już tak, gdyż po <code>123</code> znalazł się znak końca linii. A więc białe znaki zmieniają sposób, w jaki ten kod jest rozumiany przez silniki JavaScriptu.
<h1 id="asizbytautomatyczne">ASI zbyt automatyczne</h1>
Co jeszcze wynika z tej specyfikacji? Oto jeden z moich ulubionych przykładów kodu, który zaskakuje początkujących:
<pre><code class="language-javascript">function fn() {  
    return
    {
        a: 1
    }
}
</code></pre>
Co zwróci funkcja <code>fn</code> po wywołaniu? Oczywiście <code>undefined</code>. ASI powoduje, że po <code>return</code> automatycznie dodawany jest średnik. Osoby przyzwyczajone do takiego formatowania kodu niestety muszą się z nim pożegnać – nie da się tego problemu obejść inaczej niż poprzez wstawienie <code>{</code> w tej samej linii co <code>return</code>. Więcej o podobnych haczykach można przeczytać w artykułach <a href="http://cjihrig.com/blog/the-dangers-of-javascripts-automatic-semicolon-insertion/">The Dangers of JavaScript’s Automatic Semicolon Insertion</a> i <a href="http://inimino.org/~inimino/blog/javascript_semicolons">JavaScript Semicolon Insertion</a>.
<h1 id="zerednikiemczyjednakbez">Ze średnikiem czy jednak bez?</h1>
Są grupy osób, które sugerują aby całkowicie polegać na ASI, na przykład <a href="http://standardjs.com">standardjs.com</a>. Głośno również było o <a href="https://github.com/electron/electron/pull/4909">wdrożeniu tego podejścia</a> przez zespół rozwijający <a href="http://electron.atom.io">electron</a>. Rzeczywiście jest prawdą stwierdzenie, że pomijanie średników jest całkiem bezpieczne patrząc jedynie przez pryzmat silników JavaScript. Wszystkie sprawdzone przeze mnie poprawnie implementują ASI i konsekwentnie interpretują kod bez średników w ten sam sposób. <del>W związku z tym, jeśli konsekwentnie podążać za zasadami opisanymi w standardjs.com, <strong>nie ma żadnego ryzyka, że kod zostanie nieprawidłowo zinterpretowany</strong>. Ponadto należy pamiętać, że ASI działa zawsze, niezależnie od intencji programisty, więc <strong>każdy programista JS powinien znać zasady automatycznego wstawiania średników</strong> chociażby po to, aby uniknąć sytuacji opisanej w poprzednim akapicie. Więcej: <a href="http://blog.izs.me/post/2353458699/an-open-letter-to-javascript-leaders-regarding">An Open Letter to JavaScript Leaders Regarding Semicolons</a>. Skoro zasady i tak trzeba znać, to czemu by ASI nie wykorzystać?</del>
(EDIT 10.07.2017) Zasady ASI warto znać, jednak jeśli ktoś decyduje się na zrezygnowanie ze stawiania średników to naraża się <a href="https://github.com/tc39/ecma262/issues/943">na całą gamę przypadków i błędów</a>, których standardjs.com nie uwzględnia.

Sprawę może ułatwiać fakt, że większość programistów JS i tak korzysta z tzw. linterów (a jeśli nie korzysta to powinna). Zasady sprawdzania kodu pod względem poprawności można ustawić tak, aby średniki były ściśle wymagane, ale również w ten sposób, aby średników było jak najmniej. O <del>pełną</del> pewną spójność i poprawność kodu pomoże zadbać odpowiednio skonfigurowane narzędzie <del>i dlatego decyzja o używaniue (bądź nie) ASI jest właściwie wyłącznie kwestią preferencji zespołu.</del> (EDIT 10.07.2017) ale mimo wszystko pomijanie średników jest ryzykowne, szczególnie jeśli natrafimy na przypadek, którego linter nie potrafi obsłużyć prawidłowo z powodu buga albo nowej składni w ES. Przykład? Pierwsze z głowy: template stringi, które dodają sporo nowej składni i nowych <em>edge case</em> dla ASI, a które przez długi czas nie były wymienione w standardjs ani obsługiwane przez lintery.
<h1 id="amoimzdaniem">A moim zdaniem…</h1>
Czy są jednak jakieś szczególne zalety polegania na ASI? Nie jestem w stanie ich dostrzec. Notabene, specyfikacja ECMAScript wyraźnie mówi, że <em>Automatic Semicolon Insertion</em> jest <strong>jedynie próbą zinterpretowania kodu, który zawiera błędy</strong>, a przy tym, według specyfikacji, niektóre średniki <strong>są obowiązkowe</strong>. W związku z powyższym, moim zdaniem poleganie na ASI zmusza do pewnej niekonsekwencji w składni – bo nie znikają wszystkie średniki, a jedynie ich część. Podobne zdanie wyraża również Kyle Simpson w swojej słynnej publikacji <a href="https://github.com/getify/You-Dont-Know-JS/blob/master/types%20%26%20grammar/ch5.md#error-correction">You Don't Know JS</a>:
<blockquote>So, to put it more bluntly, when I hear someone claim that they want to omit "optional semicolons," my brain translates that claim to "I want to write the most parser-broken program I can that will still work."</blockquote>
Idąc dalej, pozwolę sobie nawet wysunąć tezę, iż <strong>poleganie na ASI to proszenie się o problem</strong>. Po pierwsze dlatego, że jego reguły są trudne do zapamiętania i łatwo popełnić błąd. Oczywiście może przed tym chronić odpowiednio skonfigurowany linter, ale mimo to mam wrażenie, że łatwiejsze jest zapamiętanie nielicznych haczyków (np. wspomnianego z <code>return</code>) gdy wstawia się średniki, niż <a href="http://standardjs.com/rules.html#semicolons">wielu wyjątków</a> gdy zazwyczaj średników się nie stawia. Ponadto zauważyłem, że większość programistów, z którym pracowałem zna składnię C lub podobną i wstawianie średników jest dla nich czymś <strong>całkowicie naturalnym</strong>. W związku z tym kod bez średników jest jednak znacznie trudniejszy do zrozumienia przez większość osób, a nowi programiści w zespole mają o wiele <strong>wyższy próg wejścia</strong> do projektu, w którym nie stawia się średników. No i już tak zupełnie subiektywnie: taki kod jest po prostu znacznie mniej czytelny i łatwiej się w nim zgubić. Po co więc używać ASI? Nie widzę żadnych korzyści, a potencjalnych problemów dostrzegam sporo.
