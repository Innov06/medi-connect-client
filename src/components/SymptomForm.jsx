import { useState } from "react";
import { useTranslation } from "react-i18next";

function SymptomForm() {
  const { t } = useTranslation();

  const [symptom, setSymptom] = useState("");
  const [error, setError] = useState("");

  const symptoms = [
    t("fever"),
    t("cough"),
    t("headache"),
    t("cold"),
    t("vomiting"),
    t("nausea"),
    t("diarrhea"),
    t("dizziness"),
    t("breathing"),
    t("bodypain"),
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!symptom) {
      setError(t("error"));
      return;
    }

    setError("");
    alert("Symptom Submitted Successfully");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
      <h3>{t("symptomForm")}</h3>

      <label>{t("selectSymptom")}</label>

      <select
        value={symptom}
        onChange={(e) => setSymptom(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginTop: "10px",
          marginBottom: "10px",
        }}
      >
        <option value="">{t("select")}</option>

        {symptoms.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>

      {error && (
        <p style={{ color: "red" }}>
          {error}
        </p>
      )}

      <button type="submit">
        {t("submit")}
      </button>
    </form>
  );
}

export default SymptomForm;