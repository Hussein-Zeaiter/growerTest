import { useTest } from "../../stores/testContext/useTest";
import { memo } from "react";

function CompA() {
  const { count, setCount } = useTest();

  console.log("Component A rendered");

  return (
    <div style={{ border: "1px solid red", padding: "10px", margin: "10px" }}>
      <h3>Component A (uses count)</h3>
      <p>Count: {count}</p>
      <button onClick={() => setCount((c) => c + 1)}>Increment Count</button>
      <MemoedChild />
    </div>
  );
}

function CompD() {
  console.log("Child of A ");
  return <div>Child of A</div>;
}

const MemoedChild = memo(CompD);

export default CompA;
