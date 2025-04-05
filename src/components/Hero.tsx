import HeroImage from "../assets/hero_image.png";

const Hero = () => {
  return (
    <section className="px-6 py-12 max-w-[1680px] mx-auto">
      <div className="flex flex-col lg:flex-row gap-12 mb-10">
        {/* Left: Заголовок */}
        <div className="lg:w-1/2 flex items-start">
          <h1 className="text-[104px] font-extrabold leading-tight tracking-tight">
            DON’T CLOSE <br /> YOUR EYES
          </h1>
        </div>

        {/* Right: Текст зверху + мета знизу */}
        <div className="lg:w-1/2 flex flex-col justify-between pt-8 text-lg">
          {/* Верхній блок — параграф */}
          <div>
            <p className="text-gray-700">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Egestas dui id ornare arcu odio ut sem. Cras ornare arcu dui
              vivamus arcu felis bibendum ut. Porttitor leo a diam.
            </p>
          </div>

          {/* Нижній блок — мета */}
          <div className="mt-6 flex flex-wrap items-center text-sm gap-x-4 gap-y-2 text-gray-800 font-medium pb-10">
            <span>
              <strong>Text</strong> Jakob Gronberg
            </span>
            <span>
              <strong>Date</strong> 16. March 2022
            </span>
            <span>
              <strong>Duration</strong> 1 Min
            </span>
            <span className="ml-auto border px-3 py-2 rounded-full text-sm font-semibold">
              LABEL
            </span>
          </div>
        </div>
      </div>

      {/* Image */}
      <div>
        <img
          src={HeroImage}
          alt="DON’T CLOSE YOUR EYES"
          className="w-full object-cover"
        />
      </div>
    </section>
  );
};

export default Hero;
