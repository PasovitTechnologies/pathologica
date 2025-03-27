import React from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const FormScreen2 = ({ formData, handleChange, errors }) => {
  const calculateAge = (birthDate) => {
    if (!birthDate) return "";

    const dob = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      age--;
    }

    return age;
  };

  const handleDobChange = (e) => {
    const dob = e.target.value;
    handleChange("dateOfBirth", dob);

    const calculatedAge = calculateAge(dob);
    handleChange("age", calculatedAge.toString());
  };

  const handlePhoneChange = (phone) => {
    // Ensure phone number is not empty
    handleChange("phoneNumber", phone || "");
  };

  return (
    <div className="p-3 md:p-6 text-left text-[1.1rem]">
      <h2 className="text-3xl font-semibold text-[#08788b] mb-6">
        Данные пациента
      </h2>

      <div className="mb-6">
        <label className="block text-[#08788b] text-[1.4rem] mb-1">
          Фамилия пациента <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={formData.lastName || ""}
          onChange={(e) => handleChange("lastName", e.target.value.trim())}
          className="w-full md:w-[50%] shadow-md shadow-black/30 p-2 border bg-[#d5e6e9] border-none rounded"
          required
        />
        {errors.lastName && (
          <p className="text-red-500 text-sm italic mt-1">{errors.lastName}</p>
        )}
      </div>

      <div className="mb-6">
        <label className="block text-[#08788b] text-[1.4rem] mb-1">
          Имя пациента <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={formData.firstName || ""}
          onChange={(e) => handleChange("firstName", e.target.value.trim())}
          className="w-full md:w-[50%] shadow-md shadow-black/30 p-2 border bg-[#d5e6e9] border-none rounded"
          required
        />
        {errors.firstName && (
          <p className="text-red-500 text-sm italic mt-1">{errors.firstName}</p>
        )}
      </div>

      <div className="mb-6">
        <label className="block text-[#08788b] text-[1.4rem] mb-1">
          Отчество пациента
        </label>
        <input
          type="text"
          value={formData.middleName || ""}
          onChange={(e) => handleChange("middleName", e.target.value.trim())}
          className="w-full md:w-[50%] shadow-md shadow-black/30 p-2 border bg-[#d5e6e9] border-none rounded"
        />
      </div>

      <div className="mb-6">
        <label className="block text-[#08788b] text-[1.4rem] mb-1">
          Пол <span className="text-red-500">*</span>
        </label>
        <div className="flex items-center mb-2">
          <input
            type="radio"
            id="male"
            name="gender"
            value="Мужской"
            checked={formData.gender === "Мужской"}
            onChange={(e) => handleChange("gender", e.target.value)}
            className="mr-2"
            required
          />
          <label htmlFor="male">Мужской</label>
        </div>
        <div className="flex items-center">
          <input
            type="radio"
            id="female"
            name="gender"
            value="Женский"
            checked={formData.gender === "Женский"}
            onChange={(e) => handleChange("gender", e.target.value)}
            className="mr-2"
          />
          <label htmlFor="female">Женский</label>
        </div>
        {errors.gender && (
          <p className="text-red-500 text-sm italic mt-1">{errors.gender}</p>
        )}
      </div>

      <div className="mb-6">
        <label className="block text-[#08788b] text-[1.4rem] mb-1">
          Дата рождения <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            type="date"
            value={formData.dateOfBirth || ""}
            onChange={handleDobChange}
            className="w-full md:w-[50%] shadow-md shadow-black/30 p-2 border bg-[#d5e6e9] border-none rounded"
            placeholder="дд/мм/гггг"
            required
          />
          <div className="text-xs text-gray-500 mt-1 italic">dd.MM.yyyy</div>
        </div>
        {errors.dateOfBirth && (
          <p className="text-red-500 text-sm italic mt-1">{errors.dateOfBirth}</p>
        )}
      </div>

      <div className="mb-6">
        <label className="block text-[#08788b] text-[1.4rem] mb-1">
          Возраст
        </label>
        <input
          type="number"
          value={formData.age || ""}
          onChange={(e) => handleChange("age", e.target.value)}
          className="w-full md:w-[50%] shadow-md shadow-black/30 p-2 border bg-[#d5e6e9] border-none rounded"
          readOnly
        />
      </div>

      <div className="mb-6">
        <label className="block text-[#08788b] text-[1.4rem] mb-1">
          Контактный номер пациента <span className="text-red-500">*</span>
        </label>
        <PhoneInput
          country={"ru"}
          value={formData.phoneNumber || ""}
          onChange={handlePhoneChange}
          inputClass="!w-full md:!w-[50%] !rounded !shadow-md !shadow-black/30 !border-none !bg-[#d5e6e9] !p-5.5 !text-black !pl-10"
          buttonClass="!bg-[#d5e6e9] !border-none"
          dropdownClass="!bg-white !text-black !shadow-lg"
          containerClass="w-full md:w-[50%]"
          enableSearch
          inputProps={{
            required: true,
          }}
        />
        <div className="text-xs text-gray-500 mt-1 italic">
          Номер телефона пациента
        </div>
        {errors.phoneNumber && (
          <p className="text-red-500 text-sm italic mt-1">{errors.phoneNumber}</p>
        )}
      </div>

      <div className="mb-6">
        <label className="block text-[#08788b] text-[1.4rem] mb-1">
          Электронная почта пациента <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          value={formData.email || ""}
          onChange={(e) => handleChange("email", e.target.value.trim())}
          className="w-full md:w-[50%] shadow-md shadow-black/30 p-2 border bg-[#d5e6e9] border-none rounded"
          required
        />
        {errors.email && (
          <p className="text-red-500 text-sm italic mt-1">{errors.email}</p>
        )}
      </div>
    </div>
  );
};

export default FormScreen2;