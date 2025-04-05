import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PodcastLogo from "../assets/headers/Podcast.svg";

import { podcasts } from "../data/podcasts";
import PodcastRow from "../components/PodcastRow";

const Podcasts = () => {
  return (
    <div className="mx-auto">
      <Navbar />
      <Header header={PodcastLogo} />

      <div className="h-[100px]"></div>

      <div className="max-w-[1680px] mx-auto px-6 py-12 flex flex-col gap-6">
        {podcasts.map((podcast) => (
          <PodcastRow
            key={podcast.episode}
            imageSrc={podcast.imageSrc}
            episode={podcast.episode}
            title={podcast.title}
            date={podcast.date}
            duration={podcast.duration}
          />
        ))}
      </div>

      <div className="h-[100px]"></div>
      <Footer />
    </div>
  );
};

export default Podcasts;
