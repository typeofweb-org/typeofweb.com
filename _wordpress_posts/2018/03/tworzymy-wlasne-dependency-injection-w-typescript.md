---
title: Tworzymy własne Dependency Injection w TypeScript
date: 2018-03-15T00:14:33.000Z
isMarkdown: false
status: publish
permalink: tworzymy-wlasne-dependency-injection-w-typescript
authors:
  - michal-miszczyszyn
type: post
thumbnail:
  url: /public/assets/wp-content/uploads/2018/02/pexels-photo-248921.jpeg
  width: 1280
  height: 960
categories:
  - slug: javascript
    name: JavaScript
  - slug: dobry-kod
    name: Dobry Kod
seo:
  metadesc: >-
    Dependency Injection w TypeScript z użyciem dekoratorów. Najlepiej uczy się
    na konkretnych przykładach. Dzisiaj napiszesz własną bibliotekę do
    Dependency Injection w TypeScripcie! Przydadzą nam się dekoratory, metadane,
    refleksja i kilka sztuczek. Do dzieła :)
---

Najlepiej uczy się na konkretnych przykładach. Dzisiaj napiszesz własną bibliotekę do Dependency Injection w TypeScripcie! Przydadzą nam się dekoratory, metadane, refleksja i kilka sztuczek. Do dzieła :)

---

<h2>Zaczynamy</h2>

<p class="important">Upewnij się, że masz zainstalowaną najnowszą wersję TypeScript (aktualnie 2.7.0). Do szybkiego testowania kodu przyda się też <code>ts-node</code>, więc warto go doinstalować.</p>

Zaczynam od skonfigurowania projektu w TypeScripcie. To nigdy nie było prostsze niż teraz:

<pre><code class="language-bash">npm init
tsc init --strict</code></pre>

Następnie tworzę dwa pliki: <code>index.ts</code> i <code>injector.ts</code>. W tym pierwszy zawrę kod mojej „aplikacji”, a w tym drugim zaimplementuję Dependency Injection.

<h2>Plan</h2>

Zasada działania dependency injection nie jest trudna i opisałem ją niegdyś w artykule:

https://typeofweb.com/wzorce-projektowe-dependency-injection/

Zanim jednak zacznę cokolwiek programować, warto byłoby mieć jakiś plan ;) Oto moje potrzeby i wymagania:

<ul>
    <li>możliwość rejestrowania zależności</li>
    <li>możliwość instancjonowania klas razem z automatycznie wstrzykniętymi zależnościami</li>
</ul>

Przykładowy kod:

<pre><code class="language-typescript">class Foobar {
  constructor(public foo: Foo, public bar: Bar) {}
}

const foobar = Injector.resolve(Foobar);
foobar.foo; // jest tutaj wstrzyknięty!
foobar.bar; // też jest tutaj!</code></pre>

Nie brzmi strasznie, prawda? Aby zrealizować te dwa podpunkty muszę jednak skorzystać z techniki zwanej <strong>refleksją</strong>.

<h2>Refleksja</h2>

Pragnę, aby w moim Dependency Injection  zależności były wstrzykiwane automatycznie na podstawie typu argumentów przekazanych do konstruktora. Z pomocą przychodzi właśnie refleksja oraz paczka <code>reflect-metadata</code>:

<pre><code>npm install reflect-metadata --save</code></pre>

Służy ona do wydobywania pewnych metadanych z obiektów. Te metadane są dodawane do, między innymi, klas, <strong>na których użyto jakiegoś dekoratora</strong>. Nie wnikam na razie w powody takiego stanu rzeczy, wiem tylko jedno: <strong>Na każdej klasie, którą chcę wstrzykiwać, muszę użyć dekoratora</strong>.

<h2>Dekorator</h2>

Dekorator to po prostu funkcja, która przyjmuje jako argument np. klasę i może ją zmodyfikować. Nic szczególnego, prawda? Brzmi prosto. Najprostszy dekorator wygląda tak:

<pre><code>const Injectable = Target =&gt; {}</code></pre>

a wykorzystać go można w ten sposób:

<pre><code class="language-typescript">@Injectable
class X {}</code></pre>

Możliwe jest też stworzenie <strong>fabryki dekoratorów</strong>, czyli funkcji, która zwraca dekorator. Jest to rozwiązanie znacznie bardziej popularne, bo daje dużo szersze możliwości:

<pre><code class="language-typescript">const Injectable = () =&gt; {
  return Target =&gt; {};
};
@Injectable()
class X {}</code></pre>

Z tej formy będę też korzystał dalej.

<h3>Dekoratory a typy?</h3>

Domyślnie TypeScript dostarcza jeden typ <code>ClassDecorator</code> — ale jest on dość ograniczony bo przede wszystkim nie jest generyczny. Dlatego napiszę kilka własnych typów do tego. Na początek potrzebuję typ dla „czegoś co mogę wywołać <code>new</code>” — czyli dla klasy albo konstruktora. Zapisuję to w ten sposób:

<pre><code class="language-typescript">interface Constructor&lt;T&gt; {
  new (...args: any[]): T;
}</code></pre>

