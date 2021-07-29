---
id: 32
index: 21
title: 'Dobry kod: Ty też możesz pisać czytelny kod!'
date: 2016-11-25T11:43:24.000Z
isMarkdown: false
status: publish
permalink: dobry-czytelny-czysty-kod
authors:
  - michal-miszczyszyn
guid: https://typeofweb.com/index.php/2016/11/25/czytelny-kod/
type: post
thumbnail:
  url: https://typeofweb.com/wp-content/uploads/2016/11/pexels-photo-373465.jpeg
  width: 1280
  height: 853
categories:
  - slug: dobry-kod
    name: Dobry Kod
  - slug: opinie
    name: Opinie
seo:
  focusKeywords:
    - czytelny kod
    - czysty kod
    - Dobry kod
  focusKeywordSynonyms:
    - czytelność kodu, czytelnego kodu
    - czystego kodu
---

Pisanie czytelnego kodu sprawia wielu programistom ogromne kłopoty. Ta uwaga bynajmniej nie dotyczy wyłącznie osób początkujących, ale niestety także tych z latami doświadczenia. Z czego wynika problem? Jak sprawić, aby pisany kod był bardziej czytelny i przystępny? Co to jest czysty kod?

{/_ more _/}

Ostatnio mam okazję prowadzić webinary, warsztaty i szkolenia. Dodatkowo od dłuższego czasu staram się kontynuować inicjatywę <a href="https://www.facebook.com/groups/1131907053499522/">Weekly JavaScript Challenge</a>. Dzięki temu mam kontakt z wieloma programistami o różnym poziomie doświadczenia i z nieudawanym przerażeniem stwierdzam, że <strong>czytelność kodu nadal traktowana jest jako coś mało istotnego</strong>. Nic bardziej błędnego!

Programiści przez zdecydowaną większość czasu czytają, a nie piszą kod źródłowy. Dodanie krótkiego fragmentu do istniejącego projektu często wymaga przeczytania kilku lub kilkunastu linii kodu. To jeden z powodów, dla których czytelność powinna stać na pierwszym miejscu. <strong>Nieczytelny kod znacznie wydłuża czas potrzebny do napisania czegokolwiek nowego</strong>. Na domiar złego, niejasny i zagmatwany kod prowadzi do powstawania <strong>nieprzewidzianych błędów w aplikacjach</strong>, wynikających z niezrozumienia przepływu danych albo niespodziewanych efektów ubocznych.

Dlaczego więc czytelność kodu traktowana jest drugorzędowo? Zapytałem kilku znajomych programistów<sup id="fnref-1"><a href="#fn-1" rel="footnote">1</a></sup>.

<h2 id="wydajemisie">Wydaje mi się, że…</h2>

<blockquote>
  Wydaje mi się, że napisanie tego fragmentu w taki, a nie inny sposób, sprawia, że aplikacja działa znacznie szybciej.
  <br>– Małgorzata, Junior Software Developer w korporacji; 1 rok komercyjnego doświadczenia
</blockquote>

Cieszę się, Gosiu, że poruszyłaś ten wątek. Mój dziadek często powtarzał, że „<em>na oko to chłop w szpitalu umarł</em>”. Niby głupie powiedzenie, ale jednak często okazuje się bardzo prawdziwe.

Gdy ktoś mówi o wydajności i używa zwrotu „wydaje mi się”, to każdemu powinna się zapalić ostrzegawcza lampka. Jakie jest przyspieszenie? Ile milisekund? Ile procent? Jaki to ma wpływ na postrzeganą prędkość aplikacji i na UX? <strong>Są to niezwykle ważne pytania, a bez odpowiedzi na nie cała „optymalizacja” nie ma żadnego sensu.</strong>

Co oznacza zwrot „wydaje mi się”? Oznacza on „jestem zbyt leniwy i arogancki, by sprawdzić”.

Brałem udział w dyskusji, gdzie jedna z osób użyła takiego argumentu:

<blockquote>
  Jestem pewien, że to działa szybciej. Operacje na gołym DOM muszą być szybsze niż framework, to chyba oczywiste?
</blockquote>

To chyba najgorszy rodzaj arogancji: opinia przedstawiona jako oczywisty fakt. Jest to całkowicie puste stwierdzenie. Panie kolego, prosimy o rzeczowe argumenty, a nie krzykliwe hasła. Warto też zwrócić uwagę, że nawet jeśli ta wypowiedź wydaje się być sensowna, to jednak nie jest prawdziwa – istnieją biblioteki, które dzięki mądrym rozwiązaniom, potrafią renderować HTML szybciej niż gdybyśmy ręcznie operowali na gołym DOM.

