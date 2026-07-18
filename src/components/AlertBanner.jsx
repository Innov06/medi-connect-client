import { FaExclamationTriangle } from "react-icons/fa";
import "./AlertBanner.css";

function AlertBanner({ warningSigns }) {
  if (!warningSigns || warningSigns.length === 0) {
    return null;
  }

  return (
    <div className="alert-banner">
      <div className="alert-header">
        <FaExclamationTriangle />
        <h2>Emergency Warning</h2>
      </div>

      <ul>
        {warningSigns.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default AlertBanner;