# NeuroBloom Installation Guide

## System Requirements

- **OS**: Windows 10/11, macOS 10.14+, or Linux
- **Python**: 3.12.x
- **Node.js**: 14 or higher
- **RAM**: 4GB minimum, 8GB recommended
- **Disk Space**: 2GB

## Step-by-Step Installation

### 1. Clone or Extract Project

```bash
cd c:\Users\NSPatil\Videos\Project
```

### 2. Backend Setup

#### 2.1 Create Virtual Environment

**Windows:**
```bash
cd neurobloom-backend
py -3.12 -m venv venv
```

**macOS/Linux:**
```bash
cd neurobloom-backend
python3.12 -m venv venv
```

#### 2.2 Activate Virtual Environment

**Windows:**
```bash
venv\Scripts\activate
```

**macOS/Linux:**
```bash
source venv/bin/activate
```

#### 2.3 Install Python Dependencies

**Windows:**
```bash
venv\Scripts\python.exe -m pip install --upgrade pip setuptools wheel
venv\Scripts\python.exe -m pip install --only-binary=:all: -r requirements.txt
```

**macOS/Linux:**
```bash
venv/bin/python -m pip install --upgrade pip setuptools wheel
venv/bin/python -m pip install --only-binary=:all: -r requirements.txt
```

This will install:
- Flask and Flask extensions
- Machine learning libraries (TensorFlow, scikit-learn)
- NLP libraries (NLTK, spaCy)
- Cloud APIs (Google Cloud)
- Database ORM (SQLAlchemy)
- And more...

#### 2.4 Download NLTK Data

The first time you run the backend, NLTK will automatically download required data. Alternatively, download manually:

```bash
python -c "import nltk; nltk.download('punkt'); nltk.download('words')"
```

#### 2.5 Configure Environment Variables

```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```
FLASK_ENV=development
DEBUG=True
SECRET_KEY=change-this-to-random-string
DATABASE_URL=sqlite:///neurobloom.db
PORT=5000
```

#### 2.6 Verify Backend Installation

```bash
python run.py
```

Expected output:
```
WARNING in app.run_dev - This is a development server.
Running on http://127.0.0.1:5000/
```

Press Ctrl+C to stop the server.

### 3. Frontend Setup

#### 3.1 Navigate to Frontend Directory

```bash
cd ..\neurobloom-frontend
```

#### 3.2 Install Node Dependencies

```bash
npm install
```

This will install all packages listed in `package.json` including React, Bootstrap, Axios, etc.

#### 3.3 Configure Environment (Optional)

Create `.env` file in frontend root:
```
REACT_APP_API_URL=http://localhost:5000/api
```

#### 3.4 Verify Frontend Installation

```bash
npm start
```

This will:
- Start development server on http://localhost:3000
- Open browser automatically
- Enable hot reloading

## Verification Checklist

- [ ] Backend virtual environment activated
- [ ] All Python packages installed (`pip list`)
- [ ] All NPM packages installed (`npm list`)
- [ ] `.env` files created and configured
- [ ] Backend starts without errors
- [ ] Frontend starts and opens in browser
- [ ] Can navigate to Home page

## Running the Application

### Terminal 1: Backend Server
```bash
cd neurobloom-backend
venv\Scripts\activate  # Windows
python run.py
```

Expected: Server running on http://localhost:5000

### Terminal 2: Frontend Server
```bash
cd neurobloom-frontend
npm start
```

Expected: App opens on http://localhost:3000

## First Use

1. **Visit Home Page**
   - http://localhost:3000
   - Explore feature descriptions

2. **Create Account**
   - Click "Get Started" or go to Login page
   - Click "Sign Up" tab
   - Try with user type "Student"
   - Fill in sample data (age: 15, grade: 9)

3. **Try Activities**
   - Complete reading/writing/math activities
   - View data in Teacher Dashboard

## Troubleshooting

### Python Dependencies Issue
**Problem**: `ModuleNotFoundError: No module named 'flask'`
**Solution**: 
```bash
pip install -r requirements.txt
# Verify with:
pip list | grep Flask
```

### NLTK Data Missing
**Problem**: `LookupError: Resource punkt not found`
**Solution**:
```bash
python -c "import nltk; nltk.download('punkt'); nltk.download('words')"
```

### Port Already in Use
**Problem**: `OSError: [Errno 10048] Only one usage of each socket address`
**Solution**:
```bash
# Change port in .env or find process using port:
netstat -ano | findstr :5000  # Windows
lsof -i :5000  # macOS/Linux
```

### Node Modules Issue
**Problem**: `npm ERR! code ERESOLVE`
**Solution**:
```bash
npm install --legacy-peer-deps
# Or clear cache:
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Can't Connect to Backend
**Problem**: Frontend shows API connection errors
**Solution**:
1. Verify backend is running: http://localhost:5000
2. Check `REACT_APP_API_URL` in frontend `.env`
3. Ensure CORS is enabled in Flask

## Uninstall/Reset

### Remove Virtual Environment
```bash
# Windows
rmdir /s venv

# macOS/Linux
rm -rf venv
```

### Clear Frontend Dependencies
```bash
rm -rf node_modules package-lock.json
```

### Reset Database
```bash
# Delete SQLite database file
rm neurobloom.db
```

## Next Steps

1. Read [DEVELOPMENT.md](DEVELOPMENT.md) for architecture details
2. Explore the code structure
3. Review ML models in `neurobloom-backend/utils/ml_models.py`
4. Try modifying a React component
5. Add your own learning activities

## Additional Resources

- Flask Documentation: https://flask.palletsprojects.com/
- React Documentation: https://react.dev/
- SQLAlchemy: https://docs.sqlalchemy.org/
- scikit-learn: https://scikit-learn.org/
- Google Cloud APIs: https://cloud.google.com/docs

## Getting Help

If you encounter issues:

1. Check error messages carefully
2. Search for solutions online
3. Review project documentation
4. Check the original research paper
5. Test components individually

---

**Installation complete!** You're ready to start developing with NeuroBloom.
