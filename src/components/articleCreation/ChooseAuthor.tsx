import React from "react";
import { AuthorType } from "../../data/types";

export const ChooseAuthor = ({
  authors,
  selectedAuthor,
  setSelectedAuthor,
  onContinue,
  goToNew,
}: {
  authors: AuthorType[];
  selectedAuthor: string;
  setSelectedAuthor: React.Dispatch<React.SetStateAction<string>>;
  onContinue: () => void;
  goToNew: () => void;
}) => {
  return (
    <div className="flex flex-col gap-4 w-full max-w-xl">
      <label className="text-lg font-semibold">Choose existing author</label>
      <select
        className="border border-black px-4 py-2 rounded"
        value={selectedAuthor}
        onChange={(e) => setSelectedAuthor(e.target.value)}
      >
        <option value="" disabled>
          -- Select an author --
        </option>
        {authors.map((author) => (
          <option key={author.id} value={author.name}>
            {author.name} ({author.job})
          </option>
        ))}
      </select>

      <button
        className="px-6 py-3 bg-black text-white rounded disabled:opacity-50 hover:cursor-pointer hover:bg-[#2A2A2A] transition"
        onClick={onContinue}
        disabled={!selectedAuthor}
      >
        Continue with Selected Author
      </button>

      <p className="text-center my-4">or</p>

      <button
        className="px-6 py-2 border border-black rounded hover:cursor-pointer hover:bg-[#D3D3D3] transition"
        onClick={goToNew}
      >
        Create new author
      </button>
    </div>
  );
};
