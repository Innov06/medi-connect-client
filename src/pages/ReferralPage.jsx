import MapView from "../components/MapView";
import SymptomForm from "../components/SymptomForm";
import { useEffect, useState } from "react";
import ShareButtons from "../components/ShareButtons";
import { getReferralLink } from "../services/referralService";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";

function ReferralPage() {
  const [referralLink, setReferralLink] = useState("");
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

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "40px auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "10px",
      }}
    >
      <h2>{t("title")}</h2>

      <div style={{ marginBottom: "20px" }}>
        <button onClick={changeToEnglish}>English</button>

        <button
          onClick={changeToHindi}
          style={{ marginLeft: "10px" }}
        >
          हिन्दी
        </button>
      </div>

      <p>
        <strong>{t("welcome")}:</strong> Rahul Kumar
      </p>

      <p>
        <strong>Symptoms:</strong> Fever, Cough
      </p>

      <p>
        <strong>{t("share")}:</strong>
      </p>

      <input
        type="text"
        value={referralLink}
        readOnly
        style={{
          width: "100%",
          padding: "8px",
          marginBottom: "20px",
        }}
      />

      <ShareButtons referralLink={referralLink} />

      {/* Symptom Form */}
      <SymptomForm />

      {/* Map */}
      <h3 style={{ marginTop: "30px" }}>Nearby Health Resources</h3>

      <MapView />
    </div>
  );
}

export default ReferralPage;