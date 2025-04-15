import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../data/firebase";

import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AuthorRow from "../components/AuthorRow";
import AuthorsLogo from "../assets/headers/Authors.svg";

interface Author {
  name: string;
  imageSrc: string;
  job: string;
  city: string;
  id: string
}

const Authors = () => {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const snapshot = await getDocs(collection(db, "authors"));
        const authorsData = snapshot.docs.map((doc) => doc.data() as Author);
        setAuthors(authorsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching authors:", error);
      }
    };

    fetchAuthors();
  }, []);

  if (loading) {
    return <div className="text-center py-20 text-xl">Loading authors...</div>;
  }

  return (
    <div className="mx-auto">
      <Navbar />
      <Header header={AuthorsLogo} />

      <div className="h-[100px]"></div>

      <div className="grid grid-cols-1 max-w-[1680px] mx-auto">
        {authors.map((author, index) => (
          <div key={index} className="divide-y">
            <AuthorRow {...author} />
          </div>
        ))}
      </div>

      <div className="h-[100px]"></div>
      <Footer />
    </div>
  );
};

export default Authors;
