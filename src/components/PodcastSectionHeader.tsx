const PodcastSectionHeader = () => {
  return (
    <div className="border-t pt-20 pb-6 flex justify-between items-center max-w-[1680px] mx-auto px-6 mb-10">
      <h2 className="text-7xl font-extrabold">PODCAST</h2>
      <div className="flex justify-start px-6 mt-6">
            <a
              href="/podcast"
              className="group inline-flex items-center gap-2 text-base font-semibold uppercase text-black transition-colors duration-300 hover:text-neutral-700"
            >
              All Podcasts
              <span className="inline-block text-xl transform transition-transform duration-300 group-hover:translate-x-1.5">
                →
              </span>
            </a>
          </div>
    </div>
  );
};

export default PodcastSectionHeader;
