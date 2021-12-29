---
title: Map i Reduce w JS
date: 2017-05-12T12:12:03.000Z
isMarkdown: false
status: publish
permalink: map-i-reduce-w-js
authors:
  - michal-miszczyszyn
type: post
thumbnail:
  url: /assets/wp-content/uploads/2017/05/haskell-logo.png
  width: 871
  height: 400
categories:
  - slug: javascript
    name: JavaScript
seo: {}
---

Napisałem artykuł o obserwablach, ale czegoś mi w nim zabrakło: Objaśnienia tak podstawowych pojęć i funkcji jak <code>map</code> i <code>reduce</code>. Observable na blogu pojawią się wkrótce, a ten krótki wpis ma na celu tylko lekkie wprowadzenie. Bardzo krótko i pobieżnie.

Jeśli oczekujesz zgłębiania programowania funkcyjnego w JS to natychmiast zamknij ten wpis. Nie jest dla Ciebie!
<CodepenWidget height="450" themeId="0" slugHash="zwWNEV" defaultTab="js,result" user="mmiszy" embedVersion="2" penTitle="map reduce">
<a href="http://codepen.io/mmiszy/pen/zwWNEV/">Zobacz Codepen map reduce</a>.
</CodepenWidget>

<h1 id="podsumowanie">Podsumowanie</h1>
Jaka jest zaleta tego rozwiązania? Na pewno zwięzłość. Dodatkowo, jak już wspomniałem, możliwe byłoby wykonanie tutaj wszystkich operacji całkowicie równolegle! I o ile prawdopodobnie żaden silnik JavaScript tego teraz nie robi, to jednak warto o tym pamiętać w kontekście innych technologii i języków programowania. <strong>Map reduce to koncept uniwersalny i powszechnie wykorzystywany.</strong>

Jeśli rozumiesz powyższe przykłady i czujesz się swobodnie z <code>map</code> i <code>reduce</code> to prawdopodobnie Observable będą dla Ciebie łatwe do zrozumienia. O tym mój kolejny wpis:

https://typeofweb.com/observable-rxjs/

<h1 id="dladociekliwych">Dla dociekliwych</h1>
Pomimo, że obiecałem, że będzie prosto i pobieżnie, to jednak warto zastanowić się nad tym jak bardzo uniwersalne koncepty zostały tutaj omówione… Przykładowo, jeśli w opisie funkcji map zamiast słowa „tablica” wstawimy „funktor” to prawdopodobnie nadal wszystko co napisałem będzie prawdą.

Czym jest funktor? Funktor to koncept z teorii kategorii, bardzo abstrakcyjnej gałęzi matematyki, na której bazuje całe programowanie funkcyjne. Teraz w zasadzie nie jest do końca istotne czym funktor jest, ważne co jeszcze jest funktorem… <strong>a funktorami są np. tablica, Promise albo Observable</strong>. Wszystko co tutaj opisałem, mimo że proste, jest bardzo uniwersalne i opisuje tak naprawdę szerokie pojęcia.

Czym na przykład jest funkcja <code>Promise.resolve</code>? To przecież <code>flatMap</code> gdy wywołamy ją na innym obiekcie Promise oraz <code>map</code> gdy na wartości niebędącej Promise. Warto się zastanowić dlaczego i jakie są tego implikacje :)

<div class="footnotes">
<ol>
 	<li id="fn:1" class="footnote">Opinia własna ;) <a title="return to article" href="#fnref:1">↩</a></li>
</ol>
</div>
