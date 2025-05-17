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
  );
};
