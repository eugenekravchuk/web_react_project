import React from "react";
import Arrow from "../assets/arrow.png";

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
    <div className="group border bg-white flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-lg pt-10 pb-10 px-10 cursor-pointer">
      {/* Image Block with Overlay */}
      <div className="relative overflow-hidden">
        {/* Image with darkening on hover */}
        <img
          src={imageSrc}
          alt={title}
          className="w-full object-cover transition-all duration-500 group-hover:brightness-75"
        />

        {/* Overlay */}
        <div className="absolute top-10 left-10 text-white font-bold text-sm leading-tight">
          <div className="uppercase text-5xl">FYRRE</div>
          <div className="uppercase text-xl">PODCAST</div>
        </div>

        {/* Episode */}
        <div className="absolute bottom-10 left-10 text-white font-bold text-2xl leading-tight">
          EP {episode}
        </div>

        {/* Arrow */}
        <div className="absolute bottom-4 right-4 text-white text-2xl transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1">
          <img src={Arrow} alt="Arrow" className="w-6 h-6" />
        </div>
      </div>

      {/* Textual content */}
      <div className="p-4 flex flex-col gap-2">
        <h3 className="font-bold text-3xl mb-8 group-hover:underline transition duration-300">{title}</h3>
        <div className="text-sm text-black font-medium flex flex-wrap gap-x-4">
          <span>
            <strong className="font-bold mr-1">Date</strong> {date}
          </span>
          <span>
            <strong>Duration</strong> {duration}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PodcastCard;
