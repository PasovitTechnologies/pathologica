import React from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const FormScreenTrustee = ({ formData, handleChange, errors }) => {
  return (
    <div className="p-3 md:p-6 text-left text-[1.1rem]">
      <h2 className="text-3xl font-semibold text-[#08788b] mb-6">
        Данные доверенного лица
      </h2>

      <div className="mb-6">
        <label className="block text-[#08788b] text-[1.4rem] mb-1">
          Фамилия доверенного лица <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={formData.trusteeSurname || ""}
          onChange={(e) => handleChange("trusteeSurname", e.target.value)}
          className="w-full md:w-[50%] shadow-md shadow-black/30 p-2 border bg-[#d5e6e9] border-none rounded"
          required
        />
        {errors.trusteeSurname && (
          <p className="text-red-500 text-sm italic mt-1">{errors.trusteeSurname}</p>
        )}
      </div>

      <div className="mb-6">
        <label className="block text-[#08788b] text-[1.4rem] mb-1">
          Имя доверенного лица <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={formData.trusteeName || ""}
          onChange={(e) => handleChange("trusteeName", e.target.value)}
          className="w-full md:w-[50%] shadow-md shadow-black/30 p-2 border bg-[#d5e6e9] border-none rounded"
          required
        />
        {errors.trusteeName && (
          <p className="text-red-500 text-sm italic mt-1">{errors.trusteeName}</p>
        )}
      </div>

      <div className="mb-6">
        <label className="block text-[#08788b] text-[1.4rem] mb-1">
          Отчество доверенного лица
        </label>
        <input
          type="text"
          value={formData.trusteePatronymic || ""}
          onChange={(e) => handleChange("trusteePatronymic", e.target.value)}
          className="w-full md:w-[50%] shadow-md shadow-black/30 p-2 border bg-[#d5e6e9] border-none rounded"
        />
      </div>

      <div className="mb-6">
        <label className="block text-[#08788b] text-[1.4rem] mb-1">
          Контактный номер доверенного лица <span className="text-red-500">*</span>
        </label>
        <PhoneInput
          country={"ru"}
          value={formData.trusteePhoneNumber || ""}
          onChange={(phone) => handleChange("trusteePhoneNumber", phone)}
          inputClass="!w-full md:!w-[50%] !rounded !shadow-md !shadow-black/30 !border-none !bg-[#d5e6e9] !p-5.5 !text-black !pl-10"
          buttonClass="!bg-[#d5e6e9] !border-none"
          dropdownClass="!bg-white !text-black !shadow-lg"
          containerClass="w-full md:w-[50%]"
          enableSearch
        />
        <div className="text-xs text-gray-500 mt-1 italic">
          Номер телефона доверенного лица
        </div>
        {errors.trusteePhoneNumber && (
          <p className="text-red-500 text-sm italic mt-1">{errors.trusteePhoneNumber}</p>
        )}
      </div>

      <div className="mb-6">
        <label className="block text-[#08788b] text-[1.4rem] mb-1">
          Электронная почта доверенного лица <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          value={formData.trusteeEmail || ""}
          onChange={(e) => handleChange("trusteeEmail", e.target.value)}
          className="w-full md:w-[50%] shadow-md shadow-black/30 p-2 border bg-[#d5e6e9] border-none rounded"
          required
        />
        {errors.trusteeEmail && (
          <p className="text-red-500 text-sm italic mt-1">{errors.trusteeEmail}</p>
        )}
      </div>
    </div>
  );
};

export default FormScreenTrustee;