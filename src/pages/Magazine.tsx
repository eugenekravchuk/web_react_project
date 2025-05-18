import { useEffect, useState, lazy, Suspense } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../data/firebase";
import { ArticleType } from "../data/types";
import { useSearchParams } from "react-router-dom";

const Header = lazy(() => import("../components/Header"));
const Navbar = lazy(() => import("../components/Navbar"));
const Footer = lazy(() => import("../components/Footer"));
const ArticleCard = lazy(() => import("../components/ArticleCard"));

import MagazineLogo from "../assets/headers/Magazine.svg";

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
      } catch (error) {
        console.error("Error fetching Firestore data:", error);
      } finally {
        setLoading(false);
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
      <Header header="Magazine" />

      <main className="max-w-[1680px] mx-auto px-4 sm:px-6 py-12 space-y-12">
        <div className="flex justify-end gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSearchParams({ filter: cat })}
              aria-pressed={selected === cat}
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

        {/* Articles */}
        <div className="flex flex-wrap w-full">
          {filteredArticles.map((article) => (
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
      </main>

      <div className="h-[100px]"></div>
      <Footer />
    </div>
  );
};

export default Magazine;
