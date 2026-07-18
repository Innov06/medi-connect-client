import { useState } from "react";

const translations = {
  en: {
    title: "Referral Slip",
    patient: "Patient Name",
    symptoms: "Symptoms",
    recommendation: "Recommendation",
    hospital: "Referred Hospital",
    print: "Print / Download PDF",

    symptomMap: {
      Fever: "Fever",
      Cough: "Cough",
      Headache: "Headache",
    },

    recommendationMap: {
      "Visit nearest PHC": "Visit nearest PHC",
      "Take rest and stay hydrated": "Take rest and stay hydrated",
    },
  },

  hi: {
    title: "रेफरल पर्ची",
    patient: "रोगी का नाम",
    symptoms: "लक्षण",
    recommendation: "सिफारिश",
    hospital: "संदर्भित अस्पताल",
    print: "प्रिंट / पीडीएफ डाउनलोड करें",

    symptomMap: {
      Fever: "बुखार",
      Cough: "खांसी",
      Headache: "सिरदर्द",
    },

    recommendationMap: {
      "Visit nearest PHC": "निकटतम पीएचसी जाएँ",
      "Take rest and stay hydrated": "आराम करें और पर्याप्त पानी पिएँ",
    },
  },
};

export default function ReferralSlip() {
  const [language, setLanguage] = useState("en");

  const patient = "Ravi Kumar";
  const symptoms = ["Fever", "Cough"];
  const recommendation = "Visit nearest PHC";
  const hospital = "Primary Health Centre";

  const t = translations[language];

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "30px auto",
        padding: "20px",
        border: "2px solid #ccc",
        borderRadius: "10px",
        background: "#fff",
        color: "#000",
      }}
    >
      <h2>{t.title}</h2>

      <label>
        <strong>Select Language:</strong>
      </label>

      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        style={{ marginLeft: "10px", marginBottom: "20px" }}
      >
        <option value="en">English</option>
        <option value="hi">हिन्दी</option>
      </select>

      <p>
        <strong>{t.patient}: </strong>
        {patient}
      </p>

      <p>
        <strong>{t.symptoms}: </strong>
        {symptoms
          .map((s) => t.symptomMap[s] || s)
          .join(", ")}
      </p>

      <p>
        <strong>{t.recommendation}: </strong>
        {t.recommendationMap[recommendation] || recommendation}
      </p>

      <p>
        <strong>{t.hospital}: </strong>
        {hospital}
      </p>

      <button onClick={() => window.print()}>
        {t.print}
      </button>
    </div>
  );
}