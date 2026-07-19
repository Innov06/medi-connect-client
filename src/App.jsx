import { useState } from "react";
import { useTranslation } from "react-i18next";
import "./App.css";
import ResourceList from "./components/ResourceList";
import ConnectivityStatus from "./components/ConnectivityStatus";
import PatientList from "./components/PatientList";
import ReferralHistory from "./components/ReferralHistory";

function App() {
  const { t, i18n } = useTranslation();
  const [response, setResponse] = useState("");

  const changeLanguage = (e) => {
    i18n.changeLanguage(e.target.value);
    setResponse("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (i18n.language === "hi") {
      setResponse(
        "एआई सुझाव: खूब पानी पिएँ, आराम करें और यदि बुखार बना रहे तो डॉक्टर से संपर्क करें।"
      );
    } else {
      setResponse(
        "AI Advice: Drink plenty of water, take rest, and consult a doctor if the fever continues."
      );
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto", fontFamily: "Arial" }}>
      <h1>{t("title")}</h1>

      <label>{t("language")}</label>
      <br />
      <select onChange={changeLanguage} defaultValue="en">
        <option value="en">English</option>
        <option value="hi">हिन्दी</option>
      </select>

      <form onSubmit={handleSubmit}>
        <br />
        <br />

        <label>{t("question1")}</label>
        <br />
        <select>
          <option>{t("yes")}</option>
          <option>{t("no")}</option>
        </select>

        <br />
        <br />

        <label>{t("question2")}</label>
        <br />
        <select>
          <option>{t("yes")}</option>
          <option>{t("no")}</option>
        </select>

        <br />
        <br />

        <label>{t("question3")}</label>
        <br />
        <select>
          <option>{t("yes")}</option>
          <option>{t("no")}</option>
        </select>

        <br />
        <br />

        <button type="submit">{t("submit")}</button>
      </form>

      {response && (
        <>
          <h2>{t("aiResponse")}</h2>
          <p>{response}</p>
        </>
      )}
      <ResourceList />
      <PatientList />
      <ConnectivityStatus />
      <ReferralHistory />
    </div>
  );
}

export default App;