const Footer = () => {
  return (
    <footer className="bg-[#64B5C5] text-white text-center pt-10">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-2xl lg:text-4xl font-bold mb-2 uppercase">
          КОНТАКТНЫЕ ДАННЫЕ
        </h2>

        <div className="flex flex-col md:flex-row justify-between text-lg lg:text-[1.38rem] tracking-tight items-center">
          <div className="md:text-left text-center ">
            <p className="">Адрес: г. Москва,</p>
            <p className="">Волоколамское шоссе д.1 стр. 1, офис 606С</p>
            <p className="md:mb-2">
              +7 (915) 129-09-27 | office@pathologica.ru
            </p>
            <p className="md:mb-1">График работы: пн-пт 10:00 - 18:00</p>
          </div>

          <div className="my-6 md:my-0">
            <a href="https://yandex.ru/maps/213/moscow/house/volokolamskoye_shosse_1s1/Z04YcwdkT00GQFtvfXRxd3lgZA==/?ll=37.504681%2C55.806530&source=wizgeo&utm_medium=maps-desktop&utm_source=serp&z=16">
              <div className="bg-white p-3 rounded-md shadow-md hover:bg-[#d2d2d3] transition duration-200">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/684/684908.png"
                  alt="Location"
                  className="w-6 h-6"
                />
              </div>
            </a>
          </div>

          <div className="md:text-right text-center">
            <ul className="font-medium">
              {[
                {
                  label: "Прайс-лист",
                  link: "https://www.pathologica.ru/_files/ugd/e6f22e_d371d0de6e2144aa85cee85e8fabad35.xlsx?dn=%D0%9F%D1%80%D0%B0%D0%B9%D1%81-%D0%BB%D0%B8%D1%81%D1%82%20PathoLogica%20Service%202023.xlsx",
                },
                {
                  label: "Договор оферты PathoLogica Service",
                  link: "https://www.pathologica.ru/_files/ugd/e6f22e_3e003dfa06314794a42c786dae674465.pdf",
                },

                {
                  label: "Условия использования",
                  link: "https://www.pathologica.ru/terms-of-use",
                },
                {
                  label: "Политика конфиденциальности",
                  link: "https://www.pathologica.ru/privacy-policy",
                },
              ].map((item, index) => (
                <li
                  key={index}
                  className=" hover:underline text-lg lg:text-[1.35rem] font-[650] cursor-pointer"
                >
                  <a href={item.link} className="text-white ">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-4  text-blue-950 bg-white py-2 font-bold text-sm">
        © 2025 Все права защищены
      </div>
    </footer>
  );
};

export default Footer;
