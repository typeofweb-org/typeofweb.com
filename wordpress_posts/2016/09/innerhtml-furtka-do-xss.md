---
id: 31
index: 20
title: innerHTML, czyli najbardziej banalna furtka do XSS
date: 2016-09-11T06:41:07.000Z
isMarkdown: true
status: publish
permalink: innerhtml-furtka-do-xss
authors:
  - michal-miszczyszyn
guid: https://typeofweb.com/index.php/2016/09/11/innerhtml-furtka-do-xss/
type: post
categories:
  - slug: javascript
    name: JavaScript
  - slug: dobry-kod
    name: Dobry Kod
  - slug: front-end
    name: Front-end
seo:
  focusKeywords:
    - innerHTML
    - XSS

---
<p>Bardzo często popełnianym błędem, na który zwracam uwagę praktycznie w każdym kolejnym Weekly JavaScript Challenge, jest niewłaściwe wykorzystywanie innerHTML. Bardzo łatwo może to doprowadzić do wystąpienia podatności typu <strong>XSS</strong>! Ten wpis chciałem poświęcić tej właściwości oraz zagrożeniom, które płyną z jej nieprawidłowego wykorzystania. Będę analizował konkretny przykład kodu z nadesłanego rozwiązania i pokażę jak przeprowadzić prosty atak na ten kod. Zapraszam!</p>

<!--more-->

<h2 id="xss">XSS przez innerHTML</h2>

<p>Atak, który tutaj pokażę nazywa się _Cross-site scripting_, a w skrócie XSS. Odmian XSS jest kilka, a sposobów na przeprowadzenie takich ataków niezliczone mnóstwo. Skupmy się więc na najprostszym przykładzie. Typowym dowodem na to, że podatność na XSS istnieje, jest wyświetlenie na stronie alerta z napisem “1”. Oznacza to, że możliwe jest wykonanie dowolnego kodu JavaScript, a stąd już bliska droga np. do tego, aby wykraść zawartość cookies lub token sesji i móc podszyć się pod danego użytkownika.</p>

<h2 id="popierwszebrakzaufania">Po pierwsze brak zaufania</h2>

<p>Kiedy chodzi o bezpieczeństwo aplikacji internetowych bardzo łatwo jest popełnić jakiś prosty błąd, który sprawi, że cała aplikacja będzie podatna na różnego rodzaju ataki. Przy tworzeniu bezpieczniejszego oprogramowania bardzo pomaga podążanie za jedną prostą zasadą: <strong>Nie ufaj temu, nad czym nie masz kontroli.</strong></p>

<p class=important><strong>Oczywiście przestrzeganie jednej prostej zasady nie sprawia, że tworzony przez nas kod jest całkowicie bezpieczny</strong>. Bezpieczeństwo aplikacji jest tematem niezwykle szerokim, a dosłownie każdego dnia powstają nowe ataki. Czuję, że w tym wpisie nie dotykam tutaj nawet czubka góry lodowej. Każdemu profesjonaliście polecam zgłębiać ten temat na bieżąco.</p>

<h2 id="nieufajnikomu">Nie ufaj nikomu</h2>

<p>I teraz kilka pytań kontrolnych. Którym z tych źródeł danych możemy zaufać?</p>

<ul>
<li>Zawartość pól uzupełnionych przez użytkownika w formularzu na stronie.</li>
<li>Odpowiedzi zewnętrznych serwisów (tzw. <em>third party API</em>) przykładowo Giphy albo Facebook.</li>
<li>Odpowiedzi z API aplikacji, którą tworzymy.</li>
</ul>

<p>Jakie są prawidłowe odpowiedzi? Niektórzy mogą argumentować (prawdopodobnie słusznie!), że jedyne akceptowalne odpowiedzi to: <strong>Nie, nie i jeszcze raz nie</strong>. Nieco paranoiczne, ale pewnie najbezpieczniejsze. Czy to jednak oznacza, że mamy w ogóle nie korzystać z zewnętrznych usług? Absolutnie nie! Jak najbardziej możemy to robić, jednak <strong>treści zwracane przez wszelkie API należy zawsze traktować jako niezaufane</strong> i odpowiednio sprawdzać, filtrować i walidować. Dlaczego? Dokładniej odpowiedziałem na to pytanie w dalszej części wpisu.</p>

<h2 id="jaktosimadoinnerhtml">Jak to się ma do innerHTML?</h2>

<p>Właśnie. Jak wykorzystywanie właściwości innerHTML ma się w ogóle do tych trzech pytań? Muszę przyznać, że nie najlepiej. No ale przejdźmy do konkretów. Czcze gadanie pewnie nie zda się na zbyt wiele, więc przeanalizujmy szybko pewien przykład kodu. Jest to fragment autentycznego rozwiązania wrzuconego na organizowane przeze mnie Weekly JavaScript Challenge. Muszę tutaj zaznaczyć: <strong>Niestety bardzo wiele rozwiązań korzystało z <code>innerHTML</code> w sposób zagrażający bezpieczeństwu.</strong></p>

<h2 id="naprzykadzie">XSS Na przykładzie…</h2>

<p>Poprzedni Weekly JavaScript Challenge polegał na stworzeniu prostej aplikacji umożliwiającej wyszukiwanie gifów przy pomocy Giphy.com. Po otrzymaniu odpowiedzi z API, konieczne było stworzenie kilku elementów <code>&lt;video&gt;</code> i wypełnienie atrybutów odpowiednimi wartościami. W jednym z rozwiązań było to realizowane w poniższy sposób:</p>

<pre><code class="language-javascript">for (var i = 0; i &lt; response.length; ++i) {  
    var src = response[i].images.original.mp4;
    element.innerHTML += '&lt;video src="' + src + '"&gt;&lt;/video&gt;';
}
</code></pre>

<p>Czyli krótko mówiąc: Bierzemy odpowiedź z API i wkładamy ją do kodu HTML na stronie. Bez sprawdzenia co w tej odpowiedzi jest i bez jakiejkolwiek walidacji.</p>

<h2 id="aleprzecie">Ale przecież…</h2>

<p>Wiele osób teraz prawdopodobnie podrapie się po głowie i powie: <em>Ale przecież ja ufam API Giphy. Gdybym mu nie ufał to przecież aplikacja nie miałaby sensu!</em></p>

<p>Oczywiście, jest to słuszna uwaga. Po części. Zwracam jednak uwagę na trzy ważne rzeczy:</p>

<h2 id="pocosinaraa">Po co się narażać?</h2>

<p>innerHTML jest tutaj absolutnie niepotrzebny; ten sam cel można osiągnąć w lepszy sposób. Nie ma sensu korzystać z metody, która jest potencjalnie niebezpieczna jeśli istnieje bezpieczniejsza alternatywa. Dobre nawyki warto wyrabiać na każdym kroku.</p>

<h2 id="czynapewnogiphytogiphy">Czy na pewno Giphy to Giphy?</h2>

<p>Oryginalnej odpowiedzi z API Giphy można <em>raczej zaufać</em>. Jednak nigdy nie mamy pewności, czy przypadkiem samo Giphy nie stało się ofiarą ataku. Co jeśli ktoś podmieni odpowiedzi z API Giphy na inne, niebezpieczne? Jest to absolutnie możliwe i zdarzało się w przypadku innych serwisów!</p>

<h2 id="czyuytkownikjestbezpieczny">Czy użytkownik jest bezpieczny?</h2>

<p>Jaką mamy pewność, że użytkownik naprawdę komunikuje się z API Giphy? Absolutnie żadnej. Nie wiemy, czy dana osoba sama nie padła ofiarą jakiegoś ataku – a możliwości jest całe mnóstwo.</p>

<p>Najprostszy przykład: Wystarczy dodać jedną linijkę do pliku <code>/etc/hosts</code>, aby cała komunikacja z Giphy została przekierowana na zupełnie inny serwer! Podobnych, bardziej wyszukanych ataków można wymienić znacznie więcej, choćby <em>DNS spoofing</em> i inne <em>man in the middle</em>. <strong>Zdarza się Wam korzystać z niezabezpieczonych sieci wifi w kawiarniach?</strong> Właśnie.</p>

<h2 id="przeprowadmyatak">Przeprowadźmy atak XSS!</h2>

<p>Rozwińmy nieco poprzedni podpunkt i przeprowadźmy prosty atak XSS na takiego użytkownika. Zwyczajowo spróbujemy doprowadzić do sytuacji, w której wykona się kod <code>alert(1)</code>. Do dzieła!</p>

<h2 id="eksploatujemyinnerhtml">Eksploatujemy innerHTML</h2>

<p>Zastanówmy się jednak jaki dokładnie kod musiałby się znaleźć w odpowiedzi z API, aby atak się powiódł. Przywołajmy fragment kodu z <code>innerHTML</code>:</p>

<pre><code class="language-javascript">element.innerHTML += '&lt;video src="' + src + '"&gt;&lt;/video&gt;';  
</code></pre>

<p>Czy wystarczy, że jako <code>src</code> wstawimy tag <code>&lt;script&gt;</code>?</p>

<pre><code class="language-html">" &lt;script&gt; alert(1); &lt;/script&gt; "
</code></pre>

<p><strong>Niestety nie.</strong> A w zasadzie stety, bo to bardzo dobrze ;) Zgodnie ze specyfikacją HTML5, kod w tagu <code>&lt;script&gt;</code> umieszczonym na stronie przy pomocy innerHTML <a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML#Security_considerations">nie powinien zostać wykonany</a>. Wspominałem już o tym we wpisie podsumowującym <a href="https://typeofweb.com/2016/07/25/weekly-javascript-challenge-1/">1. Weekly JavaScript Challenge</a> i napisałem wtedy też, że <strong>istnieją inne metody wykonania arbitralnego kodu na stronie</strong>. Przykładowo możemy skorzystać z atrybutu <code>onerror</code> i w nim wywołać kod, który nas interesuje:</p>

<pre><code class="language-html">&lt;video src="nieistnieje" onerror="alert(1)"&gt;  
</code></pre>

