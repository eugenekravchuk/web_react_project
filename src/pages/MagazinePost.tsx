import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import bigim from "../assets/articles/art1.png";
import Insta from "../assets/ri_instagram-line.svg";
import YouTube from "../assets/ri_youtube-fill.svg";
import Twitter from "../assets/ri_twitter-fill.svg";
import author from "../assets/authors/auth1.png";

import { articleImages } from "../data/articles";

import { Link, useNavigate } from "react-router-dom";
import ArticleCard from "../components/ArticleCard";

const MagazinePost = () => {
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
            Magazine
          </h1>
        </div>

        <section className="w-full py-12">
          <div className="max-w-6xl grid grid-cols-1 md:grid-cols-2  items-center">
            {/* Left: Title */}
            <div>
              <h1 className="text-6xl md:text-7xl font-black leading-tight tracking-tight">
                HOPE
                <br />
                DIES LAST
              </h1>
            </div>

            {/* Right: Description */}
            <div className="text-gray-800 text-base leading-relaxed">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Egestas dui id ornare arcu odio ut sem. Cras ornare arcu dui
                vivamus arcu felis bibendum ut. Porttitor leo a diam.
              </p>
            </div>
          </div>
        </section>

        <div className="flex items-center justify-between flex-wrap gap-4 py-4 px-6">
          {/* Left: Meta Info */}
          <div className="flex flex-wrap gap-x-6 text-sm text-black">
            <span>
              <strong className="mr-1">Text</strong> Jakob Gronberg
            </span>
            <span>
              <strong className="mr-1">Date</strong> 16. March 2022
            </span>
            <span>
              <strong className="mr-1">Read</strong> 2 Min
            </span>
          </div>

          {/* Right: Label */}
          <div>
            <span className="text-xs border border-black px-4 py-1 rounded-full font-medium whitespace-nowrap">
              LABEL
            </span>
          </div>
        </div>

        <div className="w-full">
          <img src={bigim} className="w-full h-[800px] object-cover" />
        </div>

        <section className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Left Sidebar */}
          <aside className="w-full max-w-xs p-6  rounded-md">
            {/* Image + Name */}
            <div className="flex flex-col items-center text-center">
              <img
                src={author}
                className="w-20 h-20 rounded-full object-cover mb-4"
              />
              <h2 className="text-3xl font-bold">Jakob</h2>
              <h2 className="text-3xl font-bold">Gronberg</h2>
            </div>

            {/* Divider */}
            <hr className="my-6 border-black" />

            {/* Info */}
            <div className="text-sm space-y-6">
              <div className="flex justify-between">
                <span className="font-semibold">Date</span>
                <span>16 March 2022</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Read</span>
                <span>2 min</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold">Share</span>
                <div className="flex gap-4">
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
          </aside>

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
            Latest posts
          </h2>
          <Link
            to="/"
            className="flex items-center text-xs font-semibold uppercase gap-1 hover:translate-x-1 transition"
          >
            SEE ALL →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {articleImages.slice(0, 3).map((image, index) => (
            <ArticleCard
              key={index}
              imageSrc={image}
              title="Hope dies last"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed finibus ultrices metus, vitae laoreet turpis tristique eu. In in quam in sem aliquam sagittis. Aliquam facilisis erat nibh, nec facilisis ex pellentesque quis. Nam semper ac nisl iaculis sagittis. Suspendisse malesuada, dolor eget rutrum consectetur, tellus eros pulvinar nulla, eget ullamcorper urna tellus nec nisi. In ut justo nibh. Fusce aliquet, ex condimentum molestie dapibus,"
              author="Jakob Gronberg"
              date="16 March 2022"
              readTime="1 Min"
              label="ART"
              slug="some"
            />
          ))}
        </div>
      </div>

      <div className="h-[100px]"></div>
      <Footer />
    </div>
  );
};

export default MagazinePost;
