import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import frame from "../assets/frame.png";
import gif from "../assets/chill.gif";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="mx-auto">
      <Navbar />
      <div className="my-[100px] flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-xl mb-6">
          Sorry, the page you are looking for does not exist.
        </p>
        <div className="relative w-[333px] h-[340px] ">
          <img
            src={gif}
            alt="GIF"
            className="absolute top-[50px] left-[50px] w-[220px] h-[220px] object-cover rounded z-0"
          />

          <img
            src={frame}
            alt="Frame"
            className="w-full h-full object-contain z-10 relative"
          />
        </div>

        <Link
          to="/"
          className="inline-block px-6 py-2 bg-black text-white rounded hover:bg-zinc-800 transition"
        >
          Go back home
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
