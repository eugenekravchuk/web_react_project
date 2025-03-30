import MagazinCover from "../assets/magazin-cover.png";

const Sidebar = () => {
  return (
    <aside className="w-full lg:w-[300px] xl:w-[360px] flex flex-col gap-14 text-sm text-black">
      {/* PRINTMAGAZINE */}
      <div className="pb-8">
        <h4 className="uppercase text-[14px] tracking-wide text-black mb-1 font-bold">
          Printmagazine
        </h4>
        <h3 className="text-6xl font-bold mb-4 pb-4">03/2022</h3>
        <img src={MagazinCover} alt="Magazine Cover" className="w-full mb-4" />
        <button
          type="button"
          className="bg-black text-white text-sm px-7 py-4 font-bold transition duration-200 border border-black hover:bg-transparent hover:text-black cursor-pointer"
        >
          ORDER
        </button>
      </div>

      {/* MOST POPULAR */}
      <div>
        <h4 className="uppercase text-[16px] tracking-wide text-black mb-5 font-bold">
          Most Popular
        </h4>

        <div className="divide-y divide-black-500">
          <div className="pb-7">
            <a
              href="/articles/street-art-festival"
              className="block group transition"
            >
              <div className="flex items-start pt-0">
                <p
                  className="font-bold text-[24px] leading-none mt-1"
                  style={{ marginRight: "20px", minWidth: "32px" }}
                >
                  01
                </p>
                <div>
                  <p className="font-bold text-[24px] leading-snug group-hover:underline">
                    Street art festival
                  </p>
                  <p className="text-[14px] text-black text-bold mt-3">
                    <strong className="text-black font-medium mr-1">Text</strong>{" "}
                    Jakob Gronberg
                  </p>
                </div>
              </div>
            </a>
          </div>

          <div className="pt-7 pb-7">
            <a
              href="/articles/street-art-festival"
              className="block group transition"
            >
              <div className="flex items-start pt-0">
                <p
                  className="font-bold text-[24px] leading-none mt-1"
                  style={{ marginRight: "20px", minWidth: "32px" }}
                >
                  02
                </p>
                <div>
                  <p className="font-bold text-[24px] leading-snug group-hover:underline">
                    Street art festival
                  </p>
                  <p className="text-[14px] text-black text-bold mt-3">
                    <strong className="text-black font-medium mr-1">Text</strong>{" "}
                    Jakob Gronberg
                  </p>
                </div>
              </div>
            </a>
          </div>

          <div className="pt-7">
            <a
              href="/articles/street-art-festival"
              className="block group transition"
            >
              <div className="flex items-start pt-0">
                <p
                  className="font-bold text-[24px] leading-none mt-1"
                  style={{ marginRight: "20px", minWidth: "32px" }}
                >
                  01
                </p>
                <div>
                  <p className="font-bold text-[24px] leading-snug group-hover:underline">
                    Street art festival
                  </p>
                  <p className="text-[14px] text-black text-bold mt-3">
                    <strong className="text-black font-medium mr-1">Text</strong>{" "}
                    Jakob Gronberg
                  </p>
                </div>
              </div>
            </a>
          </div>

        </div>
      </div>
      {/* NEWSLETTER */}
      <div className="bg-gray-100 p-6">
        <h4 className="uppercase text-[16px] tracking-wide text-black font-bold mb-2">
          Newsletter
        </h4>
        <h3 className="text-4xl font-bold mb-4 leading-snug">
          Design News to <br /> your inbox
        </h3>
        <form className="flex flex-col gap-3">
          <input
            type="email"
            placeholder="Email"
            className="bg-white px-3 py-2 text-sm"
          />
          <button className="px-4 py-2 self-end bg-black text-white text-sm font-bold transition duration-200 border border-black hover:bg-transparent hover:text-black cursor-pointer">
            SIGN UP
          </button>
        </form>
      </div>
    </aside>
  );
};

export default Sidebar;
