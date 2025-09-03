import { useState } from "react";

function ReportIssue() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [urgent, setUrgent] = useState(false);
    const [photo, setPhoto] = useState<File | null>(null);
    const [location, setLocation] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("category", category);
        formData.append("urgent", String(urgent));
        if (photo) {
            formData.append("photo", photo);
        }
        formData.append("location", location);

        // Submit the form data to the server
        console.log("Submitting issue:", { title, description, location, category, photo });
        alert("Issue submitted! (mock)");
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Title:</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>
            <div>
                <label>Description:</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
            </div>
            <div>
                <label>Category:</label>
                <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required />
            </div>
            <div>
                <label>Urgent:</label>
                <input type="checkbox" checked={urgent} onChange={(e) => setUrgent(e.target.checked)} />
            </div>
            <div>
                <label>Photo:</label>
                <input type="file" onChange={(e) => setPhoto(e.target.files?.[0] || null)} />
            </div>
            <div>
                <label>Location:</label>
                <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />
            </div>
            <button type="submit">Submit Issue</button>
        </form>
    )
}

export default ReportIssue;