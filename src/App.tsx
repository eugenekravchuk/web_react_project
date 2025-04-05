import { BrowserRouter, Routes, Route } from "react-router-dom";
import Frontpage from "./pages/Frontpage";
import Magazine from "./pages/Magazine";
import MagazinePost from "./pages/MagazinePost";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Frontpage />} />
        <Route path="/magazine" element={<Magazine />} />
        <Route path="articles/:slug" element={<MagazinePost />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
