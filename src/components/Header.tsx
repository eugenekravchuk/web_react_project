import React from "react";

type HeaderProps = {
  className?: string;
  header: string;
};

const Header: React.FC<HeaderProps> = ({ header, className = "" }) => {
  return (
    <header className={`w-full py-12 flex justify-center ${className}`}>
      <h1 className="text-[clamp(50px,18vw,300px)] font-extrabold leading-none uppercase text-center">
        {header}
      </h1>
    </header>
  );
};

export default Header;
