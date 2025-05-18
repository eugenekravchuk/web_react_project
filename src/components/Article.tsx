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

const Article: React.FC<ArticleProps> = ({
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
      className="group block transition duration-300 hover:bg-white flex-1 flex flex-col hover: rounded-md"
    >
      <div className="p-6 border-b flex flex-col lg:flex-row gap-6 justify-between min-h-[180px]">
        <div className="w-40 h-40 overflow-hidden rounded-sm flex-shrink-0">
          <img
            src={imageSrc}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 group-hover:brightness-90"
          />
        </div>

        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 group-hover:underline transition">
              {title}
            </h2>
            <p className="text-gray-600 mt-2 text-base leading-relaxed">
              {description}
            </p>
          </div>

          <div className="pt-4 pb-4 flex flex-wrap items-center text-sm text-gray-800 font-medium gap-x-4 gap-y-2">
            <span>
              <strong className="mr-1">Text</strong> {author}
            </span>
            <span>
              <strong className="mr-1">Date</strong> {date}
            </span>
            <span>
              <strong className="mr-1">Read</strong> {readTime}
            </span>
            <span className="ml-auto border px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap">
              {label}
            </span>
          </div>
        </div>
      </div>
    </a>
  );
};

export default Article;
