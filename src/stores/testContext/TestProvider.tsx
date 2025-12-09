import { TestContext } from "./TestContext";
import { useState } from "react";

function TestProvider({ children }: { children: React.ReactNode }) {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("Hussein");

  /*   console.log("TestProvider rendered!1"); */

  return (
    <TestContext.Provider value={{ count, name, setCount, setName }}>
      {children}
    </TestContext.Provider>
  );
}

export default TestProvider;
