---
id: 325
index: 32
title: Dlaczego porzuciłem Ghost na rzecz WordPress, ale Ty nie powinieneś?
date: 2017-09-11T18:28:43.000Z
isMarkdown: false
status: publish
permalink: czemu-porzucilem-ghost-rzecz-wordpress
authors:
  - michal-miszczyszyn
guid: https://typeofweb.com/?p=325
type: post
thumbnail:
  url: >-
    https://typeofweb.com/wp-content/uploads/2017/09/wordpress-vs-ghost-typeofweb-1.png
  width: 880
  height: 400
categories:
  - slug: back-end
    name: Back-end
  - slug: opinie
    name: Opinie
seo:
  focusKeywords:
    - WordPress
  title: Dlaczego porzuciłem Ghost na rzecz WordPress, ale Ty nie powinieneś?
  metadesc: "Do tej pory do blogowania na Type of Web korzystałem z systemu Ghost, jednak zrezygnowałem z niego na rzecz WordPress. Dlaczego? Co było moją\_motywacją?"
---

Od nieco ponad tygodnia możesz podziwiać całkowicie nową wersję strony Type of Web. Do tej pory korzystałem z systemu Ghost, jednak zrezygnowałem z niego na rzecz WordPress. Prawdę mówiąc, nosiłem się z tym zamiarem już od dłuższego czasu… co było moją motywacją? <strong>Dlaczego Type of Web lepiej sprawdza się na WordPressie?</strong> I, co ważne, dlaczego nadal uważam Ghost za świetną platformę<sup id="fnref:1"><a href="#fn:1" rel="footnote">1</a></sup> do blogowania? O tym wszystkim poniżej!

<figure id="attachment_348" align="aligncenter" width="1024">
  <a href="https://typeofweb.com/wp-content/uploads/2017/09/Screenshot-2017-09-11-20.26.50.png"><img class="wp-image-348 size-large" src="https://typeofweb.com/wp-content/uploads/2017/09/Screenshot-2017-09-11-20.26.50-1024x725.png" alt="Nowy wygląd Type of Web" width="1024" height="725" /></a>
  <figcaption>
    Nowy wygląd Type of Web
  </figcaption>
</figure>

<figure id="attachment_358" align="aligncenter" width="1024">
  <a href="https://typeofweb.com/wp-content/uploads/2017/09/Screenshot-2017-09-11-16.31.28.png"><img class="size-large wp-image-358" src="https://typeofweb.com/wp-content/uploads/2017/09/Screenshot-2017-09-11-16.31.28-1024x675.png" alt="Stary wygląd Type of Web" width="1024" height="675" /></a>
  <figcaption>
    Stary wygląd Type of Web
  </figcaption>
</figure>

<h2>Czym jest Ghost?</h2>
Zacznijmy może od tego czym jest Ghost. Ghost to, w wolnym tłumaczeniu sloganu z ich strony, „Profesjonalna platforma do publikowania treści”. Jest to platforma blogowa, wydana jako Open Source (+ płatny <em>Platform as a Service</em>). Ghosta śmiało można określić mianem <abbr title="Content Management System">CMS</abbr> (<em>Content Management System</em>, czyli system do zarządzania treścią). <strong>Ghost całkowicie skupia się na tworzeniu treści</strong> – sercem Ghosta więc jest edytor tekstu. Ogromną zaletą, przynajmniej z punktu widzenia programisty, jest fakt, że Ghost <del datetime="2017-09-11T14:42:21+00:00">wspiera</del> wymusza tworzenie artykułów w języku <a href="https://daringfireball.net/projects/markdown/" target="_blank" rel="noopener">Markdown</a>.

Ghost pozwala na korzystanie z różnych motywów – jest wiele darmowych, a także przynajmniej kilka płatnych. Ja jednak od początku używałem motywu domyślnego, który zmodyfikowałem do własnych potrzeb. Znajdziecie go w repozytorium <a href="https://github.com/mmiszy/casper" target="_blank" rel="noopener">github.com/mmiszy/casper</a>. Zmieniłem kilka rzeczy, głównie jakieś drobnostki typu formatowanie czy styl stopki i nagłówka.

Patrząc czysto technicznie: Ghost jest napisany w node.js i korzysta z Ember.js oraz mustache.js. I pomimo, że o hosting node.js teraz już nie trudno, to jednak próg wejścia w darmowego Ghosta jest dość wysoki – konieczna jest konfiguracja serwera, instalacja, a następnie <strong>dbanie o to, aby Ghost był na bieżąco aktualizowany</strong>, gdyż Ghost nie posiada funkcji automatycznej aktualizacji.

