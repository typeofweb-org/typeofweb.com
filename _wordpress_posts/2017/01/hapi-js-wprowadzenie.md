---
title: Hapi.js – Wprowadzenie
date: 2017-01-29T20:18:00.000Z
isMarkdown: false
status: publish
permalink: hapi-js-wprowadzenie
authors:
  - michal-miszczyszyn
type: post
categories:
  - slug: javascript
    name: JavaScript
  - slug: back-end
    name: Back-end
series:
  slug: hapijs
  name: HapiJS
seo: {}
---

<p>Po moich dwóch poprzednich wpisach dotyczących frameworka hapi.js na platformę Node.js, wiele osób zaczęło zadawać mi różne pytania. Poniżej zebrałem najciekawsze z nich oraz kilka własnych przemyśleń. Należy potraktować to jako miękkie <strong>wprowadzenie do tworzenia backendu w Node.js z hapi.js</strong>.</p>

<h1 id="skdsiwoglewziohapijs">Skąd się w ogóle wzięło hapi.js?</h1>

<p>Hapi.js jest frameworkiem JS przeznaczonym na platformę Node.js.  <a href="https://github.com/hapijs/hapi/commit/1c4f07037a5812cec749ed802436fe3c2420f488">Zaczął powstawać</a> w 2011 roku i niemal od początku był silnie wspierany i wykorzystywany przez zespół <a href="https://hueniverse.com/2012/12/20/hapi-a-prologue/">developerów z Walmart</a>. Nazwa frameworka wzięła się od skrócenia zwrotu “<strong>H</strong>TTP <strong>API</strong>”.</p>

<p>Projekt był rozwijany jako <em>Open Source</em> na GitHubie, a po dłuższym czasiem stał się zupełnie <a href="https://hueniverse.com/2015/03/17/on-leaving-walmart/">niezależny od Walmarta</a>. Można powiedzieć, że inwestycja się opłaciła – Walmart nadal korzysta ze wspaniałego narzędzia, któremu dał początek, a które teraz dzięki swojej popularności rozwijane jest przez społeczność.</p>

<p><strong>Hapi.js obsługiwał cały ruch z urządzeń mobilnych na Walmart.com już w 2013 roku</strong>. Było to wtedy prawdopodobnie największe wdrożenie aplikacji opartej o Node.js w ogóle. W czasie Black Friday 2013 twórcy hapi.js dzielili się relacjami na temat wydajności Node.js i hapi.js na Twitterze pod hashtagiem <a href="https://twitter.com/search?q=%23nodebf%20%40eranhammer">#nodebf</a>. <strong>Okazało się, że framwork spisał się lepiej niż wyśmienicie</strong>. Cały ruch (a jego rozmiar jest dla mnie praktycznie niewyobrażalny) mógłby zostać obsłużony na <a href="https://github.com/hapijs/hapi/issues/1326#issuecomment-32313454">10 rdzeniach i 28GB pamięci RAM</a> – czyli stosunkowo słabej mocy serwerze.</p>

<p><strong>Hapi.js jest wykorzystywany przez m.in. Yahoo, Disney, PayPal, GOV.UK, Mozilla, npm, czy Hoodie</strong>, a także <a href="https://hapijs.com/community">wiele innych dużych firm</a>. W tej chwili framework ma 7310 gwiazdek na GitHubie.</p>

<h1 id="jakiesceleizaoeniahapijs">Jakie są cele i założenia hapi.js?</h1>

<p>Wymieniam dwa główne założenia projektu:</p>

<h2 id="testy">Testy</h2>

<p>Jednym z założeń hapi jest jego testowalność. Framework udostępnia pomocniczną metodę (<code>server.inject(…)</code>) służącą do testowania pluginów i endpointów. Warto zauważyć, że <a href="https://travis-ci.org/hapijs/hapi/jobs/189943204">pokrycie kodu hapi.js testami wynosi 100%</a> – jest to jeden z celów twórców hapi.</p>

<p><img src="https://res.cloudinary.com/type-of-web/content/images/2017/01/Screenshot-2017-01-29-23.48.11.png" alt="" /></p>

<h2 id="modularnaarchitektura">Modularna architektura</h2>

<p>Architektura hapi.js różni się od większości frameworków i bibliotek dostępnych na rynku. Hapi chce być <strong>pełno-funkcjonalnym framworkiem</strong>, dającym ogromne możliwości. Podobny cel stawia sobie wiele innych frameworków i mikroframeworków, jednak robią to na różne sposoby. Z grubsza, możemy podzielić je na trzy grupy.</p>

<p>Pierwsza to rozbudowane i bardzo „zopiniowane” rozwiązania. Nazwijmy je tutaj „monolitycznymi”. Doskonałym przykładem takiego monolitu jest choćby Sails.js – framework o sporych możliwościach, jednak w którym twórcy poczynili szereg założeń i narzucają programistom wiele konwencji.</p>

<p>Przeciwwagą dla takiego rozwiązania są mikroframeworki i biblioteki takie jak Express.js. Ich zaletą bez wątpienia jest ogromna elastyczność, jednak wymagają podejmowania wielu decyzji odnośnie struktury i architektury aplikacji, a także integrowania kodu z wieloma modułami stron trzecich.</p>

