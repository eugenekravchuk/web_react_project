import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../data/firebase";
import { ArticleType, PodcastType, AuthorType } from "../data/types";

import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Article from "../components/Article";
import PodcastSectionHeader from "../components/PodcastSectionHeader";
import PodcastCard from "../components/PodcastCard";
import AuthorsSectionHeader from "../components/AuthorsSectionHeader";
import AuthorCard from "../components/AuthorCard";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import Newsline from "../components/Newsline";
import { Link } from "react-router-dom";

import ArtLogo from "../assets/headers/Art.svg";

const Frontpage = () => {
  const [articles, setArticles] = useState<ArticleType[]>([]);
  const [podcasts, setPodcasts] = useState<PodcastType[]>([]);
  const [authors, setAuthors] = useState<AuthorType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFirestoreData = async () => {
      try {
        const articleSnap = await getDocs(collection(db, "articles"));
        setArticles(articleSnap.docs.map((doc) => doc.data() as ArticleType));

        const podcastSnap = await getDocs(collection(db, "podcasts"));
        setPodcasts(podcastSnap.docs.map((doc) => doc.data() as PodcastType));

        const authorSnap = await getDocs(collection(db, "authors"));
        setAuthors(authorSnap.docs.map((doc) => doc.data() as AuthorType));

        setLoading(false);
      } catch (error) {
        console.error("Error fetching Firestore data:", error);
      }
    };

    fetchFirestoreData();
  }, []);

  if (loading) {
    return <div className="text-center py-20 text-xl">Loading...</div>;
  }

  return (
    <div className="mx-auto">
      <Navbar />
      <Header header={ArtLogo} />
      <Newsline />
      <Hero />

      <div className="max-w-[1680px] mx-auto flex flex-col lg:flex-row gap-12 px-6">
        <div className="flex-1">
          {articles.slice(0, 10).map((article, index) => (
            <Article
              key={index}
              imageSrc={article.imageSrc}
              title={article.title}
              description={article.description}
              author={article.author}
              date={article.date}
              readTime={article.readTime}
              label={article.label}
              slug={article.id}
            />
          ))}

          <div className="flex justify-start px-6 mt-6">
            <a
              href="/magazine"
              className="group inline-flex items-center gap-2 text-base font-semibold uppercase text-black transition-colors duration-300 hover:text-neutral-700"
            >
              All Articles
              <span className="inline-block text-xl transform transition-transform duration-300 group-hover:translate-x-1.5">
                →
              </span>
            </a>
          </div>
        </div>

        <Sidebar />
      </div>

      {/* Podcasts */}
      <div className="h-[100px]"></div>
      <PodcastSectionHeader />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6 max-w-[1680px] mx-auto">
        {podcasts.slice(0, 3).map((podcast, index) => (
          <Link to={`/podcasts/${podcast.episode}`}>
            <PodcastCard key={index} {...podcast} />
          </Link>
        ))}
      </div>

      {/* Authors */}
      <div className="h-[100px]"></div>
      <AuthorsSectionHeader />
      <div className="grid grid-cols-1 md:grid-cols-2 border divide-y md:divide-y-0 md:divide-x max-w-[1680px] mx-auto">
        {authors.slice(0, 4).map((author, index) => (
          <div key={index} className="divide-y">
            <Link to={`/authors/${author.id}`}>
              <AuthorCard {...author} />
            </Link>
          </div>
        ))}
      </div>

      <div className="h-[100px]"></div>
      <Footer />
    </div>
  );
};

export default Frontpage;
