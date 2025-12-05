import "./App.css";
import Tester from "./pages/tester/Tester";
import TestProvider from "./stores/testContext/TestProvider";

function App() {
  return (
    <TestProvider>
      <Tester />
    </TestProvider>
  );
}

export default App;
