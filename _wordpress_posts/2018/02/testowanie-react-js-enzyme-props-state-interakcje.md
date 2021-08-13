---
index: 60
title: Testowanie React.js w Enzyme — props, state i interakcje
date: 2018-02-13T13:46:21.000Z
isMarkdown: false
status: publish
permalink: testowanie-react-js-enzyme-props-state-interakcje
authors:
  - michal-miszczyszyn
type: post
thumbnail:
  url: https://res.cloudinary.com/type-of-web/wp-content/uploads/2018/02/pexels-photo-300857.jpeg
  width: 1920
  height: 1280
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
    W tym wpisie pokazuję jak wykorzystać bibliotekę Enzyme do pisania
    zaawansowanych testów komponentów React.js. Poznasz takie funkcje jak props,
    setProps, state i setState, które pozwalają na modyfikowanie propsów i stanu
    komponentu. Przetestujesz też obsługę zdarzeń dzięki metodzie
    Enzyme.simulate.
---

Pokazałem już jak pisać proste testy do aplikacji React.js z użyciem Enzyme. Sprawdzanie czy coś się renderuje, czy zawiera tekst, czy dobrze pokazuje elementy… W tym wpisie idę o krok dalej. Pokazuję jak w Enzyme testować interakcje z komponentami, odczytywać i zmieniać propsy a także state.

{/_ more _/}

<h2>Pobieranie i ustawianie propsów oraz state</h2>

Na elementach (selektorach) Enzyme można wywołać kilka ciekawych metod. W tym momencie interesują Cię te służące do odczytywania i ustawiania propsów i stanu:

<ul>
    <li><code>props()</code> — zwraca wszystkie propsy danego elementu</li>
    <li><code>prop(key)</code> — zwraca prop o nazwie <code>key</code></li>
    <li><code>state([key])</code> — zwraca cały state lub (opcjonalnie) to co kryje się pod kluczem <code>key</code></li>
    <li><code>setProps(nextProps)</code> — ustawia propsy komponentu (podany obiekt zostanie połączony z istniejącymi już propsami)</li>
    <li><code>setState(nextState)</code> — ustawia state komponentu (j.w.)</li>
</ul>

A więc przetestujmy teraz czy, w naszej ulubionej liście kontaktów, komponent <code>&lt;App&gt;</code> przekazuje do <code>&lt;UsersList&gt;</code> prop o nazwie <code>users</code> z tablicą imion:

<pre class="language-jsx"><code>it('passes all users to the UsersList', () =&gt; {
  const app = shallow(&lt;App /&gt;);
  expect(app.find('UsersList').prop('users')).toEqual(['Michal', 'Kasia', 'Jacek', 'Marta', 'Tomek', 'Ania']);
})</code></pre>

Po kolei: Płytkie renderowanie komponentu <code>App</code>. Następnie znajdź komponent UsersList, pobierz jego prop o nazwie <code>users</code> i porównaj z podaną tablicą.

Następnie można by się pokusić o przetestowanie czy komponent <code>UsersList</code> poprawnie reaguje na zmianę propsów. A więc pierwszy render, a następnie zmiana propsów i test (jest to trochę test na siłę, ale to w tym momencie nieistotne):

<pre class="language-jsx"><code>describe('change props', () =&gt; {
    const users = ['Jan', 'Maria'];
    const usersList = shallow(&lt;UsersList users={['Ktoś tam', 'Nieważne']} /&gt;);
    usersList.setProps({ users });
    
    users.forEach(user =&gt; {
        it(`includes name ${user} on the list`, () =&gt; {
            expect(usersList).toContainReact(&lt;li&gt;{user}&lt;/li&gt;)
        });
    });
});</code></pre>

W analogiczny sposób można pobierać i ustawiać state, a następnie sprawdzać czy komponent się poprawnie renderuje.

<h2>Interakcje</h2>

Jedyny brakujący element układanki to testowanie interakcji z komponentami. W tym przykładzie chcesz sprawdzić czy wpisywanie czegoś w pole tekstowe powoduje rzeczywiście filtrowanie tablicy z imionami.

<p class="important">W bardziej realnym przykładzie zamockowałbym najpierw źródło danych, aby mieć 100% kontrolę nad przebiegiem testu. Tutaj ten krok pomijam i na razie zakładam, że lista imion jest mi po prostu znana i niezmienna.</p>

Przyda się tutaj funkcja <code>simulate</code> z Enzyme. Przyjmuje ona dwa argumenty:

<ul>
    <li>nazwę zdarzenia np. click albo input</li>
    <li>mock obiektu zdarzenia (opcjonalnie)</li>
</ul>

W tym przypadku chcę przetestować wpisanie literki "M". Muszę więc zasymulować zdarzenie <code>input</code> i podać obiekt zdarzenia z ustawionym <code>value</code> na wartość <code>"M"</code>:

<pre class="language-jsx"><code>it('filters names on input', () =&gt; {
  const app = shallow(&lt;App /&gt;);
  expect(app.find('UsersList').prop('users')).toEqual(['Michal', 'Kasia', 'Jacek', 'Marta', 'Tomek', 'Ania']);

  app.find('input').simulate('input', {currentTarget: {value: 'M'}})
  expect(app.find('UsersList').prop('users')).toEqual(['Michal', 'Marta', 'Tomek']);
});</code></pre>

Po kolei: Renderuje się aplikacja. Następnie upewniam się, że lista kontaktów jest taka, jak mi się wydaje, że jest (to krok w sumie zbędny). Następnie symuluję zdarzenie <code>input</code> i ponownie sprawdzam listę kontaktów — teraz jest już inna.

Podobnie można testować inne zdarzenia, np. <code>click</code> czy nawet <code>focus</code>.

<h2>Podsumowanie</h2>

Tym sposobem masz już pełen zestaw narzędzi potrzebny do testowania nawet najbardziej rozbudowanych komponentów. Enzyme jest świetną biblioteką i warto zapoznać się z jego pełną dokumentacją! Cały kod jest dostępny na moim GitHubie: <a href="https://github.com/mmiszy/typeofweb-kurs-react/tree/part-3">https://github.com/mmiszy/typeofweb-kurs-react/tree/part-3</a>

Jeśli chcesz poznać Enzyme i inne metody testowania React dogłębnie, to <a href="https://szkolenia.typeofweb.com/" target="_blank">zapisz się na szkolenie z React</a>.

Jeśli chcesz na bieżąco dowiadywać się o kolejnych częściach kursu React.js to koniecznie <strong>śledź mnie na Facebooku i zapisz się na newsletter.</strong>

<NewsletterForm />

<FacebookPageWidget />

<h2>Ćwiczenie</h2>

<strong>Ćwiczenie:</strong>  Przetestuj czy po skasowaniu literki "M" z inputa lista kontaktów wróci do stanu pierwotnego.
