from pydantic import BaseModel
from typing import Optional

class ReportIssue(BaseModel):
    title: str
    description:str
    category: str
    urgent: bool
    location: str
    # photo will be handled as a file upload, npt as a string
