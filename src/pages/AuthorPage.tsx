import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../data/firebase";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import Insta from "../assets/ri_instagram-line.svg";
import YouTube from "../assets/ri_youtube-fill.svg";
import Twitter from "../assets/ri_twitter-fill.svg";

interface Author {
  name: string;
  id: string;
  city: string;
  job: string;
  description: string;
  imageSrc: string;
}

interface Article {
  title: string;
  slug: string;
  date: string;
  readTime: string;
  imageSrc: string;
}

const AuthorPage = () => {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();

  const [author, setAuthor] = useState<Author | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const authorQuery = query(collection(db, "authors"), where("id", "==", Number(slug)));
        const authorSnapshot = await getDocs(authorQuery);
        if (!authorSnapshot.empty) {
          setAuthor(authorSnapshot.docs[0].data() as Author);
        }
      } catch (error) {
        console.error("Error fetching author:", error);
      }
    };
  
    fetchAuthor();
  }, [slug]);
  
  useEffect(() => {
    const fetchArticles = async () => {
      if (!author) return;
  
      try {
        const articlesQuery = query(collection(db, "articles"), where("author", "==", author.name));
        const articleSnapshot = await getDocs(articlesQuery);
        const articleList = articleSnapshot.docs.map((doc) => doc.data() as Article);
        setArticles(articleList);
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchArticles();
  }, [author]);
  

  if (loading) return <div className="text-center py-20 text-xl">Loading author...</div>;
  if (!author) return <div className="text-center py-20 text-xl">Author not found</div>;

  return (
    <div className="mx-auto">
      <Navbar />

      <div className="max-w-[1680px] mx-auto flex flex-col gap-12 px-6">
        <div className=" px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm font-bold uppercase hover:underline"
          >
            ← Go Back
          </button>

          <h1 className="text-lg font-black tracking-wider uppercase">Authors</h1>
        </div>
      </div>

      <section className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
        <div className="flex flex-col items-center md:items-start">
          <img
            src={author.imageSrc}
            alt={author.name}
            className="w-64 h-64 object-cover rounded-full mb-8"
          />

          <div className="w-full flex items-center justify-between border-t pt-4">
            <p className="font-bold text-sm tracking-wide mb-2">FOLLOW</p>
            <div className="flex items-center gap-4 text-zinc-700">
              <a href=""><img src={Insta} alt="Instagram" /></a>
              <a href=""><img src={YouTube} alt="YouTube" /></a>
              <a href=""><img src={Twitter} alt="Twitter" /></a>
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          <h1 className="text-5xl font-extrabold leading-none mb-6">{author.name}</h1>
          <p className="text-lg font-bold text-zinc-800 mb-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Egestas dui id ornare arcu odio ut sem. Cras ornare arcu dui vivamus arcu felis bibendum ut. Porttitor leo a diam.</p>
          <p className="text-lg font-regular text-zinc-800 mb-6">Porttitor rhoncus dolor purus non enim praesent elementum. Eget dolor morbi non arcu risus quis varius. Posuere ac ut consequat semper viverra nam libero. In ornare quam viverra orci sagittis eu. Tristique risus nec feugiat in fermentum posuere urna nec. Tempus quam pellentesque nec nam aliquam sem et. Convallis a cras semper auctor neque vitae tempus quam pellentesque. Sollicitudin ac orci phasellus egestas tellus rutrum tellus pellentesque. Sed egestas egestas fringilla phasellus faucibus scelerisque eleifend donec pretium. Sit amet porttitor eget dolor morbi non arcu risus. Justo eget magna fermentum iaculis eu non diam phasellus. Sit amet luctus venenatis lectus magna fringilla. Neque vitae tempus quam pellentesque nec nam.</p>

          <p className="text-sm text-zinc-500 leading-relaxed">{author.description}</p>
        </div>
      </section>

      <div className="h-[100px]"></div>

      <section className="max-w-[1680px] mx-auto px-6 py-12 border-t">
        <h2 className="text-3xl md:text-4xl font-bold mb-10">
          Articles by {author.name}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 border-black border-opacity-20">
          {articles.map((article, idx) => {
            // const noBottom = idx === 0 || idx === 1;
            // const noRight = idx === 0 || idx === 2;

            return (
              <Link
                to={`/articles/${article.slug}`}
                key={idx}
                className={`
                flex items-center gap-6 p-6 border border-black border-opacity-20 transition group
   
              `}
              >
                <img
                  src={article.imageSrc}
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
