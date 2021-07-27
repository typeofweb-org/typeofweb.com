---
id: 586
index: 40
title: 'Promise: 9 rzeczy, których nie wiesz na temat Promise'
date: 2017-10-23T20:09:58.000Z
isMarkdown: true
status: publish
permalink: kilka-faktow-na-temat-promise
authors:
  - michal-miszczyszyn
guid: https://typeofweb.com/?p=586
type: post
thumbnail:
  url: https://typeofweb.com/wp-content/uploads/2017/10/promises-cover.png
  width: 1200
  height: 627
categories:
  - slug: javascript
    name: JavaScript
  - slug: dobry-kod
    name: Dobry Kod
seo:
  focusKeywords:
    - Promise
---

Każdy programista wcześniej czy później ściera się z problemem asynchroniczności. Jest to temat bardzo złożony, nawet w języku jednowątkowym jakim jest JavaScript. Promise jest abstrakcją, która stara się asynchroniczność ukryć oraz sprawić, aby korzystanie z niej było dla nas przyjemniejsze i bardziej przewidywalne.

<!--more-->

Podstawy działania Promise nie są trudne, jednak wiele osób ma problemy ze zrozumieniem ich na samym początku i z załapaniem podstawowych idei. <strong>W tym wpisie przedstawiam kilka faktów i ciekawostek, które wpłynęły na sposób w jaki postrzegam Promise</strong>. Mam nadzieję, że pomogą one Tobie lepiej zrozumieć mechanizmy jego działania :)

<p class="important">Ten wpis mówi konkretnie o Promise A+. Zajrzyj do <a href="https://promisesaplus.com/" target="_blank" rel="noopener noreferrer">specyfikacji</a>!</p>

<h2>1. Promise to obietnica</h2>
Promise to po polsku „obietnica”. To słowo naprawdę doskonale oddaje ideę działania tej abstrakcji! Wyobraź sobie, że ktoś obiecuje Ci, że dostaniesz prezent. Nie wiesz kiedy to nastąpi. Nie wiesz nawet czy na pewno to nastąpi. Ale niezależnie od tego – ostatecznie kiedyś dowiesz się czy obietnica została dotrzymana, czy też nie. <strong>Tak dokładnie działa Promise.</strong>

Promise może być w jednym z 3 stanów:

<ol>
 	<li><strong>Oczekujący (pending)</strong>: Jeszcze nie wiesz czy dostaniesz prezent, czy nie.</li>
 	<li><strong>Rozwiązany (resolved)</strong>: Dostałaś/eś prezent.</li>
 	<li><strong>Odrzucony (rejected)</strong>: Niestety prezentu nie będzie :(</li>
</ol>
Zamieńmy to na kod!
<h3>Promise w JavaScript</h3>
<pre><code class="language-javascript">const promisedPresent = getPresent();
promisedPresent
  .then(present =&gt; console.log('Super prezent!', present))
  .catch(error =&gt; console.log('Nie ma prezentu :(', error));</code></pre>
Funkcja przekazana do <code>then</code> wykona się tylko jeśli obietnica zostanie spełniona, a ta przekazana do <code>catch</code> jeśli nie. Co istotne, <strong>nie wiesz dokładnie kiedy to się wydarzy</strong>. Może za sekundę, może za rok :)

Wejdźmy głębiej w funkcję <code>getPresent</code> – tworzymy obietnicę w ten sposób:

<pre><code class="language-javascript">function getPresent() {
  return new Promise((resolve, reject) =&gt; {
    setTimeout(() =&gt; {
      resolve('Oto prezent!');
    }, 5000); // 5 sekund
  });
}</code></pre>

Tutaj po upływie 5 sekund otrzymujesz prezent. <em>Najs</em>. Ale to już na pewno wiesz, prawda? Przejdźmy więc do ciekawostek ;)

<h2>2. Promise'y można łączyć</h2>
Składnia jest łatwa i przyjemna, więc teraz wyobraźmy sobie, że chcemy wykonać kilka zadań asynchronicznych jedno po drugim. Moglibyśmy się pokusić o napisanie takiego kodu:
<pre><code class="language-javascript">getPresent()
  .then(present =&gt; {
    return returnToTheShop(present)
      .then(returnedMoney =&gt; {
        return buyNewiPhone(returnedMoney)
          .then(iPhone =&gt; iPhone.openTypeOfWeb())
      });
  });</code></pre>
Działa! Jednak poziom zagnieżdżenia sprawił, że kod jest całkowicie nieczytelny! Ale na szczęście Promise mają pewne właściwości, które możemy tutaj wykorzystać. Ten sam kod, czytelniej, można zapisać bez zagnieżdżeń:
<pre><code class="language-javascript">getPresent()
  .then(present =&gt; returnToTheShop(present))
  .then(returnedMoney =&gt; buyNewiPhone(returnedMoney))
  .then(iPhone =&gt; iPhone.openTypeOfWeb());</code></pre>
