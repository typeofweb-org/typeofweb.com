---
id: 2581
index: 135
title: 'Self-publishing: Jak napisałem książkę w markdownie?'
date: 2020-09-30T14:24:58.000Z
isMarkdown: true
status: publish
permalink: self-publishing-jak-napisalem-ksiazke-w-markdownie
authors:
  - michal-miszczyszyn
guid: https://typeofweb.com/?p=2581
type: post
thumbnail:
  url: >-
    https://typeofweb.com/wp-content/uploads/2020/09/self-publishing-typescript-na-powaznie.png
  width: 1200
  height: 630
categories:
  - slug: inicjatywy
    name: Inicjatywy
  - slug: opinie
    name: Opinie
series:
  slug: self-publishing
  name: Self Publishing
seo:
  focusKeywords:
    - self-publishing

---
# Self-publishing: Jak napisałem książkę w markdownie?

Wciąż dopytujecie się o proces _self-publishing_ [mojej książki „TypeScript na poważnie”](https://typescriptnapowaznie.pl/) od strony technicznej. W czym ją pisałem? Jak tworzyłem e-booki? Dlaczego zdecydowałem się na markdown? Jakich narzędzi używałem? Śpieszę odpowiedzieć – to wszystko w tym wpisie :)

{/* more */}

<p class="important">Przedsprzedaż książki zakończyła się ogromnym sukcesem! Teraz poświęcam całą energię na realizację złożonych zamówień. <strong>Sklep powróci 1. listopada.</strong> Jeśli chcesz, mogę Ci o tym przypomnieć – wystarczy, że zostawisz swojego maila poniżej.</p>

<NewsletterForm />

## Dlaczego Markdown do self-publishing?
Zdecydowałem się napisać „TypeScript na poważnie” w markdownie. Jest to prosty język, w którym używa się symboli do formatowania tekstu. Wygląda to tak, jak widać na poniższym screenshocie; zresztą w markdownie piszę też teraz niniejszy artykuł :)


<figure id="attachment_2598" align="aligncenter" width="1024">
  <a href="https://typeofweb.com/wp-content/uploads/2020/09/Screenshot-2020-09-30-at-16.10.35.png"><img src="https://typeofweb.com/wp-content/uploads/2020/09/Screenshot-2020-09-30-at-16.10.35-1024x528.png" alt="" width="1024" height="528" class="size-large wp-image-2598" /></a>
  <figcaption>
    Fragment tego artykułu w Markdownie.
  </figcaption>
</figure>


Dlaczego Markdown, a nie zwykły Word, albo, w drugą stronę, znany w środowisku naukowym LaTeX? Od tego ostatniego nie udało mi się zupełnie uciec, o czym za moment, ale powodów do używania markdowna jest kilka.

<p class="important">Jeśli zastanawiasz się, dlaczego w ogóle napisałem książkę, to na pewno zaciekawi Cię ten wpis:</p>

https://typeofweb.com/napisalem-ksiazke-kilka-slow-o-typescript-na-powaznie/

Przede wszystkim Markdown jest niesamowicie prosty. Tekst wygląda bardzo czytelnie nawet dla laików i jest łatwy w edytowaniu z każdego urządzenia – część poprawek wprowadzałem na iPadzie i nawet na iPhonie!

Drugi powód jest nieco bardziej techniczny: Markdown wspaniale się sprawdza, jako format pośredni pomiędzy zwykłym tekstem a wieloma formatami docelowymi. Na podstawie markdowna z łatwością wygenerowałem pliki PDF, EPUB, MOBI, DOCX i HTML!

## Edytor do self-publishing
Moim ukochanym edytorem jest **iA Writer**, w którym piszę też wszystkie blogposty. To właśnie w nim powstała cała książka! Jest to bardzo prosty edytor tekstu z podstawowym wyświetlaniem formatowania markdowna – minimalizm.

