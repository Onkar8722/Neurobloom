# NeuroBloom Development Guide

## Project Architecture Overview

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Frontend (React.js)                      │
│  - Student Dashboard, Teacher Dashboard, Parent Portal      │
│  - Reading/Writing/Math Activities                          │
│  - Interactive Progress Tracking                            │
└────────────────────────┬────────────────────────────────────┘
                         │ HTTP/REST API
┌────────────────────────▼────────────────────────────────────┐
│                   Backend (Flask)                            │
│  - REST API Endpoints                                       │
│  - Request Validation                                       │
│  - Business Logic                                           │
└────────────────────────┬────────────────────────────────────┘
                         │
        ┌────────────────┼────────────────┐
        │                │                │
┌───────▼────────┐ ┌─────▼──────┐ ┌─────▼──────┐
│   Database     │ │ ML Models  │ │ NLP/TTS/STT│
│  (SQLite/      │ │  (Random   │ │   (Google  │
│   PostgreSQL)  │ │  Forest)   │ │   Cloud)   │
└────────────────┘ └────────────┘ └────────────┘
```

## Component Descriptions

### Frontend Components

#### Home Page (`src/pages/Home.js`)
- Landing page with feature overview
- Call-to-action buttons
- Feature cards describing each module

#### Login Page (`src/pages/Login.js`)
- User authentication
- Support for three user types: Student, Teacher, Parent
- Sign-up form with role-specific fields

#### Student Dashboard (`src/pages/StudentDashboard.js`)
- Profile information
- Learning activity shortcuts
- Assessment history with risk scores
- Progress indicators

#### Teacher Dashboard (`src/pages/TeacherDashboard.js`)
- Class overview
- Individual student dashboards
- Quick assessment tools
- Performance metrics

#### Activity Pages
- **ReadingActivity.js**: Text reading with speed/accuracy tracking
- **WritingActivity.js**: Writing prompt response with error analysis
- **MathActivity.js**: Interactive math problems with feedback

### Backend Components

#### Database Models (`app/models.py`)
- User, StudentProfile, TeacherProfile
- Assessment, ReadingActivity, WritingActivity, MathActivity
- Relationships and schema

#### Routes (`app/routes.py`)
- Student routes: profile, activities
- Teacher routes: dashboard, class overview
- Assessment routes: disorder detection endpoints

#### ML Models (`utils/ml_models.py`)
- DyslexiaDetector: Analyzes reading patterns
- DysgraphiaDetector: Analyzes writing patterns
- DyscalculiaDetector: Analyzes math performance

#### NLP Processor (`utils/nlp_processor.py`)
- Text processing and analysis
- Spelling/grammar error detection
- Reading level calculation
- Comprehension assessment

#### TTS/STT (`utils/tts_stt.py`)
- Google Cloud API integration
- Fallback to offline pyttsx3
- Speech-to-text conversion
- Text-to-speech synthesis

## Data Flow

### Learning Activity Submission Flow

```
1. Student completes activity (e.g., reading)
   ↓
2. Frontend submits data via API
   POST /api/student/reading-activity
   {student_id, text, reading_speed, accuracy, time}
   ↓
3. Backend receives and validates data
   ↓
4. Data stored in database (ReadingActivity table)
   ↓
5. Response sent back to frontend
   ↓
6. Frontend displays feedback/progress
```

### Assessment Flow

```
1. Teacher triggers assessment
   ↓
2. System collects recent activity data
   ↓
3. ML model extracts relevant features
   ↓
4. Classification model predicts risk score
   ↓
5. Assessment saved to database
   ↓
6. Dashboard updated with results
```

## Development Workflow

### Adding a New Feature

1. **Database Changes**
   - Modify `app/models.py` to add new model or fields
   - Create database migration

2. **Backend API**
   - Add endpoint in `app/routes.py`
   - Add business logic if needed

3. **Frontend**
   - Create new component in `src/pages/` or `src/components/`
   - Add route in `src/App.js`
   - Add styling in `src/App.css`

4. **Testing**
   - Test API endpoint manually
   - Test frontend component
   - Test integration

### ML Model Updates

1. **Data Preparation**
   - Collect and clean training data
   - Place in `data/` directory

2. **Model Training**
   - Update model class in `utils/ml_models.py`
   - Implement training logic
   - Save model weights

3. **Integration**
   - Load model in routes
   - Test predictions

4. **Deployment**
   - Update model files
   - Version control model artifacts

## Configuration

### Environment Variables

Backend (`.env`):
```
FLASK_ENV=development
DEBUG=True
SECRET_KEY=your-secret-key
DATABASE_URL=sqlite:///neurobloom.db
GOOGLE_APPLICATION_CREDENTIALS=path/to/credentials.json
PORT=5000
```

Frontend (`.env`):
```
REACT_APP_API_URL=http://localhost:5000/api
```

## Running Tests

### Backend Tests
```bash
cd neurobloom-backend
pytest tests/
```

### Frontend Tests
```bash
cd neurobloom-frontend
npm test
```

## Deployment

### Backend Deployment (Heroku/AWS)
```bash
# Prepare
pip freeze > requirements.txt

# Deploy
git push heroku main
```

### Frontend Deployment (Vercel/Netlify)
```bash
# Build
npm run build

# Deploy
npm run deploy
```

## Common Issues and Solutions

### Issue: Port 5000 already in use
**Solution:** Change port in `.env` or kill existing process

### Issue: Database locked
**Solution:** Check for multiple instances, use SQLite connection pooling

### Issue: CORS errors
**Solution:** Ensure `CORS(app)` is initialized in Flask app

### Issue: ML models not loading
**Solution:** Check model file paths and permissions

## Performance Optimization

1. **Database**
   - Add indexes on frequently queried columns
   - Use pagination for large datasets

2. **API**
   - Implement caching
   - Use compression
   - Batch API calls

3. **Frontend**
   - Lazy load components
   - Optimize images
   - Use React.memo for expensive components

4. **ML**
   - Batch predictions
   - Cache model in memory
   - Use GPU if available

## Security Best Practices

1. Never commit `.env` files with sensitive data
2. Validate all user inputs
3. Use HTTPS in production
4. Implement rate limiting
5. Hash passwords securely
6. Sanitize database queries

## Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -m 'Add your feature'`
4. Push to branch: `git push origin feature/your-feature`
5. Submit pull request

---

For more information, see README.md and the original research paper.
