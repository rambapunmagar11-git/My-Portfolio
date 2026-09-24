"""
Flask Portfolio Application for Ramba Pun Magar
Faculty: BSc CSIT - Mahendra College, Nepalgunj, Nepal
"""

import os
import json
from datetime import datetime
from flask import Flask, render_template, request, jsonify, send_file, flash

app = Flask(__name__)
app.secret_key = os.environ.get("SECRET_KEY", "ramba-portfolio-secret-key-2026")

# Portfolio profile data
PORTFOLIO_DATA = {
    "personal": {
        "name": "Ramba Pun Magar",
        "title": "B.Sc. CSIT Student & Aspiring Software Engineer",
        "tagline": "Passionate Computer Science student with a focus on web technologies, modern frameworks, and problem-solving.",
        "phone": "+977 982-9691414",
        "email": "ramapunmagar28@gmail.com",
        "address": "Nepalgunj, Banke, Nepal",
        "permanent_address": "Rukum (West), Nepal",
        "college": "Mahendra Multiple Campus (Mahendra College)",
        "faculty": "B.Sc. Computer Science and Information Technology (B.Sc. CSIT)",
        "university": "Tribhuvan University (TU)",
        "status": "Student",
        "availability": "Open to Internships & Projects",
        "bio": (
            "Hello! I am Ramba Pun Magar, a student of B.Sc. CSIT at Mahendra College, Nepalgunj. "
            "I enjoy building responsive, accessible, and high-performance applications that solve real-world problems. "
            "With strong fundamentals in C, C++, C#, HTML, CSS, and Python, I am constantly exploring "
            "emerging technologies and eager to collaborate on impactful software engineering projects."
        ),
        "social": {
            "github": "https://github.com/rambapunmagar11-git",
            "facebook": "https://www.facebook.com/MoGarNii.11",
            "twitter": "https://twitter.com/",
            "email_link": "mailto:ramapunmagar28@gmail.com"
        }
    },
    "skills": {
        "technical": [
            {"name": "C", "level": 85, "icon": "fa-solid fa-code"},
            {"name": "C++", "level": 85, "icon": "fa-solid fa-code"},
            {"name": "C#", "level": 80, "icon": "fa-solid fa-code"},
            {"name": "HTML", "level": 95, "icon": "fa-brands fa-html5"},
            {"name": "CSS", "level": 90, "icon": "fa-brands fa-css3-alt"},
            {"name": "Python", "level": 90, "icon": "fa-brands fa-python"}
        ],
        "tools": [
            {"name": "Git", "level": 85, "icon": "fa-brands fa-git-alt"},
            {"name": "GitHub", "level": 90, "icon": "fa-brands fa-github"},
            {"name": "VS Code", "level": 95, "icon": "fa-solid fa-terminal"},
            {"name": "Vercel", "level": 85, "icon": "fa-solid fa-cloud-arrow-up"}
        ]
    },
    "projects": [
        {
            "id": 1,
            "title": "Home Service Healthcare management system",
            "category": "web",
            "badge": "Featured Healthcare Project",
            "description": "A centralized digital healthcare management platform designed for booking home healthcare services, doctor consultations, scheduling nurse visits, patient record tracking, and emergency medical assistance from home.",
            "tech": ["Python", "HTML", "CSS", "C#", "MySQL"],
            "github": "https://github.com/",
            "demo": "https://home-healthservice-managment-system.vercel.app/",
            "featured": True
        }
    ],
    "stats": [
        {"value": "B.Sc.", "label": "CSIT Student"},
        {"value": "1", "label": "Featured Healthcare Project"},
        {"value": "6", "label": "Technical Skills"},
        {"value": "4", "label": "Core Dev Tools"}
    ]
}

# In-memory message store for submitted inquiries
contact_messages = []


@app.route("/")
def index():
    return render_template("index.html", data=PORTFOLIO_DATA)


@app.route("/api/contact", methods=["POST"])
def submit_contact():
    try:
        if request.is_json:
            payload = request.get_json()
        else:
            payload = request.form.to_dict()

        name = payload.get("name", "").strip()
        email = payload.get("email", "").strip()
        subject = payload.get("subject", "").strip()
        message = payload.get("message", "").strip()

        if not name or not email or not message:
            return jsonify({
                "success": False,
                "error": "Please provide your name, email, and message."
            }), 400

        # Save submission
        inquiry = {
            "id": len(contact_messages) + 1,
            "name": name,
            "email": email,
            "subject": subject or "General Inquiry",
            "message": message,
            "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        }
        contact_messages.append(inquiry)

        return jsonify({
            "success": True,
            "message": f"Thank you, {name}! Your message has been received. I'll get back to you soon."
        }), 200

    except Exception as e:
        return jsonify({
            "success": False,
            "error": "An error occurred while processing your request. Please try again."
        }), 500


@app.route("/api/messages", methods=["GET"])
def get_messages():
    """Helper endpoint to view received contact messages (for testing/demo)"""
    return jsonify({
        "total": len(contact_messages),
        "messages": contact_messages
    })


@app.route("/download-cv")
def download_cv():
    """Generates or serves Ramba Pun Magar's Resume/CV summary"""
    docx_cv = os.path.join(app.root_path, "static", "Ramba_Pun_Magar_CV.docx")
    if os.path.exists(docx_cv):
        return send_file(docx_cv, as_attachment=True, download_name="Ramba_Pun_Magar_CV.docx")

    cv_path = os.path.join(app.root_path, "static", "resume_ramba_pun_magar.pdf")
    if os.path.exists(cv_path):
        return send_file(cv_path, as_attachment=True, download_name="Ramba_Pun_Magar_CV.pdf")

    # Fallback to generated text summary if neither docx nor pdf present
    text_cv = os.path.join(app.root_path, "static", "resume_ramba_pun_magar.txt")
    if not os.path.exists(text_cv):
        with open(text_cv, "w", encoding="utf-8") as f:
            f.write(f"RESUME - {PORTFOLIO_DATA['personal']['name']}\n")
            f.write("=" * 50 + "\n\n")
            f.write(f"Contact: {PORTFOLIO_DATA['personal']['phone']}\n")
            f.write(f"Email: {PORTFOLIO_DATA['personal']['email']}\n")
            f.write(f"Temporary Address: {PORTFOLIO_DATA['personal']['address']}\n")
            f.write(f"Permanent Address: {PORTFOLIO_DATA['personal']['permanent_address']}\n")
            f.write(f"Faculty: {PORTFOLIO_DATA['personal']['faculty']}\n")
            f.write(f"College: {PORTFOLIO_DATA['personal']['college']}\n\n")
            f.write("SUMMARY:\n" + PORTFOLIO_DATA['personal']['bio'] + "\n\n")
            f.write(f"EDUCATION:\n{PORTFOLIO_DATA['personal']['faculty']}\n{PORTFOLIO_DATA['personal']['college']}\n\n")
            f.write("TECHNICAL SKILLS:\nC, C++, C#, HTML, CSS, Python\n\n")
            f.write("TOOLS & PLATFORMS:\nGit, GitHub, VS Code, Vercel\n\n")
            f.write("FEATURED PROJECT:\nHome Service Healthcare management system\n")
    return send_file(text_cv, as_attachment=True, download_name="Ramba_Pun_Magar_CV.txt")


if __name__ == "__main__":
    app.run(debug=True, host="127.0.0.1", port=5000)
