---
id: 2278
index: 118
title: Continuous Integration na GitHub Pages w Buddy.works
date: 2019-11-18T15:51:56.000Z
isMarkdown: true
status: publish
permalink: continuous-integration-na-github-pages-w-buddy-works
authors:
  - michal-miszczyszyn
guid: https://typeofweb.com/?p=2278
type: post
thumbnail:
  url: https://typeofweb.com/wp-content/uploads/2019/11/cover_facebook3.png
  width: 1688
  height: 780
categories:
  - slug: javascript
    name: JavaScript
  - slug: front-end
    name: Front-end
series:
  slug: buddy-works
  name: CI/CD z Buddy.works
seo:
  focusKeywords:
    - GitHub Pages
---

Ustawienie narzędzi do Continuous Integration i Continuous Delivery nierzadko odstrasza nawet zaawansowane osoby. Nie dziwię się! Pisanie plików konfiguracyjnych w YML do najprzyjemniejszych nie należy. W tym wpisie pokazuję ciekawą alternatywę: jak łatwo wyklikać Continuous Integration w <a href="https://buddy.works/?utm_source=blogpost&utm_medium=cpc&utm_campaign=typeofweb_11/19_tutorial&utm_content=main" target="_blank" rel="noopener noreferrer">Buddy.works</a> na przykładzie aplikacji React.js i GitHub Pages!

<!--more-->

Poniższy artykuł powstał we współpracy z Buddy.works.

<a href="https://buddy.works/?utm_source=blogpost&utm_medium=cpc&utm_campaign=typeofweb_11/19_tutorial&utm_content=logo" target="_blank" rel="noopener noreferrer"><img src="https://typeofweb.com/wp-content/uploads/2019/10/logo-blue-300x133.png" alt="Logo Buddy.works" width="300" height="133" class="aligncenter size-medium wp-image-2245" /></a>

## Continuous Integration i GitHub Pages

