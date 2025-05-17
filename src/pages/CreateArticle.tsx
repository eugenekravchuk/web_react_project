import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { AuthorType } from "../data/types";
import { db } from "../data/firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { uploadToCloudinary } from "../utils/uploadToCloudinary";

const labels = ["ART", "SCULPTURE", "STREET ART"];
const readTimes = ["5 min", "10 min", "15 min"];

const CreateArticle = () => {
  const navigate = useNavigate();

  const [photoAuthor, setPhotoAuthor] = useState<File | null>(null);
  const [photoArticle, setPhotoArticle] = useState<File | null>(null);

  const [selectedLabel, setSelectedLabel] = useState<string>("");
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
    console.log(name);
    console.log(name && job && bold_info.length >= 3 && info.length >= 10);
    console.log(name && job && bold_info.length >= 3 && info.length >= 10);
    console.log(name && job && bold_info.length >= 3 && info.length >= 10);
    return name && job && bold_info.length >= 3 && info.length >= 10;
  };

  const validateArticle = () => {
    const {
      title,
      description,
      bold_info1,
      bold_info2,
      info1,
      info2,
      label,
      author,
    } = articleData;

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

  const handleCreateAuthor = async () => {
    if (!validateAuthor()) {
      alert("Please fill all required author fields.");
      return;
    }

    let imagePublicId = "";
    if (photoAuthor) {
      imagePublicId = await uploadToCloudinary(photoAuthor);
    }

    imagePublicId =
      "https://res.cloudinary.com/dwcbm3x3w/image/upload/v1747504771/" +
      imagePublicId;

    const docRef = await addDoc(collection(db, "authors"), {
      ...newAuthor,
      imageSrc: imagePublicId,
      id: authors.length + 1,
      city: "Lviv",
    });

    setSelectedAuthor(newAuthor.name);
    setStep("article");
  };

  const goBack = () => {
    setStep("choose");
  };

  const handleFinish = async () => {
    if (!validateArticle()) {
      alert("Please fill in all required article fields.");
      return;
    }

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

    alert("Article submitted!");
    navigate("/magazine");
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

      <div className="min-h-screen flex flex-col items-center px-4 py-10 bg-white">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-20">
          Create Article
        </h1>
        {step === "choose" && (
          <div className="flex flex-col gap-4 w-full max-w-xl">
            <label className="text-lg font-semibold">
              Choose existing author
            </label>
            <select
              className="border border-black px-4 py-2 rounded"
              value={selectedAuthor}
              onChange={(e) => setSelectedAuthor(e.target.value)}
            >
              <option value="">-- Select an author --</option>
              {authors.map((author) => (
                <option key={author.id} value={author.name}>
                  {author.name} ({author.job})
                </option>
              ))}
            </select>

            <button
              className="px-6 py-3 bg-black text-white rounded disabled:opacity-50"
              onClick={() => selectedAuthor && setStep("article")}
              disabled={!selectedAuthor}
            >
              Continue with Selected Author
            </button>

            <p className="text-center my-4">or</p>

            <button
              className="px-6 py-2 border border-black rounded"
              onClick={() => setStep("new")}
            >
              Create new author
            </button>
          </div>
        )}
        {step === "new" && (
          <div className="flex flex-col md:flex-row gap-10 items-start w-full max-w-4xl">
            <label
              htmlFor="photo-upload"
              className="w-64 h-80 border-2 border-black border-dashed flex items-center justify-center cursor-pointer text-center"
            >
              {photoAuthor ? (
                <img
                  src={URL.createObjectURL(photoAuthor)}
                  alt="Selected"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div>
                  <p className="text-xl font-medium">+</p>
                  <p className="text-lg">Add photo</p>
                </div>
              )}
              <input
                type="file"
                id="photo-upload"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoAuthorChange}
              />
            </label>

            <div className="flex flex-col gap-4 w-full flex-1">
              <input
                placeholder="Name Surname"
                className="border px-4 py-2 rounded"
                onChange={(e) =>
                  setNewAuthor((prev) => ({ ...prev, name: e.target.value }))
                }
              />
              <input
                placeholder="Job (e.g. artist)"
                className="border px-4 py-2 rounded"
                onChange={(e) =>
                  setNewAuthor((prev) => ({ ...prev, job: e.target.value }))
                }
              />
              <textarea
                placeholder="Best skills (3-4 sentences)"
                className="border px-4 py-2 rounded resize-none"
                rows={3}
                onChange={(e) =>
                  setNewAuthor((prev) => ({
                    ...prev,
                    bold_info: e.target.value,
                  }))
                }
              />
              <textarea
                placeholder="About (4+ sentences)"
                className="border px-4 py-2 rounded resize-none"
                rows={4}
                onChange={(e) =>
                  setNewAuthor((prev) => ({ ...prev, info: e.target.value }))
                }
              />

              <div className="flex gap-4 mt-4">
                <button
                  className="px-6 py-2 border border-black rounded"
                  onClick={goBack}
                >
                  Back
                </button>
                <button
                  className="bg-black text-white px-6 py-2 rounded font-semibold"
                  onClick={handleCreateAuthor}
                >
                  Save and Continue
                </button>
              </div>
            </div>
          </div>
        )}

        {step === "article" && (
          <div className="space-y-6 max-w-4xl">
            <label
              htmlFor="article-photo"
              className="w-full h-60 border-2 border-black border-dashed flex items-center justify-center cursor-pointer text-center"
            >
              {photoArticle ? (
                <img
                  src={URL.createObjectURL(photoArticle)}
                  alt="Selected"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div>
                  <p className="text-2xl font-medium">+</p>
                  <p className="text-lg">Add article photo</p>
                </div>
              )}
              <input
                type="file"
                id="article-photo"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoArticleChange}
              />
            </label>

            <input
              type="text"
              placeholder="Title"
              className="w-full border px-4 py-2 rounded"
              value={articleData.title}
              onChange={(e) =>
                setArticleData({ ...articleData, title: e.target.value })
              }
            />

            <input
              type="text"
              placeholder="Description"
              className="w-full border px-4 py-2 rounded"
              value={articleData.description}
              onChange={(e) =>
                setArticleData({ ...articleData, description: e.target.value })
              }
            />

            <select
              className="w-full border px-4 py-2 rounded"
              value={articleData.readTime}
              onChange={(e) =>
                setArticleData({ ...articleData, readTime: e.target.value })
              }
            >
              {readTimes.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>

            <select
              className="w-full border px-4 py-2 rounded"
              value={articleData.label}
              onChange={(e) =>
                setArticleData({ ...articleData, label: e.target.value })
              }
            >
              <option value="" disabled>
                Label
              </option>
              {labels.map((label) => (
                <option key={label} value={label}>
                  {label}
                </option>
              ))}
            </select>

            <textarea
              placeholder="Bold Info 1"
              className="w-full border px-4 py-2 rounded"
              value={articleData.bold_info1}
              onChange={(e) =>
                setArticleData({ ...articleData, bold_info1: e.target.value })
              }
            />

            <textarea
              placeholder="Info 1"
              className="w-full border px-4 py-2 rounded"
              value={articleData.info1}
              onChange={(e) =>
                setArticleData({ ...articleData, info1: e.target.value })
              }
            />

            <textarea
              placeholder="Bold Info 2"
              className="w-full border px-4 py-2 rounded"
              value={articleData.bold_info2}
              onChange={(e) =>
                setArticleData({ ...articleData, bold_info2: e.target.value })
              }
            />

            <textarea
              placeholder="Info 2"
              className="w-full border px-4 py-2 rounded"
              value={articleData.info2}
              onChange={(e) =>
                setArticleData({ ...articleData, info2: e.target.value })
              }
            />

            <input
              type="text"
              placeholder="Quote"
              className="w-full border px-4 py-2 rounded"
              value={articleData.quote}
              onChange={(e) =>
                setArticleData({ ...articleData, quote: e.target.value })
              }
            />

            <input
              type="text"
              placeholder="Quote Author"
              className="w-full border px-4 py-2 rounded"
              value={articleData.quote_author}
              onChange={(e) =>
                setArticleData({ ...articleData, quote_author: e.target.value })
              }
            />

            <div className="flex gap-4 justify-center">
              <button
                className="px-6 py-2 border border-black rounded"
                onClick={goBack}
              >
                Back
              </button>
              <button
                className="bg-black text-white px-6 py-2 rounded font-semibold"
                onClick={handleFinish}
              >
                Finish
              </button>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default CreateArticle;
