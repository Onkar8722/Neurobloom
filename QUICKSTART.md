# NeuroBloom Quick Start Guide

## ⚡ 5-Minute Setup

### Prerequisites Check
- ✅ Python 3.8+ installed
- ✅ Node.js 14+ installed
- ✅ Git installed

## Step 1: Clone/Extract Project
```bash
cd c:\Users\NSPatil\Videos\Project
```

## Step 2: Start Backend (Terminal 1)

```bash
cd neurobloom-backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run server
python run.py
```

**Expected Output:**
```
WARNING in app.run_dev - This is a development server.
Running on http://127.0.0.1:5000/
Press Ctrl+C to quit
```

✅ Backend running on `http://localhost:5000`

## Step 3: Start Frontend (Terminal 2)

```bash
cd neurobloom-frontend

# Install dependencies
npm install

# Start development server
npm start
```

**Expected Output:**
```
webpack compiled with 1 warning
compiled successfully
You can now view neurobloom-frontend in the browser.
  Local:            http://localhost:3000
```

✅ Frontend running on `http://localhost:3000`

## Step 4: Try It Out!

1. **Open Browser**: http://localhost:3000
2. **Click "Get Started"**
3. **Sign Up** as a Student:
   - Username: `student1`
   - Email: `student@test.com`
   - Password: `password`
   - Age: `15`
   - Grade: `9`

4. **Explore Activities**:
   - 📖 Try Reading Practice
   - ✍️ Try Writing Practice  
   - 🔢 Try Math Practice

5. **Switch to Teacher View**:
   - Go back and login as Teacher
   - View Class Overview
   - Run Assessments

## Available Demo Data

### Test Credentials
- **Student**: Username `student1` / Password `password`
- **Teacher**: Username `teacher1` / Password `password`
- **Parent**: Username `parent1` / Password `password`

## Project Structure Quick Overview

```
Project/
├── README.md                    ← Project overview
├── INSTALLATION.md              ← Detailed setup guide
├── DEVELOPMENT.md               ← Architecture & code guide
├── API_DOCUMENTATION.md         ← API reference
├── PROJECT_SUMMARY.md           ← Implementation summary
│
├── neurobloom-backend/          ← Python Flask server
│   ├── app/                     ← Core application
│   │   ├── __init__.py          (Flask app setup)
│   │   ├── models.py            (Database models)
│   │   └── routes.py            (API endpoints)
│   ├── utils/                   ← Helper functions
│   │   ├── ml_models.py         (ML classifiers)
│   │   ├── nlp_processor.py     (Text analysis)
│   │   └── tts_stt.py           (Speech API)
│   ├── requirements.txt         ← Python packages
│   └── run.py                   ← Start server
│
└── neurobloom-frontend/         ← React app
    ├── src/
    │   ├── pages/               ← React components
    │   ├── App.js               ← Main app
    │   └── index.js             ← Entry point
    ├── package.json             ← NPM packages
    └── public/                  ← Static files
```

## Key Features to Explore

### For Students 👨‍🎓
```
Dashboard → Activities (Reading/Writing/Math) → Results
```

### For Teachers 👨‍🏫
```
Class Overview → Select Student → View Dashboard → Run Assessment
```

### For Parents 👨‍👩‍👧
```
Login → Portal → View Child Progress
```

## Common Issues & Quick Fixes

| Issue | Fix |
|-------|-----|
| Port 5000 in use | Change `PORT` in `.env` |
| `ModuleNotFoundError` | Run `pip install -r requirements.txt` |
| `npm ERR!` | Run `npm install --legacy-peer-deps` |
| Blank page | Check browser console (F12) for errors |
| API errors | Ensure backend is running on port 5000 |

## What You Can Do Now

### 1. Complete a Reading Activity
- Frontend will track reading speed
- Backend calculates metrics
- Results saved to database

### 2. Complete a Writing Activity
- Write some text
- System detects spelling/grammar errors
- Feedback shown in real-time

### 3. Solve Math Problems
- Answer randomly generated math questions
- System tracks accuracy
- Score updates in real-time

### 4. Run an Assessment
- As teacher, select a student
- Click "Dyslexia Assessment" button
- System analyzes reading patterns
- Risk score displayed (0-1 scale)

### 5. View Dashboards
- **Student Dashboard**: Personal progress
- **Teacher Dashboard**: Class overview & analytics
- **Parent Dashboard**: Child's activity summary

## Next Steps

### Learn the Code
1. Start with `app/__init__.py` (Flask setup)
2. Explore `app/models.py` (Database structure)
3. Check `app/routes.py` (API endpoints)
4. Review ML models in `utils/ml_models.py`

### Try Modifications
1. Add new learning activity type
2. Modify assessment thresholds
3. Change UI colors/styling
4. Add new metrics to dashboard

### Deploy
1. Read INSTALLATION.md for production setup
2. Consider Heroku for backend
3. Consider Vercel for frontend
4. Set up PostgreSQL database

## Documentation Map

- **Getting Started**: This file (you are here)
- **Installation Details**: `INSTALLATION.md`
- **Project Overview**: `README.md`
- **Architecture Details**: `DEVELOPMENT.md`
- **API Reference**: `API_DOCUMENTATION.md`
- **Implementation Summary**: `PROJECT_SUMMARY.md`

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+C` | Stop server (in terminal) |
| `F12` | Open browser developer tools |
| `Ctrl+Shift+K` | Clear console |
| `Ctrl+R` | Refresh page |

## Testing the API Directly

### Read Student Profile
```bash
curl http://localhost:5000/api/student/profile?student_id=1
```

### Submit Math Activity
```bash
curl -X POST http://localhost:5000/api/student/math-activity \
  -H "Content-Type: application/json" \
  -d '{"student_id": 1, "problem": "5+3", "student_answer": "8", "correct_answer": "8", "time_spent": 10}'
```

### Run Assessment
```bash
curl -X POST http://localhost:5000/api/assessment/dyslexia \
  -H "Content-Type: application/json" \
  -d '{"student_id": 1}'
```

## Performance Tips

- **Clear browser cache** if UI doesn't update: `Ctrl+Shift+Delete`
- **Restart both servers** if experiencing issues
- **Check terminal for error messages**
- **Use browser DevTools** (F12) to inspect API calls

## Database

- **Location**: `neurobloom-backend/neurobloom.db`
- **Type**: SQLite (auto-created)
- **Tables**: Users, Profiles, Activities, Assessments
- **To reset**: Delete the `.db` file (recreates on startup)

## Getting Help

1. **Check error messages** in terminal and browser console
2. **Read INSTALLATION.md** for detailed troubleshooting
3. **Review DEVELOPMENT.md** for architecture questions
4. **Check API_DOCUMENTATION.md** for endpoint details

## What's Implemented ✅

- [x] Student login/signup
- [x] Teacher dashboard
- [x] Reading practice
- [x] Writing practice
- [x] Math practice
- [x] ML-based assessments
- [x] Progress tracking
- [x] NLP text analysis
- [x] Database persistence
- [x] Responsive design

## What's Next 🚀

- [ ] Add emotion detection
- [ ] Implement reinforcement learning
- [ ] Create mobile app
- [ ] Add gamification
- [ ] Multi-language support
- [ ] Parent-teacher messaging

## Have Fun! 🎉

You now have a working AI-powered learning platform. Explore the code, make changes, and experiment!

**Remember**: Start the backend first, then the frontend!

---

**Quick Access**
- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- Docs: Read markdown files in project root

**Ready?** Run the backend and frontend in separate terminals! 🚀