<blockquote>
  Jeśli optymalizujesz kod i nie wykonujesz pomiarów by potwierdzić wzrost wydajności, jedyne czego możesz być pewien to fakt, iż sprawiłeś, że Twój kod stał się mniej czytelny.
  <br>– Martin Fowler, <a href="http://www.martinfowler.com/ieeeSoftware/yetOptimization.pdf">“Yet Another Optimization
  Article”</a> (czysty kod)
</blockquote>

Gosi możemy wybaczyć z racji małego doświadczenia. Rada od bardziej doświadczonego kolegi: Od teraz, gdy ktoś Ci powie, że jedna wersja kodu jest szybsza od drugiej, zawsze zapytaj: „O ile?”. To zachowanie godne profesjonalisty i czystego kodu.

<h2 id="alemniesitojawijakokolory">Ale mnie się to jawi jako kolory…</h2>

<blockquote>
  Gdy piszę swój kod, to od razu dostrzegam miejsca, które w oczywisty sposób mogą zostać zoptymalizowane. Nauczyli mnie tego na studiach: gdy programowałem mikroprocesory z 8KB RAM w języku C to często robiłem wstawki asemblerowe, żeby było szybciej. Czytelność jest ważna, ale na pewno nie najważniejsza.
  <br>– Tomek, Full-Stack Ninja JavaScript Rockstar Crusader we własnej jednoosobowej firmie; 2 lata komercyjnego doświadczenia
</blockquote>

Tomek ma rację, o ile cofniemy się 15 lat w czasie i będziemy programować Amigę. W innym wypadku – nie (chyba, że Tomasz ma magiczną kryształową kulę). Niestety takie podejście bardzo często pokutuje wśród osób przyzwyczajonych do programowania w językach niskopoziomowych. Najczęstsze grzechy to obawa przed tworzeniem wielu małych funkcji i ręczne <em>cache’owanie</em> zmiennych. Często też enigmatyczne nazwy – wszak w Fortranie obowiązywał limit liczby znaków na zmienną! Cierpi na tym głównie czysty kod.

Sama wiedza o tym, że każda operacja <code>JMP</code> w asmie to dużo zachodu dla procesora nie szkodzi. Cóż, wiedza chyba nigdy nie przeszkadza! Ale próba stosowania zwyczajów i porad wyniesionych z dawnych lat, albo z języków niskopoziomowych w językach nowoczesnych nie tylko nikomu nie pomaga, ale wręcz szkodzi.

Dzisiejsze kompilatory to bardzo zaawansowane narzędzia. Niemal dzieła sztuki, wynik lat prac i badań matematyków i informatyków. <strong>Czy naprawdę wydaje Ci się, że jesteś w stanie zoptymalizować kod bardziej niż kompilator?</strong> Nie jesteś<sup id="fnref-2"><a href="#fn-2" rel="footnote">2</a></sup>. Możesz być o tym przekonany. Jest to w szczególności istotne w językach kompilowanych <em>Just In Time</em> (JIT), gdzie kompilator czyni cuda (dosłownie!) i przykładowo inteligentnie bardziej optymalizuje fragmenty kodu, które są częściej uruchamiane.

Jednym z takich języków jest JavaScript. Nie sposób jest dzisiaj przewidzieć, czy pierwsza wersja kodu będzie bardziej wydajna od drugiej. Nie dość, że <strong>mały fragment może zostać skompilowany zupełnie inaczej niż ten sam kod w kontekście całej aplikacji</strong>, to jeszcze dochodzi do tego fakt, że <strong>sposób pracy kompilatorów może zmieniać się z każdą nową wersją przeglądarek</strong>. Dlatego, należy pisać przede wszystkim czytelny kod i czysty kod. Z tego samego powodu wyniki typu jsperf rzadko są merytorycznym argumentem w dyskusji.

<p class="important">Optymalizację kodu w większości przypadków lepiej zostawić maszynom.</p>

<h3 id="optymalizacjatonieproces">Optymalizacja to nie proces</h3>

Gosi wybaczyliśmy optymalizowanie kodu „na oko”. Ale czy możemy wybaczyć Tomkowi, który twierdzi, że jest gwiazdą rocka programowania?

