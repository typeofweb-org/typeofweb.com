---
id: 33
index: 22
title: REST API w node.js z HapiJS – pierwsza aplikacja
date: 2017-01-24T18:36:47.000Z
status: publish
permalink: tworzenie-rest-api-w-node-js-z-wykorzystaniem-frameworka-hapijs-czesc-1
authors:
  - michal-miszczyszyn
guid: >-
  https://typeofweb.com/index.php/2017/01/24/tworzenie-rest-api-w-node-js-z-wykorzystaniem-frameworka-hapijs-czesc-1/
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

Tym wpisem chciałbym rozpocząć serię dotyczącą tworzenia REST API w node.js. Zaczniemy od prostych przykładów i konfiguracji, a skończymy na stworzeniu działającego REST-owego endpointa.

<p class="important">Wymagane jest podstawowa znajomość node.js i npm.</p>

<h1 id="hapijs">HapiJS</h1>
Od dłuższego czasu zajmuję się tworzeniem back-endu w node.js. Bardzo przypadł mi do gustu szczególnie framework HapiJS i od tamtej pory wykorzystywałem go praktycznie we wszystkich projektach. Jakie są jego główne zalety?
<h2 id="prostotahapijs">Prostota HapiJS</h2>
HapiJS w szczególności cechuje prostota. Bardzo łatwo postawić w nim całkowicie funkcjonalne REST API. Nie musimy przebijać się przez gąszcz dokumentacji – wystarczy przejrzeć przykład lub dwa i już możemy zacząć pisać samodzielnie. Bez wątpienia to ogromna zaleta.

HapiJS jest proste, ale nie prostackie. Pierwsze kroki postawić łatwo, ale nie oznacza to, że na tym możliwości tego frameworka się kończą. Jest świetnym narzędziem o ogromnym potencjale! Hapi daje nam takie możliwości jak:

<ul>
 	<li>tworzenie REST API</li>
 	<li>renderowanie szablonów</li>
 	<li>obsługa sesji i ciastek</li>
 	<li>tworzenie proxy</li>
 	<li>walidacja formularzy</li>
 	<li>uwierzytelnianie i autoryzacja</li>
 	<li>obsługa formularzy i przesyłania plików</li>
 	<li>monitorowanie serwera</li>
</ul>
A także wiele, wiele innych! Zachęcam do zgłębienia <a href="https://hapijs.com/">dokumentacji Hapi</a>.
<h2 id="konwencje">Konwencje</h2>
Całkiem nieźle jak na pozornie prostą bibliotekę, prawda? Do tego muszę wspomnieć, że <strong>HapiJS nie narzuca właściwie żadnych konwencji</strong>. Oczywiście, pewne rzeczy są sugerowane, jednak nie jesteśmy do niczego zmuszani. Kod możemy ułożyć jak nam się podoba, architektura może być totalnie dowolna, podobnie nazewnictwo plików i struktura folderów.

Dzięki temu <strong>HapiJS świetnie sprawdzi się do budowania zarówno monolitycznych aplikacji renderujących HTML, jak i do tworzenia microservice’ów</strong>.

<h1 id="przygotowaniedopracy">Przygotowanie do pracy</h1>
Tworzenie każdej aplikacji w node.js warto rozpocząć od polecenia <code>npm init</code>. Program zada nam kilka kontrolnych pytań, a następnie wygenerowany zostanie plik <code>package.json</code>. Większość pytań możemy po prostu pominąć.

Następnie możemy zainstalować już HapiJS przy pomocy:

<code>npm install hapi --save</code>

To polecenie nie tylko pobierze framework do folderu <code>node_modules</code>, ale również zapisze zależność w pliku <code>package.json</code> (warto tam zajrzeć). Stwórzmy jeszcze pusty plik <code>index.js</code> i jesteśmy gotowi do dalszej pracy!

<h1 id="pierwszespotkaniezhapijs">Pierwsze spotkanie z HapiJS</h1>
HapiJS jest frameworkiem, w którym postawiono na konfigurację i <a href="https://pl.wikipedia.org/wiki/Programowanie_deklaratywne">deklaratywną składnię</a>. W teorii oznacza to, że opisujemy <em>co</em>, a nie <em>jak</em>. W praktyce praca z Hapi sprowadza się do tworzenia prostych JavaScriptowych obiektów, które w prosty sposób opisują np. endpointy, ciastka czy uwierzytelnianie.
<h2 id="serwer">Serwer</h2>
Przejdźmy od słów do czynów. Edytujemy nasz jedyny plik: <code>index.js</code> i piszemy w nim:
<pre><code class="language-javascript">'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server();

