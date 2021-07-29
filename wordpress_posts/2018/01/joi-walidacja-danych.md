---
id: 901
index: 51
title: Joi — walidacja danych
date: 2018-01-10T10:25:04.000Z
isMarkdown: false
status: publish
permalink: joi-walidacja-danych
authors:
  - michal-miszczyszyn
guid: https://typeofweb.com/?p=901
type: post
thumbnail:
  url: https://typeofweb.com/wp-content/uploads/2018/01/pexels-photo.jpg
  width: 1920
  height: 1280
categories:
  - slug: javascript
    name: JavaScript
  - slug: back-end
    name: Back-end
series:
  slug: hapijs
  name: HapiJS
seo:
  focusKeywords:
    - Joi

---
Walidacja danych to bardzo ciekawy i rozbudowany temat, a ja znalazłem swoją ulubioną paczkę do tego :) Ten wpis poświęcam w 100% bibliotece Joi. Wbrew pozorom, nie jest to wcale tak banalna sprawa, jakby się mogło wydawać! <strong>Joi służy do walidacji danych w Node.js</strong>. Można jej używać z dowolnym frameworkiem, ale, co dla mnie istotne, jest mocno zintegrowana z HapiJS!

{/* more */}

<h2>O Joi…</h2>

Dość nietypowo: wpis zaczynam od podsumowania. Chcę w ten sposób zachęcić Cię do bliższego poznania Joi, bo możliwości, które daje ta biblioteka są praktycznie nieograniczone. Gdy pierwszy raz zacząłem jej używać byłem pod ogromnym wrażeniem jak łatwe jest budowanie nawet najbardziej skomplikowanych zasad walidacji i nie tylko…

A więc:

<ul>
    <li><strong>Joi to biblioteka do walidacji danych</strong> — sprawdza czy dane pasują do podanego formatu</li>
    <li><strong>Joi może być bez problemu używana z dowolnym frameworkiem</strong> (mimo że jest ściśle zintegrowane z HapiJS)</li>
    <li><strong>Możesz użyć Joi w HapiJS do automatycznej walidacji elementów żądań</strong>: nagłówków, <em>querystring</em>, parametrów czy ciała (body)</li>
    <li><strong>Możesz także walidować swoje odpowiedzi</strong>, aby np. uniknąć przesłania do użytkownika danych, które powinny pozostać tajne</li>
    <li><strong>Joi daje łatwą możliwość precyzowania własnych komunikatów błędów</strong></li>
</ul>

Zainteresowana/y? To jeszcze nie wszystko 😍 Ale zacznijmy od początku… Jeśli natomiast nie chce Ci się czytać to <a href="https://szkolenia.typeofweb.com/" target="_blank">zapisz się na szkolenie z Hapi i Joi</a>.

<h2>Walidacja w ogóle</h2>

Walidacja danych pochodzących od użytkownika (żądań) ma zasadniczo dwa cele. Po pierwsze pomaga programiście <strong>upewnić się, że użytkownik podaje prawidłowe dane</strong>, aby aplikacja mogła dalej działać. Przykładowo jeśli w formularzu oczekiwany jest wiek, a użytkownik wpisze tam rok urodzenia, Joi może taki przypadek wykryć, dzięki czemu aplikacja nie zapisze niepoprawnych danych. Jest tutaj też ogromna korzyść dla użytkownika: Dostaje jasny komunikat o błędzie i wie dokładnie co musi poprawić.

Drugi aspekt to <strong>bezpieczeństwo aplikacji</strong>. Walidacja pozwala Tobie (programiście) upewnić się, że gdy ktoś będzie próbował złośliwie przekazać spreparowaną treść żądania, to aplikacja nie zachowa się w sposób niebezpieczny — np. nie ujawni tajnych danych, albo nie pozwoli na atak SQL Injection lub inny. To ryzyko można w dużej mierze ograniczyć dzięki poprawnie skonfigurowanej i możliwie jak najbardziej ścisłej walidacji.

<strong>Joi idealnie sprawdza się do obu przypadków.</strong>

<h2>Joi w Node.js</h2>

Joi może być używana w samodzielnie, bez HapiJS. Praca z Joi sprowadza się do dwóch kroków:

<ol>
    <li>Stworzenie <em>schema</em>, czyli obiektu, który opisuje Twoje oczekiwania wobec danych.</li>
    <li>Sprawdzenie czy przychodzące dane pasują do danej schema’y.</li>
