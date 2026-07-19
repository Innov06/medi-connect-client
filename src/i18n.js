import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const savedLanguage = localStorage.getItem("language") || "en";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        title: "MediConnect Rural",
      },
    },

    hi: {
      translation: {
        title: "मेडीकनेक्ट ग्रामीण",
      },
    },

    bn: {
      translation: {
        title: "মেডিকানেক্ট গ্রামীণ",
      },
    },

    te: {
      translation: {
        title: "మెడికనెక్ట్ రూరల్",
      },
    },
  },

  lng: savedLanguage,

  fallbackLng: "en",

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;