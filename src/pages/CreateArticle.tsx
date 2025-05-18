import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { AuthorType } from "../data/types";
import { db } from "../data/firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { uploadToCloudinary } from "../utils/uploadToCloudinary";
import { ChooseAuthor } from "../components/articleCreation/ChooseAuthor";
import { CreateAuthorForm } from "../components/articleCreation/CreateAuthorForm";
import { ArticleForm } from "../components/articleCreation/ArticleFrom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClipLoader from "react-spinners/ClipLoader";

const labels = ["ART", "SCULPTURE", "STREET ART"];
const readTimes = ["5 min", "10 min", "15 min"];

const CreateArticle = () => {
  const navigate = useNavigate();

  const [photoAuthor, setPhotoAuthor] = useState<File | null>(null);
  const [photoArticle, setPhotoArticle] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const [authors, setAuthors] = useState<AuthorType[]>([]);
  const [step, setStep] = useState<"choose" | "new" | "article">("choose");
  const [selectedAuthor, setSelectedAuthor] = useState<string>("");
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
    readTime: "5 min",
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
      const snapshot = await getDocs(collection(db, "authors"));
      const data: AuthorType[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<AuthorType, "id">),
      }));
      setAuthors(data);
    };
    fetchAuthors();
  }, []);

  const validateAuthor = () => {
    const { name, job, bold_info, info } = newAuthor;
    return name && job && bold_info.length >= 3 && info.length >= 10;
  };

  const validateArticle = () => {
    const { title, description, bold_info1, bold_info2, info1, info2, label } =
      articleData;

    return (
      title.trim() !== "" &&
      description.trim() !== "" &&
      bold_info1.trim() !== "" &&
      bold_info2.trim() !== "" &&
      info1.trim() !== "" &&
      info2.trim() !== "" &&
      label.trim() !== ""
    );
  };

  const handlePhotoAuthorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhotoAuthor(e.target.files[0]);
    }
  };

  const handlePhotoArticleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhotoArticle(e.target.files[0]);
    }
  };

  const onContinue = () => {
    setArticleData((prev) => ({ ...prev, author: selectedAuthor }));
    setStep("article");
  };

  const goToNew = () => {
    setStep("new");
  };

  const goBack = () => {
    setStep("choose");
  };

  const handleCreateAuthor = async () => {
    if (!validateAuthor()) {
      toast.error("Please fill all required author fields.");
      return;
    }

    setLoading(true);
    try {
      let imagePublicId = "";
      if (photoAuthor) {
        imagePublicId = await uploadToCloudinary(photoAuthor);
      }

      imagePublicId =
        "https://res.cloudinary.com/dwcbm3x3w/image/upload/v1747504771/" +
        imagePublicId;

      await addDoc(collection(db, "authors"), {
        ...newAuthor,
        imageSrc: imagePublicId,
        id: authors.length + 1,
        city: "Lviv",
      });

      setSelectedAuthor(newAuthor.name);
      setStep("article");
      toast.success("Author created successfully.");
    } catch (error) {
      toast.error("Failed to create author.");
    } finally {
      setLoading(false);
    }
  };

  const handleFinish = async () => {
    if (!validateArticle()) {
      toast.error("Please fill in all required article fields.");
      return;
    }

    setLoading(true);
    try {
      let articleImage = "";
      if (photoArticle) {
        articleImage = await uploadToCloudinary(photoArticle);
      }

      articleImage =
        "https://res.cloudinary.com/dwcbm3x3w/image/upload/v1747504771/" +
        articleImage;

      await addDoc(collection(db, "articles"), {
        ...articleData,
        imageSrc: articleImage,
        id: Date.now(),
        author: selectedAuthor,
      });

      toast.success("Article submitted successfully.");
      navigate("/magazine");
    } catch (error) {
      toast.error("Failed to submit article.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto">
      <Navbar />

      <div className="mx-auto max-w-[1680px] mb-5 px-6 py-4 flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm font-bold uppercase hover:underline"
        >
          ← Go Back
        </button>
        <h1 className="text-lg font-black tracking-wider uppercase">
          New Article
        </h1>
      </div>

      <div className="flex flex-col items-center px-4 py-10 mb-20 bg-white">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-20">
          {step === "new" ? "Create Author" : "Create Article"}
        </h1>

        {loading ? (
          <div className="flex justify-center items-center h-96">
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
                handlePhotoAuthorChange={handlePhotoAuthorChange}
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
                handlePhotoArticleChange={handlePhotoArticleChange}
                labels={labels}
                readTimes={readTimes}
                handleFinish={handleFinish}
                goBack={goBack}
              />
            )}
          </>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default CreateArticle;
