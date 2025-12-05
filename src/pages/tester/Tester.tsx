import { useTest } from "../../stores/testContext/useTest";
import CompA from "./CompA";
import CompB from "./CompB";

function Tester() {
  return (
    <div>
      <div>Tester</div>
      <CompA />
      <hr />
      <CompB />
      <hr />
      <CompC />
    </div>
  );
}

function CompC() {
  const { countData } = useTest();
  console.log("Comp C rendered");
  return <div>Comp C</div>;
}

export default Tester;
