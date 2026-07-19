import { useEffect, useState } from "react";
import axios from "axios";
import Guidance from "./components/Guidance";
import { useTranslation } from "react-i18next";

function App() {
  const [guidance, setGuidance] = useState([]);
  const { i18n } = useTranslation();

  useEffect(() => {
    axios
      .post("http://localhost:5000/api/triage")
      .then((res) => {
        setGuidance(res.data.guidance);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
  <>
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <select onChange={(e) => i18n.changeLanguage(e.target.value)}>
        <option value="en">English</option>
        <option value="hi">हिन्दी</option>
      </select>
    </div>

    <Guidance guidance={guidance} />
  </>
);
}

export default App;