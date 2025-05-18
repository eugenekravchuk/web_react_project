import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../data/firebase";

import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AuthorRow from "../components/AuthorRow";

interface Author {
  name: string;
  imageSrc: string;
  job: string;
  city: string;
  id: string;
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
      } catch (error) {
        console.error("Error fetching authors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthors();
  }, []);

  return (
    <div className="mx-auto">
      <Navbar />
      <Header header="AUTHORS" />

      <main className="px-4 sm:px-6 max-w-[1680px] mx-auto py-16 space-y-8">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-[140px] bg-gray-200 animate-pulse border-b"
              aria-hidden="true"
            />
          ))
        ) : authors.length > 0 ? (
          authors.map((author) => (
            <div key={author.id} className="divide-y">
              <AuthorRow {...author} />
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No authors found.</p>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Authors;
