import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";
import { sendArticleToAllUsers } from "../utils/sendArticleToAllUsers";
import emailjs from "emailjs-com";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ChooseAuthor } from "../components/articleCreation/ChooseAuthor";
import { CreateAuthorForm } from "../components/articleCreation/CreateAuthorForm";
import { ArticleForm } from "../components/articleCreation/ArticleFrom";
import { uploadToCloudinary } from "../utils/uploadToCloudinary";
import { db } from "../data/firebase";
import { AuthorType } from "../data/types";

import "react-toastify/dist/ReactToastify.css";

const labels = ["ART", "SCULPTURE", "STREET ART"];
const readTimes = ["5 min", "10 min", "15 min"];

const CreateArticle = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<"choose" | "new" | "article">("choose");

  const [authors, setAuthors] = useState<AuthorType[]>([]);
  const [selectedAuthor, setSelectedAuthor] = useState<string>("");

  const [photoAuthor, setPhotoAuthor] = useState<File | null>(null);
  const [photoArticle, setPhotoArticle] = useState<File | null>(null);

  const [newAuthor, setNewAuthor] = useState<Omit<AuthorType, "id">>({
    name: "",
    imageSrc: "",
    job: "",
    city: "",
    bold_info: "",
    info: "",
  });

  const [articleData, setArticleData] = useState({
    title: "",
    author: "",
    imageSrc: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
    readTime: readTimes[0],
    label: "",
    bold_info1: "",
    bold_info2: "",
    info1: "",
    info2: "",
    quote: "",
    quote_author: "",
  });

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const snapshot = await getDocs(collection(db, "authors"));
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<AuthorType, "id">),
        }));
        setAuthors(data);
      } catch (error) {
        toast.error("Failed to fetch authors.");
      }
    };
    fetchAuthors();
  }, []);

  const validateAuthor = () => {
    const { name, job, bold_info, info } = newAuthor;
    return (
      name.trim() &&
      job.trim() &&
      bold_info.trim().length >= 3 &&
      info.trim().length >= 10
    );
  };

  const validateArticle = () => {
    const { title, description, bold_info1, bold_info2, info1, info2, label } =
      articleData;
    return (
      title.trim() &&
      description.trim() &&
      bold_info1.trim() &&
      bold_info2.trim() &&
      info1.trim() &&
      info2.trim() &&
      label.trim()
    );
  };

  const handlePhotoChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<File | null>>
  ) => {
    if (e.target.files && e.target.files[0]) {
      setter(e.target.files[0]);
    }
  };

  const goToNew = () => setStep("new");
  const goBack = () => setStep("choose");
  const onContinue = () => {
    setArticleData((prev) => ({ ...prev, author: selectedAuthor }));
    setStep("article");
  };

  const handleCreateAuthor = async () => {
    if (!validateAuthor())
      return toast.error("Please complete all author fields.");

    setLoading(true);
    try {
      const imageId = photoAuthor ? await uploadToCloudinary(photoAuthor) : "";
      const imageUrl = imageId
        ? `https://res.cloudinary.com/dwcbm3x3w/image/upload/v1747504771/${imageId}`
        : "";

      await addDoc(collection(db, "authors"), {
        ...newAuthor,
        imageSrc: imageUrl,
        id: authors.length + 1,
        city: "Lviv",
      });

      setSelectedAuthor(newAuthor.name);
      setStep("article");
      toast.success("Author created successfully.");
    } catch {
      toast.error("Author creation failed.");
    } finally {
      setLoading(false);
    }
  };
  const handleFinish = async () => {
    emailjs.init("RV60k2-86zcYbljzp"); 
    if (!validateArticle())
      return toast.error("Please complete all article fields.");

    setLoading(true);
    try {
      const imageId = photoArticle
        ? await uploadToCloudinary(photoArticle)
        : "";
      const imageUrl = imageId
        ? `https://res.cloudinary.com/dwcbm3x3w/image/upload/v1747504771/${imageId}`
        : "";

      const articleId = Date.now().toString();

      await addDoc(collection(db, "articles"), {
        ...articleData,
        imageSrc: imageUrl,
        id: articleId,
        author: selectedAuthor,
        createdAt: new Date(),
      });
      console.log("Triggering sendArticleToAllUsers");

      await sendArticleToAllUsers({
        id: articleId,
        title: articleData.title,
        description: articleData.description,
      });

      toast.success("Article submitted and newsletter sent!");
      navigate("/magazine");
    } catch {
      toast.error("Article submission failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto">
      <Navbar />

      <header className="max-w-[1680px] mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="text-sm font-bold uppercase hover:underline"
        >
          ← Go Back
        </button>
        <h1 className="text-lg font-black tracking-wider uppercase">
          New Article
        </h1>
      </header>

      <main className="flex flex-col items-center px-4 py-10 mb-20 bg-white">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-12 text-center">
          {step === "new" ? "Create Author" : "Create Article"}
        </h1>

        {loading ? (
          <div className="flex justify-center items-center min-h-[300px]">
            <ClipLoader size={48} color="#000000" />
          </div>
        ) : (
          <>
            {step === "choose" && (
              <ChooseAuthor
                authors={authors}
                selectedAuthor={selectedAuthor}
                setSelectedAuthor={setSelectedAuthor}
                onContinue={onContinue}
                goToNew={goToNew}
              />
            )}
            {step === "new" && (
              <CreateAuthorForm
                photoAuthor={photoAuthor}
                handlePhotoAuthorChange={(e) =>
                  handlePhotoChange(e, setPhotoAuthor)
                }
                newAuthor={newAuthor}
                setNewAuthor={setNewAuthor}
                handleCreateAuthor={handleCreateAuthor}
                goBack={goBack}
              />
            )}
            {step === "article" && (
              <ArticleForm
                articleData={articleData}
                setArticleData={setArticleData}
                photoArticle={photoArticle}
                handlePhotoArticleChange={(e) =>
                  handlePhotoChange(e, setPhotoArticle)
                }
                labels={labels}
                readTimes={readTimes}
                handleFinish={handleFinish}
                goBack={goBack}
              />
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default CreateArticle;
