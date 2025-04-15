import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../data/firebase";

import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PodcastLogo from "../assets/headers/Podcast.svg";
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
        const data = snapshot.docs.map((doc) => doc.data() as Podcast);
        setPodcasts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching podcasts:", error);
      }
    };

    fetchPodcasts();
  }, []);

  if (loading) {
    return <div className="text-center py-20 text-xl">Loading podcasts...</div>;
  }

  return (
    <div className="mx-auto">
      <Navbar />
      <Header header={PodcastLogo} />

      <div className="max-w-[1680px] mx-auto px-6 py-12 flex flex-col gap-6 mb-40 mt-14">
        {podcasts.map((podcast) => (
          <Link
            key={podcast.episode}
            to={`/podcasts/${podcast.episode}`}
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
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default Podcasts;
