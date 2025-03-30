import React from "react";

type HeaderProps = {
  header: string;
};

const Header: React.FC<HeaderProps> = ({ header }) => {
  return (
    <header className="py-12 px-6">
      <img src={header} alt="Header logo" />
    </header>
  );
};

export default Header;
