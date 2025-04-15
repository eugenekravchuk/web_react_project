import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

import Insta from "../assets/ri_instagram-line.svg";
import YouTube from "../assets/ri_youtube-fill.svg";
import Twitter from "../assets/ri_twitter-fill.svg";
import author from "../assets/authors/auth1.png";

import { useNavigate } from "react-router-dom";
import { articleImages } from "../data/articles";

const articles = [
  {
    title: "The best art museums",
    date: "16. March 2022",
    readTime: "10 Min",
    image: articleImages[0],
    slug: 'article1'
  },
  {
    title: "An indestructible hope",
    date: "16. March 2022",
    readTime: "10 Min",
    image: articleImages[1],
    slug: 'article2'
  },
  {
    title: "The chains of our lives",
    date: "16. March 2022",
    readTime: "10 Min",
    image: articleImages[2],
    slug: 'article3'
  },
  {
    title: "Keep on smiling",
    date: "16. March 2022",
    readTime: "10 Min",
    image: articleImages[3],
    slug: 'article4'
  },
];

const AuthorPage = () => {
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
            Authors
          </h1>
        </div>
      </div>

      <section className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
        {/* Left: Image & Social */}
        <div className="flex flex-col items-center md:items-start">
          <img
            src={author}
            alt="Louise Jensen"
            className="w-64 h-64 object-cover rounded-full mb-8"
          />

          <div className="w-full flex items-center justify-between border-t pt-4">
            <p className="font-bold text-sm tracking-wide mb-2">FOLLOW</p>
            <div className="flex items-center gap-4 text-zinc-700">
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

        {/* Right: Name + Content */}
        <div className="md:col-span-2">
          <h1 className="text-5xl font-extrabold leading-none mb-6">
            LOUISE <br /> JENSEN
          </h1>

          <p className="text-lg font-medium text-zinc-800 mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Egestas
            dui id ornare arcu odio ut sem. Cras ornare arcu dui vivamus arcu
            felis bibendum ut. Porttitor leo a diam.
          </p>

          <p className="text-sm text-zinc-500 leading-relaxed">
            Porttitor rhoncus dolor purus non enim praesent elementum. Eget
            dolor morbi non arcu risus quis varius. Posuere ac ut consequat
            semper viverra nam libero. In ornare quam viverra orci sagittis eu.
            Tristique risus nec feugiat in fermentum posuere urna nec. Tempus
            quam pellentesque nec nam aliquam sem et. Convallis a cras semper
            auctor neque vitae tempus quam pellentesque. Sollicitudin ac orci
            phasellus egestas tellus rutrum tellus pellentesque. Sed egestas
            egestas fringilla phasellus faucibus scelerisque eleifend donec
            pretium. Sit amet porttitor eget dolor morbi non arcu risus. Justo
            eget magna fermentum iaculis eu non diam phasellus. Sit amet luctus
            venenatis lectus magna fringilla. Neque vitae tempus quam
            pellentesque nec nam.
          </p>
        </div>
      </section>

      <div className="h-[100px]"></div>

      <section className="max-w-[1680px] mx-auto px-6 py-12 border-t">
        <h2 className="text-3xl md:text-4xl font-bold mb-10">
          Articles by Louise Jensen
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 border-black border-opacity-20">
          {articles.map((article, idx) => {
            const noBottom = idx === 0 || idx === 1;
            const noRight = idx === 0 || idx === 2;

            return (
              <Link
                to={`/articles/${article.slug}`}
                key={idx}
                className={`
            flex items-center gap-6 p-6 border border-black border-opacity-20 transition group
            ${noRight ? "border-r-0" : ""}
            ${noBottom ? "border-b-0" : ""}
          `}
              >
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-24 h-24 object-cover"
                />
                <div>
                  <h3 className="font-bold text-lg mb-1 transition group-hover:underline">
                    {article.title}
                  </h3>
                  <div className="text-sm text-zinc-600">
                    <span className="font-semibold mr-1">Date</span>
                    {article.date}
                    <span className="mx-3">|</span>
                    <span className="font-semibold mr-1">Read</span>
                    {article.readTime}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AuthorPage;
