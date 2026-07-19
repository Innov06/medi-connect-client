import { useTranslation } from "react-i18next";
import PatientForm from "./components/PatientForm";

function App() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (e) => {
    const lang = e.target.value;
    i18n.changeLanguage(lang);
    localStorage.setItem("language", lang);
  };

  return (
    <div
      style={{
        width: "80%",
        margin: "40px auto",
        textAlign: "center",
      }}
    >
      <h1>{t("title")}</h1>

      <select
        value={i18n.language}
        onChange={changeLanguage}
        style={{
          padding: "10px",
          marginBottom: "30px",
          fontSize: "16px",
        }}
      >
        <option value="en">English</option>
        <option value="hi">हिन्दी</option>
        <option value="bn">বাংলা</option>
        <option value="te">తెలుగు</option>
      </select>

      <PatientForm />
    </div>
  );
}

export default App;