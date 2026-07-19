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

    alert("Online: Ready to send to backend.");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Patient Name"
        value={formData.name}
        onChange={handleChange}
      />

      <br />
      <br />

      <input
        type="number"
        name="age"
        placeholder="Age"
        value={formData.age}
        onChange={handleChange}
      />

      <br />
      <br />

      <textarea
        name="symptoms"
        placeholder="Symptoms"
        value={formData.symptoms}
        onChange={handleChange}
      />

      <br />
      <br />

      <button type="submit">Submit</button>
    </form>
  );
}

export default PatientForm;