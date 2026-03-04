# Google Cloud Summit Event Scheduler

A stunning, 1-day technical conference informational website built with Python, Flask, HTML, Vanilla CSS, and JS. 

## Features
- Dynamic event schedule reading from backend API definitions.
- Modern, dynamic frontend aesthetics with dark mode, glassmorphism, and responsive design.
- Lightning-fast Vanilla JS client-side searching and filtering by Title, Speaker, and Category.
- Dummy data providing 8 high-level conceptual Google Cloud talks and a networking lunch.
- Speaker profiles linked with their real or proxy LinkedIn profiles.

## Prerequisites
- Python 3.8+
- PIP

## Setup Instructions

1. **Navigate to the directory**
   Ensure you are inside the `google-antigravity` folder:
   ```bash
   cd path/to/google-antigravity
   ```

2. **(Optional) Create a virtual environment**
   ```bash
   python -m venv venv
   # Windows:
   venv\Scripts\activate
   # Mac/Linux:
   source venv/bin/activate
   ```

3. **Install Dependencies**
   Install Flask:
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the Server**
   ```bash
   python app.py
   ```

5. **View the Website**
   Open your browser and navigate to:
   [http://127.0.0.1:5000](http://127.0.0.1:5000)

## Further Changes
- **Modifying the Schedule or Speakers:** Edit `data.py`. The frontend automatically adapts to any lists.
- **Adjusting the Styles:** Look into `static/css/style.css`.
- **Modifying Client Search Logic:** Look into `static/js/main.js`.
