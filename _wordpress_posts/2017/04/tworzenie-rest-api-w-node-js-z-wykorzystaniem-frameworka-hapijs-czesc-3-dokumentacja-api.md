---
title: REST API w node.js z HapiJS – dokumentacja API
date: 2017-04-14T08:50:23.000Z
isMarkdown: false
status: publish
permalink: >-
  tworzenie-rest-api-w-node-js-z-wykorzystaniem-frameworka-hapijs-czesc-3-dokumentacja-api
authors:
  - michal-miszczyszyn
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

Dalej na temat tworzenia backendu w node.js z wykorzystaniem HapiJS. Ten wpis jest o automatycznym generowaniu dokumentacji do endpointów. Zapraszam!

<p class="important">Jeśli cokolwiek okaże się dla Ciebie niejasne to zadaj mi pytanie w komentarzach.</p>

<h1 id="joi">Joi</h1>
W poprzednim wpisie pokazałem jak korzystać z podstawowych możliwości biblioteki Joi. Dla przypomnienia: Jest to biblioteka pozwalającą na walidację żądań zgodnie z podaną strukturą.

<strong>Nie mówiłem jednak o tym, że takie obiekty Joi mogą posłużyć do automatycznego generowania dokumentacji API.</strong> Brzmi ciekawie? Jest to niezwykle przydatna możliwość i korzystałem z niej wiele razy w różnych projektach.

<h1 id="przypomnienie">Przypomnienie</h1>
Wróćmy do kodu z poprzedniej części kursu. Mieliśmy tam zdefiniowane kilka endpointów:
<ul>
 	<li><code>GET /</code></li>
 	<li><code>GET /users/{name?}</code></li>
 	<li><code>GET /photos/{name}.jpg</code></li>
 	<li><code>GET /search</code></li>
 	<li><code>GET /contacts</code></li>
 	<li><code>POST /contacts</code></li>
</ul>
Do nich dodawaliśmy walidację w Joi. Przykładowo chcieliśmy, aby do endpointa <code>POST /contacts</code> wymagane było podanie obiektu z polem <code>contact</code> będącym obiektem z obowiązkowymi polami <code>name</code> i <code>surname</code>. Wyglądało to tak:
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
  …
});
</code></pre>
Pamięć odświeżona? To świetnie, gdyż na podstawie takich definicji za moment automatycznie wygeneruje Ci się dokumentacja.
<h1 id="swaggerui">Swagger UI</h1>
<a href="http://swagger.io/swagger-ui/">Swagger UI</a> jest narzędziem służącym do wizualizacji API. Działa z wieloma różnymi platformami, a sposób opisywania API w formacie Swagger jest niezwykle powszechny (przy okazji warto wspomnieć, że standard <a href="https://www.openapis.org">Open API</a> bazuje na Swaggerze). Nie jest zaskoczeniem, że hapi również posiada wtyczkę dodającą Swagger UI: <code>hapi-swagger</code>. Zainstalujmy ją:

<code>npm install hapi-swagger --save</code>

Dodatkowymi potrzebnymi nam zależnościami są <code>inert</code> i <code>vision</code> służące do obsługi template'ów i serwowania statycznych plików:

<code>npm install inert vision --save</code>

Następnie zainstalowane wtyczki musimy dodać do Hapi. Pisanie własnych pluginów jest tematem bardzo rozbudowanym, aby jednak skorzystać z gotowych wtyczek wystarczy, że użyjemy funkcji <code>server.register</code>. Do niej przekazujemy tablicę pluginów:

<pre><code class="language-javascript">const Inert = require('inert');  
const Vision = require('vision');  
const HapiSwagger = require('hapi-swagger');

server.register([  
  Inert,
  Vision,
  {register: HapiSwagger, options}
], err =&gt; {
  if (err) {
    throw err;
  }

  server.start((err) =&gt; {
    if (err) {
      throw err;
    }

    console.log(`Server running at ${server.info.uri}`);
  });
});
</code></pre>

Zauważ, że <code>HapiSwagger</code> rejestrujemy nieco inaczej niż <code>Inert</code> i <code>Vision</code>. Dzieje się tak dlatego, że do Swaggera potrzebujemy przekazać dodatkową konfigurację. Definiujemy więc wcześniej stałą <code>options</code>:

<pre><code class="language-javascript">const pkg = require('./package.json');  
const options = {  
  info: {
    title: pkg.description,
    version: pkg.version
  }
};
</code></pre>

Zwróć też uwagę, że wywołanie <code>server.start</code> przeniosłem do środka callbacka funkcji <code>server.register</code>. <strong>Jest to wymagane, aby serwer wiedział o wszystkich wtyczkach w momencie uruchomienia.</strong>

To wystarczy, aby nasza dokumentacja była automatycznie generowana. Uruchom serwer i otwórz adres <a href="http://localhost:3000/documentation">http://localhost:3000/documentation</a> Twoim oczom powinien się ukazać widok podobny do tego:

