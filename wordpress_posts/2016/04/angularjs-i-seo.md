---
id: 13
index: 3
title: Single Page Applications a SEO
date: 2016-04-19T19:08:14.000Z
isMarkdown: true
status: publish
permalink: angularjs-i-seo
authors:
  - michal-miszczyszyn
guid: https://typeofweb.com/index.php/2016/04/18/angularjs-i-seo/
type: post
categories:
  - slug: javascript
    name: JavaScript
  - slug: front-end
    name: Front-end
seo: {}
---

<p>Wielokrotnie na licznych forach, grupach dyskusyjnych i spotkaniach pada pytanie odnośnie Single Page Applications i SEO. React, Angular, AngularJS, Vue — jak się mają do SEO? Jak to zrobić? Jak sprawić, by wyszukiwarki indeksowały <em>strony www</em> oparte o frameworki JavaScript? Jak poprawić podgląd udostępnianych linków do <em>Single Page Application</em> na Facebooku? Jak uzyskać lepsze rezultaty? Co prawda poniższy wpis skupia się na Angularze, jednak zawarte w nim porady <strong>można z powodzeniem zastosować do aplikacji działających w oparciu o dowolny framework JS</strong> np. React, Vue, Backbone, Ember, czy Knockout.</p>

<h2 id="stronawangularze">Strona w Angularze</h2>

<p>Oczywiście na powyższe pytania jest więcej niż jedno rozwiązanie, postaram się dalej o nich napisać. Ale przede wszystkim warto zapytać o coś innego: <strong>Dlaczego w ogóle chciałbym indeksować aplikację napisaną w Angularze?</strong> Jaką treść zazwyczaj chce się promować w Internecie? Tekst, zdjęcia, filmy, czyli generalnie treść statyczną, strony internetowe. Do czego zazwyczaj wykorzystuje się AngularJS? Do tworzenia <em>Single Page Applications</em> (SPA). Co to ma wspólnego? Raczej niewiele. Po co w ogóle indeksować aplikacje?</p>

<p>Bardzo często <strong>poszukiwanie rozwiązania problemu SEO w Angularze wynika ze złego doboru technologii do zadania</strong>. Zdarza się, że konstruowana jest rozbudowana aplikacja internetowa, do której AngularJS nadaj się świetnie, a do tego tworzony jest <em>landing page</em>, który niejako przy okazji oparty jest również o Angulara. <em>Landing page</em> to zazwyczaj wymienione wcześniej tekst, zdjęcia, filmy – czyli właśnie treść statyczna, czasem z elementami interaktywnymi. Dokładnie coś, co łatwo i bez wysiłku się indeksuje. Czy w ogóle framework jest potrzebny do stworzenia takiej strony? Zdecydowanie nie. Czy czasem jego użycie jest uzasadnione? <strong>Tak, ale rzadko</strong>. Moim zdaniem w większości przypadków jest to dobór niewłaściwego narzędzia do zagadnienia, przez co pojawia się tylko więcej trudniejszych problemów do rozwiązania – na przykład właśnie SEO.</p>

<p>Krótko: Aby nie mieć problemów z SEO w Angularze, <strong>nie twórz stron www w Angularze</strong>, bo na stronach internetowych nie potrzeba Angulara. Jeśli tworzysz aplikację i jej <em>landing page</em> to niech aplikacja korzysta z frameworka, ale <em>landing page</em> będzie już zwykłym HTML-em. To jest aż tak proste.</p>

<h2 id="dlaczegoangularjssinieindeksuje">Dlaczego AngularJS się nie indeksuje?</h2>

<p>Załóżmy jednak, że aplikacja już istnieje i po prostu konieczne jest zaindeksowanie treści, które się w niej znajdują, niezależnie od tego, czy jest to ten 1% przypadków, kiedy to rzeczywiście uzasadnione, czy wcześniejszy błąd projektowy. Jak już wspomniałem, rozwiązań jest kilka, ale aby je dobrze zrozumieć należy poznać naturę problemów SEO w Angularze.</p>

