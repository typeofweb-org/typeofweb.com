---
title: Testowanie aplikacji React.js — podstawy Enzyme
date: 2018-02-09T08:20:22.000Z
isMarkdown: false
status: publish
permalink: testowanie-aplikacji-react-js-podstawy-enzyme
authors:
  - michal-miszczyszyn
type: post
thumbnail:
  url: /assets/wp-content/uploads/2018/01/pexels-photo-277590.jpeg
  width: 1280
  height: 1006
categories:
  - slug: javascript
    name: JavaScript
  - slug: front-end
    name: Front-end
series:
  slug: react-js
  name: React.js
seo:
  focusKeywords:
    - enzyme
  metadesc: >-
    Enzyme to biblioteka do testowania komponentów React.js. Ułatwia tworzenie
    komponentów na potrzeby testów, odczytywanie oraz zmianę propsów i state, a
    także pozwala na asercje. Testowanie aplikacji to rzecz ważna. I od razu
    wrzucam Cię na głęboką wodę — użyjesz React.js i Enzyme!
---

Testowanie aplikacji to rzecz ważna. Do tej pory jednak nie wspomniałem ani słowem o testowaniu React.js. Czas najwyższy to zrobić! I <strong>od razu wrzucam Cię na głęboką wodę — użyjesz React.js i Enzyme</strong> — przemiłej biblioteki do testowania komponentów.

---

O zaletach samego testowania nie muszę chyba pisać. <strong>Utrzymanie kodu, łatwiejsze dodawanie nowych funkcji, testy służące jako dokumentacja</strong>… bajka ;) Dlatego teraz po prostu weźmiesz poprzedni przykład (filtrowanie listy) i napiszesz do niego testy jednostkowe. Zacznij od zainstalowania enzyme.

<p class="important"><code>create-react-app</code> domyślnie korzysta z biblioteki <code>jest</code> do testów. Tak też będę robił w tym wpisie. Ale pamiętaj, że <code>enzyme</code> działa również z innymi popularnymi bibliotekami np. <code>mocha</code> czy <code>chai</code>.</p>

<h2>Enzyme</h2>

<strong>Enzyme to biblioteka do testowania komponentów React.js.</strong> Ułatwia tworzenie komponentów na potrzeby testów, odczytywanie oraz zmianę propsów i state, a także pozwala na asercje. Zgodnie z dokumentacją <code>create-react-app</code> aby zacząć używać <code>cra</code> razem z <code>enzyme</code> trzeba zainstalować:

<pre class="language-bash"><code>npm install --save enzyme enzyme-adapter-react-16 react-test-renderer</code></pre>

Co robią poszczególne paczki?

<ul>
    <li><code>enzyme</code> — wspomniana biblioteka</li>
    <li><code>enzyme-adapter-react-16</code> — enzyme wymaga zainstalowania odpowiedniego adaptera do konkretnej wersji React.js</li>
    <li><code>react-test-renderer</code> — renderowanie bez konieczności istnienia DOM</li>
</ul>

Następnie stwórz jeszcze jeden plik <code>src/setupTests.js</code>. Tam zawrzyj <strong>konfigurację wszystkich testów</strong>. W najprostszej wersji wygląda ona tak:

<pre class="language-javascript"><code>import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });</code></pre>

W tym samym pliku możesz też dodać np. <strong>globalne mocki</strong> — jeśli Ci będą potrzebne. Albo biblioteki, z których chcesz korzystać w testach.

<h2>Pierwszy test w Enzyme</h2>

Najprostszy test z użyciem Enzyme będzie po prostu renderował komponent. Jeśli wszystko zadziała poprawnie — test zostanie zaliczony. Jeśli wystąpi wyjątek — test zakończy się niepowodzeniem. Zacznij od zaimportowania <code>React</code>, i <code>App</code>. Do tego potrzebna będzie Ci funkcja <code>shallow</code> z <code>enzyme</code>. Dlaczego akurat <code>shallow</code>? Kilka słów o tym za moment, a na razie test:

<pre class="language-javascript"><code>import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

it('renders without crashing', () =&gt; {
  shallow(&lt;App /&gt;);
});</code></pre>

W kodzie powyżej tworzony jest jeden test, który tylko renderuje komponent <code>App</code>. Proste, prawda? :)

Odpal teraz polecenie <code>npm test</code>. <strong>Twoje testy będą teraz automatycznie uruchamiane przy każdej zmianie w kodzie.</strong>

<h2><code>shallow</code>, <code>mount</code>, <code>render</code>…</h2>

W poprzednim teście skorzystałem z funkcji <code>shallow</code>. Ale są też inne: <code>mount</code> oraz <code>render</code>.

