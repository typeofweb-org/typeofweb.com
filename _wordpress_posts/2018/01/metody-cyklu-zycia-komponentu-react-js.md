---
title: Metody cyklu życia komponentu w React.js
date: 2018-01-18T17:33:42.000Z
isMarkdown: false
status: publish
permalink: metody-cyklu-zycia-komponentu-react-js
authors:
  - michal-miszczyszyn
type: post
thumbnail:
  url: >-
    /public/assets/wp-content/uploads/2017/11/rose-blue-flower-rose-blooms-67636.jpeg
  width: 1280
  height: 847
categories:
  - slug: javascript
    name: JavaScript
  - slug: front-end
    name: Front-end
series:
  slug: react-js
  name: React.js
seo:
  metadesc: >-
    Przy okazji omawiania komponentów będących klasami w React.js, wspomniałem
    też o możliwości korzystania z metod cyklu życia (lifecycle methods).
    Chciałbym do tego tematu teraz powrócić. Pokażę jakie metody cyklu życia
    definiuje React.js, do czego one służą i kiedy mogą się przydać.
---

Przy okazji omawiania komponentów będących klasami w React.js, wspomniałem też o możliwości korzystania z metod cyklu życia (<em>lifecycle methods</em>). Chciałbym do tego tematu teraz powrócić. Pokażę jakie metody cyklu życia definiuje React.js, do czego one służą i kiedy mogą się przydać.

---

<h2>Cykl życia komponentu</h2>

Bardzo dokładnie omawiamy cykl życia komponentów na szkoleniach. <a href="https://szkolenia.typeofweb.com/" target="_blank">zapisz się na szkolenie z React</a>.

Każdy komponent ma pewien określony cykl życia. Na odpowiednich etapach wywoływane są też jego metody cyklu życia. Możemy je podzielić ogólnie na dwie grupy:

<ul>
    <li>z nazwami zaczynającymi się od <code>will</code> — wywoływane zanim się coś wydarzy</li>
    <li>z nazwami zaczynającymi się od <code>did</code> — wywoływane po tym jak coś się zdarzyło</li>
</ul>

Oto kolejne etapy życia komponentów:

<h3>Montowanie</h3>

Komponent jest tworzony i dodawany do drzewa Dom.

<ul>
    <li><code>constructor(props)</code> — jeśli definiujesz konstruktor to nie zapomnij wywołać w nim <code>super(props)</code> na samym początku; możesz też tam ustawić <code>this.state = {…}</code> bez konieczności używania <code>setState</code>. To będzie początkowy stan aplikacji. Inne operacje (efekty uboczne, subskrypcje) powinny się znaleźć w <code>componentDidMount</code></li>
    <li><code>componentWillMount()</code> — wywoływany tuż przed zamontowaniem komponentu; ta metoda raczej Ci się nie przyda</li>
    <li><code>render()</code> — funkcja, która powinna zwrócić jeden z możliwych wyników:
<ul>
    <li>element (JSX)</li>
    <li>tablicę elementów (JSX)</li>
    <li>string lub liczbę</li>
    <li><code>null</code> (nic się nie renderuje)</li>
    <li>boolean (nic się nie renderuje)</li>
    <li>Portal (stworzony przez <code>ReactDOM.createPortal(…)</code>)</li>
</ul>
</li>
    <li><code>componentDidMount()</code> — wywoływana po zamontowaniu komponentu; to dobre miejsce na jakiekolwiek funkcje polegające na DOM lub na subskrypcje (nie zapomnij o usunięciu subskrypcji w <code>componentWillUnmount()</code>!)</li>
</ul>

<h3>Aktualizacja</h3>

<em>Update</em> może zostać wywołany gdy zmieniają się <em>props</em> lub <em>state</em>.

<ul>
    <li><code>componentWillReceiveProps(nextProps)</code> — wywoływana m.in. gdy zmieniają się propsy (np. gdy element-rodzic je zmienia); warto porównać <code>this.props</code> z <code>nextProps</code> i sprawdzić czy rzeczywiście coś się zmieniło (bo nie zawsze musi…)</li>
    <li><code>shouldComponentUpdate(nextProps, nextState)</code> — wywoływana zawsze przed <code>render()</code>; jeśli z tej funkcji zwrócisz <code>false</code> to <code>render()</code> nie zostanie wykonany, a widok się <strong>raczej</strong><strong> </strong>nie przerenderuje — można to wykorzystać do optymalizowania aplikacji; UWAGA: komponenty-dzieci nadal mogą się przerenderować np. gdy zmieni się ich <code>state</code>, a w przyszłości React będzie traktował funkcję  <code>shouldComponentUpdate()</code> tylko jako wskazówkę, a nie wyznacznik — wrócę do tego tematu jeszcze</li>
    <li><code>componentWillUpdate(nextProps, nextState)</code> — wywoływana tuż przed <code>render()</code> — pamiętaj aby nie modyfikować <code>state</code> wewnątrz tej funkcji</li>
    <li><code>render()</code> — j.w.</li>
    <li><code>componentDidUpdate(prevProps, prevState)</code> — wywoływana od razu po renderze; dobre miejsce na zmiany w DOM (jeśli takowe są potrzebne)</li>
</ul>

<h3>Odmontowanie</h3>

Wywoływane gdy komponent jest usuwany z DOM

<ul>
    <li><code>componentWillUnmount()</code> — wywoływana przed usunięciem komponentu z DOM; dobre miejsce na „posprzątanie” po sobie — usunięcie timerów, subskrypcji, zmian w DOM itd.</li>
</ul>

<h3>Łapanie błędów</h3>

