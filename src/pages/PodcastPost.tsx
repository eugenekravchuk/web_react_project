import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../data/firebase";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import Insta from "../assets/ri_instagram-line.svg";
import YouTube from "../assets/ri_youtube-fill.svg";
import Twitter from "../assets/ri_twitter-fill.svg";

export interface Podcast {
  id: number;
  title: string;
  imageSrc: string;
  date: string;
  duration: string;
  episode: number;
  bold_info1: string;
  info1: string;
  info2: string;
  quote: string;
  quote_author: string;
  apple: string;
  spotify: string;
  soundcloud: string;
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
            <p>{podcast.bold_info1}</p>
            <div className="mt-4 flex gap-4">
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                  window.location.href
                )}&text=Check this out!`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on Twitter"
              >
                <img src={Twitter} alt="Twitter" className="w-6 h-6" />
              </a>

              <a
                href="https://www.instagram.com/mystetstvo.lviv?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open Instagram"
              >
                <img src={Insta} alt="Instagram" className="w-6 h-6" />
              </a>
              <a
                href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Watch on YouTube"
              >
                <img src={YouTube} alt="YouTube" className="w-6 h-6" />
              </a>
            </div>
          </div>
        </section>

        <div className="flex flex-wrap justify-between items-center gap-4 text-sm text-black">
          <div className="flex flex-wrap gap-x-6">
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
            src={podcast.imageSrc || "/placeholder.webp"}
            alt={`Podcast cover for ${podcast.title}`}
            loading="lazy"
            className="w-full h-full object-cover rounded-md"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "/placeholder.webp";
            }}
          />
          <div className="absolute bottom-4 left-4 text-white text-3xl font-extrabold drop-shadow-md">
            EP {podcast.episode}
          </div>
        </div>

        <section className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <aside className="p-6  rounded-md text-center">
            <h2 className="text-2xl font-bold break-words">
              Episode {podcast.episode}
            </h2>
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
            </div>
          </aside>

          <article className="md:col-span-3 space-y-6 text-base leading-relaxed text-gray-800 break-words">
            <p>{podcast.info1}</p>
            <p>{podcast.info2}</p>

            {podcast.quote && (
              <blockquote className="border-l-4 border-black pl-6 py-4 text-xl font-semibold italic text-gray-900">
                “{podcast.quote}”
                {podcast.quote_author && (
                  <div className="mt-2 text-sm not-italic text-gray-600">
                    – {podcast.quote_author}
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
