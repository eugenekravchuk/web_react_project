import React from "react";

type ArticleProps = {
  imageSrc: string;
  title: string;
  description: string;
  author: string;
  date: string;
  readTime: string;
  label: string;
  slug: string;
};

const ArticleCard: React.FC<ArticleProps> = ({
  imageSrc,
  title,
  description,
  author,
  date,
  readTime,
  label,
  slug,
}) => {
  return (
    <a
      href={`/articles/${slug}`}
      className="block w-full max-w-sm bg-white border rounded-lg overflow-hidden transition hover:shadow-md"
    >
      {/* Date & Label */}
      <div className="flex justify-between items-start px-4 pt-4">
        <p className="text-sm text-gray-500">{date}</p>
        <span className="text-xs border border-black px-3 py-0.5 rounded-full">
          {label}
        </span>
      </div>

      {/* Image */}
      <div className="p-5">
        <img
          src={imageSrc}
          alt={title}
          className="w-full h-auto mt-2 object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <h2 className="text-xl font-semibold text-black">{title}</h2>
        <p className="text-gray-600 text-sm mt-2 leading-relaxed">
          {description}
        </p>

        <div className="mt-6 text-sm text-black flex flex-wrap gap-x-4">
          <p>
            <strong>Text</strong> {author}
          </p>
          <p>
            <strong>Duration</strong> {readTime}
          </p>
        </div>
      </div>
    </a>
  );
};

export default ArticleCard;
