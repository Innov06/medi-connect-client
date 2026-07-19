import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

function MapView() {
  const { t } = useTranslation();

  const userLocation = [25.5941, 85.1376];

  const resources = [
    {
      id: 1,
      name: "🏥 Primary Health Center",
      type: "Clinic",
      address: "Patna, Bihar",
      contact: "+91 9876543210",
      position: [25.5955, 85.1385],
    },
    {
      id: 2,
      name: "💊 Village Pharmacy",
      type: "Pharmacy",
      address: "Patna, Bihar",
      contact: "+91 9123456780",
      position: [25.5932, 85.1368],
    },
    {
      id: 3,
      name: "🚑 Community Hospital",
      type: "Hospital",
      address: "Patna, Bihar",
      contact: "+91 9988776655",
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
      t("step1"),
      t("step2"),
      `${t("reach")} ${resource.name}.`,
    ];

    setDirections(steps);

    localStorage.setItem("directions", JSON.stringify(steps));
  };

  return (
    <>
      <MapContainer
        center={userLocation}
        zoom={15}
        style={{
          height: "400px",
          width: "100%",
        }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* User Location */}
        <Marker position={userLocation}>
          <Popup>
            <b>📍 Your Location</b>
          </Popup>
        </Marker>

        {/* Health Resources */}
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
              <br />

              <strong>Type:</strong> {resource.type}

              <br />

              <strong>Address:</strong> {resource.address}

              <br />

              <strong>Contact:</strong> {resource.contact}

              <br />
              <br />

              Click marker for directions.
            </Popup>
          </Marker>
        ))}

        {/* Route */}
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
            borderRadius: "10px",
          }}
        >
          <h3>{t("directions")}</h3>

          <p>
            <strong>{t("destination")}:</strong>{" "}
            {selectedResource.name}
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