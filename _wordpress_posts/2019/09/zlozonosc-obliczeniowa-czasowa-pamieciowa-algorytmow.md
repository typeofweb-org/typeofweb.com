---
title: "Złożoność\_obliczeniowa, czasowa i pamięciowa algorytmów"
date: 2019-09-16T16:45:25.000Z
isMarkdown: true
status: publish
permalink: zlozonosc-obliczeniowa-czasowa-pamieciowa-algorytmow
authors:
  - michal-miszczyszyn
type: post
thumbnail:
  url: >-
    /assets/wp-content/uploads/2019/08/zlozonosc_obliczeniowa_algorytmow.png
  width: 1688
  height: 780
categories:
  - slug: dobry-kod
    name: Dobry Kod
series:
  slug: piece-of-cake
  name: Piece of cake
seo:
  focusKeywords:
    - złożoność pamięciowa
    - algorytm
    - złożoność obliczeniowa
  focusKeywordSynonyms:
    - złożoność obliczeniową, złożonością obliczeniową, złożoności obliczeniowej
    - złożoność pamięciową, złożonością pamięciową, złożoności pamięciowej
    - >-
      algorytmy, algorytmu, algorytmów, algorytmiczny, algorytmiczna,
      algorytmicznych
  metadesc: "Złożoność\_obliczeniowa i złożoność pamięciowa algorytmów to niezwykle ważne pojęcia! Naucz się z je rozumieć, aby łatwiej przejść rozmowy rekrutacyjne."
---

Często w algorytmicznych zadaniach rekrutacyjnych można natrafić na wymagania dotyczące pojęć takich, jak **złożoność obliczeniowa lub złożoność pamięciowa algorytmów**. Są to też pojęcia, które warto znać, aby bardziej świadomie podejmować codzienne decyzje dotyczące kodu. Ale co to oznacza? W tym wpisie wyjaśniam, o co chodzi z notacją „duże O” `O(n)`. Od prostego wytłumaczenia dla laików, po formalny opis. Zaczynajmy!

---

## Przykład zadania ze złożonością obliczeniową

Na pytanie o złożoność obliczeniową i złożoność pamięciową algorytmów można natrafić na portalach typu Codility. Zadają je też czasem na rozmowach rekrutacyjnych. „Proszę opisać, jaką złożoność obliczeniową ma Twój kod”, albo „Wykorzystany algorytm powinien mieć złożoność obliczeniową &Omicron;(n) i złożoność pamięciową &Omicron;(1)”. Co to znaczy?!

Warto też znać tę notację oraz pojęcia z nią związane, aby wyrobić sobie pewien rodzaj instynktu. „Jeśli nie cierpi na tym czytelność, to którą strukturę danych wybrać?” albo „Jeśli nie cierpi na tym czytelność, to jaki algorytm zastosować?” — to pytania, które praktycznie każdy señor developer zdaje sobie codziennie. Rozumienie podstaw analizy algorytmów jest wskazane!

## Notacja „duże &Omicron;” po prostu

&Omicron;(…) mówi o tempie wzrostu. Może opisywać zależność pomiędzy czasem wykonywania kodu, a wielkością danych.

Przykładowo, stwierdzenie, że kod ma złożoność obliczeniową &Omicron;(n) mówi, że **czas wykonywania tego kodu będzie proporcjonalny do wielkości danych, lub szybszy**.

Weźmy jakąś funkcję `fn` i jej czas wykonania dla kolejnych argumentów:

| fn    | sekundy |
| ----- | ------- |
| fn(1) | 1       |
| fn(2) | 2       |
| fn(3) | 3       |
| fn(4) | 4       |

Gołym okiem widać tutaj pewną zależność pomiędzy argumentem, a czasem wykonywania. To właśnie tę zależność można opisać notacją &Omicron;(…); Po dokładniejszym zbadaniu kodu można by pewnie ustalić, że jest to &Omicron;(n)!

Skupiłem się na czasie, ale podobnie opisuje się też **złożoność pamięciową**. Przykładowo, eksperymentalnie ustaliłem, że przeglądarka Google Chrome zjada co raz więcej pamięci RAM wraz z każdą otwartą kartą:

