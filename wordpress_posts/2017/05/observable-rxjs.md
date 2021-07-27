---
id: 38
index: 27
title: Observable – rxjs 5
date: 2017-05-19T18:57:00.000Z
isMarkdown: true
status: publish
permalink: observable-rxjs
authors:
  - michal-miszczyszyn
guid: https://typeofweb.com/2017/05/19/observable-rxjs/
type: post
thumbnail:
  url: https://typeofweb.com/wp-content/uploads/2017/05/pexels-photo-237258.jpeg
  width: 887
  height: 400
categories:
  - slug: javascript
    name: JavaScript
seo: {}
---

To nie będzie wpis na temat teorii reaktywnego programowania funkcyjnego. Nie jest to też wyciąg z dokumentacji rxjs. Ten wpis jest krótkim praktycznym wprowadzeniem do Obserwabli na przykładzie. Zaczynajmy!

<p class="important">W tym wpisie używam <code>rxjs 5</code> i określenie <code>Observable</code> odnosi się właśnie do tej biblioteki. <a href="http://reactivex.io/rxjs/">Dokumentacja rxjs 5</a>.</p>

<h1 id="teoria">Teoria</h1>
Wszystko co chcę Wam powiedzieć na temat teorii zawiera się w jednym zdaniu:
<blockquote>Reaktywne programowanie jest programowaniem z asynchronicznymi strumieniami danych.</blockquote>
BTW: Jest to własne tłumaczenie fragmentu artykułu <a href="https://gist.github.com/staltz/868e7e9bc2a7b8c1f754">"The introduction to Reactive Programming you've been missing"</a>

Ale co to w ogóle oznacza? <strong>Jeśli tylko w Twojej aplikacji cokolwiek dzieje się asynchronicznie, to Observable prawdopodobnie może Ci w to ułatwić.</strong> To pewnie brzmi jak reklama dziesiątek innych bibliotek i rozwiązań. W czym więc Observable wygrywa?

<ul>
 	<li>Observable to tak naprawdę <strong>wzorzec obserwatora</strong> z bajerami. Jednocześnie jest to już <em>de facto</em> standard, składnia jest popularna i powszechnie znana</li>
 	<li>Observable pozwala w ten sam sposób obsługiwać różne rodzaje asynchronicznych zdarzeń, zarówno pojedyncze (jak żądanie http) jak i wielokrotne (jak ruchy kursorem)</li>
 	<li><strong>Do tego możliwe jest łączenie różnych źródeł observabli, mieszanie ich, filtrowanie, transformowanie…</strong></li>
 	<li><code>Observable</code> prawdopodobnie niedługo będzie częścią JavaScriptu (<a href="https://github.com/tc39/proposal-observable">link do propozycji specyfikacji</a>)</li>
 	<li>Observable mogą być używane razem z najpopularniejszymi frameworkami: Angular 2 (domyślnie) oraz React/Redux (np. dzięki <code>redux-observable</code>)</li>
</ul>
<h1 id="praktyka">Praktyka</h1>
No dobrz. Na razie jest trochę sucho, pewnie nikogo nie przekonałem do używania Observabli tym wprowadzeniem :) Bo właściwie… po co? Popatrzmy więc na bardzo prosty przykład.
<h2 id="obserwablezezdarze">Obserwable ze zdarzeń</h2>
Chciałbym, aby po kliknięciu w przycisk pojawiała się losowa liczba. W czystym JS jest to bardzo łatwe:
<pre><code class="language-javascript">const output = document.querySelector('output');  
const button = document.querySelector('button');

button  
 .addEventListener('click', () =&gt; {
output.textContent = Math.random().toString();
});
</code></pre>
Mamy tutaj asynchroniczne zdarzenia, więc powinniśmy móc zamienić ten kod na observable. Tworzymy pierwszą observablę w życiu:

<pre><code class="language-javascript">const output = document.querySelector('output');  
const button = document.querySelector('button');

Rx.Observable  
    .fromEvent(button, 'click')
    .subscribe(() =&gt; {
        output.textContent = Math.random().toString();
    });
