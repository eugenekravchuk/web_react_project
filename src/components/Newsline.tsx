import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../data/firebase";

const Newsline = () => {
  const [titles, setTitles] = useState<string[]>([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const snapshot = await getDocs(collection(db, "articles"));
        const fetchedTitles = snapshot.docs.map((doc) => doc.data().title);
        setTitles(fetchedTitles);
      } catch (error) {
        console.error("Помилка при завантаженні статей:", error);
      }
    };

    fetchArticles();
  }, []);

  const content =
    titles.length > 0 ? (
      <>
        <strong className="mr-6">NEWS TICKER+++</strong>
        {titles.map((title, idx) => (
          <span key={idx} className="mr-12">
            + {title} +
          </span>
        ))}
      </>
    ) : (
      <>Loading news...</>
    );

  return (
    <div className="bg-black text-white overflow-hidden whitespace-nowrap py-3 px-5 group">
      <div className="marquee-wrapper flex animate-marquee">
        {content}
        {content}
      </div>
    </div>
  );
};

export default Newsline;
