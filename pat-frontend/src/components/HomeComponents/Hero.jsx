import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import { Link } from "react-router";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const imageRef = useRef(null);

  useEffect(() => {
    if (window.innerWidth > 768) {
      gsap.fromTo(
        imageRef.current,
        { x: -90 },
        {
          x: 90,
          ease: "none",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        }
      );
    }
  }, []);

  return (
   <section className="flex flex-col xl:flex-row h-auto xl:h-[43rem] border-t border-[#2f606c]">
       <div className="w-full xl:w-1/2 relative overflow-hidden h-[24rem] lg:h-[30rem] xl:h-auto">
        <img
          ref={imageRef}
          src="https://static.wixstatic.com/media/e6f22e_e5e78d0836d34599aaa943e2abfd29a6~mv2.jpg"
          alt="Microscope"
          className="absolute inset-0 w-full h-full object-cover scale-125"
        />
      </div>

      <div className="w-full xl:w-1/2 bg-[#2f606c] text-white p-6 sm:p-10 md:p-12  xl:pr-36 flex flex-col justify-center">
         <h2 className="text-3xl text-center  sm:text-4xl md:text-5xl xl:text-6xl font-bold mb-6 sm:mb-14">
          PathoLogica Service
        </h2>

        <p className="mb-4 text-base sm:text-lg text-justify leading-relaxed">
          &nbsp; &nbsp; PathoLogica Service — это общественно направленный
          проект, созданный с целью повышения доступности качественной
          диагностики онкологических заболеваний в России и странах СНГ.
          Эксперты PathoLogica Service выполняют исследования на современном
          оборудовании и коллегиально устанавливают диагноз в самых сложных
          случаях.
        </p>

        <p className="mb-6 text-base sm:text-lg text-justify leading-relaxed">
          &nbsp; На нашем сайте Вы можете заказать проведение цитологического
          или гистологического исследований, а также консультативный пересмотр
          готовых препаратов. Для этого Вам не придётся выходить из дома: после
          оформления заявки курьер доставит материал нашим экспертам, а затем
          привезет его назад вместе с готовым заключением. Скан заключения Вы
          получите на электронную почту сразу после завершения исследования.
        </p>

        <div className="flex justify-end">
          <Link to={"/about"}>
            <button className="bg-white text-lg sm:text-xl font-bold text-[#323232] px-4 py-2 sm:px-5 sm:py-2.5 cursor-pointer hover:bg-[#323232] hover:text-white transition-all duration-500 rounded-3xl border border-[#323232] shadow-md">
              Подробнее
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
