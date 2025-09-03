import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Fix default marker icon issue with Leaflet in React
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

function LocationPicker({
  markerPosition,
  setMarkerPosition,
  setLocation,
}: {
  markerPosition: L.LatLng | null;
  setMarkerPosition: (pos: L.LatLng) => void;
  setLocation: (loc: string) => void;
}) {
  useMapEvents({
    click(e) {
      setMarkerPosition(e.latlng);
      setLocation(`${e.latlng.lat},${e.latlng.lng}`);
    },
  });

  return markerPosition ? <Marker position={markerPosition} /> : null;
}

function ReportIssue() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [urgent, setUrgent] = useState(false);
  const [photo, setPhoto] = useState<File | null>(null);
  const [location, setLocation] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([6.5244, 3.3792]); // Default: Lagos
  const [markerPosition, setMarkerPosition] = useState<L.LatLng | null>(null);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setMapCenter([lat, lng]);
          const latLng = L.latLng(lat, lng);
          setMarkerPosition(latLng); // <-- Add this line
          setLocation(`${lat},${lng}`); // <-- Optionally set location as well
        },
        () => {
          // If denied or error, keep default
        }
      );
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!title || !description || !category || !location) {
      setError("Please fill in all required fields.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("urgent", String(urgent));
    if (photo) {
      const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/jpg"];
      if (!allowedTypes.includes(photo.type)) {
        setError("Invalid file type. Please upload a JPEG, PNG, JPG, or GIF image.");
        return;
      }
      if (photo.size > 5 * 1024 * 1024) {
        setError("File size exceeds 5MB limit.");
        return;
      }
      formData.append("photo", photo);
    }
    formData.append("location", location);

    // Submit the form data to the server
    console.log("Submitting issue:", { title, description, location, category, photo });
    setSuccess("Issue submitted successfully!");

    setTitle("");
    setDescription("");
    setCategory("");
    setUrgent(false);
    setPhoto(null);
    setLocation("");
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Report an Issue</h2>

      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title:</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description:</label>
          <textarea
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="categorySelect">Category:</label>
          <select
            id="categorySelect"
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select a category</option>
            <option value="Road">Road</option>
            <option value="Water">Water</option>
            <option value="Electricity">Electricity</option>
            <option value="Sanitation">Sanitation</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input ms-2"
            id="urgentCheckbox"
            checked={urgent}
            onChange={(e) => setUrgent(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="urgentCheckbox">
            Urgent
          </label>
        </div>
        <div className="mb-3">
          <label className="form-label">Photo:</label>
          <input
            type="file"
            className="form-control"
            onChange={(e) => setPhoto(e.target.files?.[0] || null)}
          />
          {photo && (
            <div className="text-success small mt-1">
              Selected file: {photo.name}
            </div>
          )}
        </div>
        <div className="mb-3">
          <label className="form-label">Pick Location on Map:</label>
          <MapContainer
            center={mapCenter} // User location as default
            zoom={13}
            style={{ height: "300px", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationPicker
              markerPosition={markerPosition}
              setMarkerPosition={setMarkerPosition}
              setLocation={setLocation}
            />
          </MapContainer>
          {location && (
            <div className="text-muted small mt-1">
              Selected: {location}
            </div>
          )}
        </div>
        <button type="submit" className="btn btn-primary" disabled={!!success}>
          Submit Issue
        </button>
      </form>
    </div>
  );
}

export default ReportIssue;