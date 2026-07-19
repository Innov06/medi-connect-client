import { useEffect, useState } from "react";

function ReferralHistory() {
  const [referrals, setReferrals] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
  async function loadReferrals() {
    try {
      const response = await fetch("http://localhost:5000/api/referrals");

      const data = await response.json();

      setReferrals(data);

      localStorage.setItem("referrals", JSON.stringify(data));
    } catch (error) {
      const cached = localStorage.getItem("referrals");

      if (cached) {
        setReferrals(JSON.parse(cached));
      }
    }
  }

  loadReferrals();
}, []); 

  const filtered = referrals.filter(
    (r) =>
      r.patient.toLowerCase().includes(search.toLowerCase()) ||
      r.date.includes(search)
  );

  return (
    <div
      style={{
        marginTop: "40px",
        border: "1px solid #ccc",
        padding: "20px",
      }}
    >
      <h2>Referral History</h2>

      <input
        type="text"
        placeholder="Search patient or date"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "8px",
          width: "100%",
          marginBottom: "20px",
        }}
      />

      {filtered.map((item) => (
        <div
          key={item.id}
          style={{
            border: "1px solid #ddd",
            padding: "15px",
            marginBottom: "15px",
          }}
        >
          <h3>{item.patient}</h3>

          <p>
            <strong>Date:</strong> {item.date}
          </p>

          <button
            onClick={() => window.open(item.file, "_blank")}
          >
            View
          </button>

          <a
            href={item.file}
            download
            style={{ marginLeft: "10px" }}
          >
            <button onClick={() => window.open(item.file, "_blank")}>
  View
</button>

<a href={item.file} download>
  <button>Download</button>
</a>
          </a>
        </div>
      ))}
    </div>
  );
}

export default ReferralHistory;