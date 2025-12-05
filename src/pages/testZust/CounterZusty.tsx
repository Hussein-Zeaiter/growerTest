import { CounterProvider } from "../../stores/testZust/CounterZust/CounterProvider";
import {
  useCount,
  useInc,
} from "../../stores/testZust/CounterZust/counterActions";

type CounterProps = {
  initialCount?: number;
};

export function Counter({ initialCount = 0 }: CounterProps) {
  // 1️⃣ Inner component — uses hooks, contains the JSX
  function InnerCounter() {
    const count = useCount();
    const inc = useInc();

    return (
      <div style={{ margin: 10, border: "1px solid gray", padding: 10 }}>
        <h3>Counter: {count}</h3>
        <button onClick={inc}>+1</button>
      </div>
    );
  }

  // 2️⃣ Outer component — wraps InnerCounter with the provider
  return (
    <CounterProvider initialCount={initialCount}>
      <InnerCounter />
    </CounterProvider>
  );
}
