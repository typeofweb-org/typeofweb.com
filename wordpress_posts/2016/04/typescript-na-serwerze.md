---
id: 11
index: 1
title: Po co TypeScript?
date: 2016-04-06T18:06:00.000Z
isMarkdown: false
status: publish
permalink: typescript-na-serwerze
authors:
  - michal-miszczyszyn
guid: https://typeofweb.com/index.php/2016/04/05/typescript-na-serwerze/
type: post
thumbnail:
  url: https://typeofweb.com/wp-content/uploads/2016/04/pexels-photo-574073.jpeg
  width: 1920
  height: 1271
categories:
  - slug: javascript
    name: JavaScript
  - slug: front-end
    name: Front-end
  - slug: back-end
    name: Back-end
series:
  slug: typescript
  name: TypeScript
seo:
  focusKeywords:
    - TypeScript

---
Jakiś czas temu na Facebookowej grupie <a href="https://www.facebook.com/groups/257881290932879/permalink/963126340408367/">JS News: After Hours</a> zadałem pytanie dotyczące szczegółów użycia języka TypeScript razem z node.js. Wiele osób w swoich komentarzach wyrażało jednak wątpliwość względem zastosowania TypeScriptu na serwerze w ogóle, a ponieważ liczba komentarzy była niemała, odniosłem się tam do nich w całkiem długiej odpowiedzi. Teraz postanowiłem zamienić tę odpowiedź we wpis na blogu.
<h1 id="pocotypescript">Po co TypeScript?</h1>
Zacznijmy od tego, że oryginalne pytanie było, moim zdaniem, nieprawidłowo postawione. Powinno brzmieć ono raczej „a po co TypeScript w ogóle?”, bo podobną rolę pełni on zarówno we front-endzie, jak i na serwerze. Guru architektury aplikacji twierdzą zresztą, że dzisiaj nie ma już podziału w projektowaniu aplikacji na front-end i backend. Oczywiście rozwiązywane problemy są różne, jednak podejście i wykorzystywane wzorce – bardzo podobne. Dlaczego więc używane narzędzia miałyby się różnić? A więc: <strong>Po co TypeScript?</strong>
<h1 id="statycznetypowanie">Statyczne typowanie</h1>
Odpowiedź na to pytanie może być długa, bo i powodów jest wiele. Na pewno warto zauważyć, że <strong>posiadanie informacji o typach zawsze jest lepsze niż ich brak</strong>. Kompilator sprawdzający poprawność typowania automatycznie eliminuje całą gamę potencjalnych błędów w kodzie. Mówi o tym świetna książka "Types and Programming Languages”<sup id="fnref:1"><a href="#fn:1" rel="footnote">1</a></sup>. Może się wydawać, że literatura z dziedziny IT wydana tak dawno (2002 r.) jest już nieaktualna, jednak wiedza w niej zawarta jest bardzo uniwersalna i uważam, że warto się zaznajomić z opisywanymi tam konceptami. W zasadzie wystarczy przeczytać tylko pierwszy rozdział (Introduction), który wprowadza do teorii typów i opisuje korzyści wynikające ze stosowania statycznego typowania. Pozostała część książki to bardziej formalny i matematyczny opis. Teoria typów to rozbudowany temat i nie posiadam nawet cząstki wiedzy z tej dziedziny, ale pewien jestem jednego: <strong>„Nigdy nie spojrzałem na kod i nie pomyślałem: »chciałbym mieć teraz mniej informacji o typach«”</strong>. Ciekawe spojrzenie na ten problem przedstawił Elben Shira w swoim wpisie <a href="http://elbenshira.com/blog/the-end-of-dynamic-languages/">The End of Dynamic Languages</a>.
<blockquote class="twitter-tweet" data-conversation="none" data-lang="en">
<p dir="ltr" lang="en"><a href="https://twitter.com/cholick">@cholick</a> Best comment: Never once have I looked at code and thought to myself "man, I wish I had less type information right now."</p>
— Matt Cholick (@cholick) <a href="https://twitter.com/cholick/status/678272936600440832">December 19, 2015</a></blockquote>
Wiele osób swoje negatywne nastawienie do statycznego typowania wynosi z języków, które wcale nie są najlepszymi do tego przykładami, np. C++ czy Java. Raz, że nie pokazują one najlepszej strony statycznego typowania (np. inferencji typów), a dwa, że w swoim zapisie są wręcz odstraszająco precyzyjne, formalne i przez to zbyt rozwlekłe. TypeScript jest inny. TS jest nadzbiorem JavaScriptu. Oznacza to, że każdy poprawny kod JS jest również poprawnym kodem TS. Do tego w TypeScript’cie powszechnie stosowana jest <strong>inferencja typów</strong>. Co to oznacza w praktyce? Weźmy przykładowy kod.
<pre><code class="language-typescript">function fn(b:boolean) {  
    if (b === true) {
        return 1;
    } else {
        return 2;
    }
}
</code></pre>
Już na pierwszy rzut oka widać, że ta funkcja zawsze zwraca liczbę, prawda? TypeScript również to wie i dlatego niepotrzebna jest tutaj dodatkowa adnotacja opisująca, że ta funkcja zwraca typ <code>number</code>. TypeScript kompiluje kod i wnioskuje (inferuje<sup id="fnref:2"><a href="#fn:2" rel="footnote">2</a></sup>?), że funkcja <code>fn</code> zwraca <code>number</code>, bo jest to oczywiste. Dzięki temu kod jest bardziej czytelny oraz zwięzły i niepotrzebne są bardzo formalne i długie deklaracje. Nadal <strong>zyskuje się ekspresywność JavaScriptu jednocześnie dodając statyczne typowanie.</strong>
<h2 id="pewnoiniepewno">Pewność i niepewność</h2>
Gdyby statyczne i dynamiczne typowanie chcieć opisać dwoma innymi słowami to za pewne byłyby to „pewność” i „niepewność”. Weźmy prosty przykład: W jaki sposób najprościej dowiedzieć się co zawiera dany obiekt w JavaScripcie? Jeśli jest to obiekt pochodzący z biblioteki to można spróbować zajrzeć do dokumentacji, jednak w tych często zdarzają się pomyłki lub niejasności i tak naprawdę jedynym definitywnym sposobem na przekonanie się o zawartości obiektu jest wypisanie go w konsoli i podejrzenie. Jako programista JavaScript jestem w zasadzie do tego przyzwyczajony. Stąd właśnie słowo „niepewność” – <strong>dopóki tego nie zweryfikuję, to nie wiem co znajduje się w obiekcie</strong>, jest on czarną skrzynką, nie jestem <em>pewien</em> z czym pracuję, dopóki rzeczywiście nie uruchomię kodu.

