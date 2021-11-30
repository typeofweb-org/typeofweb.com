import { useEffect, useState, useCallback, forwardRef, useImperativeHandle, useRef } from 'react';
import { LineChart, ReferenceLine, ResponsiveContainer, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

import { Button } from './atoms/Button';
import { Input } from './atoms/Input';

interface Variables {
  readonly n: number;
  readonly x: number;
  readonly d: number;
  readonly j: number;
  readonly ta: number;
  readonly Pa: number;
  readonly tx: number;
  readonly Px: number;
  readonly tl: number;
  readonly Pl: number;
}

export const DemoSimulation = () => {
  const [isRunningKey, setIsRunningKey] = useState(0);
  const [n, setn] = useState(1);
  const [x, setx] = useState(4);
  const [d, setd] = useState(1 / 40);
  const [j, setj] = useState(2 / 40);

  const [ta, setta] = useState(6);
  const [Pa, setPa] = useState(0.75);

  const [tx, settx] = useState(1);
  const [Px, setPx] = useState(0.5);

  const [tl, settl] = useState(6);
  const [Pl, setPl] = useState(0.25);

  const simulationRef = useRef<{ toggle(): void } | null>(null);

  return (
    <div className="mt-8">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setIsRunningKey(Math.random());
        }}
      >
        <div className="grid gap-4 grid-cols-2 items-end">
          <Input
            type="number"
            min={0}
            step={1}
            pattern="\d+"
            onInput={(e) => setn(e.currentTarget.valueAsNumber)}
            value={n}
          >
            Początkowa liczba seniorów
          </Input>
          <Input
            type="number"
            min={0}
            step={1}
            pattern="\d+"
            onInput={(e) => setx(e.currentTarget.valueAsNumber)}
            value={x}
          >
            Początkowa liczba juniorów
          </Input>
          <Input type="number" min={0} step={0.001} onInput={(e) => setd(e.currentTarget.valueAsNumber)} value={d}>
            Współczynnik przeszkadzania sobie seniorów
          </Input>
          <Input type="number" min={0} step={0.001} onInput={(e) => setj(e.currentTarget.valueAsNumber)} value={j}>
            Współczynnik uczenia się juniorów
          </Input>
          <Input type="number" min={1} step={1} onInput={(e) => setta(e.currentTarget.valueAsNumber)} value={ta}>
            Czas do awansu
          </Input>
          <Input
            type="number"
            min={0}
            step={0.001}
            max={1}
            onInput={(e) => setPa(e.currentTarget.valueAsNumber)}
            value={Pa}
          >
            Prawdopodobieństwo awansu
          </Input>
          <Input type="number" min={1} step={1} onInput={(e) => settx(e.currentTarget.valueAsNumber)} value={tx}>
            Czas do zatrudnienia juniora
          </Input>
          <Input
            type="number"
            min={0}
            step={0.001}
            max={1}
            onInput={(e) => setPx(e.currentTarget.valueAsNumber)}
            value={Px}
          >
            Prawdopodobieństwo zatrudnienia juniora
          </Input>
          <Input type="number" min={1} step={1} onInput={(e) => settl(e.currentTarget.valueAsNumber)} value={tl}>
            Czas do odejścia seniora
          </Input>
          <Input
            type="number"
            min={0}
            step={0.001}
            max={1}
            onInput={(e) => setPl(e.currentTarget.valueAsNumber)}
            value={Pl}
          >
            Prawdopodobieństwo odejścia seniora
          </Input>
        </div>
        <div className="flex flex-row gap-2 my-6">
          <Button type="submit" className="px-5">
            Start
          </Button>
          <Button type="button" className="px-5" onClick={() => setIsRunningKey(0)}>
            Stop
          </Button>
          <Button
            type="button"
            className="px-5"
            onClick={() => {
              simulationRef.current?.toggle();
            }}
          >
            Pause
          </Button>
        </div>
      </form>
      {isRunningKey > 0 && (
        <Simulation
          ref={simulationRef}
          key={isRunningKey}
          initialVariables={{
            n,
            x,
            d,
            j,
            ta,
            Pa,
            tx,
            Px,
            tl,
            Pl,
          }}
        />
      )}
    </div>
  );
};

