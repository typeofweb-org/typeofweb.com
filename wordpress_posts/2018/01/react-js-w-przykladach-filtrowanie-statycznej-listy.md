---
id: 921
index: 57
title: 'React.js w przykładach: filtrowanie statycznej listy'
date: 2018-01-24T09:19:30.000Z
isMarkdown: false
status: publish
permalink: react-js-w-przykladach-filtrowanie-statycznej-listy
authors:
  - michal-miszczyszyn
guid: https://typeofweb.com/?p=921
type: post
thumbnail:
  url: https://typeofweb.com/wp-content/uploads/2018/01/pexels-photo-417122.jpeg
  width: 1920
  height: 852
categories:
  - slug: javascript
    name: JavaScript
  - slug: front-end
    name: Front-end
series:
  slug: react-js
  name: React.js
seo: {}

---
W jednym z komentarzy ktoś zasugerował mi, abym pokazywał jak najwięcej praktycznych przykładów. Inna osoba pytała konkretnie o przykład filtrowania listy na podstawie tekstu wpisywanego w input. Stwierdziłem, że warto skorzystać z tych sugestii. Oto powstaje seria wpisów, które będą się przeplatały z kursem Reacta jako takim. Tutaj będę pokazywał <strong>konkretne przykłady i implementacje</strong>, bez tłumaczenia teorii. Pierwszym przykładem będzie właśnie taka lista — na razie wersja prosta, ze statycznymi danymi i synchronicznym wyszukiwaniem. Do dzieła!

{/* more */}

<h2>Plan działania</h2>

Chcesz stworzyć listę (np. kontaktów) i wyrenderować ją. Łatwizna. Do tego potrzebujemy input, który będzie wyszukiwarką. Wpisanie czegoś w input ma powodować filtrowanie listy. Dodatkowo jeśli nic nie znaleziono — ma wyświetlić się komunikat. Jeśli nie wiesz, jak to ugryźć to <a href="https://szkolenia.typeofweb.com/" target="_blank">zapisz się na szkolenie z React</a>.

<CodepenWidget height="265" themeId="0" slugHash="govXpM" defaultTab="js,result" user="mmiszy" embedVersion="2" penTitle="React.js w przykładach: Filtrowanie listy"><a href="http://codepen.io/mmiszy/pen/govXpM/">Zobacz Codepen React.js w przykładach: Filtrowanie listy</a>.</CodepenWidget>

<h2>Pytania?</h2>

Jak wrażenia? Jeśli masz jakiekolwiek pytania albo coś jest niejasne — <strong>pisz w komentarzu</strong>! To dla mnie cenna informacja zwrotna.

Jeśli chcesz na bieżąco śledzić kolejne części kursu React.js to koniecznie <strong>polub mnie na Facebooku i zapisz się na newsletter.</strong>

<NewsletterForm />

<FacebookPageWidget />

<h2>Ćwiczenie</h2>

<strong>Ćwiczenie:</strong> Jak zmieniłby się kod, gdyby filtrowanie użytkowników działo się np. na backendzie i było asynchroniczne? Czy musiałabyś modyfikować komponent  <code>UsersList</code>? Spróbuj to zaimplementować, przyjmując, że funkcja <code>getFilteredUsersForText</code> jest asynchroniczna i ma taką postać:

<pre class="language-jsx"><code>getFilteredUsersForText(text) {
  return new Promise(resolve =&gt; {
    const time = (Math.random() + 1) * 250;
    setTimeout(() =&gt; {
      const filteredUsers = allUsers.filter(user =&gt; user.toLowerCase().includes(text.toLowerCase()));
      resolve(filteredUsers);
    }, time) ;
  });
}</code></pre>

<strong>Ćwiczenie*:</strong> Spróbuj szybko wpisać coś w input. Czy zawsze wyświetlają się poprawne dane? Takie problemy to tzw. <em>race conditions</em>. Czy umiesz je tutaj jakoś rozwiązać? Pamiętaj, że React.js to tylko biblioteka do budowania widoków, a wiedza na temat rozwiązywania ogólnych problemów jest uniwersalna i bardzo przydatna z dowolnym frameworkiem :)