przyda się też nieco bardziej rozbudowany typ dla dekoratora klasy:

<pre><code>type ClassDecorator&lt;T extends Function&gt; = (Target: Constructor&lt;T&gt;) =&gt; T | void;</code></pre>

Czyli jest to typ generyczny, który jako argument typu T przyjmuje coś co rozszerza funkcję (czyli funkcję lub klasę). <code>ClassDecorator&lt;T&gt;</code> opisuje funkcję, która jako argument przyjmuje <code>Constructor&lt;T&gt;</code> i zwraca <code>T</code>.

Ostatecznie mój dekorator <code>Injectable</code> przyjmuje taką postać:

<pre><code class="language-typescript">export const Injectable = (): ClassDecorator&lt;any&gt; =&gt; {
  return target =&gt; {};
};</code></pre>

<h2>Injector</h2>

Mam już dekorator, a więc mam też metadane. Teraz mogę napisać serwis — <code>Injector</code> — który będzie odpowiedzialny za tworzenie instancji klas wraz ze wstrzykniętymi zależnościami. <code>Injector</code> będzie singletonem z jedną tylko metodą — <code>resolve&lt;T&gt;(Target: Constructor&lt;T&gt;): T</code>.

<h3>Pobieranie typów</h3>

Na początek pobieram typy argumentów przekazanych do konstruktora <code>Target</code>:

<pre><code>Reflect.getMetadata('design:paramtypes', Target)</code></pre>

Ta metoda zwraca <strong>tablicę konstruktorów</strong>. Przykładowo, załóżmy że mam klasy <code>Foo</code> oraz <code>Bar</code>, a klasa <code>X</code> wymaga ich w konstruktorze:

<pre><code class="language-typescript">@Injectable()
class X {
  constructor(foo: Foo, bar: Bar) {}
}
Reflect.getMetadata('design:paramtypes', X); // [Foo, Bar]</code></pre>

<h3>Tworzenie zależności</h3>

Teraz dla każdego argumentu muszę wywołać <code>Injector.resolve(…)</code> — na wypadek gdyby np. <code>Foo</code> również miało w konstruktorze jakieś zależności. Następnie sprawdzone zostaną zależności <code>Foo</code>, a potem zależności zależności <code>Foo</code>, a potem zależności zależności zależności <code>Foo</code>… i tak dalej. Gdy już dojdę do klasy, która nie ma żadnych zależności — muszę po prostu stworzyć jej instancję przez <code>new</code>. Brzmi skomplikowanie? Nie, to tylko kilka linii kodu:

<pre><code class="language-typescript">export const Injector = new class {
  resolve&lt;T&gt;(Target: Constructor&lt;T&gt;): T {
    const requiredParams = Reflect.getMetadata('design:paramtypes', Target) || [];
    const resolvedParams = requiredParams.map((param: any) =&gt; Injector.resolve(param));
    const instance = new Target(...resolvedParams);
    return instance;
  }
}();</code></pre>

<h2>Efekt</h2>

Testy prostego DI:

<pre><code class="language-typescript">import { Injector, Injectable, Constructor } from './src/injector';

@Injectable()
class NoDeps {
  doSth() {
    console.log(`I'm NoDeps!`);
  }
}

@Injectable()
class OneDep {
  constructor(public noDeps: NoDeps) {}
  doSth() {
    console.log(`I'm OneDep!`);
  }
}

@Injectable()
class MoarDeps {
  constructor(public noDeps: NoDeps, public oneDep: OneDep) {}
  doSth() {
    console.log(`I'm MoarDeps!`);
  }
}

const moarDeps = Injector.resolve(MoarDeps);

moarDeps.doSth();
moarDeps.noDeps.doSth();
moarDeps.oneDep.doSth();
moarDeps.oneDep.noDeps.doSth();</code></pre>

Oraz efekt działania:

<pre><code>I'm MoarDeps!
I'm NoDeps!
I'm OneDep!
I'm NoDeps!</code></pre>

<h2>Podsumowanie</h2>

Jak widzisz, wszystkie zależności zostały automatycznie wstrzyknięte na podstawie typów klas przekazanych do konstruktora! Great success! 😎

Cały kod znajdziesz tutaj: <a href="https://github.com/typeofweb/typeofweb-dependency-injection-typescript">github.com/typeofweb/typeofweb-dependency-injection-typescript</a>

Nie obsługuję jednak kilku rzeczy:

<ul>
    <li>circular dependencies (gdy Foo zależy od Bar, a Bar od Foo)</li>
    <li>innych typów niż własne klasy</li>
    <li>nie cache'uję stworzonych instancji klas, więc przy każdym wstrzyknięciu tworzone są nowe (to może być problem!)</li>
    <li>nie daję możliwości łatwego mockowania klas w injectorze (często ważny element DI)</li>
</ul>

W kolejnym wpisie postaram się dopisać coś z tej listy ;)

<h2>Podobało się?</h2>

Napisz w komentarzu! Jeśli uważasz, że to kompletnie bzdury — to również napisz :) Albo może <a href="https://szkolenia.typeofweb.com/" target="_blank">zapisz się na szkolenie z TypeScript</a>.