Tomku. Optymalizacja to nie proces. <strong>Niemożliwe jest napisanie całkowicie optymalnego kodu od zera</strong> z przynajmniej dwóch powodów. Po pierwsze, jak już wspomniałem, nie wiesz jak dokładnie zadziała kompilator w kontekście dużej aplikacji, więc optymalizowanie małych fragmentów nie ma sensu. Po drugie, nie wiesz jeszcze, w jaki sposób dokładnie Twoja aplikacja będzie wykorzystywana przez użytkowników.

Jeśli tego nie wiesz, to skąd wiesz co tak właściwie optymalizujesz? A może właśnie pogarszasz czas działania aplikacji? Prosty przykład. Dla wielu osób oczywisty. Który z poniższych kodów zadziała szybciej?

<pre><code class="language-javascript">// 1
for (let i = 0; i &lt; arr.length; ++i) {  
    …
}
</code></pre>

<pre><code class="language-javascript">// 2
const l = arr.length;  
for (let i = 0; i &lt; l; ++i) {  
    …
}
</code></pre>

Jeśli powiedziałeś, że wersja 1, to odpowiedziałeś błędnie. <br />
Jeśli powiedziałeś, że wersja 2, to również odpowiedziałeś błędnie. <br />
Nie ma jednoznacznej prawidłowej odpowiedzi. Jedyne co powinieneś powiedzieć to: „Zależy.”

<strong>Nawet tak prosty, teoretycznie oczywisty przypadek, pozostawia pole do interpretacji dla kompilatora</strong>. Zazwyczaj oba te fragmenty kodu zostaną skompilowane dokładnie do tego samego kodu wykonywalnego. Zazwyczaj. Jednak znany jest przypadek, gdy <a href="http://mrale.ph/blog/2014/12/24/array-length-caching.html">wersja 2 działała wolniej niż wersja 1</a>.

Tomku, nie dość, że pogorszyłeś czytelność kodu i odpuściłeś sobie całkowicie czysty kod, to jeszcze zmarnowałeś przy tym sporo czasu na myślenie o różnych mikrooptymalizacjach. Ani współpracownicy, ani przełożeni nie byliby zadowoleni, gdybyś oczywiście ich miał. <em>Shame on you</em>.

<h3 id="jaky">Jak żyć i tworzyć dobry kod?</h3>

Stwórz aplikację. Pisz czysty kod i czytelny kod. Poszukaj problemów z wydajnością. Zmierz i zidentyfikuj co dokładnie jest przyczyną. Będziesz zaskoczony rezultatami. <strong>Wtedy optymalizuj to, co ma sens.</strong>

Jakiś czas temu miałem zoptymalizować pewną aplikację internetową. Jej zadaniem było rysowanie różnych wykresów w przeglądarce, a całość była oparta o framework AngularJS. W pierwszej chwili pomyślałem: „No oczywiście, wydajność rysowania na pewno jest do poprawki, a w drugiej kolejności to pewnie framework sprawia problemy”. Nie zabrałem się jednak do optymalizowania na oślep, lecz odpaliłem narzędzia developerskie. Rezultat pomiarów? Ani framework, ani nawet rysowanie SVG nie były żadnym problemem. Problemem była zła architektura aplikacji i przepływ danych oraz zdarzeń, przez które wykres często był przerysowywany kilkukrotnie bez żadnych zmian. Kto by pomyślał! Poprawki zajęły sporo czasu, ale efekty były bardzo dobre: poprawa czasów renderowania o 75%.

<h2 id="nieczytelnietoznaczyszybciejprzecie">Nieczytelnie to znaczy szybciej przecież…</h2>

<blockquote>
  Tworzę swój startup i tutaj wszystko zmienia się ciągle jak w kalejdoskopie. Nie mamy czasu na przejmowanie się czytelnością kodu, bo za dwa miesiące połowa aplikacji i tak zostanie zaorana.
  <br>– Maciej, CEO, CTO, CFO i COO jednego z polskich startupów; 5 lat komercyjnego doświadczenia
</blockquote>

Macieju, życzę powodzenia w budowaniu biznesu. Jednak założenia, na których oparłeś swoją wypowiedź są niestety błędne i nie wróżę sukcesów w prędkim rozwijaniu aplikacji.

Stwierdzenie, że pisanie nieczytelnego kodu jest szybsze, niż pisanie czytelnego kodu to absurd. Całkowita sprzeczność. Wszak <strong>jedną z głównych zalet pisania dobrego kodu jest szybkość rozwoju aplikacji</strong>!

