---
id: 34
index: 23
title: REST API w node.js z HapiJS – definicja route'ów i prosta walidacja
date: 2017-01-28T21:24:08.000Z
status: publish
permalink: tworzenie-rest-api-w-node-js-z-wykorzystaniem-frameworka-hapijs-czesc-2
authors:
  - michal-miszczyszyn
guid: >-
  https://typeofweb.com/index.php/2017/01/28/tworzenie-rest-api-w-node-js-z-wykorzystaniem-frameworka-hapijs-czesc-2/
type: post
categories:
  - slug: javascript
    name: JavaScript
  - slug: back-end
    name: Back-end
series:
  slug: hapijs
  name: HapiJS
seo: {}
---

Kontynuuję serię wpisów na temat tworzenia backendu w node.js z wykorzystaniem HapiJS. Dzisiaj o obsługiwaniu parametrów i zapytań oraz o walidacji. Zapraszam!

Jeśli cokolwiek okaże się niejasne to zachęcam do zadawania pytań w komentarzach.

<h1 id="budowaurla">Budowa URL-a</h1>
Nie byłbym sobą, gdybym nie spróbował najpierw wyjaśnić kilku pojęć, którymi będę się dzisiaj posługiwał. Weźmy taki przykładowy adres internetowy:

<code>http://example.com/subpage?query=123&amp;arg=val#home</code>

Musimy umówić co do nazewnictwa poszczególnych fragmentów takiego adresu, aby łatwiej zrozumieć dalszą część artykułu :) Gotowi?

<table>
<tbody>
<tr>
<td><code>http</code></td>
<td>protokół</td>
</tr>
<tr>
<td><code>example.com</code></td>
<td>host/domena</td>
</tr>
<tr>
<td><code>/subpage</code></td>
<td>ścieżka (<em>path</em>)</td>
</tr>
<tr>
<td><code>?query=123&amp;arg=val</code></td>
<td><em>query string</em></td>
</tr>
<tr>
<td><code>#home</code></td>
<td><em>fragment</em></td>
</tr>
</tbody>
</table>
Co prawda nie każdy host jest domeną, ale w tym przypadku to nieistotne. Ważne, żebyśmy się dobrze rozumieli :) Szczególnie istotne są dla nas ścieżka oraz <em>query string</em>. Teraz możemy przejść do konkretów.
<h1 id="obsugacieekwhapijs">Obsługa ścieżek w HapiJS</h1>
Kontynuujemy w miejscu, w którym skończyliśmy po poprzednim wpisie. Mamy działający serwer w HapiJS oraz jeden endpoint <code>/</code>:
<pre><code class="language-javascript">server.route({  
    method: 'GET',
    path: '/',
    handler(request, reply) {
        reply('Hello, world!');
    }
});
</code></pre>
Jak już wiemy, oznacza to, że pod ścieżką <code>/</code> zobaczymy napis <code>Hello, world!</code>.
<h2 id="ciekistatyczne">Ścieżki statyczne</h2>
Możemy dodać kolejne endpointy zwracające inne odpowiedzi pod różnymi adresami. Przykładowo chcemy, aby zapytanie <code>GET /hello</code> zwracało napis <code>Siema</code>:
<pre><code class="language-javascript">server.route({  
    method: 'GET',
    path: '/hello',
    handler(request, reply) {
        reply('Siema');
    }
});
</code></pre>
W podobny sposób możemy zbudować dowolną statyczną ścieżkę, np.: <code>/about/services/programming</code>
<h2 id="parametry">Parametry</h2>
Co jednak w sytuacji gdy chcemy, aby nasz adres wyglądał na przykład tak: <code>/users/michal</code>, gdzie zamiast “michal” możemy wpisać dowolne imię? Z pomocą przychodzą <strong>parametry</strong>.

W HapiJS parametry definiujemy zamykając je wewnątrz klamerek <code>{}</code>:

<code>path: /users/{name}</code>

To już mamy. Aby dobrać się do wartości przekazanej jako parametr musimy zajrzeć do obiektu, którego jeszcze nie dotykaliśmy – <code>request</code>. Zawiera on taki obiekt jak <code>request.params</code>, a w nim wszystkie parametry danego URL-a.

Powyższy przykład zaimplementowalibyśmy w ten sposób:

<pre><code class="language-javascript">server.route({  
    method: 'GET',
    path: '/users/{name}',
    handler(request, reply) {
        reply(request.params.name);
    }
});
</code></pre>

Po otwarciu adresu <a href="http://localhost:3000/users/Michal">http://localhost:3000/users/Michal</a> naszym oczom powinno ukazać się wpisane imię, tutaj: “Michal”.