Pod [wpisem dotyczącym wrzucania React.js na GitHub Pages](https://typeofweb.com/react-js-na-github-pages-dzieki-create-react-app/) w sekcji komentarzy pojawiło się spore zainteresowanie tym tematem. Wiele osób pytało mnie też na [Discordzie](https://discord.typeofweb.com/) o automatyzację wrzucania zmian na GitHub Pages. **Jak automatycznie aktualizować stronę na GitHub Pages, gdy wprowadzamy zmiany w kodzie?** Musimy skonfigurować usługę Continuous Delivery i podłączyć ją z GitHubem! Użyjemy <a href="https://buddy.works/?utm_source=blogpost&utm_medium=cpc&utm_campaign=typeofweb_11/19_tutorial&utm_content=main" target="_blank" rel="noopener noreferrer">Buddy.works</a>.

## Buddy

Jak pisałem w poprzednim artykule, [Buddy to narzędzie do CI/CD](https://typeofweb.com/continuous-integration-recenzja-buddy-works/), które wyróżnia się tym, że jest niezwykle łatwe w użyciu, a do tego mega szybkie! Praktycznie cały, nawet najbardziej skomplikowany proces można stworzyć bez ręcznego edytowania plików konfiguracyjnych.

## CI, GitHub Pages, Buddy

Potrzebne nam będą:

1. Konto na GitHubie i repozytorium z kodem. Zmiany w kodzie będą automatycznie wrzucane także na GitHub Pages. Ja użyję przykładowego repo [github.com/mmiszy/typeofweb-buddy](https://github.com/mmiszy/typeofweb-buddy)
2. Konto na <a href="https://app.buddy.works/sign-up?utm_source=blogpost&utm_medium=cpc&utm_campaign=typeofweb_11/19_tutorial&utm_content=create_free_account" target="_blank" rel="noopener noreferrer">Buddy.works</a> (można zarejestrować się swoim kontem na GitHubie).

Na potrzeby 1. użyję aplikacji w React.js. Przed wrzuceniem jej na GitHub Pages będę musiał ją skompilować i zminifikować.

## Projekt w Buddy

Po zalogowaniu się do Buddy, wita mnie ekran dający możliwość stworzenia nowego projektu i tak też czynię. Buddy udostępnia integrację z wieloma dostawcami repozytoriów gita: GitHub, Bitbucket, GitLab, własny hosting Buddy oraz prywatny serwera gita. Wybieram opcję GitHub i wyszukuję swoje repozytorium.

<p class=important>Stworzenie aplikacji w React.js i przygotowanie jej do wrzucenia na GitHub pages opisywałem w <a href="https://typeofweb.com/react-js-na-github-pages-dzieki-create-react-app/">kursie React.js</a>.</p>

[gallery link="file" ids="2283,2282,2281"]

Buddy od razu wykrył, że w repozytorium znajduje się aplikacja Reactowa i zasugerował konfigurację. Klikam "Add new Pipeline", jako nazwę podaję "Deploy to GitHub Pages", wybieram "On Push" i resztę opcji zostawiam domyślnie (Single branch, master). Tworzy się tak zwany "pipeline", czyli to, co zostanie wykonane automatycznie po wprowadzeniu każdej zmiany w repozytorium.

Ja chciałbym wykonać 3 kroki:

1. `yarn` lub `npm install`
2. `yarn build` lub `npm run build`
3. `gh-pages -d build`

Dla ułatwienia dodaję je jako skrypty npm (zobacz wcześniej linkowany artykuł):

```json
{
  "scripts": {
      "predeploy": "npm run build",
      "deploy": "gh-pages -d build",
      …
  }
}
```

Następnie w buddym tworzę akcję i używam powyższych skryptów:

```bash
yarn
yarn deploy --user='Michal Miszczyszyn <michal@mmiszy.pl>' --repo=https://$GITHUB_TOKEN@github.com/$BUDDY_REPO_SLUG.git
```

<a href="https://typeofweb.com/wp-content/uploads/2019/11/app.buddy_.works_configure_action.png"><img src="https://typeofweb.com/wp-content/uploads/2019/11/app.buddy_.works_configure_action-1024x704.png" alt="Dodawanie akcji w Buddy" width="1024" height="704" class="aligncenter size-large wp-image-2285" /></a>

## Prawa do zapisu do GitHub Pages na CI

Ostatnia linijka jest szczególnie warta uwagi. Ustawiam tutaj nazwę i email potrzebne do commita w gicie, a następnie podaję adres repozytorium. Buddy nie ma prawa pushować niczego do mojego repo (nikt oprócz mnie nie ma), a ja zdecydowanie nie chcę podawać mu swojego hasła. Aby więc umożliwić deploy, musimy podać adres repozytorium poprzedzony `$GITHUB_TOKEN@`, a także zdefiniować **zmienną środowiskową** zawierającą token.

Skąd wziąć token? Można go wygenerować na [https://github.com/settings/tokens](github.com/settings/tokens). Ważne, aby nadać mu uprawnienia `repo`, które są niezbędne, aby móc zaktualizować stronę na GitHub Pages. Po zapisaniu, token widoczny będzie tylko jeden jedyny raz. Skopiuj go gdzieś na chwilę i **nikomu nie udostępniaj**!

## Zmienne środowiskowe w Buddy

Wracamy do Buddy, nadal edytujemy pipeline. W zakładce "variables" klikamy "Add new variable" i jako nazwę (Key) wpisujemy `GITHUB_TOKEN`, a jako wartość (Value) wygenerowany przed chwilą token. Możemy też wybrać Scope (czyli, czy ta zmienna ma być widoczna wszędzie, tylko w tym projekcie, czy tylko w tym pipelinie). Co istotne, **w polu Encryption wybieramy "enabled"**, czyli włączamy szyfrowanie.

<p class=important>Szyfrowanie należy włączyć dla każdej zmiennej, która zawiera tajne informacje. Token jest tajny.</p>

Buddy ma także wiele predefiniowanych zmiennych. Jeśli wrócimy na chwilę do edycji akcji i wpiszemy tam `$`, to powinniśmy zobaczyć listę wszystkich dostępnych zmiennych.

<a href="https://typeofweb.com/wp-content/uploads/2019/11/app.buddy_.works_env_variables.png"><img src="https://typeofweb.com/wp-content/uploads/2019/11/app.buddy_.works_env_variables-300x190.png" alt="Zmienne środowiskowe dostępne w akcjach. Lista zawiera także zmienną dodaną przez nas." width="300" height="190" class="aligncenter size-medium wp-image-2286" /></a>

## Testowanie CI

Fajnie by było sprawdzić, czy nasze Continuous Integration działa bez konieczności wprowadzania bezsensownych zmian w gicie tylko do testów. Buddy umożliwia to w bardzo prosty sposób: Klikamy "Run pipeline" i "Run now". Po krótkiej chwili powinniśmy zobaczyć na ekranie zielony komunikat **"Build finished successfully!"**. Co istotne, **każde kolejne uruchomienie tego samego pipeline'a będzie szybsze**, niż pierwsze!

## Efekty

Jeśli prawidłowo skonfigurowaliśmy repozytorium, to po wejściu na adres naszego GitHub Page powinniśmy zobaczyć już naszą stronę. Moją stroną możecie podejrzeć pod adresem [mmiszy.github.io/typeofweb-buddy](https://mmiszy.github.io/typeofweb-buddy/) i wygląda ona tak, <a href="https://typeofweb.com/wp-content/uploads/2019/11/mmiszy.github.io_example.png" data-featherlight="image">jak na screenshocie</a>.

Sprawdźmy, czy strona się zaktualizuje automatycznie po wykonaniu `git push`. Od razu po wysłaniu zmian do repo w Buddy uruchamia się skonfigurowany przez nas pipeline i po **16 sekundach** zmiany są już na GitHub Pages. Przy takiej prędkości, to naprawdę _Continuous Delivery_!

[gallery link="file" ids="2292,2291,2290,2289,2288"]

## Podsumowanie

To była intensywna lekcja. Pokazałem, jak skonfigurować prosty pipeline w <a href="https://buddy.works/?utm_source=blogpost&utm_medium=cpc&utm_campaign=typeofweb_11/19_tutorial&utm_content=main" target="_blank" rel="noopener noreferrer">Buddy.works</a> i podpiąć go tak, aby **uruchamiał się przy każdej zmianie w repozytorium na GitHubie**. Co więcej, ustawiliśmy wszystko w taki sposób, aby Buddy miał **prawa do commitowania do naszego repozytorium przy użyciu bezpiecznego tokena** i dzięki temu mógł aktualizować **stronę na GitHub Pages**!

Myślę, że opisane przeze mnie możliwości, czyli **Continuous Delivery na GitHub Pages** dzięki Buddy przydadzą się każdemu, choćby do budowania swojego portfolio, bloga, czy aplikacji klientów. Konfiguracja całego procesu zajmuje tylko kilka chwil, a zyskujemy oszczędność czasu i wygodę.
