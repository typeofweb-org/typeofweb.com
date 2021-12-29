---
title: Continuous Integration — Recenzja Buddy.works
date: 2019-11-04T13:55:01.000Z
isMarkdown: true
status: publish
permalink: continuous-integration-recenzja-buddy-works
authors:
  - michal-miszczyszyn
type: post
thumbnail:
  url: >-
    /public/assets/wp-content/uploads/2019/10/continuous-integration-recenzja-buddy-works.png
  width: 1688
  height: 780
categories:
  - slug: javascript
    name: JavaScript
  - slug: opinie
    name: Opinie
series:
  slug: buddy-works
  name: CI/CD z Buddy.works
seo:
  focusKeywords:
    - Buddy
    - Continuous Integration
  focusKeywordSynonyms:
    - Continuous Delivery
    - Buddy.works
  metadesc: >-
    Oto moja recenzja Buddy.works, czyli narzędzia do Continuous Integration i
    Continuous Delivery. Czym się różni od konkurencji i czemu mnie
    zainteresowało?
---

Przez ostatnie kilka lat pracy w branży poznałem wiele różnych narzędzi do _Continuous Integration_ (CI) i _Continuous Delivery_ (CD). Sądziłem, że już nic nie będzie w stanie mnie zaskoczyć i nic nie będzie łatwiejsze, bo niby co dałoby się tutaj uprościć? Otóż, myliłem się. Poznajcie <a href="https://buddy.works/?utm_source=blogpost&utm_medium=cpc&utm_campaign=typeofweb_11/19_review&utm_content=main" target="_blank" rel="noopener noreferrer">Buddy.works</a>!

---

Poniższy artykuł powstał we współpracy z Buddy.works.

<a href="https://buddy.works/?utm_source=blogpost&utm_medium=cpc&utm_campaign=typeofweb_11/19_review&utm_content=logo" target="_blank" rel="noopener noreferrer"><img src="/public/assets/wp-content/uploads/2019/10/logo-blue-300x133.png" alt="Logo Buddy.works" width="300" height="133" class="aligncenter size-medium wp-image-2245" /></a>

## Co to jest Buddy?

Buddy reklamuje się hasłem _Get The Fastest Deployments. Ever_ i, pomimo że te słowa nie padają ani razu na ich stronie, jest to narzędzie do Continuous Integration / Continuous Delivery. Co to dokładnie oznacza?

- automatyczne uruchamianie testów aplikacji po stworzeniu pull requesta
- automatyczne budowanie i _deploy_ na produkcję po commicie
- automatycznie tworzenie artefaktów wszelkiego typu
- automatyczne wysyłanie powiadomień, gdy coś pójdzie nie tak

Czyli ogół czynności, które automatyzują, przyśpieszają i ułatwiają wdrażanie nowych elementów aplikacji. Wiele razy powtórzyłem tutaj słowo „automatyczne”, ale właśnie ono jest sednem! W założeniu, sam koncept CI/CD ma sprawiać, że aplikacja jest aktualizowana „na produkcji” nawet **kilka razy dziennie**. W praktyce nie poznałem zbyt wielu firm, które robiłyby to aż tak często, niemniej jednak narzędzie tego typu jest absolutnie niezbędne w każdemu zespołowi wytwarzającemu oprogramowanie.

Osobiście nie wyobrażam już sobie pracy bez automatycznego uruchamiania testów przy tworzeniu każdego pull requesta, albo możliwości przepuszczenia dalej jakiegokolwiek kodu, który tych testów nie przeszedł. Bez narzędzia do CI/CD byłoby to praktycznie niemożliwe do osiągnięcia.

## Narzędzia do Continuous Integration i Continuous Delivery

Pewnie myślisz teraz „no okej, ale czy tego typu usługi już nie istnieją?” i jest to bardzo zasadne pytanie! Większość z nas kojarzy na pewno takie nazwy, jak Jenkins, Travis albo CircleCI, które z grubsza starają się oferować podobny zakres możliwości. W jaki sposób Buddy wyróżnia się na ich tle?