<ul>
    <li><code>componentDidCatch(error, info)</code> — wywoływana gdy pojawi się błąd w czasie renderowania, wywoływania metod cyklu życia lub w konstruktorze — <strong>zagnieżdżonych komponentów</strong>; błędy w samym komponencie nie są tutaj łapane (zostaną złapane w komponencie-rodzicu)</li>
</ul>

<h2>Przykład</h2>

Oto prosta aplikacja, która pokazuje ważny przykład używania metod cyklu życia. Są to dwa komponenty, <code>App</code> odpowiada za pokazywanie i ukrywanie (po kliknięciu w przycisk) drugiego komponentu. Drugi komponent to <code>Date</code>, który co sekundę aktualizuje stan i wyświetla aktualną datę i godzinę. Wykorzystane zostały takie <em>lifecycle methods</em>:

<ul>
    <li><code>constructor()</code> — ustawianie początkowego stanu</li>
    <li><code>componentDidMount()</code> — rozpoczęcie odliczania (<code>setInterval</code>)</li>
    <li><code>componentWillUnmount()</code> — usunięcie odliczania (<code>clearInterval</code>)</li>
</ul>

Warto też zwrócić uwagę na sposób w jaki komponent <code>App</code> renderuje komponent <code>Date</code> w zależności od <code>this.state.dateVisible</code>:

<pre class="language-jsx"><code>&lt;div&gt;
  {this.state.dateVisible &amp;&amp; &lt;DateComponent /&gt;}
&lt;/div&gt;</code></pre>

<CodepenWidget height="265" themeId="0" slugHash="yPqLpm" defaultTab="js,result" user="mmiszy" embedVersion="2" penTitle="Metody cyklu życia komponentu w React.js">
<a href="http://codepen.io/mmiszy/pen/yPqLpm/">Zobacz Codepen Metody cyklu życia komponentu w React.js</a>.
</CodepenWidget>

Jeśli chcesz na bieżąco śledzić kolejne części kursu React.js to koniecznie <strong>polub mnie na Facebooku i zapisz się na newsletter.</strong>

<NewsletterForm />

<FacebookPageWidget />

<h2>Ćwiczenie</h2>

<del datetime="2019-02-11T15:45:22.846Z"><strong>Ćwiczenie:</strong> Stwórz dwa komponenty (rodzic i dziecko). Oto wymagania:</del>

<ol>
    <li><del datetime="2019-02-11T15:45:22.846Z">Rodzic pozwala na ustawienie (<code>input</code> + <code>button</code> + <code>onClick</code>+ <code>setState</code>) jakiejś wartości liczbowej i przekazuje ją do dziecka jako props.</del></li>
    <li><del datetime="2019-02-11T15:45:22.846Z">Dziecko ma początkowo wyświetlać liczbę podaną od rodzica, a dodatkowo ma umożliwiać zwiększanie i zmniejszanie tej liczby (<code>button</code><span style="text-indent: 0em;"> + </span><code>onClick</code><span style="text-indent: 0em;"> + </span><code>setState</code><span style="text-indent: 0em;">).</span></del></li>
    <li><del datetime="2019-02-11T15:45:22.846Z"><span style="text-indent: 0em;">W momencie gdy rodzic ustawi liczbę, dziecko powinno zresetować swój stan do podanej liczby (</span><code>componentWillReceiveProps</code><span style="text-indent: 0em;">).</span></del></li>
</ol>

<strong>Aktualizacja 11.02.2019 r.</strong>: Przekreśliłem zadania powyżej. Miały one wyłącznie charakter dydaktyczny w celu poznania metody cyklu życia <code>componentWillReceiveProps</code>, ale wiele osób bardzo je sobie zapamiętało i stosowało podobny wzorzec w swoich aplikacjach. Poza tym React oznaczył tę metodę jako przestarzałą i niezalecaną. Zajrzyj do tego wpisu:

https://typeofweb.com/nowe-metody-cyklu-zycia-getderivedstatefromprops-i-getsnapshotbeforeupdate/

<strong>Sugerowane tutaj przeze mnie rozwiązanie było błędne</strong>. Prawidłowym rozwiązaniem problemu powyżej jest przeniesienie stanu dziecka wyżej — do rodzica (tzw. <em>lifting state up</em>). W ten sposób rodzic kontroluje stan obu inputów, a dziecko informuje go o zmianach, które chce wprowadzić. Dzięki temu unika się kilku częstych problemów: z rerenderem (który mógłby prowadzić do skasowania się wartości z inputów), z koniecznością wykrywania zmian (przez niezalecany componentWillReceiveProps), czy choćby z niejasnym przepływem danych (dane do dziecka od rodzica spływają w dół, ale tylko czasem… a dziecko nigdy nie informuje rodzica o zmianach — to niedobrze!). Oto zaktualizowana treść ćwiczenia:

<h2>Zaktualizowane ćwiczenie</h2>

<strong>Ćwiczenie:</strong> Stwórz dwa komponenty (rodzic i dziecko). Oto wymagania:

<ol>
    <li>Rodzic pozwala na ustawienie w inpucie jakiejś wartości liczbowej i przekazuje ją do dziecka.</li>
    <li>Dziecko ma początkowo wyświetlać liczbę podaną od rodzica, a dodatkowo ma umożliwiać zwiększanie i zmniejszanie tej liczby.</li>
    <li>W momencie, gdy rodzic ustawi liczbę, dziecko powinno zresetować swój stan do podanej liczby.</li>
    <li>Podpowiedź: Zastosuj tutaj <em>lifting state up</em> i stan obu komponentów trzymaj w <strong>rodzicu</strong>.</li>
</ol>

Napisz w komentarzu czy się udało. A jeśli masz jakieś wątpliwości albo nawet nie wiesz jak zacząć — odezwij się! Pomogę!
