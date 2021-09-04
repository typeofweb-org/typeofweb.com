---
title: Conditional types – TypeScript – typy warunkowe
date: 2020-12-14T15:35:34.000Z
isMarkdown: true
status: publish
permalink: conditional-types-typescript-typy-warunkowe
authors:
  - michal-miszczyszyn
type: post
thumbnail:
  url: https://res.cloudinary.com/type-of-web/image/upload/v1630769466/api_m4odp0.png
  width: 1920
  height: 1005
categories:
  - slug: typescript
    name: TypeScript
seo:
  focusKeywords:
    - conditional types
  focusKeywordSynonyms:
    - conditional type
  title: 'TypeScript: Typy warunkowe (conditional types) %%sep%% %%sitename%%'
  metadesc: >-
    Conditional types to najtrudniejsza część TypeScripta, ale też najbardziej
    potężna. Na praktycznych przykładach pokazuję, jak tworzyć zaawansowane
    typy.
---

Typy warunkowe (_conditional types_) to prawdopodobnie najtrudniejsza część TypeScripta. Jednocześnie, jak to zwykle bywa, jest to element najpotężniejszy i dający ogromne możliwości tworzenia rozbudowanych i zaawansowanych typów, dzięki którym Twoje aplikacje staną się jeszcze bardziej bezpieczne.

---

<p class="important">Tekst jest fragmentem <a href="https://typescriptnapowaznie.pl/" target="_blank" rel="noopener">książki „TypeScript na poważnie”</a> mojego autorstwa. Jeśli artykuł Ci się podoba, to zachęcam Cię do kupienia tej pozycji – znajdziesz tam więcej praktycznych przykładów wraz z wyjaśnieniem teorii. <a href="https://typescriptnapowaznie.pl/" target="_blank" rel="noopener"><img src="https://sklep.typeofweb.com/content/uploads/2020/08/Group-1.png" alt="Książka i e-book TypeScript na poważnie" title="Książka i e-book TypeScript na poważnie" /></a></p>

## Co to są typy warunkowe?

_Conditional types_ to możliwość wyrażania nieregularnych mapowań typów. Mówiąc prościej, pozwalają na zapisanie takiej transformacji, która **wybiera typ w zależności od warunku**. Myślę, że przeanalizowanie przykładu powinno wyjaśnić to, co właśnie wskazałem. Typ warunkowy zawsze przyjmuje następującą formę:

```ts
type R = T extends U ? X : Y;
```

gdzie `T`, `U`, `X` i `Y` to typy. Notacja `… ? … : …` jest analogiczna do operatora trójargumentowego z JavaScriptu: przed znakiem zapytania podajemy warunek, w tym przypadku `T extends U`, a następnie wynik, jeśli test zostanie spełniony (`X`) oraz w przeciwnym wypadku (`Y`). Takie wyrażenie oznacza, że jeśli warunek jest spełniony, to otrzymujemy typ `X`, a jeśli nie, to `Y`.

## Przykładowe użycie _conditional types_

Na razie nie było zbyt wielu konkretów, więc spójrzmy na prosty przykład:

```ts
type IsBoolean<T> = T extends boolean ? true : false;

type t01 = IsBoolean<number>; // false
type t02 = IsBoolean<string>; // false
type t03 = IsBoolean<true>; // true
```

Pamiętaj, że `t01`, `t02` i `t03` to **typy, a nie wartości**! Nasz _conditional type_ `IsBoolean` przyjmuje parametr i sprawdza, czy jest on boolem – odpowiada za to fragment `extends boolean`. Wynikiem jest `true` lub `false` w zależności od tego, czy podany argument spełnia warunek. Co istotne, `true` i `false` tutaj to również typy (literały). Udało się nam stworzyć wyrażenie wykonywane warunkowo, które zwraca jeden typ w zależności od drugiego.

## Typy warunkowe na unii

Na razie może wydawać się to mało przydatne, ale zaraz się przekonasz o użyteczności takich konstrukcji. Rzućmy okiem na inne użycie:

```ts
type NonNullable<T> = T extends null | undefined ? never : T;

type t04 = NonNullable<number>; // number
type t05 = NonNullable<string | null>; // string
type t06 = NonNullable<null | undefined>; // never
```

Do warunkowego `NonNullable` podajemy parametr, a rezultatem jest ten sam typ, ale z usuniętymi `null` i `undefined`. Jeśli po ich wyeliminowaniu nic nie zostaje, to otrzymujemy `never`. Czy zaczynasz dostrzegać, jakie to może być przydatne? **Typy warunkowe pozwalają nam na tworzenie własnych, niejednokrotnie bardzo zaawansowanych mapowań opartych o warunki**. Dokładne wyjaśnienie działania tego przykładu znajdziesz nieco dalej.

## Zagnieżdżanie

Co ciekawe, _conditional types_ możemy zagnieżdżać. Stwórzmy teraz generyk, który zwraca typ zawierający nazwę podanego parametru:

