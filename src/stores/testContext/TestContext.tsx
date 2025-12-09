import { createContext } from "react";

export type TestContextType = {
  count: number;
  name: string;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  setName: React.Dispatch<React.SetStateAction<string>>;
};
/* 
console.log("TestContext rendered!!!!!!"); */

export const TestContext = createContext<TestContextType | null>(null);
