import React from "react";

const FormScreenPathologistFinal = ({ formData, handleChange, errors }) => {
  return (
    <div className="p-3 md:p-6 text-left text-[1.1rem]">
      <div className="mb-6">
        <h3 className="block text-[#08788b] text-[1.45rem]">
          Стоимость консультации
        </h3>
        <div className="flex items-center">
          <input
            type="text"
            value="15 000 рублей"
            className="w-full md:w-[50%] shadow-md shadow-black/30 p-2 border bg-[#d5e6e9] border-none rounded"
            readOnly
          />
        </div>
      </div>

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

      <div className="mb-6">
        <label className="flex items-center text-[#08788b] text-[1.4rem]">
          <input
            type="checkbox"
            checked={formData.consentGiven || false}
            onChange={(e) => handleChange("consentGiven", e.target.checked)}
            className="mr-2"
            required
          />
          Я согласен на обработку персональных данных <span className="text-red-500">*</span>
        </label>
        {errors.consentGiven && (
          <p className="text-red-500 text-sm italic mt-1">{errors.consentGiven}</p>
        )}
      </div>
    </div>
  );
};

export default FormScreenPathologistFinal;