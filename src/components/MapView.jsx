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
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);

    const handleOffline = () => {
      setIsOffline(true);

      const cached = localStorage.getItem("directions");

      if (cached) {
        setDirections(JSON.parse(cached));
      }
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    if (!navigator.onLine) {
      const cached = localStorage.getItem("directions");

      if (cached) {
        setDirections(JSON.parse(cached));
      }
    }

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const handleSelect = (resource) => {
    setSelectedResource(resource);

    const steps = [
      t("step1"),
      t("step2"),
      `${t("reach")} ${resource.name}`,
    ];

    setDirections(steps);

    localStorage.setItem("directions", JSON.stringify(steps));
  };

  return (
    <>
      <div
        style={{
          borderRadius: "15px",
          overflow: "hidden",
          boxShadow: "0 8px 20px rgba(0,0,0,.15)",
        }}
      >
        <MapContainer
          center={userLocation}
          zoom={15}
          style={{
            height: "450px",
            width: "100%",
          }}
        >
          <TileLayer
            attribution="© OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* User Location */}
          <Marker position={userLocation}>
            <Popup>
              <div style={{ minWidth: "180px" }}>
                <h3 style={{ color: "#1976d2" }}>
                  📍 Your Location
                </h3>

                <p>
                  Current Position
                </p>
              </div>
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
                <div style={{ minWidth: "220px" }}>
                  <h3
                    style={{
                      color: "#2E7D32",
                    }}
                  >
                    {resource.name}
                  </h3>

                  <hr />

                  <p>
                    <strong>🏷 Type:</strong>{" "}
                    {resource.type}
                  </p>

                  <p>
                    <strong>📍 Address:</strong>{" "}
                    {resource.address}
                  </p>

                  <p>
                    <strong>📞 Contact:</strong>{" "}
                    {resource.contact}
                  </p>

                  <hr />

                  <p
                    style={{
                      color: "#1976d2",
                      fontWeight: "bold",
                    }}
                  >
                    Click marker to get directions
                  </p>
                </div>
              </Popup>
            </Marker>
          ))}

          {selectedResource && (
            <Polyline
              positions={[
                userLocation,
                selectedResource.position,
              ]}
              pathOptions={{
                color: "#1976d2",
                weight: 5,
              }}
            />
          )}
        </MapContainer>
      </div>

      {/* Direction Panel */}

      {selectedResource && (
        <div
          style={{
            marginTop: "25px",
            background: "#ffffff",
            padding: "20px",
            borderRadius: "15px",
            boxShadow: "0 5px 20px rgba(0,0,0,.1)",
          }}
        >
          <h2
            style={{
              color: "#1565C0",
            }}
          >
            🧭 {t("directions")}
          </h2>

          {isOffline && (
            <div
              style={{
                background: "#FFF3CD",
                color: "#856404",
                padding: "10px",
                borderRadius: "8px",
                marginBottom: "15px",
              }}
            >
              ⚠ Offline Mode - Showing Cached Directions
            </div>
          )}

          <p>
            <strong>
              🎯 {t("destination")}:
            </strong>{" "}
            {selectedResource.name}
          </p>

          <ol>
            {directions.map((step, index) => (
              <li
                key={index}
                style={{
                  marginBottom: "10px",
                }}
              >
                {step}
              </li>
            ))}
          </ol>
        </div>
      )}
    </>
  );
}

export default MapView;