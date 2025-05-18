import { useEffect, useState } from "react";
import { db } from "../data/firebase";
import { collection, getDocs } from "firebase/firestore";
import { ArticleType } from "../data/types";
import MagazinCover from "../assets/magazin-cover.png";
import NewsForm from "./NewsForm";

const Sidebar = () => {
  const [randomArticles, setRandomArticles] = useState<ArticleType[]>([]);

  // Отримання випадкових статей
  useEffect(() => {
    const fetchRandomArticles = async () => {
      try {
        const snapshot = await getDocs(collection(db, "articles"));
        const allArticles = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as ArticleType[];

        // Випадкові 3 статті
        const shuffled = [...allArticles].sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 3);
        setRandomArticles(selected);
      } catch (error) {
        console.error("Помилка при завантаженні статей:", error);
      }
    };

    fetchRandomArticles();
  }, []);

  return (
    <aside className="w-full lg:w-[300px] xl:w-[360px] flex flex-col gap-14 text-sm text-black">
      <div className="pb-8">
        <h2 className="uppercase text-[14px] tracking-wide text-black mb-1 font-bold">
          Printmagazine
        </h2>
        <h3 className="text-6xl font-bold mb-4 pb-4">03/2022</h3>
        <img src={MagazinCover} alt="Magazine Cover" className="w-full mb-4" />
      </div>

      <div>
        <h2 className="uppercase text-[16px] tracking-wide text-black mb-5 font-bold">
          RANDOM FOR YOU
        </h2>

        <div className="divide-y divide-black-500">
          {randomArticles.map((article, idx) => (
            <div key={article.id} className="py-7">
              <a
                href={`/articles/${article.id}`}
                className="block group transition"
              >
                <div className="flex items-start">
                  <p
                    className="font-bold text-[24px] leading-none mt-1"
                    style={{ marginRight: "20px", minWidth: "32px" }}
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </p>
                  <div>
                    <p className="font-bold text-[24px] leading-snug group-hover:underline">
                      {article.title}
                    </p>
                    <p className="text-[14px] text-black text-bold mt-3">
                      <strong className="text-black font-medium mr-1">
                        Text
                      </strong>
                      {article.author}
                    </p>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-100 p-6">
        <h2 className="uppercase text-[16px] tracking-wide text-black font-bold mb-2">
          Newsletter
        </h2>
        <h3 className="text-4xl font-bold mb-4 leading-snug">
          Design News to <br /> your inbox
        </h3>
        <NewsForm />
      </div>
    </aside>
  );
};

export default Sidebar;
