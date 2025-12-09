import { CounterProvider } from "../../stores/testZust/CounterZust/CounterProvider";
import {
  useCount,
  useCountActions,
} from "../../stores/testZust/CounterZust/counterActions";

type CounterProps = {
  initialCount?: number;
};

export function Counter({ initialCount = 0 }: CounterProps) {
  // inner component — uses hooks, contains the JSX
  function InnerCounter() {
    const count = useCount();
    const { inc } = useCountActions();

    console.log("subscribed comp rendered");

    return (
      <div style={{ margin: 10, border: "1px solid gray", padding: 10 }}>
        <h3>Counter: {count}</h3>
        <button onClick={inc}>+1</button>
      </div>
    );
  }

  function InnerUnsubed() {
    /* const count = useCount(); */ //follows the same rules of actual Context
    console.log("unsubbed rendered");
    return <div>InnerUnsubed</div>;
  }

  // outer component — wraps InnerCounter with the provider, done so we dont do it in every component that uses the counter
  return (
    <CounterProvider initialCount={initialCount}>
      <InnerCounter />
      <InnerUnsubed />
    </CounterProvider>
  );
}
