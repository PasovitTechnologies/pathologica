import React from "react";

const FormScreen1 = ({ formData, handleChange, errors }) => {
  console.log("FormScreen1 Render - formData:", formData);

  const renderCategoryOptions = () => {
    console.log("renderCategoryOptions - consultationType:", formData.consultationType);
    console.log("renderCategoryOptions - researchCategory:", formData.researchCategory);

    switch (formData.consultationType) {
      case "Цитологическое исследование":
        return (
          <div key="cytological">
            <div className="flex items-center mb-2">
              <input
                type="radio"
                id="primaryCyto"
                name="researchCategory"
                checked={
                  formData.researchCategory ===
                  "Первичное цитологическое исследование"
                }
                onChange={() =>
                  handleChange(
                    "researchCategory",
                    "Первичное цитологическое исследование"
                  )
                }
                className="mr-2"
              />
              <label htmlFor="primaryCyto">
                Первичное цитологическое исследование
              </label>
            </div>
            <div className="flex items-center mb-2">
              <input
                type="radio"
                id="expertPrimaryCyto"
                name="researchCategory"
                checked={
                  formData.researchCategory ===
                  "Экспертное первичное цитологическое исследование"
                }
                onChange={() =>
                  handleChange(
                    "researchCategory",
                    "Экспертное первичное цитологическое исследование"
                  )
                }
                className="mr-2"
              />
              <label htmlFor="expertPrimaryCyto">
                Экспертное первичное цитологическое исследование
              </label>
            </div>
            <div className="flex items-center mb-2">
              <input
                type="radio"
                id="consultativeReviewCyto"
                name="researchCategory"
                checked={
                  formData.researchCategory ===
                  "Консультативный пересмотр готовых цитологических препаратов"
                }
                onChange={() =>
                  handleChange(
                    "researchCategory",
                    "Консультативный пересмотр готовых цитологических препаратов"
                  )
                }
                className="mr-2"
              />
              <label htmlFor="consultativeReviewCyto">
                Консультативный пересмотр готовых цитологических препаратов{" "}
              </label>
            </div>
            <div className="flex items-center mb-2">
              <input
                type="radio"
                id="expertReviewCyto"
                name="researchCategory"
                checked={
                  formData.researchCategory ===
                  "Экспертный пересмотр готовых цитологических препаратов"
                }
                onChange={() =>
                  handleChange(
                    "researchCategory",
                    "Экспертный пересмотр готовых цитологических препаратов"
                  )
                }
                className="mr-2"
              />
              <label htmlFor="expertReviewCyto">
                Экспертный пересмотр готовых цитологических препаратов{" "}
              </label>
            </div>
          </div>
        );
      case "Гистологическое исследование":
        return (
          <div key="histological">
            <div className="flex items-center mb-2">
              <input
                type="radio"
                id="primaryHisto"
                name="researchCategory"
                checked={
                  formData.researchCategory ===
                  "Первичное гистологическое исследование"
                }
                onChange={() =>
                  handleChange(
                    "researchCategory",
                    "Первичное гистологическое исследование"
                  )
                }
                className="mr-2"
              />
              <label htmlFor="primaryHisto">
                Первичное гистологическое исследование
              </label>
            </div>
            <div className="flex items-center mb-2">
              <input
                type="radio"
                id="expertPrimaryHisto"
                name="researchCategory"
                checked={
                  formData.researchCategory ===
                  "Экспертное первичное гистологическое исследование"
                }
                onChange={() =>
                  handleChange(
                    "researchCategory",
                    "Экспертное первичное гистологическое исследование"
                  )
                }
                className="mr-2"
              />
              <label htmlFor="expertPrimaryHisto">
                Экспертное первичное гистологическое исследование
              </label>
            </div>
            <div className="flex items-center mb-2">
              <input
                type="radio"
                id="consultativeReviewHisto"
                name="researchCategory"
                checked={
                  formData.researchCategory ===
                  "Консультативный пересмотр готовых гистологических препаратов"
                }
                onChange={() =>
                  handleChange(
                    "researchCategory",
                    "Консультативный пересмотр готовых гистологических препаратов"
                  )
                }
                className="mr-2"
              />
              <label htmlFor="consultativeReviewHisto">
                Консультативный пересмотр готовых гистологических препаратов
              </label>
            </div>
            <div className="flex items-center mb-2">
              <input
                type="radio"
                id="expertReviewHisto"
                name="researchCategory"
                checked={
                  formData.researchCategory ===
                  "Экспертный пересмотр готовых гистологических препаратов"
                }
                onChange={() =>
                  handleChange(
                    "researchCategory",
                    "Экспертный пересмотр готовых гистологических препаратов"
                  )
                }
                className="mr-2"
              />
              <label htmlFor="expertReviewHisto">
                Экспертный пересмотр готовых гистологических препаратов{" "}
              </label>
            </div>
          </div>
        );
      case "Комплексное исследование":
        return (
          <div key="complex">
            <div className="flex items-center mb-2">
              <input
                type="radio"
                id="complexPrimary"
                name="researchCategory"
                checked={
                  formData.researchCategory ===
                  "Комплексное исследование: первичные цитологическое и гистологическое исследования"
                }
                onChange={() =>
                  handleChange(
                    "researchCategory",
                    "Комплексное исследование: первичные цитологическое и гистологическое исследования"
                  )
                }
                className="mr-2"
              />
              <label htmlFor="complexPrimary">
                Комплексное исследование: первичные цитологическое и
                гистологическое исследования
              </label>
            </div>
            <div className="flex items-center mb-2">
              <input
                type="radio"
                id="expertComplexPrimary"
                name="researchCategory"
                checked={
                  formData.researchCategory ===
                  "Экспертное комплексное исследование: первичные цитологическое и гистологическое исследования"
                }
                onChange={() =>
                  handleChange(
                    "researchCategory",
                    "Экспертное комплексное исследование: первичные цитологическое и гистологическое исследования"
                  )
                }
                className="mr-2"
              />
              <label htmlFor="expertComplexPrimary">
                Экспертное комплексное исследование: первичные цитологическое и
                гистологическое исследования
              </label>
            </div>
            <div className="flex items-center mb-2">
              <input
                type="radio"
                id="consultativeReviewComplex"
                name="researchCategory"
                checked={
                  formData.researchCategory ===
                  "Консультативный пересмотр комплекса: цитологического и гистологического исследований"
                }
                onChange={() =>
                  handleChange(
                    "researchCategory",
                    "Консультативный пересмотр комплекса: цитологического и гистологического исследований"
                  )
                }
                className="mr-2"
              />
              <label htmlFor="consultativeReviewComplex">
                Консультативный пересмотр комплекса: цитологического и
                гистологического исследований
              </label>
            </div>
            <div className="flex items-center mb-2">
              <input
                type="radio"
                id="expertReviewComplex"
                name="researchCategory"
                checked={
                  formData.researchCategory ===
                  "Экспертный пересмотр комплексного исследования: цитологического и гистологического исследований"
                }
                onChange={() =>
                  handleChange(
                    "researchCategory",
                    "Экспертный пересмотр комплексного исследования: цитологического и гистологического исследований"
                  )
                }
                className="mr-2"
              />
              <label htmlFor="expertReviewComplex">
                Экспертный пересмотр комплексного исследования: цитологического
                и гистологического исследований
              </label>
            </div>
          </div>
        );
      case "Консультация Патолога":
        return null; // No research category options for pathologist consultation
      default:
        return null;
    }
  };

  const handleChangeWithReset = (field, value) => {
    console.log(`handleChangeWithReset - field: ${field}, value: ${value}`);
    if (field === "consultationType") {
      console.log("Resetting researchCategory due to consultationType change");
      handleChange("researchCategory", null);
    }
    handleChange(field, value);
  };

  return (
    <div className="p-3 md:p-6 text-left text-[1.1rem]">
      <div className="mb-6">
        <label className="block text-[#08788b] text-[1.4rem] mb-1">
          Кем Вы приходитесь пациенту? <span className="text-red-500">*</span>
        </label>
        <div className="flex items-center mb-2">
          <input
            type="radio"
            id="selfPatient"
            name="relationToPatient"
            checked={formData.relationToPatient === "Я пациент"}
            onChange={() => handleChangeWithReset("relationToPatient", "Я пациент")}
            className="mr-2"
          />
          <label htmlFor="selfPatient">Я пациент</label>
        </div>
        <div className="flex items-center">
          <input
            type="radio"
            id="representative"
            name="relationToPatient"
            checked={formData.relationToPatient === "Я доверенное лицо"}
            onChange={() => handleChangeWithReset("relationToPatient", "Я доверенное лицо")}
            className="mr-2"
          />
          <label htmlFor="representative">Я доверенное лицо</label>
        </div>
        {errors.relationToPatient && (
          <p className="text-red-500 text-sm italic mt-1">
            {errors.relationToPatient}
          </p>
        )}
      </div>

      <div className="mb-6">
        <label className="block text-[#08788b] text-[1.4rem] mb-1">
          Вид консультации <span className="text-red-500">*</span>
        </label>
        <div className="flex items-center mb-2">
          <input
            type="radio"
            id="cytological"
            name="consultationType"
            checked={formData.consultationType === "Цитологическое исследование"}
            onChange={() =>
              handleChangeWithReset("consultationType", "Цитологическое исследование")
            }
            className="mr-2"
          />
          <label htmlFor="cytological">Цитологическое исследование</label>
        </div>
        <div className="flex items-center mb-2">
          <input
            type="radio"
            id="histological"
            name="consultationType"
            checked={formData.consultationType === "Гистологическое исследование"}
            onChange={() =>
              handleChangeWithReset("consultationType", "Гистологическое исследование")
            }
            className="mr-2"
          />
          <label htmlFor="histological">Гистологическое исследование</label>
        </div>
        <div className="flex items-center mb-2">
          <input
            type="radio"
            id="complex"
            name="consultationType"
            checked={formData.consultationType === "Комплексное исследование"}
            onChange={() =>
              handleChangeWithReset("consultationType", "Комплексное исследование")
            }
            className="mr-2"
          />
          <label htmlFor="complex">Комплексное исследование</label>
        </div>
        <div className="flex items-center">
          <input
            type="radio"
            id="pathologistConsultation"
            name="consultationType"
            checked={formData.consultationType === "Консультация Патолога"}
            onChange={() =>
              handleChangeWithReset("consultationType", "Консультация Патолога")
            }
            className="mr-2"
          />
          <label htmlFor="pathologistConsultation">Консультация Патолога</label>
        </div>
        {errors.consultationType && (
          <p className="text-red-500 text-sm italic mt-1">
            {errors.consultationType}
          </p>
        )}
      </div>

      <div className="mb-6 text-sm italic">
        Вы можете узнать подробную информацию о предоставляемых услугах{" "}
        <a
          href="/our-services"
          className="underline text-blue-500 hover:underline"
        >
          на нашем сайте
        </a>
        .
      </div>

      {formData.consultationType &&
        formData.consultationType !== "Консультация Патолога" && (
          <div className="mb-6" key={formData.consultationType}>
            <label className="block text-[#08788b] text-[1.4rem] mb-1">
              Категория исследования <span className="text-red-500">*</span>
            </label>
            {renderCategoryOptions()}
            {errors.researchCategory && (
              <p className="text-red-500 text-sm italic mt-1">
                {errors.researchCategory}
              </p>
            )}
          </div>
        )}
    </div>
  );
};

export default FormScreen1;