---
id: 39
index: 26
title: Map i Reduce w JS
date: 2017-05-12T12:12:03.000Z
status: publish
permalink: map-i-reduce-w-js
authors:
  - michal-miszczyszyn
guid: https://typeofweb.com/index.php/2017/05/12/map-i-reduce-w-js/
type: post
thumbnail:
  url: https://typeofweb.com/wp-content/uploads/2017/05/haskell-logo.png
  width: 871
  height: 400
categories:
  - slug: javascript
    name: JavaScript
seo: {}
---

Napisałem artykuł o obserwablach, ale czegoś mi w nim zabrakło: Objaśnienia tak podstawowych pojęć i funkcji jak <code>map</code> i <code>reduce</code>. Observable na blogu pojawią się wkrótce, a ten krótki wpis ma na celu tylko lekkie wprowadzenie. Bardzo krótko i pobieżnie.

Jeśli oczekujesz zgłębiania programowania funkcyjnego w JS to natychmiast zamknij ten wpis. Nie jest dla Ciebie!

<p class="important"><code>MapReduce</code> to także nazwa konceptu w programowaniu, który polega na dzieleniu danych i zrównolegleniu oraz rozproszeniu wykonywanych na nich operacji map/reduce. Jest to podejście zaimplementowane m.in. w Hadoop czy nawet MongoDB. Ten wpis jednak o nich nie mówi.</p>

<h1 id="mapireducewjs"><code>map</code> i <code>reduce</code> w JS</h1>
Jeśli nie używasz jeszcze funkcji map i reduce w JavaScripcie, to czas najwyższy zacząć :) Wykorzystanie tych dwóch metod może sprawić, że Twój kod będzie znacznie czystszy i bardziej czytelny, a zrozumienie go będzie łatwiejsze. <strong>No i będziesz bardziej <em>cool</em></strong>.
<h1 id="map">Map</h1>
Funkcja map jest jedną z bardziej rozpoznawalnych metod programowania funkcyjnego<sup id="fnref:1"><a href="#fn:1" rel="footnote">1</a></sup>. Służy do operowania i transformowania wszystkich elementów w tablicy.
<p class="important">Map przyjmuje tablicę, transformuje i zwraca tablicę o tej samej długości.</p>
W JS ta funkcja to <code>Array.prototype.map</code> i wywołujemy ją np. w ten sposób:
<pre><code class="language-javascript">const arr = [2, 6, 10];

arr.map(x =&gt; x \* x) // [4, 36, 100]  
</code></pre>
Tutaj tablicę z liczbami zamieniam (mapuję) na tablicę z kwadratami tych liczb.

<h1 id="reduce">Reduce</h1>
Reduce to fundament programowania funkcyjnego<sup id="fnref:1"><a href="#fn:1" rel="footnote">1</a></sup>. Podobnie do map, operuje na elementach tablicy, jednak zamiast kolejnej tablicy zwraca tylko pojedynczą wartość.
<p class="important">Reduce przyjmuje tablicę, transformuje i zwraca jedną wartość.</p>
W JS ta funkcja to <code>Array.prototype.reduce</code> i wywołujemy ją np. w ten sposób:
<pre><code class="language-javascript">const arr = [2, 6, 10];

arr.reduce((x, y) =&gt; x + y) // 18  
</code></pre>
Tutaj obliczam sumę liczb w tablicy.

<h1 id="mapireduce">Map i reduce</h1>
Oczywiście Map i Reduce możemy łączyć (<em>chain</em>). Weźmy poprzedni przykład, chcemy policzyć sumę kwadratów liczb w tablicy:
<pre><code class="language-javascript">const arr = [2, 6, 10];

arr  
 .map(x =&gt; x \* x) // [4, 36, 100]
.reduce((x, y) =&gt; x + y) // 140
</code></pre>
Warto pamiętać o tym, że wewnątrz <code>map</code> i <code>reduce</code> <strong>nie powinny się dziać żadne efekty uboczne</strong>. Funkcje te służą tylko do transformacji jednych danych w drugie! Dzięki temu <strong>możliwa jest bardzo mocna optymalizacja</strong> tych metod i np. współbieżne przetwarzanie danych.

<h2 id="niemutowalno">Niemutowalność</h2>
Bardzo istotnym atrybutem map i reduce jest to, że funkcje te <strong>zwracają nowe wartości i nie modyfikują przekazanej tablicy</strong>. Często jest to bardzo pożądana cecha! Dzięki temu zachowujemy oryginalną tablicę w niezmienionej formie, a inne komponenty, które mogą na niej polegać (hmm, nie powinny, ale to się często zdarza…), nie będą miały problemów z wykonywanymi przez nas operacjami. No, ale wróćmy do map/reduce, niemutowalność to trochę osobny temat, a tu miało być tylko krótkie wprowadzenie :)
<h2 id="implementacjamapwreduce">Implementacja map w reduce</h2>
Napisałem, że reduce jest tutaj fundamentem, gdyż funkcja map jest tak naprawdę redundantna. <strong>Map można zaimplementować korzystając z reduce</strong>!
<pre><code class="language-javascript">function map(array, fn) {  
    return array.reduce((newArray, el) =&gt; [...newArray, fn(el)], [])
}

map([1,2,3], x =&gt; x\*x); // [1, 4, 9]  
</code></pre>
Nie jest to pewnie najwydajniejsza implementacja, ani też wierne odwzorowanie <code>Array.prototype.map</code>, ale ważne, że działa. Teza udowodniona. Skoro wiemy już jak można implementować metody pomocniczne przy pomocy <code>reduce</code>, napiszmy bardzo przydatną funkcję <code>flatMap</code>, która zamienia tablicę tablic wartości w tablicę wartości (przyjmuje <code>Array&lt;Array&lt;T&gt;&gt;</code> i zwraca <code>Array&lt;U&gt;</code>):

