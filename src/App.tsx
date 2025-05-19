import { BrowserRouter, Routes, Route } from "react-router-dom";
import Frontpage from "./pages/Frontpage";
import Magazine from "./pages/Magazine";
import MagazinePost from "./pages/MagazinePost";
import Podcasts from "./pages/Podcasts";
import PodcastPost from "./pages/PodcastPost";
import Authors from "./pages/Authors";
import AuthorPage from "./pages/AuthorPage";
import CreateArticle from "./pages/CreateArticle";
import { ToastContainer } from "react-toastify";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Frontpage />} />
          <Route path="/magazine" element={<Magazine />} />
          <Route path="/articles/:slug" element={<MagazinePost />} />
          <Route path="/podcasts" element={<Podcasts />} />
          <Route path="/podcasts/:slug" element={<PodcastPost />} />
          <Route path="/authors" element={<Authors />} />
          <Route path="/authors/:slug" element={<AuthorPage />} />
          <Route path="/create-article" element={<CreateArticle />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
