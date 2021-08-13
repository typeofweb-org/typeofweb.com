---
index: 115
title: Automatyczne uruchamianie testów w Buddy
date: 2019-12-03T13:29:17.000Z
isMarkdown: true
status: publish
permalink: automatyczne-uruchamianie-testow-w-buddy
authors:
  - michal-miszczyszyn
type: post
thumbnail:
  url: https://res.cloudinary.com/type-of-web/wp-content/uploads/2019/11/cover_facebook3-1.png
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
    - pull request
    - testów
  focusKeywordSynonyms:
    - testy
    - >-
      Pull requests, Pull requesta, Pull requestów, Pull requestami, pull
      requestami
---

Jednym z najbardziej potrzebnych elementów tworzenia niezawodnych aplikacji jest pisanie testów i ich **automatyczne uruchamianie po stworzeniu Pull Requesta**. W tym artykule pokazuję, jak łatwo skonfigurować w tym celu <a href="https://buddy.works/?utm_source=blogpost&utm_medium=cpc&utm_campaign=typeofweb_11/19_kurs1&utm_content=main" target="_blank" rel="noopener noreferrer">Buddy.works</a> tak, aby automatycznie uruchamiał testy jednostkowe i testy integracyjne.

{/_ more _/}

Poniższy artykuł powstał we współpracy z Buddy.works.

<a href="https://buddy.works/?utm_source=blogpost&utm_medium=cpc&utm_campaign=typeofweb_11/19_kurs1&utm_content=logo" target="_blank" rel="noopener noreferrer"><img src="https://res.cloudinary.com/type-of-web/wp-content/uploads/2019/10/logo-blue-300x133.png" alt="Logo Buddy.works" width="300" height="133" class="aligncenter size-medium wp-image-2245" /></a>

## Testy jednostkowe, testy integracyjne

Jako przykładowy projekt wezmę moją paczkę `@mmiszy/react-with-observable`, która pozwala na używanie observabli w React w przyjazny i deklaratywny sposób. Zawiera ona zarówno [testy jednostkowe](https://github.com/mmiszy/react-with-observable/blob/b424212b9e9bf03ddd36cf89571b6c6f12f96d1d/src/index.spec.tsx), jak i [testy integracyjne](https://github.com/mmiszy/react-with-observable/blob/b424212b9e9bf03ddd36cf89571b6c6f12f96d1d/cypress/integration/examples/ts.spec.ts) napisane przy użyciu biblioteki Cypress. Zacznijmy od testów jednostkowych.

## Buddy.works i testy jednostkowe w React.js

Podobnie, jak w [poprzednim wpisie](https://typeofweb.com/continuous-integration-na-github-pages-w-buddy-works/) zaczynam od stworzenia projektu w <a href="https://buddy.works/?utm_source=blogpost&utm_medium=cpc&utm_campaign=typeofweb_11/19_kurs1&utm_content=main" target="_blank" rel="noopener noreferrer">Buddy</a>. Zanim dodam nowy pipeline, koniecznie klikam opcję po prawej stronie ekranu „Pull requests: OFF” i przełączam ją na "ON".

Dodaję pipeline, nazywam go dowolnie np. „Test PRs”. Wybieram „Trigger Mode: On Push” i „Pull requests by wildcard” i pole obok zostawiam z domyślną wartością `refs/pull/*`, która oznacza, że ten pipeline uruchomi się dla wszystkich tworzonych pull requestów.

Dodaję pierwszą akcję typu Node.js i wszystkie pozostałe opcje zostawiam domyślne. Uruchomione zostaną polecenia `npm install` i `npm test`. Jeśli w repozytorium otwarty jest dowolny pull request, od razu możemy przetestować stworzony pipeline. Po zapisaniu, przy każdym nowym Pull Requeście testy zostaną automatycznie uruchomione. Na GitHubie jest to widoczne w taki sposób, jak na screenshocie poniżej:

## Wymuszanie testów na GitHubie

GitHub daje też możliwość wymuszenia tego, aby testy jednostkowe i testy integracyjne przeszły, zanim będzie można zaakceptować pull requesta. Na GitHubie wchodzimy w Settings -> Branches -> Add Rule. Wpisujemy `master`, zaznaczamy „Require status checks to pass before merging” i następnie „buddy/pipeline/Test PRs”. Zapisujemy. Od teraz niemożliwe będzie kliknięcie "merge" pod PR-em, który nie przeszedł testów.

<a href="https://res.cloudinary.com/type-of-web/wp-content/uploads/2019/11/github.com_mmiszy_react-with-observable_settings_branch_protection_rules_1993862-scaled.png"><img src="https://res.cloudinary.com/type-of-web/wp-content/uploads/2019/11/github.com_mmiszy_react-with-observable_settings_branch_protection_rules_1993862-1024x632.png" alt="Konfiguracja branch protection na GitHubie" width="1024" height="632" class="aligncenter size-large wp-image-2319" /></a>

## Cypress na Buddy.works

W moim projekcie napisane są też testy integracyjne przy użyciu biblioteki Cypress. <a href="https://buddy.works/?utm_source=blogpost&utm_medium=cpc&utm_campaign=typeofweb_11/19_kurs1&utm_content=main" target="_blank" rel="noopener noreferrer">Buddy</a> również daje możliwość uruchomienia Cypressa i ma do tego gotową akcję! Dodajemy akcję Cypress i, w przypadku mojego projektu, używam komendy `npm run test:e2e` (którą można [podejrzeć tutaj](https://github.com/mmiszy/react-with-observable/blob/d941bf6f5f9801cbf980ee3f7b9ebb642dc45562/package.json#L25)). Zrobiłem to przy pomocy jednego pipeline'a, ale nic nie stoi na przeszkodzie, abyście Wy rozbili to na dwa osobne!

## Podsumowanie

W tym wpisie pokazałem, jak łatwo i szybko można skonfigurować automatyczne uruchamianie testów jednostkowych i testów integracyjnych pod pull requestami na GitHubie dzięki <a href="https://buddy.works/?utm_source=blogpost&utm_medium=cpc&utm_campaign=typeofweb_11/19_kurs1&utm_content=main" target="_blank" rel="noopener noreferrer">Buddy.works</a>. Dzięki temu mamy większą pewność, że kod, z którym pracujemy rzeczywiście działa. Automatyczne uruchamianie testów, gdy powstanie nowy pull request, jest na pewno nieodzownym elementem każdego Continuous Integration.
