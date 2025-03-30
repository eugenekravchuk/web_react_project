type ArticleProps = {
  imageSrc: string;
  title: string;
  description: string;
  author: string;
  date: string;
  readTime: string;
  label: string;
};

const Article: React.FC<ArticleProps> = ({
  imageSrc,
  title,
  description,
  author,
  date,
  readTime,
  label,
}) => {
  return (
    <div className="py-6 border-b flex flex-col lg:flex-row gap-6 items-start">
      {/* Thumbnail */}
      <img
        src={imageSrc}
        alt={title}
        className="w-32 h-32 object-cover flex-shrink-0"
      />

      {/* Content */}
      <div className="flex-1">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-gray-700 mt-1">{description}</p>

        <div className="mt-4 flex flex-wrap items-center text-sm text-gray-800 font-medium gap-x-4 gap-y-2">
          <span>
            <strong>Text</strong> {author}
          </span>
          <span>
            <strong>Date</strong> {date}
          </span>
          <span>
            <strong>Read</strong> {readTime}
          </span>
          <span className="ml-auto border px-2 py-0.5 rounded-full text-xs font-semibold">
            {label}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Article;
