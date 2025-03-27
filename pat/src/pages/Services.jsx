import React from "react";

// Export the services array as a named export
export const services = [
  {
    category: "Цитологическое исследование",
    items: [
      {
        title: "Первичное цитологическое исследование",
        description: "(до четырех стекол из одной локализации)",
        price: "10 000 рублей",
        extra: [
          { name: "Каждое дополнительное стекло", price: "300 рублей" },
          { name: "Каждая дополнительная локализация", price: "5 000 рублей" },
        ],
      },
      {
        title: "Экспертное первичное цитологическое исследование ",
        description: "(до четырех стекол из одной локализации)",
        price: "15 000 рублей",
        extra: [
          { name: "Каждое дополнительное стекло", price: "500 рублей" },
          { name: "Каждая дополнительная локализация", price: "7 000 рублей" },
        ],
      },
      {
        title: "Консультативный пересмотр готовых цитологических препаратов",
        description: "(до четырех стекол из одной локализации)",
        price: "9 000 рублей",
        extra: [
          { name: "Каждое дополнительное стекло", price: "300 рублей" },
          { name: "Каждая дополнительная локализация", price: "5 000 рублей" },
        ],
      },
      {
        title: "Экспертный пересмотр готовых цитологических препаратов",
        description: "(до четырех стекол из одной локализации)",
        price: "14 000 рублей",
        extra: [
          { name: "Каждое дополнительное стекло", price: "500 рублей" },
          { name: "Каждая дополнительная локализация", price: "7 000 рублей" },
        ],
      },
    ],
  },
  {
    category: "Гистологическое исследование",
    items: [
      {
        title: "Первичное гистологическое исследование",
        description: "(до трех контейнеров от одной операции)",
        price: "18 000 рублей",
        extra: [
          {
            name: "Изготовление каждого дополнительного стекла из блока (при необходимости)",
            price: "500 рублей",
          },
          { name: "Каждый дополнительный контейнер", price: "5 000 рублей" },
        ],
      },
      {
        title: "Экспертное первичное гистологическое исследование",
        description: "(до трех контейнеров от одной операции)",
        price: "22 000 рублей",
        extra: [
          {
            name: "Изготовление каждого дополнительного стекла из блока (при необходимости)",
            price: "500 рублей",
          },
          { name: "Каждый дополнительный контейнер", price: "5 000 рублей" },
        ],
      },
      {
        title: "Консультативный пересмотр готовых гистологических препаратов",
        description: "(до десяти стекол от одной операции)",
        price: "15 000 рублей",
        extra: [
          { name: "Каждое дополнительное готовое стекло", price: "300 рублей" },
        ],
      },
      {
        title: "Экспертный пересмотр готовых гистологических препаратов",
        description: "(до десяти стекол от одной операции)",
        price: "24 000 рублей",
        extra: [
          { name: "Каждое дополнительное готовое стекло", price: "500 рублей" },
        ],
      },
    ],
  },
  {
    category: "Комплексное исследование",
    items: [
      {
        title:
          "Комплексное исследование: первичные цитологическое и гистологическое исследования",
        description:
          "(до четырех цитологических стекол и трех контейнеров от одной операции)",
        price: "26 000 рублей",
        extra: [
          {
            name: "Каждое дополнительное готовое стекло ",
            price: "300 рублей",
          },
          { name: "Каждый дополнительный контейнер", price: "5 000 рублей" },
        ],
      },
      {
        title:
          "Экспертное комплексное исследование: первичные цитологическое и гистологическое исследования",
        description:
          "(до четырех цитологических стекол и трех контейнеров от одной операции)",
        price: "37 500 рублей",
        extra: [
          { name: "Каждое дополнительное готовое стекло", price: "500 рублей" },
          { name: "Каждый дополнительный контейнер", price: "7 000 рублей" },
        ],
      },
      {
        title:
          "Консультативный пересмотр комплекса: цитологического и гистологического исследований",
        description: "(до двадцати стекол)",
        price: "20 500 рублей",
        extra: [
          { name: "Каждое дополнительное готовое стекло", price: "300 рублей" },
          {
            name: "Изготовление каждого дополнительного стекла из блока (при необходимости)",
            price: "500 рублей",
          },
        ],
      },
      {
        title:
          "Экспертный пересмотр комплексного исследования: цитологического и гистологического исследований",
        description: "(до двадцати стекол)",
        price: "32 500 рублей",
        extra: [
          { name: "Каждое дополнительное готовое стекло", price: "500 рублей" },
          {
            name: "Изготовление каждого дополнительного стекла из блока (при необходимости) ",
            price: "500 рублей",
          },
        ],
      },
    ],
  },
  {
    category: "Консультация Патолога",
    items: [
      {
        title: "Консультация Патолога",
        price: "15 000 рублей",
      },
    ],
  },
];

const Services = () => {
  return (
    <section
      className="-z-10 relative pt-6 pb-8 md:pb-13 bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: `url('https://static.wixstatic.com/media/a31a5a_e99bbbf837484c6eb2a4ff285508b4db~mv2.jpg')`,
      }}
    >
      <div className="absolute inset-0 bg-gray-200/70"></div>
      <div className="relative max-w-4xl mx-auto px-4 md:px-0">
        <h2 className="text-2xl md:text-[2.85rem] tracking-tight font-bold text-center mb-2">
          Стоимость услуг
        </h2>
        <h3 className="text-center font-bold text-lg md:text-xl mb-6 md:mb-10">
          Для физических лиц:{" "}
        </h3>
        {services.map((service, index) => (
          <div key={index} className="mb-8 md:mb-12">
            <h3 className="text-xl md:text-2xl text-center font-semibold mb-6 md:mb-9">
              {service.category}
            </h3>
            <div className="space-y-4 md:space-y-0">
              {service.items.map((item, idx) => (
                <div
                  key={idx}
                  className="border shadow-md bg-white shadow-black/40 flex flex-col md:flex-row md:items-end"
                >
                  <div
                    className="w-full md:w-[82%] border-b md:border-b-0 md:border-r px-4 py-6 md:px-8 md:py-12"
                    style={{
                      boxShadow:
                        "inset 0 -10px 6px -10px rgba(0, 0, 0, 0.3) md:inset -10px 0 6px -10px rgba(0, 0, 0, 0.5)",
                    }}
                  >
                    <h4 className="text-base md:text-lg font-semibold">
                      {item.title}
                    </h4>
                    <p className="text-gray-600 italic text-sm md:text-base">
                      {item.description}
                    </p>
                    <p className="text-lg font-bold mt-2 md:hidden">
                      {item.price}
                    </p>
                    {item.extra && (
                      <ul className="mt-2 text-gray-700 text-sm md:text-base">
                        {item.extra.map((extraItem, i) => (
                          <li key={i} className="flex justify-between">
                            <span>{extraItem.name}</span>
                            <span className="font-semibold md:hidden">
                              {extraItem.price}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className="hidden w-full md:block md:w-[18%] px-3 md:px-5 py-4 md:py-10 text-right">
                    <p className="text-base md:text-lg mt-2 md:mt-4">
                      {item.price}
                    </p>
                    {item.extra && (
                      <ul className="mt-4 md:mt-6">
                        {item.extra.map((extraItem, i) => (
                          <li
                            key={i}
                            className="flex justify-end text-base md:text-lg"
                          >
                            <span>{extraItem.price}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;