import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import bigim from "../assets/articles/art1.png";
import Insta from "../assets/ri_instagram-line.svg";
import YouTube from "../assets/ri_youtube-fill.svg";
import Twitter from "../assets/ri_twitter-fill.svg";
import author from "../assets/authors/auth1.png";
import onepodcast from "../assets/podcasts/podcast-1.png";

import { Link, useNavigate } from "react-router-dom";
import { podcasts } from "../data/podcasts";
import PodcastCard from "../components/PodcastCard";

const PodcastPost = () => {
  const navigate = useNavigate();
  return (
    <div className="mx-auto">
      <Navbar />

      <div className="max-w-[1680px] mx-auto flex flex-col gap-12 px-6">
        <div className=" px-6 py-4 flex items-center justify-between">
          {/* Go Back */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm font-bold uppercase hover:underline"
          >
            ← Go Back
          </button>

          {/* Title */}
          <h1 className="text-lg font-black tracking-wider uppercase">
            Podcast
          </h1>
        </div>

        <section className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="w-full max-w-sm mx-auto bg-white p-6 text-black text-sm space-y-6">
            {/* Image block with overlay */}
            <div className="relative">
              <img
                src={onepodcast}
                alt={`Episode 1`}
                className="w-full object-cover"
              />

              {/* Overlay text */}
              <div className="absolute top-4 left-4 text-white font-bold leading-tight space-y-1">
                <div className="text-2xl sm:text-3xl">FYRRE</div>
                <div className="text-sm sm:text-base tracking-wider">
                  PODCAST
                </div>
              </div>

              <div className="absolute bottom-4 left-4 text-white font-bold text-lg sm:text-xl">
                EP 05
              </div>

              {/* Optional corner arrow — add if needed */}
              {/* <div className="absolute bottom-4 right-4">
          <img src={Arrow} alt="Arrow" className="w-5 h-5" />
        </div> */}
            </div>

            {/* Listen on */}
            <div>
              <h4 className="font-semibold mb-2">Listen On</h4>
              <div className="flex items-center gap-4 text-black">
                <a href="#">
                  <i>
                    <img src={Insta} className="fab fa-instagram" alt="" />
                  </i>
                </a>
                <a href="#">
                  <img src={YouTube} className="fab fa-youtube" alt="" />
                </a>
                <a href="#">
                  <img src={Twitter} className="fab fa-twitter" alt="" />
                </a>
              </div>
            </div>

            <hr className="border-black" />

            {/* Meta info */}
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="font-semibold">Date</span>
                <span>16.March 2022</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Duration</span>
                <span>45 Min</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold">Share</span>
                <div className="flex items-center gap-4">
                  <a href="#">
                    <i>
                      <img src={Insta} className="fab fa-instagram" alt="" />
                    </i>
                  </a>
                  <a href="#">
                    <img src={YouTube} className="fab fa-youtube" alt="" />
                  </a>
                  <a href="#">
                    <img src={Twitter} className="fab fa-twitter" alt="" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <article className="md:col-span-3 text-base text-gray-800 space-y-6 leading-relaxed">
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
              semper auctor neque vitae tempus quam pellentesque. Sollicitudin
              ac orci phasellus egestas tellus rutrum tellus pellentesque. Sed
              egestas egestas fringilla phasellus faucibus scelerisque eleifend
              donec pretium. Sit amet porttitor eget dolor morbi non arcu risus.
              Justo eget magna fermentum iaculis eu non diam phasellus. Sit amet
              luctus venenatis lectus magna fringilla. Neque vitae tempus quam
              pellentesque nec nam.
            </p>

            <p>
              Porttitor rhoncus dolor purus non enim praesent elementum. Eget
              dolor morbi non arcu risus quis varius. Posuere ac ut consequat
              semper viverra nam libero. In ornare quam viverra orci sagittis
              eu. Tristique risus nec feugiat in fermentum posuere urna nec.
              Tempus quam pellentesque nec nam aliquam sem et. Convallis a cras
              semper auctor neque vitae tempus quam pellentesque. Sollicitudin
              ac orci phasellus egestas tellus rutrum tellus pellentesque. Sed
              egestas egestas fringilla phasellus faucibus scelerisque eleifend
              donec pretium. Sit amet porttitor eget dolor morbi non arcu risus.
              Justo eget magna fermentum iaculis eu non diam phasellus. Sit amet
              luctus venenatis lectus magna fringilla. Neque vitae tempus quam
              pellentesque nec nam.
            </p>

            <blockquote className="border-l-4 border-black pl-6 py-4 text-xl font-semibold italic text-gray-900">
              “The greatest glory in living lies not in never falling, but in
              rising every time we fall.”
              <div className="mt-2 text-sm not-italic text-gray-600">
                – Nelson Mandela
              </div>
            </blockquote>

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
              semper auctor neque vitae tempus quam pellentesque. Sollicitudin
              ac orci phasellus egestas tellus rutrum tellus pellentesque. Sed
              egestas egestas fringilla phasellus faucibus scelerisque eleifend
              donec pretium. Sit amet porttitor eget dolor morbi non arcu risus.
              Justo eget magna fermentum iaculis eu non diam phasellus. Sit amet
              luctus venenatis lectus magna fringilla. Neque vitae tempus quam
              pellentesque nec nam.
            </p>

            <p>
              Porttitor rhoncus dolor purus non enim praesent elementum. Eget
              dolor morbi non arcu risus quis varius. Posuere ac ut consequat
              semper viverra nam libero. In ornare quam viverra orci sagittis
              eu. Tristique risus nec feugiat in fermentum posuere urna nec.
              Tempus quam pellentesque nec nam aliquam sem et. Convallis a cras
              semper auctor neque vitae tempus quam pellentesque. Sollicitudin
              ac orci phasellus egestas tellus rutrum tellus pellentesque. Sed
              egestas egestas fringilla phasellus faucibus scelerisque eleifend
              donec pretium. Sit amet porttitor eget dolor morbi non arcu risus.
              Justo eget magna fermentum iaculis eu non diam phasellus. Sit amet
              luctus venenatis lectus magna fringilla. Neque vitae tempus quam
              pellentesque nec nam.
            </p>
          </article>
        </section>

        <div className="border-t border-black w-full px-6 py-8 flex items-center justify-between">
          <h2 className="text-4xl font-black uppercase tracking-tight">
            Latest episodes
          </h2>
          <Link
            to="/"
            className="flex items-center text-xs font-semibold uppercase gap-1 hover:translate-x-1 transition"
          >
            SEE ALL →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6 max-w-[1680px] mx-auto">
          {podcasts.map((podcast, index) => (
            <PodcastCard key={index} {...podcast} />
          ))}
        </div>
      </div>

      <div className="h-[100px]"></div>
      <Footer />
    </div>
  );
};

export default PodcastPost;
