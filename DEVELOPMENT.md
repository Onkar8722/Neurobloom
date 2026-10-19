# Development Guide

For local setup, see [README.md](README.md).

## Architecture

- **Frontend:** React application built with Vite in `neurobloom-frontend`; pages live in `src/pages`.
- **Backend:** Flask application in `neurobloom-backend`; `app/__init__.py` creates the app and registers API blueprints.
- **Persistence:** SQLAlchemy models in `app/models.py`; SQLite is the default database.
- **Processing:** Assessment helpers, NLP, and speech integrations are in `utils/`.

```text
neurobloom-backend/
  app/
    __init__.py       Flask app factory and extension setup
    models.py         SQLAlchemy models
    routes.py         Student, teacher, and assessment API routes
  utils/
    ml_models.py      Dyslexia and dysgraphia screening helpers
    nlp_processor.py  Text and writing analysis
    tts_stt.py        Speech service helpers
  run.py              Backend entry point
neurobloom-frontend/
  index.html          Vite HTML entry point
  vite.config.mjs     Vite and React plugin configuration
  src/
    App.jsx            Application routes and layout
    pages/             Home, login, dashboards, and activities
```

## Backend configuration

The backend loads environment variables from `.env` when `python-dotenv` is installed. Start from `neurobloom-backend/.env.example`.

| Variable | Purpose | Default |
|---|---|---|
| `PORT` | Flask development server port | `5000` |
| `DEBUG` | Enable Flask debug mode | `False` |
| `DATABASE_URL` | SQLAlchemy database URI | SQLite |
| `SECRET_KEY` | Flask secret key | Development-only fallback |
| `GOOGLE_APPLICATION_CREDENTIALS` | Google Cloud speech credentials | Unset |
| `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION` | Optional AWS configuration | Unset |

Keep credentials in a local `.env` file; never commit real credentials. The built-in secret-key fallback is for development only. Login verifies password hashes, but API requests do not yet enforce authenticated sessions. Do not deploy it as a production service without adding authorization and appropriate security controls.

## API routes

The backend routes are prefixed with `http://localhost:5000/api`.

| Method | Route | Purpose |
|---|---|---|
| `POST` | `/auth/signup` | Create an account and role-specific profile |
| `POST` | `/auth/login` | Verify credentials and return the user profile IDs |
| `GET` | `/student/profile?student_id={id}` | Read a student profile |
| `POST` | `/student/reading-activity` | Save reading activity |
| `POST` | `/student/writing-activity` | Save writing activity and analysis |
| `POST` | `/student/math-activity` | Save a math attempt |
| `GET` | `/teacher/dashboard/{student_id}` | Read student activity and assessment summaries |
| `GET` | `/teacher/class-overview` | Read the student overview |
| `POST` | `/assessment/dyslexia` | Assess recorded reading activity |
| `POST` | `/assessment/dysgraphia` | Assess recorded writing activity |
| `POST` | `/assessment/dyscalculia` | Assess recorded math activity |

Example request to record a reading activity:

```json
{
  "student_id": 1,
  "text_content": "A sample passage.",
  "reading_speed": 120,
  "accuracy_percentage": 95,
  "time_spent": 30
}
```

Send JSON request bodies with `Content-Type: application/json`. Signup accepts `username`, `email`, `password`, and `user_type` (`student`, `teacher`, or `parent`); student signups may also include `age` and `grade_level`. Passwords must be at least eight characters. Assessment routes require prior activity of the corresponding type. These assessments are prototype screening estimates and must not be used as clinical diagnoses.

## Development workflow

- Backend dependencies: `neurobloom-backend/requirements.txt`
- Frontend dependencies and Vite scripts: `neurobloom-frontend/package.json`
- Start the backend with `python run.py` from `neurobloom-backend`.
- Start the frontend with `npm start` from `neurobloom-frontend`.
- Create and review changes on a feature branch before merging.

The frontend currently targets `http://localhost:5000/api` directly. Update its API URL configuration in the page components if the backend runs elsewhere.
