import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function MapView() {
  const userLocation = [25.5941, 85.1376]; // Patna

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

  return (
    <MapContainer
      center={userLocation}
      zoom={15}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={userLocation}>
        <Popup>
          <b>Your Location</b>
        </Popup>
      </Marker>

      {resources.map((resource) => (
        <Marker key={resource.id} position={resource.position}>
          <Popup>
            <b>{resource.name}</b>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default MapView;