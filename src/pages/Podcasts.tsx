import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PodcastLogo from "../assets/headers/Podcast.svg";

import { podcasts } from "../data/podcasts";
import PodcastRow from "../components/PodcastRow";
import { Link } from "react-router-dom";

const Podcasts = () => {
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
