import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { AuthorType } from "../data/types";
import { db } from "../data/firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";

const labels = ["ART", "SCULPTURE", "STREET ART"];

const CreateArticle = () => {
  const navigate = useNavigate();

  const [photo, setPhoto] = useState<File | null>(null);
  const [selectedLabel, setSelectedLabel] = useState<string>("");
  const [authors, setAuthors] = useState<AuthorType[]>([]);
  const [step, setStep] = useState<"choose" | "new" | "article">("choose");
  const [selectedAuthorId, setSelectedAuthorId] = useState<string>("");
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
    brief: "",
    quote: "",
    quoteAuthor: "",
    content: "",
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

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  };

  const handleCreateAuthor = async () => {
    const docRef = await addDoc(collection(db, "authors"), newAuthor);
    setSelectedAuthorId(docRef.id);
    setStep("article");
  };

  const goBack = () => {
    setStep("choose");
  };

  const handleFinish = () => {
    console.log("Submitted article", {
      ...articleData,
      label: selectedLabel,
      authorId: selectedAuthorId,
    });
    alert("Article submitted!");
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
              value={selectedAuthorId}
              onChange={(e) => setSelectedAuthorId(e.target.value)}
            >
              <option value="">-- Select an author --</option>
              {authors.map((author) => (
                <option key={author.id} value={author.id}>
                  {author.name} ({author.job})
                </option>
              ))}
            </select>

            <button
              className="px-6 py-3 bg-black text-white rounded disabled:opacity-50"
              onClick={() => selectedAuthorId && setStep("article")}
              disabled={!selectedAuthorId}
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
              {photo ? (
                <img
                  src={URL.createObjectURL(photo)}
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
                onChange={handlePhotoChange}
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
                  setNewAuthor((prev) => ({ ...prev, skills: e.target.value }))
                }
              />
              <textarea
                placeholder="About (4+ sentences)"
                className="border px-4 py-2 rounded resize-none"
                rows={4}
                onChange={(e) =>
                  setNewAuthor((prev) => ({ ...prev, about: e.target.value }))
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
          <div className="w-full max-w-xl flex flex-col gap-4">
            <label
              htmlFor="article-photo"
              className="w-full h-60 border-2 border-black border-dashed flex items-center justify-center cursor-pointer text-center"
            >
              {photo ? (
                <img
                  src={URL.createObjectURL(photo)}
                  alt="Selected"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div>
                  <p className="text-2xl font-medium">+</p>
                  <p className="text-lg">Add photo</p>
                </div>
              )}
              <input
                type="file"
                id="article-photo"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoChange}
              />
            </label>

            <input
              type="text"
              placeholder="Title"
              className="border border-black px-4 py-2 rounded"
              value={articleData.title}
              onChange={(e) =>
                setArticleData({ ...articleData, title: e.target.value })
              }
            />

            <select
              className="border border-black px-4 py-2 rounded"
              value={selectedLabel}
              onChange={(e) => setSelectedLabel(e.target.value)}
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

            <input
              type="text"
              placeholder="Brief description"
              className="border border-black px-4 py-2 rounded"
              value={articleData.brief}
              onChange={(e) =>
                setArticleData({ ...articleData, brief: e.target.value })
              }
            />

            <input
              type="text"
              placeholder="Quote"
              className="border border-black px-4 py-2 rounded"
              value={articleData.quote}
              onChange={(e) =>
                setArticleData({ ...articleData, quote: e.target.value })
              }
            />

            <input
              type="text"
              placeholder="Quote author"
              className="border border-black px-4 py-2 rounded"
              value={articleData.quoteAuthor}
              onChange={(e) =>
                setArticleData({
                  ...articleData,
                  quoteAuthor: e.target.value,
                })
              }
            />

            <textarea
              placeholder="Long Text"
              rows={5}
              className="border border-black px-4 py-2 rounded resize-none"
              value={articleData.content}
              onChange={(e) =>
                setArticleData({ ...articleData, content: e.target.value })
              }
            />

            <div className="flex gap-4 mt-4 self-center">
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
