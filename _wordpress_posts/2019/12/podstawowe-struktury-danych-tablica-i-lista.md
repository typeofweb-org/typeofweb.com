---
id: 2130
index: 116
title: Podstawowe struktury danych — tablica i lista
date: 2019-12-10T18:57:12.000Z
isMarkdown: true
status: publish
permalink: podstawowe-struktury-danych-tablica-i-lista
authors:
  - michal-miszczyszyn
guid: https://typeofweb.com/?p=2130
type: post
thumbnail:
  url: >-
    https://typeofweb.com/wp-content/uploads/2019/10/piece-of-cake-struktury-danych-tablica-i-lista.png
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
    - tablica
    - lista
    - struktury
  focusKeywordSynonyms:
    - struktur
    - tablic, tablicą, tablicy
    - listą, list, listy
  metadesc: >-
    Tablica, lista jednokierunkowa i dwukierunkowa to elementarne struktury
    danych. Dowiesz się czym są i jaką złożoność obliczeniową mają operacje na
    nich.
---

Znajomość podstawowych struktur danych takich, jak tablica czy lista, jest w środowisku akademickim uważana za wiedzę podstawową w programowaniu. Czy tak jest naprawdę? Moim zdaniem **nie jest to absolutnie niezbędne** do codziennego klepania kodu. Mimo to, warto jednak poznać różnorodne struktury danych, gdyż ta wiedza może mieć wpływ na nasze decyzje odnośnie implementacji i postrzegania problemów algorytmicznych.

{/_ more _/}

## Co to jest struktura danych?

Struktura danych (_data structure_) to, za wikipedią, sposób przechowywania danych w pamięci komputera. Algorytmy operują na strukturach danych. Każda i każdy z Was codziennie korzysta z różnych struktur danych, być może nawet nigdy nie zagłębiając się w ten temat.

Decyzje odnośnie wyboru właściwej struktury danych do konkretnej implementacji mają wpływ na wydajność programu, trudność (łatwość) implementacji, a także czytelność kodu. **Odpowiednia struktura danych często sprawia, że nagle problem, który mieliśmy do rozwiązania staje się banalny**!

## Dygresja na temat JavaScript

Muszę tutaj zwrócić uwagę, że struktury danych, które dalej opisuję są bardzo klasyczne — w tym sensie, że tradycyjnie implementuje się je w opisany przeze mnie sposób. Jednak w nowoczesnych językach i bibliotekach standardowych często dobrze znane struktury danych są zaimplementowane zupełnie inaczej! Mówiąc konkretnie o JS, struktury danych praktycznie nie mają opisu implementacji w specyfikacji — jest napisane jak mają działać, a nie w jaki sposób mają być reprezentowane w pamięci — stąd np. `array` w JS może wcale nie być tablicą w klasycznym rozumieniu, a może być np. haszmapą albo listą. Wszystko zależy od silnika. To powiedziawszy, mimo wszystko zachęcam do dalszej lektury :)

## Tablica

Tablica jest prawdopodobnie najprostszą strukturą danych. Jest to reprezentacja ciągu elementów jakiegoś typu ułożonych w określonej kolejności. Każdy element ma określony indeks (kolejny numer).

Tradycyjnie tablicę implementuje się w taki sposób, że zajmuje ona z góry określony fragment pamięci. Innymi słowy, **kolejne elementy tablicy są położone w pamięci obok siebie** — dzięki temu dostęp do dowolnego elementu jest szybki. Zazwyczaj pierwszy indeks tablicy to 0.

<a href="https://typeofweb.com/wp-content/uploads/2019/12/Screenshot-2019-12-10-at-18.58.43.png"><img src="https://typeofweb.com/wp-content/uploads/2019/12/Screenshot-2019-12-10-at-18.58.43-1024x225.png" alt="Schematyczny rysunek tablicy o rozmiarze 13 i 10 elementach: a b c d e f g h i j" width="1024" height="225" class="aligncenter size-large wp-image-2330" /></a>

W tym przypadku stworzona tablica ma wielkość 13, ale w tym momencie znajduje się w niej tylko 10 elementów.

### Reprezentacja tablicy w pamięci

Załóżmy mamy tablicę przechowującą 10 znaków (przyjmijmy, że znak zajmuje 4 bajty). W pamięci będzie to wyglądało tak:

```
0 1 2 3 4 5 6 7 8 9
a b c d e f g h i j
```

