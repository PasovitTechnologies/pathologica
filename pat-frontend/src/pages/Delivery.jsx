const steps = [
  {
    imgSrc:
      "https://static.wixstatic.com/media/e6f22e_3bcc6aeb4ca7482b93fec43c700fdf3b~mv2.png", // Replace with actual image path
    title: "1 шаг. Подать заявку",
    description:
      "Для заказа цитологического и/или гистологического исследования, необходимо оформить <a href='/apply' class='underline text-blue-500'>Заявку</a> на нашем сайте, для этого Вам нужно указать всю необходимую информацию о текущем заболевании, прикрепить имеющиеся документы, заполнить данные для доставки. А также распечатать и заполнить собственноручно Приложение №1 Агентского договора (публичной оферты) №3 от 02.05.2022. Вы также можете оформить заявку с помощью менеджера PathoLogica Service в нашем офисе.",
  },
  {
    imgSrc:
      "https://static.wixstatic.com/media/e6f22e_bfae0ae67b2146e1b8523d3dd02784e5~mv2.png",
    title: "2 шаг. Оплатить исследование",
    description:
      "После заполнения заявки на сайте на указанную Вами электронную почту придет письмо с ссылкой на оплату, перейдя по которой Вы сможете осуществить платеж. Оплата производиться через онлайн-сервис ROBOKASSA. Электронный кассовый чек придет Вам на почту, указанную при осуществлении платежа.",
  },
  {
    imgSrc:
      "https://static.wixstatic.com/media/e6f22e_43004800cc164b4e928b5ccda5763147~mv2.png",
    title: "3 шаг. Передать материалы и документы курьеру",
    description:
      "После заполнения заявки менеджер PathoLogica Service свяжется с Вами в рабочие часы для согласования даты и времени передачи материала и документов курьеру по указанному Вами адресу. При желании Вы можете самостоятельно доставить материалы в офис, предварительно связавшись с менеджерами PathoLogica Service.",
  },
  {
    imgSrc:
      "https://static.wixstatic.com/media/e6f22e_3384129c44e746ad87fb8efba982c64a~mv2.png",
    title: "4 шаг. Доставка",
    description:
      "Мы осуществляем бесплатную курьерскую доставку по всей России. Длительность доставки составляет 1–7 дней (в зависимости от удаленности населенного пункта от г. Москвы) курьерской службой <a href='https://dostavista.ru/?utm_source=google.com&utm_medium=organic&utm_campaign=google.com&utm_referrer=google.com' target='_blank' class='underline text-blue-500'>«Dostavista»</a> или <a href='https://www.cdek.ru/ru' target='_blank' class='underline text-blue-500'>«СДЭК»</a>.",
  },
  {
    imgSrc:
      "https://static.wixstatic.com/media/e6f22e_e00cd47f085c4bc6b31be05a83e91a41~mv2.png",
    title: "5 шаг. Проведение исследования",
    description:
      "Исследование проводится в течение 2–15 рабочих дней с момента оплаты, поступления материала и всей необходимой документации в лабораторию. Обратите внимание, что окончательная цена может быть изменена после проведения первого этапа исследования в зависимости от объема работы. При необходимости изготовления дополнительных блоков, стекол, дополнительного окрашивания, в том числе проведения ИГХ- и молекулярно-генетических исследований, цена может быть увеличена. Конечная стоимость исследования зависит от объема работы и будет согласована с Вами.",
  },
  {
    imgSrc:
      "https://static.wixstatic.com/media/e6f22e_a744ef7641854c9b90054b0aef73cee9~mv2.png",
    title: "6 шаг. Получение заключения и материала",
    description:
      "После завершения исследования мы отправим Вам оригинал заключения, материал и документы курьерской службой (<a href='https://dostavista.ru/?utm_source=google.com&utm_medium=organic&utm_campaign=google.com&utm_referrer=google.com' target='_blank' class='underline text-blue-500'>«Dostavista»</a>, <a href='https://www.cdek.ru/ru' target='_blank' class='underline text-blue-500'>«СДЭК»</a>). Копия заключения в формате PDF будет направлена Вам на электронную почту в день окончания исследования.",
  },
];

const Delivery = () => {
  return (
    <section className="relative py-10">
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: `url('https://static.wixstatic.com/media/a31a5a_e99bbbf837484c6eb2a4ff285508b4db~mv2.jpg')`,
        }}
      ></div>

      <div className="absolute inset-0 bg-gray-200/70 -z-10"></div>

      <div className="relative z-10 max-w-5xl px-4 md:px-10 mx-auto">
        <div className="max-w-5xl p-4 md:p-6 md:pl-4 mx-auto bg-white">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
            КАК ВОСПОЛЬЗОВАТЬСЯ УСЛУГАМИ PathoLogica Service
          </h2>
          <div className="grid gap-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row items-start md:items-center md:justify-between"
              >
                <div className="md:w-[18%] mx-auto">
                  <img
                    src={step.imgSrc}
                    alt={step.title}
                    className="w-32 h-32 object-contain mb-4 md:mb-0"
                  />
                </div>
                <div className="md:w-[80%]">
                  <h4 className="text-[1.1rem] font-semibold">
                    &nbsp; &nbsp; &nbsp; &nbsp; {step.title}
                  </h4>
                  <div
                    className="text-[0.95rem] text-justify mt-1.5 tracking-tight md:leading-7"
                    dangerouslySetInnerHTML={{ __html: step.description }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Delivery;
