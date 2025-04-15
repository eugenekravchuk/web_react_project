import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AuthorsLogo from "../assets/headers/Authors.svg";
import { authors } from "../data/authors";
import AuthorRow from "../components/AuthorRow";

const Authors = () => {
  return (
    <div className="mx-auto">
      <Navbar />
      <Header header={AuthorsLogo} />

      <div className="h-[100px]"></div>

      <div className="grid grid-cols-1 max-w-[1680px] mx-auto">
        {authors.map((author, index) => (
          <div key={index} className="divide-y">
            <AuthorRow {...author} />
          </div>
        ))}
      </div>

      <div className="h-[100px]"></div>
      <Footer />
    </div>
  );
};

export default Authors;