## Pandoc
Sercem całej operacji jest **Pandoc**, czyli „uniwersalny konwerter dokumentów”, jak głosi jego strona internetowa. Użyłem tego niesamowitego narzędzia, aby na podstawie rozdziałów książki napisanych w markdownie wygenerować pliki w różnych formatach, o czym wspominałem kilka akapitów wyżej.

Nie obyło się też bez otwarcia kilku [_issues_](https://github.com/jgm/pandoc/issues?q=author%3Ammiszy+) i nawet jednego [_pull requesta_](https://github.com/jgm/skylighting/pull/94) do Pandoc, a dodam, że jest napisany w Haskellu, więc było to nie lada zadanie!

Ogromną zaletą Pandoc jest mnogość opcji konfiguracyjnych, wtyczek do markdowna, **własnych filtrów** oraz świetne wsparcie dla projektów takich jak moja książka w self-publishing. Przykładowo, dopisałem własny filtr dodający **nową składnię do Markdowna** w celu oznaczania fragmentów tekstu, które miały nie mieć indentacji albo powinny przylegać do prawej strony.

## Docker i GitHub
Do budowania książki użyłem też **Dockera**. Po co? Znowu dwa powody: nie chciałem zaśmiecać sobie komputera i planowałem **e-booki generować automatycznie na serwerze CI**. Ah, no tak, bo o tym nie wspomniałem: całą książkę trzymam oczywiście **na GitHubie!**


<figure id="attachment_2604" align="aligncenter" width="1024">
  <a href="https://typeofweb.com/wp-content/uploads/2020/09/Screenshot-2020-09-30-at-16.19.33.png"><img src="https://typeofweb.com/wp-content/uploads/2020/09/Screenshot-2020-09-30-at-16.19.33-1024x500.png" alt="" width="1024" height="500" class="size-large wp-image-2604" /></a>
  <figcaption>
    Widok repozytorium na GitHubie.
  </figcaption>
</figure>


Ostatecznie więc proces wyglądał tak: Po napisaniu fragmentu tekstu robiłem `git commit` i `git push` do prywatnego repozytorium na GitHubie. Wcześniej skonfigurowałem akcję w **GitHub Actions**, która reagowała na zmiany w książce i automatycznie budowała obraz Dockera, a następnie używała w nim Pandoc do zbudowania książki w dwóch formatach: PDF i EPUB. Kolejnym krokiem było wygenerowanie pliku MOBI (Kindle), do czego użyłem narzędzia `ebook-convert` z aplikacji Calibre. Na koniec, moja akcja tworzyła nowy tag oraz _release_ na GitHubie i dodawała do niego trzy stworzone pliki.

**Self-publishing** w każdym tego słowa znaczeniu!

## Dostosowywanie 
Większość opcji pomiędzy formatami była taka sama, ale oczywiście Pandoc umożliwia zmodyfikowanie osobno PDF i osobno EPUB, co też uczyniłem.

Wspominałem, że nie udało mi się uciec od LaTeXu, bo ostatecznie **zmuszony byłem dopisać kilkadziesiąt linii kodu w LaTeX** doprowadzających mojego PDF-a do takiego efektu, jakiego pożądałem. Pandoc do generowania plików PDF zamienia Markdown na Latex i dopiero później na PDF – i uwierz mi, mimo, że brzmi to niepotrzebnie skomplikowanie, to fantastyczna opcja, która umożliwiła mi praktycznie dowolne zmienianie wynikowego pliku!

**EPUB to połączenie XHTML i CSS** i tutaj również Pandoc pozwala na jego modyfikowanie. Do e-booków dołączyłem własny plik CSS oraz fonty w formacie .otf – dokładnie tak samo, jak na stronach internetowych. Co ciekawe, w EPUB działają _media queries_, a więc można sposób formatowania e-booka uzależnić choćby od wielkości ekranu, na którym plik został otwarty! Przykładowo, w przypadku „TypeScript na poważnie”, na urządzeniach z ekranem mniejszym niż 600px tekst nie będzie wyjustowany (bo wtedy źle wyglądał), a wyrazy na końcu wierszy nie będą dzielone.

Dodatkowo, Pandoc umożliwia zapisywanie różnych metadanych do różnych formatów plików. Dzięki temu mogłem z łatwością podać inne numery ISBN dla EPUB i PDF. ISBN dla formatu MOBI (Kindle) dodałem narzędziem `ebook-convert`.

## Skrypty
Nie byłbym Programistą®, gdybym nie poświęcił kilku godzin na napisanie skryptów, które automatyzowały coś, co zrobiłbym ręcznie w godzinę 😜

Mówiąc poważnie, zależało mi na kilku rzeczach:

1. Aby każdy żaden przykład kodu w książce nie zawierał błędów składniowych,
2. Aby każdy fragment był jednakowo sformatowany,
3. Aby spis treści poprawnie działał na urządzeniach Apple.

### Formatowanie kodu
Wszystkie te problemy rozwiązałem poprzez stworzenie skryptu napisanego w (no nie zgadniecie) TypeScripcie. Do rozwiązania dwóch pierwszych problemów **użyłem narzędzia Prettier**. Skrypt wyszukiwał w tekście książki fragmentów kodu, następnie formatował je Prettierem i zapisywał. Miałem dość restrykcyjne ustawienia, szczególnie pod względem długości wersów:

```json
{
  "printWidth": 53,
  "tabWidth": 2,
  "proseWrap": "preserve",
  "trailingComma": "all",
  "arrowParens": "always",
  "endOfLine": "lf"
}
```

53 znaki fontem o stałej szerokości to była maksymalna liczba, jaką mogła pomieścić jedna linijka w książce drukowanej i PDF.


<figure id="attachment_2599" align="aligncenter" width="936">
  <a href="https://typeofweb.com/wp-content/uploads/2020/09/Screenshot-2020-09-30-at-15.21.42.png"><img src="https://typeofweb.com/wp-content/uploads/2020/09/Screenshot-2020-09-30-at-15.21.42-936x1024.png" alt="" width="936" height="1024" class="size-large wp-image-2599" /></a>
  <figcaption>
    Fragment skryptu do formatowania kodu w książce.
  </figcaption>
</figure>


To załatwiło większość problemów, ale nie wszystkie – niektóre linijki nadal były dłuższe niż wyznaczony limit znaków, ale takie sytuacje **mój skrypt również wykrywał** i informował o tym, abym ręcznie poprawił. Dodatkowo, niektóre z fragmentów kodu sformatowałem ostatecznie samodzielnie, aby były bardziej czytelne.

### Spis treści
Ku mojemu wielkiemu zaskoczeniu, okazało się, że narzędzia Apple mają problem z polskimi znakami w linkach do rozdziałów. Ponieważ Pandoc generował odnośniki automatycznie i zawierał w nich po prostu pełne tytuły rozdziałów, dla urządzeń Apple stanowiło to problem nie do pokonania!

Napisałem więc kolejny skrypt, który polskie znaki w odnośnikach zamieniał na odpowiedniki w alfabecie łacińskim („ą” na „a”, „ź” na „z” i tak dalej). Uff.

## Efekt finalny self-publishing
Jakie są efekty tego mojego _self-publishing_? Każdy, kto kupił e-booka widzi :)


<Gallery columns="2" link="file" size="large">
  <img src="https://typeofweb.com/wp-content/uploads/2020/09/Screenshot-2020-09-30-at-15.22.54.png" loading="lazy" alt="undefined" title="Książka widoczna w edytorze vscode." width="708" height="1236" />
<img src="https://typeofweb.com/wp-content/uploads/2020/09/Screenshot-2020-09-30-at-15.33.55.png" loading="lazy" alt="undefined" title="PDF z widocznymi ramkami do składu." width="1372" height="1926" />
</Gallery>


Jeśli masz jakieś pytania odnośnie _self-publishing_, procesu powstawania książki, technikaliów – to **zostaw komentarz, albo napisz do mnie**! Odpowiadam każdemu.
