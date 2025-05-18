import React from "react";

type AuthorCardProps = {
  imageSrc: string;
  name: string;
  job: string;
  city: string;
};

const AuthorCard: React.FC<AuthorCardProps> = ({
  imageSrc,
  name,
  job,
  city,
}) => {
  return (
    <div className="flex items-center gap-6 p-6 w-full border shadow-sm transition-transform duration-300 hover:shadow-lg hover:border-gray-400 min-h-[120px]">
      <img
        src={imageSrc || "/default-avatar.png"}
        alt={`Portrait of ${name}`}
        width={80}
        height={80}
        loading="lazy"
        className="w-20 h-20 object-cover rounded-full flex-shrink-0"
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = "/default-avatar.jpg";
        }}
      />
      <div className="flex flex-col">
        <h3 className="font-bold text-xl leading-snug">{name}</h3>
        <p className="text-sm text-black mt-1 leading-tight">
          <span className="font-bold mr-1">Job:</span> {job}
        </p>
        <p className="text-sm text-black">
          <span className="font-bold mr-1">City:</span> {city}
        </p>
      </div>
    </div>
  );
};

export default AuthorCard;
