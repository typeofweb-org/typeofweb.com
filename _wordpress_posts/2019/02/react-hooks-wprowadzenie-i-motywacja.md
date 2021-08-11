---
id: 1814
index: 99
title: React Hooks — wprowadzenie i motywacja
date: 2019-02-04T08:36:21.000Z
isMarkdown: true
status: publish
permalink: react-hooks-wprowadzenie-i-motywacja
authors:
  - michal-miszczyszyn
guid: https://typeofweb.com/?p=1814
type: post
thumbnail:
  url: >-
    https://typeofweb.com/wp-content/uploads/2019/02/blue-sky-construction-crane-533227.jpg
  width: 6000
  height: 4000
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
    - Kurs React Hooks
    - React Hooks
  focusKeywordSynonyms:
    - React.js Hooks
    - Kurs React.js Hooks, kursu React Hooks, kursu React.js Hooks
  metadesc: "React Hooks wkrótce trafią\_do wersji stabilnej React.js. Oto kurs React Hooks. Co to jest Hook? Po co powstały Hooki w React.js i jaka jest motywacja?"
---

Jakiś czas temu zrobiło się głośno na temat React Hooks. Co to jest i po co Ci to? Przez dłuższy czas celowo nie pisałem o tym na blogu, gdyż była to ledwie propozycja i to do tego mocno niestabilna. Teraz jednak sytuacja się zmieniła i wszystko wskazuje na to, że React Hooks wkrótce trafią do wersji stabilnej. Czas się zaprzyjaźnić! Dlatego powstał **kurs React Hooks**.

{/_ more _/}

## Stan w komponentach funkcyjnych

Bolączką komponentów funkcyjnych było to, że **były one bezstanowe**. Tzn. działały idealnie do renderowania treści na podstawie propsów, jednak same nie mogły zawierać `state`. Aby dodać stan, trzeba było taki komponent zrefaktorować na klasę — z tego powodu wiele osób zalecało po prostu zawsze używać klas i ignorować komponenty funkcyjne zupełnie. **Hooki całkowicie zmieniają tę sytuację**.

## Motywacja dla powstania React Hooks

Jednak dodanie alternatywnej składni to tak naprawdę nie jest motywacja twórców Reacta. Po co alternatywna składnia, skoro miałaby ona niczego _de facto_ nie zmieniać? **Są lepsze powody dla istnienia Hooków**.

### Tworzenie uniwersalnej logiki zawierającej stan

Tworzenie takiej logiki, którą można by **ponownie wykorzystać w różnych komponentach, a która zawiera także stan**. To właśnie do rozwiązania tego problemu powstały takie wzorce jak Higher Order Components czy Render Props. Te jednak przyniosły kolejne kłopoty… Hooki zdają się wszystko rozwiązywać i upraszczać.

### Uproszczenie kodu komponentów stanowych dzięki React Hooks

