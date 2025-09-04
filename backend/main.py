import os
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

UPLOAD_DIR = "uploads/"
issues = []

@app.get("/")
def read_root():
    return {"message": "FastAPI backend is running!"}

@app.post("/report-issue/")
async def report_issue(
    title: str = Form(...),
    description: str = Form(...),
    category: str = Form(...),
    urgent: bool = Form(...),
    location: str = Form(...),
    photo: UploadFile = File(None)
):
    # Save uploaded file if present
    photo_path = None
    if photo and photo.filename:
        os.makedirs(UPLOAD_DIR, exist_ok=True)
        photo_path = os.path.join(UPLOAD_DIR, photo.filename)
        with open(photo_path, "wb") as buffer:
            buffer.write(await photo.read())

    issue = {
        "title": title,
        "description": description,
        "category": category,
        "urgent": urgent,
        "location": location,
        "photo_filename": photo.filename if photo else None
    }
    issues.append(issue)
    print("Received issue:", issue)
    return {
        "message": "Issue reported successfully",
        "issue": issue
    }

@app.get("/report-issues/")
def get_issues():
    return {"issues": issues}