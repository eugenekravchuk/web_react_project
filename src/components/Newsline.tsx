const Newsline = () => {
  const content = (
    <>
      <strong className="mr-6">NEWS TICKER+++</strong>
      <span className="mr-12">Lorem ipsum dolor sit amet, consectetur adipiscing elit +++</span>
      <span className="mr-12">Lorem ipsum dolor sit amet, consectetur adipiscing elit +++</span>
      <span className="mr-12">Lorem ipsum dolor sit amet, consectetur adipiscing elit +++</span>
    </>
  );

  return (
    <div className="bg-black text-white overflow-hidden whitespace-nowrap py-3 px-5 group">
      <div className="marquee-wrapper">
        {content}
        {content} {/* дублюю зміст, щоб не було цих пробілів негарних */}
      </div>
    </div>
  );
};

export default Newsline;