W jaki sposób najprościej dowiedzieć się co zawiera dany obiekt w TypScript’cie? W tym przypadku w zasadzie to pytanie nie ma sensu. Od początku doskonale wiem z czym pracuję, od początku znam typ wszystkiego i wszystkiemu nadaję jakiś typ. Jeśli biorę jakiś obiekt to jest on albo opisany interfejsem, albo jest instancją klasy, która ma gdzieś swoją definicję. Co ważne, <strong>niczego nie muszę szukać ani się domyślać</strong>, bo wszystko jest wiadome. Zauważyłem też, że znacznie mniej czasu spędzam na zaglądaniu do dokumentacji odkąd mam informacje o typach – bo wszystko jest <em>pewne</em>.
<h1 id="ide">IDE</h1>
Oprócz sprawdzania poprawności typów jest też kwestia współpracy z edytorami tekstu. Większość programistów używa zintegrowanych środowisk programistycznych posiadających ogromne możliwości statycznej analizy kodu. Jednak nawet narzędzia stworzone przez najbardziej łebskich ekspertów od analizy kodu zawodzą – w szczególności gdy w kodzie pojawia się niekonsekwencja lub jakaś wątpliwość. Tutaj wyłania się następna przewaga TypeScriptu nad dynamicznie typowanym JavaScriptem – <strong>możliwość wnioskowania na temat kodu przez edytor jest nieporównywalnie większa</strong> i po prostu łatwiejsza gdy używa się TS. Wiele razy spotkałem się z sytuacją, w której podpowiedzi edytora w JavaScripcie były dwuznaczne. Wystarczyło odpowiednio nazwać zmienną, aby edytor poczuł się zagubiony i np. podpowiadał metody, które nigdy nie miały prawa się tam znaleźć. Niejednokrotnie też zawiodły mnie narzędzia do automatycznej refaktoryzacji kodu napisanego w JavaScripcie np. zmieniając nazwy nie tych funkcji, co trzeba. W TypeScript’cie takie sytuacje się nie wydarzą, bo edytor ma pewność co gdzie się znajduje i co do czego należy. Dzięki temu praca jest prostsza i szybsza, a podpowiedzi edytora nader bardziej przydatne.
<h1 id="awracajcdoserwera">A wracając do serwera…</h1>
Wracając do głównego tematu wykorzystania TS razem z node.js. Gdy pisze się zarówno backend jak i front-end w TypeScript'cie, możliwe jest współdzielenie części plików pomiędzy nimi. Zapewnia to, oprócz zalet płynących z ponownego użycia tego samego kodu, spójność posiadanych informacji na temat typów. I Nie chodzi mi absolutnie o „izomorfizm” w rozumieniu aplikacji internetowych napisanych w JS, które współdzielą kod pomiędzy front-end i back-end i dzięki temu mogą np. wykonać renderowanie zarówno w przeglądarce, jak i na serwerze bez duplikowania kodu. Nie. Chodzi mi coś zupełnie innego.

