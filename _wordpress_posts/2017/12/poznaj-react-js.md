---
title: Poznaj React.js
date: 2017-12-05T14:00:54.000Z
isMarkdown: false
status: publish
permalink: poznaj-react-js
authors:
  - michal-miszczyszyn
type: post
thumbnail:
  url: https://res.cloudinary.com/type-of-web/wp-content/uploads/2017/10/pexels-photo-91413.jpeg
  width: 1280
  height: 675
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
    - React
  metadesc: >-
    React.js od Facebooka to biblioteka do budowania interfejsów w JS. React
    zdobył ogromną popularność wśród programistów dzięki postawieniu na
    komponenty.
---

<a href="https://reactjs.org/" target="_blank" rel="noopener">React</a> jest biblioteką do budowania interfejsów w JavaScript, stworzoną przez Facebooka. React zdobył ogromną popularność wśród programistów i jest jedną z tych bibliotek, w których pisze się całkiem przyjemnie. Koncept Reacta opiera się o znane od dawna wzorce, które zostały tutaj odświeżone i zunifikowane: Jednokierunkowy przepływ danych i budowanie aplikacji w oparciu o <strong>komponenty</strong>.

---

<h2>Co to jest React.js?</h2>

<img class="aligncenter wp-image-691 size-medium" style="box-shadow: none;" src="https://res.cloudinary.com/type-of-web/wp-content/uploads/2017/10/React_logo_wordmark-300x101.png" alt="Kurs React.js" width="300" height="101" />

React nie jest kompletnym frameworkiem — jest raczej <strong>biblioteką.</strong> Choć w Internecie nadal trwa święty spór na ten temat, to my po prostu umówmy się, że tak jest, okej? Przykładowo, żeby stworzyć routing lub aby wykonać zapytanie AJAX, musisz skorzystać z zewnętrznej paczki. Nie jest to jednak żadną przeszkodą w tworzeniu rozbudowanych aplikacji! Istnieje szereg dobrych praktyk, a ogromne community Reacta na całym świecie na pewno pomoże wybrać Ci prawidłowe rozwiązania. Na przykład: React nie sugeruje żadnego rozwiązania dla przechowywania stanu aplikacji – ale jest kilka popularnych i sprawdzonych bibliotek, które świetnie współgrają z Reactem — np. flux czy redux, o których możesz przeczytać w jednym z moich wcześniejszych artykułów (na pewno jeszcze wrócę do tego tematu):

https://typeofweb.com/flux-i-redux-globalny-store-jednokierunkowy-przeplyw-danych/

<h2>Przykładowy komponent</h2>

Wracając do komponentów: <strong>Tworzenie aplikacji w React.js polega tak naprawdę na budowaniu i komponowaniu kolejnych komponentów</strong>. Trochę tak, jakbyśmy składali klocki (tylko, że te klocki najpierw sami tworzymy ;) ).

Przykładowa aplikacja w Reakcie może wyglądać tak:

<pre><code class="language-javascript">ReactDOM.render(
  &lt;h1&gt;Hello, world!&lt;/h1&gt;,
  document.getElementById('root')
);</code></pre>

<CodepenWidget height="265" themeId="0" slugHash="zEbygp" defaultTab="js,result" user="mmiszy" embedVersion="2" penTitle="Wstęp do React">
<a href="http://codepen.io/mmiszy/pen/zEbygp/">Zobacz Codepen Wstęp do React</a>.
</CodepenWidget>

Użyłem tutaj mieszanki JavaScript i <strong>JSX — czyli czegoś w rodzaju HTML-a wbudowanego w JS</strong>. Wygląda ciekawie? Później przestudiujemy to dogłębnie!

<h2>Dlaczego React?</h2>

Na czym polega jego przewaga, w stosunku do innych bibliotek i frameworków? Myślę, że mogę szybko wypunktować najważniejsze rzeczy:

<ul>
    <li><strong>Deklaratywny kod.</strong> Jeśli raz napiszesz komponent, dajmy na to Accordion, następnym razem by z niego skorzystać, wystarczy, że go zaimportujesz i wpiszesz w kodzie <code>&lt;MyAccordion /&gt;</code>. Kod tworzony w Reakcie jest bardzo „reużywalny”, także pomiędzy różnymi aplikacjami.</li>
    <li><strong>Virtual DOM.</strong> Deklaratywny kod jest szybki, ponieważ aktualizacje drzewa DOM wspomaga Virtual DOM. Jest to technika, dzięki której renderowanie w przeglądarce jest dużo szybsze niż zwykle. Krótko mówiąc polega to na tym, aby aktualizować tylko te fragmenty drzewa, które uległy zmianie. Brzmi prosto? Koncepcyjnie wydaje się oczywiste, ale wcale nie jest takie łatwe :)</li>
    <li><strong>Bogate community, dużo gotowych rozwiązań.</strong> Ostatnio chciałem skorzystać z Filestack.io. I wiesz co? Udostępniają gotowy komponent dla Reacta! Obsługa formularzy, routing, komponenty z Bootstrapa czy inne elementy UI — to wszystko jest dla Ciebie, wysokiej jakości i wygodniejsze niż przysłowiowe wtyczki do jQuery. Dodajesz plik i już możesz napisać <code>&lt;BootstrapModal /&gt;</code> — boom! to jest aż tak proste.</li>
    <li><strong>Frajda z kodowania.</strong> Czynnik psychologiczny jest niesamowicie ważny. Jeśli już złapiesz Reactowy flow to na pewno zgodzisz się ze mną, że jest to jedna z najsympatyczniejszych bibliotek JS w dziejach ludzkości.</li>
</ul>

<h2>Co dalej?</h2>

To tylko lekkie wprowadzenie i jednocześnie początek zupełnie nowej formuły. W kolejnym artykule stworzysz swój pierwszy komponent! <strong>Oswoisz się z podstawami React.js i JSX bez konieczności konfigurowania czegokolwiek.</strong> Konkretnie, bez owijania w bawełnę :) <a href="https://szkolenia.typeofweb.com/" target="_blank">zapisz się na szkolenie z React</a>.

Jeśli chcesz na bieżąco śledzić kolejne części kursu React.js to koniecznie <strong>zapisz się na newsletter i śledź mnie na Facebooku.</strong>

<NewsletterForm />

<FacebookPageWidget />

<h2>Ćwiczenie</h2>

<strong>Ćwiczenie:</strong> Spróbuj edytować przykład wyżej (kliknij w guzik <a href="https://codepen.io/mmiszy/pen/zEbygp">edit on CodePen</a>) i spraw, aby komponent wyświetlał inny tekst. Podejrzyj źródła — jak wygląda wygenerowany przez React.js kod? Czy dostrzegasz coś szczególnego? Napisz o tym w komentarzu.

<div class="grammarly-disable-indicator"></div>
