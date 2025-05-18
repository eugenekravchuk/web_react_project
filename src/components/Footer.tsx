import Insta from "../assets/ri_instagram-line.png";
import YouTube from "../assets/ri_youtube-fill.png";
import Twitter from "../assets/ri_twitter-fill.png";
import NewsForm from "./NewsForm";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.search]);
  return (
    <footer className="bg-black text-white text-sm">
      <div className="overflow-hidden whitespace-nowrap py-2 font-bold border-t border-b border-white">
        <div className="animate-marquee inline-block marquee-wrapper">
          {Array(20).fill("NEWSLETTER+++").join("   ")}
        </div>
      </div>

      <div className="max-w-[1680px] mx-auto px-6 py-20 grid md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-6xl md:text-7xl font-extrabold leading-tight">
            DESIGN NEWS TO <br /> YOUR INBOX
          </h2>
        </div>

        <div className="flex items-center justify-end">
          <NewsForm />
        </div>
      </div>

      <div className="max-w-[1680px] mx-auto px-6 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 border-t border-white/10 pt-10">
          <div>
            <div className="text-white font-bold text-2xl">FYRRE MAGAZINE</div>
          </div>

          <div className="col-span-3 grid grid-cols-3 gap-8 text-gray-300 mt-10 text-base">
            <ul className="space-y-1">
              <li>
                <Link to="/magazine?filter=ART" className="block mb-3">
                  Art
                </Link>
              </li>
              <li>
                <Link to="/magazine?filter=STREET ART" className="block mb-3">
                  Street Art
                </Link>
              </li>
              <li>
                <Link to="/magazine?filter=SCULPTURES" className="block mb-3">
                  Sculptures
                </Link>
              </li>
            </ul>
            <ul className="space-y-1">
              <li>
                <Link to="/magazine" className="block mb-3">
                  Magazine
                </Link>
              </li>
              <li>
                <Link to="/podcasts" className="block mb-3">
                  Podcast
                </Link>
              </li>
              <li>
                <Link to="/authors" className="block mb-3">
                  Authors
                </Link>
              </li>
            </ul>
            <ul className="space-y-1">
              <li>
                <a
                  href="https://material.io/design"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mb-3"
                >
                  Styleguide
                </a>
              </li>
              <li>
                <a
                  href="https://creativecommons.org/licenses/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mb-3"
                >
                  Licensing
                </a>
              </li>
              <li>
                <a
                  href="https://developers.google.com/search/blog"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mb-3"
                >
                  Changelog
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="max-w-[1680px] mx-auto px-6 pb-10">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6 border-t border-white/10 pt-6">
          <p className="text-xs text-gray-400"></p>

          <div className="flex gap-4">
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
      </div>
    </footer>
  );
};

export default Footer;
