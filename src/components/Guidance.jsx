import { useState } from "react";
import { useTranslation } from "react-i18next";

function Guidance({ guidance }) {
  const [completed, setCompleted] = useState([]);
  const { t } = useTranslation();

  const toggleStep = (index) => {
    if (completed.includes(index)) {
      setCompleted(completed.filter((i) => i !== index));
    } else {
      setCompleted([...completed, index]);
    }
  };

  return (
    <div
      style={{
        width: "80%",
        margin: "40px auto",
        textAlign: "center",
      }}
    >
      <h2>{t("title")}</h2>

      {guidance.length === 0 ? (
        <p>Loading...</p>
      ) : (
        guidance.map((step, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "12px",
              margin: "10px 0",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: "10px",
            }}
          >
            <input
              type="checkbox"
              checked={completed.includes(index)}
              onChange={() => toggleStep(index)}
            />

            <span>
              <strong>{index + 1}.</strong> {t(step)}
            </span>
          </div>
        ))
      )}
    </div>
  );
}

export default Guidance;