---
id: 28
index: 17
title: 3. Weekly JavaScript Challenge
date: 2016-08-07T13:15:30.000Z
status: publish
permalink: weekly-javascript-challenge-3
authors:
  - michal-miszczyszyn
guid: https://typeofweb.com/index.php/2016/08/07/weekly-javascript-challenge-3/
type: post
categories:
  - slug: inicjatywy
    name: Inicjatywy
  - slug: dobry-kod
    name: Dobry Kod
seo: {}
---

<p>Zakończył się trzeci Weekly JavaScript Challenge. Grupa zyskuje co raz większą popularność, zapisały się do niej już 494 osoby. <strong>Dziękuję</strong> wszystkim, którzy rozwiązują zadania i komentują pod rozwiązaniami innych osób!</p>

<p class=important>Weekly JavaScript Challenge to <a href=https://www.facebook.com/groups/1131907053499522>grupa na Facebooku</a>. Celem jej istnienia jest wspólna nauka JavaScriptu poprzez rozwiązywanie prostych zadań i wzajemną ocenę kodu.</p>

<p>Pamiętajcie, że <strong>poprzednie zadania można rozwiązywać przez cały czas!</strong></p>

<h1 id="podsumowanie">Podsumowanie</h1>

<p>Tymczasem, niemal już tradycyjnie, przejdę do podsumowania problemów, które szczególnie zapamiętałem z tego zadania. Są to ogólne dobre praktyki i porady odnośnie pisania kodu w JavaScripcie. Zapraszam do czytania.</p>

<h2 id="konwencjenazywaniazmiennychifunkcjiwjavascript">Konwencje nazywania zmiennych i funkcji w JavaScript</h2>

<p>Praktycznie nikt nie dyskutuje już z pewnymi ustalonymi konwencjami nazewnictwa w JavaScript. Podążają za nim zarówno funkcje standardowe, jak i większość frameworków i bibliotek. Oto one:</p>

<ul>
<li>praktycznie nieużywana jest konwencja nazewnictwa <em>underscore</em> – <code>first_name</code>, <code>my_application</code> itp.</li>
<li>zwyczajowo używa się nazewnictwa <em>camelCase</em> – <code>firstName</code>, <code>myApplication</code> itp. nazwy zaczynają się z małej litery</li>
<li>wyjątkiem są nazwy klas i konstruktorów, które zaczynają się wielką literą – <code>User</code>, <code>MyModel</code> itp. jest to tzw. <em>PascalCase</em></li>
</ul>

<p>Dodatkowo nieużywana jest tzw. <a href="https://pl.wikipedia.org/wiki/Notacja_węgierska">notacja węgierska</a>: <strong>nazwy zmiennych nie powinny zawierać informacji o typach</strong>. Przykładowo <code>ageNum</code>, <code>nameString</code> są niezalecane.</p>

<h2 id="wspdzielonystan">Współdzielony stan</h2>

<p>Oczywiście musimy brać poprawkę na to, że niektóre z porad, które tutaj opisuję mogą się wydawać irracjonalne w kontekście prostego zadania i kodu, który ma maksymalnie 100-200 linijek. Jednak przy bardziej rozbudowanych aplikacjach wszystko to zaczyna mieć znacznie większy sens.</p>

<p>Bardzo często we wrzucanych rozwiązaniach widzę kilka zmiennych zadeklarowanych na samym początku kodu, a następnie różne funkcje, które korzystają z tych zmiennych. To podejście działa przy krótkim, prostym kodzie, jednak w większych aplikacjach szybko zaczyna być bardzo problematyczne w dalszym rozwoju i utrzymaniu. Dlatego, poza pewnymi wyjątkami, starajmy się unikać takich sytuacji, w których uzyskujemy dostęp do tej samej globalnej zmiennej z kilku różnych funkcji.</p>

<h2 id="rnepoziomyabstrakcji">Różne poziomy abstrakcji</h2>

<p>Złym pomysłem jest tworzenie funkcji, które niby wykonują jedno zadanie, ale operują na różnych poziomach abstrakcji. Przykładowo:</p>

