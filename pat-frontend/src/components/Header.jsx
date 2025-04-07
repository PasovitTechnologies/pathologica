"use client";
import { useState } from "react";
import { BsTelephone } from "react-icons/bs";
import { CiMail } from "react-icons/ci";
import { Link, useLocation } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const navLinks = [
    { name: "О нас", path: "/about" },
    { name: "Эксперты сервиса", path: "/experts" },
    { name: "Наши услуги", path: "/our-services" },
    { name: "Стоимость услуг", path: "/services" },
    { name: "Подать заявку", path: "/apply" },
    { name: "Доставка и оплата", path: "/delivery" },
  ];

  return (
    <header className="bg-gray-100 shadow-md shadow-black/40 ">
      <div className="bg-[#5ebac5] px-4 py-2.5 text-white lg:pr-10">
        <div className="max-w-7xl flex justify-end items-center space-x-4 mx-auto text-blue-700 ">
          <a href="https://wa.me/79151290927" target="_blank">
            <BsTelephone className="cursor-pointer text-xl sm:text-2xl md:text-2xl" />
          </a>
          <a href="mailto:office@pathologica.ru" target="_blank">
            <CiMail className="cursor-pointer text-xl sm:text-2xl md:text-3xl" />
          </a>
        </div>
      </div>

      <div className="bg-[#e0e0e0] pb-4 pt-1">
        <div className="flex justify-between items-center max-w-[84rem] mx-auto">
          <div className="w-64 sm:w-80 lg:w-[25rem] xl:w-[40rem]">
            <Link to="/">
              <img
                src="https://static.wixstatic.com/media/e6f22e_26677178adb448a9a9816ef76b9020b9~mv2.png/v1/fill/w_529,h_119,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/%D0%BB%D0%BE%D0%B3%D0%BE%D1%82%D0%B8%D0%BF%20%D0%BF%D0%B0%D1%82%D0%BE%D0%BB%D0%BE%D0%B4%D0%B6%D0%B8%D0%BA%D0%B8%20%D0%BD%D0%BE%D0%B2%D1%8B%D0%B9.png"
                alt="Logo"
                className="w-full"
              />
            </Link>
          </div>

          <nav className="hidden xl:block overflow-hidden rounded-3xl shadow-md shadow-black/30 w-full mr-10 border border-gray-400">
            <ul className="flex w-full">
              {navLinks.map((item, index) => {
                const isActive = location.pathname === item.path;

                return (
                  <li
                    key={index}
                    className={`relative flex-grow  transition-all duration-500 
                       
                      border-l border-gray-400 first:border-l-0 last:border-r-0
                      ${
                        isActive
                          ? "bg-[#dddddd] shadow-[inset_0px_16px_12px_rgba(0,0,0,0.15)]"
                          : "bg-gradient-to-b from-[#f7f7f7] to-[#c4c4c4] hover:shadow-[inset_0px_-16px_12px_rgba(0,0,0,0.15)]"
                      }`}
                  >
                    <Link
                      to={item.path}
                      className="block text-center text-lg py-3 cursor-pointer w-full"
                    >
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <button className="xl:hidden mr-3 text-3xl md:text-5xl lg:text-6xl" onClick={toggleMenu}>
            {menuOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>

        {menuOpen && (
          <nav className="xl:hidden absolute w-full left-0 mt-4 bg-gray-100 border-t border-gray-300 z-20 shadow-lg">
            <ul className="flex flex-col space-y-2 p-4">
              {navLinks.map((item, index) => {
                const isActive = location.pathname === item.path;

                return (
                  <li key={index}>
                    <Link
                      to={item.path}
                      className={`block px-4 py-2 rounded-lg text-center hover:bg-gray-300
                        ${
                          isActive
                            ? "bg-[#5ebac5] text-white font-semibold"
                            : "bg-gray-200 text-black"
                        }`}
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