</code></pre>
<p class="codepen" data-height="265" data-theme-id="0" data-slug-hash="KmQyJL" data-default-tab="js,result" data-user="mmiszy" data-embed-version="2" data-pen-title="Observables 1">Zobacz Pen <a href="https://codepen.io/mmiszy/pen/KmQyJL/">Observables 1</a> by Michał Miszczyszyn (<a href="http://codepen.io/mmiszy">@mmiszy</a>) na <a href="http://codepen.io">CodePen</a>.</p>
<img src="/content/images/2017/05/--51.png" alt="WOW" />

Wow, nasze pierwsze obserwable :) Szkoda tylko, że na razie nie widać absolutnie żadnych zalet w stosunku do czystego JS. A skoro nie widać różnicy… i tak dalej. Dodajmy więc kolejne wymagania do naszego projektu: tylko co trzecie kliknięcie ma zmieniać wyświetlaną liczbę.

<pre><code class="language-javascript">Rx.Observable  
    .fromEvent(button, 'click')
    .bufferCount(3) // !
    .subscribe((res) =&gt; {
        output.textContent = Math.random().toString();
    });
</code></pre>
<p class="codepen" data-height="265" data-theme-id="0" data-slug-hash="gWvoYj" data-default-tab="js,result" data-user="mmiszy" data-embed-version="2" data-pen-title="Observables 2">Zobacz Pen <a href="https://codepen.io/mmiszy/pen/gWvoYj/">Observables 2</a> by Michał Miszczyszyn (<a href="http://codepen.io/mmiszy">@mmiszy</a>) na <a href="http://codepen.io">CodePen</a>.</p>
Jakby to wyglądało w czystym JS? Na pewno byłoby nieco dłuższe. <strong>Tutaj pojawia się cała moc Observabli: operatory</strong>. Jest ich mnóstwo i nie sposób wszystkie zapamiętać, jednak dają one przeogromne, właściwie nieskończone możliwości! W tym przypadku dzięki <a href="http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-bufferCount"><code>bufferCount</code></a> zbieramy (buforujemy) 3 zdarzenia i dopiero wtedy je emitujemy w postaci tablicy.

Ale w zasadzie to wymaganie 3 kliknięć łatwo też napisać w czystym JS. Zmieńmy je nieco: Niech to będą 3 kliknięcia, ale tylko w krótkim czasie 400ms. Czyli coś w stylu potrójnego kliknięcia:

<pre><code class="language-javascript">const click$ = Rx.Observable.fromEvent(button, 'click');

click$  
    .bufferWhen(() =&gt; click$.delay(400)) // ! w ciągu 400 ms
    .filter(events =&gt; events.length &gt;= 3) // ! tylko 3 kliknięcia lub więcej
    .subscribe((res) =&gt; {
        output.textContent = Math.random().toString();
    });
</code></pre>
<p class="codepen" data-height="265" data-theme-id="0" data-slug-hash="RVQxZe" data-default-tab="js,result" data-user="mmiszy" data-embed-version="2" data-pen-title="Observables 3">Zobacz Pen <a href="https://codepen.io/mmiszy/pen/RVQxZe/">Observables 3</a> by Michał Miszczyszyn (<a href="http://codepen.io/mmiszy">@mmiszy</a>) na <a href="http://codepen.io">CodePen</a>.</p>
<a href="http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-bufferWhen"><code>bufferWhen</code></a> zbiera wszystkie kliknięcia aż do momentu gdy przekazana funkcja coś wyemituje. Ta robi to dopiero po 400ms po kliknięciu. A więc razem te dwa operatory powodują, że <strong>po upływie 400ms od pierwszego kliknięcia, zostanie wyemitowania tablica ze wszystkimi kliknięciami w tym czasie</strong>. Następnie używamy <code>filter</code> aby sprawdzić czy kliknięto 3 lub więcej razy. Czy teraz wydaje się to bardziej interesujące?
<h2 id="tworzenieobservabli">Tworzenie observabli</h2>
Muszę przy okazji wspomnieć, że sposobów na tworzenie observabli jest bardzo wiele. Jeden z nich to poznany już <a href="http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#static-method-fromEvent"><code>fromEvent</code></a>. Ale ponadto, między innymi, <strong>możemy automatycznie przekształcić dowolny Promise w Observable</strong> przy użyciu funkcji <a href="http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#static-method-fromPromise"><code>Rx.Observable.fromPromise(…)</code></a>, albo dowolny callback dzięki <a href="http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#static-method-bindCallback"><code>Rx.Observable.bindCallback(…)</code></a> lub <a href="http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#static-method-bindNodeCallback"><code>Rx.Observable.bindNodeCallback(…)</code></a>. <strong>Dzięki temu praktycznie dowolne API dowolnej biblioteki możemy zaadaptować na Observable</strong>.
<h2 id="http">HTTP</h2>
Jeśli masz ulubioną bibliotekę do obsługi żądań http, jak choćby <code>fetch</code>, możesz ją łatwo zaadaptować na Observable. Jednak możesz też skorzystać z metody <code>Rx.Observable.ajax</code> i na potrzeby tego wpisu ja tak właśnie zrobię.

