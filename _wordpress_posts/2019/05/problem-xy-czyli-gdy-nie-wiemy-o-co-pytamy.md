---
index: 109
title: Problem XY, czyli gdy nie wiemy, o co pytamy
date: 2019-05-31T13:54:13.000Z
isMarkdown: true
status: publish
permalink: problem-xy-czyli-gdy-nie-wiemy-o-co-pytamy
authors:
  - michal-miszczyszyn
type: post
thumbnail:
  url: >-
    https://typeofweb.com/wp-content/uploads/2019/05/Screenshot-2019-05-31-at-3.51.58-PM.png
  width: 2742
  height: 1266
categories:
  - slug: opinie
    name: Opinie
seo:
  focusKeywords:
    - Pytania
    - Problem XY
  focusKeywordSynonyms:
    - pytać, pytamy, pyta
  metadesc: >-
    Problem XY występuje wtedy, gdy pytamy o rozwiązanie, a nie o sam problem. Z
    czego to wynika? Jak zadawać pytania? Jak pozbyć się problemu XY?
---

Na pewno każda i każdy z Was napotkał kiedyś w swoim życiu Problem XY, być może nawet o tym nie wiedząc. Część z was pewnie go „popełnia”. **Problem XY występuje wtedy, gdy pytamy o rozwiązanie problemu, zamiast o sam problem**. Dlaczego to źle? Jak zadawać pytania?

{/_ more _/}

## Problem XY: Scenka

Od lat pomagam wielu ludziom na różnych forach, czatach i innych kanałach i niemal codziennie napotykam Problem XY. Jak to zazwyczaj wygląda?

Q: Jak mogę użyć Y do zrobienia X?
A1: (tutaj pada z reguły 10 różnych sugestii, co raz bardziej skomplikowanych)
Q: Niestety nie działa (tutaj kolejne problemy)
A2: A dlaczego chcesz użyć Y? Łatwiej byłoby osiągnąć X w ten i ten sposób.
Q: Dzięki! Działa.

## Problem XY: Mechanizm

- Użytkownik chce rozwiązać problem X.
- Użytkownik nie wie, jak rozwiązać X, ale myśli, że uda mu się to, jeśli tylko rozwiąże Y.
- Użytkownik nie wie, jak rozwiązać Y.
- Użytkownik pyta o Y.
- Inni próbują mu pomóc, ale zdziwienie budzi takie pytanie o Y.
- Po wielu rozmowach i zmarnowanym czasie, w końcu staje się jasne, że Użytkownikowi chodzi o rozwiązanie problemu X, a Y okazuje się nie mieć żadnego związku, albo być całkowicie nieodpowiednie.

## Problem XY: Przykłady

### Przykład pierwszy

Użytkownik chce pobrać [rozszerzenie pliku na podstawie jego nazwy][2]. Niestety, zamiast zapytać wprost, zaczyna od rozwiązania innego problemu, którego wcale nie ma:

Q: W jaki sposób mogę pobrać 3 ostatnie znaki z nazwy pliku?
A1: `filename.slice(-3);`
Q: Dzięki! Ale to niestety nie działa dla plików jpeg 😢
A2: Chcesz pobrać rozszerzenie pliku?
Q: Tak.
A2: `filename.split('.').pop()`

### Przykład drugi

Użytkownik parsuje CSV na JSON używając konkretnej biblioteki. Jednak wynikowy format danych mu nie odpowiada — jest to tablica wierszy, zamiast tablicy obiektów. Niestety, zamiast zapytać o parsowanie CSV i o tę konkretną bibliotekę, Użytkownik myśli, że lepiej będzie zamienić tablicę tablic na tablicę obiektów i pyta tylko o to. Znów, tak naprawdę zadaje pytanie o problem, którego wcale nie ma:

Q: Mam kilka tablic i chcę zamienić każdą z nich na obiekt, którego klucze pochodzą z pierwszej tablicy. np. `[['a', 'b'], [1,2], [3,4]]` na `[{a: 1, b: 2}, {a: 3, b: 4}]`
A1: To będzie nieco skomplikowane. Spróbuj użyć biblioteki `lodash`, tam jest funkcja do czegoś takiego.
A2: Zastanawiam się, czy nie dałoby się tego jakoś rozwiązać przez użycie `Object.fromEntries(…)`
A3: Możesz napisać prostą pętlę, która to zrobi za Ciebie, spróbuj tak: _(tutaj przykład kodu)_
Q: Dzięki, ale to mega skomplikowane, myślałem, że parsowanie csv do jsona to raczej standardowa rzecz, a tu co chwila napotykam jakiś problem…
A4: Czekaj, parsujesz csv do JSON? Jakiej biblioteki używasz?
Q: PapaParser
A4: Ona ma opcję `headers: true`, dzięki której zamiast tablicy tablic otrzymasz dokładnie takie obiekty, jak chciałeś. Nie musisz niczego robić ręcznie.

## Skąd się to bierze?

Jest kilka źródeł występowania Problemu XY. Pierwszy to zaangażowanie pytającego. **Pytający poświęcił tak dużo czasu, na rozwiązanie problemu Y, że nie chce robić kroku wstecz** i spojrzeć na problem X z szerszej perspektywy. Bardzo często będzie bronił się słowami **„Mam już cały system, brakuje mi tylko tego jednego malutkiego fragmentu”**, jednak, jak widać choćby z przykładu wyżej z csv, bardzo często ten „cały system” został zbudowany zupełnie bez powodu.

