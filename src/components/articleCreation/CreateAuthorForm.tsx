import React from "react";

export const CreateAuthorForm = ({
  photoAuthor,
  handlePhotoAuthorChange,
  newAuthor,
  setNewAuthor,
  handleCreateAuthor,
  goBack,
}: {
  photoAuthor: File | null;
  handlePhotoAuthorChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  newAuthor: {
    name: string;
    imageSrc: string;
    job: string;
    city: string;
    bold_info: string;
    info: string;
  };
  setNewAuthor: React.Dispatch<React.SetStateAction<any>>;
  handleCreateAuthor: () => void;
  goBack: () => void;
}) => {
  return (
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
            setNewAuthor((prev: any) => ({ ...prev, name: e.target.value }))
          }
        />
        <input
          placeholder="Job (e.g. artist)"
          className="border px-4 py-2 rounded"
          onChange={(e) =>
            setNewAuthor((prev: any) => ({ ...prev, job: e.target.value }))
          }
        />
        <textarea
          placeholder="Best skills (3-4 sentences)"
          className="border px-4 py-2 rounded resize-none"
          rows={3}
          onChange={(e) =>
            setNewAuthor((prev: any) => ({
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
            setNewAuthor((prev: any) => ({ ...prev, info: e.target.value }))
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
  );
};