Albo raczej: Nie posiadał. W momencie gdy się z niego przesiadałem na WordPress, wyszła wersja Ghost 1.0, która podobno tę funkcję dodaje. Próbowałem nawet zrobić update jednak napotkałem niemały problem: Razem ze zmianami w Ghost, mocnej modyfikacji uległ również jego domyślny motyw. <strong>Zmiany te niestety konfliktowały z moimi drobnymi poprawkami bodajże w ponad 20 miejscach</strong>… zabrakło mi motywacji, aby ręcznie to wszystko poprawić. Arghhh 😡…

<h2>Czym Ghost nie jest?</h2>
Napisałem, że edytor jest sercem Ghosta – to prawda, ale nie cała prawda ;) Bo edytor jest nie tylko sercem, ale też płucami, nerkami, wątrobą… może dość tej metafory! <strong>Edytor to po prostu wszystko co Ghost ma do zaoferowania.</strong> Spójrz zresztą na poniższy zrzut ekranu przedstawiający panel administracyjny Ghosta.

<figure id="attachment_330" align="aligncenter" width="1024">
  <a href="https://typeofweb.com/wp-content/uploads/2017/09/ghost-desktop-2000x.png"><img class="wp-image-330 size-large" src="https://typeofweb.com/wp-content/uploads/2017/09/ghost-desktop-2000x-1024x646.png" alt="ghost admin panel screenshot" width="1024" height="646" /></a>
  <figcaption>
    Panel administracyjny Ghost. Zdjęcie z https://ghost.org/features/
  </figcaption>
</figure>

Widzimy możliwość edytowania artykułów, zarządzania autorami oraz kilka innych opcji – z których większość nie ma realnego wpływu na pracę systemu. Skupiamy się na treści i tylko na niej. A jeśli chcesz dodać coś niestandardowego, np. kolorowanie składni, albo nietypowe metadane Facebooka? Cóż. <strong>O ile autorzy Ghosta tego nie przewidzieli, będziesz miał spory problem.</strong> Być może uda Ci się dodać swój kod do opcji Ghosta (jest możliwość wstrzykiwania HTML-a do stopki i nagłówka), ale w wielu przypadkach będziesz zmuszony edytować wykorzystywany motyw… niektóre rzeczy mogą być też w ogóle niemożliwe do zrealizowania.

<h2>Czego mi zabrakło w Ghost?</h2>
<strong>Ghost sprawdzał się świetnie jako platforma do publikowania artykułów</strong>. I to działało… na początku. Po roku prowadzenia bloga chciałem kilka rzeczy zmienić:
<ul>
 	<li>Zależało mi na poprawieniu SEO – bez szans w przypadku Ghosta.</li>
 	<li>Lepsza integracja z Social Media – nic ponad to co przewidzieli autorzy.</li>
 	<li>Menu i widgety – praktycznie nie istnieją</li>
 	<li>Nowy wygląd – z jednej strony bardzo ubogi zestaw darmowych motywów, a z drugiej ogromny problem w znalezieniu kogoś kto podjąłby się napisania takiego motywu specjalnie dla mnie za pieniądze</li>
</ul>
Samo hostowanie Ghosta również stało się dla mnie upierdliwe, a <strong>aktualizacja do kolejnej wersji wymagała więcej wysiłku niż postawienie wszystkiego na nowo na WordPressie</strong>. Zapadła decyzja. Żegnaj, Ghost! 👌
<h2>Witaj, WordPress!</h2>
WordPress to system i platforma blogowa, innymi słowy: CMS. Podobnie jak Ghost, silnik jest Open Source, a płatny jest <abbr title="Platform as a Service">PaaS</abbr>. WordPress jest rozwijany od ponad 14 lat, a ja sam stawiałem na jego podstawie kilka mniejszych i większych serwisów – szczególnie na początku mojej kariery programisty. <strong>WordPress</strong><strong> jest odpowiedzialny aż za 28% wszystkich stron internetowych.</strong> To całkiem niezła liczba!

<figure id="attachment_336" align="aligncenter" width="1024">
  <a href="https://typeofweb.com/wp-content/uploads/2017/09/screen-themes.png"><img class="wp-image-336 size-large" src="https://typeofweb.com/wp-content/uploads/2017/09/screen-themes-1024x684.png" alt="Panel administracyjny WordPress" width="1024" height="684" /></a>
  <figcaption>
    Panel administracyjny WordPress. Zdjęcie z https://wordpress.org/
  </figcaption>
</figure>

