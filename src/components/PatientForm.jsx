import { useState } from "react";
import { saveOfflineData } from "../utils/storage";
import axios from "axios";
function PatientForm() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    symptoms: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!navigator.onLine) {
      saveOfflineData(formData);
      alert("Offline: Data saved locally.");
      return;
    }

    alert("Form submitted successfully.");
  };
  const downloadPDF = async () => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/referral",
      {
        name: formData.name,
        age: formData.age,
        symptoms: formData.symptoms,
        urgency: "Medium",
        facility: "Primary Health Centre",
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
  } catch (error) {
    console.error(error);
    alert("Failed to generate PDF");
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
      }}
    >
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

      <button type="submit">
        Submit
      </button>
      <button
  type="button"
  onClick={downloadPDF}
>
  Download Referral PDF
</button>
    </form>
  );
}

export default PatientForm;