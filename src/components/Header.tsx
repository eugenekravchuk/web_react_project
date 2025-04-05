import React from "react";

type HeaderProps = {
  className?: string;
  header: string;
};

const Header: React.FC<HeaderProps> = ({ header }) => {
  return (
    <header className="w-full py-12 flex justify-center">
      <img src={header} alt="Header logo" />
    </header>
  );
};

export default Header;
