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

Wciąż dopytujecie się o proces _self-publishing_ [mojej książki „TypeScript na poważnie”](https://typescriptnapowaznie.pl/) od strony technicznej. W czym ją pisałem? Jak tworzyłem e-booki? Dlaczego zdecydowałem się na markdown? Jakich narzędzi używałem? Śpieszę odpowiedzieć – to wszystko w tym wpisie :)

<!--more-->

<p class="important">Przedsprzedaż książki zakończyła się ogromnym sukcesem! Teraz poświęcam całą energię na realizację złożonych zamówień. <strong>Sklep powróci 1. listopada.</strong> Jeśli chcesz, mogę Ci o tym przypomnieć – wystarczy, że zostawisz swojego maila poniżej.</p>

<link href="//cdn-images.mailchimp.com/embedcode/classic-10_7.css" rel="stylesheet" type="text/css">
<style type="text/css">
  #mc_embed_signup {
    background: #fff;
    margin: 0 auto;
    font: 16px;
    max-width: 800px;
  }
  /* Add your own Mailchimp form style overrides in your site stylesheet or in this style block.
	   We recommend moving this block and the preceding CSS link to the HEAD of your HTML file. */
</style>
<style type="text/css">#mc-embedded-subscribe-form input[type="checkbox"] {
    display: inline;
    width: auto;
    margin-right: 10px;
  }
  #mergeRow-gdpr {
  }
  #mergeRow-gdpr fieldset label {
    font-weight: normal;
  }
  #mc-embedded-subscribe-form .mc_fieldset {
    border: none;
    min-height: 0px;
    padding-bottom: 0px;
  }</style>
<div id="mc_embed_signup"><form action="https://typeofweb.us16.list-manage.com/subscribe/post?u=8073e459fa97c5444592f393a&amp;id=9c6a75a636" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate=""><div id="mc_embed_signup_scroll"><div class="mc-field-group"><label for="mce-EMAIL">Adres email <span class="asterisk">*</span></label><input type="email" value="" name="EMAIL" class="required email" id="mce-EMAIL"></div><div class="mc-field-group"><label for="mce-FNAME">Imię </label><input type="text" value="" name="FNAME" class="" id="mce-FNAME"></div><div class="mc-field-group"><label for="mce-LNAME">Nazwisko </label><input type="text" value="" name="LNAME" class="" id="mce-LNAME"></div><div><input type="hidden" value="typescriptnapowaznie.pl" name="SOURCE" class="" id="mce-SOURCE"></div><div id="mergeRow-gdpr" class="mergeRow gdpr-mergeRow content__gdprBlock mc-field-group"><div class="content__gdpr"><fieldset class="mc_fieldset gdprRequired mc-field-group" name="interestgroup_field" style="max-width: 100%;"><label class="checkbox subfield" for="gdpr_27543" style="max-width: 100%;"><input type="checkbox" id="gdpr_27543" name="gdpr[27543]" value="Y" class="av-checkbox gdpr"><span>Rozumiem i akceptuję <a href="https://typeofweb.com/regulamin/" target="_blank" rel="noopener noreferrer">Regulamin Newslettera</a> oraz <a href="https://typeofweb.com/polityka-prywatnosci/" target="_blank" rel="noopener noreferrer">Politykę Prywatności</a>. Wyrażam zgodę na otrzymywanie na podany adres e-mail informacji handlowych w rozumieniu ustawy z dnia 18 lipca 2002 r. o świadczeniu usług drogą elektroniczną.</span></label></fieldset></div></div><div id="mce-responses" class="clear"><div class="response" id="mce-error-response" style="display: none"></div><div class="response" id="mce-success-response" style="display: none"></div></div><div style="position: absolute; left: -5000px" aria-hidden="true"><input type="text" name="b_8073e459fa97c5444592f393a_9c6a75a636" tabindex="-1" value=""></div><div class="clear"><input type="submit" value="Zapisz się" name="subscribe" id="mc-embedded-subscribe" class="button"></div></div></form></div>
<script type="text/javascript" src="//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js"></script>
<script type="text/javascript">
  (function ($) {
    window.fnames = new Array();
    window.ftypes = new Array();
    fnames[0] = "EMAIL";
    ftypes[0] = "email";
    fnames[1] = "FNAME";
    ftypes[1] = "text";
    fnames[2] = "LNAME";
    ftypes[2] = "text";
    fnames[3] = "SOURCE";
    ftypes[3] = "text";
    /*
     * Translated default messages for the $ validation plugin.
     * Locale: PL
     */
    $.extend($.validator.messages, {
      required: "To pole jest wymagane.",
      remote: "Proszę o wypełnienie tego pola.",
      email: "Proszę o podanie prawidłowego adresu email.",
      url: "Proszę o podanie prawidłowego URL.",
      date: "Proszę o podanie prawidłowej daty.",
      dateISO: "Proszę o podanie prawidłowej daty (ISO).",
      number: "Proszę o podanie prawidłowej liczby.",
      digits: "Proszę o podanie samych cyfr.",
      creditcard: "Proszę o podanie prawidłowej karty kredytowej.",
      equalTo: "Proszę o podanie tej samej wartości ponownie.",
      accept: "Proszę o podanie wartości z prawidłowym rozszerzeniem.",
      maxlength: $.validator.format(
        "Proszę o podanie nie więcej niż {0} znaków."
      ),
      minlength: $.validator.format(
        "Proszę o podanie przynajmniej {0} znaków."
      ),
      rangelength: $.validator.format(
        "Proszę o podanie wartości o długości od {0} do {1} znaków."
      ),
      range: $.validator.format(
        "Proszę o podanie wartości z przedziału od {0} do {1}."
      ),
      max: $.validator.format(
        "Proszę o podanie wartości mniejszej bądź równej {0}."
      ),
      min: $.validator.format(
        "Proszę o podanie wartości większej bądź równej {0}."
      ),
      mc_gdpr: "Ta opcja jest wymagana."
    });
  })(jQuery);
  var $mcj = jQuery.noConflict(true);
