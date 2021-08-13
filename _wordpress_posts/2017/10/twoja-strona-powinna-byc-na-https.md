---
index: 36
title: 'HTTPS: Dlaczego Twoja kolejna strona powinna to mieć?'
date: 2017-10-10T10:28:14.000Z
isMarkdown: false
status: publish
permalink: twoja-strona-powinna-byc-na-https
authors:
  - michal-miszczyszyn
type: post
thumbnail:
  url: >-
    https://res.cloudinary.com/type-of-web/wp-content/uploads/2017/10/Screenshot-2017-10-09-20.56.24.png
  width: 1252
  height: 576
categories:
  - slug: back-end
    name: Back-end
seo:
  focusKeywords:
    - SSL
    - Let's encrypt
    - HTTPS
  metadesc: >-
    HTTPS to szybsze ładowanie stron, lepsze SEO i komfort użytkowników.
    Certyfikaty są darmowe dzięki Let's Encrypt. Dowiedz się czemu powinieneś
    używać SSL!
---

Niemal cała Twoja aktywność w Internecie odbywa się za pośrednictwem protokołu HTTP (Hypertext Transfer Protocol). Właściwie niezależnie co robisz, z czym albo skąd się łączysz – prawdopodobnie robisz to przez HTTP. Wraz z tym jak Twoja zależność od Internetu rośnie, jesteś narażona/y na coraz więcej różnego rodzaju zagrożeń. <strong>Każde nieszyfrowane połączenie HTTP upublicznia informacje o tym co robisz, jakie strony odwiedzasz oraz jakie akcje na nich wykonujesz.</strong> Dlatego tak ważne jest, abyś już dzisiaj zaczęła/zaczął używać HTTPS (SSL) – niezależnie, czy jesteś twórcą, czy konsumentem treści! Teraz to możliwe, zupełnie za darmo, dzięki Let's encrypt!

{/_ more _/}

<h2>HTTPS</h2>

HTTPS (Hypertext Transfer Protocol Secure, albo HTTP over TLS) – czyli bezpieczne HTTP. Jest protokołem, w którym komunikacja następuje po HTTP, tylko że z dodatkiem szyfrowania. Technicznie rzecz biorąc, HTTPS to połączenie HTTP (protokołu przesyłania informacji) wraz z SSL lub, bardziej nowocześnie, TLS, służącego do szyfrowania danych.

Główną motywacją powstania <strong>HTTPS jest uwierzytelnianie odwiedzanych stron www, ochrona prywatności użytkowników, a także zapewnienie integralności przesyłanych danych</strong>. Jednak w kuluarach usłyszeć można wiele mitów na temat HTTPS. Dzisiaj obalam kilka z nich i prezentuję 9 faktów na temat HTTP(S)!

<h2>1. HTTP zagraża Twojej prywatności</h2>

Jeśli łączysz się z dowolną stroną przez HTTP to wszelkie przesyłane informacje mogą być z łatwością podejrzane. Przez kogo? Nieznane Ci osoby trzecie, w zależności co przeglądasz i skąd. Zaczynając od właściciela wifi z którym się łączysz, przez rozmaite serwery proxy po drodze, aż po dostawcę usług internetowych. Łączysz się z darmowym wifi w kawiarni albo na lotnisku i otwierasz strony przez HTTP? <strong>Absolutnie każdy dookoła Ciebie może podejrzeć dokładnie co robisz.</strong>

HTTPS szyfruje cały ruch, a więc niemożliwe jest jego odczytanie w locie w ten sposób.

<h2>2. HTTP nie można zweryfikować</h2>

Dodatkowym problemem jest fakt, że <strong>to co otwierasz przez HTTP nie może zostać zweryfikowane</strong>. Innymi słowy: Gdy otwierasz stronę swojego banku http://costambank.pl – nie masz pewności czy na pewno widzisz przez sobą bank, czy może ktoś inny, po drodze, podmienia stronę i tylko czeka aż wprowadzisz swoje dane logowania (atak <em>man in the middle</em>).

Gdy jednak korzystasz z HTTPS, możesz mieć zdecydowanie większą pewność, że strona banku naprawdę nią jest. W przeglądarkach zazwyczaj informuje o tym zielona kłódka obok adresu:

