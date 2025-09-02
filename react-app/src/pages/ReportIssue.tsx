import { useState } from "react";
import styles from "../styles/ReportIssue.module.css";

function ReportIssue() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("road");
  const [photo, setPhoto] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // later: send this to FastAPI backend
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("location", location);
    formData.append("category", category);
    if (photo) formData.append("photo", photo);

    console.log("Submitting issue:", { title, description, location, category, photo });
    alert("Issue submitted! (mock)");
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Report an Issue</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label>
          Title
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>

        <label>
          Description
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>

        <label>
          Location
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter street or use GPS"
            required
          />
        </label>

        <label>
          Category
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="road">Road</option>
            <option value="lighting">Lighting</option>
            <option value="waste">Waste</option>
            <option value="water">Water</option>
            <option value="other">Other</option>
          </select>
        </label>

        <label>
          Photo (optional)
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setPhoto(e.target.files?.[0] || null)}
          />
        </label>

        <button type="submit">Submit Issue</button>
      </form>
    </div>
  );
}

export default ReportIssue;
