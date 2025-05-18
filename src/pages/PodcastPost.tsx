import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../data/firebase";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import Insta from "../assets/ri_instagram-line.svg";
import YouTube from "../assets/ri_youtube-fill.svg";
import Twitter from "../assets/ri_twitter-fill.svg";
import defaultPodcastImage from "../assets/podcasts/podcast-1.png";

interface Podcast {
  id: string;
  title: string;
  host: string;
  imageSrc: string;
  description: string;
  date: string;
  duration: string;
  episode: string;
  content: string[];
  quote?: {
    text: string;
    author?: string;
  };
  listenLinks?: {
    instagram?: string;
    youtube?: string;
    twitter?: string;
  };
}

const PodcastPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const [podcast, setPodcast] = useState<Podcast | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPodcast = async () => {
      try {
        const q = query(
          collection(db, "podcasts"),
          where("episode", "==", Number(slug))
        );
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const data = querySnapshot.docs[0].data() as Podcast;
          setPodcast(data);
        } else {
          console.warn("Podcast not found for slug:", slug);
        }
      } catch (error) {
        console.error("Error fetching podcast:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPodcast();
  }, [slug]);

  if (loading) {
    return (
      <div className="mx-auto animate-pulse">
        <Navbar />
        <main className="max-w-[1680px] mx-auto px-4 sm:px-6 py-12 space-y-8">
          <div className="h-6 w-1/3 bg-gray-200 rounded" />
          <div className="h-6 w-1/4 bg-gray-200 rounded" />
          <div className="h-[400px] bg-gray-200 rounded" />
        </main>
        <Footer />
      </div>
    );
  }

  if (!podcast) {
    return (
      <div className="text-center py-20 text-lg">
        Podcast not found.
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
            Podcast
          </h1>
        </div>

        <section className="flex flex-col md:flex-row justify-between gap-10">
          <div className="md:w-1/2">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black leading-tight break-words">
              {podcast.title.toUpperCase()}
            </h1>
            <div className="mt-3 text-2xl font-bold">
              Episode {podcast.episode}
            </div>
          </div>

          <div className="text-base md:w-1/2 text-gray-800 leading-relaxed break-words">
            <p>{podcast.description}</p>
            <div className="mt-4 flex gap-4">
              {podcast.listenLinks?.youtube && (
                <a
                  href={podcast.listenLinks.youtube}
                  aria-label="YouTube"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={YouTube}
                    alt="YouTube"
                    className="h-6"
                    loading="lazy"
                  />
                </a>
              )}
              {podcast.listenLinks?.instagram && (
                <a
                  href={podcast.listenLinks.instagram}
                  aria-label="Instagram"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={Insta}
                    alt="Instagram"
                    className="h-6"
                    loading="lazy"
                  />
                </a>
              )}
              {podcast.listenLinks?.twitter && (
                <a
                  href={podcast.listenLinks.twitter}
                  aria-label="Twitter"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={Twitter}
                    alt="Twitter"
                    className="h-6"
                    loading="lazy"
                  />
                </a>
              )}
            </div>
          </div>
        </section>

        <div className="flex flex-wrap justify-between items-center gap-4 text-sm text-black">
          <div className="flex flex-wrap gap-x-6">
            <span>
              <strong>Host:</strong> {podcast.host}
            </span>
            <span>
              <strong>Date:</strong> {podcast.date}
            </span>
            <span>
              <strong>Duration:</strong> {podcast.duration}
            </span>
          </div>
          <div>
            <span className="text-xs border border-black px-4 py-1 rounded-full font-medium">
              EP {podcast.episode}
            </span>
          </div>
        </div>

        <div className="relative w-full aspect-[4/3]">
          <img
            src={podcast.imageSrc || defaultPodcastImage}
            alt={`Podcast cover for ${podcast.title}`}
            loading="lazy"
            className="w-full h-full object-cover rounded-md"
          />
          <div className="absolute bottom-4 left-4 text-white text-3xl font-extrabold drop-shadow-md">
            EP {podcast.episode}
          </div>
        </div>

        <section className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <aside className="p-6 border rounded-md text-center">
            <h2 className="text-2xl font-bold break-words">{podcast.host}</h2>
            <hr className="my-6 border-black" />
            <div className="text-sm space-y-6 text-left">
              <div className="flex justify-between">
                <span className="font-semibold">Date</span>
                <span>{podcast.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Duration</span>
                <span>{podcast.duration}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold">Share</span>
                <div className="flex gap-3">
                  <a href="#" aria-label="Instagram">
                    <img
                      src={Insta}
                      alt="Instagram"
                      className="h-5"
                      loading="lazy"
                    />
                  </a>
                  <a href="#" aria-label="YouTube">
                    <img
                      src={YouTube}
                      alt="YouTube"
                      className="h-5"
                      loading="lazy"
                    />
                  </a>
                  <a href="#" aria-label="Twitter">
                    <img
                      src={Twitter}
                      alt="Twitter"
                      className="h-5"
                      loading="lazy"
                    />
                  </a>
                </div>
              </div>
            </div>
          </aside>

          <article className="md:col-span-3 space-y-6 text-base leading-relaxed text-gray-800 break-words">
            {podcast.content?.length ? (
              podcast.content.map((para, i) => <p key={i}>{para}</p>)
            ) : (
              <p>No content available.</p>
            )}

            {podcast.quote?.text && (
              <blockquote className="border-l-4 border-black pl-6 py-4 text-xl font-semibold italic text-gray-900">
                “{podcast.quote.text}”
                {podcast.quote.author && (
                  <div className="mt-2 text-sm not-italic text-gray-600">
                    – {podcast.quote.author}
                  </div>
                )}
              </blockquote>
            )}
          </article>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PodcastPost;