Weźmy prosty przykład: jeśli budujesz REST API w node.js to wiesz jaka będzie odpowiedź z danego endpointa. Wiesz i umawiasz się z kimś, kto tworzy front-end, że ona taka będzie. Być może zawierasz tę informację w dokumentacji. Ale jeśli coś zmienia się w implementacji, to musisz zaktualizować dokumentację, poinformować front-endowców o zmianach i zadbać o to, aby w projekcie ponownie była spójność. Może być to kłopotliwe, w szczególności gdy projekt jest złożony. Zupełnie inaczej wygląda ta sama sytuacja jeśli JavaScript zastąpi się TypeScriptem: informację o tym co zwraca dany endpoint można zapisać w osobnym pliku jako <code>Interface</code> i ten plik współdzielić pomiędzy front-endem i back-endem. Kompilator zadba o to, żeby odpowiedź z serwera rzeczywiście pasowała do danego interfejsu, na front-endzie będzie 100% pewność co do pól znajdujących się w obiekcie przychodzącym z serwera, a w przypadku zmian po jednej ze stron komunikacja nadal będzie na pewno spójna, bo w innym wypadku kompilacja kodu się nie powiedzie. Proste? Oczywiście. I wykorzystywane przez bardziej dojrzałe technologie (JSF, czy Data Cotract w WCF) od dawna.
<h1 id="jestjednoale">Jest jedno „ale”</h1>
Jeśli cały nasz kod jest napisany w TypeScript’cie to omyłki w typach tutaj nie będzie (chyba że używa się typu <code>&lt;any&gt;</code>, czego zresztą serdecznie nie polecam). Jednak realnym problemem może być fakt, że informacje o typach zwracanych np. przez zewnętrzne biblioteki napisane w JS są zawarte w zewnętrznych plikach deklaracji <code>.d.ts</code>. Zdarza się, że pliki te nie są aktualizowane tak często jak same biblioteki i przez to mogą pojawiać się między nimi rozbieżności. Zdarza się też, że niektóre biblioteki nie posiadają plików deklaracji wcale, szczególnie dotyczy to projektów mniej popularnych. Teoretycznie ten problem można by rozwiązać <a href="http://staltz.com/all-js-libraries-should-be-authored-in-typescript.html">pisząc wszystkie biblioteki w TypeScript’cie</a>, ale to chyba temat na inny wpis… Na szczęście deklaracje typów są Open Source i każdy może je edytować. Większość deklaracji znajduje się w <a href="https://github.com/DefinitelyTyped/DefinitelyTyped">DefinitelyTyped</a>, ale w przyszłości zostaną one przeniesione do <a href="https://github.com/typings/registry">Typings registry</a>. Ten drugi na szczęście jest kompatybilny wstecz i pozwala również na wyszukiwanie i instalację plików z tego pierwszego. Edytowanie deklaracji jest dość łatwe i przyjemne. Sam zresztą modyfikowałem pliki <code>d.ts</code> dla AngularJS, bo deklaracje znajdujące się w repozytorium nie zostały zaktualizowane wraz z wyjście nowej wersji tego frameworka. Zajęło to dłuższą chwilę, ale korzyści z posiadania pełnej informacji o typach są nieocenione.
<h1 id="wnioski">Wnioski?</h1>
Bez wątpienia użycie TS eliminuje całą gamę przypadkowych bugów wynikających z niepewności odnośnie typów danych. Dzięki temu programiści mogą skupić się na rzeczach istotnych takich jak złożoność logiki biznesowej aplikacji, a nie rozpraszać się przypadkowo popełniamymi błędami, których można uniknąć stosując odpowiednio ścisłe typowanie. Dodatkowo możliwość zawarcia pewnych „kontraktów” na dane przychodzące z API jest nieocenioną pomocą pozwalającą wyeliminować brak spójności pomiędzy rzeczywistą odpowiedzią serwera, a formatem danych oczekiwanym przez front-end. Sama zaś składnia TypeScriptu nie odstaje w zasadzie w ogóle łatwością ekspresji od błyszczącego w tym zakresie JS-a, pomimo dodania pełnej informacji o typach. Ja to doceniam, mnie się podoba, zostałem całkowicie kupiony. Mam nadzieję, że kogoś jeszcze tym wpisem przekonam.
<div class="footnotes">
<ol>
 	<li id="fn:1" class="footnote">Benjamin C. Pierce - "Types and Programming Languages", The MIT Press <a title="return to article" href="#fnref:1">↩</a></li>
 	<li id="fn:2" class="footnote">wg. Słownika Języka Polskiego słowo „inferować” to archaizm, natomiast „inferencja” już nie jest archaizmem. Ot, ciekawostka. <a title="return to article" href="#fnref:2">↩</a></li>
</ol>
</div>