const Simulation = forwardRef<{ toggle(): void }, { readonly initialVariables: Variables }>(
  ({ initialVariables }, ref) => {
    const [time, setTime] = useState(0);
    const [variables, setVariables] = useState({ variables: initialVariables, efficiency: 0 });
    const [datas, setDatas] = useState([variables]);

    const intervalIdRef = useRef<NodeJS.Timeout | null>(null);
    const start = useCallback(() => {
      intervalIdRef.current = setTimeout(() => {
        requestAnimationFrame(() => {
          setTime((time) => time + 1);
          start();
        });
      }, 0);
    }, []);

    const pause = useCallback(() => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
      }
      intervalIdRef.current = null;
    }, []);

    const toggle = useCallback(() => {
      if (intervalIdRef.current) {
        pause();
      } else {
        start();
      }
    }, [start, pause]);

    useEffect(() => setVariables((variables) => tick(time, variables.variables)), [time]);
    useEffect(() => setDatas((datas) => [...datas, variables]), [variables]);

    useEffect(() => {
      if (datas.slice(-10).every((d) => d.efficiency < 0)) {
        pause();
      }
    }, [datas, pause]);

    useEffect(() => {
      start();
      return () => {
        pause();
      };
    }, [pause, start]);

    useImperativeHandle(ref, () => ({ toggle }), [toggle]);

    const xMax =
      datas.reduceRight((acc, d, index) => (acc.val > d.efficiency ? acc : { val: d.efficiency, index }), {
        val: -Infinity,
        index: -1,
      }).index + 1;

    const xZero =
      datas.reduceRight(
        (acc, d, index) => {
          if (index < 2) {
            return acc;
          }

          if (acc.index !== -1) {
            return acc;
          }
          if (d.efficiency < 0) {
            return { ...acc, wasNegative: true };
          }
          if (d.efficiency >= 0 && acc.wasNegative) {
            return { ...acc, index };
          }
          return acc;
        },
        { wasNegative: false, index: -1 },
      ).index + 1;

    return (
      <ResponsiveContainer aspect={16 / 9}>
        <LineChart
          data={datas.map((v, i) => ({
            k: i + 1,
            eff: Math.round(v.efficiency * 25),
            n: v.variables.n,
            x: v.variables.x,
          }))}
        >
          <CartesianGrid stroke="#ccc" />
          <Line dot={{ r: 0 }} name="l. seniorów" dataKey="n" stroke="blue" />
          <Line dot={{ r: 0 }} name="l. juniorów" dataKey="x" stroke="green" />
          <Line dot={{ r: 0 }} name="wydajność zespołu" strokeWidth={3} dataKey="eff" stroke="red" />
          <XAxis dataKey="k" tickCount={3} type="number" min={0} />
          <YAxis domain={['dataMin', 'dataMax + 10']} tickCount={3} type="number" min={0} />
          <Tooltip labelFormatter={(v: number) => `Miesiąc ${v}`} />
          <ReferenceLine y={0} label="" stroke="gray" strokeDasharray="3 3" />
          <ReferenceLine x={xMax} label="max" stroke="green" strokeDasharray="3 3" />
          {xZero !== 0 && <ReferenceLine x={xZero} label="critical" stroke="red" strokeDasharray="6 3" />}
        </LineChart>
      </ResponsiveContainer>
    );
  },
);
Simulation.displayName = 'Simulation';

function tick(time: number, variables: Variables): { readonly variables: Variables; readonly efficiency: number } {
  let { n, x } = variables;
  const { d, j, ta, Pa, tx, Px, tl, Pl } = variables;

  if (time % ta === 0 && x > 0 && Math.random() < Pa) {
    n++;
    x--;
  }
  if (time % tx === 0 && Math.random() < Px) {
    x++;
  }
  if (time % tl === 0 && n > 0 && Math.random() < Pl) {
    n--;
  }

  const efficiency = n - (n - 1) ** 2 * d - x * j;

  return {
    variables: { n, x, d, j, ta, Pa, tx, Px, tl, Pl },
    efficiency,
  };
}