<p>Wstawienie takiego fragmentu HTML przy pomocy <code>innerHTML</code> spowoduje uruchomienie kodu i wyświetlenie komunikatu z napisem “1”. Wykorzystajmy to!</p>

<h2 id="faszyweapi">Fałszywe API</h2>

<p>Załóżmy, że udało nam się przekierować całą komunikację użytkownika na adres IP naszej maszyny (no, ale tego jak to zrobić nie będę tutaj opisywał ;) ). Na potrzeby przetestowania kodu możecie po prostu dodać taką linijkę do <code>/etc/hosts</code>:</p>

<pre><code>127.0.0.1 api.giphy.com  
</code></pre>

<p>Pod tym IP stawiamy prosty serwer HTTP, przykładowo w node.js:</p>

<pre><code class="language-javascript">const http = require('http');

const server = http.createServer(handleRequest);

server.listen(80, () =&gt; {  
    console.log("Server listening on: http://localhost");
});
</code></pre>

<p>Co musi robić funkcja <code>handleRequest</code>? Po pierwsze ustawić odpowiednie nagłówki pozwalające na CORS. Potem już tylko zwrócić JSON z niebezpieczną zawartością:</p>

<pre><code class="language-javascript">function handleRequest(request, response){  
    response.writeHead(200, {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    });

    response.end(JSON.stringify({
        data: [{ images: { original: {
            mp4: 'nieistnieje" onerror="alert(1)'
        } } }]
    }));
}
</code></pre>

<p>Teraz, gdy ktoś skorzysta z naszej wyszukiwarki gifów, zamiast rezultatu ujrzy komunikat z napisem “1”. Było trochę zachodu, ale udało nam się dowieść podatności na XSS w aplikacji!</p>

<h2 id="naprawmytenkod">Naprawmy podatność XSS!</h2>

<p>Naprawmy więc oryginalny kod wstawiający elementy video na stronę. Jak zrobić to poprawnie? Najlepiej najpierw użyć funkcji <code>document.createElement</code>, a potem ustawić atrybut <code>src</code>:</p>

<pre><code class="language-javascript">for (var i = 0; i &lt; response.length; ++i) {  
    var src = response[i].images.original.mp4;
    var video = document.createElement('video');
    video.src = src;
    element.appendChild(video);
}
</code></pre>

<p>Teraz nawet jeśli w odpowiedzi z API znajdzie się potencjalnie niebezpieczny kod to nie zostanie on po prostu dodany do strony – nigdy nie „opuści” atrybutu <code>src</code> elementu <code>&lt;video&gt;</code> i wygenerowany HTML będzie wyglądał jakoś tak:</p>

<pre><code class="language-html">&lt;video src="nieistnieje&amp;quot; onerror=&amp;quot;alert(1)"&gt;&lt;/video&gt;  
</code></pre>

<p>Podobnie jeśli potrzebujemy dodać na stronę jakiś tekst, korzystanie z <code>innerHTML</code> to proszenie się o kłopot. Lepiej użyć właściwości <code>textContent</code>.</p>

<h2 id="jaksibroni">Jak się bronić?</h2>

<p>Śmiało mogę powiedzieć, że <strong>korzystanie z <code>innerHTML</code> w taki sposób jest najbardziej banalną furtką dla ataków XSS</strong>. Zwracam jednak uwagę, jak już wspomniałem na początku artykułu, <strong>nawet nie dotknąłem czubka góry lodowej tematu bezpieczeństwa aplikacji internetowych.</strong> Możliwości przeprowadzenia ataków jest całe mnóstwo, a każdego dnia odkrywane są nowe podatności!</p>

<h2 id="dokddalej">Dokąd dalej w sprawie XSS?</h2>

Koniecznie sprawdź też mój artykuł na temat [hakowania przez CSS](https://typeofweb.com/hackowanie-css/).

<p>Tym wpisem chciałem tylko pokazać i uczulić, że <strong>nawet tak prosty błąd może być katastrofalny w skutkach</strong>. Jednocześnie zachęcam do zainteresowania się tematem bezpieczeństwa aplikacji internetowych. Materiałów i przykładów w sieci można znaleźć całe mnóstwo.</p>

<p>Na początek od siebie mogę polecić zin, który opublikował jakiś czas temu <a href="https://sekurak.pl/sekurak-offline/">Sekurak</a>. Jest to świetna skondensowana dawka wiedzy z niskim progiem wejścia, a wszystko to przedstawione na praktycznych przykładach. Mnie bardzo się też podobała gra <a href="http://escape.alf.nu">Alert 1 to win</a>.</p>

<h2 id="podsumowanie">Podsumowanie</h2>

<p>Z tego artykułu można na pewno wyciągnąć kilka wniosków. Ten najprostszy to: Nie korzystaj z <code>innerHTML</code> jeśli nie masz pewności, że ufasz danym, które chcesz wstawić na stronę (podpowiedź: rzadko masz taki komfort).</p>

<p>Zachęcam do podzielenia się innymi wnioskami w komentarzach.</p>
