---
index: 13
title: Nowy font na GitHubie – font systemowy
date: 2016-07-12T12:44:19.000Z
isMarkdown: false
status: publish
permalink: nowy-font-na-githubie-font-systemowy
authors:
  - michal-miszczyszyn
type: post
thumbnail:
  url: >-
    https://res.cloudinary.com/type-of-web/wp-content/uploads/2016/07/red-hands-woman-creative2.jpg
  width: 1920
  height: 1280
categories:
  - slug: front-end
    name: Front-end
seo: {}
---

Zauważyliście, że GitHub zmienił fonta? Zainteresowało mnie to, gdy zauważyłem, że teraz strona <strong>wygląda inaczej na OS X i inaczej na Windowsie</strong>. Po sprawdzeniu źródła okazało się, że GitHub korzysta teraz z <strong>domyślnego fonta systemowego</strong>, który zależy od użytkownika. Jak to jest zrobione?</p>

<h1 id="fontsystemowywcss">Font systemowy w CSS</h1>

Jeśli zajrzymy do CSS–ów zobaczymy takie, ciekawe ustawienie fonta:

<pre><code class="language-css">font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"  
</code></pre>

Jest to jedno z dwóch możliwych rozwiązań, jeśli chcemy skorzystać z fonta systemowego – to lepsze. <a href="https://www.smashingmagazine.com/2015/11/using-system-ui-fonts-practical-guide/">Smashing Magazine opisuje fonty systemowe</a> z większymi szczegółami i sugeruje użycie takiego ustawienia:

<pre><code class="language-css">font-family: -apple-system, BlinkMacSystemFont,  
    "Segoe UI", "Roboto", "Oxygen", 
    "Ubuntu", "Cantarell", "Fira Sans", 
    "Droid Sans", "Helvetica Neue", sans-serif;
</code></pre>

Tak to wygląda w praktyce:

<p style='font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;'>To jest tekst pisany fontem systemowym.</p>

Krój czcionki napisu powyżej zależy od systemu, na którym otworzymy tę stronę. Nie wierzysz? Sprawdź!

<h1 id="jaktojestzrobione">Jak to jest zrobione</h1>

Rozbijmy sobie ten CSS na czynniki pierwsze:

<ul>
<li><code>-apple-system</code> – font systemowy w Safari na OS X i iOS. Różny w zależności od wersji systemu, <strong>a nawet od wielkości fonta</strong> (automatycznie przełącza się pomiędzy San Francisco Text a San Francisco Display dla tekstu większego niż 20px)</li>
<li><code>BlinkMacSystemFont</code> – jak wyżej, ale w Chromie na OS X</li>
<li><code>Segoe UI</code> – font z Windows i Windows Phone</li>
<li><code>Roboto</code> – Android i nowsze Chrome OS</li>
<li><code>Oxygen</code> – KDE (linux)</li>
<li><code>Cantarell</code> – GNOME (linux)</li>
<li><code>Fira Sans</code> – Firefox OS</li>
<li><code>Droid Sans</code> – starszy Android</li>
<li><code>"Helvetica Neue", sans-serif</code> – jeśli nic z powyższych nie zadzaiała, używamy fonta domyślnego</li>
</ul>

<h1 id="problemy">Problemy</h1>

Wszystko działa pięknie, jednak są dwa małe problemy. Pierwszy z nich to fakt, że wszystko działa <strong>dzisiaj</strong> – ale po kolejnej aktualizacji Windowsa albo MacOS fonty mogą się zmienić. Trzeba będzie wtedy również zaktualizować nasze pliki CSS. Ponadto trzeba uważać na kolejność, w jakiej podajemy fonty. Na przykład: Jeśli zmienilibyśmy kolejność <code>Roboto</code> i <code>Segoe UI</code> to osoby mające zaintalowanego fonta <code>Roboto</code> na Windowsie nie zobaczyłyby niestety <code>Segoe UI</code>.

Częściowym rozwiązaniem tych problemów (a na pewno dużym ułatwieniem) jest korzystanie z któregoś z języków kompilowanych do CSS, na przykład SCSS, i ustawienie tego fonta jako zmiennej:

<pre><code class="language-scss">$system-font: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;

…

font-family: $system-font;  
</code></pre>

Rozważam wykorzystanie tego ustawienia na blogu! Myślę, że to świetny pomysł, w szczególności dla stron z dużą ilością treści.

Więcej doczytajcie we wspomnianym artykule na <a href="https://www.smashingmagazine.com/2015/11/using-system-ui-fonts-practical-guide/">Smashing Magazine</a> oraz na <a href="https://medium.com/design/system-shock-6b1dc6d6596f">medium</a>.

<h1 id="edit12072016r2231">Edit 12.07.2016 r., 22:31</h1>

Okazuje się, że od pewnego czasu Facebook stosuje coś podobnego. Używam OS X i na moim Facebook do elementu <code>&lt;body&gt;</code> dodana jest klasa <code>.sf</code>, która powoduje zmianę fonta w całej aplikacji na:

<pre><code class="language-css">font-family: 'San Francisco', -apple-system, BlinkMacSystemFont, '.SFNSText-Regular', sans-serif;  
</code></pre>

Jestem ciekaw czy użytkownicy Windowsów widzą coś podobnego?
