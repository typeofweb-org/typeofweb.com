---
id: 1777
index: 101
title: Dolar na początku, dolar na końcu, czyli o notacji węgierskiej w JS
date: 2018-12-17T18:37:53.000Z
isMarkdown: true
status: publish
permalink: dolar-na-poczatku-dolar-na-koncu-czyli-o-notacji-wegierskiej-w-js
authors:
  - michal-miszczyszyn
guid: https://typeofweb.com/?p=1777
type: post
thumbnail:
  url: >-
    https://typeofweb.com/wp-content/uploads/2018/12/black-and-white-blur-book-164821.jpg
  width: 3887
  height: 2186
categories:
  - slug: dobry-kod
    name: Dobry Kod
  - slug: opinie
    name: Opinie
seo: {}

---
Na pewno często spotykasz kod, w którym nazwy zmiennych mają znak dolara na początku. Albo na końcu. Taki sposób oznaczania _szczególnych_ zmiennych nazywa się **Notacja węgierska**. Czy to dobra praktyka?

{/* more */}

## Historia notacji węgierskiej
Notacja węgierska została wymyślona przez programistę o imieniu Charles Simonyi — pracownika Xerox, a później architekta w Microsofcie. Oryginalnie, **notacja węgierska polegała na poprzedzeniu właściwej nazwy zmiennej małą literką oznaczającą jej typ**.

Przykładowo:
* `bDone` — _boolean_ o nazwie _done_
* `sName` — _string_ o nazwie _name_
* `fPi` — _float_ o nazwie _pi_
itd.

## Notacja węgierska dziś
Dzisiaj znaczenie notacji węgierskiej trochę się rozszerzyło.

<p class="important">Notacja węgierska, w ogólności, to konwencja nazywania zmiennych, w której część nazwy (np. prefiks albo sufiks) oznacza intencję lub typ zmiennej. Istotne jest to, że <strong>ta konwencja nie jest w żaden sposób weryfikowana przez kompilator</strong>, a jedynie przez programistów.</p>

Przykładowo:
* `users$` — _stream_ danych (np. rxjs) zawierających użytkowników
* `$container` — _element jQuery_ zawierający jakiś kontener

Wygląda znajomo? **Nazywanie zmiennych w jQuery ze znakiem dolara na początku to nic innego jak notacja węgierska**.

## Zalety notacji węgierskiej w 1980 roku
Oczywiście przywołuję roku 1980 w ogromnym przybliżeniu, ale to właśnie wtedy notacja węgierska została wymyślona. W tamtych czasach miała kilka wartych wymienienia zaleta:

* zawartość (i typ) zmiennej może być łatwiej wywnioskowana na podstawie jej nazwy
* łatwiej uniknąć konfliktów nazw
* proste było reprezentowanie wielu zmiennych związanych z jednym konceptem, np. `fPlayer`, `iPlayer`, `sPlayer`

## …ale mamy 2018
W obecnych czasach jednak, **notacja węgierska raczej bardziej przeszkadza niż pomaga**. Dlaczego?

Wyżej wymienione zalety praktycznie we wszystkich nowoczesnych językach **rozwiązano inaczej** — odpowiednio dzięki nowoczesnym edytorom kodu, dzięki zakresowi blokowemu zmiennych oraz dzięki strukturom/obiektom.

Dodatkowo trzeba zwrócić uwagę na **szereg wad**, jakie niesie notacja węgierska:

* skomplikowane nazwy bardziej rozbudowanych typów, które wyglądają jak jakiś szyfr np. `crszName` — czyli const-referencja na string zakończony bajtem zerowym (sic! autentyk)
* mniej czytelny kod, większe zwracanie uwagi na zawarcie typu w nazwie niż na samą nazwę, która by dobrze opisywała intencje np. `sPlayer` zamiast `playerName`

No i najważniejsza sprawa, o której już trochę wspomniałem: **Niespójne i mylące prefiksy w kodzie, który ewoluuje**. Kod żyje, zmienia się, jest refaktorowany. Zmiana operacji bez zmiany typu spowoduje prawdopodobnie błąd kompilatora. Dzięki temu możemy mieć pewność, że używane typy są zgodne i spójne. 

Inaczej jest jednak z notacją węgierską. Prefiksów nic ani nikt nie kontroluje, a ich aktualizacja jest obowiązkiem programisty. I uwierzcie mi na słowo, w przypadku tego typu mechanicznych czynności, człowiek często popełnia błędy. **W rozwijającym się projekcie, prawie na pewno znajdziemy błędy w notacji węgierskiej.**

Jeśli chcesz nauczyć się więcej to <a href="https://szkolenia.typeofweb.com/" target="_blank">zapisz się na szkolenie w Type of Web</a>.

## Eksperci o notacji węgierskiej

<blockquote>
<p>
  [Notacja węgierska] i inne sposoby kodowania typów po prostu przeszkadzają. Powodują one, że trudniej zmienić nazwę lub typ zmiennej, funkcji lub klasy. Powodują one, że trudniej czyta się kod. Dodatkowo sprawiają, że system kodowania może mylić czytelnika.
</p>
<footer>
— <cite>„Czyst Kod” — Robert C. Martin</cite>
</footer>
</blockquote>

<blockquote>
<p>
  [Notacja węgierska] po prostu komplikuje i zmniejsza abstrakcję.
</p>
<footer>
— <cite>Bjarne Stroustrup (tłumaczenie własne)</cite>
</footer>
</blockquote>

<blockquote>
<p>
  [Notacja węgierska] jest głupia
</p>
<footer>
— <cite>Dokumentacja kernela Linuksa (tłumaczenie własne)</cite>
</footer>
</blockquote>

## Kiedy notacja węgierska ma sens?
Czasami ma. Wtedy, gdy typu ani intencji **nie da się wyrazić inaczej**, albo kiedy **kompilator nie umie ich sprawdzić**. Dobrym przykładem niech będą niektóre metody cyklu życia w React (`UNSAFE_componentWillMount`) czy komponentów (`unstable_AsyncMode`). Nie ma możliwości innego ich oznaczenia, niż poprzez takie prefiksy. Kompilator nie umie odróżnić funkcji _safe_ on _unsafe_ ani _stable_ od _unstable_.

## Notacja węgierska w JavaScript
Notacja węgierska jest też akceptowalna, gdy piszesz w języku, w którym nie możesz określać typów. Hola, hola, czy ja właśnie napisałem, że wszystko powyżej nie ma zastosowania w JS-ie? **Absolutnie nie.**

Notacja węgierska w JS jest używana do oznaczania typów. Ale jest przecież lepszy sposób na rozwiązanie problemu nieznanych typów zmiennych: TypeScript lub Flow.

Jeśli odczuwasz chęć i potrzebę dodawania `$` na początku nazw swoich zmiennych zawierających elementy DOM, albo na końcu zmiennych przechowujących strumienie, to w zasadzie dobry znak. **To, czego Ci _naprawdę_ brakuje to po prostu typy**. A więc użyj dialektu, który je ma, zanim wykopiesz pod sobą niezły dołek.