<ul>
    <li><strong>shallow</strong> — renderuje tylko ten komponent (bez komponentów w nim zagnieżdżonych). Idealny do testów jednostkowych, bo masz pewność, że przypadkiem nie sprawdzasz zachowań innych komponentów w środku. Szybki.</li>
    <li><strong>mount</strong> — komponent jest renderowany i montowany w DOM. Do testowania komponentów, które wchodzą w interakcje z DOM albo są udekorowane przez High Order Components</li>
    <li><strong>render</strong> — renderuje komponent do statycznego HTML-a</li>
</ul>

Najczęściej w testach jednostkowych będziesz korzystać z <code>shallow</code>.

<h2>Prawdziwy test</h2>

Dodaj dwa nowe testy. Sprawdź czy <code>App</code> zawiera <code>input</code> oraz czy <code>App</code> zawiera w sobie <code>UsersList</code>:

<pre class="language-javascript"><code>it('includes input', () =&gt; {
  const app = shallow(&lt;App /&gt;);
  expect(app.containsMatchingElement(&lt;input /&gt;)).toEqual(true)
});

it('includes UsersList', () =&gt; {
  const app = shallow(&lt;App /&gt;);
  expect(app.containsMatchingElement(&lt;UsersList /&gt;)).toEqual(true)
});</code></pre>

Wszystko przechodzi. <strong>Ale skąd tak naprawdę masz pewność, że Twój kod działa?</strong> Może to błąd w testach i one przechodzą zawsze? ;) Spróbuj usunąć z komponentu <code>App</code> element <code>input</code>. Oto rezultat:

<pre><code> FAIL  src/App.test.js
  ● includes input

    expect(received).toEqual(expected)
    
    Expected value to equal:
      true
    Received:
      false</code></pre>

Rzeczywiście, test pokazał, że w komponencie nie ma inputa! Czyli testy są poprawne ;)

<h2>Testy przekazywanych propsów</h2>

Teraz przetestuj komponent <code>UsersList</code>, którego wyświetlanie zależy od przekazanych propsów:

<ol>
    <li>Jeśli przekazano pustą tablicę to sprawdź czy wyświetla się komunikat, że nic nie znaleziono.</li>
    <li>Jeśli przekazano tablicę z imionami to sprawdź czy komunikatu już nie ma.</li>
    <li>Sprawdź czy dla każdego imienia jest wyrenderowany element na liście.</li>
</ol>

Nic prostszego ;)

<pre class="language-javascript"><code>it('shows message when there are no users', () =&gt; {
    const usersList = shallow(&lt;UsersList users={[]} /&gt;);
    expect(usersList.text()).toContain('No results!')
});

it(`doesn't show message when there are users`, () =&gt; {
    const usersList = shallow(&lt;UsersList users={['Michal']} /&gt;);
    expect(usersList.text()).not.toContain('No results!')
});

it(`shows a list of users`, () =&gt; {
    const users = ['Michal', 'Ania'];
    const usersList = shallow(&lt;UsersList users={users} /&gt;);
    expect(usersList.find('li').length).toEqual(users.length);
});

describe('list of users', () =&gt; {
    const users = ['Michal', 'Ania'];
    const usersList = shallow(&lt;UsersList users={users} /&gt;);
    
    users.forEach(user =&gt; {
        it(`includes name ${user} on the list`, () =&gt; {
            expect(usersList.containsMatchingElement(&lt;li&gt;{user}&lt;/li&gt;)).toEqual(true)
        });
    });
});</code></pre>

Wszystkie napisane wyżej testy powinny bez problemu przechodzić :)

<a href="/assets/wp-content/uploads/2018/01/Screen-Shot-2018-01-17-at-6.20.50-PM.png"><img class="aligncenter size-full wp-image-975" src="/assets/wp-content/uploads/2018/01/Screen-Shot-2018-01-17-at-6.20.50-PM.png" alt="Testy React.js w Enzyme" width="834" height="430" /></a>

<h2>Podsumowanie</h2>

W tej części zrobiłem tylko lekkie wprowadzenie do podstaw <code>enzyme</code>. Cały kod jest dostępny na moim GitHubie: <a href="https://github.com/mmiszy/typeofweb-kurs-react/tree/part-2">https://github.com/mmiszy/typeofweb-kurs-react/tree/part-2</a> <a href="https://szkolenia.typeofweb.com/" target="_blank">zapisz się na szkolenie z React</a>. <strong>W kolejnym wpisie omówię jak testować zmiany propsów i stanu, a także jak przetestować interakcje z komponentami!</strong>

Jeśli chcesz na bieżąco dowiadywać się o kolejnych częściach kursu React.js to koniecznie <strong>śledź mnie na Facebooku i zapisz się na newsletter.</strong>

<NewsletterForm />

<FacebookPageWidget />

<h2>Ćwiczenie</h2>

<strong>Ćwiczenie\*:</strong>  Przetestuj czy komponent <code>App</code> przekazuje do komponentu <code>UsersList</code> tablicę z imionami. Kod dodaj w komentarzu!
