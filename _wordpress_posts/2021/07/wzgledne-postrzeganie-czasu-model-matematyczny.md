---
index: 132
title: 'Względne postrzeganie czasu: model matematyczny'
date: 2021-07-07T14:47:50.000Z
isMarkdown: true
status: publish
permalink: wzgledne-postrzeganie-czasu-model-matematyczny
authors:
  - michal-miszczyszyn
type: post
thumbnail:
  url: >-
    https://res.cloudinary.com/type-of-web/wp-content/uploads/2021/07/relatywny_wzgledny_subiektywny_czas_postrzeganie.png
  width: 1200
  height: 633
categories:
  - slug: opinie
    name: Opinie
seo: {}
---

Wielu osobom wydaje się, że im stajemy się starsi, tym czas szybciej płynie. Mamy tysiące wspomnień ze wczesnej młodości, a później trudno nam odróżnić rok od roku. Ale czy aby na pewno tylko nam się *wydaje*? Czy to zjawisko jest jakoś opisane i uzasadnione?

{/_ more _/}

<script defer src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/MathJax.js?config=TeX-AMS_CHTML"></script>

## Gęstość zdarzeń a postrzeganie czasu

Gdy rozmawiałem o tym z kilkoma osobami, twierdziły one po prostu, że jako dziecko miały znacznie więcej ciekawych i nowych doświadczeń, a dziś powiewa nudą. Wydaje się to intuicyjne, jednak nie do końca tłumaczy dlaczego wydarzenia z dzieciństwa miałyby wpływać na nasze postrzeganie upływu czasu w późniejszym wieku.

Wiele osób sugeruje też, że czas, który postrzegamy jest relatywny w stosunku do czasu przeżytego. Przykładowo, rok postrzegany przez 4-letnie dzieci to aż 25% ich całego życia, a w przypadku osoby dorosłej będzie to mniej niż 5%.

## Model matematyczny względnego czasu

Lekko przeformułuję powyższe twierdzenie, aby było nam łatwiej spróbować zapisać je równaniem: **Postrzegana prędkość upływu okresu czasu maleje z wiekiem.**

W publikacjach naukowych znalazłem sugestię, jakoby ta zależność była proporcją w stosunku do bezwzględnego upływu czasu (obiektywnie mierzonych np. lat)[1]. Jednakże, zgodnie z przyjętymi przez nas założeniami, **odczuwamy czas względny**, a nie obiektywny! Spróbujmy zapisać to przy pomocy matematyki.

Przyjmijmy, że czas obiektywny oznaczymy $O$, a czas subiektywny (postrzegany przez nas, relatywny) jako $S$.

$dO$ i $dS$ to infinitezymalne okresy czasu – $dS$ oznacza odczuwany przez nas upływ czasu $dO$.

Jak napisałem wcześniej, postrzegany upływ czasu maleje z czasem przeżytym (również subiektywnym!), a więc $dS$ maleje ze wzrostem $S$. Wynika z tego, iż:

$$
dS = dO\frac{K}{S}
$$

gdzie $K$ to jakaś stała, której za moment się pozbędziemy. Dodatkowo przyjmujemy, że w momencie narodzin zarówno $O$ jak i $S$ są równe 0: $O_0 = S_0 = 0$.

Nie pozostaje nam nic innego jak przekształcić równanie i scałkować:

$$
dS = dO \cdot \frac{K}{S} \\\\
SdS = K dO \\\\
\int_0^S SdS = K \int_0^O dO \\\\
\frac{1}{2} S^2 = KO \\\\
S^2 = 2KO \\\\
S = \sqrt{2KO} \ \ \ \ \ S \geq 0;\ \  O \geq 0 \\\\
\\\\
dS = dO \frac{K}{S} \\\\
dS = dO \frac{K}{\sqrt{2KO}} \\\\
dS = dO \frac{\sqrt{K^2}}{\sqrt{2KO}} \\\\
dS = dO \sqrt{\frac{K^2}{2KO}} \\\\
dS = \sqrt{\frac{K}{2O}}\ dO \\\\
$$

Przyjmijmy teraz ten sam okres czasu $dO$ postrzegany w dwóch różnych momentach życia $O_1$ i $O_2$ i znajdźmy proporcję pomiędzy relatywnym postrzeganiem :

$$
dS = \sqrt{\frac{K}{2O}} dO \\\\
\\\\
dS_1 = \sqrt{\frac{K}{2O_1}} dO \\\\
dS_2 = \sqrt{\frac{K}{2O_2}} dO \\\\
\\\\
\frac{dS_1}{dS_2} = \frac{\sqrt{\frac{K}{2O_1}} dO}{\sqrt{\frac{K}{2O_2}} dO} \\\\
\frac{dS_1}{dS_2} = \frac{\sqrt{\frac{K}{2O_1}}}{\sqrt{\frac{K}{2O_2}}} \\\\
\frac{dS_1}{dS_2} = \sqrt{\frac{O_2}{O_1}} \\\\
$$

