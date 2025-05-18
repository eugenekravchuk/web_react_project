import { useEffect, useState, useMemo } from "react";
import { db } from "../data/firebase";
import { collection, getDocs } from "firebase/firestore";
import { ArticleType } from "../data/types";
import MagazinCover from "../assets/magazin-cover.png";
import NewsForm from "./NewsForm";

const Sidebar = () => {
  const [articles, setArticles] = useState<ArticleType[]>([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const snapshot = await getDocs(collection(db, "articles"));
        const all = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as ArticleType[];
        setArticles(all);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchArticles();
  }, []);

  const randomArticles = useMemo(() => {
    const shuffled = [...articles].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  }, [articles]);

  return (
    <aside className="w-full lg:w-[300px] xl:w-[360px] flex flex-col gap-14 text-sm text-black min-h-[700px]">
      <div className="pb-8">
        <h2 className="uppercase text-xs tracking-wide text-black mb-1 font-bold">
          Printmagazine
        </h2>
        <p className="text-4xl font-bold mb-4 pb-4">03/2022</p>
        <img
          src={MagazinCover}
          alt="Magazine Cover"
          width={360}
          height={200}
          loading="lazy"
          className="w-full h-auto mb-4 object-cover"
        />
      </div>

      <section aria-labelledby="random-heading">
        <h2
          id="random-heading"
          className="uppercase text-sm tracking-wide text-black mb-5 font-bold"
        >
          Random for You
        </h2>

        <div className="divide-y divide-black/20">
          {randomArticles.map((article, idx) => (
            <div key={article.id} className="py-6">
              <a
                href={`/articles/${article.id}`}
                className="block group transition"
              >
                <div className="flex items-start">
                  <p
                    className="font-bold text-xl leading-none mt-1 mr-5"
                    style={{ minWidth: "32px" }}
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </p>
                  <div>
                    <p className="font-bold text-lg leading-snug group-hover:underline">
                      {article.title}
                    </p>
                    <p className="text-xs text-black mt-3">
                      <strong className="font-medium mr-1">Text</strong>
                      {article.author}
                    </p>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </section>

      <section
        className="bg-gray-100 p-6 rounded"
        aria-labelledby="newsletter-heading"
      >
        <h2
          id="newsletter-heading"
          className="uppercase text-sm tracking-wide font-bold mb-2"
        >
          Newsletter
        </h2>
        <p className="text-2xl font-bold mb-4 leading-snug">
          Design News <br /> to your inbox
        </p>
        <NewsForm />
      </section>
    </aside>
  );
};

export default Sidebar;
