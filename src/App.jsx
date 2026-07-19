import { useEffect } from "react";
import Home from "./pages/Home";
import { checkFreighter } from "./services/stellar";

function App() {
  useEffect(() => {
    async function checkWallet() {
      const connected = await checkFreighter();
      console.log("Freighter:", JSON.stringify(connected, null, 2));
    }

    checkWallet();
  }, []);

  return <Home />;
}

export default App;