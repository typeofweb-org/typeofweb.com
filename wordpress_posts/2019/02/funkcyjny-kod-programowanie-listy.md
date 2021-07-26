---
id: 1802
index: 106
title: >-
  Fragmenty funkcyjnego kodu, które zmieniły moje spojrzenie na programowanie —
  listy
date: 2019-02-26T15:29:51.000Z
isMarkdown: true
status: publish
permalink: funkcyjny-kod-programowanie-listy
authors:
  - michal-miszczyszyn
guid: https://typeofweb.com/?p=1802
type: post
thumbnail:
  url: https://typeofweb.com/wp-content/uploads/2019/02/image.jpg
  width: 1400
  height: 875
categories:
  - slug: dobry-kod
    name: Dobry Kod
  - slug: opinie
    name: Opinie
seo: {}

---
Jakiś czas temu zacząłem się mocniej interesować programowaniem funkcyjnym. O ile wydawało mi się, że rozumiem `rxjs`, `lodash/fp` i inne podobne biblioteki, to jednak tak naprawdę nigdy nie próbowałem pisać w 100% funkcyjnie. I uwierz mi, to niesamowite doświadczenie! W tym krótkim wpisie pokazuję jeden przykład kodu, który mocno poszerzył mi horyzont myślowy.

<!--more-->

## OCaml / Reason
Jestem ogromnym fanem języka Reason (dialekt OCamla). Pisałem w nim zanim to było modne ;) Ale to był głównie front-end, React w **Reason jest całkiem przyjemny**. Jednak, nie czuje się tam za bardzo samego programowania funkcyjnego. Tworzysz obiekty, przekazujesz parametry, dostajesz komponent. Cudowne, praktyczne, bezpieczne, ale nie jest to ten kod funkcyjny, o którym chcę dzisiaj pisać. Samemu React/Reason poświęcę chyba osobny wpis.

Aby lepiej poznać programowanie funkcyjne, zacząłem rozwiązywać proste łamigłówki algorytmiczne, ale rozwiązana implementowałem wyłącznie czysto funkcyjnie. I tak, o ile nie mam najmniejszego problemu np. ze znalezieniem wysokości drzewa pisząc imperatywnie, to jak to jednak ugryźć funkcyjnie? 🤔 **Zmuszanie się do myślenia wyłącznie w kontekście funkcji zmieniło mi nieco perspektywę na pisanie kodu**. Ale zacznijmy od czegoś prostszego: Długość listy.

## Znajdź długość listy
Policz długość listy. Jak byś to rozwiązała w języku imperatywnym? A jak funkcyjnie? Początek wymaga pewnej gimnastyki umysłu — i dokładnie o to chodzi ;)

### Co to jest lista?
Na potrzeby tego wpisu przez „listę” rozumiem klasyczną strukturę danych. Mamy pierwszy element listy i możemy z niego przejść do następnego. Odczytanie n-tego elementu listy wymaga n operacji (musisz przejść z pierwszego elementu po kolei aż do n-tego). Jest to zasadnicza różnica w stosunku do tablic, w których tradycyjnie można pobrać dowolny element.

Piszę „tradycyjnie” i „klasycznie”, gdyż konkretna implementacja tych struktur danych w bibliotekach standardowych języków wysokiego poziomu może się różnić.

A więc jak znaleźć długość listy?

### Długość listy imperatywnie
Rozwiązanie imperatywne to:

1. Weź początek listy.
2. Ustaw licznik na 0.
3. Dopóki aktualny element nie jest pusty…
4. …zwiększ licznik o 1…
5. …przejdź do kolejnego elementu i wróć do pkt. 3.
6. Zwróć licznik.

Przykładowa implementacja w pseudokodzie:

```javascript
function listLength(list) {
  let node = list; /* 1 */
  let length = 0; /* 2 */
  while (node) { /* 3 */
    ++length; /* 4 */
    node = node->next; /* 5 */
  }
  return length; /* 6 */
}

/* … */
listLength(myList);
```

