import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const CreateAuthor = () => {
  const navigate = useNavigate();
  const [photo, setPhoto] = useState<File | null>(null);

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
      <div className="mb-20 flex flex-col items-center justify-center px-4 bg-white">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-10 text-center">
          Create new author
        </h1>

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

          {/* Form fields */}
          <form className="flex flex-col flex-1 gap-4">
            <input
              type="text"
              placeholder="Name Surname"
              className="border border-black px-4 py-2 rounded"
            />
            <input
              type="text"
              placeholder="Job (author, artist, creator)"
              className="border border-black px-4 py-2 rounded"
            />
            <textarea
              placeholder="Best skills (3–4 sentences)"
              rows={3}
              className="border border-black px-4 py-2 rounded resize-none"
            />
            <textarea
              placeholder="About new author (4+ sentences)"
              rows={4}
              className="border border-black px-4 py-2 rounded resize-none"
            />

            <button
              type="submit"
              className="bg-black hover:bg-[#28292A] transition text-white px-6 py-2 rounded font-semibold mt-4 w-fit self-center"
            >
              Continue
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CreateAuthor;
