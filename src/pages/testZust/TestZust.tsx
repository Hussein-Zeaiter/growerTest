import ComponentA from "./ComponentA";
import ComponentB from "./ComponentB";
import { Counter } from "./CounterZusty";

function TestZust() {
  return (
    <div>
      <ComponentA />
      <ComponentB />

      <Counter initialCount={10} />
      <Counter initialCount={20} />
    </div>
  );
}

export default TestZust;