### Długość listy funkcyjnie
**Programowanie funkcyjne wymaga innego sposobu myślenia** i często polega na **deklarowaniu faktów i wyciągania na ich podstawie wniosków**. W przypadku takiej listy mamy 2 fakty:

1. Wielkość pustej listy równa się 0.
2. Wielkość każdej innej listy `list` równa się 1 + długość `list` bez jej pierwszego elementu — czyli długość tak zwanego ogona (_tail_)

Taka rekurencyjna deklaracja nie jest może oczywista na pierwszy rzut oka, ale po chwili namysłu… to ma sens! Jakby to wyglądało w języku Reason?

```reason
let rec solution = (length, list) => {
  switch (list) {
    | [] => length /* 1 */
    | [_, ...tail] => solution(length + 1, tail) /* 2 */
  }
}

/* … */
solution(0, myList);
```

I ten kod dokładnie to opisuje!

## Dlaczego kod funkcyjny jest lepszy?
Przynajmniej z dwóch powodów: **Jest prostszy i nie ma mutacji.**

### Brak mutacji
Niemutowalne struktury danych i brak mutacji to klasyka języków funkcyjny. I o ile Reason/OCaml pozwalają na mutacje, to są one bardzo wyraźnie oznaczane, a ich wykorzystywanie jest niezalecane.

**Co złego w mutacjach**? Łatwo popełnić **przypadkowy błąd** mutując nie to, co trzeba. Ponadto, jeśli jakaś inna część aplikacji trzyma referencję do czegoś co mutujesz, to możesz na nią wpłynąć nawet o tym nie wiedząc.

Dużo lepiej i czytelniej jest jasno i wyraźnie oznaczać miejsca, w których dane się zmieniają i _explicite_ informować o zmianach pozostałe części aplikacji, niż polegać na ukrytych mutacjach.

Co prawda w tym przykładzie nie ma zależnych od siebie części aplikacji, ale **mutacje są aż dwie i możliwe są błędy**. Mutowany jest licznik (łatwo tutaj o np. pomyłkę o 1, gdyby zwiększać licznik w złym momencie). Mutowana jest też referencja na ostatni element listy (możliwy błąd mógłby polegać na zbyt wczesnym lub zbyt późnym przerwaniu pętli).

**Te problemy całkowicie eliminuje implementacja bez mutacji, funkcyjna.**

### Prostota
To nieco bardziej subiektywne. Ale zastanów się co musi zrobić ktoś, kto nie zna dobrze programowania, aby w ogóle zrozumieć jak działa ten kod imperatywny? Musiałaby dokładnie prześledzić wszystkie jego linijki, wykonać w głowie pętle, a najlepiej rozpisać kolejne wywołania na kartce. **Sporo roboty.**

A teraz kod funkcyjny. Zdefiniowane są 2 relatywnie proste fakty. Nie trzeba dokładnie śledzić wszystkich wywołań ani rozpisywać na kartce rekurencji. **Wystarczy tylko zweryfikować czy oba podane twierdzenia są prawdziwe.**

Dodatkowo muszę jeszcze zaznaczyć, że gdybyś zapomniała o jakimś „fakcie”, np. **gdybyś pominęła przypadek pierwszy (pusta tablica), to zorientowałby się i przypomniał Ci o tym kompilator**. Taki kod:

```reason
let rec solution = (length, list) => {
  switch (list) {
    | [_, ...tail] => solution(length + 1, tail) /* 2 */
  }
}
```

Daje błąd w czasie kompilacji:

```
You forgot to handle a possible value here, for example: 
[]
```

To już trochę dygresja na temat _pattern matchingu_, ale **podobnego inteligentnego zachowania nie można oczekiwać w przypadku kodu imperatywnego**.

## Podsumowanie
Chciałbym zasadzić w Tobie ziarno zainteresowania programowaniem funkcyjnym. Czy mi się udało? Mam nadzieję, że tak! Planuję jeszcze kilka kolejnych wpisów w tej serii. **O czym chciałabyś/chciałbyś przeczytać**?
