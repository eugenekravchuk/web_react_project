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
    <div className="flex items-center justify-between border-b py-6 w-full gap-6">
      {/* Episode number */}
      <div className="text-lg font-semibold w-6 text-left">{episode}</div>

      {/* Podcast image */}
      <div className="w-24 h-24 sm:w-28 sm:h-28 shrink-0">
        <img
          src={imageSrc}
          alt={`Episode ${episode}`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Main content */}
      <div className="flex-1 px-4 sm:px-6">
        <h3 className="text-lg sm:text-xl font-semibold text-black">{title}</h3>
      </div>

      {/* Meta info + listen */}
      <div className="flex flex-col sm:flex-row items-end sm:items-center gap-1 sm:gap-6 text-sm text-black font-medium whitespace-nowrap">
        <div>
          <span className="font-semibold mr-1">Date</span> {date}
        </div>
        <div>
          <span className="font-semibold mr-1">Duration</span> {duration}
        </div>
        <div className="flex items-center gap-1 text-xs font-bold uppercase tracking-wide cursor-pointer hover:translate-x-1 transition">
          Listen
          <ArrowRight size={14} />
        </div>
      </div>
    </div>
  );
};

export default PodcastRow;