</script>
<!--End mc_embed_signup-->
<!-- /wp:html -->

## Dlaczego Markdown do self-publishing?

Zdecydowałem się napisać „TypeScript na poważnie” w markdownie. Jest to prosty język, w którym używa się symboli do formatowania tekstu. Wygląda to tak, jak widać na poniższym screenshocie; zresztą w markdownie piszę też teraz niniejszy artykuł :)

[caption id="attachment_2598" align="aligncenter" width="1024"]<a href="https://typeofweb.com/wp-content/uploads/2020/09/Screenshot-2020-09-30-at-16.10.35.png"><img src="https://typeofweb.com/wp-content/uploads/2020/09/Screenshot-2020-09-30-at-16.10.35-1024x528.png" alt="" width="1024" height="528" class="size-large wp-image-2598" /></a> Fragment tego artykułu w Markdownie.[/caption]

Dlaczego Markdown, a nie zwykły Word, albo, w drugą stronę, znany w środowisku naukowym LaTeX? Od tego ostatniego nie udało mi się zupełnie uciec, o czym za moment, ale powodów do używania markdowna jest kilka.

<p class=important>Jeśli zastanawiasz się, dlaczego w ogóle napisałem książkę, to na pewno zaciekawi Cię ten wpis:</p>

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

[caption id="attachment_2604" align="aligncenter" width="1024"]<a href="https://typeofweb.com/wp-content/uploads/2020/09/Screenshot-2020-09-30-at-16.19.33.png"><img src="https://typeofweb.com/wp-content/uploads/2020/09/Screenshot-2020-09-30-at-16.19.33-1024x500.png" alt="" width="1024" height="500" class="size-large wp-image-2604" /></a> Widok repozytorium na GitHubie.[/caption]

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

[caption id="attachment_2599" align="aligncenter" width="936"]<a href="https://typeofweb.com/wp-content/uploads/2020/09/Screenshot-2020-09-30-at-15.21.42.png"><img src="https://typeofweb.com/wp-content/uploads/2020/09/Screenshot-2020-09-30-at-15.21.42-936x1024.png" alt="" width="936" height="1024" class="size-large wp-image-2599" /></a> Fragment skryptu do formatowania kodu w książce.[/caption]

To załatwiło większość problemów, ale nie wszystkie – niektóre linijki nadal były dłuższe niż wyznaczony limit znaków, ale takie sytuacje **mój skrypt również wykrywał** i informował o tym, abym ręcznie poprawił. Dodatkowo, niektóre z fragmentów kodu sformatowałem ostatecznie samodzielnie, aby były bardziej czytelne.

### Spis treści

Ku mojemu wielkiemu zaskoczeniu, okazało się, że narzędzia Apple mają problem z polskimi znakami w linkach do rozdziałów. Ponieważ Pandoc generował odnośniki automatycznie i zawierał w nich po prostu pełne tytuły rozdziałów, dla urządzeń Apple stanowiło to problem nie do pokonania!

Napisałem więc kolejny skrypt, który polskie znaki w odnośnikach zamieniał na odpowiedniki w alfabecie łacińskim („ą” na „a”, „ź” na „z” i tak dalej). Uff.

## Efekt finalny self-publishing

Jakie są efekty tego mojego _self-publishing_? Każdy, kto kupił e-booka widzi :)

[gallery columns="2" link="file" size="large" ids="2600,2601"]

Jeśli masz jakieś pytania odnośnie _self-publishing_, procesu powstawania książki, technikaliów – to **zostaw komentarz, albo napisz do mnie**! Odpowiadam każdemu.
