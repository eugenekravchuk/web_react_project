import React from "react";

type PodcastCardProps = {
  imageSrc: string;
  episode: string;
  title: string;
  date: string;
  duration: string;
};

const PodcastCard: React.FC<PodcastCardProps> = ({
  imageSrc,
  episode,
  title,
  date,
  duration,
}) => {
  return (
    <div className="border w-full max-w-sm flex flex-col">
      <div className="relative">
        <img src={imageSrc} alt={title} className="w-full object-cover" />
      </div>

      <div className="p-4 flex flex-col gap-2">
        <h3 className="font-semibold text-lg">{title}</h3>
        <div className="text-sm text-gray-700 font-medium flex flex-wrap gap-x-4">
          <span>
            <strong>Date</strong> {date}
          </span>
          <span>
            <strong>Duration</strong> {duration}
          </span>
          <span className="hidden">{episode}</span>
        </div>
      </div>
    </div>
  );
};

export default PodcastCard;
