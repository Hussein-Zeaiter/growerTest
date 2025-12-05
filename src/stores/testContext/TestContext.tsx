import { createContext } from "react";

export type TestContextType = {
  countData: {
    count: number;
    setCount: React.Dispatch<React.SetStateAction<number>>;
  };
  nameData: {
    name: string;
    setName: React.Dispatch<React.SetStateAction<string>>;
  };
};

export const TestContext = createContext<TestContextType | null>(null);
