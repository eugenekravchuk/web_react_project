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
      <Suspense fallback={<div className="h-16" />}>
        <Navbar />
        <Header className="w-full" header={MagazineLogo} />
      </Suspense>

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

        <section
          aria-label="Articles"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {loading
            ? Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="animate-pulse space-y-3"
                  aria-hidden="true"
                >
                  <div className="w-full aspect-[4/3] bg-gray-200 rounded" />
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                </div>
              ))
            : filteredArticles.map((article) => (
                <Suspense key={article.id} fallback={<div className="h-40" />}>
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
                </Suspense>
              ))}
        </section>
      </main>

      <Suspense fallback={<div className="h-16" />}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Magazine;
