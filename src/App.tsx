import { BrowserRouter, Routes, Route } from "react-router-dom";
import Frontpage from "./pages/Frontpage";
import Magazine from "./pages/Magazine";
import MagazinePost from "./pages/MagazinePost";
import Podcasts from "./pages/Podcasts";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Frontpage />} />
        <Route path="/magazine" element={<Magazine />} />
        <Route path="articles/:slug" element={<MagazinePost />} />
        <Route path="/podcasts" element={<Podcasts />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
