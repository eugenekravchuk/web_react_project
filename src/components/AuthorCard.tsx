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
    <div className="flex items-center gap-4 p-6 w-full border  shadow-sm transition-transform duration-300  hover:shadow-lg hover:border-gray-400">
      <img
        src={imageSrc}
        alt={name}
        className="w-20 h-20 object-cover rounded-full mr-10"
      />
      <div>
        <h3 className="font-bold text-xl">{name}</h3>
        <div className="text-sm text-black mt-1">
          <span className="font-bold mr-1">Job</span> {job} &nbsp;&nbsp;
          <span className="font-bold mr-1">City</span> {city}
        </div>
      </div>
    </div>
  );
};

export default AuthorCard;