Inną przyczyną bywa [**chęć zrobienia rzeczy dobrze**][4]. Tak, nie żartuję. Często mamy wyidealizowane wyobrażenia na temat rozwiązania problemu i przeszkadza nam to w dostrzeżeniu prostszych alternatyw.

Ponadto, czasem osoby zadające pytania mają **wyrzuty sumienia**. Nie chcą pytać o coś tak ogólnego jak X, więc wybierają rozwiązanie Y i pytają o nie. Instynktownie **wydaje im się, że w ten sposób nie marnują tak bardzo czasu osób, które będą im pomagać**. Przychodzą z _konkretnym_ problemem i chcą _konkretnego_ rozwiązania, a nie analizy — z grzeczności, albo poczucia winy.

Oczywiście, Problem XY nie dotyczy wyłącznie świata IT. Dotyczy każdego, zawodowo i prywatnie, a najbardziej dotkliwy jest prawdopodobnie dla lekarzy i terapeutów. Jak wiele osób przychodzi do lekarza z gotową diagnozą i pyta tylko o nią, zamiast opisać prawdziwy problem? Przykłady dobrze zadanych pytań znajdziesz choćby w dziale [pytania i odpowiedzi React](https://typeofweb.com/odpowiadam-na-pytania-props-nawiasy-klamrowe-funkcje-vs-klasy-import-react/).

## Problem narcyzmu i empatii odpowiadających

[Niektórzy argumentują][3], że wszystko to, co opisałem, to nie jest sedno problemu XY. Niektórzy twierdzą, że Problem XY to problem osoby odpowiadającej na pytanie, a nie pytającego. Nie zgadzam się z tym całkowicie, ale myślę, że ważne jest, aby o tym wspomnieć. Problem XY może być pożywką dla braku empatii i narcyzmu odpowiadających.

Wyobraź sobie, że zadajesz pytanie o problem, który wydaje Ci się istotny. Kilka osób stara Ci się pomóc, ale nagle pojawia się ktoś, kto mówi **„wcale nie masz problemu Y, tak naprawdę chciałaś/eś zapytać o X”. Jak się wtedy czujesz?** To właśnie brak empatii odpowiadającego sprawił, że prawdopodobnie uruchamiają Ci się mechanizmy obronne. Chcesz powiedzieć „wiem lepiej, czego chcę”. Może to prawda, a może nie, ale nie ulega wątpliwości, że dalsza rozmowa będzie odbywała się w atmosferze poczucia winy („jestem głupi, on ma rację”) albo defensywy („odpowiadający jest głupi, przecież napisałem, że nie o to mi chodzi”).

Drugi przykład to sytuacja, w której osoba odpowiadająca uważa się za autorytet i tak naprawdę ignoruje to, czego chce pytający, a zamiast tego na siłę sugeruje swoje wyidealizowane rozwiązania. Przykładem ze świata programowania jest np. gdy pytasz o pętlę, a ktoś mówi, że masz Problem XY i tak naprawdę powinieneś/powinnaś pisać kod funkcyjny. To nie jest Problem XY, który opisałem w pierwszej części artykułu — **to narcyzm odpowiadającego**.

Gdy chcesz komuś pomóc i uznasz, że pytający nie wie, czego chce, albo popełnia błąd, możesz sugerować inne rozwiązania. To dobrze. **Problem w tym, że czasem to pytający ma rację** i nie możesz o tym zapomnieć.

Artykuł [Two Attitudes in Psychiatry][1] opisuje tę dychotomię szerzej.

## Jak zadawać pytania?

Eric S. Raymond w swojej publikacji [How To Ask Questions The Smart Way][5] odnośnie problemu XY napisał mniej-więcej tak:

Q: Jak mogę użyć X do zrobienia Y?
A: Jeśli to, czego naprawdę chcesz, to Y, to powinieneś zadać to pytanie bez założenia z góry rozwiązania, które może nie być odpowiednie. (…)

Moja rada? **Rozszerz swoje pytanie o szerszy kontekst.**:

Zamiast „W jaki sposób mogę pobrać 3 ostatnie znaki z nazwy pliku?” zapytaj „W jaki sposób mogę pobrać 3 ostatnie znaki z nazwy pliku? Potrzebuję rozszerzenia pliku.”

Zamiast „Mam kilka tablic i chcę zamienić każdą z nich na obiekt, którego klucze pochodzą z pierwszej tablicy.” napisz „Mam kilka tablic i chcę zamienić każdą z nich na obiekt, którego klucze pochodzą z pierwszej tablicy. Te tablice pochodzą z parsowania CSV biblioteką PapaParse.”

Tak niewiele potrzeba, aby ułatwić pracę sobie i innym. W wielu przypadkach może się okazać, że X da się rozwiązać lepiej, szybciej i łatwiej.

[1]: https://slatestarcodex.com/2016/02/24/two-attitudes-in-psychiatry/
[2]: https://mywiki.wooledge.org/XyProblem
[3]: https://artyom.me/yx
[4]: https://www.perlmonks.org/?node_id=542341
[5]: http://www.catb.org/~esr/faqs/smart-questions.html
