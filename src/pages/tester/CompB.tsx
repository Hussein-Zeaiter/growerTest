import { useTest } from "../../stores/testContext/useTest";

function CompB() {
  const { nameData } = useTest();
  const { name, setName } = nameData;

  console.log("Component B rendered");

  return (
    <div style={{ border: "1px solid blue", padding: "10px", margin: "10px" }}>
      <h3>Component B (uses name)</h3>
      <p>Name: {name}</p>
      <button onClick={() => setName((n) => n + "!")}>Change Name</button>
    </div>
  );
}

export default CompB;