</ol>

Najprostszy możliwy przykład. Oczekujemy, że zmienna zawiera wiek — czyli liczbę pomiędzy 18 a 130 😉 Tak wygląda schema w Joi:

<pre><code class="language-javascript">const schema = Joi.number().min(18).max(130);
</code></pre>

Natomiast sam proces walidacji sprowadza się do wywołania jednej funkcji:

<pre><code class="language-javascript">const age = 20;
Joi.assert(age, schema);
</code></pre>

Gdyby do stałej <code>age</code> przypisać liczbę poniżej 18 lub powyżej 130, wywołanie <code>Joi.assert</code> zakończyłoby się rzuceniem przez bibliotekę wyjątku:

<pre><code class="language-javascript">const age = 12;
Joi.assert(age, schema); // Error!
</code></pre>

<strong>Wow, to było łatwe, prawda?</strong> Joi zawiera analogiczne, proste i intuicyjne metody dla wielu innych typów, a między innymi dla number, string, array, date czy object. Przykład dla obiektu:

<pre><code class="language-javascript">const userSchema = Joi.object().keys({
  id: Joi.number().required(),
  …
});
</code></pre>

Dla ułatwienia, można też nie pisać <code>Joi.object().keys(…)</code>, wystarczy tylko <strong>sam literał obiektu</strong>. Jeszcze bardziej rozbudowany przykład:

<pre><code class="language-javascript">const userSchema = {
  id: Joi.number().required(),
  name: Joi.string().required(),
  address: Joi.string(),
  language: Joi.string().valid(['pl', 'en']).required()
};
</code></pre>

Ostatnie pole w obiekcie, <code>language</code>, ma ściśle zdefiniowane poprawne wartości. W przypadku błędu, automatycznie generowana informacja zwrotna będzie bardzo pomocna:

<pre><code>[1] language must be one of [pl, en]
</code></pre>

<strong>Zwróć też uwagę, że domyślnie wszystkie pola w obiekcie są opcjonalne</strong>. Aby to zmienić, dodaję do schema wywołanie metody <code>.required()</code>.

<h2>Sprawdzanie czy dane pasują do schema'y</h2>

Pokazałem jeden sposób walidowania danych — poprzez wywołanie funkcji <code>Joi.assert</code>, która rzuca wyjątek w wypadku błędu. W wielu miejscach jest to przydatne, bo, przykładowo, HapiJS automatycznie taki wyjątek wychwyci i zwróci odpowiedź z błędem do użytkownika.

Jednak wyjątek to nie zawsze to czego możesz chcieć, ale na szczęście Joi oferuje też drugą metodę: <code>Joi.validate()</code>. Przyjmuje ona 3 argumenty: dane, schema i funkcję (callback w stylu Node).

<pre><code class="language-javascript">Joi.validate(age, schema, (err, val) =&gt; {
  if (err) {
    console.log('Walidacja się nie udała!');
  } else {
    console.log('Wszystko w porządku.');
  }
});
</code></pre>

<strong>Warto pamiętać, że <code>Joi.validate</code> wywołuje callback synchronicznie.</strong>

<h2>Joi a typy</h2>

Jeśli zaczęłaś/zacząłeś się już bawić z Joi to mogłaś/eś zauważyć, że string <code>'123'</code> zostanie prawidłowo zwalidowany przez Joi <strong>jako liczba</strong>. Czy to bug?! Nie! <strong><code>Joi.number()</code> waliduje JavaScriptowe liczby, ale także coś co <em>wygląda</em> jak liczba, czyli na przykład string <code>'567'</code>.</strong> Czy to pożądane zachowanie?

Załóżmy, że chcesz zwalidować <em>querystring</em> — czyli parametry dopisywane po adresie w postaci <code>mojadres.com?param1=abc&amp;param2=123</code>. Domyślnie wszystkie są traktowane przez Node jako stringi — czyli po sparsowaniu otrzymujesz coś na kształt obiektu <code>{ param1: 'abc', param2: '123' }</code>. Jednak przecież wyraźnie drugi parametr jest liczbą!

Joi potrafi obsłużyć tę sytuację prawidłowo. Co więcej — po zwalidowaniu <strong>automatycznie dokonuje konwersji tego stringa na liczbę</strong>:

