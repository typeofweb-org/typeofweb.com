---
title: Komunikacja pomiędzy kontrolerami w AngularJS
date: 2016-05-05T12:47:00.000Z
isMarkdown: false
status: publish
permalink: komunikacja-pomiedzy-kontrolerami
authors:
  - michal-miszczyszyn
type: post
categories:
  - slug: javascript
    name: JavaScript
  - slug: dobry-kod
    name: Dobry Kod
  - slug: front-end
    name: Front-end
seo:
  focusKeywords:
    - AngularJS
---

<p>Jednym z aspektów sprawiających trudność w AngularJS, który wciąż i wciąż powraca w moich rozmowach z różnymi programistami jest prawidłowa implementacja komunikacji pomiędzy modułami. Dokumentacja i poradniki najczęściej opisują tylko najbardziej podstawowe przykłady porozumiewania się np. pomiędzy komponentem-rodzicem a komponentem-dzieckiem, co w zasadzie nie sprawia problemu. Co jednak w przypadku, gdy komunikacja musi zachodzić w obu kierunkach albo pomiędzy komponentami, które w strukturze aplikacji są od siebie odległe?</p>

<p>Aby problem był mniej abstrakcyjny, postaram się nakreślić bardziej konkretny przykład. Weźmy koncept aplikacji:</p>

<p><img src="/assets/content/images/2016/05/Screenshot-2016-05-05-15-19-30.png" alt="mockup aplikacji" /></p>

<p>Układ nie ma znaczenia, te same problemy występują niezależnie od położenia elementów na stronie. Aplikacja posiada dwa główne komponenty: Ustawienia oraz wykres. Zmieniając ustawienia użytkownik powoduje zmiany w wyglądzie wykresu. Najprostszym rozwiązaniem jest tutaj wrzucenie wszystkiego do jednego komponentu i cały problem komunikacji znika. Jednak w trakcie dalszego rozwoju aplikacji okazuje się, oba elementy stały się niezwykle skomplikowane, a sam wykres ma się dodatkowo wyświetlać na innej podstronie, ale tym razem już bez konfiguracji. Z tych powodów decydujemy o wyodrębnieniu ustawień oraz samego wykresu do osobnych komponentów, modułów, plików… Według mnie brzmi to jak całkiem typowy scenariusz rozwoju aplikacji. Tylko jak sprawić, aby te dwa elementy komunikowały się pomiędzy sobą bez żadnego problemu?</p>

<h1 id="drootscopedbroadcast"><code>$rootScope.$broadcast</code></h1>

<p>Odpowiedzią powszechnie postowaną na forach jest sugestia wykorzystania <a href="http://stackoverflow.com/questions/11252780/whats-the-correct-way-to-communicate-between-controllers-in-angularjs">funkcji <code>$rootScope.$broadcast</code></a>. Co do zasady działa to w ten sposób, że jeden komponent wysyła zdarzenie, a drugi je odbiera i odpowiednio reaguje. Przykładowa implementacja może wyglądać tak:</p>

<pre><code class="language-javascript">// settings.controller.js
function dataChanged(newData) {  
    $rootScope.$broadcast('dataChanged', newData);
}

// chart.controller.js
$rootScope.$on('dateChanged', (event, newData) =&gt; {
    this.data = newData;
    this.redrawChart();
});
</code></pre>

<p>Jest to chyba najprostsze możliwe rozwiązanie. Problemy? W początkowej fazie rozwoju aplikacji - rozwiązanie to bez wątpienia działa. Jednak słabo się skaluje i wraz z rozrostem aplikacji łatwo się pogubić w tych wszystkich zdarzeniach fruwających przez globalny <code>$rootScope</code>. Dodatkowo problemem może być tutaj konflikt nazw zdarzeń – dwa niezależnie komponenty mogą przecież wysyłać zdarzenie o nazwie <code>dataChanged</code> i nic tego nie kontroluje (oprócz dobrej komunikacji programistów w zespole ;) ). Można co prawda  rozwiązać ten problem poprzez ustalenie odpowiedniego nazewnictwa zdarzeń (np. <code>prefix:nazwa</code>), jednak nadal pozostaje fakt, że <strong><code>$broadcast</code> nie jest przewidziany do takiego zastosowania</strong>. Jak czytamy w <a href="https://github.com/angular/angular.js/wiki/Best-Practices">Najlepszych praktykach AngularJS</a>:</p>

<blockquote>
  <p><strong>Only use <code>.$broadcast()</code>, <code>.$emit()</code> and <code>.$on()</code> for atomic events</strong>
  Events that are relevant globally across the entire app (such as a user authenticating or the app closing). If you want events specific to modules, services or widgets you should consider Services, Directive Controllers, or 3rd Party Libs</p>
