import { useState } from "react";
import { useTranslation } from "react-i18next";

function SymptomForm() {
  const { t } = useTranslation();

  const [symptom, setSymptom] = useState("");
  const [error, setError] = useState("");
  const [risk, setRisk] = useState("");
  const [recommendation, setRecommendation] = useState("");

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
      setRisk("");
      setRecommendation("");
      return;
    }

    setError("");

    if (
      symptom.includes("Breathing") ||
      symptom.includes("सांस")
    ) {
      setRisk("🔴 High Risk");
      setRecommendation(
        "Visit the nearest hospital immediately and consult a doctor."
      );
    } else if (
      symptom.includes("Fever") ||
      symptom.includes("बुखार")
    ) {
      setRisk("🟠 Medium Risk");
      setRecommendation(
        "Drink plenty of water, take rest and visit a Primary Health Center if symptoms continue."
      );
    } else {
      setRisk("🟢 Low Risk");
      setRecommendation(
        "Take proper rest, stay hydrated and monitor your symptoms."
      );
    }
  };

  return (
    <div
      style={{
        marginTop: "30px",
        padding: "20px",
        background: "#ffffff",
        borderRadius: "15px",
        boxShadow: "0 5px 20px rgba(0,0,0,.1)",
      }}
    >
      <h2
        style={{
          color: "#1565C0",
          textAlign: "center",
        }}
      >
        🤖 AI Symptom Checker
      </h2>

      <form onSubmit={handleSubmit}>
        <label
          style={{
            fontWeight: "bold",
          }}
        >
          {t("selectSymptom")}
        </label>

        <select
          value={symptom}
          onChange={(e) => setSymptom(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "10px",
            marginBottom: "15px",
            borderRadius: "8px",
          }}
        >
          <option value="">
            {t("select")}
          </option>

          {symptoms.map((item, index) => (
            <option
              key={index}
              value={item}
            >
              {item}
            </option>
          ))}
        </select>

        {error && (
          <p
            style={{
              color: "red",
              fontWeight: "bold",
            }}
          >
            {error}
          </p>
        )}

        <button
          type="submit"
          style={{
            width: "100%",
            background: "#43A047",
            color: "white",
            padding: "12px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          🤖 Analyze Symptoms
        </button>
      </form>

      {risk && (
        <div
          style={{
            marginTop: "25px",
            background: "#F4F8FF",
            border: "2px solid #1976D2",
            borderRadius: "12px",
            padding: "20px",
          }}
        >
          <h3
            style={{
              color: "#1565C0",
            }}
          >
            AI Health Analysis
          </h3>

          <p>
            <strong>Selected Symptom:</strong>{" "}
            {symptom}
          </p>

          <p
            style={{
              fontSize: "22px",
              fontWeight: "bold",
            }}
          >
            {risk}
          </p>

          <p>
            <strong>Recommendation</strong>
          </p>

          <p>{recommendation}</p>
        </div>
      )}
    </div>
  );
}

export default SymptomForm;