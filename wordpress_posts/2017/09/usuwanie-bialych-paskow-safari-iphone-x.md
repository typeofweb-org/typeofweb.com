---
id: 453
index: 35
title: Usuwanie białych pasków w Safari na iPhone X
date: 2017-09-25T20:29:55.000Z
isMarkdown: false
status: publish
permalink: usuwanie-bialych-paskow-safari-iphone-x
authors:
  - michal-miszczyszyn
guid: https://typeofweb.com/?p=453
type: post
thumbnail:
  url: >-
    https://typeofweb.com/wp-content/uploads/2017/09/Screenshot-2017-09-25-19.18.55.png
  width: 1500
  height: 690
categories:
  - slug: front-end
    name: Front-end
seo:
  focusKeywords:
    - iPhone X
  metadesc: >-
    Apple przedstawiło swojego nowego smartfona iPhone X. Jednak w Safari na iOS
    na stronach www widoczne są białe paski z prawej i lewej. Jak je usunąć?
---

Apple przedstawiło niedawno swojego nowego flagowego smartfona – iPhone X. To co odróżnia go od poprzedników to głównie wyświetlacz rozciągający się od krawędzi do krawędzi. Oprócz pięknego wyglądu, niestety rodzi to pewne nowe problemy – między innymi z tym, że Safari na iOS domyślnie wyświetla białe paski po prawej i lewej na stronach www gdy obrócimy smartfon. Czy możemy zrobić coś, aby temu zaradzić? <strong>Okazuje się, że tak!</strong>

Wiele osób nabija się z iPhone X:

https://twitter.com/vojtastavik/status/907911237983449088

(więcej śmieszków z iPhone X i Safari 11 tutaj: <a href="https://blog.prototypr.io/notch-crazy-iphone-x-mad-475f43d6ee26" target="_blank" rel="noopener">https://blog.prototypr.io/notch-crazy-iphone-x-mad-475f43d6ee26</a>)

Ale nie o tym ten wpis ;) Wpis jest o tym, że mój blog domyślnie wygląda w ten sposób na nowym iPhonie:

<img class="aligncenter size-large wp-image-458" style="box-shadow: none;" src="https://typeofweb.com/wp-content/uploads/2017/09/iPhone-X-before-1024x579.png" alt="iPhone X horizontal before" width="1024" height="579" />

Widoczne są wyraźne paski z prawej i lewej strony. Są szare, gdyż <strong>domyślnie przyjmują one background-color z body lub html</strong>. Nie można jednak normalnie ustawić tam background-image, czyli żadnych obrazków ani gradientów… Jest to tzw. <em>safe area</em>, za którą użytkownik będzie trzymał telefon palcami i nie będzie sobie niczego zasłaniał. Ma to sens, ale czy mogłoby lepiej wyglądać? I, co ważniejsze, <strong>czy mamy na to wpływ? Tak!</strong> Poniżej podsumowanie ciekawostek z <a href="https://webkit.org/blog/7929/designing-websites-for-iphone-x/" target="_blank" rel="noopener">bloga WebKit</a>.

<h2>CSS round display: viewport-fit</h2>
Szkic specyfikacji nieznanego mi dotąd <a href="https://drafts.csswg.org/css-round-display/" target="_blank" rel="noopener">CSS Round Display</a> zawiera definicję <code>viewport-fit</code>, z którego Apple postanowiło skorzystać. Najnowsze Safari na iOS na iPhone X pozwala na użycie tej właściwości, aby <strong>treść z naszej strony wypełniła puste dotąd fragmenty po bokach</strong>. Dodanie tej nowej właściwości do tagu meta viewport na stronie spowoduje poprawę wyglądu strony:
<pre><code class="language-html">&lt;meta name="viewport" content="width=device-width, user-scalable=yes, initial-scale=1.0, viewport-fit=cover"&gt;</code></pre>
(specyfikacja mówi o wykorzystaniu <code>@viewport</code> w CSS, ale nie próbowałem tego jeszcze z iPhone X i nie wiem czy zadziała – raczej nie, gdyż jest to kontrpropozycja dla przeforsowanego przez Apple tagu meta…). Efekt tagu meta jest następujący:

<img class="aligncenter size-large wp-image-457" style="box-shadow: none;" src="https://typeofweb.com/wp-content/uploads/2017/09/iPhone-X-almost-1024x579.png" alt="iPhone X Safari 11 viewport-fit cover" width="1024" height="579" />

Wygląda to już lepiej, aczkolwiek teraz możemy mieć inny problem: <strong>część treści jest zbyt blisko rogów ekranu, albo może być zupełnie schowana za czarnym paskiem</strong> (kamera, czujniki…) z prawej strony! Czy i na to można coś poradzić bez karkołomnych zmian w CSS celujących tylko w iPhone X? Okazuje się, że tak!