<pre><code class="language-javascript">const schema = Joi.number();
const kindOfNumber = '123';
Joi.validate(kindOfNumber, schema, (err, value) =&gt; {
  // value tutaj jest już liczbą!
  console.log(typeof value); // 'number'
});
</code></pre>

<strong>Taka konwersja typów jest również bardzo przydatna w przypadku dat</strong>. Daty przekazywane z przeglądarki do Node zawsze są stringami (lub liczbą w postaci timestampa). Joi potrafi automatycznie sparsować i przekonwertować te formaty na obiekt <code>Date</code> — a więc Ty możesz operować już bezpośrednio na datach 😎

<h2>Opcje Joi</h2>

<h3><code>convert</code></h3>

Jeśli powyższe zachowanie jest niepożądane to, hej, Joi można dodatkowo konfigurować ;) Możesz to zmienić na poziomie schema'y:

<pre><code class="language-javascript">const schema = Joi.number().options({ convert: false });
</code></pre>

Lub bezpośrednio przy wywołaniu <code>Joi.validate</code>

<pre><code class="language-javascript">Joi.validate(kindOfNumber, schema, { convert: false }, (err, value) =&gt; {
  // błąd!
});
</code></pre>

<h3><code>abortEarly</code></h3>

Drugim zachowaniem, o którym do tej pory jakoś nie miałem okazji wspomnieć, jest to, że Joi zaprzestaje walidacji po pierwszym napotykanym błędzie. Jest to mądre podejście, bo nie ma sensu niepotrzebnie męczyć serwera — <strong>jeśli dane są niepoprawne to najczęściej chcesz jak najszybciej przestać się nimi zajmować i zwrócić błąd</strong>:

<pre><code class="language-javascript">const schema = {
  id: Joi.number(),
  name: Joi.string(),
};

const clearlyNotUser = {
  id: 'lol',
  name: 12,
};

Joi.validate(clearlyNotUser, schema, (err, value) =&gt; {
  // błąd! Ale obiekt err zawiera informacje tylko o niepoprawnym id
});</code></pre>

Czasem może to być niepożądane. Wyobraź sobie, że dokonujesz walidacji formularza, który uzupełnia użytkownik. Nie chcesz go męczyć i zwracać mu błędy po kolei, jeden po jednym, prawda? Lepiej byłoby zwrócić <strong>wszystkie błędy na raz</strong>, aby użytkownik mógł poprawić wszystkie błędne pola. Pomoże w tym opcja <code>abortEarly</code>:

<pre><code class="language-javascript">Joi.validate(clearlyNotUser, schema, {abortEarly: false}, (err, value) =&gt; {
  // błąd! Obiekt err zawiera informację o obu błędach
});
</code></pre>

<h3><code>stripUnknown</code></h3>

Wspomniałem już gdzieś o tym, że Joi może Ci pomóc zabezpieczyć zwracane dane przed przypadkowym przesłaniem do użytkownika pól, które <strong>nigdy nie powinny ujrzeć światła dziennego</strong>. Wyobraź sobie taki scenariusz: W bazie danych przechowujesz użytkowników, ich imiona, nazwiska, ale też maile i hashe haseł. Każdy użytkownik może podejrzeć imiona innych użytkowników. Ale przypadkiem popełniłaś/eś błąd i Twoje API zwraca wszystkie dane na temat każdego użytkownika:

<pre><code class="language-javascript">const users = [
  { name: 'Michal', password: 'abcdefghijklmnopqrstu', email: 'email@email.com' },
  …
];
</code></pre>

Ups! <strong>Tej sytuacji można było uniknąć poprzez odpowiednie filtrowanie danych</strong> i usunięcie niepotrzebnych pól — ale to kiepska opcja, bo jeśli w przyszłości do obiektu użytkownika dojdą inne dane, których też nie chcemy zwracać, to będziemy musieli pamiętać, aby zmodyfikować ten kod, który dane filtruje. Zdecydowanie <strong>lepsza byłaby biała lista</strong>. Można by też po prostu pobierać z bazy tylko imiona. Jasne :) Ale załóżmy, że ignorujemy na razie taką możliwość, albo chcemy mieć też drugą warstwę bezpieczeństwa. Pomoże nam w tym Joi!

