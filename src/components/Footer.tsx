import React from "react";
import Insta from "../assets/ri_instagram-line.png";
import YouTube from "../assets/ri_youtube-fill.png";
import Twitter from "../assets/ri_twitter-fill.png";

const Footer = () => {
  return (
    <footer className="bg-black text-white text-sm">
      {/* Top Newsline */}
      <div className="overflow-hidden whitespace-nowrap py-2 font-bold border-t border-b border-white">
        <div className="animate-marquee inline-block marquee-wrapper">
          {Array(20).fill("NEWSLETTER+++").join("   ")}
        </div>
      </div>

      {/* Main Newsletter Section */}
      <div className="max-w-[1680px] mx-auto px-6 py-20 grid md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-6xl md:text-7xl font-extrabold leading-tight">
            DESIGN NEWS TO <br /> YOUR INBOX
          </h2>
        </div>

        <div className="flex items-center justify-end">
          <form className="flex w-full max-w-md">
            <input
              type="email"
              placeholder="Email"
              className="bg-white flex-grow px-4 py-2 text-black mr-2"
            />
          <button className="px-4 py-2 self-end bg-white text-black text-sm font-bold transition duration-200 border border-white hover:bg-transparent hover:text-white cursor-pointer">
            SIGN UP
          </button>
          </form>
        </div>
      </div>

      {/* Middle Footer: Logo + Links */}
      <div className="max-w-[1680px] mx-auto px-6 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 border-t border-white/10 pt-10">
          {/* Left: Logo */}
          <div>
            <div className="text-white font-bold text-2xl">FYRRE MAGAZINE</div>
          </div>

          {/* Center: Navigation */}
          <div className="col-span-3 grid grid-cols-3 gap-8 text-sm text-gray-300 mt-10 text-base">
            <ul className="space-y-1">
              <li><a href="#" className="block mb-3">Art</a></li>
              <li><a href="#" className="block mb-3">Design</a></li>
              <li><a href="#" className="block mb-3">Architecture</a></li>
            </ul>
            <ul className="space-y-1">
              <li><a href="#" className="block mb-3">Magazine</a></li>
              <li><a href="#" className="block mb-3">Podcast</a></li>
              <li><a href="#" className="block mb-3">Authors</a></li>
            </ul>
            <ul className="space-y-1">
              <li><a href="#" className="block mb-3">Styleguide</a></li>
              <li><a href="#" className="block mb-3">Licensing</a></li>
              <li><a href="#" className="block mb-3">Changelog</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer: Copyright + Socials */}
      <div className="max-w-[1680px] mx-auto px-6 pb-10">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6 border-t border-white/10 pt-6">
          {/* Copyright */}
          <p className="text-xs text-gray-400">
            © Made by Pawel Gola – Powered by Webflow
          </p>

          {/* Social Icons */}
          <div className="flex gap-4">
            <a href="#" className="hover:opacity-70 transition">
              <img src={Insta} alt="Instagram" className="w-5 h-5" />
            </a>
            <a href="#" className="hover:opacity-70 transition">
              <img src={Twitter} alt="Twitter" className="w-5 h-5" />
            </a>
            <a href="#" className="hover:opacity-70 transition">
              <img src={YouTube} alt="YouTube" className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
