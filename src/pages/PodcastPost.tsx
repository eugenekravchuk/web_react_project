import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
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
  episodeNumber: string;
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
        const q = query(collection(db, "podcasts"), where("episode", "==", slug));
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
    return <div className="text-center py-20 text-xl">Loading podcast...</div>;
  }

  if (!podcast) {
    return (
      <div className="text-center py-20 text-xl">
        Podcast not found.
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
        <div className="px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm font-bold uppercase hover:underline"
          >
            ← Go Back
          </button>
          <h1 className="text-lg font-black tracking-wider uppercase">
            Podcast
          </h1>
        </div>

        {/* Hero Section with Podcast Info */}
        <section className="w-full py-12 bg-white">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12 max-w-[1680px] mx-auto">
            <div>
              <h1 className="text-6xl md:text-7xl font-black leading-tight tracking-tight">
                {podcast.title.toUpperCase()}
              </h1>
              <div className="mt-4 text-2xl font-bold">
                EPISODE {podcast.episodeNumber}
              </div>
            </div>
            <div className="text-black text-base leading-relaxed md:max-w-[50%]">
              <p>{podcast.description}</p>
              <div className="mt-6 flex gap-4">
                {podcast.listenLinks?.youtube && (
                  <a href={podcast.listenLinks.youtube} target="_blank" rel="noopener noreferrer">
                    <img src={YouTube} alt="YouTube" className="h-6" />
                  </a>
                )}
                {podcast.listenLinks?.instagram && (
                  <a href={podcast.listenLinks.instagram} target="_blank" rel="noopener noreferrer">
                    <img src={Insta} alt="Instagram" className="h-6" />
                  </a>
                )}
                {podcast.listenLinks?.twitter && (
                  <a href={podcast.listenLinks.twitter} target="_blank" rel="noopener noreferrer">
                    <img src={Twitter} alt="Twitter" className="h-6" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Podcast Metadata */}
        <div className="flex items-center justify-between flex-wrap gap-4 py-4 px-6">
          <div className="flex flex-wrap gap-x-6 text-sm text-black">
            <span>
              <strong className="mr-1">Host</strong> {podcast.host}
            </span>
            <span>
              <strong className="mr-1">Date</strong> {podcast.date}
            </span>
            <span>
              <strong className="mr-1">Duration</strong> {podcast.duration}
            </span>
          </div>
          <div>
            <span className="text-xs border border-black px-4 py-1 rounded-full font-medium whitespace-nowrap">
              EPISODE {podcast.episodeNumber}
            </span>
          </div>
        </div>

        {/* Podcast Cover Image */}
        <div className="w-full relative">
          <img 
            src={podcast.imageSrc || defaultPodcastImage} 
            className="w-full h-[600px] object-cover" 
            alt={`Podcast cover for ${podcast.title}`}
          />
          <div className="absolute bottom-6 left-6 text-white text-4xl font-bold">
            EP {podcast.episodeNumber}
          </div>
        </div>

        {/* Host Card + Content */}
        <section className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
          <aside className="w-full max-w-xs p-6 rounded-md text-center bg-white">
            <h2 className="text-3xl font-bold">{podcast.host}</h2>
            <hr className="my-6 border-black" />
            <div className="text-sm space-y-6">
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
                <div className="flex gap-4">
                  <a href="#"><img src={Insta} alt="Insta" className="h-5" /></a>
                  <a href="#"><img src={YouTube} alt="YouTube" className="h-5" /></a>
                  <a href="#"><img src={Twitter} alt="Twitter" className="h-5" /></a>
                </div>
              </div>
            </div>
          </aside>

          <article className="md:col-span-3 text-base text-gray-800 space-y-6 leading-relaxed">
            {podcast.content ? (
              podcast.content.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))
            ) : (
              <>
                <p className="font-semibold">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Egestas dui id ornare arcu odio ut sem. Cras ornare arcu dui
                  vivamus arcu felis bibendum ut. Porttitor leo a diam.
                </p>

                <p>
                  Porttitor rhoncus dolor purus non enim praesent elementum. Eget
                  dolor morbi non arcu risus quis varius. Posuere ac ut consequat
                  semper viverra nam libero. In ornare quam viverra orci sagittis
                  eu. Tristique risus nec feugiat in fermentum posuere urna nec.
                  Tempus quam pellentesque nec nam aliquam sem et. Convallis a cras
                  semper auctor neque vitae tempus quam pellentesque.
                </p>
              </>
            )}

            {podcast.quote && (
              <blockquote className="border-l-4 border-black pl-6 py-4 text-xl font-semibold italic text-gray-900">
                "{podcast.quote.text}"
                {podcast.quote.author && (
                  <div className="mt-2 text-sm not-italic text-gray-600">
                    – {podcast.quote.author}
                  </div>
                )}
              </blockquote>
            )}
          </article>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default PodcastPost;