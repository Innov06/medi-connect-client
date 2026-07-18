import "./AlertBanner.css";

export default function AlertBanner({
  triage = {
    urgent: true,
    warnings: [
      "High fever",
      "Chest pain",
      "Difficulty breathing",
    ],
    language: "hi",
  },
}) {
  if (!triage.urgent) return null;

  const translations = {
    hi: {
      "High fever": "तेज़ बुखार",
      "Chest pain": "सीने में दर्द",
      "Difficulty breathing": "सांस लेने में कठिनाई",
    },
    en: {
      "High fever": "High fever",
      "Chest pain": "Chest pain",
      "Difficulty breathing": "Difficulty breathing",
    },
  };

  const lang = translations[triage.language] || translations.en;

  return (
    <div className="alert-banner">
      <h2>⚠️ Emergency Warning</h2>

      <ul>
        {triage.warnings.map((warning, index) => (
          <li key={index}>{lang[warning] || warning}</li>
        ))}
      </ul>
    </div>
  );
}