<p>Przede wszystkim warto zwrócić uwagę, że dzisiaj rzadko chodzi wyłącznie o indeksowanie się treści w Google. Bardzo istotnym nośnikiem informacji stały się przecież media społecznościowe, więc należy celować również w Facebooka i Twittera, a w zależności od potrzeb może też Slacka (chodzi o podgląd treści po wklejeniu linka). Na czym polega problem? Gdy udostępnia się link np. na Facebooku to bot Facebooka pobiera treść linkowanej strony, przetwarza i generuje na tej podstawie jej podgląd. Co istotne, pobiera wyłącznie HTML serwowany pod tym adresem i nie dotyka w ogóle kodu JavaScript, który się tam może znaleźć – czyli nie uruchamia np. aplikacji napisanej w Angularze. Problem polega na tym, że w przypadku <em>Single Page Applications</em> serwowany początkowo jest zawsze ten sam plik HTML niezależnie od podstrony, do której linkujemy. Po otwarciu takiego pliku w przeglądarce uruchamia się kod JavaScript, który dynamicznie zmienia zawartość strony. Niestety ten krok nie ma miejsca w przypadku pobierania treści przez boty i stąd <strong>one zawsze widzą tylko jedną i tę samą stronę, nieważne jaki byłby adres URL</strong>.</p>

<p>Wyjątkiem od tej reguły jest <a href="https://webmasters.googleblog.com/2014/05/understanding-web-pages-better.html">bot Google</a>, który od pewnego już czasu potrafi uruchamiać JavaScript na stronach i dzięki temu poprawnie indeksuje także SPA. Jednakże łatwo znaleźć w Internecie <a href="http://stackoverflow.com/questions/13499040/how-do-search-engines-deal-with-angularjs-applications#comment39832135_13521668">komentarze osób</a>, które donoszą, że sam fakt uruchamiania JavaScriptu przez bota nie oznacza automatycznie poprawnego indeksowania aplikacji, a ponadto jeśli zależy nam na wspomnianych serwisach społecznościowych to i tak zmuszeni jesteśmy zastosować jedną z metod opisanych poniżej.</p>

<h2 id="seowangularjs">SEO w AngularJS</h2>

<p>Jest kilka sposobów na rozwiązanie opisanego problemu, ale zasadniczo wszystkie sprowadzają się do jednego: <strong>Serwowania statycznego HTML-a botom</strong>. Zasada działania jest prosta. Najpierw pewien przygotowany skrypt pobiera poszczególne podstrony, uruchamia na nich JavaScript i zapisuje dynamicznie wygenerowany HTML. Następnie na poziomie serwowania treści rozpoznaje się czy żądanie jest wykonane przez bota, czy nie. Jeśli tak to na podstawie adresu URL serwowany jest wcześniej przygotowany statyczny HTML.</p>

<h3 id="prerenderio">prerender.io</h3>

<p><a href="https://prerender.io">Prerender.io</a> jest serwisem typu SaaS oraz <a href="https://github.com/prerender/prerender">biblioteką Open Source</a>. Zasada działania jest dokładnie taka, jak opisana wcześniej: Prerender pobiera wskazane podstrony, wykonuje na nich JS, cache’uje statyczny HTML i następnie serwuje botom. Wykorzystanie Prerender.io wymaga zmian w konfiguracji serwera, z którego się korzysta – ale na szczęście twórcy oraz społeczność udostępniają odpowiednie <em>middleware</em> m.in do Nginx,  ExpressJS, Rails, Apache, Spring, Symfony 2 i wielu innych. Szczegóły konfiguracji opisane są w <a href="https://prerender.io/documentation">dokumentacji</a>.</p>

<p>Prerender SaaS jest bezpłatny do 250 podstron co bez wątpienia jest jego ogromną zaletą. Dodatkowo, w przypadku gdy bot spróbuje pobrać stronę, która jeszcze nie znajduje się w cache’u Prerendera, zostanie ona w locie pobrana i dodana do cache. Może to zająć chwilę dłużej, co z kolei może skutkować obniżeniem rankingu przez bota, jednak z drugiej strony to na pewno bardzo elastyczne rozwiązanie. Dodatkowo Prerender pozwala też na ręczne wymuszenie dodania nowych podstron do cache’a przy użyciu odpowiedniego zapytania <code>POST</code> do API.</p>

<h3 id="brombone">BromBone</h3>

<p>BromBone jest drugim serwisem co do zasady działania bardzo podobnym do Prerender.io. Różnica polega na tym, że domyślnie BromBone wczytuje strony do indeksowania z pliku sitemap.xml stworzonego na podstawie <a href="http://www.sitemaps.org/">specyfikacji Sitemap.xml</a>. BromBone monitoruje zmiany w sitemapie i automatycznie cache’uje nowe podstrony <a href="http://www.brombone.com/documentation/">co około 6 godzin</a>. Bardziej elastyczne możliwości dostępne są tylko dla użytkowników planów Enterprise. BromBone nie udostępnia też planu darmowego, a opcja do 200 podstron kosztuje $39 miesięcznie.</p>

