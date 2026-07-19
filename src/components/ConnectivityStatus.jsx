import { useEffect, useState } from "react";

function ConnectivityStatus() {
  const [online, setOnline] = useState(navigator.onLine);

  useEffect(() => {
    const goOnline = () => setOnline(true);
    const goOffline = () => setOnline(false);

    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);

    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, []);

  return (
    <div
      style={{
        padding: "10px",
        textAlign: "center",
        color: "white",
        backgroundColor: online ? "green" : "red",
        marginBottom: "20px",
      }}
    >
      {online ? "🟢 Online" : "🔴 Offline"}
    </div>
  );
}

export default ConnectivityStatus;