<pre><code class="language-javascript">function saveData() {  
    localStorage.setItem('time', new Date();
    saveForm();
}

function saveForm() {  
    for (const input of inputs) {
        localStorage.setItem(input.name, input.value);
    }
}
</code></pre>

<p>Funkcja <code>saveData</code> operuje na dwóch poziomach abstrakcji – najpierw bezpośrednio zapisuje dane do localStorage, a później wywołuje inną funkcję, która również zapisuje dane do localStorage. Lepszym rozwiązaniem jest tworzenie funkcji, które działają tylko na jednym poziomie:</p>

<pre><code class="language-javascript">function saveData() {  
    saveTime();
    saveForm();
}

function saveTime() {  
    localStorage.setItem('time', new Date();
}

function saveForm() {  
    for (const input of inputs) {
        localStorage.setItem(input.name, input.value);
    }
}
</code></pre>

<h2 id="dugiewyraenia">Długie wyrażenia</h2>

<p>Niejednokrotnie w kodzie zdarzają się długie i skomplikowane wyrażenia regularne lub warunki przekazywane do <code>if</code>. Dla poprawy czytelności należałoby wynieść je do osobnych zmiennych i dobrze nazwać. Przykładowo, autentyczne przykłady:</p>

<pre><code class="language-javascript">…
update(key, value) {  
    return (typeof value === 'object' ? Object.assign({}, this.data[key], value) : value);
}
…

getGroup(name) {  
    return name.match(/^(\w+)(?:-(\w+))?$/);
}

setChecked(data, input) {  
    data.checked = input.name === data.name;
}
</code></pre>

<p>Mało czytelne. Poprawiona wersja wygląda następująco:</p>

<pre><code class="language-javascript">…
update(key, value) {  
    const isObject = (typeof value === 'object');
    if (isObject) {
        return this._newValueForObject(value);
    }
    return value;
}

_newValueForObject(key, value) {  
    return Object.assign({}, this.data[key], value);
}
…

getGroup(name) {  
    const groupPattern = /^(\w+)(?:-(\w+))?$/;
    return name.match(groupPattern);
}

setChecked(data, input) {  
    const isChecked = (input.name === data.name);
    data.checked = isChecked;
}
</code></pre>

<h2 id="queryselectorallniezwracatablicy"><code>querySelectorAll</code> nie zwraca tablicy</h2>

<p>Dla wielu osób zaskoczeniem jest fakt, że funkcja <code>document.querySelectorAll</code> nie zwraca tablicy, tylko pewien obiekt „tablicopodobny”:</p>

<pre><code class="language-javascript">const divs = document.querySelectorAll('div');  
Array.isArray(divs); // false!  
</code></pre>

<p>Kilka osób skorzystało ze znalezionego w internecie starszego rozwiązania tego problemu:</p>

<pre><code class="language-javascript">const divs = [].slice.call(document.querySelectorAll('div'));  
Array.isArray(divs); // true!  
</code></pre>

<p>Jednak jest to kod niepotrzebnie długi i na pewno bardzo nieczytelny. Znacznie lepiej skorzystać z funkcji <code>Array.from</code>:</p>

<pre><code class="language-javascript">const divs = Array.from(document.querySelectorAll('div'));  
Array.isArray(divs); // true!  
</code></pre>

<h2 id="keyup"><code>keyup</code></h2>

<p>Jeśli chcemy wykonać jakieś akcje w czasie wpisywania tekstu w pole tekstowe, jedną z możliwości jest nasłuchiwanie na zdarzenie <code>keyup</code>. Pozornie to rozwiązanie zadziała, gdy użytkownik będzie korzystał wyłącznie z klawiatury – jednak przecież to nie jedyny sposób edytowania tekstu na stronie internetowej. Można również skorzystać z menu kontekstowego albo klawiatury ekranowej – a tych nasłuchiwanie na zdarzenie <code>keyup</code> już nie złapie.</p>

<p>Rozwiązanie? Zdarzenie <code>input</code>.</p>

<h2 id="niestandardowefunkcje">Niestandardowe funkcje</h2>

<p>Przeszukując internet można natknąć się na wiele porad wykorzystujących niestandardowe funkcje w JavaScripcie. Przykładem mogą być <code>date.toLocaleFormat()</code> czy <code>Array.forEach</code>. Obie te funkcje nie są częścią żadnego standardu i nie można polegać na tym, że będą dostępne w przeglądarkach.</p>

<h2 id="funkcjonalnoci">Funkcjonalności</h2>

<p>Muszę jeszcze wspomnieć o jednej rzeczy. Określenie „funkcjonalności” jest kalką językową z angielskiego (<em>functionalities</em>) i nie istnieje w języku polskim. Nieprawidłowym jest więc powiedzieć „aplikacja ma wiele funkcjonalności” – zamiast tego prawidłowe jest „aplikacja ma wiele funkcji”. Po prostu :) Funkcjonalność to cecha i oznacza dobre spełnianie swoich funkcji.</p>

<h1 id="nakoniec">Na koniec</h1>

<p>Ponownie zachęcam do wzięcia udziału w Weekly JavaScript Challenge. Kolejne, czwarte zadanie dotyczy komunikacji z prostym REST API (Giphy.com). Zapraszam!</p>