<h2>Jak WordPress rozwiązał moje problemy?</h2>
Dwa określenia: Wtyczki i motywy potomne (<em>child themes</em>). Ale po kolei odniosę się do poprzednio wypunktowanych problemów:
<h3>Poprawa SEO</h3>
<strong>WordPress znany jest z tego, że już po domyślnej instalacji „lubi się” z wyszukiwarkami</strong>. Dodaje mnóstwo meta-tagów, poprawne elementy &lt;link rel…&gt; oraz wykonuje inne zabiegi, aby strona pojawiła się w wynikach wyszukiwania. Dodatkowo, istnieje całe gro wtyczek, które SEO jeszcze poprawiają i pozwalają na modyfikowanie słów kluczowych czy opisów dla każdego wpisu indywidualnie. I o ile <strong>Ghost próbował również takie funkcje wprowadzić, to jednak wychodziło mu to znacznie gorzej</strong>, a liczba opcji do konfigurowania była o wiele mniejsza.

Dodatkowo, motyw, którego używam, wypluwa bardzo dużo różnych metadanych (schema.org). Google widzi te wszystkie informacje i dzięki temu potrafi prawidłowo zinterpretować czym są określone fragmenty strony!

<h3>Integracja z Social Media</h3>
Wtyczki! Mnóstwo wtyczek! A jeśli nie wtyczki – to zmiany w motywie potomnym (o tym niżej). Dzięki temu widzisz tutaj ostatnie komentarze z Disqusa, moje najnowsze Tweety, a także w każdej chwili możesz polubić Type of Web na Facebooku albo <strong>zapisać się do newslettera</strong> (polecam!). Musiałbym się nieźle nagimnastykować, aby ten sam efekt osiągnąć w Ghost. Tutaj – praktycznie od razu dostaję wszystko na tacy i mogę się skupiać tylko na dopracowaniu szczegółów.
<h3>Menu i widgety</h3>
Tu znowu WordPress błyszczy. Mam praktycznie nieograniczoną możliwość konfigurowania menu i widgetów, które widzisz w sidebarze, nagłówku i stopce, a także pod każdym postem.
<h3>Motywy</h3>
WordPress pozwala na instalowanie motywów – a jest ich <strong>niezliczenie wiele</strong>, zarówno jeśli mówimy o tych płatnych, jak i o darmowych. Aktualnie Type of Web opiera się o całkowicie darmowy motyw Verbosa, który został dostosowany do moich potrzeb. Jednak muszę tutaj zwrócić uwagę na to, że modyfikacje motywów w WordPressie nie odbywają się w sposób podobny do tego z Ghosta – o nie! <strong>Nie modyfikowałem żadnych plików pochodzących od autora Verbosa</strong> i gdyby pojawiła się aktualizacja – moje zmiany na pewno nie zostaną utracone, a update mogę wykonać bez najmniejszych problemów.

Jak? Otóż <strong>WordPress ma koncept tzw. motywów potomnych</strong>, które zmieniają zachowanie motywu-rodzica bez konieczności modyfikowania jego plików! Dzięki temu zmieniłem niektóre zachowania i wygląd pewnych elementów, a także dodałem kilka potrzebnych mi funkcji – a wszystko to we własnym motywie potomnym.

To wszystko sprawia, że WordPressa często określa się też mianem nie tyle CMS co CMF – czyli C<em>ontent Management Framework</em>. To pojęcie szersze i oznaczające system, który daje programiście bazę do stworzenia własnej zaawansowanej aplikacji do zarządzania treścią. Dokładnie taki WordPress jest!

<h2>„Przeciwko” WordPress</h2>
Pod wpisem nafrontendzie.pl „<a href="https://nafrontendzie.pl/dosc-wordpressa-migruje-bloga-jekylla/" target="_blank" rel="noopener nofollow">Dość WordPressa! Migruję bloga do Jekylla!</a>” wiele osób zarzucało WordPressowi głównie dwie rzeczy: że to ciężka kobyła oraz, że wtyczki są kiepskiej jakości. Idealnie wpisałem się tutaj w ramy czasowe z moją migracją <strong>na WordPressa</strong> i chciałbym się do tamtego wpisu odnieść.
<h3>Czy WordPress jest ciężki?</h3>
Odpowiednio skonfigurowany: Nie. WordPress ma mnóstwo funkcji i opcji konfiguracji, dlatego naturalnie waży znacznie więcej niż mniejsze systemy blogowe. Bez odpowiednich opcji i optymalizacji, strona na WordPressie będzie znacznie wolniejsza niż bez niego…

