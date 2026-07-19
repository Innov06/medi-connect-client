import { useEffect, useState } from "react";

function ResourceList() {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    navigator.geolocation.watchPosition(() => {
      setResources([
        {
          _id: 1,
          name: "City Health Center",
          type: "Health Center",
          distance: "2.4 km",
          contact: "9876543210",
        },
        {
          _id: 2,
          name: "Apollo Pharmacy",
          type: "Pharmacy",
          distance: "4.8 km",
          contact: "9876501234",
        },
      ]);
    });
  }, []);

  return (
    <div
      style={{
        maxHeight: "300px",
        overflowY: "auto",
        border: "1px solid #ccc",
        padding: "10px",
        marginTop: "20px",
      }}
    >
      <h2>Nearby Resources</h2>

      {resources.map((item) => (
        <div
          key={item._id}
          style={{
            borderBottom: "1px solid #ddd",
            marginBottom: "10px",
            paddingBottom: "10px",
          }}
        >
          <h3>{item.name}</h3>

          <p><strong>Type:</strong> {item.type}</p>

          <p><strong>Distance:</strong> {item.distance}</p>

          <p><strong>Contact:</strong> {item.contact}</p>
        </div>
      ))}
    </div>
  );
}

export default ResourceList;