| liczba otwartych kart | RAM  |
| --------------------- | ---- |
| 1                     | 1GB  |
| 2                     | 4GB  |
| 3                     | 9GB  |
| 4                     | 16GB |

Znowu, można domniemywać, że jest tutaj pewna zależność 😉 Po zbadaniu kodu udało się ustalić, że, z jakiegoś powodu, jest to aż &Omicron;(n²)!

Oczywiście, jest to humorystyczne i niezbyt ścisłe, a ktoś może nawet powiedzieć, że niepoprawne. Chodzi mi tylko o ogólny koncept — **notacja &Omicron;(…) opisuje zależność pomiędzy jakąś daną, a jakąś wartością** — np. pomiędzy argumentem a czasem, albo liczbą otwartych zakładek, a zjedzonym RAM-em.

## Notacja „duże &Omicron;” w zadaniach

Przyjrzyjmy się teraz konkretom. Dostajesz zadanie, które mówi „napisz kod, który ma złożoność obliczeniową &Omicron;(n²)”. Jak?

```js
function solution(n) {
  for (let i = 0; i < n; ++i) {
    for (let j = 0; j < n; ++j) {
      console.log(i, j);
    }
  }
}
```

Ta funkcja ma złożoność obliczeniową &Omicron;(n²). Skąd to wiem? Główna operacja, czyli `console.log`, wykona się tutaj dokładnie n² razy. Oznacza to również, że czas potrzebny do wykonania tego kodu _powinien_ rosnąć proporcjonalnie do kwadratu n. Zróbmy więc eksperyment!

```js
for (let i = 0; i < 40; ++i) {
  console.time(i);
  solution(i);
  console.timeEnd(i);
}
```

Test powtórzyłem 5 razy i narysowałem wykres ze średnich wyników wraz z linią trendu (dla n²).

<a href="/assets/wp-content/uploads/2019/06/Screenshot-2019-06-14-at-7.22.02-PM.png"><img src="/assets/wp-content/uploads/2019/06/Screenshot-2019-06-14-at-7.22.02-PM-1024x629.png" alt="złożoność obliczeniowa i pamięciowa" width="1024" height="629" class="aligncenter size-large wp-image-2108" /></a>

Okazuje się, że rezultaty niemal pokrywają się z przewidywaniami (0.99 to rewelacyjny wynik)!

## Wynik nie jest idealny

Dochodzimy do drugiego bardzo ważnego aspektu &Omicron;(…): Ona ignoruje nieistotne czynniki! Notacji &Omicron; nie obchodzą wielokrotności wyników. To pytanie może paść w trakcie rozmowy rekrutacyjnej. Co to znaczy? Gdybym uzyskał taki wynik złożoności pamięciowej:

| liczba otwartych kart | RAM  |
| --------------------- | ---- |
| 1                     | 2GB  |
| 2                     | 8GB  |
| 3                     | 18GB |
| 4                     | 32GB |

To czy nadal można powiedzieć, że jest złożoność pamięciową opisuje &Omicron;(n²)? Tak! Weźmy kolejny przykład:

| liczba otwartych kart | RAM  |
| --------------------- | ---- |
| 1                     | 3GB  |
| 2                     | 9GB  |
| 3                     | 19GB |
| 4                     | 33GB |

Czy to też jest &Omicron;(n²)? Znowu tak! Złożoność pamięciowa w akcji.

Ta część jest bardzo często nierozumiana. Spójrzmy na kod.

```js
function solution(n) {
  for (let i = 0; i < n; ++i) {
    for (let j = 0; j < n; ++j) {
      console.log(i, j);
      console.log(i, j);
      console.log(i, j);
      console.log(i, j);
      console.log(i, j);
      console.log(i, j);
    }

    console.log(i);
    console.log(i);
  }
  console.log('już koniec');
}
```