Wystarczy użyć opcji <code>stripUnknown</code>:

<pre><code class="language-javascript">const users = […];

const usersNameResponseSchema = Joi.array().items({
  name: Joi.string(),
});

Joi.validate(users, usersNameResponseSchema, { stripUnknown: true }, (err, value) =&gt; {
  console.log(value) // [ { name: 'Michal' } ]
});
</code></pre>

Jak widzisz, Joi może pomóc zarówno przy bezpieczeństwie danych wejściowych, jak i wyjściowych. Jeśli spytasz mnie o zdanie — <code>stripUnknown</code> to moja ulubiona opcja.

<h3>Definiowanie schema</h3>

Teraz chciałbym na konkretnych przykładach pokazać jak ja definiuję swoje schema’y. Nie wiem czy to najlepszy sposób, ale na pewno dobry i przetestowany w boju ;) Więc do dzieła!

Po pierwsze: <strong>Schema’y można deklarować raz a używać w wielu miejscach</strong>. Co mam na myśli? No na przykład wyobraź sobie, że chcesz napisać schema’y dla żądań pobrania, dodania i edycji użytkowników (np. GET, POST, PUT). Zacznij od zdefiniowania kształtu obiektu użytkownika:

<pre><code class="language-javascript">const userSchema = Joi.object({
  name: Joi.string().required(),
  language: Joi.string().valid(['pl', 'en']).required(),
  address: Joi.string().optional().allow(''), // pusty string jest też poprawny
});</code></pre>

Następnie stwórz schema’y opisujące kolejne żądania i odpowiedzi:

<pre><code class="language-javascript">const userWithIdSchema = userSchema.keys({ id: Joi.number().required() });

const createUserRequestSchema = userSchema;
const createUserResponseSchema = userWithIdSchema;

const updateUserRequestSchema = userWithIdSchema;
const updateUserResponseSchema = userWithIdSchema;

const getUserResponseSchema = Joi.array().items(userSchema);
</code></pre>

W ten sposób raz zadeklarowany kształt obiektu użytkownika został rozszerzony (o <code>id</code>) i użyty wielokrotnie w różnych kontekstach (np. w odpowiedzi na GET zwracana jest tablica użytkowników). <strong>Dzięki takiemu podejściu późniejsze zmiany w obiekcie użytkownika będą wymagały modyfikacji schema’y tylko w jednym miejscu</strong>.

Nota poboczna: <strong>Fani TypeScripta pewnie teraz zastanawiają się czy to oznacza, że trzeba napisać schema i potem jeszcze <code>interface</code> lub <code>type</code> dla każdego z żądań i każdej odpowiedzi?</strong> Niestety — tak. Istnieje jednak skrypt, który pozwala to zautomatyzować i aktualnie go testuję. Jednak jest to bardzo testowa wersja, a autor ogłosił, że porzucił pracę nad nim. Jeśli jednak ostatecznie uznam ten skrypt za przydatny to możliwe, że sam przejmę jego dalszy rozwój.

<h2>Prosta logika w Joi</h2>

Ja przenoszę do Joi niektóre elementy (te proste) logiki aplikacji. Na przykład gdy użytkownik się rejestruje to proszę go o dwukrotne podanie hasła, a następnie na backendzie <strong>sprawdzam czy oba hasła są takie same</strong>. To częsty scenariusz, prawda? Napisanie tego fragmentu kodu jest proste, ale jednocześnie wydaje się wtórne. Na szczęście Joi potrafi dokonać również takiej walidacji!

Aby móc porównywać pola pomiędzy sobą musisz nadać im jakieś identyfikatory (nazwy), a potem odwołać się do nich przez funkcję <code>ref</code>:

<pre><code class="language-javascript">const signUpRequestSchema = {
  login: Joi.string().required(),
  password: Joi.string().required(),
  repeatPassword: Joi.any().valid(Joi.ref('password')).required()
};
</code></pre>

W ten sposób jeśli <code>password</code> i <code>repeatPassword</code> nie będą takie same to Joi zwróci błąd.

<h2><code>language</code></h2>

Niestety błąd ten nie jest zbyt przyjazny dla użytkownika:

<pre><code>"repeatPassword" must be one of [ref:password]</code></pre>

Szczęśliwie, <strong>Joi pozwala również na całkowitą zmianę treści błędów</strong>:

<pre><code class="language-javascript">const signUpRequestSchema = {
  login: Joi.string().required(),
  password: Joi.string().required(),
  repeatPassword: Joi.any().valid(Joi.ref('password')).required().options({ language: { any: { allowOnly: 'must match password' } } })
};
</code></pre>

<pre><code>"repeatPassword" must match password</code></pre>

W ten sposób nadpisałem komunikat dla <strong>tego konkretnego błędu</strong>. Zaletą opcji <code>language</code> jest to, że wszystkie komunikaty błędów można by np. zapisać sobie w pliku JSON i wczytać warunkowo — np. zależnie od języka użytkownika. Komunikaty można znaleźć tutaj: https://github.com/hapijs/joi/blob/master/lib/language.js

<p class="important"><strong>Możliwości budowania relacji i logiki jest jeszcze więcej</strong>, ale w tym wpisie nie ma miejsca abym opisał wszystko :) Joi pozwala także na definiowanie pól wzajemnie wykluczających się albo alternatyw (<code>and</code>, <code>or</code> itp.) Więcej w dokumentacji! <a href="https://github.com/hapijs/joi/blob/master/API.md">https://github.com/hapijs/joi/blob/master/API.md</a></p>

<h2>Własne walidatory</h2>

Jeśli powyższe możliwości to nadal dla Ciebie za mało to, nie bój nic, Joi pozwala na definiowanie<strong> całkowicie dowolnych walidatorów i konwerterów</strong>! Co to takiego? Walidator sprawdza poprawność danych, a konwerter zmienia typ (jak w przykładzie z <code>Joi.number()</code> i stringiem <code>'123'</code>).

Konkretny przykład, prawdziwy, z aplikacji, nad którą pracuję. Umożliwiam użytkownikom zaznaczenie kilku elementów w aplikacji i kliknięcie guzika „pobierz”. Wtedy do API idzie request z listą ID elementów oddzielonych przecinkami (aby zapis był krótki, bo tych ID może być sporo):

<pre><code>https://example.typeofweb.com/download?ids=1,2,15,66
</code></pre>

Chciałbym dokonać walidacji parametru <code>ids</code>. Ma to być ciąg liczb oddzielonych od siebie przecinkami. Dodatkowo chciałbym, aby Joi dokonał <strong>konwersji tego ciągu na tablicę liczb</strong>. Czy jest to możliwe? Ależ tak! Wystarczy zadeklarować własne metody:

<pre><code class="language-javascript">const JoiCommaDelimited = Joi.extend({
  name: 'commaDelimited',
  base: Joi.string(),
  language: {
    items: '{{error}}',
  },
  pre(value, _state, _options) {
    return value.split(',');
  },
  rules: [{
    name: 'items',
    params: {
      items: Joi.any()
    },
    validate(params, value, state, options) {
      const validation = Joi.array().items(params.items).validate(value);
      if (validation.error) {
        return this.createError('commaDelimited.items', { error: validation.error }, state, options);
      } else {
        return validation.value;
      }
    }
  }]
});</code></pre>

Na spokojnie przeanalizuj ten kod — <strong>nie jest taki straszny jak się początkowo wydaje</strong> :) Jego wykorzystanie:

<pre><code class="language-javascript">const schema = {
  items: JoiCommaDelimited.commaDelimited().items(Joi.number())
};

Joi.validate({items: '1,2,3,50'}, schema, (err, value) =&gt; {
  console.log(value) // { items: [ 1, 2, 3, 50 ] }
});</code></pre>

W ten sposób niezależnie od tego czy jest to <code>ids=1</code> czy <code>ids=1,2,55</code> — zawsze otrzymuję tablicę liczb. Ponadto, gdyby ktoś próbował przekazać tam coś innego niż liczbę np. <code>ids=ab,2,c</code> Joi zwróci błąd! Pięknie :)

<h2>Podsumowanie</h2>

<strong>Umiesz już dokonywać nawet bardzo skomplikowanej walidacji dzięki Joi</strong>. Potrafisz definiować kształt obiektów, tworzyć prostą logiką, a także korzystać z zaawansowanych możliwości definiowania własnych walidatorów. Czy już lubisz Joi? Jestem przekonany, że zgodzisz się ze mną, że jest to niezwykle przyjemna biblioteka, która na pewno przypadnie Ci do gustu 👍