```ts
type TypeName<T> = T extends string
  ? 'string'
  : T extends number
  ? 'number'
  : T extends boolean
  ? 'boolean'
  : T extends undefined
  ? 'undefined'
  : T extends Function
  ? 'function'
  : T extends Array<any>
  ? 'array'
  : T extends null
  ? 'null'
  : T extends symbol
  ? 'symbol'
  : 'object';
```

Powyższe może się wydawać nieco długie i skomplikowane, a na pewno żmudne, ale efekt końcowy jest zadowalający:

```ts
type t07 = TypeName<string>; // 'string'
type t08 = TypeName<number>; // 'number'
type t09 = TypeName<boolean>; // 'boolean'
type t10 = TypeName<undefined>; // 'undefined'
type t11 = TypeName<function>; // 'function'
type t12 = TypeName<array>; // 'array'
type t13 = TypeName<null>; // 'null'
type t14 = TypeName<symbol>; // 'symbol'
type t15 = TypeName<object>; // 'object'
```

## Warunkowe typy dystrybutywne – _Distributive conditional types_

_Distributive conditional types_ to cecha typów warunkowych, która sprawia, że **ich użycie na unii działa tak, jakbyśmy użyli warunku na każdym z komponentów wchodzących w jej skład osobno**, a następnie wyniki połączyli ponownie unią. Brzmi skomplikowanie? Ależ skąd! Oba zapisy poniżej oznaczają dokładnie to samo:

```ts
type t16 = NonNullable<string | null | undefined>;
// string

type t17 = NonNullable<string> | NonNullable<null> | NonNullable<undefined>;
// string
```

Pierwsze użycie `NonNullable` jest tak naprawdę interpretowane, jak to drugie. Stąd nazwa: komponenty z unii podanej jako parametr są **rozdystrybuowane pomiędzy wiele użyć typu warunkowego** i każdy z nich sprawdzany jest osobno. Ten podział jest szczególnie wyraźnie widoczny, gdy rezultat jest generykiem:

```ts
type Ref<T> = { current: T };
type RefVal<T> = T extends number ? Ref<T> : T extends string ? Ref<T> : never;

type t18 = RefVal<string>; // Ref<string>;
type t19 = RefVal<string | number>;
// Ref<string> | Ref<number>;
```

Zwróć uwagę, że do `t19` przypisana jest alternatywa dwóch typów `Ref<string>` i `Ref<number>`, a nie `Ref<string | number>`! TypeScript dokonał podziału unii. Można też zaobserwować podobne zachowanie w `TypeName`, a rezultat jest dokładnie taki, jak moglibyśmy tego oczekiwać:

```ts
type t20 = TypeName<string | number | number[]>;
// "string" | "number" | "array"
```

Zauważ, że `TypeName` zadziałało, **pomimo że nigdzie nie definiowaliśmy, w jaki sposób ma obsłużyć przypadek, gdy parametrem jest unia**. Dzięki dystrybucji komponentów TypeScript rozbił nasz skomplikowany typ na mniejsze składowe, co bardzo ułatwiło nam zadanie.

Głównym zastosowaniem tej cechy typów warunkowych jest filtrowanie unii, a więc tworzenie nowej, z której usunięto część typów. Aby wyeliminować jakiś komponent z unii, należy w warunku zwrócić `never` – tak, jak to zrobiliśmy w `NonNullable`. Unia dowolnego typu i `never` daje tylko ten typ:

```ts
type StringsOnly<T> = T extends string ? T : never;

type Result = StringsOnly<'abc' | 123 | 'ghi'>;
//  "abc" | never | "ghi"
// czyli:
//  "abc" | "ghi"
```

Można powiedzieć, że `never` to element neutralny dla unii.

## Przykład użycia

Do czego ww. rozwiązanie z _conditional type_ może się nam przydać? Wyobraźmy sobie sytuację, że mamy typ jakiegoś modelu w API, który zawiera zarówno pola, jak i metody. Potrzebujemy taki obiekt zserializować jako JSON i wysłać do użytkownika, a wtedy nie będzie w nim funkcji i pozostaną wyłącznie dane. W związku z tym chcielibyśmy **stworzyć taki typ, w którym będą wszystkie pola naszego modelu z pominięciem metod**. Czy jest to możliwe? Zacznijmy od zdefiniowania modelu z dwoma własnościami i jedną funkcją:

```ts
type Model = {
  name: string;
  age: number;

  save(): Promise<void>;
};
```

