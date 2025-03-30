import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-white">
      {/* Top Newsline */}
      <div className="overflow-hidden whitespace-nowrap border-t border-b border-purple-500 py-2 text-sm font-bold tracking-wide">
        <div className="animate-marquee inline-block">
          {Array(20).fill("NEWSLETTER+++").join("   ")}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1680px] mx-auto px-6 py-20 grid md:grid-cols-2 gap-10">
        {/* Left: Text */}
        <div>
          <h2 className="text-5xl md:text-6xl font-extrabold leading-tight">
            DESIGN NEWS TO <br /> YOUR INBOX
          </h2>
        </div>

        {/* Right: Email Signup */}
        <div className="flex flex-col items-start justify-center">
          <form className="flex w-full max-w-sm">
            <input
              type="email"
              placeholder="Email"
              className="flex-grow px-4 py-2 text-black rounded-l-sm"
            />
            <button
              type="submit"
              className="bg-white text-black px-4 py-2 font-semibold rounded-r-sm"
            >
              SIGN UP
            </button>
          </form>
        </div>
      </div>

      {/* Footer Nav */}
      <div className="max-w-[1680px] mx-auto px-6 pb-10 border-t border-white/10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
          {/* Left: Logo + copyright */}
          <div className="text-sm text-gray-400">
            <div className="font-bold mb-2">FYRRE MAGAZINE</div>
            <p>© Made by Pawel Gola – Powered by Webflow</p>
          </div>

          {/* Middle: Links */}
          <div className="grid grid-cols-3 gap-6 text-sm text-gray-300">
            <ul className="space-y-1">
              <li>Art</li>
              <li>Design</li>
              <li>Architecture</li>
            </ul>
            <ul className="space-y-1">
              <li>Magazine</li>
              <li>Podcast</li>
              <li>Authors</li>
            </ul>
            <ul className="space-y-1">
              <li>Styleguide</li>
              <li>Licensing</li>
              <li>Changelog</li>
            </ul>
          </div>

          {/* Right: Socials */}
          <div className="flex gap-4 text-lg text-white">
            <a href="#">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#">
              <i className="fab fa-youtube"></i>
            </a>
            <a href="#">
              <i className="fas fa-rss"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