server.connection({  
 host: 'localhost',
port: 3000
});

server.start((err) =&gt; {  
 if (err) {
throw err;
}

    console.log(`Server running at ${server.info.uri}`);

});
</code></pre>
W powyższym przykładzie zaczynamy od stworzenia serwera w Hapi. Następnie musimy zadeklarować tzw. połączenie (<em>connection</em>), aby framework wiedział w jaki sposób ma być widoczny ze świata zewnętrznego.

Do <code>server.connection(…)</code> możemy przekazać kilka różnych parametrów, jednak na razie interesują nas tylko dwa: <code>host</code> i <code>port</code>, które składają się na adres, pod którym ma być dostępny nasz serwer.

Następnie wywołujemy funkcję <code>server.start(…)</code>, która powoduje uruchomienie serwera w Hapi. Funkcja ta przyjmuje callback jako argument – w nim warto sprawdzić czy nie było żadnego błędu (<code>if (err) …</code>). W końcu, wyświetlamy w konsoli informację o tym pod jakim adresem dostępny jest nasz serwer.

Aplikację możemy uruchomić wpisując w terminalu <code>node index.js</code>. Warto zauważyć, że naszym oczom ukazuje się adres składający się z wcześniej podanego hosta oraz numeru portu.

<h2 id="endpointy">Endpointy</h2>
Jeśli teraz spróbujemy otworzyć adres widoczny na ekranie, czyli <a href="http://localhost:3000">http://localhost:3000</a> to zobaczymy błąd wygenerowany przez Hapi:

<img src="/content/images/2017/01/Screenshot-2017-01-24-20.26.34.png" alt="Błąd Hapi" />

<strong>Oznacza to, że serwer działa</strong>, jednak Hapi nie wie jeszcze co ma zrobić, gdy otwarta zostanie ścieżka <code>/</code>. Musimy zadeklarować endpoint! Wspomnę tylko, że w polskiej literaturze nazywa się to końcówka, ale nikt tak nie mówi. Naprawdę!

Endpoint definiujemy poprzez funkcję <code>server.route</code>. Wymagane są trzy parametry: <code>path</code> czyli ścieżka, <code>method</code> czyli metoda HTTP oraz <code>handler</code>, który w tym przypadku będzie funkcją. Poniższy kod dodajemy przed <code>server.start(…)</code>:

<pre><code class="language-javascript">server.route({  
    method: 'GET',
    path: '/',
    handler(request, reply) {
        reply('Hello, world!');
    }
});
</code></pre>

Funkcja <code>handler</code> zostanie wywołana przez Hapi gdy użytkownik odwiedzi podaną ścieżkę. Do handlera przekazywane są dwa argumenty – pierwszy z nich jest obiektem z informacjami o żądaniu, natomiast drugi to specjalna funkcja, dzięki której możemy coś łatwo i szybko zwrócić.

<img src="/content/images/2017/01/Screenshot-2017-01-24-20.34.19.png" alt="Hello, world w przeglądarce" />
<p class="important">Po każdej zmianie w pliku <code>index.js</code> musimy ponownie uruchomić serwer, aby zmiany były widoczne w przeglądarce.</p>

<h1 id="podsumowanie">Podsumowanie</h1>
Udało nam się stworzyć <strong>prosty back-end w node.js przy pomocy frameworka HapiJS</strong>. Utworzyliśmy serwer i połączenie oraz zadeklarowaliśmy pierwszy endpoint, którego zadaniem było wyświetlenie komunikatu.

Cały kod dostępny jest na moim GitHubie: <a href="https://github.com/mmiszy/hapijs-tutorial/tree/czesc-1">https://github.com/mmiszy/hapijs-tutorial/tree/czesc-1</a>

W kolejnej części opowiem trochę o obsługiwaniu parametrów i zapytań (<em>query string</em>). Powiem też o bardzo fajnej możliwości, jaką daje nam Hapi: automatycznej walidacji żądań.
