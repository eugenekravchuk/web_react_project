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
      className="group block w-full h-full border border-black-300 bg-white transition duration-300 hover:border-black hover:bg-neutral-50"
    >
      <div className="flex justify-between items-start px-4 pt-4 mb-4">
        <p className="text-sm text-gray-500">{date}</p>
        <span className="text-xs border border-black px-2 py-0.5 rounded-full">
          {label}
        </span>
      </div>

      <div className="px-4 mb-2 overflow-hidden">
        <div className="aspect-[4/3] w-full overflow-hidden rounded-sm">
          <img
            src={imageSrc}
            alt={`Image for ${title}`}
            className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-102"
          />
        </div>
      </div>

      <div className="px-4 pb-6">
        <h2 className="text-2xl font-bold text-black mb-2 group-hover:underline decoration-black/20 underline-offset-4">
          {title}
        </h2>
        <p className="text-gray-700 text-sm leading-relaxed line-clamp-4">
          {description}
        </p>
        <div className="mt-8 text-sm text-black flex flex-wrap gap-x-4">
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