<a href="https://res.cloudinary.com/type-of-web/wp-content/uploads/2017/10/Screenshot-2017-10-09-17.57.39.png"><img class="aligncenter wp-image-528 size-full" title="Certyfikat EV SSL PayPal" src="https://res.cloudinary.com/type-of-web/wp-content/uploads/2017/10/Screenshot-2017-10-09-17.57.39.png" alt="Certyfikat EV PayPal" width="940" height="152" /></a>

<a href="https://res.cloudinary.com/type-of-web/wp-content/uploads/2017/10/Screenshot-2017-10-09-17.59.07.png"><img class="aligncenter wp-image-529 size-full" title="Certyfikat DV SSL Type of Web" src="https://res.cloudinary.com/type-of-web/wp-content/uploads/2017/10/Screenshot-2017-10-09-17.59.07.png" alt="Certyfikat DV Type of Web" width="702" height="148" /></a>Czym się różnią od siebie te dwa zrzuty ekranu? O tym nieco dalej.

<h2>3. HTTP/2 jest znacznie szybsze od HTTP/1</h2>

Bardzo często powtarzanym mitem jest, że HTTPS jest wolniejsze od HTTP. Jest to bzdura. <strong>Faktem jest, że to HTTPS jest szybsze od HTTP.</strong> Spory skok technologiczny i przyśpieszenie można osiągnąć korzystając z protokołu <strong>HTTP/2</strong>, o ile Twój serwer go wspiera (a z mojego doświadczenia wynika, że coraz więcej usługodawców go ma!) Jest jednak pewien kruczek: Mimo, że specyfikacja tego nie zabrania, to jednak <strong>przeglądarki nie będą korzystały z HTTP/2 jeśli połączenie jest nieszyfrowane</strong>, a więc <em>de facto</em> niezbędne jest używanie SSL!

Jeśli chcesz sam/a sprawdzić <strong>o ile HTTP/2 przez HTTPS jest szybsze od zwykłego HTTP zerknij na tę stronę</strong>. Mój wynik poniżej: <a href="http://www.httpvshttps.com/" target="_blank" rel="noopener noreferrer">http://www.httpvshttps.com/</a>

<a href="https://res.cloudinary.com/type-of-web/wp-content/uploads/2017/10/Screenshot-2017-10-09-18.02.51.png"><img class="aligncenter wp-image-530 size-full" title="HTTPS jest nawet o 96% od HTTP" src="https://res.cloudinary.com/type-of-web/wp-content/uploads/2017/10/Screenshot-2017-10-09-18.02.51.png" alt="HTTPS jest nawet o 96% od HTTP" width="472" height="346" /></a>Jeśli przypadkiem jesteś devopsem i martwisz się tym, że szyfrowanie TLS obciąży Twój serwer to zajrzyj tutaj: <a href="https://istlsfastyet.com/" target="_blank" rel="noopener noreferrer">https://istlsfastyet.com/</a>

<h2>4. HTTPS pozwala na korzystanie z nowoczesnych technologii</h2>

<strong>Wiele nowych funkcji w przeglądarkach nie zadziała przez HTTP</strong>. Wymagane jest HTTPS. Chcesz korzystać np. z geolokalizacji, Service Worker, powiadomień Push albo Fullscreen (pełnego ekranu)? Tylko przez HTTPS.

<h2>5. HTTPS poprawia SEO</h2>

Już ponad 3 lata temu <a href="https://webmasters.googleblog.com/2014/08/https-as-ranking-signal.html" target="_blank" rel="noopener noreferrer">Google ogłosiło</a>, że używanie bądź <strong>nieużywane HTTPS będzie miało wpływ na pojawianie się danej strony w wynikach wyszukiwania.</strong> Wiele firm <a href="https://moz.com/blog/seo-tips-https-ssl" target="_blank" rel="noopener noreferrer">zajmujących się profesjonalnie SEO</a> twierdzi, że rzeczywiście <strong>HTTPS i SSL wpływa pozytywnie na ranking w wyszukiwarce Google</strong>.

Dodatkowo warto wiedzieć, że <strong>przy HTTP przeglądarki domyślnie nie ustawiają nagłówka Referer</strong> (tak, przez jedno <em>r</em>). Oznacza to, że jeśli nie używasz HTTPS to raczej nie dowiesz się skąd przychodzą do Ciebie Twoi użytkownicy!

<h2>6. HTTPS sprawia lepsze wrażenie dla użytkowników</h2>

