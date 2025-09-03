from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow CORS for your frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Replace with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/report-issue/")
async def report_issue(
    title: str = Form(...),
    description: str = Form(...),
    category: str = Form(...),
    urgent: bool = Form(...),
    location: str = Form(...),
    photo: UploadFile = File(...)
):
    # Here you can save the data to a database and the file to disk/cloud
    # For now, just return a success message
    return {
        "message": "Issue reported successfully",
        "title": title,
        "description": description,
        "category": category,
        "urgent": urgent,
        "location": location,
        "photo": photo.filename if photo else None
    }