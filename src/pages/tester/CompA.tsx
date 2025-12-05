import { useTest } from "../../stores/testContext/useTest";

function CompA() {
  const { countData } = useTest();
  const { count, setCount } = countData;

  console.log("Component A rendered");

  return (
    <div style={{ border: "1px solid red", padding: "10px", margin: "10px" }}>
      <h3>Component A (uses count)</h3>
      <p>Count: {count}</p>
      <button onClick={() => setCount((c) => c + 1)}>Increment Count</button>
    </div>
  );
}

export default CompA;
