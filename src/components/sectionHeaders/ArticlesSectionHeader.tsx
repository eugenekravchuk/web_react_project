const ArticlesSectionHeader = () => {
  return (
    <div className="flex justify-start px-4 sm:px-6 mt-6">
      <a
        href="/magazine"
        className="group inline-flex items-center gap-2 text-sm sm:text-base font-semibold uppercase text-black transition-colors duration-300 hover:text-neutral-700"
      >
        All Articles
        <span className="inline-block text-lg sm:text-xl transform transition-transform duration-300 group-hover:translate-x-1.5">
          →
        </span>
      </a>
    </div>
  );
};

export default ArticlesSectionHeader;
