import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MagazineLogo from "../assets/headers/Magazine.svg";

import { articleImages } from "../data/articles";
import { useState } from "react";
import ArticleCard from "../components/ArticleCard";

const categories = ["ALL", "ART", "STREET ART", "SCULPTURES"];

const Magazine = () => {
  const [selected, setSelected] = useState<string>("ALL");

  return (
    <div className="mx-auto">
      <Navbar />
      <Header header={MagazineLogo} />

      <div className="max-w-[1680px] mx-auto flex flex-col gap-12 px-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <span className="font-bold text-sm tracking-wide">CATEGORIES</span>
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelected(cat)}
                className={`px-4 py-1 border rounded-full text-sm transition-all
              ${
                selected === cat
                  ? "bg-black text-white"
                  : "text-black border-black hover:bg-black hover:text-white"
              }
            `}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Статті */}
        <div className="flex-1 px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {articleImages.map((image, index) => (
              <ArticleCard
                key={index}
                imageSrc={image}
                title="Hope dies last"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed finibus ultrices metus, vitae laoreet turpis tristique eu. In in quam in sem aliquam sagittis. Aliquam facilisis erat nibh, nec facilisis ex pellentesque quis. Nam semper ac nisl iaculis sagittis. Suspendisse malesuada, dolor eget rutrum consectetur, tellus eros pulvinar nulla, eget ullamcorper urna tellus nec nisi. In ut justo nibh. Fusce aliquet, ex condimentum molestie dapibus,"
                author="Jakob Gronberg"
                date="16 March 2022"
                readTime="1 Min"
                label="ART"
                slug="some"
              />
            ))}
          </div>

          <div className="flex justify-end mt-8">
            <a
              href="/articles"
              className="group inline-flex items-center gap-2 text-base font-semibold uppercase text-black transition-colors duration-300 hover:text-neutral-700"
            >
              Next
              <span className="inline-block text-xl transform transition-transform duration-300 group-hover:translate-x-1.5">
                →
              </span>
            </a>
          </div>
        </div>
      </div>

      <div className="h-[100px]"></div>
      <Footer />
    </div>
  );
};

export default Magazine;