<p class="important">Wyświetlenie wartości <code>request.params.name</code> w ten sposób otwiera podatność na atak XSS. W kolejnych przykładach będę korzystał z funkcji <code>encodeURIComponent</code>, aby ten problem wyeliminować.</p>

<h3 id="parametryopcjonalne">Parametry opcjonalne</h3>
<pre><code class="language-javascript">server.route({  
    method: 'GET',
    path: '/users/{name?}',
    handler(request, reply) {
        if (request.params.name) {
            reply(encodeURIComponent(request.params.name));
        } else {
            reply('Anonymous');
        }
    }
});
</code></pre>
Powyższy przykład zadziała zarówno dla ścieżki <code>/users</code> jak i <code>/users/Michal</code>.
<h3 id="parametryfragmentaryczne">Parametry fragmentaryczne</h3>
Możemy również zawrzeć w parametrze tylko część segmentu ścieżki, np.:

<code>path: '/photos/{name}.jpg'</code>

Spowoduje, że wykonaniu <code>GET /photos/michal.jpg</code> pod zmienną <code>request.params.name</code> będzie tylko wartość “michal”.

<h3 id="parametrywielosegmentowe">Parametry wielosegmentowe</h3>
<code>path: '/users/{name*2}'</code>

Zadziała np. dla żądania <code>GET /users/jan/kowalski</code>. Zawartością zmiennej <code>request.params.user</code> będzie “jan/kowalski”.

<h3 id="parametry_catchall_">Parametry <em>catch-all</em></h3>
Czasami zachodzi również potrzeba przechwycenia po prostu całej ścieżki, którą wpisze użytkownik, niezależnie jak długa by ona nie była. W HapiJS możemy to zrobić z łatwością:

<code>path: '/users/{name\*}'</code>

Zadziała zarówno dla <code>GET /users/jan</code>, <code>GET /users/jan/kowalski</code> jak i <code>GET /users/jan/kowalski/123/abc/def</code>.

<h1 id="obsuga_querystring_whapijs">Obsługa <em>query string</em> w HapiJS</h1>
HapiJS obsługuje i automatycznie zamienia na obiekt również <em>query string</em>. Mamy do niego dostęp poprzez <code>request.query</code>. Spróbujmy:
<pre><code class="language-javascript">server.route({  
  method: 'GET',
  path: '/search',
  handler(request, reply) {
    reply(request.query);
  }
});
</code></pre>
Po wywołaniu <code>GET /search?text=node.js&amp;page=2&amp;lang=pl</code> wyświetli nam się w przeglądarce taki obiekt:

<img src="/content/images/2017/01/Screenshot-2017-01-27-21.07.41.png" alt="" />
<h1 id="walidacjada">Walidacja żądań</h1>
Widzimy, że Hapi daje nam <em>pewne</em> możliwości parametryzacji ścieżek i zapytań. Czy jednak możemy jakoś <strong>konkretnie sprecyzować, że oczekujemy aby parametr <code>{id}</code> był liczbą, a parametr <code>{name}</code> literami</strong>? Albo, czy możliwe jest, żeby tylko wybrane pola z <em>query string</em> były akceptowane, a inne nie? Tak! Z pomocą przychodzi nam paczka Joi.
<h2 id="joi">Joi</h2>
Joi jest biblioteką służącą do walidacji struktury obiektów zgodnie z podanymi parametrami. Między innymi, bo ponadto umożliwia również automatyczną zmianę nazw lub ignorowanie nieznanych pól, co jest bardzo przydatne przy zwracaniu odpowiedzi w formacie JSON. O tym kiedy indziej, a na razie przyjrzymy się Joi bliżej. Instalujemy:

<code>npm install joi --save</code>

I dodajemy na samej górzej naszego pliku:

<pre><code class="language-javascript">const Joi = require('joi');  
</code></pre>
<h2 id="walidacjawhapijs">Walidacja w HapiJS</h2>
Teraz możemy przystąpić do konfigurowania walidacji w Hapi. Weźmy jeden z poprzednich przykładów, ścieżkę <code>/users/{name?}</code>. Z jakiegoś powodu chcemy, aby <code>name</code> zawierało w sobie wyłącznie liczby. Możemy to osiągnąć dodając nowe pole <code>config.validate.params.name</code> do definicji route’a:
<pre><code class="language-javascript">server.route({  
  method: 'GET',
  path: '/users/{name?}',
  handler(request, reply) {
    if (request.params.name) {
      reply(encodeURIComponent(request.params.name));
    } else {
      reply('Anonymous');
    }
  },

// dodajemy:
config: {
validate: {
params: {
name: Joi.number()
}
}
}
});
</code></pre>
Teraz zapytanie <code>GET /users/michal</code> zakończy się błędem, natomiast <code>GET /users/11</code> spowoduje wyświetlenie odpowiedzi. <strong>Jakiekolwiek zapytanie, które nie przejdzie walidacji automatycznie zostanie odrzucone z kodem błędu 400.</strong>

