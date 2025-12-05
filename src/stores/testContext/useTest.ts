import { useContext } from "react";
import { TestContext } from "./TestContext";

export function useTest() {
  const ctx = useContext(TestContext);

  if (!ctx) {
    throw new Error("useTest must be used inside <TestProvider />");
  }

  return ctx;
}
