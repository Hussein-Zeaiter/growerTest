import { TestContext } from "./TestContext";
import { useMemo, useState } from "react";

function TestProvider({ children }: { children: React.ReactNode }) {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("Hussein");

  // 🔥 Only changes when COUNT changes
  const countValue = useMemo(() => ({ count, setCount }), [count]);

  // 🔥 Only changes when NAME changes
  const nameValue = useMemo(() => ({ name, setName }), [name]);

  // Final context value can combine them
  const value = useMemo(
    () => ({
      countData: countValue,
      nameData: nameValue,
    }),
    [countValue, nameValue]
  );

  return <TestContext.Provider value={value}>{children}</TestContext.Provider>;
}

export default TestProvider;
