import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        title: "Home Care Guidance",
        "Drink water": "Drink water",
        Rest: "Rest",
        "Take medicine": "Take medicine",
        "Visit PHC if symptoms worsen":
          "Visit PHC if symptoms worsen",
      },
    },
    hi: {
      translation: {
        title: "घरेलू देखभाल मार्गदर्शन",
        "Drink water": "पानी पिएँ",
        Rest: "आराम करें",
        "Take medicine": "दवा लें",
        "Visit PHC if symptoms worsen":
          "लक्षण बढ़ने पर निकटतम PHC जाएँ",
      },
    },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;