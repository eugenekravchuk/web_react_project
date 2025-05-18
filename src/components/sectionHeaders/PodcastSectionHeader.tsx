const PodcastSectionHeader = () => {
  return (
    <div className="border-t pt-16 sm:pt-20 pb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center max-w-[1680px] mx-auto px-4 sm:px-6 mb-8 sm:mb-10">
      <h2 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold mb-4 sm:mb-0">
        PODCAST
      </h2>
      <div className="flex justify-start sm:justify-end mt-2 sm:mt-0">
        <a
          href="/podcast"
          className="group inline-flex items-center gap-2 text-sm sm:text-base font-semibold uppercase text-black transition-colors duration-300 hover:text-neutral-700"
        >
          All Podcasts
          <span className="inline-block text-lg sm:text-xl transform transition-transform duration-300 group-hover:translate-x-1.5">
            →
          </span>
        </a>
      </div>
    </div>
  );
};

export default PodcastSectionHeader;
