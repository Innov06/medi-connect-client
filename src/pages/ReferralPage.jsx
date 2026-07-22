import MapView from "../components/MapView";
import SymptomForm from "../components/SymptomForm";
import { useEffect, useState } from "react";
import ShareButtons from "../components/ShareButtons";
import { getReferralLink } from "../services/referralService";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";

function ReferralPage() {
  const [referralLink, setReferralLink] = useState("");
  const [aiSuggestion, setAiSuggestion] = useState("");
  const { t } = useTranslation();

  useEffect(() => {
    const fetchReferral = async () => {
      const data = await getReferralLink();
      setReferralLink(data.shareLink);
    };

    fetchReferral();
  }, []);

  const changeToEnglish = () => {
    i18n.changeLanguage("en");
  };

  const changeToHindi = () => {
    i18n.changeLanguage("hi");
  };

  // Demo AI Recommendation
  const generateSuggestion = () => {
    const symptoms = "Fever, Cough";

    if (
      symptoms.toLowerCase().includes("fever") &&
      symptoms.toLowerCase().includes("cough")
    ) {
      setAiSuggestion(
        "🤖 AI Recommendation: Possible viral infection. Drink plenty of water, take rest, monitor temperature, and visit the nearest Primary Health Center if symptoms continue."
      );
    } else {
      setAiSuggestion(
        "🤖 AI Recommendation: Please consult your nearest healthcare center."
      );
    }
  };

  return (
    <div className="app-container">
      <h2>{t("title")}</h2>

      {/* Language Buttons */}
      <div style={{ marginBottom: "20px" }}>
        <button onClick={changeToEnglish}>English</button>

        <button
          onClick={changeToHindi}
          style={{ marginLeft: "10px" }}
        >
          हिन्दी
        </button>
      </div>

      {/* Patient Details */}
      <div className="info-card">
        <p>
          <strong>👤 {t("welcome")}:</strong> Rahul Kumar
        </p>

        <p>
          <strong>🤒 Symptoms:</strong> Fever, Cough
        </p>
      </div>

      {/* Referral Link */}
      <p>
        <strong>{t("share")}:</strong>
      </p>

      <input
        type="text"
        value={referralLink}
        readOnly
      />

      <ShareButtons referralLink={referralLink} />

      {/* AI Section */}
      <div
        className="direction-box"
        style={{ marginTop: "30px" }}
      >
        <h3>🤖 AI Health Assistant</h3>

        <button onClick={generateSuggestion}>
          Get AI Recommendation
        </button>

        {aiSuggestion && (
          <div className="success-message">
            {aiSuggestion}
          </div>
        )}
      </div>

      {/* Symptom Form */}
      <div style={{ marginTop: "35px" }}>
        <SymptomForm />
      </div>

      {/* Map */}
      <h3 style={{ marginTop: "35px" }}>
        🏥 Nearby Health Resources
      </h3>

      <MapView />
    </div>
  );
}

export default ReferralPage;