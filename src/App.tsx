import "./App.css";
/* import Tan from "./pages/tan/Tan"; */
import { MainQueryClient } from "./queryProvider/MainQueryClient";
import { MainBurgers } from "./pages/tan/burgerStuff/MainBurgers";
import { useState } from "react";

function App() {
  const [isBurgerShown, setIsBurgerShown] = useState(false);
  return (
    <MainQueryClient>
      <button onClick={() => setIsBurgerShown((s) => !s)}>toggle</button>
      {isBurgerShown ? <MainBurgers initialStatus="uncooked" /> : "hello"}
    </MainQueryClient>
  );
}

export default App;