Dodatkowo od niedawna <strong>przeglądarki zaczęły ostrzegać</strong> przed stronami, które zawierają formularze, ale nie używają HTTPS:

<a href="https://res.cloudinary.com/type-of-web/wp-content/uploads/2017/10/Screenshot-2017-10-09-18.38.50.png"><img class="aligncenter wp-image-531 size-full" title="Niebezpieczna strona bez HTTPS" src="https://res.cloudinary.com/type-of-web/wp-content/uploads/2017/10/Screenshot-2017-10-09-18.38.50.png" alt="Niebezpieczna strona bez HTTPS" width="238" height="68" /></a>

Wkrótce wszystkie strony używające HTTP mogą być oznaczone w ten sposób, a <strong>standardem stanie się korzystanie z HTTPS wszędzie</strong>. Taki jest szczytny cel :)

Ponadto, informacja o tym czy strona używa HTTPS czy nie znajduje się również w wynikach wyszukiwania w Google. Strona na górze nie korzysta z HTTPS, a strona na dole tak:

<a href="https://res.cloudinary.com/type-of-web/wp-content/uploads/2017/10/Screenshot-2017-10-09-18.44.43.png"><img class="aligncenter wp-image-532 size-full" title="Wyniki wyszukiwania z HTTPS i bez HTTPS" src="https://res.cloudinary.com/type-of-web/wp-content/uploads/2017/10/Screenshot-2017-10-09-18.44.43.png" alt="Wyniki wyszukiwania z HTTPS i bez HTTPS" width="252" height="322" /></a>

<h2>7. HTTPS jest całkowicie darmowe</h2>

Od pewnego czasu certyfikat potrzebny do HTTPS można mieć całkowicie za darmo dzięki inicjatywie <strong>Let's Encrypt</strong>. Let's Encrypt jest urzędem certyfikacji (CA) dostępnym od 2016 roku. W ramach projektu możesz <strong>w łatwy i zautomatyzowany sposób otrzymać darmowe certyfikaty TLS do potrzebne do HTTPS! </strong>Otrzymujesz nie tylko sam certyfikat, ale również zestaw narzędzi, który sprawia, że wdrożenie takiego certyfikatu jest prostsze niż kiedykolwiek. Celem Let's Encrypt jest sprawienie, aby cały ruch w Internecie odbywał się w sposób zaszyfrowany.

<img class="aligncenter wp-image-533 size-large" title="Logo Let's Encrypt" src="https://res.cloudinary.com/type-of-web/wp-content/uploads/2017/10/le-logo-wide-1024x301.png" alt="Logo Let's Encrypt HTTPS SSL" width="1024" height="301" />

Wiele hostingów natychmiast nawiązało współpracę i ułatwiło użytkownikom korzystanie z Let's Encrypt bez konieczności ręcznej instalacji czegokolwiek! Przykładowo, polski hosting <a href="http://www.mydevil.net/pp/9UVOSJRZIV" target="_blank" rel="noopener nofollow noreferrer">MyDevil.net</a>, z którego aktualnie korzystam, zintegrował Let's Encrypt ze swoim panelem administracyjnym i <strong>włączenie HTTPS dla całej strony to jedno kliknięcie!</strong>

<a href="https://res.cloudinary.com/type-of-web/wp-content/uploads/2017/10/Screenshot-2017-10-10-13.25.37.png"><img class="aligncenter size-large wp-image-560" src="https://res.cloudinary.com/type-of-web/wp-content/uploads/2017/10/Screenshot-2017-10-10-13.25.37-1024x302.png" alt="" width="1024" height="302" /></a>

Certyfikaty Let's Encrypt są wydawane na 90 dni. Warto poczytać <a href="https://letsencrypt.org/2015/11/09/why-90-days.html" target="_blank" rel="noopener noreferrer">dlaczego krótko = dobrze</a> – w skrócie zmniejsza to konsekwencje ewentualnej kradzieży klucza prywatnego i wymusza automatyzację odnowień certyfikatów. Poleca się odnawianie certyfikatu od Let's Encrypt co 60 dni.

Pod koniec czerwca Let's Encrypt ogłosiło, że osiągnięty został kamień milowy: <strong>100 milionów wydanych certyfikatów</strong>! Na początku przyszłego roku możliwe będzie również generowanie certyfikatów typu <em>wildcard</em>.

Sponsorami Let's Encrypt są giganci, m.in. Cisco, Mozilla, Google i Facebook.

