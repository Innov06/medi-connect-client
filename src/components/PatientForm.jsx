import { useState } from "react";
import { saveOfflineData } from "../utils/storage";

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
    </form>
  );
}

export default PatientForm;