<p>Zespół hapi.js podchodzi do tego tematu inaczej i stawia na rozwój silnego „rdzenia” frameworka oraz licznych oficjalnych i nieoficjalnych pluginów rozszerzających jego możliwości. Samo <strong>hapi.js jest bazą do tworzenia aplikacji internetowych</strong> i udostępnia sporo różnych funkcji związanych z tworzeniem serwera, połączeń, obsługą HTTP i serwowaniem treści. Wszelkie dodatkowe opcje, takie jak uwierzetelnianie czy obsługia ciastek są dodawane poprzez <strong>rozbudowany system pluginów</strong>.</p>

<p>Dodatkowo warto zwrócić uwagę, że <strong>hapi.js nie czyni żadnych założeń co do struktury kodu programisty</strong>. Używając hapi.js możesz stworzyć monolit, albo całkowicie luźno powiązane moduły.  HapiJS może posłużyć do serwowania statycznego HTML-a, albo baza pod microservice’y. Możesz dowolnie ułożyć pliki i foldery, i korzystać z dowolnej konwencji.</p>

<h2 id="konfiguracjajestnajwaniejsza">Konfiguracja jest najważniejsza</h2>

<p><strong>Twórcy Hapi.js mocno postawili na realizowanie podejścia <em>configuration-centric</em></strong>. W praktyce oznacza to, że zamiast wywoływać kolejne metody udostępnione przez hapi, w większości przypadków przekazujemy po prostu obiekt z konfiguracją, którą hapi obsługuje. Jakie są zalety tego rozwiązania? Skupiamy się na deklarowaniu konfiguracji, a nie na poznawaniu metod konkretnego frameworka. Dodatkowo, obiekty z konfiguracją możemy przenieść do osobnego pliku .js czy nawet .json, a następnie bez problemu wykorzystać w innym miejscu.</p>

<p>Przykładowo, w projekcie nad którym pracowałem, każdy endpoint składał się przynajmniej z 3 niezależnych plików: <em>handlera</em>, walidacji i <em>route’ów</em>, przy czym te dwa ostatnie były niczym więcej niż wyeksportowanymi prostymi obiektami JS. Takie podejście <strong>pomaga zachować porządek w kodzie oraz przyspiesza proces powstawania aplikacji</strong>. Ponadto, ułatwia także czytelność – chcąc znaleźć opis walidacji danego endpointa nie musiałem w ogóle zaglądać do kodu handlera.</p>

<p>Co więcej, twórcy hapi zadbali o to, aby <strong>framework automatycznie uzupełniał brakujące informacje sensownymi wartościami domyślnymi</strong>. Na przykład, jeśli dany endpoint zwraca tekst, to typ odpowiedzi automatycznie zostanie ustawiony na <code>text/plain</code>, jeśli zaś zwrócimy obiekt, to zostanie on zamieniony na JSON i zwrócony jako <code>application/json</code>. Dzięki temu w wielu przypadkach sporą część konfiguracji możemy skrócić lub w ogóle pominąć.</p>

<h1 id="doczegonadajesihapijs">Do czego nadaje się hapi.js</h1>

<p>Hapi jest frameworkiem, który można wykorzystać do wielu celów na wiele różnych sposobów. Hapi świetnie nada się między innymi do:</p>

<ul>
<li>tworzenie REST API (JSON, XML)</li>
<li>serwowanie statycznego HTML-a,</li>
<li>renderowanie szablonów (np. Handlebars czy Jade),</li>
<li>tworzenie proxy (przez plugin h2o2 – w ten sposób Walmart przekierowywał żądania do starych <em>legacy</em> serwisów napisanych w Javie zanim zostały w całości zastąpione Node.js)</li>
<li>serwowanie front-endu i backendu do <em>Single Page Applications</em> (React, Angular)</li>
<li>jako <em>front controller</em> do innych aplikacji, np. symulacji fizycznych napisanych w C++</li>
</ul>

<h1 id="gdzieszukapomocyzhapijs">Gdzie szukać pomocy z hapi.js?</h1>

<p>Przede wszystkim warto zajrzeć na stronę hapi. Jest tam cała dokumentacja API frameworka, tutoriale i materiały: <a href="https://hapijs.com/">https://hapijs.com/</a> </p>

<p>Błędy można zgłaszać na GitHubie. Najpierw jednak warto poszukać, czy podobny problem nie został już zgłoszony :) <a href="https://github.com/hapijs/hapi">https://github.com/hapijs/hapi</a></p>

<p>Jest też kanał <code>hapijs/hapi</code> na Gitterze: <a href="https://gitter.im/hapijs/hapi">https://gitter.im/hapijs/hapi</a></p>

<p>Oraz kanał <code>#hapi</code> na freenode (IRC): <a href="http://webchat.freenode.net/?channels=hapi">http://webchat.freenode.net/?channels=hapi</a></p>

<p>Na StackOverflow istnieje specjalny tag <code>hapijs</code> pod którym można szukać i zadawać pytania związane z tym frameworkiem: <a href="http://stackoverflow.com/questions/tagged/hapijs">http://stackoverflow.com/questions/tagged/hapijs</a></p>

<p>Więcej pomocnych informacji można znaleźć na <a href="https://hapijs.com/help">https://hapijs.com/help</a></p>
