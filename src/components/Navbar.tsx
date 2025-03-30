const Navbar = () => {
  return (
    <nav className="flex justify-between items-center border-b px-6 py-4">
      <div className="font-bold text-sm">FYRRE MAGAZINE</div>
      <div className="flex gap-6 items-center text-sm text-gray-700">
        <a href="#">Magazine</a>
        <a href="#">Authors</a>
        <a href="#">Podcast</a>
        <span className="text-gray-400">—</span>
        <div className="flex gap-4 text-xl">
          <a href="#">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="#">
            <i className="fab fa-youtube"></i>
          </a>
          <a href="#">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#">
            <i className="fab fa-rss"></i>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
