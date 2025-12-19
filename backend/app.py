from flask import Flask, request, jsonify
from flask_cors import CORS
from models import db, SavedJob, Application

# Flask setup
app = Flask(__name__)
CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///jobs.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)

with app.app_context():
    db.create_all()


# saved jobs routes

@app.route("/saved-jobs", methods=["POST"])
def save_job():
    data = request.json

    if not data or not data.get("url"):
        return jsonify({"error": "Invalid data"}), 400

    if SavedJob.query.filter_by(url=data["url"]).first():
        return jsonify({"message": "Already bookmarked"}), 200

    job = SavedJob(
        title=data.get("title"),
        company=data.get("company"),
        location=data.get("location"),
        url=data.get("url"),
        source=data.get("source", "Remotive"),
    )

    db.session.add(job)
    db.session.commit()
    return jsonify({"message": "Job bookmarked"}), 201


@app.route("/saved-jobs", methods=["GET"])
def get_saved_jobs():
    return jsonify([
        {
            "id": j.id,
            "title": j.title,
            "company": j.company,
            "location": j.location,
            "url": j.url,
            "source": j.source,
            "notes": j.notes,
            "tags": j.tags,
            "visibility": j.visibility,
        }
        for j in SavedJob.query.all()
    ])


@app.route("/saved-jobs/by-url", methods=["DELETE"])
def delete_job_by_url():
    data = request.json
    job = SavedJob.query.filter_by(url=data.get("url")).first()

    if not job:
        return jsonify({"message": "Not bookmarked"}), 200

    db.session.delete(job)
    db.session.commit()
    return jsonify({"message": "Job unbookmarked"}), 200


@app.route("/saved-jobs/<int:id>", methods=["PUT"])
def update_saved_job(id):
    job = SavedJob.query.get_or_404(id)
    data = request.json or {}

    job.notes = data.get("notes", job.notes)
    job.tags = data.get("tags", job.tags)
    job.visibility = data.get("visibility", job.visibility)

    db.session.commit()
    return jsonify({"message": "Job updated"}), 200


@app.route("/saved-jobs/<int:id>", methods=["DELETE"])
def delete_saved_job(id):
    job = SavedJob.query.get_or_404(id)
    db.session.delete(job)
    db.session.commit()
    return jsonify({"message": "Job removed"}), 200


# applications routes

@app.route("/applications", methods=["POST"])
def create_application():
    data = request.json

    if not data or not data.get("company") or not data.get("role"):
        return jsonify({"error": "Invalid data"}), 400

    app_item = Application(
        company=data["company"],
        role=data["role"],
        status=data.get("status", "Applied"),
        notes=data.get("notes"),
        # applied_at is AUTO
    )

    db.session.add(app_item)
    db.session.commit()
    return jsonify({"message": "Application added"}), 201


@app.route("/applications", methods=["GET"])
def get_applications():
    return jsonify([
        {
            "id": a.id,
            "company": a.company,
            "role": a.role,
            "status": a.status,
            "notes": a.notes,
            # ✅ SEND DATE TO FRONTEND
            "applied_at": a.applied_at.isoformat() if a.applied_at else None,
        }
        for a in Application.query.order_by(Application.applied_at.desc()).all()
    ])


@app.route("/applications/<int:id>", methods=["PUT"])
def update_application(id):
    app_item = Application.query.get_or_404(id)
    data = request.json or {}

    app_item.status = data.get("status", app_item.status)
    app_item.notes = data.get("notes", app_item.notes)

    db.session.commit()
    return jsonify({"message": "Application updated"}), 200


@app.route("/applications/<int:id>", methods=["DELETE"])
def delete_application(id):
    app_item = Application.query.get_or_404(id)
    db.session.delete(app_item)
    db.session.commit()
    return jsonify({"message": "Application removed"}), 200


# server run

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