Teraz, aby dostać się do znaku leżącego pod indeksem 5, wystarczy pobrać adres pierwszego elementu w pamięci i dodać do niego 5 · 4 = 20 bajtów. Mówi się, że tablica umożliwia **random access**, czyli dostęp do dowolnego elementu.

### Złożoności tablicy

#### Odczytywanie elementu

Odczyt elementu pod indeksem `k` z tablicy ma [złożoność czasową](https://typeofweb.com/zlozonosc-obliczeniowa-czasowa-pamieciowa-algorytmow/) &Omicron;(1), gdyż wystarczy jedno proste obliczenie, aby pobrać dowolny element.

#### Dodawanie elementu do tablicy

Dodanie elementu do tablicy, która nie jest pełna ma złożoność &Omicron;(1), gdyż wystarczy pobrać indeks i zapisać tam daną. Problem pojawia się, gdy w tablicy skończy się miejsce! Niektóre implementacje pozwalają na rozszerzenie tablicy, ale zastanówmy się, co się wtedy dzieje:

W przypadku pesymistycznym, zaraz za tablicą zapisane są w pamięci jakieś inne dane. Niemożliwe jest więc proste dodanie kolejnego elementu na jej koniec 😐 Aby rozszerzyć taką tablicę, zmuszeni jesteśmy zarezerwować więcej miejsca w innym obszarze pamięci, a następnie **skopiować tam wszystkie elementy z istniejącej tablicy** i dodać nową daną na koniec.

Z tego powodu, dodanie elementu do tablicy o wielkości `l` ma pesymistyczną złożoność &Omicron;(l), gdyż wymaga skopiowania wszystkich już zapisanych w niej elementów.

Gdy chcemy **dodać nowy element do tablicy w konkretne miejsce**, również mamy pod górkę — musimy zrobić mu miejsce i przesunąć pozostałe elmenty! W najgorszym wypadku będziemy chcieli włożyć nowy element pod indeks 0 — wtedy konieczne jest przesunięcie w pamięci wszystkich elementów. Dla tablicy wielkości `l` będzie to wymagało `l` operacji, czyli złożoność &Omicron;(l).

#### Usuwanie elementu z tablicy

Usunięcie elementu z końca tablicy jest proste i ma złożoność &Omicron;(1). Co jednak, gdy usuwany element jest w środku, lub, najgorzej, na samym początku? Zakładając, że tablica nie pozwala na dziury (nie jest _sparse_), zmuszeni jesteśmy znowu przesunąć wszystkie elementy o jedno miejsce! Podobnie, jak w przypadku dodawania elementów, dla tablicy wielkości `l` mamy złożoność &Omicron;(l).

#### Zastępowanie elementu w tablicy

Zastąpienie innego elementu w tablicy nowym jest banalne. Zakładając, że chcemy nadpisać element pod indeksem `k` musimy wykonać tylko 2 operacje: Pobrać miejsce w pamięci i zapisać tam nową daną. Złożoność &Omicron;(1).

### Tablica w skrócie

Z powodów opisanych wyżej, niektóre biblioteki standardowe w ogóle nie pozwalają na roszerzanie tablic, a jeszcze inne „tablice” implementują przy pomocy zupełnie innych struktur danych, w których złożoności obliczeniowe są mniejsze.

Ogromną zaletą tablicy jest natomiast dostęp do dowolnego elementu w stałym czasie.

## Lista

Lista to struktura danych zawierająca tak zwane **węzły** (node). Węzeł przechowuje jakąś daną, oraz umożliwia dostanie się do kolejnego elementu listy. Taka lista nazywa się **listą jednokierunkową**.

Istnieją również **listy dwukierunkowe**, w których węzły dodatkowo dają możliwość pobrania poprzedniego elementu, a nie tylko następnego.

<a href="https://typeofweb.com/wp-content/uploads/2019/12/Screenshot-2019-12-10-at-19.02.35.png"><img src="https://typeofweb.com/wp-content/uploads/2019/12/Screenshot-2019-12-10-at-19.02.35-1024x205.png" alt="Schematyczny rysunek listy dwukierunkowej zawierającej ciąg 4 elementów: a b c d" width="1024" height="205" class="aligncenter size-large wp-image-2332" /></a>

### Złożoności list

#### Odczytywanie elementu

Zasadniczo niemożliwe jest szybkie dostanie się do dowolnego elementu listy. Aby pobrać k-ty element, konieczne jest przejście z pierwszego do drugiego, z drugiego do trzeciego, z trzeciego do czwartego i tak dalej, aż do k-tego.

Odczyt elementu `k` ma złożoność czasową &Omicron;(k).

Niektóre implementacje listy w ogóle nie posiadają takiej operacji, jak pobranie k-tego elementu. Twórcy być może zakładają, że jest to operacja bezsensowna i niepotrzebna, a lista ma służyć do innych celów. Trudno się nie zgodzić!

#### Dodawanie elementu do listy

Zakładając, że mamy zapisany nie tylko początek listy, ale również jej koniec, dodanie elementu do listy wymaga tylko jednej operacji. Pobieramy ostatni węzeł i informujemy go, że za nim znajduje się od teraz nowy. Złożoność &Omicron;(1).

Dodanie danych w dowolnym miejscu listy wymaga dojścia do tego elementu (czyli przemierzenia wszystkich poprzednich elementów). Jeśli jednak jesteśmy już w konkretnym miejscu, to dodanie tutaj czegoś wymaga tylko dwóch operacji: Informujemy aktualny element K, że za nim będzie nowy nowy element, a następnie informujemy nowy element, że za nim jest element K+1. W przypadku listy dwukierunkowej dodatkowo informujemy element K o tym, co jest przed nim, a element przed nim o K. Złożoność &Omicron;(1).

<Gallery size="full" columns="1" link="none">
  <img src="https://typeofweb.com/wp-content/uploads/2019/12/Screenshot-2019-12-10-at-19.08.15.png" loading="lazy" alt="undefined" title="1) Chcemy dodać nowy element" width="1478" height="530" />
<img src="https://typeofweb.com/wp-content/uploads/2019/12/Screenshot-2019-12-10-at-19.08.23.png" loading="lazy" alt="undefined" title="2) Informujemy go o elemencie przed nim i po nim" width="1502" height="578" />
<img src="https://typeofweb.com/wp-content/uploads/2019/12/Screenshot-2019-12-10-at-19.08.28.png" loading="lazy" alt="undefined" title="3) Informujemy element b o nowym elemencie po nim i element c o nowym elemencie przed nim" width="1694" height="386" />
</Gallery>

#### Usuwanie elementu z listy

Gdy już dojdziemy do węzła, który chcemy skasować, usunięcie to tylko poinformowanie dwóch okalających go elementów o zmianie. Złożoność &Omicron;(1).

#### Zastępowanie elementu na liście

Zastępowanie elementu na liście wymaga dojścia do niego (znowu). Potem już z górki, ponownie złożoność to tylko &Omicron;(1).

### Lista w skrócie

Lista jest bardzo popularną strukturą danych, która raczej nie sprzyja losowemu odczytywaniu elementów. Pozwala za to łatwo dodawać i usuwać elementy w dowolnym miejscu.

### Implementacji listy w TS

Moja lista ma 3 pola i 2 metody: `value`, `prev` i `next`, oraz `addAfter` i `remove`. `addAfter` dodaje podaną wartość za aktualnym węzłem. `remove` usuwa ten węzeł z listy.

Dodatkowo, jako ciekawostkę, zdefiniowałem iterator, który pozwala iterować po liście, albo zamienić ją na tablicę przez `[...lista]`.

```ts
class ListNode<T> {
  constructor(public readonly value: T) {}

  prev: ListNode<T> | null = null;
  next: ListNode<T> | null = null;

  addAfter(value: T) {
    const node = new ListNode(value);

    node.prev = this;

    if (this.next) {
      node.next = this.next;
      this.next.prev = node;
    }

    this.next = node;
  }

  remove() {
    if (this.prev && this.next) {
      this.prev.next = this.next;
      this.next.prev = this.prev;
      return;
    }

    if (this.prev) {
      this.prev.next = null;
    }

    if (this.next) {
      this.next.prev = null;
    }
  }

  [Symbol.iterator] = function* (this: ListNode<T>) {
    let node: ListNode<T> | null = this;
    while (node) {
      yield node.value;
      node = node.next;
    }
  };
}
```

Oczywiście powyższy kod ma charakter wyłącznie edukacyjny i nigdy nie powinien być używany produkcyjnie. Po pierwsze, nie testowałem go, ani nie napisałem testów. Po drugie, może być niewydajny albo nie spełniać swojego zadania. Wreszcie po trzecie: W JS charakter listy ma tak naprawdę wbudowana „tablica” `[]`.

## Podsumowanie

Omówiłem tutaj w skrócie dwie ważne struktury danych w ich klasycznym rozumieniu: tablicę i listę. Jest to wiedza potrzebna do zrozumienia kolejnych wpisów z tej serii. Odpowiedni dobór struktur danych mocno upraszcza implementację wielu algorytmów.
