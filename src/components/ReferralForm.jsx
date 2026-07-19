import { useState, useEffect } from "react";
import axios from "axios";
import "./ReferralForm.css";

function ReferralForm({ triageData = {}, onSubmit }) {
 const [formData, setFormData] = useState({
  name: "",
  age: "",
  symptoms: "",
  urgency: "",
  facility: "",
});

const [loading, setLoading] = useState(false);
const [error, setError] = useState("");

useEffect(() => {
  const fetchTriage = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/triage"
      );

      setFormData((prev) => ({
        ...prev,
        urgency: response.data.urgency,
        facility: "Primary Health Centre",
      }));
    } catch (error) {
      console.error("Failed to fetch triage data:", error);
    }
  };

  fetchTriage();
}, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

 const [loading, setLoading] = useState(false);
const [error, setError] = useState("");

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.name || !formData.age || !formData.symptoms) {
    setError("Please fill all required fields.");
    return;
  }

  setLoading(true);
  setError("");

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
  } catch (err) {
    setError("Failed to generate referral slip.");
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="referral-form">
      <h2>Referral Slip</h2>

      <form onSubmit={handleSubmit}>
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
          value={formData.symptoms}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="urgency"
          value={formData.urgency}
          onChange={handleChange}
        />

        <input
          type="text"
          name="facility"
          value={formData.facility}
          onChange={handleChange}
        />

        <button type="submit" disabled={loading}>
  {loading ? "Generating..." : "Create Referral Slip"}
</button>
{error && (
  <p style={{ color: "red" }}>
    {error}
  </p>
)}
      </form>
    </div>
  );
}

export default ReferralForm;