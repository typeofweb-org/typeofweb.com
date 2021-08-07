---
id: 2122
index: 122
title: Kolejka FIFO, LIFO i priorytetowa – struktury danych
date: 2020-01-31T11:49:10.000Z
isMarkdown: true
status: publish
permalink: struktury-danych-kolejka-fifo-lifo-priorytetowa
authors:
  - michal-miszczyszyn
guid: https://typeofweb.com/?p=2122
type: post
thumbnail:
  url: >-
    https://typeofweb.com/wp-content/uploads/2020/01/kolejki_lifo_fifo_priorytetowa.png
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
    - Kolejka
  focusKeywordSynonyms:
    - FIFO, LIFO, kolejki
---

Kolejka (FIFO), stos (LIFO) i kolejka priorytetowa. Przechodzimy do nieco bardziej abstrakcyjnych struktur danych. Omówimy ich właściwości i złożoności, krótko porozmawiamy o możliwych implementacjach, a także spróbujemy sami napisać!

{/_ more _/}

## Kolejka FIFO

Klasyczna kolejka typu FIFO (First In First Out) to struktura danych, w której dane dodawane są zawsze na koniec, a pobierane zawsze z początku. Nie ma możliwości dodania lub pobrania wartości z innego miejsca.

Te operacje nazywają się, zwyczajowo, `queue` (dodanie czegoś na koniec kolejki) oraz `dequeue` (pobranie pierwszego elementu z kolejki i usunięcie go).

## Stos LIFO

Stos, albo kolejka LIFO, to przeciwieństwo kolejki FIFO. Skrótowiec LIFO rozwija się do Last In First Out. Nazwa „stos” dość dobrze obrazuje sposób działania tej struktury danych — wkładamy coś na szczyt stosu i ściągamy tylko ze szczytu. Inne operacje nie są możliwe.

W przypadku FIFO, element, który „czeka” najdłużej, jest obsłużony jako pierwszy. W LIFO element, który „czeka” najkrócej jest obsługiwany jako pierwszy.

### Reprezentacja kolejki

To w zasadzie cała definicja kolejki FIFO, dlatego też jest bardzo wiele możliwości jej zaimplementowania — można użyć do tego celu różnorakich struktur danych.

Przykładowo, kolejka może być tylko „ograniczeniem” nałożonym na [zwykłą listę](https://typeofweb.com/podstawowe-struktury-danych-tablica-i-lista/). Zamiast pozwalać dodawać i usuwać dowolne elementy, zabraniamy tego. Dodawać można tylko na koniec, a zdejmować z kolejki tylko pierwszy element. Pozostała część się nie zmienia i działa, jak zwykła lista.

### Złożoności kolejki

Z powodu tak różnych możliwości implementacji kolejki, złożoność operacji zależy całkowicie od wybranej struktury danych. W przypadku listy, dodanie i usunięcie czegoś z kolejki będą miały złożoności &Omicron;(1).

### Implementacja kolejki

Korzystam tutaj z poprzednio zaimplementowanej listy. Zaimplementowałem dwie metody: `queue` i `dequeue`. Ze względu na prostotę, zdecydowałem też, że w przypadku, gdy kolejka jest pusta, funkcja `dequeue` rzuca wyjątek. To zachowanie należałoby zmienić :)

```ts
class Queue<T> {
  private back = new ListNode<T | null>(null);
  private front = this.back;

  queue(value: T) {
    this.back.addAfter(value);
    this.back = this.back.next;
  }

  dequeue(): T {
    if (!this.front.next) {
      throw new Error('Kolejka jest pusta!');
    }
    if (this.front.next === this.back) {
      this.back = this.front;
    }

    const val = this.front.next.value;
    this.front.next.remove();

    return val;
  }
}
```

```ts
class Stack<T> {
  private list = new ListNode<T>(null);
  private top = this.list;

  queue(value: T) {
    this.top.addAfter(value);
    this.top = this.top.next;
  }

  dequeue(): T {
    if (this.top.value == null) {
      throw new Error('Kolejka jest pusta!');
    }

    const val = this.top.value;
    const prev = this.top.prev;
    this.top.remove();
    this.top = prev;

    return val;
  }
}
```

Pisałem ten kod na szybko, więc jeśli znajdziesz błędy, to pisz w komentarzu :)

## Kolejka priorytetowa

Odmianą kolejki jest kolejka priorytetowa. Elementy są do niej dodawane standardowo, ale zdejmowany jest nie element czekający najdłużej, lecz ten o najmniejszym (lub największym) priorytecie.

Taki rodzaj kolejki ma bardzo powszechne zastosowanie — od zarządzania wiadomościami w aplikacjach internetowych, aż po jądro systemu operacyjnego.

### Złożoność obliczeniowa kolejki priorytetowej

Naiwna implementacja kolejki priorytetowej użyłaby pewnie zwykłej listy. W momencie potrzeby zdjęcia z kolejki jakiegoś elementu, trzeba by przeszukać listę, aby znaleźć element z najwyższym priorytetem. To będzie &Omicron;(n).

W praktyce, do implementacji kolejki priorytetowej używa się znacznie bardziej skomplikowanych struktur danych. Za wikipedią: [podsumowanie złożoności różnych implementacji kolejki priorytetowej](https://en.wikipedia.org/wiki/Priority_queue#Summary_of_running_times)

### Naiwna implementacja kolejki priorytetowej

Tak, jak napisałem wyżej, w tej implementacji operacja zdjęcia czegoś z kolejki ma złożoność &Omicron;(n)

```ts
class PriorityQueue<T> {
  private list = new ListNode<{ value: T; priority: number } | null>(null);

  queue(value: T, priority: number) {
    this.list.addAfter({ value, priority });
  }

  dequeue(): T {
    if (!this.list.next) {
      throw new Error('Kolejka jest pusta!');
    }

    let max: ListNode<{ value: T; priority: number } | null> = this.list.next;
    let node: ListNode<{ value: T; priority: number }> | null = this.list.next;
    while (node) {
      if (node.value.priority > max.value.priority) {
        max = node;
      }
      node = node.next;
    }

    const val = max.value.value;
    max.remove();
    return val;
  }
}
```

## Podsumowanie

Omówiłem tutaj po krótce 3 rodzaje kolejek: FIFO, LIFO oraz kolejkę priorytetową. Mam nadzieję, że ta wiedza przyda Ci się w praktyce :)