Zastanówmy się czy w ogóle pisanie kodu byle jak jest szybsze. Jest? Nazywając zmienną <code>x</code> zamiast <code>playerPosition</code> zyskujemy ok. 1 sekundy. Jeśli pomnożymy to razy 10000 linii kodu to otrzymujemy prawie 3 godziny. Co za wynik, będziemy pierwsi na rynku, hurra!

Co na tym tracimy? Przede wszystkim <strong>godziny, a może nawet dni na wdrażaniu nowych programistów do zespołu. Dni, tygodnie na implementowaniu nowych funkcji</strong> w gąszczu niezrozumiałego kodu. Setki błędów na produkcji, które nie powinny się wydarzyć. Czy to ważne aspekty w szybko rozwijającym się startupie, który prędko zatrudnia nowe osoby i intensywnie pracuje nad nowymi funkcjami? Pozostawiam to do oceny Maćka.

<strong>Nawet jeśli za dwa miesiące połowa aplikacji ma pójść do kosza, to zdecydowanie łatwiej będzie to zrobić, jeśli kod będzie zrozumiały</strong>, granice pomiędzy komponentami dobrze ustalone, a architektura jasna i klarowna. Nie chcielibyśmy przecież przypadkiem usunąć modułu C, od którego zależy moduł B, od którego zależy moduł A, który jednak miał zostać… Może i nie znam się na uprawie rolnej, ale jestem pewien, że orka jest łatwiejsza, jeśli na polu nie leżą miny. Nieczytelny kod to właśnie taka mina. Taka tam alegoria.

<h2 id="dlarwnowagi">Dobry kod dla równowagi…</h2>

Nie panikujmy jeszcze, nie jest aż tak źle! To nie jest przecież tak, że wszyscy programiści w Polsce mają w poważaniu jakość pisanego kodu, a czytelny kod to dla nich czarna magia. Nie każdy od razu używa <a href="https://typeofweb.com/dolar-na-poczatku-dolar-na-koncu-czyli-o-notacji-wegierskiej-w-js/">notacji węgierskiej</a>. Dla równowagi nieco inna wypowiedź:

<blockquote>
  Czytelność kodu i dobra architektura zawsze idą w parze. Ja i cały mój zespół stawiamy je na pierwszym miejscu. Czytelny kod nie jest ani mniej wydajny, ani nie zabiera więcej czasu, gdy się go tworzy – wystarczy tylko nieco zmienić nastawienie i nabrać kilku dobrych zwyczajów. Często optymalizuję tworzone aplikacje, szczególnie na urządzenia mobilne, jednak rzadko kiedy pogarszam przez to czytelność kodu. Najczęstsze problemy  związane są z renderowaniem albo komunikacją z API, a na to żadne mikrooptymalizacje i tak nie pomogą.
  <br>– Łukasz, Software Developer; 5 lat komercyjnego doświadczenia
</blockquote>

<h2 id="wnioski">Dobry kod i wnioski</h2>

Z tegu długiego wpisu zapamiętajmy dwa wnioski:

<ol>
<li>Optymalizacje to nie proces.</li>
<li>Czytelność kodu stawiaj na pierwszy miejscu.</li>
<li>Serio, po prostu pisz czytelny kod i nie martw się resztą.</li>
</ol>

Zrozumienie i stosowanie tych dwóch zasad ma ogromną wartość dodaną dla każdego profesjonalisty. Dzięki nim masz szansę pisać kod lepszy i bardziej zrozumiały, a do tego rozszerzalny. Łatwiej też będzie Ci wdrożyć nowe osoby do zespołu, a gdy już nabierzesz pewnych nawyków, zaoszczędzisz masę czasu na czytaniu kodu własnego i innych. <strong>Czy są pytania?</strong>

Koniecznie przeczytaj <a href="http://helion.pl/view/117666/czykov.htm" target="_blank" rel="noopener noreferrer">książkę na temat czystego kodu</a>:

<a href="http://helion.pl/view/117666/czykov.htm" target="_blank" rel="noopener noreferrer"><img src="http://helion.pl/okladki/181x236/czykov.jpg" class="aligncenter" width="181" height="236" alt="Okładka książki „Czysty Kod” mówiącej, jak pisać czytelny kod" /></a>

<div class="footnotes"><ol><li class="footnote" id="fn-1"><p>Imiona zostały zmienione. <a href="#fnref-1" title="return to article">↩</a></p></li>
<li class="footnote" id="fn-2"><p>W 99,9% przypadków. Optymalizować warto, gdy udało się zlokalizować przyczynę, ale nigdy na oślep. <a href="#fnref-2" title="return to article">↩</a></p></li></ol></div>