`console.log` wykona się (6n² + 2n + 1) razy, więc można by napisać, że złożoność obliczeniowa algorytmu to &Omicron;(6n² + 2n + 1) i **byłaby to prawda**. Policz, jeśli nie wierzysz na słowo :) Ale prawdą jest też, że nadal złożoność obliczeniowa to &Omicron;(n²).

Otóż **nie ma znaczenia, czy wywołałbym tutaj console.log raz, dwa razy, czy trzy razy, czy 1000 razy** — to nadal byłoby &Omicron;(n²)! Mówiąc językiem równań:

$$ \Omicron(6n^2 + 2n + 1) = \Omicron(6n^2 + 2n) = \Omicron(6n^2) = \Omicron(n^2) $$

Weźmy jeszcze jeden przykład. Jaką złożoność ma kod poniżej?

```js
function solution(n) {
  for (let i = 0; i < n; ++i) {
    console.log(i);
  }
  for (let i = 0; i < n; ++i) {
    console.log(i);
  }
  for (let i = 0; i < n; ++i) {
    console.log(i);
  }
}
```

Jest to &Omicron;(n). To właśnie ta nierozumiana przez wielu własność dużego &Omicron;. Jeśli Twój kod ma mieć złożoność &Omicron;(n), to ile możesz mieć pętli? **Ile chcesz.** Ważne, aby liczba operacji (`console.log`) była **proporcjonalna** do n.

## Duże O to górna granica

W jednym z pierwszych akapitów napisałem „stwierdzenie, że kod ma złożoność obliczeniową &Omicron;(n) mówi, że czas wykonywania tego kodu będzie proporcjonalny do wielkości danych, lub szybszy”. **Lub szybszy**. &Omicron; to odgórna granica, ale tak naprawdę **kod może mieć mniejszą złożoność.** Oznacza to, że jeśli rekruter każe Ci napisać kod o złożoności &Omicron;(n³), a Ty napiszesz &Omicron;(n²), to wszystko jest w porządku!

### Zadanie 1: złożoność obliczeniowa

Napisz program, który ma złożoność czasową &Omicron;(n³).

**Rozwiązanie 1**:

```js
function solution(n) {
  for (let i = 0; i < n; ++i) {
    for (let j = 0; j < n; ++j) {
      for (let k = 0; k < n; ++k) {
        console.log(i, j, k);
      }
    }
  }
}
```

**Rozwiązanie 2**:

```js
function solution(n) {}
```

Pewnie myślisz teraz: Czy to aby poprawne, pusta funkcja? Ależ tak! Pusta funkcja będzie miała złożoność &Omicron;(1) (stałą), a więc mniejszą od &Omicron;(n³).

## Podsumowanie pojęć złożoność obliczeniowa i złożoność czasowa

Mam nadzięję, że teraz nie będziesz mieć problemów ze zrozumieniem, czego chcą od Ciebie rektuterzy, gdy mówią o złożoności z „dużym &Omicron;”.

Dalej opisuję definicje tej notacji nieco bardziej formalnie. Prawdopodobnie w czasie rekrutacji nikt Cię nie będzie o to prosił — chyba, że w Google. Jeśli nie lubisz matmy, to nie musisz tego czytać 😁 Skocz od razu do ostatniego akapitu.

## Złożoność asymptotyczna

Przejdźmy do bardziej ścisłych określeń, &Omicron;(n) opisuje asymptotyczną zależność pomiędzy funkcją, a potrzebnymi zasobami. Co to oznacza? Że nieistotne są inne czynniki (jak w poprzednim akapicie) i, w zależności od definicji, liczy się tylko i wyłącznie przebieg funkcji, gdy n jest bardzo duże, lub gdy dąży do nieskończoności.

### Definicja 1

Definicja numer 1 mówi:

$$ f(n) \in \Omicron(g(n)) \iff \exists*{c>0}\ \exists_m\ \forall*{n>m}\ :\ f(n) \leq c\cdot g(n) $$

Z polskiego na nasz mówi to, że f(n) ma złożoność &Omicron;(g(n)) wtedy i tylko wtedy, gdy od pewnego momentu f(n) jest mniejsze bądź równe od cg(n). Wizualnie można to przedstawić tak:

