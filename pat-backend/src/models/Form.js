const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
  applicationId: { type: String, unique: true, required: true },
  relationToPatient: { type: String, required: true },
  consultationType: { type: String, required: true },
  researchCategory: {
    type: String,
    required: function () {
      return this.consultationType !== "Консультация Патолога";
    },
  },
  // Trustee Details (required if relationToPatient is "Я доверенное лицо")
  trusteeSurname: {
    type: String,
    required: function () {
      return this.relationToPatient === "Я доверенное лицо";
    },
  },
  trusteeName: {
    type: String,
    required: function () {
      return this.relationToPatient === "Я доверенное лицо";
    },
  },
  trusteePatronymic: { type: String, default: '' },
  trusteePhoneNumber: {
    type: String,
    required: function () {
      return this.relationToPatient === "Я доверенное лицо";
    },
  },
  trusteeEmail: {
    type: String,
    required: function () {
      return this.relationToPatient === "Я доверенное лицо";
    },
  },
  // Patient Details
  lastName: { type: String, required: true },
  firstName: { type: String, required: true },
  middleName: { type: String, default: '' },
  gender: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  age: { type: String, default: '' },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true },
  // Medical Information
  clinicalDiagnosis: { type: String, required: true },
  processLocalization: {
    type: String,
    required: function () {
      return [
        "Цитологическое исследование",
        "Гистологическое исследование",
        "Комплексное исследование",
      ].includes(this.consultationType);
    },
  },
  materialCollectionMethod: {
    type: String,
    required: function () {
      return this.consultationType !== "Консультация Патолога";
    },
  },
  numberOfLocalizations: {
    type: Number,
    required: function () {
      return [
        "Цитологическое исследование",
        "Гистологическое исследование",
        "Комплексное исследование",
      ].includes(this.consultationType);
    },
    min: 0,
  },
  numberOfContainers: {
    type: Number,
    required: function () {
      return [
        "Первичное гистологическое исследование",
        "Экспертное первичное гистологическое исследование",
        "Комплексное исследование: первичные цитологическое и гистологическое исследования",
        "Экспертное комплексное исследование: первичные цитологическое и гистологическое исследования",
      ].includes(this.researchCategory);
    },
    min: 0,
  },
  numberOfGlasses: {
    type: Number,
    required: function () {
      return [
        "Консультативный пересмотр готовых цитологических препаратов",
        "Экспертный пересмотр готовых цитологических препаратов",
        "Комплексное исследование: первичные цитологическое и гистологическое исследования",
        "Экспертное комплексное исследование: первичные цитологическое и гистологическое исследования",
        "Консультативный пересмотр комплекса: цитологического и гистологического исследований",
        "Экспертный пересмотр комплексного исследования: цитологического и гистологического исследований",
      ].includes(this.researchCategory);
    },
    min: 0,
  },
  numberOfGlassesToBeMade: {
    type: Number,
    min: 0, // Allow 0 or null
  },
  medicalFiles: [{ fileId: mongoose.Schema.Types.ObjectId, filename: String }],
  researchPrice: { type: String, default: '0' },
  promoCode: { type: String, default: '' },
  deliveryMethod: {
    type: String,
    required: function () {
      return this.consultationType !== "Консультация Патолога";
    },
  },
  city: { type: String, default: '' },
  street: { type: String, default: '' },
  house: { type: String, default: '' },
  apartment: { type: String, default: '' },
  comment: { type: String, default: '' },
  consentGiven: { type: Boolean, required: true },
  submittedAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
  tempPdfPath: { type: String, default: '' }, // Added createdAt field
});

module.exports = mongoose.model('Form', formSchema);