import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { collection, query, where, getDocs, or } from "firebase/firestore";
import { db } from "../data/firebase";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import Insta from "../assets/ri_instagram-line.svg";
import YouTube from "../assets/ri_youtube-fill.svg";
import Twitter from "../assets/ri_twitter-fill.svg";

interface Article {
  title: string;
  id: string;
  author: string;
  imageSrc: string;
  description: string;
  date: string;
  readTime: string;
  label: string;
  bold_info1: string;
  bold_info2: string;
  info1: string;
  info2: string;
  quote: string;
  quote_author: string;
}

const MagazinePost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      const q = query(
        collection(db, "articles"),
        or(where("id", "==", slug), where("id", "==", Number(slug)))
      );
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const data = querySnapshot.docs[0].data() as Article;
        setArticle(data);
      } else {
        console.warn("Article not found for slug:", slug);
      }
      setLoading(false);
    };

    fetchArticle();
  }, [slug]);

  if (loading) {
    return <div className="text-center py-20 text-xl">Loading article...</div>;
  }

  if (!article) {
    return (
      <div className="text-center py-20 text-xl">
        Article not found.
        <br />
        <button
          onClick={() => navigate(-1)}
          className="mt-4 underline font-semibold text-blue-500"
        >
          ← Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto">
      <Navbar />
      <div className="max-w-[1680px] mx-auto flex flex-col gap-12 px-6">
        <div className=" px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm font-bold uppercase hover:underline"
          >
            ← Go Back
          </button>
          <h1 className="text-lg font-black tracking-wider uppercase">
            Magazine
          </h1>
        </div>

        <section className="w-full py-12 bg-white">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12 max-w-[1680px] mx-auto">
            <div>
              <h1 className="text-6xl md:text-7xl font-black leading-tight tracking-tight">
                {article.title.toUpperCase()}
              </h1>
            </div>
            <div className="text-black text-base leading-relaxed md:max-w-[50%]">
              <p>{article.description}</p>
            </div>
          </div>
        </section>

        <div className="flex items-center justify-between flex-wrap gap-4 py-4 px-6">
          <div className="flex flex-wrap gap-x-6 text-sm text-black">
            <span>
              <strong className="mr-1">Text</strong> {article.author}
            </span>
            <span>
              <strong className="mr-1">Date</strong> {article.date}
            </span>
            <span>
              <strong className="mr-1">Read</strong> {article.readTime}
            </span>
          </div>
          <div>
            <span className="text-xs border border-black px-4 py-1 rounded-full font-medium whitespace-nowrap">
              {article.label}
            </span>
          </div>
        </div>

        <div className="w-full">
          <img
            src={article.imageSrc}
            className="w-full h-[800px] object-cover"
          />
        </div>

        <section className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
          <aside className="w-full max-w-xs p-6 rounded-md text-center">
            <h2 className="text-3xl font-bold">{article.author}</h2>
            <hr className="my-6 border-black" />
            <div className="text-sm space-y-6">
              <div className="flex justify-between">
                <span className="font-semibold">Date</span>
                <span>{article.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Read</span>
                <span>{article.readTime}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold">Share</span>
                <div className="flex gap-4">
                  <a href="#">
                    <img src={Insta} alt="Insta" />
                  </a>
                  <a href="#">
                    <img src={YouTube} alt="YouTube" />
                  </a>
                  <a href="#">
                    <img src={Twitter} alt="Twitter" />
                  </a>
                </div>
              </div>
            </div>
          </aside>

          <article className="md:col-span-3 text-base text-gray-800 space-y-6 leading-relaxed">
            <p className="font-semibold">{article.bold_info1}</p>
            <p>{article.info1}</p>
            <p>{article.info2}</p>
            <p className="font-semibold">{article.bold_info2}</p>

            <blockquote className="border-l-4 border-black pl-6 py-4 text-xl font-semibold italic text-gray-900">
              {article.quote}
              <div className="mt-2 text-sm not-italic text-gray-600">
                – {article.quote_author}
              </div>
            </blockquote>
          </article>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default MagazinePost;
