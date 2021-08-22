---
index: 74
title: 'Serwer HTTP lokalnie: Sposób na problemy z CORS i file:///'
date: 2018-04-09T14:24:38.000Z
isMarkdown: true
status: publish
permalink: lokalny-serwer-http-proste-sposoby-na-problemy-z-file
authors:
  - michal-miszczyszyn
type: post
thumbnail:
  url: https://res.cloudinary.com/type-of-web/wp-content/uploads/2018/04/pexels-photo-325229.jpeg
  width: 1280
  height: 448
categories:
  - slug: javascript
    name: JavaScript
  - slug: back-end
    name: Back-end
seo:
  focusKeywords:
    - CORS
    - serwer HTTP
  focusKeywordSynonyms:
    - serwera HTTP, serwerem HTTP
  metadesc: >-
    Stawiamy lokalny serwer HTTP. Jak pozbyć się błędów CORS, file:///?
    Wystarczy serwer http. Postaw własny lokalny serwer w kilka sekund!
---

Po co Ci lokalny serwer HTTP? Bardzo wiele osób skarży się mi na dziwne problemy z aplikacjami. Błędy są przeróżne np. nawiązujące do magicznego „CORS”, a często mają wspólne źródło: Próba otwarcia pliku `.html` w przeglądarce przez `file://` i brak serwera HTTP.

{/_ more _/}

## Błędy CORS a protokół `file://`

Przykładem błędu, na który często skarżą się czytelnicy jest:

```
XMLHttpRequest cannot load file://……
Cross origin requests are only supported for protocol schemes: http, data, chrome, chrome-extension, https, chrome-extension-resource
```

lub

```
Failed to load http://…: The 'Access-Control-Allow-Origin' header has a value 'null' that is not equal to the supplied origin. Origin 'null' is therefore not allowed access.
```

Wynika to z ograniczeń bezpieczeństwa nałożonych przez przeglądarkę.

Inny popularny błąd po prostu niepoprawne ścieżki:

```
GET file:///……… net::ERR_FILE_NOT_FOUND
```

Wynika to najczęściej z tego, że aplikacja została zbudowana z pewnymi założeniami co do adresu (folderu, ścieżki) pod którym się znajduje. Natomiast gdy próbujesz uruchomić ją prosto z dysku, to ścieżka jest zupełnie inna — zależna od tego gdzie umieściłaś/eś plik. Brakuje serwera HTTP.

## Rozwiązanie: Serwer HTTP

Nie będziemy mówić o hackowaniu Chrome'a ;) Tylko o prawdziwym rozwiązaniu problemu. **Postaw lokalny serwer HTTP**.

Jak? Nie, nie każę Ci instalować XAMPP-a 😂 Masz kilka opcji.

### python 2 i SimpleHTTPServer

Mój ulubiony i najprostszy sposób to skorzystanie z pythona. Na MacOS jest on dostępny bez konieczności instalowania czegokolwiek. Wchodzę tylko do folderu, który chcę zaserwować i wpisuję:

```bash
python -m SimpleHTTPServer
```

Domyślnie strona będzie dostępna pod adresem `http://0.0.0.0:8000`. Numer portu można zmienić dodając jeden argument:

```bash
python -m SimpleHTTPServer 9999
```

### python 3 i http.server

Analogiczny serwer HTTP w Pythonie 3 można szybko postawić korzystając z polecenia:

```bash
python3 -m http.server
```

Podobnie zmienia się numer portu:

```bash
python3 -m http.server 9999
```

### Serwer HTTP w node i `http-server`

Jeśli Twoim ulubionym środowiskiem jest Node.js, a ukochanym językiem JavaScript to na pewno masz już zainstalowany `npm` i `npx`, prawda? Jest paczka npm, która służy do uruchomienia **prostego serwera HTTP**. Znowu, wchodzę do folderu i wpisuję:

```bash
npx http-server
```

Strona będzie dostępna pod `http://127.0.0.1:8081`. Port zmienisz przełącznikiem `-p`:

```bash
npx http-server -p 9999
```

Ten serwer HTTP posiada bogate możliwości konfigurowania, więcej tutaj: [npmjs.com/package/http-server#available-options](https://www.npmjs.com/package/http-server#available-options)

Jeśli uznasz, że `http-server` przyda Ci się częściej to warto go instalować globalnie na stałe:

```bash
npm install -g http-server
```

i potem już tylko:

```bash
http-server
```

## HTTPS

Przy okazji muszę wspomnieć, że o ile lokalnie możesz używać HTTP, to jednak na produkcji na pewno powinnaś(-eś) mieć HTTPS! To jest absolutnie niezbędne. Przeczytaj, [dlaczego Twoja strona musi używać HTTPS](https://typeofweb.com/twoja-strona-powinna-byc-na-https/).

## Podsumowanie

Nie zagłębiałem się w teorię. Sama praktyka (podobnie zresztą, jak na naszych [szkoleniach z programowania](https://typeofweb.com/szkolenia?utm_source=https%3A%2F%2Ftypeofweb.com%2F&utm_medium=courses_slogan_manual)). Umiesz postawić swój własny serwer http i pozbyć się problemu z CORS, a to wszystko dosłownie w kilka sekund. Mam nadzieję, że pomogłem :) Zapamiętaj jedno z tych poleceń — mi się one przydają praktycznie codziennie!
