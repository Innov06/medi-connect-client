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

    setMessage("✅ WhatsApp opened successfully!");
  };

  const handleSMSShare = () => {
    const smsURL = `sms:?body=${encodeURIComponent(shareMessage)}`;

    window.location.href = smsURL;

    setMessage("✅ SMS app opened successfully!");
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
        <p
          style={{
            color: "green",
            marginTop: "15px",
            fontWeight: "bold",
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
}

export default ShareButtons;