import { useEffect, useState } from "react";

function ReferralHistory() {
  const [referrals, setReferrals] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    // Clear old cached data (optional while developing)
    localStorage.removeItem("referrals");

    const cached = localStorage.getItem("referrals");

    if (cached) {
      setReferrals(JSON.parse(cached));
    } else {
      const sampleData = [
        {
          id: 1,
          patient: "Rahul Kumar",
          date: "2026-07-19",
          file: "/referral.html",
        },
        {
          id: 2,
          patient: "Priya Singh",
          date: "2026-07-15",
          file: "/referral.html",
        },
      ];

      setReferrals(sampleData);
      localStorage.setItem("referrals", JSON.stringify(sampleData));
    }
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
            <button>Download</button>
          </a>
        </div>
      ))}
    </div>
  );
}

export default ReferralHistory;