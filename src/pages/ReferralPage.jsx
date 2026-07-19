import { useEffect, useState } from "react";
import ShareButtons from "../components/ShareButtons";
import { getReferralLink } from "../services/referralService";

function ReferralPage() {
  const [referralLink, setReferralLink] = useState("");

  useEffect(() => {
    const fetchReferral = async () => {
      const data = await getReferralLink();
      setReferralLink(data.shareLink);
    };

    fetchReferral();
  }, []);

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
      <h2>Digital Referral Slip</h2>

      <p>
        <strong>Patient:</strong> Rahul Kumar
      </p>

      <p>
        <strong>Symptoms:</strong> Fever, Cough
      </p>

      <p>
        <strong>Referral Link:</strong>
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
    </div>
  );
}

export default ReferralPage;