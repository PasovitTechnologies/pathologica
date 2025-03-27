"use client";
import React from "react";
import { Link } from "react-router";

const services = [
  {
    title: "ЦИТОЛОГИЧЕСКИЕ ИССЛЕДОВАНИЯ",
    description: [
      "Первичное цитологическое исследование",
      "Консультативный пересмотр цитологических препаратов",
      "Экспертное мнение",
    ],
    price: "9 000 руб.",
    image:
      "https://static.wixstatic.com/media/0422b59ac8e7469ab21b05a8ceba25ca.jpg",
  },
  {
    title: "ГИСТОЛОГИЧЕСКИЕ ИССЛЕДОВАНИЯ",
    description: [
      "Первичное гистологическое исследование",
      "Консультативный пересмотр гистологических препаратов",
      "Экспертное мнение",
    ],
    price: "15 000 руб.",
    image:
      "https://static.wixstatic.com/media/nsplsh_4c394556334f6f674c6830~mv2.jpg",
  },
  {
    title: "КОМПЛЕКСНЫЕ ИССЛЕДОВАНИЯ",
    description: [
      "Гистологическое исследование препарата",
      "Консультативный пересмотр гистологических препаратов",
      "Экспертное мнение",
    ],
    price: "20 500 руб.",
    image:
      "https://static.wixstatic.com/media/e6f22e_6c9d7d7880a744f580a2a121406b2a22~mv2.jpeg",
  },
];

const OurServicesHome = () => {
  return (
    <section className="text-[#333333] pt-10">
      <div className=" mx-auto px-6 md:px-20">
        <h2 className="text-5xl  font-bold text-center mb-8">Наши услуги</h2>

        <div className="grid md:grid-cols-3 gap-4">
          {services.map((service, index) => (
            <div key={index} className="bg-white shadow-lg overflow-hidden">
              <div className="h-52 w-full">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="py-6 px-4 ">
                <h3 className="text-xl text-center  font-bold ">
                  {service.title}
                </h3>
                <ul className=" text-sm leading-6  mt-4 mb-2">
                  {service.description.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
                <div className="flex justify-between items-center ">
                  <p className="text-lg ">
                    От:{" "}
                    <span className="text-black font-semibold text-2xl">
                      {service.price}
                    </span>
                  </p>
                  <Link to={"/services"}>
                    <button className=" px-3 py-1.5 border border-gray-600 rounded-full shadow-md shadow-black/40 text-black font-semibold text-xl hover:bg-[#747474] cursor-pointer hover:text-white transition-all duration-500">
                      Подробнее
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link to={"/services"}>
            <button className="bg-[#5ebac5] text-white text-xl md:text-3xl font-semibold px-16 py-3 rounded-full shadow-md shadow-[#b1b0b0] hover:bg-[#8c91b7] transition cursor-pointer">
              СТОИМОСТЬ УСЛУГ
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default OurServicesHome;
