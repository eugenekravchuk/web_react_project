import React from "react";
import { ArrowRight } from "lucide-react";

type PodcastRowProps = {
  imageSrc: string;
  episode: string;
  title: string;
  date: string;
  duration: string;
};

const PodcastRow: React.FC<PodcastRowProps> = ({
  imageSrc,
  episode,
  title,
  date,
  duration,
}) => {
  return (
    <div className="group flex flex-col sm:flex-row sm:items-center justify-between border-b py-6 w-full gap-4 sm:gap-6 transition-colors duration-200 cursor-pointer px-4 sm:px-0">
      <div className="text-base sm:text-lg font-semibold w-full sm:w-6 text-left">
        {episode}
      </div>

      <div className="w-full sm:w-24 h-24 sm:h-24 shrink-0 overflow-hidden rounded-sm">
        <img
          src={imageSrc}
          alt={`Episode ${episode}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      <div className="w-full sm:flex-1 sm:px-6">
        <h3 className="text-base sm:text-xl font-semibold text-black transition-all duration-300 group-hover:underline">
          {title}
        </h3>
      </div>

      <div className="w-full sm:w-auto flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-6 text-sm text-black font-medium whitespace-nowrap mt-2 sm:mt-0">
        <div>
          <span className="font-semibold mr-1">Date</span> {date}
        </div>
        <div>
          <span className="font-semibold mr-1">Duration</span> {duration}
        </div>
        <div className="flex items-center gap-1 text-xs font-bold uppercase tracking-wide transform transition-transform duration-300 group-hover:translate-x-2">
          Listen
          <ArrowRight size={14} />
        </div>
      </div>
    </div>
  );
};

export default PodcastRow;
