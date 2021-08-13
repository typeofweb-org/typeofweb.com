---
index: 27
title: Observable – rxjs 5
date: 2017-05-19T18:57:00.000Z
isMarkdown: false
status: publish
permalink: observable-rxjs
authors:
  - michal-miszczyszyn
type: post
thumbnail:
  url: https://res.cloudinary.com/type-of-web/wp-content/uploads/2017/05/pexels-photo-237258.jpeg
  width: 887
  height: 400
categories:
  - slug: javascript
    name: JavaScript
seo: {}
---

To nie będzie wpis na temat teorii reaktywnego programowania funkcyjnego. Nie jest to też wyciąg z dokumentacji rxjs. Ten wpis jest krótkim praktycznym wprowadzeniem do Obserwabli na przykładzie. Zaczynajmy!

<CodepenWidget height="265" themeId="0" slugHash="KmQyJL" defaultTab="js,result" user="mmiszy" embedVersion="2" penTitle="Observables 1">
<a href="http://codepen.io/mmiszy/pen/KmQyJL/">Zobacz Codepen Observables 1</a>.
</CodepenWidget>

<img src="https://res.cloudinary.com/type-of-web/content/images/2017/05/--51.png" alt="WOW" />

Wow, nasze pierwsze obserwable :) Szkoda tylko, że na razie nie widać absolutnie żadnych zalet w stosunku do czystego JS. A skoro nie widać różnicy… i tak dalej. Dodajmy więc kolejne wymagania do naszego projektu: tylko co trzecie kliknięcie ma zmieniać wyświetlaną liczbę.

<pre><code class="language-javascript">Rx.Observable  
    .fromEvent(button, 'click')
    .bufferCount(3) // !
    .subscribe((res) =&gt; {
        output.textContent = Math.random().toString();
    });
</code></pre>

<CodepenWidget height="265" themeId="0" slugHash="gWvoYj" defaultTab="js,result" user="mmiszy" embedVersion="2" penTitle="Observables 2">
<a href="http://codepen.io/mmiszy/pen/gWvoYj/">Zobacz Codepen Observables 2</a>.
</CodepenWidget>

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

<CodepenWidget height="265" themeId="0" slugHash="RVQxZe" defaultTab="js,result" user="mmiszy" embedVersion="2" penTitle="Observables 3">
<a href="http://codepen.io/mmiszy/pen/RVQxZe/">Zobacz Codepen Observables 3</a>.
</CodepenWidget>

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

<CodepenWidget height="265" themeId="0" slugHash="YVeeKg" defaultTab="js,result" user="mmiszy" embedVersion="2" penTitle="Observables 4">
<a href="http://codepen.io/mmiszy/pen/YVeeKg/">Zobacz Codepen Observables 4</a>.
</CodepenWidget>

Super! ;) Jednak występuje tutaj pewien problem: Wielokrotne kliknięcie na przycisk powoduje nieprzyjemny efekt wyrenderowania listy wielokrotnie. Do tego tak naprawdę nie mamy pewności, czy ostatnio pobrane dane zostaną wyrenderowane jako ostatnie… jeśli szybko klikniemy kilka razy, niemal jednocześnie zostanie wysłanych wiele żądań, a opóźnienia mogą sprawić, że żądanie wysłane wcześniej zwróci odpowiedź później… <strong>Jest to znany, częsty problem tzw. <em>race conditions</em></strong>.

Rozwiązanie go przy pomocy czystego JS nie jest takie trywialne. Musielibyśmy przechowywać ostatnio wykonane żądanie, a od poprzednich się odsubskrybować. Do tego przydałoby się poprzednie żądania anulować… tu przydaje się kolejny operator z rxjs: <a href="http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-switchMap"><code>switchMap</code></a>. Dzięki niemu <strong>nie tylko automatycznie zostanie wyrenderowany tylko ostatnio pobrany zestaw danych, ale także poprzednie żądania będą anulowane</strong>:

<img src="https://res.cloudinary.com/type-of-web/content/images/2017/05/Screenshot-2017-05-11-00.41.12.png" alt="canceled http request" />

<CodepenWidget height="265" themeId="0" slugHash="bWvbGd" defaultTab="js,result" user="mmiszy" embedVersion="2" penTitle="Observables 5">
<a href="http://codepen.io/mmiszy/pen/bWvbGd/">Zobacz Codepen Observables 5</a>.
</CodepenWidget>

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

<CodepenWidget height="265" themeId="0" slugHash="ZKxzvr" defaultTab="js,result" user="mmiszy" embedVersion="2" penTitle="Observables 6">
<a href="http://codepen.io/mmiszy/pen/ZKxzvr/">Zobacz Codepen Observables 6</a>.
</CodepenWidget>

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
