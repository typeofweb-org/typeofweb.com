---
title: Odmiana rzeczowników przy liczebnikach w języku polskim
date: 2018-01-22T20:26:28.000Z
isMarkdown: false
status: publish
permalink: odmiana-rzeczownikow-przy-liczebnikach-jezyku-polskim
authors:
  - michal-miszczyszyn
type: post
thumbnail:
  url: /assets/wp-content/uploads/2018/01/pexels-photo-1.jpg
  width: 1187
  height: 853
categories:
  - slug: javascript
    name: JavaScript
  - slug: opinie
    name: Opinie
seo:
  metadesc: >-
    Jak odmieniać rzeczowniki przy liczebnikach w liczbie mnogiej? Język polski
    tego nie ułatwia, ale są pewne sposoby. Stworzyłem paczkę npm polish-plurals
    dzięki której odmiana stanie się prostsza niż kiedykolwiek :) Opis problemu
    odmiany, przykłady użycia polish-plurals oraz link do GitHuba — w artykule.
---

A to Ci nietypowe temat na tym blogu :D Ale spokojnie, <strong>będzie o programowaniu</strong> ;) Ostatnio szlifuję pierwszą publiczną wersję pewnej aplikacji, nad którą pracuję hobbystycznie. Gryzła mnie tylko jedna rzecz: Odmiana słów przy liczbach. Temat powszechnie znany i irytujący. <strong>Jak ładnie i prosto zapisać w kodzie „1 komentarz”, „2 komentarze” ale „5 komentarzy”?</strong> Czy da się to jakoś zautomatyzować?

---

Podany przykład muszę zapisać w postaci kodu. Czy prosty warunek

<pre><code>if (n &gt; 1)</pre></code>

wystarczy? No oczywiście nie, bo <strong>w języku polskim formy odmiany mamy aż 3</strong>. Język angielski (poza wyjątkami) jest tutaj znacznie prostszy. Jest liczba mnoga, albo jej nie ma — basta. W języku polskim tak łatwo nie jest. Jak czytam na stronie <a href="http://www.rjp.pan.pl/index.php?option=com_content&amp;view=article&amp;id=1011:skadnia-liczebnikow-70&amp;catid=44&amp;Itemid=145">Rady Języka Polskiego „Składnia liczebników”</a>:

<blockquote>(…) na jakiej zasadzie łączą się liczebniki główne z rzeczownikami w grupę podmiotu w zdaniu. Otóż zasada jest taka, że liczebniki 2, 3, 4 oraz liczebniki, których ostatnim członem jest 2, 3, 4 (czyli np. 22, 23, 24, 152, 153, 154 itd.) łączą się z rzeczownikami w mianowniku liczby mnogiej, np. trzy koty, dwadzieścia cztery koty, sto pięćdziesiąt dwa koty. Liczebniki od 5 do 21 i te, które są zakończone na 5-9 (np. 25, 36, 27, 58, 69), łączą się z rzeczownikiem w dopełniaczu liczby mnogiej, np. pięć kotów, siedemnaście kotów, sto siedemdziesiąt siedem kotów.</blockquote>
Jak wybrnąć?
<h2>Nie odmieniać</h2>
No pierwsza myśl, która przychodzi do głowy: <strong>nie odmieniać</strong>. Mogę napisać „komentarze: 10” albo „komentarze: 1” albo „komentarze: 3” i brzmi to całkiem zgrabnie. <strong>Tak zresztą musiałem zrobić w Disqusie</strong> (systemie komentarzy na tym blogu), gdyż autorzy <strong>nie przewidzieli w ogóle możliwości odmiany</strong> liczby mnogiej w więcej niż dwóch formach. Jest miejsce na przetłumaczenie słowa „comment” dla 0, 1 lub więcej komentarzy:

<a href="/assets/wp-content/uploads/2018/01/Screenshot-2018-01-22-18.34.50.png"><img class="aligncenter size-large wp-image-978" src="/assets/wp-content/uploads/2018/01/Screenshot-2018-01-22-18.34.50-1024x263.png" alt="Odmiana liczby mnogiej przy liczebnikach" width="1024" height="263" /></a>

Działa! Ale mnie nie satysfakcjonuje. W Disqusie wyboru nie mam, ale <strong>we własnej aplikacji mogę zrobić to… dobrze</strong> :)

<h2>Odmieniać!</h2>
Można by analizować wypowiedź eksperta z RJP i ułożyć do tego odpowiedni warunek. Ale to nieco karkołomne. Na pewno ktoś musiał już to zrobić za mnie, prawda? Chwila myślenia… zajrzę do <code>gettext</code>!

<strong>Przeszukałem dokumentację dla „plural forms” i rzeczywiście znalazłem konkretne warunki dla języka polskiego!</strong> A warunek ten to:

<pre><code>Plural-Forms: nplurals=3; \
    plural=n==1 ? 0 : \
           n%10&gt;=2 &amp;&amp; n%10&lt;=4 &amp;&amp; (n%100&lt;10 || n%100&gt;=20) ? 1 : 2;</code></pre>

Moja pierwsza reakcja: 😱 Ale po chwili analizowania wszystko stało się jasne. Kod opisuje dokładnie to samo co odpowiedź Rady Języka Polskiego. Postanowiłem zamienić to na <strong>małą funkcję do odmiany słów w aplikacji</strong>:

<pre class="language-javascript"><code>function polishPlural(singularNominativ, pluralNominativ, pluralGenitive, value) {
    if (value === 1) {
        return singularNominativ;
    } else if (value % 10 &gt;= 2 &amp;&amp; value % 10 &lt;= 4 &amp;&amp; (value % 100 &lt; 10 || value % 100 &gt;= 20)) {
        return pluralNominativ;
    } else {
        return pluralGenitive;
    }
}</code></pre>

Wykorzystuję to w taki sposób:

<pre class="language-javascript"><code>polishPlurals("komentarz", "komentarze", "komentarzy", 1); // komentarz
polishPlurals("komentarz", "komentarze", "komentarzy", 0); // komentarzy
polishPlurals("komentarz", "komentarze", "komentarzy", 3); // komentarze</code></pre>

Lub ewentualnie razem z <code>bind</code>:

<pre class="language-javascript"><code>const commentsLabel = polishPlurals.bind(null, 'komentarz', 'komentarze', 'komentarzy');
commentsLabel(1); // komentarz
commentsLabel(0); // komentarzy
commentsLabel(3); // komentarze</code></pre>

<h2>Stworzyłem moduł na <code>npm</code>!</h2>
Kod jest dostępny na GitHubie: <a href="https://github.com/mmiszy/polish-plurals">mmiszy/polish-plurals</a>

Paczkę npm zaś można pobrać stąd: <a href="https://www.npmjs.com/package/polish-plurals">polish-plurals</a>. Paczka npm eksportuje zarówno plik <code>.js</code> (CommonJS) jak i <code>.mjs</code> (moduły ECMAScript).

<strong>Zachęcam do dodawania issues / komentowania / tworzenia PR-ów ;)</strong>

<h2>Co robić, jak żyć?</h2>
<strong>Weź śmiało powyższą paczkę i korzystaj.</strong> A jeśli masz bardzo rozbudowane tłumaczenia do przygotowania to może pomyśl o wykorzystaniu gotowych systemów, które dają już takie możliwości? Przykładowo, wspomniany <code>gettext</code> daje ogromne możliwości!
