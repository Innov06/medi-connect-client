import AlertBanner from "./components/AlertBanner";

function App() {
  const triageResult = {
    warningSigns: [
      "तेज बुखार",
      "सांस लेने में कठिनाई",
      "तुरंत डॉक्टर से संपर्क करें"
    ]
  };

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "40px auto",
        padding: "20px"
      }}
    >
      <h1>Triage Result</h1>

      <AlertBanner warningSigns={triageResult.warningSigns} />

      <p>
        Patient assessment completed successfully.
      </p>
    </div>
  );
}

export default App;