lub nawet lepiej:
<pre><code class="language-javascript">getPresent()
  .then(returnToTheShop)
  .then(buyNewiPhone)
  .then(iPhone =&gt; iPhone.openTypeOfWeb());</code></pre>
Ale to pewnie też dla Ciebie powtórka informacji. Zastanówmy się więc nad trudniejszymi aspektami.
<h2>3. Callbacki do Promise'a można przekazać dużo później</h2>
To często jest zaskoczeniem dla osób, które nigdy nie używały Promise. W momencie tworzenia obietnicy nie trzeba do niej podpinać jeszcze żadnych funkcji. Ba, funkcje te można podpiąć znacznie później, niekoniecznie jedną – może ich być nawet kilka.
<pre><code class="language-javascript">const myPromise = new Promise((resolve, reject) =&gt; {
  setTimeout(() =&gt; resolve('Gotowe!'), 5000);
});

setTimeout(() =&gt; {
myPromise.then(val =&gt; console.log(val));
}, 6000);</code></pre>
Widzimy tutaj, że callback jest podpinany po 6 sekundach, a Promise rozwiązuje się po 5 sekundach. Czyli callback zostaje podpięty dopiero sekundę później. I mimo to działa :) Koncepcja jest prosta: Promise najpierw jest oczekujący, a później rozwiązany. <strong>Wszystkie podpięte callbacki zostaną wywołane z rozwiązaną wartością jak tylko będzie to możliwe – niezależnie czy były podłączone wcześniej, czy później.</strong>

<h2>4. <code>then</code> to jednocześnie <code>map</code> i <code>flatMap</code></h2>
Tutaj kończy się łagodne wprowadzenie. W innym moim wpisie mogliście przeczytać takie zdanie:
<blockquote>Czym na przykład jest funkcja <code>Promise.resolve</code>? To przecież <code>flatMap</code> gdy wywołamy ją na innym obiekcie <code>Promise</code> oraz <code>map</code> gdy na wartości niebędącej <code>Promise</code>.</blockquote>
Co to tak naprawdę oznacza? Zastanów się co możesz zwrócić wewnątrz funkcji <code>then</code>, <code>resolve</code> i <code>catch</code>:
<ul>
 	<li><code>Promise</code> dowolnej wartości (a właściwie to dowolny obiekt spełniający definicję "thenable" – o tym wspomnę dalej!)</li>
 	<li>dowolną wartość</li>
</ul>
Czemu rozdzielam to na dwie kategorie? Dlatego, że <strong>działanie Promise'ów zmienia się i jest inne gdy przekazujemy coś z pierwszej kategorii i inne gdy coś z drugiej</strong>:
<ul>
 	<li>gdy wewnątrz zwracasz <code>Promise</code>, to ten zewnętrzny <code>Promise</code> poczeka na ten w środku</li>
 	<li>gdy zwracasz inną wartość to po prostu zostanie ona przekazana dalej</li>
</ul>
Brzmi skomplikowanie? Na przykładzie okazuje się, że jest to bardzo intuicyjne. Zacznijmy od puntu drugiego czyli dowolnej wartości niebędącej <code>Promise</code>:
<pre><code class="language-javascript">Promise
  .resolve(1)
  .then(() =&gt; 2) // zamiast 1 zwracamy 2 i od razu jest ono przekazane dalej
  .then(val =&gt; console.log(val)) // wyświetla 2</code></pre>
To wydaje się oczywiste, prawda? Zwracamy 2, więc w kolejnym <code>then</code> dostajemy wartość 2. Inaczej funkcja zachowa się gdy zwrócimy obietnicę:
<pre><code class="language-javascript">const promiseWithThree = new Promise((resolve, reject) =&gt; {
  setTimeout(() =&gt; resolve(3), 5000); // po 5 sekundach Promise zostanie rozwiązany z wartością 3
});

Promise
.resolve(1)
.then(() =&gt; promiseWithThree) // zamiast 1 zwracamy promise, który po 5 sekundach rozwiąże się z 3
.then(val =&gt; console.log(val)) // po rozwiązaniu `promiseWithThree` wyświetla 3</code></pre>
Tutaj zwracamy <code>promiseWithThree</code>, a wtedy <strong>zewnętrzny <code>Promise</code> czeka na niego i dopiero wtedy wykonuje callbacki przekazane do kolejnych <code>then</code></strong>. Tak jak mówiłem, jest to bardzo intuicyjne, prawda? Jednak nie jest to wcale <em>oczywiste</em>! Wewnątrz drugiego <code>then</code>, <code>val</code> nie jest Promisem tylko wartością z którą rozwiązał się tamten <code>Promise</code>.

