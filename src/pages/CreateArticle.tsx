import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const labels = ["ART", "SCULPTURE", "STREET ART"];

const CreateArticle = () => {
  const navigate = useNavigate();
  const [photo, setPhoto] = useState<File | null>(null);
  const [selectedLabel, setSelectedLabel] = useState<string>("");

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  };

  return (
    <div className="mx-auto">
      <Navbar />

      <div className="mx-auto max-w-[1680px] mb-10 px-6 py-4 flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm font-bold uppercase hover:underline"
        >
          ← Go Back
        </button>
        <h1 className="text-lg font-black tracking-wider uppercase">
          New Author
        </h1>
      </div>

      <div className="min-h-screen flex flex-col items-center px-4 py-10 bg-white">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-10">
          Create Article
        </h1>

        <div className="w-full max-w-xl flex flex-col gap-4">
          {/* Photo Upload */}
          <label
            htmlFor="photo-upload"
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
              id="photo-upload"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoChange}
            />
          </label>

          {/* Form Inputs */}
          <input
            type="text"
            placeholder="Title"
            className="border border-black px-4 py-2 rounded"
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
          />

          <input
            type="text"
            placeholder="Quote"
            className="border border-black px-4 py-2 rounded"
          />

          <input
            type="text"
            placeholder="Quote author"
            className="border border-black px-4 py-2 rounded"
          />

          <textarea
            placeholder="Long Text"
            rows={5}
            className="border border-black px-4 py-2 rounded resize-none"
          />

          <button
            type="submit"
            className="bg-black text-white px-6 py-2 rounded font-semibold mt-4 w-fit self-center"
          >
            Finish
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CreateArticle;
