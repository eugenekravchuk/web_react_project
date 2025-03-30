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
    <div className="flex items-center gap-4 border p-4 w-full">
      <img
        src={imageSrc}
        alt={name}
        className="w-16 h-16 object-cover rounded-full"
      />
      <div>
        <h3 className="font-bold text-lg">{name}</h3>
        <div className="text-sm text-gray-700 mt-1">
          <span className="font-semibold">Job</span> {job} &nbsp;&nbsp;
          <span className="font-semibold">City</span> {city}
        </div>
      </div>
    </div>
  );
};

export default AuthorCard;
