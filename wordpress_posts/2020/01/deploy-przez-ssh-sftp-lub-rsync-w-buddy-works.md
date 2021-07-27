---
id: 2343
index: 121
title: Deploy przez SSH, SFTP lub rsync w Buddy.works
date: 2020-01-09T09:31:28.000Z
isMarkdown: true
status: publish
permalink: deploy-przez-ssh-sftp-lub-rsync-w-buddy-works
authors:
  - michal-miszczyszyn
guid: https://typeofweb.com/?p=2343
type: post
thumbnail:
  url: >-
    https://typeofweb.com/wp-content/uploads/2020/01/ssh_rsync_sftp_buddy_mydevil.png
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
    - sftp
    - GitHub
    - ssh
  focusKeywordSynonyms:
    - GitHuba, GitHubie, GitHubem
---

Po poprzednich wpisach wiele osób pytało mnie, w jaki sposób automatycznie wrzucać ich aplikacje z repozytorium GitHub na hosting używając SSH (SFTP) w <a href="https://buddy.works/?utm_source=blogpost&utm_medium=cpc&utm_campaign=typeofweb_11/19_kurs2&utm_content=main" target="_blank" rel="noopener noreferrer">Buddy.works</a>. Czy w ogóle jest to możliwe? Oczywiście! A Buddy znacznie to ułatwia dzięki predefiniowanej akcji.

<!--more-->

Poniższy artykuł powstał we współpracy z Buddy.works.

<a href="https://buddy.works/?utm_source=blogpost&utm_medium=cpc&utm_campaign=typeofweb_11/19_kurs2&utm_content=logo" target="_blank" rel="noopener noreferrer"><img src="https://typeofweb.com/wp-content/uploads/2019/10/logo-blue-300x133.png" alt="Logo Buddy.works" width="300" height="133" class="aligncenter size-medium wp-image-2245" /></a>

## Deploy przez SSH

SSH to "Secure Shell" i służy do zdalnego łączenia się z komputerami, a w naszym konkretnym przypadku z serwerem. Można go używać do uruchamiania poleceń na serwerze, a także do pobierania i wrzucania plików. Do tego ostatniego służą różne narzędzia: **SFTP, SCP**, rsync i inne. Wiele hostingów umożliwia łączenie się z nimi przez SSH, a jednym z popularniejszych polskich dostawców jest znakomity [hosting MyDevil](http://www.mydevil.net/pp/9UVOSJRZIV).

Przykładowo, aby wysłać plik `index.html` na serwer MyDevil używając scp, możemy użyć polecenia:

```bash
scp index.html login@sXX.mydevil.net:/domains/domena.com/public_html/
```

Podobnie wygląda praca z `rsync` i `sftp`.

## SFTP i rsync w Buddy

Co istotne, <a href="https://buddy.works/?utm_source=blogpost&utm_medium=cpc&utm_campaign=typeofweb_11/19_kurs2&utm_content=main" target="_blank" rel="noopener noreferrer">Buddy</a> udostępnia predefiniowane akcje dla SSH, rsync i SFTP. Ciekawą możliwością jest też automatyczny transfer plików z repozytorium na GitHubie bezpośrednio na serwer w opcjach SFTP:

[gallery columns="2" link="file" size="medium" ids="2344,2345"]

Postanowiłem więc skonfigurować w <a href="https://buddy.works/?utm_source=blogpost&utm_medium=cpc&utm_campaign=typeofweb_11/19_kurs2&utm_content=main" target="_blank" rel="noopener noreferrer">Buddy.works</a> automatyczny deploy mojego bota na Discordzie na serwer w MyDevil używając **SFTP i GitHuba**. Do dzieła!

## Deploy przez SFTP w Buddy.works

Dodaję nowy pipeline w wybranym repozytorium. Konfiguruję go tak, aby uruchamiał się automatycznie po każdym pushu do brancha `master`, podobnie, jak to opisywałem w [poprzednim wpisie](https://typeofweb.com/automatyczne-uruchamianie-testow-w-buddy/).

<a href="https://typeofweb.com/wp-content/uploads/2020/01/Screenshot-2020-01-03-at-15.19.54.png"><img src="https://typeofweb.com/wp-content/uploads/2020/01/Screenshot-2020-01-03-at-15.19.54-1024x658.png" alt="Nowy pipeline" width="1024" height="658" class="aligncenter size-large wp-image-2346" /></a>

Dodaję akcję SFTP i w ustawieniach zaznaczam "GitHub repository", ścieżkę pozostawiam bez zmian, a następnie uzupełniam dane dostępowe do serwera. Do wyboru jest **kilka metod uwierzytelniania**. Można podać tam login i hasło, ale ja osobiście zalecałbym udostępniać swoje hasła jak najmniejszemu gronu odbiorców (a najlepiej nikomu). Pozostałe opcje opierają się o klucze SSH i moim zdaniem są bezpieczniejsze. Ja wybieram "Buddy's SSH key", czyli klucz Buddy, który będę musiał dodać do swojego serwera. Po wybraniu tej opcji, wyświetlą się polecenia, które należy wykonać na serwerze: dodanie klucza do pliku `~/.ssh/authorized_keys`. Ostatnim krokiem jest podanie dokąd mają zostać wrzucone pliki. W moim przypadku jest to `/home/login/domains/domena.com/public_nodejs`

<a href="https://typeofweb.com/wp-content/uploads/2020/01/app.buddy_.works_mmiszy-1.png"><img src="https://typeofweb.com/wp-content/uploads/2020/01/app.buddy_.works_mmiszy-1-1024x600.png" alt="Konfiguracja SFTP z GitHuba" width="1024" height="600" class="aligncenter size-large wp-image-2347" /></a>

## Buddy sugeruje brakującą akcję SSH

Po powrocie do widoku akcji zauważyłem, że Buddy podpowiada mi, aby dodał jeszcze jakieś komendy uruchamianie przez SSH.

<a href="https://typeofweb.com/wp-content/uploads/2020/01/Screenshot-2020-01-03-at-16.09.33.png"><img src="https://typeofweb.com/wp-content/uploads/2020/01/Screenshot-2020-01-03-at-16.09.33-1024x314.png" alt="Buddy sugeruje brakujący element, czyli polecenia SSH" width="1024" height="314" class="aligncenter size-large wp-image-2348" /></a>

Racja! Kompletnie zapomniałem uruchomić `npm install` i zrestartować aplikację :)

```bash
cd /home/login/domains/domena.com/public_nodejs
npm i
NODE_ENV=production ENV=production npm run build
devil www restart domena.com
```

Te polecenia są konkretnie pod MyDevil, ale pewnie na swoim hostingu będziesz musiał/a zrobić coś podobnego :)

I… to już! Szybko testuję stworzony pipeline i widzę, że wszystko działa. Konfiguracja tego nie zajęła mi nawet 5 minut.

## Podsumowanie

Od teraz po każdym pushu do brancha `master`, <a href="https://buddy.works/?utm_source=blogpost&utm_medium=cpc&utm_campaign=typeofweb_11/19_kurs2&utm_content=main" target="_blank" rel="noopener noreferrer">Buddy</a> automatycznie uruchomi zdefiniowane akcje: Aplikacja zostanie **wrzucona serwer przez SFTP**, zainstalują się zależności i uruchomi się ponownie. Czyż to nie było łatwe?