Oczywiście niektóre firmy nadal sprzedają certyfikaty DV – i nie ma w tym nic złego. Jednak warto wiedzieć, że jest darmowa alternatywa, która niczym nie ustępuje, o ile tylko Twój hosting ją wspiera :) Jeśli nie widzisz informacji na ten temat to <strong>warto zapytać pomocy technicznej czy i kiedy obsługa Let's Encrypt się pojawi</strong>.

<h2>8. Rodzaje certyfikatów</h2>

Na pewno niejednokrotnie zauważyłaś/eś, że „kłódki” przy adresie strony mogą się między sobą różnić. Przykładowo inaczej wygląda na stronie banku, a inaczej u mnie na blogu, prawda?

<Gallery columns="2" link="file" size="medium">
  <img src="https://res.cloudinary.com/type-of-web/wp-content/uploads/2017/10/Screenshot-2017-10-09-19.42.42.png" loading="lazy" alt="Certyfikat DV" title="Certyfikat DV" width="488" height="70" />
<img src="https://res.cloudinary.com/type-of-web/wp-content/uploads/2017/10/Screenshot-2017-10-09-19.47.01.png" loading="lazy" alt="Certyfikat EV" title="Certyfikat EV" width="642" height="70" />
</Gallery>

Wyróżnia się 3 rodzaje certyfikatów:

<ul>
    <li>Domain Validated (DV) SSL/TLS</li>
    <li>Organization Validated (OV) SSL/TLS</li>
    <li>Extended Validation (EV) SSL/TLS</li>
</ul>

Let's Encrypt wystawia tylko <strong>certyfikaty DV</strong>, które wyświetlają się w przeglądarkach jako zielona kłódka. Oznacza to, że połączenie jest szyfrowane, a osoba odpowiedzialna za domenę była w stanie w jakiś sposób potwierdzić, że nią zarządza.

Certfikaty OV i EV są płatne.

<strong>Certyfikat OV</strong> wymaga potwierdzenia (i zweryfikowania) danych osoby kupującej ten certyfikat. Dzięki temu informacje o właścicielu są wyświetlane w przeglądarce gdy podejrzy się szczegóły certyfikatu, ale nie w pasku adresu. Z tego co wiem, <strong>jest to najwyższy poziom certyfikatu, który może zakupić osoba fizyczna.</strong>

<strong>Certyfikat EV</strong> wymaga pełnej weryfikacji i potwierdzenia danych organizacji lub firmy, która dokonuje zakupu – trwa to kilkanaście dni. Koszt takiego certyfikatu to nawet 2000zł za rok! Jednak ogromną zaletą jest <strong>wyświetlanie nazwy firmy w pasku adresu w przeglądarce</strong> – jak ma to miejsce np. na stronach banków. Daje to poczucie bezpieczeństwa oraz pewność, że odwiedzamy stronę firmy, która została zweryfikowana przez CA.

Są też certyfikaty tzw. <em>self-signed</em>, które są darmowe, generuje się je samemu i zapewniają szyfrowanie ruchu po HTTPS. Jednak korzystanie z nich na stronie internetowej mija się z celem – przeglądarki wyświetlają wielkie czerwone ostrzeżenie, które na pewno odstraszy użytkowników. Takie certyfikaty znajdują zastosowania na localhost w czasie developmentu lub w wewnętrznym użyciu firm (np. w intranetach). Po uprzednim dodaniu klucza do bazy kluczy w systemie przez pracowników (lub administratorów) ostrzeżenie nie będzie się pojawiać.

<h2>Co mam zrobić?</h2>

Mam nadzieję, że udało mi się Ciebie przekonać, że <strong>HTTPS w dzisiejszych czasach jest koniecznością.</strong> Jego konfiguracja jest szybka, łatwa, przyjemna i od pewnego czasu darmowa.

Mówiąc krótko: <strong>Do zastosowań zwykłych użytkowników wystarczą darmowe certyfikaty DV od Let's Encrypt.</strong> Nic to nie kosztuje i jest zdecydowanie lepsze niż brak certyfikatu w ogóle. Bez wysiłku zyskujesz szyfrowanie ruchu, znaczne przyśpieszenie strony, zaufanie użytkowników i lepsze SEO.

Nie zwlekaj, sprawdź czy Twój hosting pozwala na używanie Let's Encrypt i koniecznie spraw sobie certyfikat. To nigdy nie było prostsze :)
