import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Article from "../components/Article";
import PodcastSectionHeader from "../components/PodcastSectionHeader";
import PodcastCard from "../components/PodcastCard";
import AuthorCard from "../components/AuthorCard";
import AuthorsSectionHeader from "../components/AuthorsSectionHeader";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import ArtLogo from "../assets/headers/Art.svg";

import { articleImages } from "../data/articles";
import { podcasts } from "../data/podcasts";
import { authors } from "../data/authors";
import Newsline from "../components/Newsline";

const Frontpage = () => {
  return (
    <div className="mx-auto">
      <Navbar />
      <Header header={ArtLogo} />
      <Newsline />
      <Hero />

      <div className="max-w-[1680px] mx-auto flex flex-col lg:flex-row gap-12 px-6">
        {/* Статті */}
        <div className="flex-1">
          {articleImages.map((image, index) => (
            <Article
              key={index}
              imageSrc={image}
              title="Hope dies last"
              description="Lorem ipsum dolor sit amet..."
              author="Jakob Gronberg"
              date="16. March 2022"
              readTime="1 Min"
              label="ART"
              slug="some"
            />
          ))}
          <div className="flex justify-start px-6 mt-6">
            <a
              href="/articles"
              className="group inline-flex items-center gap-2 text-base font-semibold uppercase text-black transition-colors duration-300 hover:text-neutral-700"
            >
              All Articles
              <span className="inline-block text-xl transform transition-transform duration-300 group-hover:translate-x-1.5">
                →
              </span>
            </a>
          </div>
        </div>

        {/* Sidebar */}
        <Sidebar />
      </div>
      <div className="h-[100px]"></div>
      <PodcastSectionHeader />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6 max-w-[1680px] mx-auto">
        {podcasts.map((podcast, index) => (
          <PodcastCard key={index} {...podcast} />
        ))}
      </div>

      <div className="h-[100px]"></div>
      <AuthorsSectionHeader />

      <div className="grid grid-cols-1 md:grid-cols-2 border divide-y md:divide-y-0 md:divide-x max-w-[1680px] mx-auto">
        {authors.map((author, index) => (
          <div key={index} className="divide-y">
            <AuthorCard {...author} />
          </div>
        ))}
      </div>

      <div className="h-[100px]"></div>
      <Footer />
    </div>
  );
};

export default Frontpage;