Mogłaby to też być klasa, jak np. przy wykorzystaniu biblioteki Sequelize albo TypeORM. Teraz chcielibyśmy otrzymać taki sam typ, ale bez `save`. W tym celu musimy wykonać dwa kroki: pobrać nazwy tych pól, które nas interesują, a następnie stworzyć z nich obiekt. Użyjemy do tego **mapowania typów**, które dokładnie omówiłem w rozdziale 12 mojej książki [„TypeScript na poważnie”](https://typescriptnapowaznie.pl/):

```ts
type FieldsNames<T extends object> = {
  [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];

type OnlyFields<T extends object> = {
  [K in FieldsNames<T>]: T[K];
};

type ModelFields = OnlyFields<Model>;
// { name: string; age: number; }
```

Dzieje się tu bardzo dużo, więc omówmy oba typy krok po kroku. Zacznijmy od końca:

```ts
type ModelFields = OnlyFields<Model>;
```

Tę linijkę możemy zastąpić bezpośrednio rozwinięciem `OnlyFields`, aby było nam łatwiej zrozumieć, co robimy:

```ts
type ModelFields = {
  [K in FieldsNames<Model>]: Model[K];
};
```

Jest to mapowanie typu, które oznacza mniej więcej tyle, że dla każdego pola `K` w typie `FieldsNames<Model>` tworzymy własność o nazwie `K` z typem `Model[K]`. Najważniejsze więc, aby zrozumieć, co dzieje się w `FieldsNames<Model>`. Zapiszmy w tym celu pomocniczy typ `A`:

```ts
type A = {
  [K in keyof Model]: Model[K] extends Function ? never : K;
}[keyof Model];
```

Jest to dokładnie ten sam _conditional type_, co w `FieldsNames`, tylko zamiast `T` podstawiłem nasz `Model`. Idźmy dalej, możemy rozwinąć zapis `keyof Model` do `"name" | "age" | "save"`:

```ts
type A = {
  [K in 'name' | 'age' | 'save']: Model[K] extends Function ? never : K;
}[keyof Model];
```

Następnym krokiem byłoby rozpisanie tych trzech pól osobno, bez sygnatury indeksu. `K` zamieniam na kolejne nazwy:

```ts
type A = {
  name: Model['name'] extends Function ? never : 'name';
  age: Model['age'] extends Function ? never : 'age';
  doSth: Model['save'] extends Function ? never : 'save';
}[keyof Model];
```

## Krok po kroku

Teraz możemy odczytać typy pól kryjących się pod `Model['name']`, `Model['age']` oraz `Model['save']` i ręcznie wstawić je w odpowiednie miejsca:

```ts
type A = {
  name: string extends Function ? never : 'name';
  age: number extends Function ? never : 'age';
  save: (() => Promise<void>) extends Function ? never : 'save';
}[keyof Model];
```

Pozostaje nam już tylko odpowiedź na pytanie, czy te typy są funkcjami (`extends Function`)? Jeśli tak, to zamiast typu wstawiamy to, co jest po znaku zapytania (czyli `never`), a w przeciwnym wypadku to, co po dwukropku:

```ts
type A = {
  name: 'name';
  age: 'age';
  save: never;
}[keyof Model];
```

Kolejnym krokiem jest odczytanie wartości z pól tak powstałego obiektu. Służy temu składnia `obj[keyof obj]`, którą również dokładnie omawiam [w mojej książce o TypeScripcie](https://typescriptnapowaznie.pl/). W rezultacie:

```ts
type A = 'name' | 'age' | never;
// Czyli to samo, co 'name' | 'age'
```

Wróćmy do typu `ModelFields` i podstawmy znaleziony przez nas element tej układanki:

```ts
type ModelFields = {
  [K in 'name' | 'age']: Model[K];
};
```

Wiemy, że ten zapis oznacza tak naprawdę stworzenie dwóch pól w obiekcie:

```ts
type ModelFields = {
  name: Model['name'];
  age: Model['age'];
};
```

Ostatni krok to proste podstawienie:

```ts
type ModelFields = {
  name: string;
  age: number;
};
```

Krok po kroku odtworzyliśmy skomplikowaną pracę, którą normalnie wykonuje za nas kompilator TypeScripta. Przeanalizuj dokładnie i powoli powyższe, aby lepiej zrozumieć działanie typów warunkowych.

Ten sam efekt można uzyskać korzystając z typów biblioteki standardowej TypeScripta. W tym przypadku `Pick`:

```ts
type ModelFields = Pick<Model, FieldsNames<Model>>;
```

Więcej informacji o tym i pozostałych typach wbudowanych w TS znajdziesz pod koniec książki [„TypeScript na poważnie”](https://typescriptnapowaznie.pl/).

## Podsumowanie _conditional types_

Mam nadzieję, że ten artykuł nieco przybliży Ci tematykę i użyteczność typów warunkowych w TypeScripcie. W kolejnym wpisie z serii omówię opóźnione warunki (_deferred conditional types_) oraz niezwykle przydatne słowo kluczowe `infer` służące do sterowania pracą kompilatora i wnioskowania typów, o które poprosimy!

Powyższy tekst powstał na bazie rozdziału mojej książki „TypeScript na poważnie”, do kupienia której gorąco Cię zachęcam. O samym procesie powstawania książki przeczytasz w tym wpisie:

https://typeofweb.com/napisalem-ksiazke-kilka-slow-o-typescript-na-powaznie/
