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
      }
    };

    fetchFirstArticle();
  }, []);

  if (!article) {
    return <div className="text-center py-20 text-xl">Loading hero...</div>;
  }

  return (
    <section className="px-6 py-12 max-w-[1680px] mx-auto">
      <div className="flex flex-col lg:flex-row gap-12 mb-10">
        {/* Left: Title */}
        <div className="lg:w-1/2 flex items-start">
          <h1 className="text-[104px] font-extrabold leading-tight tracking-tight">
            {article.title.toUpperCase()}
          </h1>
        </div>

        {/* Right: Description and Meta */}
        <div className="lg:w-1/2 flex flex-col justify-between pt-8 text-lg">
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

      {/* Image */}
      <img
        src={article.imageSrc}
        alt={article.title}
        className="w-full h-[600px] object-cover object-center"
      />
    </section>
  );
};

export default Hero;