Okej, prosty przykład, pobieramy listę postów z API i ją wyświetlamy. Renderowanie nie jest tematem tego posta, więc tutaj je pominę, a samo pobieranie jest tak proste jak:

<pre><code class="language-javascript">const postsApiUrl = `https://jsonplaceholder.typicode.com/posts`;

Rx.Observable  
    .ajax(postsApiUrl)
    .subscribe(
      res =&gt; console.log(res),
      err =&gt; console.error(err)
    );
</code></pre>

<em>Voilà</em>! To jest aż tak proste! Dodałem tutaj też <strong>drugi argument do funkcji <code>subscribe</code>, który służy do obsługi błędów</strong>. Okej, co teraz możemy z tym zrobić? Niech po każdym kliknięciu przycisku zostaną pobrane posty losowego użytkownika:

<pre><code class="language-javascript">Rx.Observable  
  .fromEvent(button, "click")
  .flatMap(getPosts)
  .subscribe(
      render,
      err =&gt; console.error(err)
    );

function getPosts() {  
  const userId = Math.round(Math.random() * 10);
  return Rx.Observable.ajax(
    `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
  );
}
</code></pre>

Użyłem tutaj funkcji <a href="http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-mergeMap"><code>flatMap</code></a> (zwanej też <code>mergeMap</code>), która dla każdego zdarzenia (kliknięcia) wywoła funkcję <code>getPosts</code> i poczeka na jej rezultat.

<p class="important">We <a href="https://typeofweb.com/2017/05/12/map-i-reduce-w-js/">wpisie dotyczącym tablic i map/reduce</a> opisałem też funkcję <code>flatMap</code>. Tam zamieniała <code>Array&lt;Array&lt;T&gt;&gt;</code> na <code>Array&lt;U&gt;</code>, a w tym przypadku zamienia ona <code>Observable&lt;Observable&lt;T&gt;&gt;</code> na <code>Observable&lt;U&gt;</code>. Czy teraz widoczny jest sens poprzedniego wpisu?</p>
Zobaczmy to na żywo:
<p class="codepen" data-height="265" data-theme-id="0" data-slug-hash="YVeeKg" data-default-tab="js,result" data-user="mmiszy" data-embed-version="2" data-pen-title="Observables 4">Zobacz Pen <a href="https://codepen.io/mmiszy/pen/YVeeKg/">Observables 4</a> by Michał Miszczyszyn (<a href="http://codepen.io/mmiszy">@mmiszy</a>) na <a href="http://codepen.io">CodePen</a>.</p>
Super! ;) Jednak występuje tutaj pewien problem: Wielokrotne kliknięcie na przycisk powoduje nieprzyjemny efekt wyrenderowania listy wielokrotnie. Do tego tak naprawdę nie mamy pewności, czy ostatnio pobrane dane zostaną wyrenderowane jako ostatnie… jeśli szybko klikniemy kilka razy, niemal jednocześnie zostanie wysłanych wiele żądań, a opóźnienia mogą sprawić, że żądanie wysłane wcześniej zwróci odpowiedź później… <strong>Jest to znany, częsty problem tzw. <em>race conditions</em></strong>.

Rozwiązanie go przy pomocy czystego JS nie jest takie trywialne. Musielibyśmy przechowywać ostatnio wykonane żądanie, a od poprzednich się odsubskrybować. Do tego przydałoby się poprzednie żądania anulować… tu przydaje się kolejny operator z rxjs: <a href="http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-switchMap"><code>switchMap</code></a>. Dzięki niemu <strong>nie tylko automatycznie zostanie wyrenderowany tylko ostatnio pobrany zestaw danych, ale także poprzednie żądania będą anulowane</strong>:

<img src="/content/images/2017/05/Screenshot-2017-05-11-00.41.12.png" alt="canceled http request" />
<p class="codepen" data-height="265" data-theme-id="0" data-slug-hash="bWvbGd" data-default-tab="js,result" data-user="mmiszy" data-embed-version="2" data-pen-title="Observables 5">Zobacz Pen <a href="https://codepen.io/mmiszy/pen/bWvbGd/">Observables 5</a> by Michał Miszczyszyn (<a href="http://codepen.io/mmiszy">@mmiszy</a>) na <a href="http://codepen.io">CodePen</a>.</p>

<h1 id="observablezrnychrde">Observable z różnych źródeł</h1>
Skoro umiemy już tak dużo to może teraz rozbudujemy nieco naszą aplikację. Damy użytkownikowi możliwość wpisania ID usera od 1 do 10 (<code>input</code>) oraz wybór zasobu, który ma zostać pobrany: posts, albums, todos (<code>select</code>). Po zmianie dowolnego z tych pól żądanie powinno zostać wysłane automatycznie. Jest to praktycznie kopia 1:1 funkcji, którą ostatnio implementowałem w aplikacji dla klienta. Na początek definiujemy obserwable na podstawie zdarzeń <code>input</code> i <code>change</code> dla selecta i inputa:
<pre><code class="language-javascript">const id$ = Rx.Observable  
  .fromEvent(input, "input")
  .map(e =&gt; e.target.value);

const resource$ = Rx.Observable  
 .fromEvent(select, "change")
.map(e =&gt; e.target.value);
</code></pre>
Od razu też mapujemy każde zdarzenie na wartość inputa/selecta. Następnie łączymy obie obserwable w taki sposób, aby po zmianie dowolnej z nich, zostały pobrane wartości obu. Używamy do tego <a href="http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-combineLatest"><code>combineLatest</code></a>:

<pre><code class="language-javascript">Rx.Observable  
  .combineLatest(id$, resource$)
  .switchMap(getPosts)
  .subscribe(render);
</code></pre>

Co istotne, funkcja <code>combineLatest</code> nie wyemituje niczego dopóki obie observable (<code>id$</code> i <code>resource$</code>) nie wyemitują przynajmniej jednej wartości. Innymi słowy, nic się nie stanie dopóki nie wybierzemy wartości w obu polach.

<p class="codepen" data-height="265" data-theme-id="0" data-slug-hash="ZKxzvr" data-default-tab="js,result" data-user="mmiszy" data-embed-version="2" data-pen-title="Observables 6">Zobacz Pen <a href="http://codepen.io/mmiszy/pen/ZKxzvr/">Observables 6</a> by Michał Miszczyszyn (<a href="http://codepen.io/mmiszy">@mmiszy</a>) na <a href="http://codepen.io">CodePen</a>.</p>

<h1 id="podsumowanie">Podsumowanie</h1>
W zasadzie o obserwablach nie powiedziałem jeszcze za dużo. Chciałem szybko przejść do przykładu i pokazać coś praktycznego. Czy mi się to udało?

Jako bonus zmieniam ostatni kod i nieco inaczej obsługuję pole input. Pytanie czy i dlaczego jest to lepsze?

<pre><code class="language-javascript">const id$ = Rx.Observable  
  .fromEvent(input, "input")
  .map(e =&gt; e.target.value)
  .filter(id =&gt; id &gt;= 1 &amp;&amp; id &lt;= 10)
  .distinctUntilChanged()
  .debounceTime(200);
</code></pre>