### Buddy jest szybki

Przede wszystkim, **Buddy jest szybki**. Nie, nie. To jest _naprawdę_ szybkie. Potraktuj to tylko poglądowo, ale na przykładzie jednego z moich projektów, uruchomienie tego samego zestawu operacji (Node.js: `npm install` + TypeScript + `npm test`) w CircleCI zajmowało 47 sekund. W Buddy jest to tylko 12. Dla mnie to było takie „wow”.

Cache nie wymaga żadnej dodatkowej konfiguracji i po prostu działa. Są całkiem sprytne domyślne ustawienia, które pewnie zaspokoją potrzeby większości osób, ale można też oczywiście sobie skonfigurować cache dokładniej pod swoje wymagania. Co ciekawe, pomiędzy krokami builda łatwo można przekazywać artefakty i jest to tak oczywiste, że nie musiałem zaglądać do dokumentacji, aby się o tym dowiedzieć — spróbowałem i po prostu działało!

### Buddy jest prosty

Zazwyczaj, ustawienia swojego procesu testowania/budowania aplikacji na potrzeby CI/CD zapisuje się w pliku konfiguracyjnym, np. w formacie .yml albo .json. Przygotowanie działającej idealnej konfiguracji dla prostego odpalenia testów zajęło mi kiedyś cały dzień i od tamtej pory kopiuję ten sam gotowy plik do nowych projektów. Jest to trochę ból. Jakiekolwiek zmiany są trudne do wprowadzenia i wymagają przypominania sobie odpowiednich poleceń i nazw z dokumentacji konkretnej usługi Continuous Integration / Continuous Delivery. To wiedza dla mnie bezużyteczna, bo nie lubię zapychać sobie głowy rzeczami, które działają tylko z narzędziem jednej firmy.

Buddy mocno się wyróżnia się tym tle. Otóż w Buddy.works możesz szybko i niezwykle łatwo **stworzyć konfigurację przy pomocy interfejsu graficznego**. W przeglądarce. Używając myszki. Uwierz mi na słowo, też miałem mnóstwo obiekcji i byłem bardzo negatywnie nastawiony, gdy to pierwszy raz zobaczyłem, ale ku mojemu ogromnemu zdziwieniu okazało się, że to **po prostu działa**. Taką konfigurację można oczywiście potem zapisać jako plik (np. aby komuś udostępnić), ale sam proces tworzenia jest po prostu przyjemny.

Dodatkowo, w moich projektach często uruchamiam testy e2e albo integracyjne korzystające z prawdziwej bazy danych. W Buddym postawienie bazy obok aplikacji jest tak proste, jak dwa kliknięcia. Wybieram zakładkę, wybieram bazę, gotowe. Było to bardzo miłe doświadczenie w porównaniu z ilością zachodu i czasu, który musiałem poświęcić dokładnie na to samo w narzędziu od Amazona.

### Buddy ma gotowe konfiguracje

