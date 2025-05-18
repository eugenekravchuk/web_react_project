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

const AuthorRow: React.FC<AuthorRowProps> = ({
  imageSrc,
  name,
  job,
  city,
  id,
}) => {
  return (
    <Link
      to={`/authors/${id}`}
      className="block w-full border-b px-4 sm:px-6 py-6 sm:py-8 transition-all duration-200 group"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden">
            <img
              src={imageSrc || "/default-avatar.png"}
              alt={name}
              className="w-full h-full object-cover transition-transform duration-300 transform-gpu group-hover:scale-105"
              style={{ willChange: "transform" }}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "/default-avatar.jpg";
              }}
            />
          </div>

          <span className="text-base sm:text-lg font-semibold text-black transition-all duration-200 group-hover:underline">
            {name}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-10 text-sm text-zinc-500 w-full sm:w-auto mt-4 sm:mt-0">
          <div>
            <span className="font-semibold text-black mr-1">Job</span>
            {job}
          </div>
          <div>
            <span className="font-semibold text-black mr-1">City</span>
            {city}
          </div>
          <div className="flex items-center gap-1 text-xs font-bold uppercase tracking-wide text-black transition-transform duration-200 group-hover:translate-x-1">
            About <ArrowRight size={14} />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default AuthorRow;