<h3 id="phantomjs">PhantomJS</h3>

<p>Trochę inną możliwością jest skorzystanie z własnego skryptu napisanego w JavaScript, przygotowanego do użycia razem z PhantomJS. PhantomJS jest przeglądarką internetową bez graficznego interfejsu użytkownika (<em>headless browser</em>). Jest oparta o WebKit i posiada API w JavaScripcie. PhantomJS potrafi renderować strony www oraz aplikacje napisane w JavaScripcie bez konieczności uruchamiania środowiska graficznego, a więc na przykład może to robić na serwerze, w tle. Brzmi idealnie jako narzędzie do renderowania statycznego HTML-a dla botów.</p>

<p>Wadą tego rozwiązania bez wątpienia jest nieco bardziej skomplikowana konfiguracja – trzeba napisać skrypt, który poprawnie obsłuży naszą aplikację. Jednocześnie jest to również zaleta, ponieważ tę konfigurację można maksymalnie dostosować do naszych potrzeb; to na pewno najbardziej elastyczne rozwiązanie. Przykładowy skrypt można znaleźć w repozytorium <a href="https://github.com/steeve/angular-seo/blob/master/angular-seo-server.js">angular-seo</a>.</p>

<h2 id="contentcloaking">Content cloaking</h2>

<p>Wielu użytkowników wyraża obawy w związku z serwowaniem innej treści normalnym użytkownikom, a innej botom w związku z faktem, że może to być postrzegane jako przykład <a href="https://support.google.com/webmasters/answer/66355?hl=pl">maskowania</a> zdefiniowanego przez Google:</p>

<blockquote>
  <p>Maskowanie to działanie, które polega na przedstawieniu wyszukiwarkom innych treści lub adresów URL niż użytkownikom.</p>
</blockquote>

<p>Dawniej technika ta służyła podbiciu rankingu danej strony w wynikach wyszukiwania (np. poprzez serwowanie botom Google treści wypchanej słowami kluczowymi, a użytkownikom zwykłego artykułu). Z tego powodu dzisiaj wyszukiwarki zdają się <a href="https://support.google.com/webmasters/answer/66353">penalizować takie techniki</a>. Jednak <strong>opisane przeze mnie metody nie są negatywnie punktowane przez boty</strong> z kilku powodów. Po pierwsze, serwowana treść w tym przypadku jest taka sama zarówno dla bota, jak i dla użytkownika – zmienia się tylko sposób jej podania (dynamicznie stworzony HTML <em>vs</em> statyczny HTML). Ponadto, Google samo dawniej stworzyło <a href="https://developers.google.com/webmasters/ajax-crawling/docs/html-snapshot#generating-html-snapshots">wskazówki</a> mające na celu umożliwienie indeksowania <em>Single Page Applications</em>. Co prawda dzisiaj są one już niezalecane (w związku z dodaniem obsługi JavaScriptu do bota Google), ale sam fakt istnienia tej dokumentacji wskazuje na to, że serwowanie statycznego HTML botowi Google na pewno nie było nigdy karane.</p>

<h2 id="podsumowanie">Podsumowanie</h2>

<p>Korzystałem zarówno z BromBone, jak i Prerender.io, i oba te rozwiązania dobrze się sprawdziły – robiły dokładnie to, co powinny. Jednak ostatecznie zrezygnowaliśmy z nich na rzecz własnego skryptu i PhantomJS. Ostatnio implementowałem możliwość udostępniania na Facebooku dynamicznie generowanych linków do podstrony w aplikacji i tu już niestety gotowe rozwiązania się nie sprawdziły. BromBone nie serwował zupełnie niczego, bo potrzebuje aż 6 godzin na zaindeksowanie nowych linków. W prerender.io natomiast szybko przekroczyliśmy limit 250, a nawet kilku tysięcy podstron, co po prostu przestało się opłacać. Własny skrypt i PhantomJS wymagały poświęcenia trochę więcej czasu na skonfigurowanie, jednak ostatecznie okazały się mniej zawodne i tańsze.</p>

<p>Bez wątpienia z tego wpisu należy wyciągnąć dwa wnioski: <br />
1. Do stworzenia strony www nie potrzeba frameworka. <br />
2. Jeśli zajdzie potrzeba, to nie trzeba już dzisiaj obawiać się SEO w aplikacjach JavaScriptowych.</p>

<p>Wkrótce podzielę się na GitHubie swoją konfiguracją i sposobem tworzenia odpowiednich meta-tagów dla podstron w AngularJS.</p>