Dlatego właśnie często mówi się, że <code>resolve</code> czy <code>then</code> to jednocześnie <code>map</code> i <code>flatMap</code> w nomenklaturze Haskellowej. Aby trochę lepiej poznać te pojęcia polecam mój inny wpis:

https://typeofweb.com/2017/05/12/map-i-reduce-w-js/

&nbsp;

<h2>5. Promise jest asynchronicznym odpowiednikiem synchronicznych wywołań</h2>
Gdyby jedyną fajną rzeczą w Promisach była… agregacja callbacków – nie byłoby w ogóle tego wpisu :) Obietnice tak naprawdę to znacznie bardziej skomplikowany i rozbudowany koncept. <strong>Obietnica jest bezpośrednim asynchronicznym odpowiednikiem dla zwykłych wywołań synchronicznych.</strong> Co robią zwykłe synchroniczne funkcje? <strong>Zwracają wartość lub rzucają wyjątek. </strong>Dokładnie to samo robią Promise'y.

Niestety w asynchronicznym świecie nie można po prostu zwrócić wartości albo złapać błędu – stąd cała abstrakcja. Jednak pozostałe koncepty i zachowania są niemal identyczne! Jeśli zagnieździmy kilka synchronicznych funkcji, a któraś z nich rzuci wyjątek – to ten wyjątek przerwie pozostałe wywołania i powędruje do góry aż zostanie złapany. <strong>Dokładnie to samo robią Promise'y</strong>. <strong>W momencie w którym zdasz sobie z tego sprawę – jesteś już bardzo blisko dogłębnego zrozumienia obietnic.</strong> Wyjątek rzucony w którejś z zagnieżdżonych obietnic spowoduje przerwanie wywołań kolejnych <code>then</code> i powędruje do najbliższego <code>catch</code>, który ten błąd obsłuży. Widzisz tutaj podobieństwo? Spójrz na przykład:

<pre><code class="language-javascript">Promise
  .resolve(1)
  .then(val =&gt; {
    console.log(val);
    return val + 1;
  })
  .then(val =&gt; promiseWithError)
  .then(val =&gt; console.log(val)) // to się nie wykona gdyż błąd w `promiseWithError` przerywa ciąg wywołań
  .catch(error =&gt; console.error(error)) // od razu trafiamy tutaj</code></pre>
<h2>6. Promise to mechanizm aplikowania transformacji</h2>
Wow, to brzmi tajemniczo i skomplikowanie, prawda? Postaram się wytłumaczyć o co w tym chodzi. <code>then</code> nie jest tylko sposobem na podpisanie kolejnych <em>callbacków</em> do obietnicy. Jest to tak naprawdę mechanizm aplikowania transformacji, który <strong>zwraca nowy Promise po każdej transformacji</strong>. Spójrzmy na szybki przykład:
<pre><code class="language-javascript">const p1 = Promise.resolve(1) // zwraca 1
const p2 = p1.then(val =&gt; val + 1) // zwraca 2
const p3 = p1.then(val =&gt; val + 1) // zwraca 2
const p4 = p2.then(val =&gt; val + 1) // zwraca 3</code></pre>
Co istotne – każdy z powstałych obiektów, mimo że bazuje na wartości z <code>p1</code>, nie modyfikuje nigdy p1. Mówiąc krótko, <strong><code class="language-">p1 != p2 != p3 != p4</code></strong>.
<p class="important">To jeden z powodów, dla których <strong>implementacja Promise w jQuery była szeroko krytykowana</strong>. Mechanizm transformacji oraz zwracanie nowego Promise'a nie były tam prawidłowo zaimplementowane – zamiast tego mutowany był stan istniejącej obietnicy, co było niezgodne ze standardem Promise/A+!</p>

<h3>Możliwe transformacje</h3>
Promise, poza oczekującym, może mieć dwa stany: rozwiązany lub odrzucony, odpowiednio zostaje wtedy wywołana funkcja <code>then</code> lub <code>catch</code>. Wewnątrz każdej z tych funkcji mogą się wydarzyć dwie rzeczy: Zwrócona jest wartość lub zostaje rzucony wyjątek. Łącznie mamy 4 kombinacje. Zwróć uwagę, że <strong>wyjątek rzucony wewnątrz <code>then</code> sprawi, że Promise zostanie odrzucony i zostanie wywołany najbliższy <code>catch</code></strong>. To bardzo ważne!
<pre><code class="language-javascript">Promise
  .resolve(1)
  .then(val =&gt; {
    return Promise
      .resolve(val + 1)
      .then(newVal =&gt; {
        doSth(newVal) // funkcja nie istnieje, wyjatek!
      })
  })
  .catch(err =&gt; {
    // tutaj zostaną złapane wszelkie błędy, które nie zostały złapane wcześniej
    // zarówno synchroniczne (throw) jak i asynchroniczne (Promise.reject itp.)
    console.log(err);
  })</code></pre>
