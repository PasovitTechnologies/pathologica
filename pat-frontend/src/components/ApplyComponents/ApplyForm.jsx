import { useState, useEffect } from "react";
import FormScreen1 from "./FormScreen1";
import FormScreenTrustee from "./FormScreenTrustee";
import FormScreen2 from "./FormScreen2";
import FormScreen3 from "./FormScreen3";
import FormScreen4 from "./FormScreen4";
import FormScreenPathologistFinal from "./FormScreenPathologistFinal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { services } from "../../pages/Services.jsx";
import axios from "axios";

function ApplyForm() {
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    relationToPatient: null,
    consultationType: null,
    researchCategory: null,
    trusteeSurname: null,
    trusteeName: null,
    trusteePatronymic: "",
    trusteePhoneNumber: null,
    trusteeEmail: null,
    lastName: null,
    firstName: null,
    middleName: "",
    gender: null,
    dateOfBirth: null,
    age: "",
    phoneNumber: null,
    email: null,
    clinicalDiagnosis: null,
    processLocalization: null,
    materialCollectionMethod: null,
    numberOfLocalizations: null,
    numberOfContainers: null,
    numberOfGlasses: null,
    numberOfGlassesToBeMade: null,
    medicalFiles: [],
    researchPrice: "0",
    promoCode: "",
    deliveryMethod: null,
    city: "",
    street: "",
    house: "",
    apartment: "",
    comment: "",
    consentGiven: false,
  });

  const calculateResearchPrice = () => {
    const {
      consultationType,
      researchCategory,
      numberOfLocalizations,
      numberOfContainers,
      numberOfGlasses,
      numberOfGlassesToBeMade,
    } = formData;

    if (consultationType === "Консультация Патолога") {
      return "15000";
    }

    if (!consultationType || !researchCategory) return "0";

    const serviceCategory = services.find((s) => s.category === consultationType);
    if (!serviceCategory) return "0";

    const serviceItem = serviceCategory.items.find(
      (item) => item.title === researchCategory
    );
    if (!serviceItem) return "0";

    const basePrice = parseInt(serviceItem.price.replace(/[^\d]/g, ""), 10);

    let totalPrice = basePrice;

    const locs = parseInt(numberOfLocalizations) || 1;
    const containers = parseInt(numberOfContainers) || 1;
    const glasses = parseInt(numberOfGlasses) || 0;
    const glassesToBeMade = parseInt(numberOfGlassesToBeMade) || 0;

    if (consultationType === "Цитологическое исследование") {
      const extraLocalizationPrice =
        serviceItem.extra.find((e) => e.name.includes("дополнительная локализация"))
          ?.price || "0";
      const extraGlassPrice =
        serviceItem.extra.find((e) => e.name.includes("дополнительное стекло"))
          ?.price || "0";

      if (locs > 1) {
        totalPrice += (locs - 1) * parseInt(extraLocalizationPrice.replace(/[^\d]/g, ""), 10);
      }
      if (glasses > 4) {
        totalPrice += (glasses - 4) * parseInt(extraGlassPrice.replace(/[^\d]/g, ""), 10);
      }
    } else if (consultationType === "Гистологическое исследование") {
      const extraContainerPrice =
        serviceItem.extra.find((e) => e.name.includes("дополнительный контейнер"))
          ?.price || "0";
      const extraGlassPrice =
        serviceItem.extra.find((e) => e.name.includes("дополнительного стекла"))
          ?.price || "0";

      if (containers > 3) {
        totalPrice += (containers - 3) * parseInt(extraContainerPrice.replace(/[^\d]/g, ""), 10);
      }
      if (glassesToBeMade > 0) {
        totalPrice += glassesToBeMade * parseInt(extraGlassPrice.replace(/[^\d]/g, ""), 10);
      }
    } else if (consultationType === "Комплексное исследование") {
      const extraContainerPrice =
        serviceItem.extra.find((e) => e.name.includes("дополнительный контейнер"))
          ?.price || "0";
      const extraGlassPrice =
        serviceItem.extra.find((e) => e.name.includes("дополнительное готовое стекло"))
          ?.price || "0";

      if (containers > 3) {
        totalPrice += (containers - 3) * parseInt(extraContainerPrice.replace(/[^\d]/g, ""), 10);
      }
      if (glasses > 4) {
        totalPrice += (glasses - 4) * parseInt(extraGlassPrice.replace(/[^\d]/g, ""), 10);
      }
      if (glassesToBeMade > 0) {
        totalPrice += glassesToBeMade * parseInt(extraGlassPrice.replace(/[^\d]/g, ""), 10);
      }
    }

    return totalPrice.toString();
  };

  useEffect(() => {
    const newPrice = calculateResearchPrice();
    setFormData((prev) => ({ ...prev, researchPrice: newPrice }));
  }, [
    formData.consultationType,
    formData.researchCategory,
    formData.numberOfLocalizations,
    formData.numberOfContainers,
    formData.numberOfGlasses,
    formData.numberOfGlassesToBeMade,
  ]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateStep = () => {
    let newErrors = {};
    if (step === 1) {
      if (!formData.relationToPatient)
        newErrors.relationToPatient = "Это поле обязательно";
      if (!formData.consultationType)
        newErrors.consultationType = "Это поле обязательно";
      if (
        formData.consultationType !== "Консультация Патолога" &&
        !formData.researchCategory
      )
        newErrors.researchCategory = "Это поле обязательно";
    }
    if (step === 2 && formData.relationToPatient === "Я доверенное лицо") {
      if (!formData.trusteeSurname) newErrors.trusteeSurname = "Это поле обязательно";
      if (!formData.trusteeName) newErrors.trusteeName = "Это поле обязательно";
      if (!formData.trusteePhoneNumber) newErrors.trusteePhoneNumber = "Это поле обязательно";
      if (!formData.trusteeEmail) newErrors.trusteeEmail = "Это поле обязательно";
    }
    if (
      (step === 2 && formData.relationToPatient === "Я пациент") ||
      (step === 3 && formData.relationToPatient === "Я доверенное лицо")
    ) {
      console.log("Validating FormScreen2:", {
        lastName: formData.lastName,
        firstName: formData.firstName,
        gender: formData.gender,
        dateOfBirth: formData.dateOfBirth,
        phoneNumber: formData.phoneNumber,
        email: formData.email,
      });
      if (!formData.lastName || formData.lastName.trim() === "")
        newErrors.lastName = "Это поле обязательно";
      if (!formData.firstName || formData.firstName.trim() === "")
        newErrors.firstName = "Это поле обязательно";
      if (!formData.gender || formData.gender.trim() === "")
        newErrors.gender = "Это поле обязательно";
      if (!formData.dateOfBirth || formData.dateOfBirth.trim() === "")
        newErrors.dateOfBirth = "Это поле обязательно";
      if (!formData.phoneNumber || formData.phoneNumber.trim() === "")
        newErrors.phoneNumber = "Это поле обязательно";
      if (!formData.email || formData.email.trim() === "")
        newErrors.email = "Это поле обязательно";
      else if (!/\S+@\S+\.\S+/.test(formData.email))
        newErrors.email = "Введите действительный адрес электронной почты";
    }
    if (
      (step === 3 && formData.consultationType === "Консультация Патолога" && formData.relationToPatient === "Я пациент") ||
      (step === 4 && formData.consultationType === "Консультация Патолога" && formData.relationToPatient === "Я доверенное лицо") ||
      (step === 3 && formData.relationToPatient === "Я пациент" && formData.consultationType !== "Консультация Патолога") ||
      (step === 4 && formData.relationToPatient === "Я доверенное лицо" && formData.consultationType !== "Консультация Патолога")
    ) {
      if (!formData.clinicalDiagnosis || formData.clinicalDiagnosis.trim() === "")
        newErrors.clinicalDiagnosis = "Это поле обязательно";
      if (
        ["Цитологическое исследование", "Гистологическое исследование", "Комплексное исследование"].includes(formData.consultationType) &&
        (!formData.processLocalization || formData.processLocalization.trim() === "")
      )
        newErrors.processLocalization = "Это поле обязательно";
      if (
        formData.consultationType !== "Консультация Патолога" &&
        (!formData.materialCollectionMethod || formData.materialCollectionMethod.trim() === "")
      )
        newErrors.materialCollectionMethod = "Это поле обязательно";
      if (
        ["Цитологическое исследование", "Гистологическое исследование", "Комплексное исследование"].includes(formData.consultationType) &&
        (!formData.numberOfLocalizations || formData.numberOfLocalizations < 1)
      )
        newErrors.numberOfLocalizations = "Значение должно быть не менее 1";
      if (
        [
          "Первичное гистологическое исследование",
          "Экспертное первичное гистологическое исследование",
          "Комплексное исследование: первичные цитологическое и гистологическое исследования",
          "Экспертное комплексное исследование: первичные цитологическое и гистологическое исследования",
        ].includes(formData.researchCategory) &&
        (!formData.numberOfContainers || formData.numberOfContainers < 1)
      )
        newErrors.numberOfContainers = "Значение должно быть не менее 1";
      if (
        [
          "Консультативный пересмотр готовых цитологических препаратов",
          "Экспертный пересмотр готовых цитологических препаратов",
          "Комплексное исследование: первичные цитологическое и гистологическое исследования",
          "Экспертное комплексное исследование: первичные цитологическое и гистологическое исследования",
          "Консультативный пересмотр комплекса: цитологического и гистологического исследований",
          "Экспертный пересмотр комплексного исследования: цитологического и гистологического исследований",
        ].includes(formData.researchCategory) &&
        (!formData.numberOfGlasses || formData.numberOfGlasses < 1)
      )
        newErrors.numberOfGlasses = "Значение должно быть не менее 1";
      if (
        [
          "Консультативный пересмотр комплекса: цитологического и гистологического исследований",
          "Экспертное первичное гистологическое исследование",
          "Первичное гистологическое исследование",
          "Экспертный пересмотр комплексного исследования: цитологического и гистологического исследований",
        ].includes(formData.researchCategory) &&
        (formData.numberOfGlassesToBeMade === undefined || formData.numberOfGlassesToBeMade < 0)
      )
        newErrors.numberOfGlassesToBeMade = "Значение не может быть отрицательным";
    }
    if (
      (step === 4 && formData.consultationType === "Консультация Патолога" && formData.relationToPatient === "Я пациент") ||
      (step === 5 && formData.consultationType === "Консультация Патолога" && formData.relationToPatient === "Я доверенное лицо") ||
      (step === 4 && formData.relationToPatient === "Я пациент" && formData.consultationType !== "Консультация Патолога") ||
      (step === 5 && formData.relationToPatient === "Я доверенное лицо" && formData.consultationType !== "Консультация Патолога")
    ) {
      if (!formData.consentGiven) newErrors.consentGiven = "Необходимо дать согласие перед отправкой";
      if (
        formData.consultationType !== "Консультация Патолога" &&
        !formData.deliveryMethod
      )
        newErrors.deliveryMethod = "Это поле обязательно";
      if (
        formData.consultationType !== "Консультация Патолога" &&
        formData.deliveryMethod === "Курьером" &&
        (!formData.city || !formData.street || !formData.house || !formData.apartment)
      )
        newErrors.deliveryAddress = "Пожалуйста, укажите полный адрес доставки";
    }

    console.log("Validation Errors:", newErrors);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    try {
      const formDataToSend = new FormData();
      const fieldsToExcludeForPathologist = [
        "numberOfContainers",
        "numberOfGlasses",
        "numberOfGlassesToBeMade",
        "numberOfLocalizations",
        "processLocalization",
        "materialCollectionMethod",
        "researchCategory",
        "deliveryMethod",
        "city",
        "street",
        "house",
        "apartment",
      ];

      Object.keys(formData).forEach((key) => {
        if (
          formData.consultationType === "Консультация Патолога" &&
          fieldsToExcludeForPathologist.includes(key)
        ) {
          return; // Skip these fields for Pathologist Consultation
        }
        if (key === "medicalFiles") {
          formData[key].forEach((file) => {
            formDataToSend.append("medicalFiles", file);
          });
        } else {
          formDataToSend.append(key, formData[key] ?? ""); // Use empty string if null/undefined
        }
      });

      const response = await axios.post("http://localhost:4000/api/forms", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Заявка успешно отправлена", {
        position: "top-center",
      });
      console.log(response.data.message);
      setFormData({
        relationToPatient: null,
        consultationType: null,
        researchCategory: null,
        trusteeSurname: null,
        trusteeName: null,
        trusteePatronymic: "",
        trusteePhoneNumber: null,
        trusteeEmail: null,
        lastName: null,
        firstName: null,
        middleName: "",
        gender: null,
        dateOfBirth: null,
        age: "",
        phoneNumber: null,
        email: null,
        clinicalDiagnosis: null,
        processLocalization: null,
        materialCollectionMethod: null,
        numberOfLocalizations: null,
        numberOfContainers: null,
        numberOfGlasses: null,
        numberOfGlassesToBeMade: null,
        medicalFiles: [],
        researchPrice: "0",
        promoCode: "",
        deliveryMethod: null,
        city: "",
        street: "",
        house: "",
        apartment: "",
        comment: "",
        consentGiven: false,
      });
      setStep(1);
    } catch (err) {
      console.error("Ошибка при отправке формы:", err);
      if (err.response) {
        const errorData = err.response.data;
        if (errorData.error === "Ошибка валидации") {
          if (errorData.details.includes("Неподдерживаемый формат файла")) {
            toast.error(errorData.details[0], {
              position: "top-center",
            });
          } else if (errorData.details.includes("File too large")) {
            toast.error("Файл слишком большой. Максимальный размер — 20 МБ.", {
              position: "top-center",
            });
          } else if (errorData.details.includes("Too many files")) {
            toast.error("Слишком много файлов. Максимум — 10 файлов.", {
              position: "top-center",
            });
          } else {
            toast.error("Ошибка валидации: " + errorData.details.join(", "), {
              position: "top-center",
            });
          }
        } else {
          toast.error("Ошибка при отправке формы: " + errorData.error, {
            position: "top-center",
          });
        }
      } else {
        toast.error("Ошибка сети. Пожалуйста, проверьте ваше интернет-соединение.", {
          position: "top-center",
        });
      }
    }
  };

  const handleNext = () => {
    console.log("handleNext called, current step:", step);
    const isValid = validateStep();
    console.log("Validation passed:", isValid);
    if (isValid) {
      // For "Консультация Патолога", move to FormScreenPathologistFinal before submitting
      if (
        (step === 3 && formData.consultationType === "Консультация Патолога" && formData.relationToPatient === "Я пациент") ||
        (step === 4 && formData.consultationType === "Консультация Патолога" && formData.relationToPatient === "Я доверенное лицо")
      ) {
        console.log("Moving to FormScreenPathologistFinal");
        setStep(step + 1); // Move to FormScreenPathologistFinal (Step 4 or 5)
      }
      // Submit the form only on the final step (FormScreenPathologistFinal or FormScreen4)
      else if (
        (step === 4 && formData.consultationType === "Консультация Патолога" && formData.relationToPatient === "Я пациент") ||
        (step === 5 && formData.consultationType === "Консультация Патолога" && formData.relationToPatient === "Я доверенное лицо") ||
        (step === 4 && formData.relationToPatient === "Я пациент" && formData.consultationType !== "Консультация Патолога") ||
        (step === 5 && formData.relationToPatient === "Я доверенное лицо" && formData.consultationType !== "Консультация Патолога")
      ) {
        console.log("Submitting form");
        handleSubmit();
      } else {
        if (step === 1 && formData.relationToPatient === "Я доверенное лицо") {
          console.log("Moving to Step 2 (Trustee Details)");
          setStep(2); // Go to Trustee Details
        } else {
          console.log("Moving to Step", step + 1);
          setStep((prev) => prev + 1);
        }
      }
      setErrors({});
    } else {
      console.log("Validation failed, cannot proceed");
    }
  };

  const handlePrev = () => {
    if (
      (step === 3 && formData.consultationType === "Консультация Патолога" && formData.relationToPatient === "Я пациент") ||
      (step === 4 && formData.consultationType === "Консультация Патолога" && formData.relationToPatient === "Я доверенное лицо")
    ) {
      setStep(step - 1); // Go back to FormScreen3 (Medical Information)
    } else if (step === 3 && formData.consultationType === "Консультация Патолога") {
      setStep(1); // Go back to FormScreen1
    } else {
      setStep((prev) => Math.max(prev - 1, 1));
    }
  };

  const renderStep = () => {
    if (step === 1) {
      return (
        <FormScreen1
          formData={formData}
          handleChange={handleChange}
          errors={errors}
        />
      );
    }
    if (step === 2 && formData.relationToPatient === "Я доверенное лицо") {
      return (
        <FormScreenTrustee
          formData={formData}
          handleChange={handleChange}
          errors={errors}
        />
      );
    }
    if (
      (step === 2 && formData.relationToPatient === "Я пациент") ||
      (step === 3 && formData.relationToPatient === "Я доверенное лицо")
    ) {
      return (
        <FormScreen2
          formData={formData}
          handleChange={handleChange}
          errors={errors}
        />
      );
    }
    if (
      (step === 3 && formData.consultationType === "Консультация Патолога" && formData.relationToPatient === "Я пациент") ||
      (step === 4 && formData.consultationType === "Консультация Патолога" && formData.relationToPatient === "Я доверенное лицо") ||
      (step === 3 && formData.relationToPatient === "Я пациент" && formData.consultationType !== "Консультация Патолога") ||
      (step === 4 && formData.relationToPatient === "Я доверенное лицо" && formData.consultationType !== "Консультация Патолога")
    ) {
      return (
        <FormScreen3
          formData={formData}
          handleChange={handleChange}
          errors={errors}
        />
      );
    }
    if (
      (step === 4 && formData.consultationType === "Консультация Патолога" && formData.relationToPatient === "Я пациент") ||
      (step === 5 && formData.consultationType === "Консультация Патолога" && formData.relationToPatient === "Я доверенное лицо")
    ) {
      return (
        <FormScreenPathologistFinal
          formData={formData}
          handleChange={handleChange}
          errors={errors}
        />
      );
    }
    if (
      (step === 4 && formData.relationToPatient === "Я пациент" && formData.consultationType !== "Консультация Патолога") ||
      (step === 5 && formData.relationToPatient === "Я доверенное лицо" && formData.consultationType !== "Консультация Патолога")
    ) {
      return (
        <FormScreen4
          formData={formData}
          handleChange={handleChange}
          errors={errors}
        />
      );
    }
    return null;
  };

  return (
    <div className="relative max-w-4xl px-3 md:px-10 my-10 mx-auto tracking-tighter">
      <ToastContainer />
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div>
          <div className="flex flex-col md:flex-row gap-5 items-start border-b-2 border-[#08788b] p-3 md:p-6">
            <div className="flex items-center w-fit">
              <img
                src="https://static.wixstatic.com/media/e6f22e_26677178adb448a9a9816ef76b9020b9~mv2.png"
                alt="PathologicaService"
                className="w-60 object-contain"
              />
            </div>
            <h2 className="text-[1.6rem] text-left font-semibold text-[#08788b]">
              Заявка на цитологическое, гистологическое и комплексное исследование
            </h2>
          </div>
          {renderStep()}
          <div className="flex justify-between p-3 md:p-6 mb-4 text-lg">
            <button
              onClick={handlePrev}
              disabled={step === 1}
              className="px-4 py-2 bg-[#2f86c4] text-white hover:bg-[#2f86e9] transition-all duration-300 rounded-full shadow-md shadow-black/40 cursor-pointer"
            >
              Назад
            </button>
            <button
              onClick={handleNext}
              className="px-4 py-2 bg-[#2f86c4] text-white hover:bg-[#2f86e9] transition-all duration-300 rounded-full shadow-md shadow-black/40 cursor-pointer"
            >
              {((step === 4 && formData.consultationType === "Консультация Патолога" && formData.relationToPatient === "Я пациент") ||
                (step === 5 && formData.consultationType === "Консультация Патолога" && formData.relationToPatient === "Я доверенное лицо") ||
                (step === 4 && formData.relationToPatient === "Я пациент" && formData.consultationType !== "Консультация Патолога") ||
                (step === 5 && formData.relationToPatient === "Я доверенное лицо" && formData.consultationType !== "Консультация Патолога"))
                ? "Отправить"
                : "Далее"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApplyForm;