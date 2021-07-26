---
id: 1939
index: 111
title: "useReducer —\_przenoszenie logiki poza komponent"
date: 2019-05-07T15:16:31.000Z
isMarkdown: true
status: publish
permalink: usereducer-przenoszenie-logiki-poza-komponent
authors:
  - michal-miszczyszyn
guid: https://typeofweb.com/?p=1939
type: post
thumbnail:
  url: >-
    https://typeofweb.com/wp-content/uploads/2019/05/blue-blue-sky-bright-1323732.jpg
  width: 1280
  height: 853
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
`useReducer` to alternatywa dla `useState`. Ale po co i kiedy jej używać? W skrócie: Gdy logika komponentu się rozrasta i chcemy oddzielić ją całkowicie od widoku. Zgodnie z dobrymi praktykami!

<!--more-->

## Użycie `useReducer`
`useReducer` i `useState` pełnią bardzo podobne role: Służą do ustawiania stanu komponentu. Robią to jednak w inny sposób. Przypominam: `useState` przyjmuje stan początkowy, a zwraca aktualny stan i funkcję do ustawiania stanu:

```js
const [count, setCount] = useState(0);
```

Więcej o tym doczytasz w artykule:

https://typeofweb.com/2019/02/11/react-hooks-usestate-czyli-stan-w-komponentach-funkcyjnych/

Dla odmiany, `useReducer` jako argument przyjmuje **reducer** i stan początkowy, a zwraca stan oraz funkcję `dispatch`:

```js
const [count, dispatch] = useReducer(countReducer, 0);
```

[Jeśli znasz Reduksa](https://typeofweb.com/2018/04/06/react-redux-kurs-wprowadzenie-i-podstawy/), to na pewno od razu kojarzysz ten koncept!

## Napiszmy reducer
Kontynuujmy przykład z prostym licznikiem. Tak, wiem, banały, ale od czegoś trzeba zacząć 🙄

```jsx
function countReducer(state, action) {
    switch (action.type) {
        case 'increment':
            return state + 1;
        case 'decrement':
            return state - 1;
    }
}

function App() {
  const [count, dispatch] = React.useReducer(countReducer, 0);

  return (
    <div>
      {counter}
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
    </div>
  );
};
```

Po kliknięciu w przyciski wysyłane są akcje: `increment` i `decrement`. Są one obsługiwane przez `countReducer`, który odpowiednio zwiększa lub zmniejsza licznik o 1.

<p class=important>Reducer powinien zawsze zwracać nowy stan i nie modyfikować przekazanego argumentu.</p>

## Po co tak komplikować sobie życie?
Pewnie myślisz teraz: _Eeee… ale po co?_ No i zgadzam się, w takim przypadku nie ma to najmniejszego sensu — kod jest dużo dłuższy i bardziej skomplikowany.

Kiedy więc użycie `useReducer` ma sens? Gdy tworzymy bardziej skomplikowany komponent, **który może znaleźć się w wielu różnych stanach**. Wtedy reducer sprawdzi się doskonale.

Ponadto, reducer można łatwo wynieść do osobnej funkcji, a nawet pliku i przetestować jednostkowo — **kod staje się niezależny od Reacta i uniwersalny**.

##  `dispatch`
Dodatkowo, warto zwrócić uwagę na nowe możliwości, które daje nam funkcja `dispatch` — możemy ją przekazać do innych komponentów w drzewie!

Jest to rozwiązanie znacznie lepsze i bezpieczniejsze niż przekazywanie w dół `setState` pozyskanej z `useState`. Dlaczego? `setState` może posłużyć do dowolnego nadpisania stanu, natomiast `dispatch` służy tylko i wyłącznie do wysyłania predefiniowanych zmian, które następnie muszą być przetworzone w reducerze.

Innymi słowy, przekazywanie dalej `setState` **pozwala na dokonywanie dowolnych zmian w dowolnym miejscu** (brzmi jak bałagan, no nie?), natomiast przekazanie `dispatch` ogranicza zmiany tylko do tych, które przewidzieliśmy — a do tego zachodzą one wyłącznie w reducerze!

## Enkapsulacja poddrzewa komponentów
W praktyce, może się to przydać tam, gdzie tworzymy osobne komponenty, ale jednak związane ze sobą — np. `ContactList` i `Contact`. Najlepiej pokazać to na przykładzie:

<p class="codepen" data-height="485" data-theme-id="light" data-default-tab="js,result" data-user="mmiszy" data-slug-hash="QRbpPa" style="height: 485px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="React Hooks: useReducer">
  <span>See the Pen <a href="https://codepen.io/mmiszy/pen/QRbpPa/">
  React Hooks: useReducer</a> by Michał Miszczyszyn (<a href="https://codepen.io/mmiszy">@mmiszy</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

## Pytania?
[typeofweb-courses-slogan category="React"] Jeśli chcesz na bieżąco śledzić kolejne części kursu React.js to koniecznie <strong>polub mnie na Facebooku i zapisz się na newsletter.</strong>
<div style="text-align: center; margin-bottom: 40px;">[typeofweb-mailchimp title=""]</div>
<div style="text-align: center;">[typeofweb-facebook-page]</div>

## Podsumowanie
`useReducer` jest dobrym zamiennikiem `useState` w sytuacjach, gdy potrzebujemy wymodelować **bardziej rozbudowane komponenty i ich stany**. Możliwość łatwego **wydzielenia reducera oraz testowania go jednostkowo** to wisienka na torcie. `useReducer` na pewno się przyda!
