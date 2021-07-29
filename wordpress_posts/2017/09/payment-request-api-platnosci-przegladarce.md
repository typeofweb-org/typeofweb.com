---
id: 362
index: 33
title: 'Payment Request API: bezpieczne płatności w przeglądarce'
date: 2017-09-14T20:42:06.000Z
isMarkdown: false
status: publish
permalink: payment-request-api-platnosci-przegladarce
authors:
  - michal-miszczyszyn
guid: https://typeofweb.com/?p=362
type: post
thumbnail:
  url: >-
    https://typeofweb.com/wp-content/uploads/2017/09/platnosc-karta-przez-internet.jpg
  width: 1620
  height: 1080
categories:
  - slug: javascript
    name: JavaScript
  - slug: front-end
    name: Front-end
seo:
  focusKeywords:
    - Payment Request API

---
Płatności online niejednokrotnie okazują się być problematyczne. W szczególności na telefonach – przypomnij sobie kiedy ostatni raz chciałaś/eś za coś zapłacić, ale zrezygnowałaś/eś, bo wpisywanie wszystkich danych i numeru karty na telefonie Cię zmęczyło? Właśnie. Ja miewam tak często. Na szczęście <strong>koniec tej męki wydaje się być bliski: Wchodzi Payment Request API!</strong>
<h2>Problemy z płatnościami</h2>
O ile Polacy bardzo często płacą po prostu szybkimi przelewami lub BLIK (jedynym sensownym sposobem płatności online), to jednak coraz częściej zamawiamy też rzeczy z zagranicy – a tam przelew zwyczajnie się nie opłaca lub jest w ogóle niemożliwy. Co wtedy? <strong>Podajesz numer karty. I tak za każdym razem, na każdej stronie, na której chcesz zapłacić</strong>. Oczywiście wielu sprzedawców oferuje opcję zapamiętania numeru karty, ale czy jesteś pewien, że możesz mu do końca ufać? Ja nigdy.

<strong>Z punktu widzenia programistów, sprzedawców czy startuperów sprawa wcale nie jest prostsza</strong> – i to co najmniej z kilku powodów. Posługiwanie się Twoim numerem karty to jedno, ale aby móc ten numer zapisać i przechować trzeba mieć już specjalne zgody – w Polsce bodajże od GIODO, a na rynek światowy sprawa chyba jeszcze bardziej skomplikowana…

Dodatkowo, aby wpisywanie danych było maksymalnie uproszczone, programiści muszą poprawnie skonfigurować pola formularza, aby działało autouzupełnianie. Wbrew pozorom, nie jest to tak proste, jak brzmi, bo różne przeglądarki różnie interpretują te same wartości mimo prób standaryzacji.
<h2>Payment Request API</h2>
<strong>Payment Request API to standard mający na celu ułatwienie przeprowadzania transakcji między klientami a sprzedawcami.</strong> A konkretnie: Payment Request API zdecydowanie upraszcza krok, w którym musisz podać swoje dane w celu przeprowadzenia płatności. Otrzymujemy tutaj jakby w pakiecie 3 rzeczy:
<ol>
 	<li>Spójny wygląd i interfejs dla użytkowników (zawsze ten sam).</li>
 	<li>Bezpieczniejsze miejsce do przechowywania danych – przeglądarka, a nie serwer sprzedawcy.</li>
 	<li>Spójne programistyczne API dla twórców aplikacji i sklepów.</li>
</ol>
<h3>Jak wygląda Payment Request API dla użytkownika?</h3>
Zależnie od urządzenia i przeglądarki, ale w danym środowisku zawsze tak samo :) To jest ogromny plus tego standardu! Spójrzmy na kilka screenów z różnych urządzeń:


<Gallery columns="2" link="file" size="medium">
  <img src="https://typeofweb.com/wp-content/uploads/2017/09/payment-request-api-chrome.png" loading="lazy" alt="Payment Request Api w Chrome" title="Payment Request Api w Chrome" width="1366" height="1086" />
<img src="https://typeofweb.com/wp-content/uploads/2017/09/payment-request-api-edge.png" loading="lazy" alt="Payment Request Api w Edge" title="Payment Request Api w Edge. Screen z https://blogs.windows.com" width="1021" height="1000" />
<img src="https://typeofweb.com/wp-content/uploads/2017/09/payment-request-api-mobile-chrome.png" loading="lazy" alt="Payment Request Api w Chrome Mobile" title="Payment Request Api w Chrome Mobile. Screen z https://developers.google.com" width="1080" height="1920" />
<img src="https://typeofweb.com/wp-content/uploads/2017/09/payment-request-api-samsung.png" loading="lazy" alt="Payment Request Api na Samsungu" title="Payment Request Api na Samsungu. Screen z https://medium.com/samsung-internet-dev/" width="450" height="800" />
</Gallery>