<a href="/assets/wp-content/uploads/2019/06/Screenshot-2019-06-19-at-2.04.33-PM.png"><img src="/assets/wp-content/uploads/2019/06/Screenshot-2019-06-19-at-2.04.33-PM-1024x634.png" alt="" width="1024" height="634" class="aligncenter size-large wp-image-2109" /></a>

Jest pewien przedział od 0 do m (od 0 do 6) gdy nasza funkcja f(n) zdecydowanie nie zachowuje się, jakby miała złożoność &Omicron;(g(n)), jednak później, aż do nieskończoności, jest mniejsza bądź równa od g(n). Co ważne, bardzo często kod tak zachowuje się w rzeczywistości — **początkowy narzut niektórych implementacji lub algorytmów jest ogromny i dopiero dla dużych danych wejściowych zaczyna się zachowywać, jakby to przewidywała teoretyczna notacja &Omicron;**. Będę o tym pisał w kolejnych artykułach.

A co z `c`? Ono służy tylko temu, aby pozbyć się wielokrotności. Do sedna, pórównaj przebieg f(n)=4n i g(n)=n. Wyglądają podobnie, prawda? Są nawet **asymptotycznie równoważne**. c=4 służyłoby tutaj zniwelowaniu czynnika `4` w celu łatwiejszego porównania tych funkcji.

Sprawdźmy, czy te definicja działa dla przykładu f(n)=4n i g(n)=n:

$$
f(n) = 4n\\\\
g(n) = n\\\\
\\ \\\\
\\\\
c = 4\\\\
\\ \\\\
\\\\
f(n) \leq c\cdot g(n)\\\\
LHS = f(n) = 4n\\\\
RHS = c\cdot n = 4n\\\\
\\ \\\\
4n \leq 4n\ dla\ dowolnego\ n
$$

Oznacza to, że niezależnie, jak wybierzemy `m`, nierówność będzie spełniona. Wynika z tego, że:

$$
f(n) \in \Omicron(g(n))\\\\
4n \in \Omicron(n)
$$

### Definicja 2

Definicja numer 2 mówi o granicy w nieskończoności:

$$
f(n) \in \Omicron(g(n)) \iff \lim_{n\to \infty} |\frac{f(n)}{g(n)}| < \infty
$$

Prostymi słowami, f(n) ma złożoność &Omicron;(g(n)) wtedy i tylko wtedy, gdy f(n) podzielone przez g(n) jest mniejsze od nieskończoności (zbieżne), gdy n dąży do nieskończoności.

Dla formalności przeliczmy to dla wcześniejszego przykładu 4n i n:

$$
f(n) = 4n\\\\
g(n) = n\\\\
\\ \\\\
\\\\
\lim_{n\to \infty} |\frac{f(n)}{g(n)}| = \lim_{n\to \infty} |\frac{4n}{n}| = 4; n \neq 0\\\\
4 < \infty\\\\
\text{a więc }f(n) \in \Omicron(g(n))\\\\
\text{czyli }f(n) \in \Omicron(n)\\\\
\text{więc }4n \in \Omicron(n)
$$

### Zadanie 2

Korzystając z jednej z definicji udowodnij, że dla f(n) = 6n² + 2n + 1 i g(n) = n², f(n) ∈ &Omicron;(g(n)).

**Rozwiązanie**:
Korzystam z definicji 2.

$$
f(n) = 6n^2 + 2n + 1\\\\
g(n) = n^2\\\\
\\ \\\\
\\\\
\lim_{n\to \infty} \frac{f(n)}{g(n)} = \\\\
\lim_{n\to \infty} \frac{6n^2 + 2n + 1}{n^2} = \\\\
\lim_{n\to \infty} \frac{6n^2}{n^2} + \frac{2n}{n^2} + \frac{1}{n^2} = \\\\
\lim_{n\to \infty} 6 + \frac{2}{n} + \frac{1}{n^2} = 6; n \neq 0 \\\\
6 < \infty\\\\
\text{a więc }f(n) \in \Omicron(g(n))\\\\
\text{czyli }f(n) \in \Omicron(n^2)\\\\
\text{więc }6n^2 + 2n + 1 \in \Omicron(n^2)\\\\
\\\\
QED
$$

