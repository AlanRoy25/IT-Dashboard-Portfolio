from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class SavedJob(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    company = db.Column(db.String(200))
    location = db.Column(db.String(100))
    url = db.Column(db.Text, nullable=False, unique=True)
    source = db.Column(db.String(50))
    notes = db.Column(db.Text)
    tags = db.Column(db.String(200))
    visibility = db.Column(db.Boolean, default=True)

class Application(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    company = db.Column(db.String(200), nullable=False)
    role = db.Column(db.String(200), nullable=False)
    status = db.Column(db.String(50), default="Applied")
    notes = db.Column(db.Text)