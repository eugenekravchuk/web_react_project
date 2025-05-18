import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
      try {
        const q = query(
          collection(db, "articles"),
          or(where("id", "==", slug), where("id", "==", Number(slug)))
        );
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          const data = snapshot.docs[0].data() as Article;
          setArticle(data);
        } else {
          console.warn("Article not found:", slug);
        }
      } catch (err) {
        console.error("Error fetching article:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  if (loading) {
    return (
      <div className="mx-auto animate-pulse">
        <Navbar />
        <div className="max-w-[1680px] mx-auto px-4 sm:px-6 py-12 space-y-8">
          <div className="h-10 w-1/3 bg-gray-200 rounded" />
          <div className="h-6 w-3/4 bg-gray-200 rounded" />
          <div className="h-[400px] bg-gray-200 rounded" />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="h-[240px] bg-gray-200 rounded" />
            <div className="md:col-span-3 space-y-4">
              <div className="h-4 bg-gray-200 w-5/6 rounded" />
              <div className="h-4 bg-gray-200 w-2/3 rounded" />
              <div className="h-16 bg-gray-200 w-full rounded" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="text-center py-20 text-lg">
        Article not found.
        <br />
        <button
          onClick={() => navigate(-1)}
          className="mt-4 underline text-blue-600 font-semibold"
        >
          ← Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto">
      <Navbar />
      <main className="max-w-[1680px] mx-auto px-4 sm:px-6 py-12 space-y-12">
        <div className="flex justify-between items-center">
          <button
            onClick={() => navigate(-1)}
            className="text-sm font-bold uppercase hover:underline"
          >
            ← Go Back
          </button>
          <h1 className="text-lg font-black uppercase tracking-wider">
            Magazine
          </h1>
        </div>

        <section className="flex flex-col md:flex-row gap-10">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black leading-tight tracking-tight break-words md:w-1/2">
            {article.title.toUpperCase()}
          </h1>
          <p className="text-base text-gray-800 leading-relaxed break-words md:w-1/2">
            {article.description}
          </p>
        </section>

        <div className="flex flex-wrap justify-between items-center gap-4 text-sm text-black px-2 sm:px-0">
          <div className="flex flex-wrap gap-x-6 gap-y-2 font-medium">
            <span>
              <strong>Text:</strong> {article.author}
            </span>
            <span>
              <strong>Date:</strong> {article.date}
            </span>
            <span>
              <strong>Read:</strong> {article.readTime}
            </span>
          </div>
          <span className="text-xs border border-black px-4 py-1 rounded-full font-medium whitespace-nowrap">
            {article.label}
          </span>
        </div>

        <img
          src={article.imageSrc}
          alt={article.title}
          loading="lazy"
          className="w-full aspect-[4/3] object-cover rounded-md"
        />

        <section className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <aside className="max-w-xs p-6  rounded-md text-center">
            <h2 className="text-2xl font-bold break-words">{article.author}</h2>
            <hr className="my-6 border-black" />
            <div className="text-sm space-y-6 text-left">
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
                  <a href="#" aria-label="Instagram">
                    <img src={Insta} alt="Instagram" />
                  </a>
                  <a href="#" aria-label="YouTube">
                    <img src={YouTube} alt="YouTube" />
                  </a>
                  <a href="#" aria-label="Twitter">
                    <img src={Twitter} alt="Twitter" />
                  </a>
                </div>
              </div>
            </div>
          </aside>

          <article className="md:col-span-3 space-y-6 text-base leading-relaxed text-gray-800 break-words">
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
      </main>
      <Footer />
    </div>
  );
};

export default MagazinePost;