## Co dalej? Złożoność obliczeniowa algorytmów to szeroki temat

Jest tak wiele rzeczy, których nie zdołam tutaj opisać — musiałbym chyba wydać całą książkę! Może kiedyś przyjdzie czas na ebooka, gdzie głównym tematem będzie złożoność obliczeniowa i złożoność pamięciowa, ale nie dziś. Mam nadzieję, że nikt się nie obrazi na mało formalny opis w pierwszej części tego tekstu — czasem zrozumienie konceptu jest bardziej istotne od matematycznych formalizmów.

Warto zapamiętać ogólny koncept oraz to, jak układają się najpopularniejsze funkcje opisujące złożoność obliczeniową i złożoność pamięciową w notacji &Omicron; od potencjalnie najszybszych do potencjalnie najwolniejszych (w teorii, gdyż w praktyce ogromne znaczenie mają jednak stałe… o tym w kolejnym wpisie):

- O(1) — złożoność stała
- O(logn) — logarytmiczna
- O(n) — liniowa
- O(nlogn) — liniowo-logarytmiczna
- O(n²) — kwadratowa
- O(n^x) — (n do potęgi x) — złożoności wielomianowe
- …
- O(2^n) — (2 do potęgi n) — złożoność wykładnicza
- O(x^n)
- …
- O(n!)
- O(n^n) — superwykładnicza
- …

<figure id="attachment_2110" align="aligncenter" width="1024">
  <a href="/assets/wp-content/uploads/2019/06/Screenshot-2019-06-19-at-11.21.38-AM.png"><img src="/assets/wp-content/uploads/2019/06/Screenshot-2019-06-19-at-11.21.38-AM-1024x620.png" alt="Porównanie Ο(1), Ο(logn), Ο(n), Ο(nlogn), Ο(n²) i Ο(2^n) dla pierwszych pięciu elementów." width="1024" height="620" class="size-large wp-image-2110" /></a>
  <figcaption>
    Porównanie Ο(1), Ο(logn), Ο(n), Ο(nlogn), Ο(n²) i Ο(2^n) dla pierwszych pięciu elementów.
  </figcaption>
</figure>

<figure id="attachment_2111" align="aligncenter" width="1024">
  <a href="/assets/wp-content/uploads/2019/06/Screenshot-2019-06-19-at-11.21.19-AM.png"><img src="/assets/wp-content/uploads/2019/06/Screenshot-2019-06-19-at-11.21.19-AM-1024x615.png" alt="Porównanie Ο(1), Ο(logn), Ο(n), Ο(nlogn), Ο(n²) i Ο(2^n) dla pierwszych dwudziestu elementów. Praktycznie niewidoczne są żadne linie poza wykładniczą 2^n." width="1024" height="615" class="size-large wp-image-2111" /></a>
  <figcaption>
    Porównanie Ο(1), Ο(logn), Ο(n), Ο(nlogn), Ο(n²) i Ο(2^n) dla pierwszych dwudziestu elementów. Praktycznie niewidoczne są żadne linie poza wykładniczą 2^n.
  </figcaption>
</figure>

Teraz, gdy w czasie rekrutacji zobaczysz, że jeden algorytm ma złożoność &Omicron;(n³), a drugi &Omicron;(logn), to pewnie będziesz wiedziała, który wybrać! Choć w praktyce… sporo „zależy” — w kolejnym wpisie, bo złożoność obliczeniowa to nie wszystko!

Poczytaj także o **innych notacjach** — &Omicron; to tylko jedna z nich! Złożoność funkcji możemy ograniczać również z dołu (f(n) ma większą lub równą złożoność, co g(n)), a także konkretnie ją określać! [Asymptotyczne tempo wzrostu](https://pl.wikipedia.org/wiki/Asymptotyczne_tempo_wzrostu)