Niezależnie od sklepu, w którym chcesz dokonać płatności – Payment Request API będzie dla Ciebie wyglądał identycznie. Oczywiście, standard jest dość elastyczny, <strong>na podsumowaniu może się wyświetlać wiele produktów, a także osobno podatek czy rabat</strong>, możliwe jest także sprecyzowanie <strong>które karty kredytowe są akceptowane</strong>. Ale to nie wszystko! Google zaprezentował piękny przykład dodania zupełnie własnościowej bramki płatności, np. <a href="https://developers.google.com/web/fundamentals/discovery-and-monetization/payment-request/android-pay" target="_blank" rel="noopener nofollow">Android Pay poprzez Stripe</a>. Wszystko jest możliwe! Czytaj dalej, aby dowiedzieć się jak :)
<h3>Bezpieczny sposób przechowywania danych</h3>
Na pierwszym screenie znajduje się przycisk z napisem "Add" (korzystam z angielskiej wersji przeglądarki). Po jego kliknięciu możemy skonfigurować dany rodzaj płatności (karta), dodać wszystkie potrzebne dane i zapisać. W tym wypadku Chrome poinformował mnie również, że informacje o płatności będą przechowywane w chmurze Google. Prawdopodobnie bezpieczniejsze to niż  przechowywanie tych danych w byle jakim sklepie internetowym, ale w razie czego tę funkcję również można wyłączyć. Co istotne, <strong>przy kolejnych transakcjach, we wszystkich sklepach internetowych, będziemy mieli szybki dostęp do zapisanych danych i nie będziemy musieli ich ponownie podawać.</strong> O ile korzystają one z Payment Request API, oczywiście :)

Warto jednak pamiętać, że po zaakceptowaniu dane są przekazywane do sprzedawcy. A więc sprzedawca nadal dostaje np. numer naszej karty i, jeśli podaliśmy go na podejrzanej stronie, to prawdopodobnie możemy się z pieniędzmi pożegnać. <strong>Payment Request API nie jest bramką płatności samo w sobie. Nie sprawia też, że transakcje stają się pewniejsze czy bezpieczniejsze w żaden sposób. Nie jest pośrednikiem w płaceniu.</strong> Payment Request API to tylko (albo aż) spójny wygląd, interfejs i API.
<h2>Programowanie Payment Request API</h2>
Specyfikacja Payment Request API jest długa, ale całkiem interesująca i pełna przykładów – warto do niej zajrzeć, jeśli zainteresujesz się głębiej tematem: <a href="https://www.w3.org/TR/payment-request/" target="_blank" rel="noopener nofollow">https://www.w3.org/TR/payment-request/</a>. Ale omówmy sobie kilka podstawowych rzeczy.
<h3>Tylko HTTPS</h3>
Przede wszystkim: <strong>Payment Request API</strong><strong> nie działa bez HTTPS.</strong> Podobnie jak wiele nowych API. Jest to bardzo sensowne, bo przesyłanie naszych danych bez szyfrowania nie można nazwać inaczej niż skrajną głupotą – tutaj szyfrowanie jest wymuszone.
<h3>Promise</h3>
Całe <strong>Payment Request API opiera się o Promise'y.</strong> Jest to bardzo spójna i dobra decyzja, gdyż od pewnego czasu <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises">Promise jest częścią standardu ECMAScript</a>, a więc jest wbudowany w JavaScript. Dzięki temu uzyskujemy jeden, wspólny sposób wchodzenia w interakcję z nowymi asynchronicznymi API.
<h3>Przykłady Payment Request API</h3>
Dość teorii! Praktyka. Payment Request API dodaje nowy globalny konstruktor, z którego możemy korzystać: <code>PaymentRequest</code>. Przyjmuje on 3 argumenty, ale ostatni jest opcjonalny:
<pre><code class="language-javascript">const paymentMethods = [
  {supportedMethods: ['basic-card']}
];

const details = {
  total: {
    label: 'Dostęp do artykułów Type of Web', 
    amount: {currency: 'PLN', value: '99.99'}
  }
};

const options = {}; // opcjonalnie

new PaymentRequest(paymentMethods, details, options)
  .show()</code></pre>
W powyższym przykładzie robimy 3 rzeczy: Deklarujemy jakie metody płatności wspieramy (karty), dodajemy jedną pozycję na liście ("Dostęp do artykułów…") wraz z jej ceną i walutą, a na końcu każemy wyświetlić okno z płatnością. <strong>Jakie to proste!</strong>
<h4>Karty płatnicze</h4>
Zauważ jednak, że aktualnie informujemy użytkownika, że obsługujemy dowolnych dostawców kart:

<img class="aligncenter size-full wp-image-377" src="https://typeofweb.com/wp-content/uploads/2017/09/Screenshot-2017-09-13-20.25.46.png" alt="" width="662" height="122" />

Możliwe jest sprecyzowanie, że obsługujemy wyłącznie np. <strong>Visa i Mastercard</strong>. Nic prostszego:
<pre><code class="language-javascript">const paymentMethods = [
  {
    supportedMethods: ['basic-card'],
    data: {  
      supportedNetworks: ['visa', 'mastercard']
    }
  }
];</code></pre>
Zmieniamy fragment konfiguracji i widzimy już tylko dwóch dostawców na liście:

<img class="aligncenter size-full wp-image-380" src="https://typeofweb.com/wp-content/uploads/2017/09/Screenshot-2017-09-13-20.30.44-e1505327567627.png" alt="" width="201" height="99" />
<h4>Lista produktów i podatki</h4>
Bardzo często w zamówieniach musimy wylistować więcej niż jeden produkt, a do tego osobno wyświetlić naliczony podatek VAT. Znowu, Payment Request API przychodzi z pomocą. Dodamy sobie te rzeczy jako tablicę w <code>details.displayItems</code>:
<pre><code class="language-javascript">const details = {
  displayItems: [{
    label: 'Abonament roczny',
    amount: { currency: 'PLN', value: '99.99' }
  }, {
    label: 'Rabat 10% dla stałych czytelników',
    amount: { currency: 'PLN', value: '-10.00' }
  }, {
    label: 'VAT 23%',
    amount: { currency: 'PLN', value: '16.83' }
  }],
  total: {
    label: 'Suma',
    amount: { currency: 'PLN', value: '89.99' }
  }
};</code></pre>
Tak przygotowana lista wyświetla się w następujący sposób. Zwróć uwagę, że w <code>displayItems</code> mogłem podać zupełnie dowolne wartości i opisy i nie ma to wpływu na sumę w <code>total</code>. <strong>Przeglądarka niczego za nas sama nie liczy i to my musimy poprawnie wykonać wszystkie obliczenia!</strong>

<img class="aligncenter size-full wp-image-382" src="https://typeofweb.com/wp-content/uploads/2017/09/Screenshot-2017-09-13-20.43.05.png" alt="" width="996" height="318" />

Jako dodatkową opcję, Payment Request API umożliwia nam oznaczenie niektórych pozycji na liście zakupów jako „oczekujące” – tzn. takie, których ceny nie są finalne. Przykładem podawanym w dokumentacji jest właśnie podatek lub koszt wysyłki, który może zależeć od wagi przesyłki albo kraju. W tym celu wystarczy dodać do odpowiedniego obiektu pole <code>pending</code>, a przeglądarka <em>może</em> (ale nie musi) wyświetlić je nieco inaczej niż pozostałe:
<pre><code class="language-javascript">const details = {
  displayItems: [{
    label: 'Przesyłka',
    amount: { currency: 'PLN', value: '13.50' },
    pending: true // !
  }],
  ...
};</code></pre>
<h4>Obsługa danych</h4>
Jak wspomniałem, po wywołaniu funkcji show, dostajesz Promise, w którym następnie możesz obsłużyć płatność. Rezultatem jest obiekt, który zawiera w sobie wszystkie potrzebne dane, a także funkcję <code>complete</code>. Zakładając, że masz swoją funkcję <code>doSomethingWithTheData</code>, która np. wysyła dane do API:
<pre><code class="language-javascript">new PaymentRequest(paymentMethods, details, options)
  .show()
  .then(result =&gt; {
    return doSomethingWithTheData(result)
      .then(response =&gt; {
        if (response.ok) {
          return result.complete('success'); // udało się zapłacić
        } else {
          return result.complete('fail'); // niepowodzenie
        }
      })
  })
  .catch(err =&gt; {
    // … obsłuż błąd
  })</code></pre>
Co dokładnie zawiera w sobie result? Przynajmniej dane karty i adres, a opcjonalnie kilka innych informacji (czytaj dalej). Więcej o konkretnych polach można przeczytać w <a href="https://www.w3.org/TR/payment-request/#paymentresponse-interface" target="_blank" rel="noopener nofollow">specyfikacji Payment Request API</a>.


<figure id="attachment_393" align="aligncenter" width="1024">
  <img class="wp-image-393 size-large" src="https://typeofweb.com/wp-content/uploads/2017/09/Screenshot-2017-09-13-21.31.11-1024x146.png" alt="" width="1024" height="146" />
  <figcaption>
    Błąd wyświetlony w przeglądarce po wywołaniu <code>result.complete('fail')</code>
  </figcaption>
</figure>

