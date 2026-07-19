import { useState } from "react";

function SymptomForm() {
  const [symptom, setSymptom] = useState("");
  const [error, setError] = useState("");

  const symptoms = [
    "🤒 Fever",
    "🤧 Cough",
    "🤕 Headache",
    "😷 Cold",
    "🤢 Vomiting",
    "🤮 Nausea",
    "💩 Diarrhea",
    "😵 Dizziness",
    "😮‍💨 Breathing Problem",
    "🤒 Body Pain",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!symptom) {
      setError("Please select a symptom.");
      return;
    }

    setError("");
    alert("Symptom Submitted Successfully");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
      <h3>Symptom Form</h3>

      <label>Select Symptom</label>

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
        <option value="">Select</option>

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
        Submit
      </button>
    </form>
  );
}

export default SymptomForm;