Co istotne, Buddy zawiera w sobie całe mnóstwo **predefiniowanych akcji**, z których możesz skorzystać. Node? Gatsby? Ruby? .NET? Golang? Elixir? Cypress? Nie ma sprawy. Mamy na to predefiniowane ustawienia. Potrzebujesz zrobić _deploy_ po SSH albo na zwykły FTP? Gotowe. Automatyczne [generowanie aplikacji React na GitHub Pages](https://typeofweb.com/react-js-na-github-pages-dzieki-create-react-app/) po commicie? Jedno kliknięcie. Deploy na produkcję, jak w prawdziwym Continuous Delivery? Jasne. Chcesz wysłać maila albo SMSa po zakończeniu builda? To też jest. Powiadomienia na Slacku i Discordzie również. W najprostszym wypadku stworzenie całego procesu to tylko kilka kliknięć.

<figure id="attachment_2256" align="aligncenter" width="300">
  <a href="/public/assets/wp-content/uploads/2019/11/app.buddy_.works_mmiszy_typeofweb-discord-bot_pipelines_pipeline_220473_action_addiPad-Pro.png"><img src="/public/assets/wp-content/uploads/2019/11/Screenshot-2019-11-04-at-14.38.18-300x286.png" alt="Wybrane akcje Continuous Integration w Buddy.works" width="300" height="286" class="size-medium wp-image-2256" /></a>
  <figcaption>
    Lista akcji w Buddy.works jest dłuuuuga (kliknij aby zobaczyć pełną listę)
  </figcaption>
</figure>

Korzystając z gotowych ustawień udało mi się z łatwością skonfigurować automatyczny build, testy i deploy między innymi [DevFAQ.pl](https://app.devfaq.pl/). W innych narzędziach musiałbym w tym celu napisać własny skrypt w bashu, natomiast w Buddy wystarczyło wyklikać to z interfejsu.

### Dockery, kontenery…

Gdyby to wszystko było za mało, to Buddy pozwala na użycie całkowicie dowolnego kontenera dockerowego. Opisywane wcześniej akcje i tak opierają się o kontenery, a dodatkowo można pobrać, uruchomić i publikować zupełnie dowolne obrazy dockera. Oczywiście, technicznie jest to możliwe prawdopodobnie w każdej usłudze CI/CD, ale łatwość, z jaką można to zrobić w Buddy.works sprawia, że aż się chce ;)

Przykładowo, pracuję teraz nad małym ebookiem i stworzyłem sobie _workflow_ oparty o Dockera, który po każdym commicie ze zmianami w książce buduje mój obraz dockerowy, generuje PDF, epub i mobi oraz publikuje te pliki jako release na GitHubie. W konfiguracji tego procesu najbardziej skomplikowane paradoksalnie było publikowanie release'ów na GitHubie (ale pomoc techniczna Buddy twierdzi, że pracują nad dodaniem gotowej akcji do tego, więc nie trzeba będzie już walczyć z API GitHuba). Pozostałe kroki to pestka!

<a href="/public/assets/wp-content/uploads/2019/11/Screenshot-2019-11-05-at-15.59.52.png"><img src="/public/assets/wp-content/uploads/2019/11/Screenshot-2019-11-05-at-15.59.52-1024x706.png" alt="Przykładowy proces w Buddy. Automatyczna budowa PDF po wykonaniu push do repozytorium. Budowany jest obraz dockera, następnie tworzona nowa wersja, generowany PDF i wynik wrzucany jest na GitHuba jako nowy release." width="1024" height="706" class="aligncenter size-large wp-image-2260" /></a>

## Buddy jest darmowym Continuous Integration nie tylko dla Open Source

Buddy jest **całkowicie darmowe dla projektów Open Source** na zawsze. Ponadto, jest też **darmowy plan dla prywatnych repozytoriów**. Za darmo dostajesz 5 projektów i 500MB cache z limitem 120 uruchomień miesięcznie. To powinno wystarczyć dla raczkujących startupów i innych podobnych projektów, a przecież większość potrzebuje _Continuous Integration_ lub _Continuous Delivery_. Zarejestrować się można tutaj: <a href="https://app.buddy.works/sign-up?utm_source=blogpost&utm_medium=cpc&utm_campaign=typeofweb_11/19_review&utm_content=create_free_account" target="_blank" rel="noopener noreferrer">Buddy.works</a>

## Moja ocena

Podsumowując, skonfigurowałem w Buddy.work kilka projektów, przetestowałem, działa i robi to dobrze. W porównaniu do innych narzędzi do Continuous Integration, było to proste, szybkie i przyjemne. Nie sądziłem, że kiedykolwiek usługa do CI zrobi na mnie takie wrażenie. Hej, to jest <a href="https://buddy.works/?utm_source=blogpost&utm_medium=cpc&utm_campaign=typeofweb_11/19_review&utm_content=main" target="_blank" rel="noopener noreferrer">Buddy</a> i polecam!
