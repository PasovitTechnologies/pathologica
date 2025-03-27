import React from "react";

const About = () => {
  return (
    <section className="w-full max-w-6xl px-4 mx-auto py-1.5 mb-10 flex justify-center">
      <div className="container mx-auto relative ">
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full">
            <img
              src="https://static.wixstatic.com/media/e6f22e_e5e78d0836d34599aaa943e2abfd29a6~mv2.jpg" // Replace with actual image path
              alt="Microscope"
              className="w-full "
            />
          </div>

          <div className="md:w-[28.5rem]   md:absolute right-16 top-6 bg-white/60 p-6 text-justify text-[0.95rem] tracking-tight leading-6 ">
            <p className=" ">
              &nbsp; &nbsp;{" "}
              <b className="text-[1.075rem]">PathoLogica Service </b> — это
              общественно направленный проект, созданный основателем и
              директором Евразийской федерации онкологии{" "}
              <a
                target="_blank"
                href="https://www.drsoma.info/"
                className="text-blue-500 hover:underline"
              >
                Доктором Самой (Сомасундарам СУБРАМАНИАН)
              </a>{" "}
              в 2020 году. В команду PathoLogica SERVICE входят
              высококвалифицированные российские и зарубежные эксперты, которые
              проводят качественную диагностику онкологических заболеваний.
            </p>

            <p className="mt-2 ">
              &nbsp; &nbsp;{" "}
              <b className="text-[1.075rem]">PathoLogica Service</b> является
              платным, но некоммерческим проектом. Весь доход направляется на
              развитие, проведение образовательных мероприятий, подготовку
              патологов, лаборантов и других специалистов, увеличение видов
              оказываемой помощи и приобретение нового оборудования.
            </p>
            <p className="mt-2 ">
              &nbsp; &nbsp; Задача{" "}
              <b className="text-[1.075rem]">PathoLogica Service</b> —
              предоставить как можно большему числу пациентов возможность
              получить качественные цитологические и гистологические заключения,
              точный диагноз и, в дальнейшем, правильное лечение.
            </p>
            <p className="mt-16 mb-1 text-center italic font-bold">
              Мы работаем для Вас!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
