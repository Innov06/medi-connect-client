import { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

function MapView() {
  const userLocation = [25.5941, 85.1376];

  const resources = [
    {
      id: 1,
      name: "Primary Health Center",
      position: [25.5955, 85.1385],
    },
    {
      id: 2,
      name: "Village Pharmacy",
      position: [25.5932, 85.1368],
    },
    {
      id: 3,
      name: "Community Hospital",
      position: [25.5968, 85.1401],
    },
  ];

  const [selectedResource, setSelectedResource] = useState(null);
  const [directions, setDirections] = useState([]);

  useEffect(() => {
    const cached = localStorage.getItem("directions");

    if (!navigator.onLine && cached) {
      setDirections(JSON.parse(cached));
    }
  }, []);

  const handleSelect = (resource) => {
    setSelectedResource(resource);

    const steps = [
      "Start from your current location.",
      "Move towards the main road.",
      `Reach ${resource.name}.`,
    ];

    setDirections(steps);

    localStorage.setItem("directions", JSON.stringify(steps));
  };

  return (
    <>
      <MapContainer
        center={userLocation}
        zoom={15}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* User Location */}
        <Marker position={userLocation}>
          <Popup>
            <b>Your Location</b>
          </Popup>
        </Marker>

        {/* Resource Markers */}
        {resources.map((resource) => (
          <Marker
            key={resource.id}
            position={resource.position}
            eventHandlers={{
              click: () => handleSelect(resource),
            }}
          >
            <Popup>
              <b>{resource.name}</b>
              <br />
              Click marker for directions.
            </Popup>
          </Marker>
        ))}

        {/* Route Line */}
        {selectedResource && (
          <Polyline
            positions={[userLocation, selectedResource.position]}
          />
        )}
      </MapContainer>

      {/* Directions Panel */}
      {selectedResource && (
        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            border: "1px solid #ccc",
            borderRadius: "8px",
          }}
        >
          <h3>Directions</h3>

          <p>
            <strong>Destination:</strong> {selectedResource.name}
          </p>

          <ol>
            {directions.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>
      )}
    </>
  );
}

export default MapView;