</blockquote>

<p><code>$broadcast</code> przewidziany jest do informowania o zdarzeniach, które mają jakieś znaczenie w kontekście całej aplikacji, a nie tylko jednego komponentu. Dobrym przykładem jego zastsowania może być zalogowanie się użytkownika, zmiana podstrony albo próba zamknięcia aplikacji. Złym – zmiana wewnątrz komponentu odpowiedzialnego za ustawienia wykresu. Fakt zmiany ustawień rysowania nie jest istotny dla całej aplikacji. Krótko mówiąc: <strong>Złą praktyką jest stosowanie <code>$broadcast</code> do komunikacji pomiędzy komponentami</strong>.</p>

<h1 id="drootscope"><code>$rootScope</code></h1>

<p>Nieco innym rozwiązaniem jest zapisywanie ustawień komponentu jako właściwość obiektu <code>$rootScope</code>. Jednak już od samego początku ten pomysł powinien zapalić symboliczną czerwoną lampkę w głowie każdego programisty. <code>$rootScope</code> to w pewnym sensie Angularowy obiekt globalny, a więc <em>de facto</em> sprowadza się to do zapisywania danych jako globalne. Samemu zdarzyło mi się z tego skorzystać niejednokrotnie, szczególnie na początku pracy z Angularem i bez wątpienia możliwość zapisania czegoś w <code>$rootScope</code> ma swoje dobre strony. Jednak w przypadku komunikacji dwóch komponentów to zły pomysł z kilku powodów.</p>

<p>Po pierwsze, <strong>cierpi na tym testowalność</strong> takiego komponentu. Bez szczegółowego zaglądania w kod źródłowy nie ma możliwości przewidzenia co i dokąd ten komponent będzie próbował zapisać ani skąd chciałby pobierać informacje. Dlatego <em>mockowanie</em> będzie tutaj znacznie trudniejsze niż gdyby dane pochodziły z dependency injection jak to zazwyczaj ma miejsce.</p>

<p>Dodatkowo to rozwiązanie niesie ze sobą wszystkie te same problem, co używanie zmiennych globalnych w ogóle. <strong>Utrudnione rozumienie przepływu danych, konflikty nazw pomiędzy komponentami czy przypadkowe zmiany wartości</strong> – temu rozwiązaniu mówimy zdecydowane „nie”. Kiedy zapisywanie danych w <code>$rootScope</code> jest akceptowalne? Myślę, że uzasadnione jest użycie go do przechowywania takich informacji jak np. tytuł strony, słowa kluczowe lub innych metadanych dotyczących całej aplikacji.</p>

<h1 id="dscopedwatch"><code>$scope.$watch</code></h1>

<p>Częstym rozwiązaniem wszelkich problemów, w szczególności na początku fali popularnośc Angulara, było wykorzystywanie funkcji <code>$scope.$watch</code> na dowolnych danych, które mogły ulec zmianie. W opisywanym tutaj przypadku również udałoby się to podejście zastosować. Koncepcyjnie wygląda to tak, że tworzony jest serwis pośredniczący, który wstrzykiwany jest do obu kontrolerów, które chce się skomunikować, a zmiany w tych serwisach są obserwowane:</p>

<pre><code class="language-javascript">// data.service.js
this.data = null; // początkowa wartość

// settings.controller.js
function dataChanged(newData) {  
    DataService.data = newData;
}

// chart.controller.js
$scope.$watch(() =&gt; DataService.data, newData =&gt; {
    this.data = newData;
    this.redrawChart();
});
</code></pre>

<p>Wady? Przede wszystkim <strong>gorsza wydajność</strong>. Każdy dodany <code>$watch</code> zwiększa poziom skomplikowania pętli <code>$digest</code> w Angularze. Jeśli wydajność nie jest w aplikacji kluczowa to jest to akceptowalne rozwiązanie, ale na pewno nie najlepsze. Drugim aspektem, który warto wziąć pod uwagę jest fakt, że znowu <strong>cierpi tutaj testowalność</strong> aplikacji. O ile tym razem nie ma problemu z mockowaniem (<code>DataService.data</code> można zamockować), jednak przepływ danych <a href="http://www.benlesh.com/2013/10/title.html">nie jest do końca jasny</a>. Spójrzmy na test jednostkowy:</p>

<pre><code class="language-javascript">DataServiceMock.data = 999;  
$scope.$digest(); // magia!
expect($scope.data).toBe(999); // skąd to się wzięło??  
</code></pre>

