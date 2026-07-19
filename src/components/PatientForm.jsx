import { useState } from "react";
import axios from "axios";
import { saveOfflineData } from "../utils/storage";

function PatientForm() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    symptoms: "",
    urgency: "Medium",
    facility: "Primary Health Centre",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle Submit button
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.age || !formData.symptoms) {
      setError("Please fill all required fields.");
      return;
    }

    setError("");

    // Save locally if offline
    if (!navigator.onLine) {
      saveOfflineData(formData);
      alert("Offline: Patient data saved locally.");
      return;
    }

    alert("Patient details submitted successfully.");
  };

  // Generate Referral PDF
  const downloadPDF = async () => {
    if (!formData.name || !formData.age || !formData.symptoms) {
      setError("Please fill all required fields.");
      return;
    }

    setLoading(true);
    setError("");

    // Save locally if offline
    if (!navigator.onLine) {
      saveOfflineData(formData);
      alert("Offline: Referral data saved locally.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/referral",
        {
          ...formData,
          language: localStorage.getItem("language") || "en",
        },
        {
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(
        new Blob([response.data])
      );

      const link = document.createElement("a");
      link.href = url;
      link.download = "referral.pdf";

      document.body.appendChild(link);
      link.click();
      link.remove();

      alert("Referral PDF generated successfully.");
    } catch (err) {
      console.error(err);
      setError("Failed to generate referral slip.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: "450px",
        margin: "30px auto",
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ textAlign: "center" }}>Referral Form</h2>

      <input
        type="text"
        name="name"
        placeholder="Patient Name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="age"
        placeholder="Age"
        value={formData.age}
        onChange={handleChange}
        required
      />

      <textarea
        name="symptoms"
        placeholder="Symptoms"
        rows="4"
        value={formData.symptoms}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="urgency"
        placeholder="Urgency"
        value={formData.urgency}
        onChange={handleChange}
      />

      <input
        type="text"
        name="facility"
        placeholder="Referral Facility"
        value={formData.facility}
        onChange={handleChange}
      />

      <button type="submit">
        Submit
      </button>

      <button
        type="button"
        onClick={downloadPDF}
        disabled={loading}
      >
        {loading ? "Generating..." : "Create Referral Slip"}
      </button>

      {error && (
        <p
          style={{
            color: "red",
            textAlign: "center",
            margin: 0,
          }}
        >
          {error}
        </p>
      )}
    </form>
  );
}

export default PatientForm;