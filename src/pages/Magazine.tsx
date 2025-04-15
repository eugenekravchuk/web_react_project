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
      <Header className="w-full" header={MagazineLogo} />

      <div className="max-w-[1680px] mx-auto flex flex-col gap-12 px-6">
        {/* Категорії */}
        <div className="flex items-center justify-between flex-wrap gap-4 mt-10 mb-6">
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
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Статті */}
        <div className="flex flex-wrap w-full">
          {articleImages.map((image, index) => (
            <div key={index} className="w-full sm:w-1/2 lg:w-1/3">
              <ArticleCard
                imageSrc={image}
                title="Hope dies last"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed finibus ultrices metus, vitae laoreet turpis tristique eu. In in quam in sem aliquam sagittis. Aliquam facilisis erat nibh, nec facilisis ex pellentesque quis. Nam semper ac nisi iaculis sagittis. Suspendisse malesuada, dolor eget rutrum consectetur, tellus eros pulvinar nulla, eget ullamcorper urna tellus nec nisi. In ut justo nibh. Fusce aliquet, ex condimentum molestie dapibus."
                author="Jakob Gronberg"
                date="16 March 2022"
                readTime="1 Min"
                label="ART"
                slug="some"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="h-[100px]"></div>
      <Footer />
    </div>
  );
};

export default Magazine;
