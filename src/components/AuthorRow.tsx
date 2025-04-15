import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

type AuthorRowProps = {
  imageSrc: string;
  name: string;
  job: string;
  city: string;
  id: string;
};

const AuthorRow: React.FC<AuthorRowProps> = ({ imageSrc, name, job, city, id }) => {
  return (
    <Link
      to={`/authors/${id}`}
      className="block w-full border-b px-6 py-8 transition-all duration-200 group"
    >
      <div className="flex items-center justify-between">
        {/* Ліва частина — аватар + ім'я */}
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full overflow-hidden">
            <img
              src={imageSrc}
              alt={name}
              className="w-full h-full object-cover transition-transform duration-300 transform-gpu group-hover:scale-105"
              style={{ willChange: "transform" }}
            />
          </div>
          <span className="text-lg font-semibold text-black transition-all duration-200 group-hover:underline">
            {name}
          </span>
        </div>

        {/* Права частина — три фіксовані колонки */}
        <div
          className="grid grid-cols-3 gap-10 text-sm text-zinc-500"
          style={{ minWidth: '320px' }}
        >
          <div className="w-24">
            <span className="font-semibold text-black mr-1">Job</span>
            {job}
          </div>
          <div className="w-24">
            <span className="font-semibold text-black mr-1">City</span>
            {city}
          </div>
          <div className="w-24 flex items-center gap-1 text-xs font-bold uppercase tracking-wide text-black transition-transform duration-200 group-hover:translate-x-1">
            About <ArrowRight size={14} />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default AuthorRow;