<h2 id="zoonawalidajcawjoi">Złożona walidajca w Joi</h2>
W podobny sposób możemy dokonać również bardziej skomplikowanej walidacji. Wróćmy do endpointa <code>/search</code>. Chcemy, aby użytkownik zawsze musiał podać w <em>query string</em> pole <code>text</code> będące stringiem. Natomiast pola <code>page</code> i <code>lang</code> powinny być opcjonalne. <code>page</code> niech zawiera tylko liczby, a <code>lang</code> wyłącznie wybrane kody krajów: <code>pl</code>, <code>gb</code> lub <code>de</code>.
<table>
<thead>
<tr>
<th>pole</th>
<th>obowiązkowe?</th>
<th>dozwolone wartości</th>
</tr>
</thead>
<tbody>
<tr>
<td>text</td>
<td>✓</td>
<td>string</td>
</tr>
<tr>
<td>page</td>
<td>✗</td>
<td>liczba</td>
</tr>
<tr>
<td>lang</td>
<td>✗</td>
<td>tylko: pl, gb lub de</td>
</tr>
</tbody>
</table>
Zbudujmy odpowiednią regułę w Joi:
<pre><code class="language-javascript">text: Joi.string().required()  
page: Joi.number()  
lang: Joi.only(['pl', 'gb', 'de'])  
</code></pre>
Łącznie wygląda to tak:
<pre><code class="language-javascript">server.route({  
  method: 'GET',
  path: '/search',
  handler(request, reply) {
    reply(request.query);
  },
  config: {
    validate: {
      query: {
        text: Joi.string().required(),
        page: Joi.number(),
        lang: Joi.only(['pl', 'gb', 'de'])
      }
    }
  }
});
</code></pre>
I tak, przykładowo, zapytanie <code>GET /search?text=abc&amp;lang=us</code> zwróci nam błąd, gdyż podany kod kraju nie jest jednym z dozwolonych. Warto też zwrócić uwagę na to, jak ten błąd wygląda i co dokładnie zawiera. W zwróconej odpowiedzi, oprócz kodu i nazwy błędu, jest też bardzo opisowe pole <code>message</code>, które w tym przypadku zawiera taki komunikat:

<code>child "lang" fails because ["lang" must be one of [pl, gb, de]]</code>

Jest to bardzo zrozumiała wiadomość, którą w zasadzie moglibyśmy wyświetlić użytkownikom (po jakimś sformatowaniu). Dodam jeszcze, że Joi posiada także <strong>możliwość definiowania własnych wiadomości o błędach</strong>.

<h2 id="wartocidomylne">Wartości domyślne</h2>
W powyższym przykładzie bardzo przydałaby się możliwość podania wartości domyślnych, skoro <code>page</code> i <code>lang</code> są opcjonalne. <code>Joi</code> również posiada taką opcję:
<pre><code class="language-javascript">page: Joi.number().default(1)  
lang: Joi.only(['pl', 'gb', 'de']).default('pl')  
</code></pre>
<h2 id="wicejopcji">Więcej opcji…</h2>
Biblioteka Joi daje name <strong>ogromne możliwości wpływania na kształt odbieranych i wysyłanych obiektów</strong>, a jej integracja z frameworkiem HapiJS jest doskonała.

Nie ma tutaj jednak miejsca na to, abym opisał wszystkie opcje konfiguracji Joi. Żądnych wiedzy odsyłam do <a href="https://github.com/hapijs/joi/blob/master/API.md">dokumentacji Joi</a>. Długiej, bo i opcji jest ogrom!

