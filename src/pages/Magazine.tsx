import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../data/firebase";
import { ArticleType } from "../data/types";

import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MagazineLogo from "../assets/headers/Magazine.svg";
import { useSearchParams } from "react-router-dom";
import ArticleCard from "../components/ArticleCard";

const categories = ["ALL", "ART", "STREET ART", "SCULPTURES"];

const Magazine = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selected = (searchParams.get("filter") || "ALL").toUpperCase();

  const [articles, setArticles] = useState<ArticleType[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<ArticleType[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchFirestoreData = async () => {
      try {
        const articleSnap = await getDocs(collection(db, "articles"));
        const loadedArticles = articleSnap.docs.map(
          (doc) => doc.data() as ArticleType
        );
        setArticles(loadedArticles);
        setFilteredArticles(loadedArticles);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Firestore data:", error);
      }
    };

    fetchFirestoreData();
  }, []);

  useEffect(() => {
    const filtered =
      selected === "ALL"
        ? articles
        : articles.filter(
            (article) => (article.label || "").toUpperCase() === selected
          );

    setFilteredArticles(filtered);
  }, [selected, articles]);

  return (
    <div className="mx-auto">
      <Navbar />
      <Header className="w-full" header={MagazineLogo} />

      <div className="max-w-[1680px] mx-auto flex flex-col gap-12 px-6">
        <div className="flex justify-end gap-2 flex-wrap mt-10 mb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSearchParams({ filter: cat })}
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

        <div className="flex flex-wrap w-full">
          {loading
            ? Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="w-full sm:w-1/2 lg:w-1/3 p-2 animate-pulse"
                >
                  <div className="w-full h-[300px] bg-gray-200 rounded mb-4" />
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                </div>
              ))
            : filteredArticles.map((article) => (
                <div key={article.id} className="w-full sm:w-1/2 lg:w-1/3">
                  <ArticleCard
                    imageSrc={article.imageSrc}
                    title={article.title}
                    description={article.description}
                    author={article.author}
                    date={article.date}
                    readTime={article.readTime}
                    label={article.label}
                    slug={article.id}
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