<strong>Ale, ale, chwila, moment. Type of Web chyba nie ładuje się tak wolno?</strong> W zasadzie to ładuje się całkiem szybko<sup id="fnref:2"><a href="#fn:2" rel="footnote">2</a></sup>. A więc ten cały ciężki WordPress i ogrom kodu PHP nie spowalnia strony. Jak to możliwe? <strong>Krótko mówiąc: Cache.</strong> Kiedy wchodzisz na typeofweb.com to co widzisz <strong>to tak naprawdę statyczny HTML wygenerowany wcześniej przez WordPressa.</strong> W momencie gdy odwiedzasz mojego bloga, <strong>żaden kod PHP nie jest wykonywany na serwerze!</strong> Wszystko idzie z cache'a. Po opublikowaniu przeze mnie nowego artykułu, albo po wprowadzeniu zmian na stronie, WordPress automatycznie generuje statyczny HTML. <em>De facto</em> działa to prawie tak samo jak statyczny generator plików typu Jekyll. Dodatkowo, pliki CSS i JS są konkatenowane i minifikowane, a wszystkie obrazki na bieżąco optymalizowane.

<strong>Wniosek: Przy odpowiedniej konfiguracji, WordPress nie ma żadnego negatywnego wpływu na wydajność!</strong>

<h3>Czy wtyczki są kiepskie?</h3>
Tak. Zdecydowana większość wtyczek jest źle napisana, niewydajna i, co gorsza, zawiera <strong>poważne błędy bezpieczeństwa</strong>. Ale aby ten problem rozwiązać, wystarczy rozsądek ;) Nie instaluję pluginów, które są mało popularne, a samą ich liczbę ograniczyłem do absolutnego minimum. Niektóre widgety, jak na przykład „Type of Web na Facebooku” napisałem zupełnie sam – na podstawie wtyczki, która miała dużo więcej funkcji i przez to znacznie więcej potencjalnych błędów… <strong>Po prostu ograniczyłem to ryzyko.</strong>

Sam WordPress jest popularną platformą, a ewentualnie łatki ukazują się <em>dość szybko</em>, więc wystarczy cały czas pozostawać na bieżąco, aby zminimalizować jakiekolwiek ryzyko ataku. Sprawę ułatwia fakt, że WordPress – w odróżnieniu od Ghosta – aktualizuje się zupełnie sam. Nie wiem natomiast jaki jest czas reakcji zespołu Ghosta na ewentualnie zgłoszone bugi, ale domyślam się, że z racji mniejszego rozmiaru zespołu i mniejszej popularności, ten <strong>czas reakcji byłby dłuższy</strong>.

<h2>„Za” WordPress</h2>
Na konfigurację wszystkiego, łącznie z nowym serwerem, wgraniem wszystkich plików, modyfikacjami motywu, napisaniem kilku prostych wtyczek i doinstalowaniu kilku bardziej skomplikowanych, poświęciłem ledwo parę wieczorów. Efekt – działający blog, dokładnie tak jak chciałem, z opcjami, których potrzebuję. Pozwala mi się to skupić na tworzeniu ciekawych treści (jak, mam nadzieję, ten artykuł), a nie oprogramowywaniu bloga… raz ustawiony blog będzie mi służyły bez żadnych zmian przez długi czas.
<h2>Podsumowanie</h2>
Dlaczego więc uważam, że Ty powinieneś pozostać przy Ghost (lub jakimkolwiek innym systemie), jeśli z niego korzystasz? To przecież proste: <strong>Najważniejsza jest sama treść, a nie forma</strong>. Jeśli narzędzie, którego używasz Ci wystarcza – korzystaj z niego do woli. Ghost to naprawdę świetna aplikacja i polecam ją każdemu, kto chciałby się pobawić w blogowanie.

<strong>Ja jednak wybieram WordPress.</strong> Patrząc na dotychczasowe problemy z Ghostem, które opisałem w tym artykule, a które WordPress z łatwością rozwiązał – wybór ten wydaje się być oczywisty. Jeśli dodatkowo weźmiemy pod uwagę moje plany dotyczące Type of Web – potrzebuję systemu, który da się łatwo integrować z różnymi narzędziami i dowolnie rozszerzać 😎… Taki jest WordPress i wydaje mi się, że spełni swoje zadanie w 100%.

<div class="footnotes">
<ol>
 	<li id="fn:1" class="footnote">Musicie mi to wybaczyć: W tym wpisie słowo „platforma” używane jest w jego anglojęzycznym znaczeniu <a title="powrót do wpisu" href="#fnref:1">↩</a></li>
 	<li id="fn:2" class="footnote">Średni czas odpowiedzi serwera to 360ms. Nad innymi optymalizacjami (obrazki, fonty i inne, które ucieszą Lighthouse) nadal pracuję. <a title="powrót do wpisu" href="#fnref:2">↩</a></li>
</ol>
</div>
