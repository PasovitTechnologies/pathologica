import React from "react";
import ApplyForm from "../components/ApplyComponents/ApplyForm";

const Apply = () => {
  return (
    <section className="relative py-10">
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: `url('https://static.wixstatic.com/media/a31a5a_e99bbbf837484c6eb2a4ff285508b4db~mv2.jpg')`,
        }}
      ></div>

      <div className="absolute inset-0 bg-gray-200/70 -z-10"></div>
      <div className="relative  max-w-4xl text-center mx-auto">
        <h2 className="text-[2.6rem] sm:text-[2.85rem] font-bold  mb-4">
          ЗАЯВКА НА ИССЛЕДОВАНИЕ
        </h2>
        <h5 className=" px-2 text-[1.07rem]">
          Для заказа цитологического и/или гистологического исследования,
          необходимо оформить заявку на нашем сайте, для этого Вам нужно указать
          всю необходимую информацию о текущем заболевании, прикрепить имеющиеся
          документы, заполнить данные для доставки, а также выбрать способ
          оплаты. Также Вы можете оформить заявку с помощью менеджера
          PathoLogica Service в нашем офисе.
        </h5>
        <ApplyForm />
      </div>
    </section>
  );
};

export default Apply;
