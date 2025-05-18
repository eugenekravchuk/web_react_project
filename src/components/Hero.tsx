import { useEffect, useState } from "react";
import { collection, getDocs, limit, query } from "firebase/firestore";
import { db } from "../data/firebase";

interface Article {
  title: string;
  author: string;
  imageSrc: string;
  description: string;
  date: string;
  readTime: string;
  label: string;
}

const Hero = () => {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFirstArticle = async () => {
      try {
        const q = query(collection(db, "articles"), limit(1));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const data = querySnapshot.docs[0].data() as Article;
          setArticle(data);
        }
      } catch (error) {
        console.error("Error fetching hero article:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFirstArticle();
  }, []);

  if (loading) {
    return (
      <section className="px-4 sm:px-6 py-12 max-w-[1680px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-12 mb-10 animate-pulse">
          <div className="lg:w-1/2 h-[200px] bg-gray-200 rounded" />
          <div className="lg:w-1/2 space-y-4">
            <div className="h-6 bg-gray-200 rounded w-3/4" />
            <div className="h-6 bg-gray-200 rounded w-2/3" />
            <div className="h-6 bg-gray-200 rounded w-1/2" />
            <div className="h-10 bg-gray-200 rounded w-1/3 mt-6" />
          </div>
        </div>
        <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] bg-gray-200 rounded animate-pulse" />
      </section>
    );
  }

  if (!article) return null;

  return (
    <section className="px-4 sm:px-6 py-12 max-w-[1680px] mx-auto">
      <div className="flex flex-col lg:flex-row gap-6 sm:gap-12 mb-10">
        <div className="lg:w-1/2 flex items-start">
          <h1 className="text-4xl sm:text-6xl lg:text-[104px] font-extrabold leading-tight tracking-tight">
            {article.title.toUpperCase()}
          </h1>
        </div>

        <div className="lg:w-1/2 flex flex-col justify-between pt-6 sm:pt-8 text-base sm:text-lg">
          <div>
            <p className="text-gray-700">{article.description}</p>
          </div>

          <div className="mt-6 flex flex-wrap items-center text-sm gap-x-4 gap-y-2 text-gray-800 font-medium pb-10">
            <span>
              <strong>Text</strong> {article.author}
            </span>
            <span>
              <strong>Date</strong> {article.date}
            </span>
            <span>
              <strong>Duration</strong> {article.readTime}
            </span>
            <span className="ml-auto border px-3 py-2 rounded-full text-sm font-semibold">
              {article.label}
            </span>
          </div>
        </div>
      </div>

      <img
        src={article.imageSrc}
        alt={article.title}
        height={300}
        className="w-full sm:h-[400px] md:h-[500px] lg:h-[600px] object-cover object-center"
      />
    </section>
  );
};

export default Hero;