Wynika z tego, że dla przeciętnej osoby subiektywne postrzeganie tego samego okresu czasu zmienia się odwrotnie proporcjonalnie do pierwiastka długości jego życia.

## Zastosowanie

Zastanówmy się teraz, jak zmienia się postrzeganie roku swojego życia dla osoby mającej lat 10 i 40. Podstawiając do wyprowadzonego wzoru otrzymujemy:

$$
\sqrt{\frac{40}{10}} = \sqrt{4} = 2
$$

Oznacza to, że **dla 40-letniego człowieka rok upłynie dwukrotnie szybciej niż dla 10-latka**!

## Relatywne postrzeganie czasu

Możemy też pójść o krok dalej – zastanówmy się, jaką część swojego życia (relatywnie) mamy już za sobą. Jeśli wrócimy na chwilę do jednego z równań…

$$
S = \sqrt{2KO} \ \ \ \ \ S \geq 0;\ \  O \geq 0
$$

Oznaczmy moment śmierci jako $S_ś$ i $O_ś$ (odpowiednio postrzegany względnie i obiektywnie), podstawmy do powyższego równania i podzielmy przez to samo równanie:

$$
S_ś = \sqrt{2KO_ś} \\\\
S = \sqrt{2KO} \\\\
\\\\
\frac{S}{S_ś} = \frac{\sqrt{2KO}}{\sqrt{2KO_ś}} \\\\
\frac{S}{S_ś} = \sqrt{\frac{O}{O_ś}}
$$

Dla ułatwienia obliczeń przyjmijmy najpierw, że człowiek żyje 100 lat ($Oś = 100$), a analizowana osoba ma lat 25 ($O = 25$):

$$
\sqrt{\frac{25}{100}} = \frac{5}{10} = 0,5
$$

Oznacza to, że **25-latek ma za sobą aż 50% swojego życia, a przynajmniej tak to postrzega**, pomimo tego, że _de facto_ przed nim jest jeszcze 75% życia mierzonego w latach obiektywnych.

Przeanalizujmy teraz mnie. Przyjmując, że Polacy średnio dożywają 86 lat, a ja mam lat 29, to:

$$
\sqrt{\frac{29}{86}} = 58%
$$

Cóż, większość życia już za mną 🙃

## Relatywny czas vs czas obiektywny

Szczęśliwie, jak słusznie zauważono, **subiektywny czas, jaki nam pozostał nigdy nie będzie mniejszy od połowy obiektywnego czasu do śmierci**. Możemy spróbować to udowodnić!

Jeśli relatywny i obiektywny czasy do śmierci dane są równaniami:

$$
1 - \sqrt{\frac{O}{O_ś}} \\\\
1 - \frac{O}{O_ś}
$$

Zacznijmy od dwóch wcześniej omawianych przykładów:

$$
1 - \sqrt{\frac{25}{100}} = 0,5 \\\\
1 - \frac{25}{100} = 0,75
$$

Jeśli podzielimy jeden przez drugi okaże się, że wynik jest większy niż połowa:

$$
\frac{0,5}{0,75} = 0,(6)
$$

Analogicznie dla drugiego przykładu:

$$
1 - \sqrt{\frac{29}{86}} \approx 0,4193027447 \\\\
1 - \frac{29}{86} \approx 0,6627906977 \\\\
\frac{0,4193027447}{0,6627906977} \approx 0,6326322113
$$

Teza wydaje się zgadzać. Spróbujmy uogólnić:

$$
\frac{1 - \sqrt{\frac{WIEK}{ŚMIERĆ}}}{1 - \frac{WIEK}{ŚMIERĆ}} \geq \frac{1}{2}
$$

Wiek jest tutaj zmienną, a śmierć to stała. Możemy w takim razie podmienić:

$$
x = \frac{WIEK}{ŚMIERĆ}\ \ \ \ \   0 \leq x \leq 1
$$

$$
\frac{1 - \sqrt{x}}{1 - x} > 1/2 \ \ \ \ \ \ \ \ \ \cdot \frac{1 + \sqrt{x}}{1 + \sqrt{x}} \\\\
 \\\\
\frac{(1 - \sqrt{x})(1 + \sqrt{x})}{(1 - x)(1 + \sqrt{x})} \\\\
\frac{1 - x}{(1-x)(1+\sqrt{x})} \\\\
\frac{1}{1 + \sqrt{x}} \\\\
 \\\\
\frac{1}{1 + \sqrt{x}} \geq 1/2 \\\\
1 + \sqrt{x} \leq 2 \\\\
\sqrt{x} \leq 1 \\\\
\\\\
0 \leq x \leq 1 \\\\
0 \leq \sqrt{x} \leq 1
$$

Co potwierdza poprzednie twierdzenie.

## Podsumowanie

Co ciekawe, powyższe teorie i wyliczenia wstępnie potwierdzono również eksperymentalnie[2]. A Wy ile swojego życia macie już za sobą w jednostkach relatywnych?

Czy podobał Wam się ten wpis? Dajcie znać w komentarzach.

Źródła:
1: Doob (1971), Janet (1877)
2: Robert Lemlich – Subjective acceleration of time with aging, 1975
