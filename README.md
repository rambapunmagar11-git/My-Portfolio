# Personal Portfolio - Ramba Pun Magar

A modern, professional, and responsive personal portfolio website for **Ramba Pun Magar**, a **B.Sc. CSIT** student at **Mahendra College, Nepalgunj, Nepal**.

Built using **Python (Flask)**, **HTML5**, modern **CSS3**, and **JavaScript (ES6+)**.

---

## 🌟 Key Features

- **Hero Section**:
  - Dynamic Typewriter effect highlighting current roles and tech competencies.
  - Quick academic badge chips for **B.Sc. CSIT**, **Mahendra College, Nepalgunj**, and direct phone link.
  - Floating badges with CSS keyframe animation and subtle glow effects.
  - Prominent CTAs: *Explore My Work*, *Get in Touch*, and *Download CV*.
- **About Me Section**:
  - Detailed biography highlighting academic journey and software engineering passions.
  - Interactive quick-facts cards (Full Name, Address: Nepalgunj, Faculty & College, Contact Info).
  - Key statistical counters (Semester, Projects, Core Tech, Dedication).
- **Education Section**:
  - Timeline highlighting **Mahendra Multiple Campus (Mahendra College), Nepalgunj** (Tribhuvan University affiliated).
  - In-depth semester milestone progression tracker for the B.Sc. CSIT curriculum.
  - Subject tags covering *Software Engineering, DBMS, Web Technology, Operating Systems, Computer Networks, and Artificial Intelligence*.
- **Skills Section**:
  - Categorized skill breakdown: *Frontend*, *Backend & Programming*, *Database & Dev Tools*, and *Soft Skills*.
  - Smooth animated skill progress meters powered by `IntersectionObserver`.
- **Projects Showcase**:
  - Interactive category filter (*All, Web Applications, Academic, Python & ML*).
  - Highlighting real-world & college projects:
    - *Nepalgunj Explore (Local Tourism Portal)*
    - *Campus Attendance & Notice System*
    - *Student Academic Performance Predictor*
    - *Modern Personal Portfolio*
  - Interactive modal dialogs for project details and GitHub/Demo links.
- **Contact Section**:
  - Direct contact cards with address (*Nepalgunj, Banke, Nepal*), phone number, email, and college details.
  - Working AJAX contact form with input validation, asynchronous submission to Flask backend (`/api/contact`), and toast notification feedback.
- **Theme & Interactivity**:
  - Dark Mode & Light Mode switch with persistent preference saved in `localStorage`.
  - Fully responsive on mobile phones, tablets, laptops, and ultra-wide screens.
  - Glassmorphism UI, gradient accents, floating ambient glows, and smooth page scrolling.

---

## 🚀 How to Run the Website

### Prerequisites
Make sure Python (3.8+) is installed on your computer.

### Step 1: Open Terminal in Project Directory
Navigate to:
```bash
cd C:\Users\Uti\.gemini\antigravity\scratch\ramba_portfolio
```

### Step 2: Install Dependencies
```bash
pip install -r requirements.txt
```
*(Flask is already installed on your system!)*

### Step 3: Run the Application
```bash
python app.py
```

### Step 4: Open in Your Browser
Open your browser and visit:
```
http://127.0.0.1:5000
```

---

## 📁 Project Structure

```
ramba_portfolio/
│
├── app.py                     # Flask application with routes and API logic
├── requirements.txt           # Python dependencies
├── README.md                  # Documentation and setup guide
│
├── templates/
│   ├── base.html              # Base layout with navbar, theme toggle & footer
│   └── index.html             # One-page portfolio layout with all sections
│
└── static/
    ├── css/
    │   └── style.css          # Custom styling (CSS variables, glassmorphism, responsive)
    ├── js/
    │   └── main.js            # Interactive behaviors (typewriter, filter, modal, AJAX)
    └── resume_ramba_pun_magar.txt # Downloadable CV summary
```

---

## ✏️ Customizing Personal Details

To modify any profile information, update the `PORTFOLIO_DATA` dictionary in `app.py`:
- `name`: Change full name
- `phone`: Change contact number
- `email`: Change email address
- `address`: Change location details
- `college`: Change college name
- `faculty`: Change faculty name
- `projects`: Add, edit, or remove project showcases
