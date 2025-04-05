import Insta from "../assets/ri_instagram-line.svg";
import YouTube from "../assets/ri_youtube-fill.svg";
import Twitter from "../assets/ri_twitter-fill.svg";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="max-w-[1680px] mx-auto flex justify-between items-center border-b px-6 py-4">
      <Link to="/" className="font-bold text-sm">
        FYRRE MAGAZINE
      </Link>
      <div className="flex gap-6 items-center text-sm text-gray-700">
        <Link to="/magazine">Magazine</Link>
        <a href="#">Authors</a>
        <Link to="/podcasts">Podcasts</Link>
        <span className="text-gray-400">—</span>
        <div className="flex gap-4 text-xl">
          <a href="#">
            <i>
              <img src={Insta} className="fab fa-instagram" alt="" />
            </i>
          </a>
          <a href="#">
            <img src={YouTube} className="fab fa-youtube" alt="" />
          </a>
          <a href="#">
            <img src={Twitter} className="fab fa-twitter" alt="" />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