<h1 id="przykadowyprojekt">Przykładowy projekt</h1>
Posiedliśmy już wiedzę wystarczającą do wykonania prostej aplikacji w node.js z wykorzystaniem HapiJS. Chcielibyśmy, aby użytkownik miał możliwość dodawania nowych osób do swojej książki kontaktów. Każda osoba będzie składała się z imienia i nazwiska. Oczywiście, dodamy również opcję podejrzenia wszystkich kontaktów. Potrzebujemy do tego tylko kilku endpointów:
<table>
<tbody>
<tr>
<td><code>GET /contacts</code></td>
<td>wyświetlenie kontaktów</td>
</tr>
<tr>
<td><code>POST /contacts</code></td>
<td>dodanie nowego kontaktu</td>
</tr>
</tbody>
</table>
Dla uproszczenia, każdy kontakt będzie się składał tylko z imienia i nazwiska:
<pre><code class="language-javascript">{
    name: 'Jan',
    surname: 'Kowalski'
}
</code></pre>
<h2 id="implementacja">Implementacja</h2>
Najpierw tworzymy tablicę na kontakty. Aby nie odbiegać za mocno od tematu, na razie będą one przechowywane tak po prostu, w tablicy, a nie w bazie danych:
<pre><code class="language-javascript">const contacts = [];  
</code></pre>
<p class="important">Ze względu na to, że kontakty przechowywane są w tablicy w pamięci, będą one dostępne w naszej aplikacji tylko do ponownego uruchomienia serwera.</p>
Definiujemy zaprojektowane przed chwilą endpointy. Na pierwszy ogień idzie <code>GET /contacts</code>, gdyż ma po prostu zwracać kontakty:
<pre><code class="language-javascript">server.route({  
  method: 'GET',
  path: '/contacts',
  handler(request, reply) {
    reply({
      contacts
    });
  }
});
</code></pre>
<code>POST /contacts</code> musi pobrać przesłane dane i dodać je do tablicy. Do tego wymagana jest krótka walidacja. Na koniec zwracamy odpowiedź z kodem HTTP 201, który oznacza pomyślne utworzenie kontaktu:
<pre><code class="language-javascript">server.route({  
  method: 'POST',
  path: '/contacts',
  config: {
    validate: {
      payload: Joi.object({
        contact: Joi.object({
          name: Joi.string().required(),
          surname: Joi.string().required()
        }).required()
      })
    }
  },
  handler(request, reply) {
    const contact = request.payload.contact;
    contacts.push(contact);
    reply({contact}).code(201);
  }
});
</code></pre>
Korzystamy tutaj z <code>request.payload</code>, o którym wcześniej nie wspominałem. Jest to po prostu <code>body</code> wysłanego żądania <code>POST</code>.
<h2 id="testowaniebackendu">Testowanie backendu</h2>
I już! Utworzyliśmy pierwszy w pełni funkcjonalny backend do aplikacji. Jak go przetestować? O bardziej zaawansowanych metodach opowiem w jednym z kolejnych wpisów, a na razie zróbmy to po prostu z konsoli przeglądarki.

Otwieramy adres <a href="http://localhost:3000/contacts">http://localhost:3000/contacts</a> – powinniśmy zobaczyć odpowiedź z serwera. Na razie jest to obiekt z pustą tablicą:

<img src="/content/images/2017/01/Screenshot-2017-01-27-22.10.04.png" alt="" />

W konsoli przeglądarki wykonujemy proste żądanie <code>POST</code> aby dodać nowy kontakt:

<pre><code class="language-javascript">fetch('/contacts', {  
    method: 'POST',
    body: JSON.stringify({  
        contact: { name: 'Jan', surname: 'Kowalski' }  
    })
});
</code></pre>

Teraz po odświeżeniu strony zobaczymy dodane kontakty!

<img src="/content/images/2017/01/Screenshot-2017-01-27-22.11.19.png" alt="" />

Przy okazji podpowiedź: Warto zainstalować do swojej przeglądarki rozszerzenie formatujące JSON. Wszystko staje się wtedy znacznie bardziej czytelne:

<img src="/content/images/2017/01/Screenshot-2017-01-27-22.13.39.png" alt="" />
<h1 id="podsumowanie">Podsumowanie</h1>
Uff, dzisiaj spora dawka wiedzy za nami. <strong>Nauczyliśmy się obsługiwać parametry w ścieżkach oraz <em>query string</em>. Poznaliśmy bibliotekę Joi i nauczyliśmy się ją wykorzystywać do walidowania zapytań do naszego API.</strong> Zwieńczeniem lekcji było stworzenie backendu do prostej aplikacji w node.js.

Cały kod dostępny jest na moim GitHubie: <a href="https://github.com/mmiszy/hapijs-tutorial/tree/czesc-2">https://github.com/mmiszy/hapijs-tutorial/tree/czesc-2</a>

W kolejnym wpisie wykorzystamy Joi do zmieniania kształtu danych, które są zwracane przez nasze API. Ponadto, zmienimy trochę strukturę naszej aplikacji i podzielimy plik <code>index.js</code> na logiczne fragmenty.
