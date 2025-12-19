from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class SavedJob(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255))
    company = db.Column(db.String(255))
    location = db.Column(db.String(255))
    url = db.Column(db.String(500), unique=True)
    source = db.Column(db.String(100))
    notes = db.Column(db.Text)
    tags = db.Column(db.String(255))
    visibility = db.Column(db.String(50), default="private")


class Application(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    company = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(255), nullable=False)
    status = db.Column(db.String(50), default="Applied")
    notes = db.Column(db.Text)

   
    applied_at = db.Column(db.DateTime, default=datetime.utcnow)
