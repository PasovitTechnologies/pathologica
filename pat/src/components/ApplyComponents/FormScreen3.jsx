import React from "react";

const FormScreen3 = ({ formData, handleChange, errors }) => {
  const shouldShowNumberOfLocalizations = () => {
    return [
      "Цитологическое исследование",
      "Гистологическое исследование",
      "Комплексное исследование",
    ].includes(formData.consultationType);
  };

  const shouldShowNumberOfContainers = () => {
    return [
      "Первичное гистологическое исследование",
      "Экспертное первичное гистологическое исследование",
      "Комплексное исследование: первичные цитологическое и гистологическое исследования",
      "Экспертное комплексное исследование: первичные цитологическое и гистологическое исследования",
    ].includes(formData.researchCategory);
  };

  const shouldShowNumberOfGlasses = () => {
    return (
      formData.consultationType === "Цитологическое исследование" || // Show for all cytological examinations
      (formData.consultationType === "Гистологическое исследование" && // Show for specific histological examinations
        [
          "Консультативный пересмотр готовых гистологических препаратов",
          "Экспертный пересмотр готовых гистологических препаратов",
        ].includes(formData.researchCategory)) ||
      [
        "Комплексное исследование: первичные цитологическое и гистологическое исследования",
        "Экспертное комплексное исследование: первичные цитологическое и гистологическое исследования",
        "Консультативный пересмотр комплекса: цитологического и гистологического исследований",
        "Экспертный пересмотр комплексного исследования: цитологического и гистологического исследований",
      ].includes(formData.researchCategory)
    );
  };

  const shouldShowNumberOfGlassesToBeMade = () => {
    return [
      "Консультативный пересмотр комплекса: цитологического и гистологического исследований",
      "Экспертное первичное гистологическое исследование",
      "Первичное гистологическое исследование",
      "Экспертный пересмотр комплексного исследования: цитологического и гистологического исследований",
    ].includes(formData.researchCategory);
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const updatedFiles = [...(formData.medicalFiles || []), ...selectedFiles];
    handleChange("medicalFiles", updatedFiles);
  };

  const handleRemoveFile = (index) => {
    const updatedFiles = (formData.medicalFiles || []).filter((_, i) => i !== index);
    handleChange("medicalFiles", updatedFiles);
  };

  const handleNumberChange = (field, value) => {
    let newValue = value === "" ? null : parseInt(value) || 0;
    if (field === "numberOfGlassesToBeMade") {
      newValue = newValue === null ? null : Math.max(0, newValue); // Allow null or 0
    } else {
      newValue = Math.max(1, newValue);
    }
    handleChange(field, newValue);
  };

  return (
    <div className="p-3 md:p-6 text-left text-[1.1rem]">
      <h2 className="text-3xl font-semibold text-[#08788b] mb-6">
        Медицинская информация
      </h2>

      <div className="mb-6">
        <label className="block text-[#08788b] text-[1.4rem] mb-1">
          Клинический диагноз <span className="text-red-500">*</span>
        </label>
        <textarea
          value={formData.clinicalDiagnosis || ""}
          onChange={(e) => handleChange("clinicalDiagnosis", e.target.value)}
          className="w-full shadow-md shadow-black/30 p-2 border bg-[#d5e6e9] border-none rounded resize h-20"
          required
        />
        {errors.clinicalDiagnosis && (
          <p className="text-red-500 text-sm italic mt-1">{errors.clinicalDiagnosis}</p>
        )}
      </div>

      {formData.consultationType === "Консультация Патолога" && (
        <div className="mb-6">
          <label className="block text-[#08788b] text-[1.4rem] mb-1">
            Если есть, пожалуйста, прикрепите фотографии или сканы медицинских записей, а также фотографии проявлений заболевания.
          </label>
          <div className="relative w-full md:w-[50%]">
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="w-full flex items-center justify-between p-2 bg-[#d5e6e9] border-none rounded shadow-md shadow-black/30 cursor-pointer hover:bg-[#c0d8db] transition-all duration-300"
            >
              <span className="text-[#08788b]">
                {(formData.medicalFiles || []).length > 0
                  ? `${(formData.medicalFiles || []).length} файл(ов) выбрано`
                  : "Выберите файлы"}
              </span>
              <span className="text-[#08788b] font-semibold">Обзор</span>
            </label>
          </div>
          {(formData.medicalFiles || []).length > 0 && (
            <div className="mt-2">
              <p className="text-[#08788b]">Выбранные файлы:</p>
              <ul className="list-disc pl-5">
                {(formData.medicalFiles || []).map((file, index) => (
                  <li key={index} className="text-[#08788b] flex items-center">
                    <span>{file.name}</span>
                    <button
                      onClick={() => handleRemoveFile(index)}
                      className="ml-2 text-red-500 hover:text-red-700"
                      title="Удалить файл"
                    >
                      ✕
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {shouldShowNumberOfLocalizations() && (
        <div className="mb-6">
          <label className="block text-[#08788b] text-[1.4rem] mb-1">
            Локализация процесса <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.processLocalization || ""}
            onChange={(e) => handleChange("processLocalization", e.target.value)}
            className="w-full md:w-[50%] shadow-md shadow-black/30 p-2 border bg-[#d5e6e9] border-none rounded"
            required
          />
          {errors.processLocalization && (
            <p className="text-red-500 text-sm italic mt-1">{errors.processLocalization}</p>
          )}
        </div>
      )}

      {formData.consultationType !== "Консультация Патолога" && (
        <div className="mb-6">
          <label className="block text-[#08788b] text-[1.4rem] mb-1">
            Способ получения материала (пункция, соскоб, отпечаток, биопсия, послеоперационный материал и т.д.):{" "}
            <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.materialCollectionMethod || ""}
            onChange={(e) => handleChange("materialCollectionMethod", e.target.value)}
            className="w-full md:w-[50%] shadow-md shadow-black/30 p-2 border bg-[#d5e6e9] border-none rounded"
            required
          />
          {errors.materialCollectionMethod && (
            <p className="text-red-500 text-sm italic mt-1">{errors.materialCollectionMethod}</p>
          )}
        </div>
      )}

      {shouldShowNumberOfLocalizations() && (
        <div className="mb-6">
          <label className="block text-[#08788b] text-[1.4rem] mb-1">
            Количество локализаций <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            min="1"
            value={formData.numberOfLocalizations || ""}
            onChange={(e) => handleNumberChange("numberOfLocalizations", e.target.value)}
            className="w-full md:w-[50%] shadow-md shadow-black/30 p-2 border bg-[#d5e6e9] border-none rounded"
            required
          />
          {errors.numberOfLocalizations && (
            <p className="text-red-500 text-sm italic mt-1">{errors.numberOfLocalizations}</p>
          )}
        </div>
      )}

      {shouldShowNumberOfContainers() && (
        <div className="mb-6">
          <label className="block text-[#08788b] text-[1.4rem] mb-1">
            Количество контейнеров от одной операции <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            min="1"
            value={formData.numberOfContainers || ""}
            onChange={(e) => handleNumberChange("numberOfContainers", e.target.value)}
            className="w-full md:w-[50%] shadow-md shadow-black/30 p-2 border bg-[#d5e6e9] border-none rounded"
            required
          />
          {errors.numberOfContainers && (
            <p className="text-red-500 text-sm italic mt-1">{errors.numberOfContainers}</p>
          )}
        </div>
      )}

      {shouldShowNumberOfGlasses() && (
        <div className="mb-6">
          <label className="block text-[#08788b] text-[1.4rem] mb-1">
            Количество стекол <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            min="1"
            value={formData.numberOfGlasses || ""}
            onChange={(e) => handleNumberChange("numberOfGlasses", e.target.value)}
            className="w-full md:w-[50%] shadow-md shadow-black/30 p-2 border bg-[#d5e6e9] border-none rounded"
            required
          />
          {errors.numberOfGlasses && (
            <p className="text-red-500 text-sm italic mt-1">{errors.numberOfGlasses}</p>
          )}
        </div>
      )}

      {shouldShowNumberOfGlassesToBeMade() && (
        <div className="mb-6">
          <label className="block text-[#08788b] text-[1.4rem] mb-1">
            Количество стекол, которые необходимо изготовить
          </label>
          <input
            type="number"
            min="0"
            value={formData.numberOfGlassesToBeMade ?? ""}
            onChange={(e) => handleNumberChange("numberOfGlassesToBeMade", e.target.value)}
            className="w-full md:w-[50%] shadow-md shadow-black/30 p-2 border bg-[#d5e6e9] border-none rounded"
          />
          {errors.numberOfGlassesToBeMade && (
            <p className="text-red-500 text-sm italic mt-1">{errors.numberOfGlassesToBeMade}</p>
          )}
        </div>
      )}

      {formData.consultationType !== "Консультация Патолога" && (
        <>
          <div className="mb-6">
            <h3 className="block text-[#08788b] text-[1.45rem]">
              ЦЕНА ИССЛЕДОВАНИЯ
            </h3>
            <p className="text-sm text-[#3097a9] leading-4.5 mb-2 italic">
              (Окончательная цена может быть изменена после проведения первого этапа исследования, в зависимости от объема работы. При необходимости изготовления дополнительных блоков, стекол, дополнительного окрашивания, в том числе проведения ИГХ и других молекулярно-генетических исследований, цена может быть увеличена. Конечная стоимость исследования зависит от объема работы и будет c Вами согласована.)
            </p>
            <div className="flex items-center">
              <input
                type="text"
                value={formData.researchPrice || "0"}
                className="w-full md:w-[50%] shadow-md shadow-black/30 p-2 border bg-[#d5e6e9] border-none rounded"
                readOnly
              />
              <span className="ml-2 text-[#08788b]">₽</span>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-[#08788b] text-[1.4rem] mb-1">
              Промокод
            </label>
            <input
              type="text"
              value={formData.promoCode || ""}
              onChange={(e) => handleChange("promoCode", e.target.value)}
              className="w-full md:w-[50%] shadow-md shadow-black/30 p-2 border bg-[#d5e6e9] border-none rounded"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default FormScreen3;