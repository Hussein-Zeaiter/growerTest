import "./App.css";
/* import Tan from "./pages/tan/Tan"; */
import { MainQueryClient } from "./queryProvider/MainQueryClient";
import Burgers from "./pages/tan/Burgers";

function App() {
  return (
    <MainQueryClient>
      <Burgers />
    </MainQueryClient>
  );
}

export default App;
