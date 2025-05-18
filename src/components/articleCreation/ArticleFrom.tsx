import React from "react";

export const ArticleForm = ({
  articleData,
  setArticleData,
  photoArticle,
  handlePhotoArticleChange,
  labels,
  readTimes,
  handleFinish,
  goBack,
}: {
  articleData: any;
  setArticleData: React.Dispatch<React.SetStateAction<any>>;
  photoArticle: File | null;
  handlePhotoArticleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  labels: string[];
  readTimes: string[];
  handleFinish: () => void; 
  goBack: () => void;
}) => {
  return (
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
            <p className="text-lg">Click to upload article cover image</p>
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
        placeholder="Enter article title (e.g. 'The Future of Street Art')"
        className="w-full border px-4 py-2 rounded"
        value={articleData.title}
        onChange={(e) =>
          setArticleData({ ...articleData, title: e.target.value })
        }
      />

      <input
        type="text"
        placeholder="Write a short summary of the article"
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
          Select category/label
        </option>
        {labels.map((label) => (
          <option key={label} value={label}>
            {label}
          </option>
        ))}
      </select>

      <textarea
        placeholder="Highlight key message or insight (Bold Info 1)"
        className="w-full border px-4 py-2 rounded"
        value={articleData.bold_info1}
        onChange={(e) =>
          setArticleData({ ...articleData, bold_info1: e.target.value })
        }
      />

      <textarea
        placeholder="Expand on the first idea or story section"
        className="w-full border px-4 py-2 rounded"
        value={articleData.info1}
        onChange={(e) =>
          setArticleData({ ...articleData, info1: e.target.value })
        }
      />

      <textarea
        placeholder="Another key insight or shift in the narrative (Bold Info 2)"
        className="w-full border px-4 py-2 rounded"
        value={articleData.bold_info2}
        onChange={(e) =>
          setArticleData({ ...articleData, bold_info2: e.target.value })
        }
      />

      <textarea
        placeholder="Wrap-up or supporting paragraph for the second idea"
        className="w-full border px-4 py-2 rounded"
        value={articleData.info2}
        onChange={(e) =>
          setArticleData({ ...articleData, info2: e.target.value })
        }
      />

      <input
        type="text"
        placeholder='Inspirational quote (e.g. "Art is the lie that enables us to realize the truth.")'
        className="w-full border px-4 py-2 rounded"
        value={articleData.quote}
        onChange={(e) =>
          setArticleData({ ...articleData, quote: e.target.value })
        }
      />

      <input
        type="text"
        placeholder="Quote author (e.g. Pablo Picasso)"
        className="w-full border px-4 py-2 rounded"
        value={articleData.quote_author}
        onChange={(e) =>
          setArticleData({ ...articleData, quote_author: e.target.value })
        }
      />

      <div className="flex gap-4 justify-center">
        <button
          className="px-6 py-2 border border-black rounded hover:cursor-pointer hover:bg-[#D3D3D3] transition"
          onClick={goBack}
        >
          Back
        </button>
        <button
          className="bg-black text-white px-6 py-2 rounded font-semibold hover:cursor-pointer hover:bg-[#2A2A2A] transition"
          onClick={handleFinish}
        >
          Finish
        </button>
      </div>
    </div>
  );
};
