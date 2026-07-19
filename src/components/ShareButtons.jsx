import { useState } from "react";

function ShareButtons({ referralLink }) {
  const [message, setMessage] = useState("");

  const shareMessage = `Patient Referral Slip

Please check the referral here:
${referralLink}`;

  const handleWhatsAppShare = () => {
    const whatsappURL = `https://wa.me/?text=${encodeURIComponent(
      shareMessage
    )}`;

    window.open(whatsappURL, "_blank");

    setMessage("✅ Referral shared successfully via WhatsApp!");
  };

  const handleSMSShare = () => {
    const smsURL = `sms:?body=${encodeURIComponent(shareMessage)}`;

    window.location.href = smsURL;

    setMessage("✅ Referral shared successfully via SMS!");
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <button
        onClick={handleWhatsAppShare}
        style={{
          padding: "10px 20px",
          marginRight: "10px",
          cursor: "pointer",
        }}
      >
        Share on WhatsApp
      </button>

      <button
        onClick={handleSMSShare}
        style={{
          padding: "10px 20px",
          cursor: "pointer",
        }}
      >
        Share via SMS
      </button>

      {message && (
        <div
          style={{
            marginTop: "15px",
            padding: "10px",
            backgroundColor: "#e8f5e9",
            border: "1px solid green",
            borderRadius: "5px",
            color: "green",
            fontWeight: "bold",
          }}
        >
          {message}
        </div>
      )}
    </div>
  );
}

export default ShareButtons;