<h4>Najbardziej rozbudowany przykład</h4>
Do tej pory całkowicie pomijałem obiekt <code>options</code>. Muszę jednak o nim wspomnieć, gdyż pozwala on na dodanie tak przydatnych opcji jak wymuszenie wpisania <strong>adresu wysyłki, maila czy numeru telefonu</strong>. Dodatkowo, na zmiany tych wartości można odpowiednio reagować i, na przykład, zmieniać koszt przesyłki. Służy temu funkcja <code>event.updateWith(…)</code>. Zobaczmy bardzo rozbudowany przykład – ten sam co w demo poniżej (<a href="#demo">skocz do demo ↓</a>):
<pre><code class="language-javascript">const shipmentItems = {
  economy: {
    id: 'economy',
    label: 'Ekonomiczna (5-30 dni)',
    selected: true,
    amount: {
      currency: 'PLN',
      value: '7.5',
    },
  },
  pickup: {
    id: 'pickup',
    label: 'Odbiór własny',
    amount: {
      currency: 'PLN',
      value: '0',
    },
  }
};

const bucket = [{
  label: 'Abonament roczny',
  amount: { currency: 'PLN', value: '99.99' }
}, {
  label: 'Rabat 10% dla stałych czytelników',
  amount: { currency: 'PLN', value: '-10.00' }
}];

const paymentMethods = [
  {
    supportedMethods: ['basic-card'],
    data: {
      supportedNetworks: ['visa']
    }
  }
];

const shippingOptions = [shipmentItems.economy, shipmentItems.pickup];
const displayItems = [...bucket, shipmentItems.economy];

const details = {
  displayItems,
  shippingOptions,
  total: getTotal(displayItems)
};

const options = {
  requestPayerName: true,
  requestPayerEmail: true,
  requestPayerPhone: true,
  requestShipping: true,
  shippingType: 'shipping'
};

function showPayment() {
  const payment = new PaymentRequest(paymentMethods, details, options);
  payment.addEventListener('shippingoptionchange', onShippingOptionChange);

  payment
    .show()
    .then(onPaymentSuccess)
    .catch(onPaymentError)
}

function onShippingOptionChange(e) {
  // … update

  event.updateWith({
    total: getTotal(displayItems),
    shippingOptions,
    displayItems,
  });
}

function onPaymentSuccess(result) {
  return doSomethingWithTheData(result)
    .then(response =&gt; {
      if (response.ok) {
        return result.complete('success'); // udało się zapłacić
      } else {
        return result.complete('fail'); // niepowodzenie
      }
    })
}

function onPaymentError(err) {
  console.error(err);
}</code></pre>
<h2 id="demo">Demo</h2>
Poniższe demo przedstawia najciekawsze możliwości Payment Request API. Jeśli używasz Google Chrome (również na telefonie), Edge lub Opera to spróbuj:
<ol>
 	<li>Dodać kartę. <strong>Ale nie swoją prawdziwą!</strong> Użyj numeru 4444 3333 2222 1111, który jest poprawnym numerem VISA do testowania. CVC i data ważności dowolne.</li>
 	<li>Dodaj adres.</li>
 	<li>Dodaj dane kontaktowe.</li>
 	<li>Zmień sposób dostarczenia przesyłki na odbiór własny i z powrotem na przesyłkę ekonomiczną – suma do zapłaty ulega zmianie.</li>
 	<li>Sfinalizuj płatność. Na 3 sekundy pojawi się spiner, a następnie okno zniknie. Udało się!</li>
</ol>
<iframe src="/blog-demos/2017/09/13/index.html" style="width: 100%; height: 75px;"></iframe>
<h2>Wsparcie przeglądarek dla Payment Request API</h2>
Dobra wiadomość: <strong>Możesz zacząć używać Payment Request API już dzisiaj!</strong> API jest dostępne w najnowszych wersjach Google Chrome, Edge i Opera. Trwają prace nad dodaniem go do Safari, a testować można już w Safari Tech Preview.

<strong>Jak sobie poradzić z przeglądarkami, które jeszcze Payment Request API nie wspierają?</strong> Musisz polegać na dotychczasowych sposobach obsługi płatności, czyli zwykłych formularzach. Na szczęście wykrycie tego czy Payment Request API jest dostępne czy nie, jest bajecznie proste:
<pre><code class="language-javascript">if (!window.PaymentRequest) {
  // nie ma, wyświetl stary formularz np:
  oldPaymentForm.hidden = false;
  // albo przekieruj:
  window.location.href = '/old-payment-form.html';
  return;
}</code></pre>
<h2>Podsumowanie</h2>
Krótkie. Pobaw się Demo, w szczególności na telefonie z mobilnym Chrome. Zobacz o ile łatwiejsze może być uzupełnianie danych do płatności online głównie na telefonie, ale też desktopie. Ja w to wierzę i mocno kibicuję Payment Request API, czyli nowemu sposobowi na obsługę płatności w przeglądarkach :)