<img src="/public/assets/content/images/2017/04/Screenshot-2017-04-14-12.35.54.png" alt="" />

<strong>Jednak nie ma tutaj jeszcze żadnego endpointa!</strong> Dlaczego? Aplikacje napisane w HapiJS mogą być mieszanką choćby statycznych stron i REST API. Dokumentować chcemy tylko REST API, dlatego musimy dodatkowo powiedzieć Hapi, które końcówki są naszym API, a które nie. <strong>Musimy otagować</strong> odpowiednie route'y poprzez dodanie do nich właściwości <code>tags: ['api']</code>:

<pre><code class="language-javascript">server.route({  
  method: 'POST',
  path: '/contacts',
  config: {
    tags: ['api'],
    …
  },
  …
});
</code></pre>

Gdy to zrobisz, wreszcie dokumentacja będzie generowana prawidłowo dla wybranych endpointów:

<img src="/public/assets/content/images/2017/04/Screenshot-2017-04-14-12.40.35.png" alt="" />
<h1 id="dodatkoweinformacje">Dodatkowe informacje</h1>
Weźmy pod lupę przykładową dokumentację dwóch endpointów:

<img src="/public/assets/content/images/2017/04/Screenshot-2017-04-14-12.43.49.png" alt="" />

Z prawej strony w polu <em>Data Type</em> widzimy informacje, które podaliśmy do walidatora Joi. W pola <em>body</em> oraz w <em>Parameters</em> poniżej <strong>można wpisać dowolne wartości i przetestować działanie API. To świetna możliwość!</strong>
Zauważcie, że pole, w którym jasno zdefiniowaliśmy tylko 3 poprawne wartości (pl, gb, de) nie jest inputem, lecz selectem: <code>hapi-swagger</code> dobrze sobie z tym poradził :)

Jednak brakuje mi tu kilku rzeczy. Bez wątpienia przydałby się opis każdego endpointa, prawda? Dodatkowo, pomocna byłaby informacjach o danych zwracanych czy też możliwych kodach błędów. Czy takie informacje również możemy podać w Hapi? Owszem!

<h2 id="opisinotatki">Opis i notatki</h2>
Opis oraz dodatkowe notatki możesz podać w jako pola <code>description</code> i <code>notes</code> w konfiguracji route'a. Notatki mogą zawierać dowolne przydatne informacje, np. krótkie podsumowanie zwracanych danych albo podpowiedź odnośnie czegoś, co może zaskoczyć przy pracy z tym endpointem.
<pre><code class="language-javascript">server.route({  
  method: 'POST',
  path: '/contacts',
  config: {
    tags: ['api'],
    description: 'Create a new contact',
    notes: 'Returns created contact',
    …
  },
  …
});
</code></pre>
<img src="/public/assets/content/images/2017/04/Screenshot-2017-04-14-12.50.32.png" alt="screenshot" />
<h2 id="zwracanedane">Zwracane dane</h2>
Aby opisać dane zwracane przez endpoint, również możemy skorzystać z Joi. Dodaj pole <code>response.schema</code> w konfiguracji route'a:
<pre><code class="language-javascript">server.route({  
  method: 'POST',
  path: '/contacts',
  config: {
    …
    response: {
      schema: Joi.object({
        contact: {
          name: Joi.string().required().example('Jan'),
          surname: Joi.string().required().example('Kowalski')
        }
      }).label('CreateContactResponse')
    }
  },
  …
});
</code></pre>
Korzystamy tutaj z dwóch nowych funkcji, których nazwy raczej mówią już wszystko: <code>example</code> oraz <code>label</code>. <code>example</code> sprawia, że w dokumentacji pojawi się konkretny przykład wartości. Jest to przydatne, gdy chcemy opisać coś precyzyjnie i jasno. <code>label</code> zaś umożliwia nadanie unikatowej nazwy tej strukturze danych w celach łatwiejszej identyfikacji.

<img src="/public/assets/content/images/2017/04/Screenshot-2017-04-14-13.05.50.png" alt="" />
<h3 id="duplikacjakodu">Duplikacja kodu</h3>
Na pewno zauważyłeś, że dane przyjmowane przez ten endpoint i dane przez niego zwracane mają dokłądnie tę samą strukturę – przyjmujemy kontakt i zwracamy kontakt. Można by się pokusić o przeniesienie schemy'y Joi do osobnej stałej i użycie jej dwukrotnie:
<pre><code class="language-javascript">const ContactSchema = Joi.object({  
  contact: Joi.object({
    name: Joi.string().required().example('Jan').description(`Contact's name`),
    surname: Joi.string().required().example('Kowalski').description(`Contact's surname`)
  }).required().label('Contact')
}).required().label('ContactSchema');
</code></pre>
Dodatkowo do imienia i nazwiska dodałem <code>description</code>, czyli krótki tekst opisujący każde z pól osobno. W tym przypadku wydaje się on całkowicie zbędny, jednak warto pamiętać, że taka możliwość istnieje.
<h2 id="kodybdw">Kody błędów</h2>
W prawdziwej aplikacjie niektóre endpointy będą zwracały wiele różnych kodów błędów. Przykładowo gdy na portalu społecznościowym spróbuję zmodyfikować profil X, mogę dostać takie błędy:
<ul>
 	<li>400 – błędne dane w żądaniu (np. imię to liczba)</li>
 	<li>401 – niezalogowany (a niezalogowani nie mogą niczego edytować)</li>
 	<li>404 – nie ma takiego zasobu (gdy X nie istnieje)</li>
 	<li>403 – brak dostępu do zasobu (gdy X to nie mój profil)</li>
