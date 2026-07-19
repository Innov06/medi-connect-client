import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Load saved language from Local Storage
const savedLanguage = localStorage.getItem("language") || "en";

// Translation resources
const resources = {
  en: {
    translation: {
      title: "MediConnect Rural",
      welcome: "Welcome",
      language: "Language",
      submit: "Submit",
      referral: "Create Referral Slip",
    },
  },

  hi: {
    translation: {
      title: "मेडीकनेक्ट ग्रामीण",
      welcome: "स्वागत है",
      language: "भाषा",
      submit: "जमा करें",
      referral: "रेफरल स्लिप बनाएं",
    },
  },

  bn: {
    translation: {
      title: "মেডিকানেক্ট গ্রামীণ",
      welcome: "স্বাগতম",
      language: "ভাষা",
      submit: "জমা দিন",
      referral: "রেফারেল স্লিপ তৈরি করুন",
    },
  },

  te: {
    translation: {
      title: "మెడికనెక్ట్ రూరల్",
      welcome: "స్వాగతం",
      language: "భాష",
      submit: "సమర్పించండి",
      referral: "రిఫరల్ స్లిప్ సృష్టించండి",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: savedLanguage,
  fallbackLng: "en",

  interpolation: {
    escapeValue: false,
  },

  react: {
    useSuspense: false,
  },
});

export default i18n;