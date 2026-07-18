import { useEffect, useState } from "react";

export default function SyncManager() {
  const [status, setStatus] = useState(navigator.onLine ? "Online" : "Offline");
  const [message, setMessage] = useState("");

  const syncData = async () => {
    const queue = JSON.parse(localStorage.getItem("syncQueue")) || [];

    if (queue.length === 0) {
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/sync", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: queue,
        }),
      });

      const result = await response.json();

      if (result.success) {
        localStorage.removeItem("syncQueue");
        setMessage("✅ Data synced successfully.");
      } else {
        setMessage("❌ Sync failed.");
      }
    } catch (err) {
      setMessage("❌ Unable to sync.");
    }
  };

  useEffect(() => {
    const onlineHandler = () => {
      setStatus("Online");
      syncData();
    };

    const offlineHandler = () => {
      setStatus("Offline");
    };

    window.addEventListener("online", onlineHandler);
    window.addEventListener("offline", offlineHandler);

    return () => {
      window.removeEventListener("online", onlineHandler);
      window.removeEventListener("offline", offlineHandler);
    };
  }, []);

  const addDummyRecord = () => {
    const queue = JSON.parse(localStorage.getItem("syncQueue")) || [];

    queue.push({
      id: Date.now(), // unique ID
      patient: "Test Patient",
      updatedAt: Date.now(), // last-write-wins timestamp
    });

    localStorage.setItem("syncQueue", JSON.stringify(queue));

    setMessage("Record stored locally.");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Connectivity Status: {status}</h2>

      <button onClick={addDummyRecord}>
        Add Dummy Offline Record
      </button>

      <p>{message}</p>
    </div>
  );
}