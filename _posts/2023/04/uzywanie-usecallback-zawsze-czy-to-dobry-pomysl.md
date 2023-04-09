---
title: 'Używanie `useCallback` zawsze: Czy to dobry pomysł?'
permalink: uzywanie-usecallback-zawsze-czy-to-dobry-pomysl
type: post
date: 2023-04-09T18:30:42.569Z
authors:
  - michal-miszczyszyn
category: dobry-kod
series:
  slug: react-js
  name: React.js
thumbnail:
  url: https://og.typeofweb.com/api?text=**Czy+warto+zatrudnia%C4%87+junior%C3%B3w%3F**%0A%F0%9F%A4%93+Model+i+symulacja+produktywno%C5%9Bci+zespo%C5%82%C3%B3w+%F0%9F%93%88&overlayColor=4b271b&overlayOpacity=0.60
  width: 1920
  height: 1005
---

W świecie React.js ważne jest, aby pisać kod, który jest zarówno wydajny, jak i czytelny. Jednym ze sposobów na osiągnięcie tego celu jest stosowanie React Hooks, takich jak `useCallback`. W tym artykule przedstawimy argumenty za stosowaniem `useCallback` dla każdej funkcji, aby poprawić czytelność i spójność, nie wpływając negatywnie na wydajność.

---

## Czy `useCallback` zawsze wpływa na wydajność?

`useCallback` jest hookiem, który pozwala na utrzymanie stałej referencji do funkcji między renderowaniami komponentu. Dzięki temu możemy uniknąć niepotrzebnych ponownych renderowań, które mogą obniżać wydajność aplikacji. Warto jednak pamiętać, że używanie `useCallback` nie zawsze wpłynie na wydajność, a w niektórych przypadkach może nawet być niepotrzebne.

Jednakże, stosowanie `useCallback` zawsze dla każdej funkcji może prowadzić do większej spójności i czytelności kodu. Nawet jeśli nie zawsze wpływa na wydajność, `useCallback` może być wykorzystane jako sposób na utrzymanie dobrych praktyk programistycznych.

**Przykład 1: Stosowanie `useCallback` w komponentach z `memo`**

```tsx
import { memo, useState, useCallback } from 'react';

interface CounterButtonProps {
  increment: () => void;
}

const CounterButton = memo(({ increment }: CounterButtonProps) => {
  return <button onClick={increment}>Increment</button>;
});

const App = () => {
  const [count, setCount] = useState(0);

  const increment = useCallback(() => {
    setCount(count + 1);
  }, [count]);

  return (
    <div>
      <CounterButton increment={increment} />
      <p>Count: {count}</p>
    </div>
  );
};
```

W powyższym przykładzie używamy `useCallback`, aby utrzymać stałą referencję do funkcji `increment`. Dzięki temu komponent `CounterButton` opakowany przez `memo` unika niepotrzebnego ponownego renderowania.

**Przykład 2: Używanie `useCallback` z useEffect**

```tsx
import { useState, useEffect, useCallback } from 'react';

interface ChildComponent {
  onMount: () => void;
}

const ChildComponent = ({ onMount }) => {
  useEffect(() => {
    onMount();
  }, [onMount]);

  return <p>ChildComponent</p>;
};

const ParentComponent = () => {
  const [mounted, setMount] = useState(false);

  const onChildMount = useCallback(() => {
    setMount(true);
  }, []);

  return (
    <div>
      <h1>ParentComponent</h1>
      <p>Is child mounted: {mounted ? 'Mounted' : 'Not Mounted'}</p>
      <ChildComponent onMount={onChildMount} />
    </div>
  );
};
```

W powyższym przykładzie używamy `useCallback`, aby utrzymać stałą referencję do funkcji `onChildMount`. Funkcja ta jest przekazywana do komponentu `ChildComponent`, który wykorzystuje ją jako zależność dla `useEffect`. Stosowanie `useCallback` w tym kontekście pomaga w optymalizacji wydajności, a także zapobiega wielokrotnemu wywołaniu `onChildMount`.

## Uwagi końcowe

Stosowanie `useCallback` zawsze może prowadzić do większej spójności i czytelności kodu, bez negatywnego wpływu na wydajność. W praktyce, wykorzystywanie `useCallback` dla każdej funkcji może być dobrym rozwiązaniem, szczególnie gdy mamy do czynienia z przekazywaniem funkcji jako atrybutów do komponentów dzieci.

Ostatecznie, decyzja o stosowaniu `useCallback` zawsze zależy od indywidualnych potrzeb projektu, zespołu programistów i programistek, i analizy wydajności. Warto jednak pamiętać, że `useCallback` może pozytywnie wpływać na spójność i czytelność kodu, nawet jeśli nie zawsze przekłada się na znaczące zmiany wydajności.

## Podsumowanie: `useCallback` w React.js zawsze?

Podsumowując, używanie `useCallback` dla każdej funkcji może być wartościową praktyką dla programistów i programistek React.js. Dzięki temu można uzyskać bardziej spójny i czytelny kod, jednocześnie dbając o optymalizację wydajności tam, gdzie jest to potrzebne. Warto eksperymentować z tym podejściem i ocenić jego korzyści w kontekście konkretnych projektów.

Moje porady:

- Dbaj o odpowiednią strukturę komponentów oraz stosuj jasne nazwy funkcji, co przyczyni się do utrzymania czytelności kodu i łatwości utrzymania, niezależnie od strategii stosowania `useCallback`.
- Używaj narzędzi takich jak ESLint, aby upewnić się, że zarządzasz zależnościami w sposób optymalny i utrzymujesz dobrą jakość kodu (szczególnie polecam regułę `"react-hooks/exhaustive-deps": "error"`).
- Dąż do ujednolicenia swojego podejścia do stosowania `useCallback`, tak aby ułatwić innym programistom zrozumienie i utrzymanie kodu.
