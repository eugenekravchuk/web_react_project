import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MagazineLogo from "../assets/headers/Magazine.svg";

import { articleImages } from "../data/articles";
import { useState } from "react";
import ArticleCard from "../components/ArticleCard";

// Define your categories and articles with category information
const categories = ["ALL", "ART", "STREET ART", "SCULPTURES"];

// Mock articles data with categories (replace with your actual data structure)
const articles = articleImages.map((image, index) => ({
  id: index + 1,
  imageSrc: image,
  title: "Hope dies last",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
  author: "Jakob Gronberg",
  date: "16 March 2022",
  readTime: `${index % 3 + 1} Min`, // Varying read times
  label: ["ART", "STREET ART", "SCULPTURES"][index % 3], // Assign different categories
  slug: `article-${index + 1}`
}));

const Magazine = () => {
  const [selected, setSelected] = useState<string>("ALL");

  // Filter articles based on selected category
  const filteredArticles = selected === "ALL" 
    ? articles 
    : articles.filter(article => article.label === selected);

  return (
    <div className="mx-auto">
      <Navbar />
      <Header className="w-full" header={MagazineLogo} />

      <div className="max-w-[1680px] mx-auto flex flex-col gap-12 px-6">
        {/* Categories */}
        <div className="flex items-center justify-between flex-wrap gap-4 mt-10 mb-6">
          <span className="font-bold text-sm tracking-wide">CATEGORIES</span>
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelected(cat)}
                className={`px-4 py-1 border rounded-full text-sm transition-all ${
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

        {/* Articles */}
        <div className="flex flex-wrap w-full">
          {filteredArticles.map((article, index) => (
            <div key={article.id} className="w-full sm:w-1/2 lg:w-1/3">
              <ArticleCard
                imageSrc={article.imageSrc}
                title={article.title}
                description={article.description}
                author={article.author}
                date={article.date}
                readTime={article.readTime}
                label={article.label}
                slug={article.slug}
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