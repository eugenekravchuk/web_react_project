import React from "react";
import { ArrowRight } from "lucide-react";

type AuthorRowProps = {
  imageSrc: string;
  name: string;
  job: string;
  city: string;
};

const AuthorRow: React.FC<AuthorRowProps> = ({ imageSrc, name, job, city }) => {
  return (
    <div className="w-full border-b px-6 py-10">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src={imageSrc}
            alt={name}
            className="w-20 h-20 rounded-full object-cover"
          />
          <span className="text-base font-bold text-black">{name}</span>
        </div>

        <div className="flex items-center gap-6 text-sm text-zinc-500">
          <div>
            <span className="font-semibold text-black mr-1">Job</span>
            {job}
          </div>
          <div>
            <span className="font-semibold text-black mr-1">City</span>
            {city}
          </div>
        </div>

        <a
          href="/about"
          className="flex items-center gap-1 text-xs font-bold uppercase tracking-wide hover:translate-x-1 transition"
        >
          About <ArrowRight size={14} />
        </a>
      </div>
    </div>
  );
};

export default AuthorRow;
