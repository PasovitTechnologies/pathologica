import React from "react";

const FormScreen4 = ({ formData, handleChange, errors }) => {
  const deliveryOptions = [
    "Курьером",
    "Самостоятельно (в наш офис)",
  ];

  // Function to render the conditional text based on relationToPatient and deliveryMethod
  const renderConditionalText = () => {
    // Only show for consultation types other than "Консультация Патолога"
    if (formData.consultationType === "Консультация Патолога") {
      return null;
    }

    // Condition 1: Patient + Courier
    if (
      formData.relationToPatient === "Я пациент" &&
      formData.deliveryMethod === "Курьером"
    ) {
      return (
        <p className="text-sm text-[#3097a9] italic mb-2">
          Вам необходимо заполнить{" "}
          <a
            href="https://healthdirectru-my.sharepoint.com/personal/office_health-direct_info/_layouts/15/onedrive.aspx?id=%2Fpersonal%2Foffice_health-direct_info%2FDocuments%2FPathoLogica%20form%2F%D0%94%D0%BE%D0%B1%D1%80%D0%BE%D0%B2%D0%BE%D0%BB%D1%8C%D0%BD%D0%BE%D0%B5%20%D1%81%D0%BE%D0%B3%D0%BB%D0%B0%D1%81%D0%B8%D0%B5%2Epdf&parent=%2Fpersonal%2Foffice_health-direct_info%2FDocuments%2FPathoLogica%20form&ga=1"
            className="underline text-[#3097a9]"
            target="_blank"
            rel="noopener noreferrer"
          >
            Информированное добровольное согласие.
          </a>{" "}
          Обязательно передайте курьеру оригиналы данных документов вместе с материалом.
        </p>
      );
    }

    // Condition 2: Trusted Person + Courier
    if (
      formData.relationToPatient === "Я доверенное лицо" &&
      formData.deliveryMethod === "Курьером"
    ) {
      return (
        <p className="text-sm text-[#3097a9] italic mb-2">
          Пациенту необходимо заполнить{" "}
          <a
            href="https://healthdirectru-my.sharepoint.com/personal/office_health-direct_info/_layouts/15/onedrive.aspx?id=%2Fpersonal%2Foffice_health-direct_info%2FDocuments%2FPathoLogica%20form%2F%D0%A1%D0%BE%D0%B3%D0%BB%D0%B0%D1%81%D0%B8%D0%B5%20%D0%B8%20%D0%B4%D0%BE%D0%B2%D0%B5%D1%80%D0%B5%D0%BD%D0%BD%D0%BE%D1%81%D1%82%D1%8C%2Epdf&parent=%2Fpersonal%2Foffice_health-direct_info%2FDocuments%2FPathoLogica%20form&ga=1"
            className="underline text-[#3097a9]"
            target="_blank"
            rel="noopener noreferrer"
          >
            Информированное добровольное согласие и Доверенность.
          </a>{" "}
          Обязательно передайте курьеру оригиналы данных документов вместе с материалом.
        </p>
      );
    }

    // Condition 3: Patient + On Your Own (To Our Office)
    if (
      formData.relationToPatient === "Я пациент" &&
      formData.deliveryMethod === "Самостоятельно (в наш офис)"
    ) {
      return (
        <p className="text-sm text-[#3097a9] italic mb-2">
          Вам необходимо заполнить{" "}
          <a
            href="https://healthdirectru-my.sharepoint.com/personal/office_health-direct_info/_layouts/15/onedrive.aspx?id=%2Fpersonal%2Foffice_health-direct_info%2FDocuments%2FPathoLogica%20form%2F%D0%94%D0%BE%D0%B1%D1%80%D0%BE%D0%B2%D0%BE%D0%BB%D1%8C%D0%BD%D0%BE%D0%B5%20%D1%81%D0%BE%D0%B3%D0%BB%D0%B0%D1%81%D0%B8%D0%B5%2Epdf&parent=%2Fpersonal%2Foffice_health-direct_info%2FDocuments%2FPathoLogica%20form&ga=1"
            className="underline text-[#3097a9]"
            target="_blank"
            rel="noopener noreferrer"
          >
            Информированное добровольное согласие.
          </a>{" "}
          Обязательно возьмите данные документы вместе со всеми материалами с собой в наш офис.
        </p>
      );
    }

    // Condition 4: Trusted Person + On Your Own (To Our Office)
    if (
      formData.relationToPatient === "Я доверенное лицо" &&
      formData.deliveryMethod === "Самостоятельно (в наш офис)"
    ) {
      return (
        <p className="text-sm text-[#3097a9] italic mb-2">
          Пациенту необходимо заполнить{" "}
          <a
            href="https://healthdirectru-my.sharepoint.com/personal/office_health-direct_info/_layouts/15/onedrive.aspx?id=%2Fpersonal%2Foffice_health-direct_info%2FDocuments%2FPathoLogica%20form%2F%D0%A1%D0%BE%D0%B3%D0%BB%D0%B0%D1%81%D0%B8%D0%B5%20%D0%B8%20%D0%B4%D0%BE%D0%B2%D0%B5%D1%80%D0%B5%D0%BD%D0%BD%D0%BE%D1%81%D1%82%D1%8C%2Epdf&parent=%2Fpersonal%2Foffice_health-direct_info%2FDocuments%2FPathoLogica%20form&ga=1"
            className="underline text-[#3097a9]"
            target="_blank"
            rel="noopener noreferrer"
          >
            Информированное добровольное согласие и Доверенность.
          </a>{" "}
          Обязательно возьмите данные документы вместе со всеми материалами с собой в наш офис.
        </p>
      );
    }

    return null; // Return null if none of the conditions match
  };

  return (
    <div className="p-3 md:p-6 text-left text-[1.1rem]">
      <h2 className="text-3xl font-semibold text-[#08788b] mb-6">
        Итоговая информация
      </h2>

      <div className="mb-6">
        <label className="block text-[#08788b] text-[1.4rem] mb-1">
          Способ доставки <span className="text-red-500">*</span>
        </label>
        <select
          value={formData.deliveryMethod || ""}
          onChange={(e) => handleChange("deliveryMethod", e.target.value)}
          className="w-full md:w-[50%] shadow-md shadow-black/30 p-2 border bg-[#d5e6e9] border-none rounded"
          required
        >
          <option value="" disabled>
            Выберите способ доставки
          </option>
          {deliveryOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {errors.deliveryMethod && (
          <p className="text-red-500 text-sm italic mt-1">{errors.deliveryMethod}</p>
        )}
      </div>

      {formData.deliveryMethod === "Курьером" && (
        <div className="mb-6">
          <label className="block text-[#08788b] text-[1.4rem] mb-1">
            Адрес доставки <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Город"
              value={formData.city || ""}
              onChange={(e) => handleChange("city", e.target.value)}
              className="w-full shadow-md shadow-black/30 p-2 border bg-[#d5e6e9] border-none rounded"
              required
            />
            <input
              type="text"
              placeholder="Улица"
              value={formData.street || ""}
              onChange={(e) => handleChange("street", e.target.value)}
              className="w-full shadow-md shadow-black/30 p-2 border bg-[#d5e6e9] border-none rounded"
              required
            />
            <input
              type="text"
              placeholder="Дом"
              value={formData.house || ""}
              onChange={(e) => handleChange("house", e.target.value)}
              className="w-full shadow-md shadow-black/30 p-2 border bg-[#d5e6e9] border-none rounded"
              required
            />
            <input
              type="text"
              placeholder="Квартира"
              value={formData.apartment || ""}
              onChange={(e) => handleChange("apartment", e.target.value)}
              className="w-full shadow-md shadow-black/30 p-2 border bg-[#d5e6e9] border-none rounded"
              required
            />
          </div>
          {errors.deliveryAddress && (
            <p className="text-red-500 text-sm italic mt-1">{errors.deliveryAddress}</p>
          )}
        </div>
      )}

      <div className="mb-6">
        <label className="block text-[#08788b] text-[1.4rem] mb-1">
          Комментарий к заявке
        </label>
        <textarea
          value={formData.comment || ""}
          onChange={(e) => handleChange("comment", e.target.value)}
          className="w-full shadow-md shadow-black/30 p-2 border bg-[#d5e6e9] border-none rounded resize h-20"
        />
      </div>

      {/* Conditional Text Above Consent Checkbox */}
      {renderConditionalText()}

      <div className="mb-6">
        <label className="flex items-center text-[#08788b] text-[1.4rem]">
          <input
            type="checkbox"
            checked={formData.consentGiven || false}
            onChange={(e) => handleChange("consentGiven", e.target.checked)}
            className="mr-2"
          />
          Я даю согласие на обработку персональных данных{" "}
          <span className="text-red-500">*</span>
        </label>
        {errors.consentGiven && (
          <p className="text-red-500 text-sm italic mt-1">{errors.consentGiven}</p>
        )}
      </div>
    </div>
  );
};

export default FormScreen4;