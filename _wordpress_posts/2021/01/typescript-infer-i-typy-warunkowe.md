---
index: 130
title: 'TypeScript: `infer` i typy warunkowe'
date: 2021-01-30T12:50:09.000Z
isMarkdown: true
status: publish
permalink: typescript-infer-i-typy-warunkowe
authors:
  - michal-miszczyszyn
type: post
thumbnail:
  url: >-
    https://res.cloudinary.com/type-of-web/wp-content/uploads/2021/01/typescript-infer-conditional-types.png
  width: 1200
  height: 630
categories:
  - slug: typescript
    name: TypeScript
seo: {}
---

[Poprzedni wpis](https://typeofweb.com/conditional-types-typescript-typy-warunkowe/) na temat typów warunkowych (_Conditional Types_) omawiał dokładnie teorię oraz podstawowe zastosowania. W tym artykule skupimy się na niuansach, kompatybilności oraz słowie kluczowym `infer`, które daje nam nieograniczone możliwości instruowania kompilatora!

{/_ more _/}

<p class="important">Tekst jest fragmentem <a href="https://typescriptnapowaznie.pl/" target="_blank" rel="noopener">książki „TypeScript na poważnie”</a> mojego autorstwa. Jeśli artykuł Ci się podoba, to zachęcam Cię do kupienia tej pozycji – znajdziesz tam więcej praktycznych przykładów wraz z omówionymi mechanizmami działania. <a href="https://typescriptnapowaznie.pl/" target="_blank" rel="noopener"><img src="https://sklep.typeofweb.com/content/uploads/2020/08/Group-1.png" /></a></p>

## Opóźnione warunki

Czasem w miejscu użycia typu warunkowego jest zbyt mało informacji, aby kompilator był w stanie odpowiedzieć, czy warunek jest spełniony, czy nie. Rezultatem jest wtedy typ warunkowy zamiast zwykłego. Taką sytuację nazywamy _deferred conditional type_, czyli opóźnionym typem warunkowym. Zakładając, że mamy funkcję generyczną:

```ts
declare function getEntityID<T>(x: T): T extends Entity ? string : number;
```

poniższe użycie sprawi, że otrzymamy stałą mającą typ warunkowy:

```ts
function getEntityData<U>(x: U) {
  const id = getEntityID(x);
  // U extends Entity ? string : number
}
```

Typ `id` nie może być w tym miejscu jednoznacznie ustalony, gdyż zależy on od `x`, a więc od parametru generycznego `U` i dlatego kompilator jeszce nie wie, czy będzie to `string`, czy `number`. Czy to oznacza, że nasz `result` ma nieznany typ? Ależ skąd! Jest nim `U extends User ? string : number`. Pojawia się pytanie, co z nim możemy zrobić.

## Kompatybilność typów warunkowych

Okazuje się, że typy warunkowe są kompatybilne z unią ich możliwych rezultatów. Jeśli mamy typ `T extends U ? A : B`, to jest on zgodny z `A | B`. Ma to sens, prawda? W końcu taki warunek może zwrócić co najwyżej `A` lub `B`! Wróćmy do kodu z poprzedniej sekcji:

```ts
function getEntityData<U>(x: U) {
  const id = getEntityID(x);
  // U extends Entity ? string : number

  const foo: string | number = id; // OK!
}
```

Przypisanie `id` do `foo: string | number` jest bezpieczne i prawidłowe.

## `infer`

Bardzo długo społeczność TS prosiła o dodanie możliwości pobierania typu zwracanego przez funkcję tylko na podstawie jej definicji. Pojawiało się wiele propozycji realizacji tego trudnego zadania, aż w końcu twórcy TypeScripta zdecydowali się na stworzenie mechanizmu bardziej ogólnego. Dzięki słowu kluczowemu `infer` możemy w pewnym sensie ręcznie sterować inferencją typów i wskazać TypeScriptowi coś w stylu „podaj mi typ tego, co jest w tym miejscu, czymkolwiek to jest”. To niezwykle potężne narzędzie:

```ts
type ReturnType<T> = T extends (...args: unknown[]) => infer R ? R : never;

type t21 = ReturnType<typeof document.createElement>;
// | HTMLAnchorElement
// | HTMLMenuElement
// | HTMLInputElement
```

Powyżej zdefiniowany `ReturnType<T>` mówi: „Jeśli T jest funkcją, to niech TypeScript przypisze do `R` jej typ zwracany (`infer R`), a całe wyrażenie niech zwraca ten typ. W przeciwnym wypadku niech zwróci `never`”.

Taki ogólny mechanizm pozwala nam inferować w zasadzie dowolne parametry w typach generycznych:

```ts
type PromiseValue<T> = T extends Promise<infer R> ? R : never;

const promise = Promise.resolve(12);
type t22 = PromiseValue<typeof promise>;
// number
```

W tym przypadku stworzyliśmy generyk `PromiseValue`, który jako parametr przyjmuje typ obietnicy i zwraca jej zawartość. Jeśli przekazalibyśmy mu coś, co nie jest Promisem, otrzymalibyśmy `never`.

### Wiele inferencji

Słowo kluczowe `infer` może się w jednym wyrażeniu pojawić wiele razy, na różnych pozycjach. Co ciekawe, może dotyczyć tego samego typu albo wielu różnych typów. Zacznijmy od tego drugiego przypadku. Weźmy typ podobny do tego, który znany jest każdej osobie piszącej JavaScript na frontendzie z użyciem React:

```ts
type Component<Props, State> = {
  props: Props;
  state: State;
};
```

Możemy teraz bez problemu stworzyć typ warunkowy, który wydobędzie `Props` i `State`:

```ts
type GetStateAndProps<C> = C extends Component<infer Props, infer State> ? [Props, State] : never;

const c = {
  props: 123,
  state: 'aa',
};
type t23 = GetStateAndProps<typeof c>;
// [number, string]
```

W tym przypadku mamy do czynienia z inferencją `props` i `state`, a wynikiem jest tupla ich typów. Operatora `infer` można używać również w więcej niż dwóch miejscach, aby otrzymać typy z naprawdę złożonych generyków. Taki kod rzadko pisze się samemu, ale używają go różne biblioteki, aby zapewnić nam większą wygodę i bezpieczeństwo.

### Inferencja tego samego typu

Możliwe jest również nakazanie TypeScriptowi wnioskowania tego samego typu w różnych miejscach. Rezultatem będzie unia lub część wspólna, w zależności od pozycji tych typów. Aby ustalić, z którym z tych dwóch przypadków mamy do czynienia, przyda nam się wiedza na temat kowariancji i kontrawariancji, gdyż okazuje się, że to właśnie od tego zależy, jaki typ zostanie wywnioskowany! Te trudne pojęcia – [kowariancję i kontrawariancję – dokładnie opisałem w książce](https://typeofweb.com/napisalem-ksiazke-kilka-slow-o-typescript-na-powaznie/). Mówiąc krótko, producenci (funkcje tworzące coś) są kowariantni, a konsumenci (funkcje, które coś przyjmują) są kontrawariantni.

Na potrzeby tego wpisu załóżmy, że istnieją dwa typy `Covariant<T>` i `Contravariant<T>`. Teraz możemy spróbować inferować typy różnej wariancji i posłużą nam do tego obiekty z metodami `createUser` i `createModerator` oraz `saveUser` i `saveModerator`:

```ts
type GetCovariantType<T> = T extends {
  createUser: Covariant<infer R>;
  createModerator: Covariant<infer R>;
}
  ? R
  : never;

type GetContravariantType<T> = T extends {
  saveUser: Contravariant<infer R>;
  saveModerator: Contravariant<infer R>;
}
  ? R
  : never;
```

```ts
const repository1 = {
  createUser: (): User => ({
    name: 'Michał',
    age: 21,
  }),
  createModerator: (): Moderator => ({
    name: 'Kasia',
    age: 19,
    channels: [],
  }),
};

type t24 = GetCovariantType<typeof repository1>;
// { name: string; age: number; }
// czyli User | Moderator

const repository2 = {
  saveUser: (x: User) => {},
  saveModerator: (x: Moderator) => {},
};

type t25 = GetContravariantType<typeof repository2>;
// User & Moderator
```

W rezultacie do `t24` przypisane zostanie `User | Moderator`, natomiast do `t25` – `User & Moderator`. Dzieje się tak właśnie dlatego, że w pierwszym przypadku inferowany typ znalazł się na pozycji kowariantnej, a w drugim na kontrawariantnej. Znów, takiego kodu nie pisze się codziennie, ale niemal codziennie się go używa za pośrednictwem różnych bibliotek. Dlatego warto znać ogólny mechanizm i zasady działania operatora `infer` w różnych kontekstach.

## Podsumowanie

_Conditional Types_ dają ogromne możliwości tworzenia bardzo rozbudowanych i skomplikowanych konstrukcji opartych o zaawansowane typy. Są one niezwykle przydatne między innymi przy tworzeniu walidatorów. W książce pokazuję bardzo konkretny i z życia wzięty [sposób na dedukowanie typu zmiennej na podstawie przypisanego do niej walidatora](https://typescriptnapowaznie.pl/). Łączę tam świat typów w czasie kompilacji ze sprawdzaniem wartości w trakcie działania aplikacji i udaje się to bez duplikowania kodu, a to częsta bolączka osób zaczynających pracę z TS! Służą do tego właśnie typy warunkowe.
