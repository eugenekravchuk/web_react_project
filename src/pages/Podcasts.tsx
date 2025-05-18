import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../data/firebase";

import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PodcastRow from "../components/PodcastRow";
import { Link } from "react-router-dom";

interface Podcast {
  imageSrc: string;
  episode: string;
  title: string;
  date: string;
  duration: string;
}

const Podcasts = () => {
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const snapshot = await getDocs(collection(db, "podcasts"));
        const data = snapshot.docs
          .map((doc) => doc.data() as Podcast)
          .sort((a, b) => Number(a.episode) - Number(b.episode));
        setPodcasts(data);
      } catch (error) {
        console.error("Error fetching podcasts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPodcasts();
  }, []);

  return (
    <div className="mx-auto">
      <Navbar />
      <Header header="PODCASTS" />

      <main className="px-4 sm:px-6">
        <section className="max-w-[1680px] mx-auto flex flex-col gap-6 mt-12 mb-24 border-t pt-8">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-[160px] w-full bg-gray-200 rounded animate-pulse"
                aria-hidden="true"
              />
            ))
          ) : podcasts.length ? (
            podcasts.map((podcast) => (
              <Link
                key={podcast.episode}
                to={`/podcasts/${podcast.episode}`}
                aria-label={`Open podcast episode ${podcast.episode}`}
                className="block"
              >
                <PodcastRow
                  imageSrc={podcast.imageSrc}
                  episode={podcast.episode}
                  title={podcast.title}
                  date={podcast.date}
                  duration={podcast.duration}
                />
              </Link>
            ))
          ) : (
            <p className="text-center text-gray-500">No podcasts available.</p>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Podcasts;
