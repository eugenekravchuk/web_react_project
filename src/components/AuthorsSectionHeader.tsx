const AuthorsSectionHeader = () => {
  return (
    <div className="border-t pt-10 pb-6 flex justify-between items-center max-w-[1680px] mx-auto px-6">
      <h2 className="text-4xl font-extrabold">Authors</h2>
      <a
        href="/podcasts"
        className="text-xs font-semibold flex items-center gap-1 hover:underline"
      >
        ALL AUTHORS
        <span className="text-sm">→</span>
      </a>
    </div>
  );
};

export default AuthorsSectionHeader;