<pre><code class="language-javascript">// samo `reduce`
function flatMap(array, fn) {  
    return array.reduce((newArray, el) =&gt; [...newArray, ...fn(el)], [])
}

// alternatywnie `map` i `reduce`
function flatMap(array, fn) {  
    return array
      .map(x =&gt; fn(x))
      .reduce((a1, a2) =&gt; [...a1, ...a2]);
}

// alternatywnie przez `concat` i `map`
function flatMap(array, fn) {  
    return [].concat(...array.map(fn));
}

flatMap([[1,2], [3, 4]], x =&gt; x) // [1, 2, 3, 4]  
flatMap([1,2,3], x =&gt; [x,x]) // [1, 1, 2, 2, 3, 3]  
</code></pre>

Podałem aż trzy alternatywne implementacje, żebyście mogli się bardziej oswoić z map/reduce. Która najbardziej przypada Wam do gustu?

Podobnie możemy też zaimplementować <code>forEach</code>, <code>filter</code>, czy też <code>sum</code>). Implementację ich pozostawiam jako ćwiczenie :)

<h1 id="przykadzyciawzity">Przykład z życia wzięty</h1>
Wyobraźmy sobie, że z API otrzymujemy dane w poniższym formacie:
<pre><code class="language-javascript">const users = [  
    {id: 'a1', email: 'abc@xyz', name: 'Abc'},
    {id: 'b2', email: 'def@xyz', name: 'Def'},
    {id: 'c3', email: 'ghi@xyz', name: 'Ghi'},
    {id: 'd4', email: 'jkl@xyz', name: 'Jkl'},
]
</code></pre>
Czyli tablica obiektów reprezentujących użytkownika. Każdy obiekt zawiera losowe id, email oraz imię. Nasza aplikacja jednak oczekuje innego formatu danych. Interesuje nas tylko ID oraz email i chcielibyśmy mieć je w jednym obiekcie:
<pre><code class="language-javascript">const result = {  
    a1: 'abc@xyz',
    b2: 'def@xyz',
    c3: 'ghi@xyz',
    d4: 'jkl@xyz',
}
</code></pre>
Czy możemy tutaj skorzystać z map i reduce? <strong>Tak!</strong> Najpierw każdego „użytkownika” zmapujemy na obiekt w postaci <code>{[id]: email}</code>, a następnie te obiekty zredukujemy do jednego:
<pre><code class="language-javascript">users  
    .map(user =&gt; ({[user.id]: user.email}))
    .reduce((obj1, obj2) =&gt; Object.assign(obj1, obj2), {})
</code></pre>
<p class="codepen" data-height="450" data-theme-id="0" data-slug-hash="zwWNEV" data-default-tab="js,result" data-user="mmiszy" data-embed-version="2" data-pen-title="map reduce">Zobacz Pen <a href="https://codepen.io/mmiszy/pen/zwWNEV/">map reduce</a> by Michał Miszczyszyn (<a href="http://codepen.io/mmiszy">@mmiszy</a>) on <a href="http://codepen.io">CodePen</a>.</p>

<h1 id="podsumowanie">Podsumowanie</h1>
Jaka jest zaleta tego rozwiązania? Na pewno zwięzłość. Dodatkowo, jak już wspomniałem, możliwe byłoby wykonanie tutaj wszystkich operacji całkowicie równolegle! I o ile prawdopodobnie żaden silnik JavaScript tego teraz nie robi, to jednak warto o tym pamiętać w kontekście innych technologii i języków programowania. <strong>Map reduce to koncept uniwersalny i powszechnie wykorzystywany.</strong>

Jeśli rozumiesz powyższe przykłady i czujesz się swobodnie z <code>map</code> i <code>reduce</code> to prawdopodobnie Observable będą dla Ciebie łatwe do zrozumienia. O tym mój kolejny wpis:

https://typeofweb.com/2017/05/19/observable-rxjs/

<h1 id="dladociekliwych">Dla dociekliwych</h1>
Pomimo, że obiecałem, że będzie prosto i pobieżnie, to jednak warto zastanowić się nad tym jak bardzo uniwersalne koncepty zostały tutaj omówione… Przykładowo, jeśli w opisie funkcji map zamiast słowa „tablica” wstawimy „funktor” to prawdopodobnie nadal wszystko co napisałem będzie prawdą.

Czym jest funktor? Funktor to koncept z teorii kategorii, bardzo abstrakcyjnej gałęzi matematyki, na której bazuje całe programowanie funkcyjne. Teraz w zasadzie nie jest do końca istotne czym funktor jest, ważne co jeszcze jest funktorem… <strong>a funktorami są np. tablica, Promise albo Observable</strong>. Wszystko co tutaj opisałem, mimo że proste, jest bardzo uniwersalne i opisuje tak naprawdę szerokie pojęcia.

Czym na przykład jest funkcja <code>Promise.resolve</code>? To przecież <code>flatMap</code> gdy wywołamy ją na innym obiekcie Promise oraz <code>map</code> gdy na wartości niebędącej Promise. Warto się zastanowić dlaczego i jakie są tego implikacje :)

<div class="footnotes">
<ol>
 	<li id="fn:1" class="footnote">Opinia własna ;) <a title="return to article" href="#fnref:1">↩</a></li>
</ol>
</div>
