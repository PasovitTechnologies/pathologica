import React from "react";

const experts = [
  {
    name: "КОНДРАТЬЕВА Татьяна Тихоновна",
    title: "Доктор медицинских наук",
    specialty:
      "Врач-патолог (специальности: онкология, клинико-лабораторная диагностика, патологическая анатомия)",
    position:
      'Главный научный сотрудник, <br/> Научно-образовательный центр "Евразийская онкологическая программа "ЕАФО" (АНО "ЕАФО") <br/> <br/> Руководитель программы онкопатологии Евразийской федерации онкологии (EAFO)',

    location: "Москва, Российская федерация",
    image:
      "https://static.wixstatic.com/media/e6f22e_88bbbf32375f4fcfb34dff8123303ee3~mv2.png",
  },
  {
    name: "ВРУБЛЕВСКАЯ Екатерина Андреевна",
    specialty: "Врач-патолог (онкология, клинико-лабораторная диагностика)",
    position:
      'Научный сотрудник, <br/> Научно-образовательный центр "Евразийская онкологическая программа "ЕАФО" (АНО "ЕАФО")',
    location: "Москва, Российская федерация",
    image:
      "https://static.wixstatic.com/media/e6f22e_6087b734b610460a8b806edd7fd1a1ea~mv2.png",
  },
  {
    name: "РАВИНДРАН Хиран",
    specialty: "Врач-патолог (специальность: патология)",
    position: `FRCPath - Член Королевского колледжа патологии Великобритании Член Академии патологии Объединенных Арабских Эмиратов <br/> <br/>
      Научный консультант, <br/> Научно-образовательный центр "ЕАФО" (АНО "ЕАФО") <br/> <br/>
      Специалист по анатомической и клинической патологии, Больница Бурджил`,
    location: "Абу-Даби, Объединенные Арабские Эмираты",
    image:
      "https://static.wixstatic.com/media/e6f22e_01724050bfa4465db1cc5a53f791c46b~mv2.jpg",
  },
  {
    name: "ЛОЗАНО ЭСКАРИО Мария Долорес",
    specialty: "Врач-патолог (специальность: патология)",
    position: `Заведующая отделом патологии клиники Университета Наварры <br/> <br/>
      Директор направления цитопатологии и молекулярной патологии в цитологии <br/> <br/>
      Доцент кафедры  патологии Наваррского Университета <br/> <br/>
      Вице-президент испанского общества цитопатологии`,
    location: "Памплона, Испания",
    image:
      "https://static.wixstatic.com/media/e6f22e_e08a9f8c3c74434f8802a324ed543628~mv2.jpg",
  },
];

const Experts = () => {
  return (
    <section
      className="-z-10 relative pt-8 pb-13 bg-cover bg-center"
      style={{
        backgroundImage: `url('https://static.wixstatic.com/media/e6f22e_5d038a6c2aaf46e09c5172c73fcf92d8~mv2.jpg')`,
      }}
    >
      <div className="absolute inset-0 bg-gray-200/60 "></div>

      <div className="relative max-w-5xl mx-auto px-4">
        <h2 className="text-3xl md:text-[3.2rem] tracking-tight font-bold text-center mb-5 text-[#1A1415]">
          Эксперты PathoLogica Service
        </h2>
        <div className="space-y-5 lg:space-y-16  bg-white  md:p-6 rounded-lg shadow-lg">
          {experts.map((expert, index) => (
            <div
              key={index}
             className="p-6 flex flex-col-reverse gap-5 lg:gap-0 lg:flex-row items-center lg:items-start"
            >
              <div className="lg:w-[65%] tracking-tight text-center lg:text-left px-4">
                <h3 className="text-2xl md:text-[2.45rem] font-bold mb-4 md:mb-8">
                  {expert.name}
                </h3>
                {expert.title && (
                  <p className="font-semibold text-xl md:text-2xl mb-4 md:mb-6">
                    {expert.title}
                  </p>
                )}
                <p className="text-lg md:text-2xl mb-2 md:mb-4">
                  {expert.specialty}
                </p>
                <p
                  className="text-base md:text-lg text-[#1a141a]"
                  dangerouslySetInnerHTML={{ __html: expert.position }}
                ></p>
                <p className="text-[#00295F] text-base md:text-lg mt-4 md:mt-8 italic">
                  {expert.location}
                </p>
              </div>
              <div className="lg:w-[35%] flex justify-center mt-6 lg:mt-0">
                <img
                  src={expert.image}
                  alt={expert.name}
                  className="w-56 h-56 md:w-80 md:h-80 rounded-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experts;