</ul>
…i tak dalej, i tym podobne. <code>hapi-swagger</code> również pozwala na opisanie tych statusów, jednak składnia, która do tego służy jest moim zdaniem nieco… dziwna. Ale mimo to spróbuj dodać dwa <strong>kody błędów do dokumentacji endpointa</strong>: 400 i 409 (w przypadku gdy użytkownik o podanym imieniu i nazwisku już istnieje):
<pre><code class="language-javascript">server.route({  
  method: 'POST',
  path: '/contacts',
  config: {
    plugins: {
      'hapi-swagger': {
        responses: {
          400: {
            description: 'Bad request'
          },
          409: {
            description: 'User with given name/surname exists'
          }
        }
      }
    },
    …
  },
  …
});
</code></pre>
<img src="/public/assets/content/images/2017/04/Screenshot-2017-04-14-13.36.01.png" alt="" />
<h2 id="testowaniebezporedniowswaggerze">Testowanie bezpośrednio w Swaggerze</h2>
W wygenerowanej dokumentacji na pewno Twoją uwagę przykuł formularz oraz przycisk "Try it out". Wspominałem już, że <strong>Swagger UI pozwala na testowanie API bezpośrednio na stronie z dokumentacją.</strong> Dopiszemy teraz brakującą funkcję (sprawdzanie czy kontakt już istnieje) i zwrócimy odpowiedni kod błędu, a następnie przetestujemy to zachowanie bezpośrednio w Swaggerze.
<h3 id="kod">Kod</h3>
Dopisanie tego fragmentu kodu jest banalnie proste. W tablicy kontaktów szukamy po imieniu i nazwisku i jeśli coś znajdziemy to zwracamy błąd, a jeśli nie, to dodajemy kontakt tak jak dotychczas. Do zwrócenia błędu posłuży nam <code>reply().code(409)</code>:
<pre><code class="language-javascript">handler(request, reply) {  
  const contact = request.payload.contact;

const userExists = contacts.find(c =&gt; c.name === contact.name &amp;&amp; c.surname === contact.surname);
if (userExists) {
return reply('This user exists!').code(409);
}

contacts.push(contact);
reply({contact}).code(201);
}
</code></pre>
Teraz nowo dodaną funkcję możemy sprawdzić w Swagger UI:

<iframe class="large" src="https://www.youtube.com/embed/BeclZb68m_s?rel=0" width="560" height="415" frameborder="0" allowfullscreen="allowfullscreen"></iframe>
<h1 id="podsumowanie">Podsumowanie</h1>
Dzisiaj <strong>nauczyliśmy się dodawać dokumentację do REST API</strong>. Brzmi banalnie, ale możliwości, które dają nam Hapi, Joi i Swagger UI są ogromne.

Cały kod jest dostępny na moim GitHubie: <a href="https://github.com/typeofweb/hapijs-tutorial/tree/czesc-3">https://github.com/typeofweb/hapijs-tutorial/tree/czesc-3</a>

<strong>Joi i hapi-swagger posiadają niezliczone różne opcje i nie sposób tutaj wszystkich wymienić</strong>. Dlatego zachęcam do poczytania oficjalnych dokumentacji:

<ul>
 	<li><a href="https://github.com/hapijs/joi/blob/master/API.md">Dokumentacja Joi</a></li>
 	<li><a href="https://github.com/glennjones/hapi-swagger/blob/master/optionsreference.md">Dokumentacja hapi-swagger</a></li>
 	<li><a href="https://github.com/glennjones/be-more-hapi/blob/master/lib/routes.js">Przykłady w be-more-hapi</a></li>
</ul>
Jeśli masz wrażenie, że po dodaniu dokumentacji do kodu cały plik index.js mocno napęczniał – to słusznie ;) Ten wpis miały być poświęcony strukturze, ale generowanie dokumentacji wydało mi się ciekawsze. A więc następnym razem zrobimy z tym w końcu porządek!

<strong>Masz pytania? Zadaj je w komentarzu pod tekstem.</strong>
