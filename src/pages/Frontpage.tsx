import { useEffect, useState, lazy, Suspense, useMemo } from "react";
import { collection, getDocs, query, limit } from "firebase/firestore";
import { db } from "../data/firebase";
import { ArticleType, PodcastType, AuthorType } from "../data/types";

import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Newsline from "../components/Newsline";
import { Link } from "react-router-dom";
import ArtLogo from "../assets/headers/Art.svg";

const Hero = lazy(() => import("../components/Hero"));
const Sidebar = lazy(() => import("../components/Sidebar"));
const Footer = lazy(() => import("../components/Footer"));
const Article = lazy(() => import("../components/Article"));
const PodcastCard = lazy(() => import("../components/PodcastCard"));
const AuthorCard = lazy(() => import("../components/AuthorCard"));
const PodcastSectionHeader = lazy(
  () => import("../components/sectionHeaders/PodcastSectionHeader")
);
const AuthorsSectionHeader = lazy(
  () => import("../components/sectionHeaders/AuthorsSectionHeader")
);
const ArticlesSectionHeader = lazy(
  () => import("../components/sectionHeaders/ArticlesSectionHeader")
);

const Frontpage = () => {
  const [articles, setArticles] = useState<ArticleType[]>([]);
  const [podcasts, setPodcasts] = useState<PodcastType[]>([]);
  const [authors, setAuthors] = useState<AuthorType[]>([]);

  const [loading, setLoading] = useState({
    articles: true,
    podcasts: true,
    authors: true,
  });

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const articleSnap = await getDocs(
          query(collection(db, "articles"), limit(6))
        );
        setArticles(articleSnap.docs.map((doc) => doc.data() as ArticleType));
        setLoading((prev) => ({ ...prev, articles: false }));
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    const fetchPodcasts = async () => {
      try {
        const podcastSnap = await getDocs(
          query(collection(db, "podcasts"), limit(3))
        );
        setPodcasts(podcastSnap.docs.map((doc) => doc.data() as PodcastType));
        setLoading((prev) => ({ ...prev, podcasts: false }));
      } catch (error) {
        console.error("Error fetching podcasts:", error);
      }
    };

    const fetchAuthors = async () => {
      try {
        const authorSnap = await getDocs(
          query(collection(db, "authors"), limit(4))
        );
        setAuthors(authorSnap.docs.map((doc) => doc.data() as AuthorType));
        setLoading((prev) => ({ ...prev, authors: false }));
      } catch (error) {
        console.error("Error fetching authors:", error);
      }
    };

    fetchArticles();
    setTimeout(fetchPodcasts, 100);
    setTimeout(fetchAuthors, 200);
  }, []);

  const memoizedArticles = useMemo(() => articles.slice(0, 6), [articles]);
  const memoizedPodcasts = useMemo(() => podcasts.slice(0, 3), [podcasts]);
  const memoizedAuthors = useMemo(() => authors.slice(0, 4), [authors]);

  return (
    <div className="mx-auto">
      <Navbar />
      <Header header="ART & LIFE" />
      <Newsline />
      <Suspense
        fallback={<div className="h-[200px] bg-gray-100 animate-pulse" />}
      >
        <Hero />
      </Suspense>

      <div className="max-w-[1680px] mx-auto flex flex-col lg:flex-row gap-12 px-6">
        <div className="flex-1">
          {loading.articles ? (
            <div className="space-y-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="h-[180px] bg-gray-200 rounded animate-pulse"
                />
              ))}
            </div>
          ) : (
            memoizedArticles.map((article, index) => (
              <Suspense
                fallback={
                  <div className="h-[180px] bg-gray-200 animate-pulse" />
                }
                key={index}
              >
                <Article {...article} slug={article.id} />
              </Suspense>
            ))
          )}

          <Suspense
            fallback={<div className="h-[40px] bg-gray-200 animate-pulse" />}
          >
            <ArticlesSectionHeader />
          </Suspense>
        </div>

        <Suspense
          fallback={
            <div className="w-full lg:w-[300px] h-[300px] bg-gray-100 animate-pulse" />
          }
        >
          <Sidebar />
        </Suspense>
      </div>

      <div className="h-[100px]" />
      <Suspense
        fallback={<div className="h-[40px] bg-gray-200 animate-pulse" />}
      >
        <PodcastSectionHeader />
      </Suspense>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6 max-w-[1680px] mx-auto">
        {loading.podcasts
          ? Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="h-[200px] bg-gray-200 rounded animate-pulse"
              />
            ))
          : memoizedPodcasts.map((podcast, index) => (
              <Link key={index} to={`/podcasts/${podcast.episode}`}>
                <Suspense
                  fallback={
                    <div className="h-[200px] bg-gray-200 animate-pulse" />
                  }
                >
                  <PodcastCard {...podcast} />
                </Suspense>
              </Link>
            ))}
      </div>

      <div className="h-[100px]" />
      <Suspense
        fallback={<div className="h-[40px] bg-gray-200 animate-pulse" />}
      >
        <AuthorsSectionHeader />
      </Suspense>

      <div className="grid grid-cols-1 md:grid-cols-2 border divide-y md:divide-y-0 md:divide-x max-w-[1680px] mx-auto">
        {loading.authors
          ? Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="p-6 h-[140px] bg-gray-200 animate-pulse"
              />
            ))
          : memoizedAuthors.map((author, index) => (
              <div key={index} className="divide-y">
                <Link to={`authors/${author.id}`}>
                  <Suspense
                    fallback={
                      <div className="h-[140px] bg-gray-200 animate-pulse" />
                    }
                  >
                    <AuthorCard {...author} />
                  </Suspense>
                </Link>
              </div>
            ))}
      </div>

      <div className="h-[100px]" />
      <Suspense
        fallback={<div className="h-[200px] bg-gray-100 animate-pulse" />}
      >
        <Footer />
      </Suspense>
    </div>
  );
};

export default Frontpage;
