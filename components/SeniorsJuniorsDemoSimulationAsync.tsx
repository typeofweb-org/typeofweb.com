import Dynamic from 'next/dynamic';

export const DemoSimulation = Dynamic<{}>(() =>
  import(/* webpackChunkName: "SeniorsJuniorsDemoSimulation" */ './SeniorsJuniorsDemoSimulation').then(
    (m) => m.DemoSimulation,
  ),
);
