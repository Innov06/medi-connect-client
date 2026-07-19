import { useState } from "react";

function PatientList() {
  const [patients, setPatients] = useState([
    {
      id: 1,
      name: "Rahul Kumar",
      synced: false,
    },
    {
      id: 2,
      name: "Priya Singh",
      synced: true,
    },
  ]);

  const syncRecords = () => {
    setPatients((prev) =>
      prev.map((p) => ({
        ...p,
        synced: true,
      }))
    );

    alert("Records synced successfully!");
  };

  return (
    <div style={{ marginTop: "30px" }}>
      <h2>Patient Records</h2>

      {patients.map((patient) => (
        <div
          key={patient.id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <strong>{patient.name}</strong>

          {!patient.synced && (
            <span
              style={{
                color: "white",
                background: "red",
                padding: "4px 8px",
                marginLeft: "10px",
                borderRadius: "5px",
              }}
            >
              Unsynced
            </span>
          )}
        </div>
      ))}

      <button onClick={syncRecords}>
        Sync Records
      </button>
    </div>
  );
}

export default PatientList;