import { BrowserRouter, Routes, Route } from "react-router-dom";
import Frontpage from "./pages/Frontpage";
import Magazine from "./pages/Magazine";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Frontpage />} />
        <Route path="/magazine" element={<Magazine />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