Celowo zagnieździłem te wywołania w sobie, aby pokazać, że – o ile po drodze nie było innego <code>catch</code> – wszystkie błędy zostaną złapane w <code>catch</code> na najwyższym poziomie.
<h2>7. Promise współpracuje z dowolnym „thenable”</h2>
To będzie krótki akapit. Wspomniałem chwilę wcześniej, że Promise potraktuje jak obietnicę dowolny obiekt typu „thenable”. Jak wygląda taki obiekt? Spójrz na przykład:
<pre><code class="language-javascript">const thenable = { 
  then(onResolved, onRejected) {
    onResolved(1);
  }
};

Promise
.resolve(thenable)
.then(val =&gt; console.log(val)); // 1</code></pre>
Thenable to po prostu zwykły obiekt, który ma funkcję <code>then</code>. Jakie są tego konsekwencje? Przede wszystkim: <strong>Bardzo łatwo zamienić dowolny obietnico-podobny obiekt na prawdziwy Promise/A+! Przykładowo, Promise z jQuery zamieniamy na prawdziwy Promise wywołując na nim po prostu <code>Promise.resolve(…)</code>.</strong> Bum!

<h2>8. Obsługa błędów</h2>
<code>catch</code> umożliwia nam złapanie wszystkich odrzuceń i wyjątków – to świetnie! Pozwala to na przykład na globalne przechwytywanie nieobsłużonych błędów w jednym centralnym miejscu. Przykładowo, robi tak framework HapiJS: Oczekuje, że funkcja <code>handler</code> zwróci <code>Promise</code> – jeśli jest on rozwiązany, to Hapi automatycznie wysyła odpowiedź z odpowiednim kodem 20x, a jeśli odrzucony to Hapi przechwytuje ten błąd i zamienia na odpowiedź z kodem błędu 500, lub innym podanym. To bardzo wygodne! <strong>Ale co to dokładnie oznacza, że błąd jest nieobsłużony?</strong>

Napisałem akapit wcześniej, że wewnątrz <code>catch</code> również może zostać zwrócona wartość. Jeśli zwrócisz inny odrzucony Promise albo rzucisz wyjątek, to <code>catch</code> zwróci kolejny odrzucony <code>Promise</code>. Ale jeśli zwrócisz dowolną inną wartość, to <code>catch</code> zwróci <code>Promise</code>, który <strong>nie jest odrzucony</strong>. <strong>Oznacza to, że błąd został przez Ciebie obsłużony.</strong> Spójrz na przykłady:

<pre><code class="language-javascript">Promise
  .reject(new Error())
  .catch(err =&gt; {
    console.log(err);
    return 'jest ok' // obsluguję blad
  })
  .then(val =&gt; console.log(val)) // 'jest ok'</code></pre>

Tutaj błąd jest obsłużony, więc następnie wywoła się <code>then</code>.

<pre><code class="language-javascript">Promise
  .reject(new Error())
  .catch(err =&gt; {
    console.log(err);
    return Promise.reject('jest ok') // nie obsługuję błędu
  })
  .then(val =&gt; console.log(val)) // nie wywoła się
  .catch(err =&gt; console.log('tutaj jestem!')) // wywoła się, bo błąd nie był obsłuzony poprzednio</code></pre>

Natomiast tutaj błąd nie jest obsłużony, więc <code>then</code> nie wywoła się. Zostanie wywołany natomiast kolejny najbliższy <code>catch</code>.

<p class="important">Bardzo ważne jest, aby zawsze zwracać coś wewnątrz <code>then</code> i <code>catch</code>. Najlepiej niech wejdzie Ci to w nawyk. Jeśli nie zwrócisz nic wewnątrz <code>catch</code> to <strong>automatycznie zwrócone zostaje <code>undefined</code>, a to oznacza, że błąd został obsłużony</strong>:</p>

<pre><code class="language-javascript">Promise
  .reject(new Error())
  .catch(err =&gt; {
    console.log(err); // ups! przypadkiem nic nie zwróciłem, błąd obsłuzony
  })
  .then(val =&gt; console.log(val)) // wywoła się!</code></pre>

Ostatni <code>then</code> wywoła się, gdyż wewnątrz <code>catch</code> przypadkiem niczego nie zwróciłem – czyli został zwrócony <code>undefined</code> i błąd został „obsłużony”.

<h2>Podsumowanie</h2>
Przedstawiłem kilka podstawowych informacji, nieco ciekawostek i kilka całkiem zaawansowanych rzeczy związanych z Promise. Niektóre mnie zaskoczyły gdy się o nich kiedyś dowiedziałem. A czy Ciebie coś zaskoczyło? Napisz w komentarzu!

&nbsp;
