import { BrowserRouter } from "react-router";
import Navbar from "./components/Navbar";
import RoutesWrapper from "./components/ RoutesWrapper";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <RoutesWrapper />
    </BrowserRouter>
  );
}
export default App;
