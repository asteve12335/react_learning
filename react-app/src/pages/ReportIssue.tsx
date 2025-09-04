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
  const [submittedIssue, setSubmittedIssue] = useState<any>(null);

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

  // ...inside your handleSubmit function in ReportIssue.tsx

const handleSubmit = async (e: React.FormEvent) => {
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
  if (photo) formData.append("photo", photo);
  formData.append("location", location);

  try {
    const response = await fetch("http://localhost:8000/report-issue/", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    console.log(data); // <--- This will show the submitted data in the console

    if (!response.ok) {
      throw new Error("Failed to submit issue.");
    }

    setSuccess(data.message || "Issue submitted successfully!");
    setSubmittedIssue(data.issue); // <-- Store the submitted issue

    

    // Reset form fields
    setTitle("");
    setDescription("");
    setCategory("");
    setUrgent(false);
    setPhoto(null);
    setLocation("");
    setMarkerPosition(null); // if you use markerPosition
  } catch (err: any) {
    setError(err.message || "An error occurred.");
  }
};

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Report an Issue</h2>

      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      {/* Display submitted issue here */}
      {submittedIssue && (
        <div className="card my-3">
          <div className="card-body">
            <h5 className="card-title">{submittedIssue.title}</h5>
            <p className="card-text"><strong>Description:</strong> {submittedIssue.description}</p>
            <p className="card-text"><strong>Category:</strong> {submittedIssue.category}</p>
            <p className="card-text"><strong>Urgent:</strong> {submittedIssue.urgent ? "Yes" : "No"}</p>
            <p className="card-text"><strong>Location:</strong> {submittedIssue.location}</p>
            {submittedIssue.photo_filename && (
            <p className="card-text"><strong>Photo:</strong> {submittedIssue.photo_filename}</p>
          )}
          </div>
        </div>
      )}

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