<h2>safe-area-inset-* – top right bottom left</h2>
Gdy mamy <code>viewport-fit=cover</code>, możemy skorzystać z kilku wartości <strong>dostarczanych przez przeglądarkę w naszych stylach CSS</strong>. Posłuży nam do tego <code>constant(…)</code> Jak to działa? Safari na iOS 11 definiuje pewne wartości – np. mówi, że bezpieczna odległość od krawędzi telefonu do treści to <em>ileś pikseli</em>. My, jako twórcy strony możemy z tej wartości skorzystać i odpowiednie elementy o tę odległość przesunąć! Początkowo dla testów chciałem tylko dodać padding do <code>body</code>:
<pre><code class="language-css">body {
    padding: constant(safe-area-inset-top) constant(safe-area-inset-right) constant(safe-area-inset-bottom) constant(safe-area-inset-left);
}</code></pre>
Oznacza to, że padding będzie wynosił odpowiednio tyle, ile przeglądarka ustali pod nazwami stałych <code>safe-area-inset-top</code>, <code>safe-area-inset-right</code>, <code>safe-area-inset-bottom</code> i <code>safe-area-inset-left</code>. Efekt jest taki:

<img class="aligncenter size-large wp-image-456" style="box-shadow: none;" src="https://typeofweb.com/wp-content/uploads/2017/09/iPhone-X-there-1024x579.png" alt="iPhone X Safari 11 safe-area-inset-left" width="1024" height="579" />

Po dalszych poprawkach kod ostatecznie wygląda tak:

<pre><code class="language-css">.entry-header, .entry-summary, .entry-content, .author-info, .entry-meta, #nav-below, #comments, .post-continue-container, #colophon, #mobile-menu {
    padding-left: constant(safe-area-inset-left);
    padding-right: constant(safe-area-inset-right);
}

#sidebar {
    padding-left: calc(3em + constant(safe-area-inset-left));
    padding-right: calc(3em + constant(safe-area-inset-right));
}

#mobile-menu {
    padding-top: calc(6em + constant(safe-area-inset-top));
    padding-bottom: constant(safe-area-inset-bottom);
}</code></pre>

Dzięki czemu <strong>zdjęcia oraz menu są rozciągnięte na całą szerokość strony, ale treść nigdy nie zostanie przykryta</strong> przez pasek po prawej:

<img class="aligncenter size-large wp-image-463" style="box-shadow: none;" src="https://typeofweb.com/wp-content/uploads/2017/09/iPhone-X-final-1024x579.png" alt="iPhone X Safari 11 safe-area-inset-left viewport-fit cover" width="1024" height="579" />

Zauważ też, że <code>constant</code> można łączyć z <code>calc</code>!

<p class="important">Ten kod wpływa również na wyświetlanie strony na Safari na MacOS, ale w tym przypadku wszystkie wartości <code>safe-area-inset-*</code> są równe 0.</p>
Muszę tutaj jednak nadmienić, że kilka dni temu <a href="https://github.com/w3c/csswg-drafts/issues/1693#issuecomment-330909067" target="_blank" rel="noopener">słowo kluczowe <code>constant</code> zostało przemianowane w specyfikacji na <code>env</code></a>. W Safari nadal działa <code>constant</code>, ale niedługo może to ulec zmianie!

<p class="important">Safari Technology Preview od wersji 42 nie ma już <code>constant</code> — zgodnie ze standardem używane jest <code>env</code>. Zmiana ta pojawi się w stabilnym Safari oraz w Safari na iOS za jakiś czas. Więcej informacji: <a href="https://developer.apple.com/safari/technology-preview/release-notes/" target="_blank">Safari Technology Preview Release Notes (Release 42)</a></p>

<h2>Podsumowanie</h2>
Ciekawą uwagę wyraził <a href="https://www.facebook.com/groups/742940452405327/permalink/1657069000992463/?comment_id=1657137494318947&amp;comment_tracking=%7B%22tn%22%3A%22R0%22%7D" target="_blank" rel="noopener">Comandeer na Facebooku</a>:
<blockquote>Najbardziej mnie śmieszy, że Apple w celu rozwiązania problemu, który sami stworzyli, próbują ustandaryzować w CSS "zmienne pochodzące od klienta użytkownika.</blockquote>
Dyskusja o specyfikacji na GitHubie: <a href="https://github.com/w3c/csswg-drafts/issues/1693" target="_blank" rel="noopener">https://github.com/w3c/csswg-drafts/issues/1693</a>

Co racja to racja. Jednak z drugiej strony, lepiej przecież w taki sposób, niż gdyby znowu próbować przepychać jakieś właściwości, które nigdy propozycją do standardu nie były i nie będą… Ponadto, z wprowadzanych pomysłów skorzystać mogą też inni producenci urządzeń i przeglądarek, np. podobnych smartfonów bez ramek, albo smartwatchy – gdy zajdzie taka potrzeba. A więc <strong>potencjalnie ten kod, mimo że aktualnie wpływa tylko na Safari, może działać bez zmian również na innych urządzeniach</strong>!

Warto też przetestować stronę na telefonie w pozycji wertykalnej, a także <strong>na desktopowym Safari, które również rozumie constant, ale tam wartości stałych wynoszą 0</strong>. U mnie na iPhonie X wygląda to tak:

<img class="aligncenter size-large wp-image-472" style="box-shadow: none;" src="https://typeofweb.com/wp-content/uploads/2017/09/Screenshot-2017-09-25-18.21.18-579x1024.png" alt="" width="579" height="1024" />
