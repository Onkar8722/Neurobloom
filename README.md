# NeuroBloom

NeuroBloom is a React and Flask learning-support prototype with reading, writing, and math activities, student and teacher dashboards, and activity-based screening assessments.

> Assessment scores are experimental screening estimates, not medical diagnoses.

## Features

- Student activities for reading, writing, and math.
- Student, teacher, and parent-facing pages.
- Flask API backed by SQLite and SQLAlchemy.
- Basic assessment logic for dyslexia, dysgraphia, and dyscalculia.
- Text analysis helpers and optional speech-service integrations.

## Requirements

- Python 3.12
- Node.js and npm

## Run locally

Start the backend in a terminal:

```powershell
cd neurobloom-backend
py -3.12 -m venv venv
.\venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
Copy-Item .env.example .env
python run.py
```

The API starts at `http://localhost:5000`. The `.env` file is optional for a local run; edit it to configure the port, database, or external services. Do not commit real credentials.

Start the frontend in a second terminal:

```powershell
cd neurobloom-frontend
npm ci
npm start
```

Open `http://localhost:3000`. The current frontend uses `http://localhost:5000/api` for API requests.

## Project layout

```text
neurobloom-backend/   Flask API, database models, and processing helpers
neurobloom-frontend/  React application
Documents/            Supporting research paper
```

For the backend structure, configuration, and current API route list, see [DEVELOPMENT.md](DEVELOPMENT.md).
