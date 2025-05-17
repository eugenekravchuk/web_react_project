import { useState } from "react";
import { Link } from "react-router-dom";
import Insta from "../assets/ri_instagram-line.svg";
import YouTube from "../assets/ri_youtube-fill.svg";
import Twitter from "../assets/ri_twitter-fill.svg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="border-b px-6 py-4 max-w-[1680px] mx-auto">
      {/* Top row: Logo and burger */}
      <div className="flex justify-between items-center">
        <Link to="/" className="font-bold text-sm">
          FYRRE MAGAZINE
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex gap-6 items-center text-sm text-gray-700">
          <Link to="/create-article">Create Article</Link>
          <Link to="/magazine">Magazine</Link>
          <Link to="/authors">Authors</Link>
          <Link to="/podcasts">Podcasts</Link>
          <span className="text-gray-400">—</span>
          <div className="flex gap-4 text-xl">
            <a href="#" aria-label="Instagram">
              <img src={Insta} alt="Instagram" />
            </a>
            <a href="#" aria-label="YouTube">
              <img src={YouTube} alt="YouTube" />
            </a>
            <a href="#" aria-label="Twitter">
              <img src={Twitter} alt="Twitter" />
            </a>
          </div>
        </div>

        {/* Burger button */}
        <button
          className="md:hidden text-2xl focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          ☰
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-4 text-sm text-gray-700">
          <Link to="/create-article" onClick={() => setIsOpen(false)}>
            Create Article
          </Link>
          <Link to="/magazine" onClick={() => setIsOpen(false)}>
            Magazine
          </Link>
          <Link to="/authors" onClick={() => setIsOpen(false)}>
            Authors
          </Link>
          <Link to="/podcasts" onClick={() => setIsOpen(false)}>
            Podcasts
          </Link>
          <div className="flex gap-4 pt-2 border-t">
            <a href="#" aria-label="Instagram">
              <img src={Insta} alt="Instagram" />
            </a>
            <a href="#" aria-label="YouTube">
              <img src={YouTube} alt="YouTube" />
            </a>
            <a href="#" aria-label="Twitter">
              <img src={Twitter} alt="Twitter" />
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