Przyjrzyjmy się typowemu komponentowi stanowemu. Warto pamiętać, [kiedy używać stanu lokalnego w React](https://typeofweb.com/kiedy-uzywac-state-a-kiedy-redux/). Żeby było ciekawiej, komponent ten **podpina się pod subskrypcję danych** (np. observable — temat mi bliski bo stworzyłem bibliotekę `react-with-observable`). **Przy odmontowywaniu musi tę subskrypcję oczywiście usunąć, a w przypadku zmian pamiętać o aktualizacji**…

```jsx
class MyComponent extends React.Component {
  componentDidMount() {
    this.subscribe();
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  subscribe() {
    this._unsubscribe = this.props.observable.subscribe(…);
  }

  unsubscribe() {
    if (this._unsubscribe) {
      this._unsubscribe();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.observable !== this.props.observable) {
      this.unsubscribe();
      this.subscribe();
    }
  }

  render() {
    // …
  }
}
```

(kod wzorowany na tweecie [@jamiebuilds](https://twitter.com/jamiebuilds/status/1055988181626056704))

**WOAH**, to całkiem sporo kodu jak na prostą subskrypcję, mam rację? I tyle rzeczy, o których trzeba pamiętać… A do tego nie ma żadnego sposobu, aby z tej logiki móc skorzystać ponownie w innym komponencie!

### Powiązana logika jest… porozrzucana

Często, szczególnie w bardziej rozbudowanych komponentach, **logika związana z tą samą rzeczą jest porozrzucana** po różnych metodach cyklu życia. Jest to widoczne już w powyższym przykładzie, a ta klasa jeszcze **tak naprawdę nic nie robi**!

### Statyczna analiza i minifikacja kodu

Okazuje się, że **JS-owe klasy nie są czymś co można łatwo minifikować albo analizować statycznie**. Każda tworzona metoda może być zarówno publiczna, jak i prywatna — nie ma sposobu, by to wiedzieć! Z tego powodu **niemożliwa jest minifikacja nazw metod** — nie wiadomo przecież czy danej funkcji ktoś/coś nie wywołuje też z zewnątrz klasy.

Dodajmy do tego **problemy z nierozumieniem działania `this` w JS przez wiele osób** i wynikającą z tego konieczność bindowania metod, albo używania eksperymentalnej składni i pamiętania o wykorzystywaniu funkcji strzałkowych i jakiegoś transpilatora typu Babel… Ałć!

## Problemy, które rozwiązują React Hooks

Jak powyższe problemy rozwiązują React Hooks?

- Fragmenty logiki zawierającej stan są zamykane w funkcjach, z których można korzystać w wielu komponentach.
- Same komponenty stają się funkcjami, co mocno upraszcza pracę z nimi.
- Kod wewnątrz funkcji jest łatwy do optymalnej minifikacji.
- Powiązana logika jest blisko siebie, a nie porozrzucana.

Brzmi dobrze? Do tego bez wątpienia **Hooki są łatwiejsze i bardziej przystępne dla początkujących**. Czyżby to strzał w 10? Moim zdaniem tak i dlatego napisałem ten kurs React Hooks!

## Porównanie kodu z Hookami i bez nich

Spójrz na klasę z początku wpisu. Niemal **dokładnie ten sam kod z użyciem React Hooks jest nie tylko krótki, ale też prosty**:

```jsx
function MyComponent(props) {
  useEffect(() => {
    return props.observable.subscribe(…);
  }, [props.observable]);

  // …
}
```

Rzuć też okiem na inne porównania. Kilka subskrypcji w jednym komponencie:

<Gallery columns="2" link="file" size="medium">
  <img src="https://typeofweb.com/wp-content/uploads/2019/02/DqegNolWwAAnY8o.jpg-large.jpeg" loading="lazy" alt="undefined" title="Wiele subskrypcji z klasami" width="1168" height="1344" />
<img src="https://typeofweb.com/wp-content/uploads/2019/02/DqegO3aXgAAoy0v.jpg-large.jpeg" loading="lazy" alt="undefined" title="Wiele subskrypcji z React Hooks" width="826" height="624" />
</Gallery>

Minifikacja:

<Gallery columns="2" link="file" size="medium">
  <img src="https://typeofweb.com/wp-content/uploads/2019/02/Dqe4XRFX0AADrNS.jpg-large.jpeg" loading="lazy" alt="undefined" title="Minifikacja klasy" width="2047" height="814" />
<img src="https://typeofweb.com/wp-content/uploads/2019/02/Dqe4YnOW4AA0pj_.jpg-large.jpeg" loading="lazy" alt="undefined" title="Minifikacja React Hooks" width="1626" height="486" />
</Gallery>

(źródło: [twitter.com/jamiebuilds/status/1055988893303037952](https://twitter.com/jamiebuilds/status/1055988893303037952))

I wreszcie, związane ze sobą fragmenty kodu porozrzucane w klasie i uporządkowane blisko siebie w funkcji z Hookami:

https://twitter.com/prchdk/status/1056960391543062528

Czy to Cię przekonuje? Mnie absolutnie tak.

Jeśli chcesz na bieżąco dowiadywać się o kolejnych częściach kursu React.js Hooks to koniecznie <strong>śledź mnie na Facebooku i zapisz się na newsletter.</strong>
<NewsletterForm />
<FacebookPageWidget />

## Chcę nauczyć się Hooków!

Świetnie! Szczęśliwie się składa, że **właśnie pracuję nad kolejną częścią kursu React Hooks** ;) Jeśli jednak bardzo Ci się spieszy to zajrzyj tutaj: <a href="https://szkolenia.typeofweb.com/" target="_blank">zapisz się na szkolenie z React</a>.
