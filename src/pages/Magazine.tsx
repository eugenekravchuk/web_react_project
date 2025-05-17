import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../data/firebase";
import { ArticleType, PodcastType, AuthorType } from "../data/types";

import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MagazineLogo from "../assets/headers/Magazine.svg";

import ArticleCard from "../components/ArticleCard";

const categories = ["ALL", "ART", "STREET ART", "SCULPTURES"];

const Magazine = () => {
  const [articles, setArticles] = useState<ArticleType[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<ArticleType[]>([]);
  const [selected, setSelected] = useState<string>("ALL");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFirestoreData = async () => {
      try {
        const articleSnap = await getDocs(collection(db, "articles"));
        setArticles(articleSnap.docs.map((doc) => doc.data() as ArticleType));
        setFilteredArticles(
          articleSnap.docs.map((doc) => doc.data() as ArticleType)
        );
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Firestore data:", error);
      }
    };

    fetchFirestoreData();
  }, []);

  useEffect(() => {
    setFilteredArticles(
      selected == "ALL"
        ? articles
        : articles.filter((article) => article.label == selected)
    );
  }, [selected]);

  // const filteredArticles =
  //   selected === "ALL"
  //     ? articles
  //     : articles.filter((article) => article.label === selected);

  if (loading) {
    return <div className="text-center py-20 text-xl">Loading...</div>;
  }

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