<p>Nie jest do końca jasne dlaczego wartość <code>$scope.data</code> się zmieniła. Dodatkowo konieczne jest tutaj ręczne wywołanie <code>$scope.$digest()</code> co sugeruje pewien potencjalny problem – co jeśli w przyszłości serwis zmieni swoją implementację i zmiany w nim będą zachodziły poza pętlą <code>$digest</code>? Ten abstrakcyjny przykład w rzeczywistości zdarza się dość często, np. jeśli zmianę danych w serwisie powoduje dyrektywa w odpowiedzi na zdarzenie DOM albo jeśli dane w serwisie pochodzą z API gdzie nadejście nowych informacji nie powoduje wywołania <code>$digest</code> (np. ze względu na wydajność ma to sens w niektórych wypadkach). <strong>Test prawdopodobnie będzie nadal bez problemu przechodził, natomiast aplikacja nie wyświetli nowych danych lub wyświetli je z opóźnieniem</strong>, bo w aplikacji nie zostanie automatycznie wywołany <code>$digest</code>.</p>

<p>Dodatkowo środowisko AngularJS raczej zgodnie rezygnuje z korzystania z funkcji <code>$watch</code> czy zmiennej <code>$scope</code> w kontrolerach w ogóle na rzecz <code>controllerAs</code>, <code>.component()</code> i   metody <code>$onChanges</code>. Używanie <code>$watch</code> nie jest już ani potrzebne ani polecane.</p>

<h1 id="staredobrewzorceprojektowe">Stare dobre wzorce projektowe…</h1>

<p>Jak więc powinno się rozwiązać komunikację pomiędzy kontrolerami w aplikacji AngularJS? Wystarczy sięgnąć do starych, dobrych wzorców projektowych i skorzystać np. ze <a href="https://addyosmani.com/resources/essentialjsdesignpatterns/book/#observerpatternjavascript">wzorca obserwatora</a>.</p>

<blockquote>
  <p>Obserwator jest wzorcem projektowym, w którym jeden obiekt (<em>subject</em>) przechowuje listę obiektów (<em>observer</em>) zależących od niego i automatycznie informuje je o zmianach swojego stanu.</p>
</blockquote>

<p>Wykorzystanie tego wzorca jest proste:</p>

<pre><code class="language-javascript">// settings.controller.js
function dataChanged(newData) {  
    DataService.setNewData(newData);
}

// chart.controller.js
DataService.addObserver(newData =&gt; {  
    this.data = newData;
    this.redrawChart();
});
</code></pre>

<p>Opcjonalnie na końcu funkcji przekazanej do <code>addObserver</code> kontroler może wywołać jeszcze <code>$scope.$applyAsync()</code> – jeśli jest taka potrzeba, bo w przeciwnym wypadku nie ma sensu tego robić i zyskuje na tym wydajność aplikacji. Koniecznie należy też pamiętać o usunięciu obserwatora w momencie gdy niszczony jest dany <code>scope</code>.</p>

<p>Warto tutaj jeszcze wspomnieć o innym wzorcu, który mógłby się tutaj sprawdzić – mianowicie o <strong>publish-subscribe</strong>. Różnice pomiędzy nim a obserwatorem są w zasadzie niewielkie, a wybór jednego z tych dwóch wzorców zależy od konkretnego problemu do rozwiązania. Więcej na temat różnic pomiędzy nimi można przeczytać w linkowanym już podręczniku <a href="https://addyosmani.com/resources/essentialjsdesignpatterns/book/#observerpatternjavascript">wzorców projektowych w JavaScript</a>.</p>

<p>Niezależnie czy implementujemy obserwator czy publish-subscribe, to rozwiązanie jest zdecydowanie najbardziej elastyczne i najbardziej wydajne ze wszystkich wcześniej wymienionych. Istotny jest tutaj również fakt, że <strong>zapoznanie się ze wzorcem projektowym obserwatora jest wiedzą uniwersalną, a nie tylko specyficzną dla danego frameworka</strong>. Dzięki temu jest to wiedza użyteczna niezależnie od środowiska, w którym się pracuje i przez to bardzo cenna. Przykładową implementację tego wzorca wraz z prostymi testami jednostkowymi udostępniam poniżej. Kod jest również na <a href="https://gist.github.com/mmiszy/cea958c4c644b3fffe8537e21a419d4d">gist.github.com/mmiszy/cea958c4c644b3fffe8537e21a419d4d</a>.</p>

<CodepenWidget height="266" themeId="light" slugHash="vGvaEN" defaultTab="js,result" user="mmiszy" embedVersion="2">
<a href="http://codepen.io/mmiszy/pen/vGvaEN/">Zobacz Codepen</a>.
</CodepenWidget>
