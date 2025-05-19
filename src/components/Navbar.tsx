import { useState } from "react";
import { Link } from "react-router-dom";
import Insta from "../assets/ri_instagram-line.svg";
import YouTube from "../assets/ri_youtube-fill.svg";
import Twitter from "../assets/ri_twitter-fill.svg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="border-b px-6 py-4 max-w-[1680px] mx-auto">
      <div className="flex justify-between items-center">
        <Link to="/" className="font-bold text-sm">
          FYRRE MAGAZINE
        </Link>

        <div className="hidden md:flex gap-6 items-center text-sm text-gray-700">
          <Link to="/create-article">Create Article</Link>
          <Link to="/magazine">Magazine</Link>
          <Link to="/authors">Authors</Link>
          <Link to="/podcasts">Podcasts</Link>
          <span className="text-gray-400">—</span>
          <div className="flex gap-4 text-xl">
            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                window.location.href
              )}&text=Check this out!`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on Twitter"
            >
              <img src={Twitter} alt="Twitter" className="w-6 h-6" />
            </a>

            <a
              href="https://www.instagram.com/mystetstvo.lviv?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open Instagram"
            >
              <img src={Insta} alt="Instagram" className="w-6 h-6" />
            </a>
            <a
              href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Watch on YouTube"
            >
              <img src={YouTube} alt="YouTube" className="w-6 h-6" />
            </a>
          </div>
        </div>

        <button
          className="md:hidden text-2xl focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          ☰
        </button>
      </div>

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
            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                window.location.href
              )}&text=Check this out!`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on Twitter"
            >
              <img src={Twitter} alt="Twitter" className="w-6 h-6" />
            </a>

            <a
              href="https://www.instagram.com/mystetstvo.lviv?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open Instagram"
            >
              <img src={Insta} alt="Instagram" className="w-6 h-6" />
            </a>
            <a
              href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Watch on YouTube"
            >
              <img src={YouTube} alt="YouTube" className="w-6 h-6" />
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
