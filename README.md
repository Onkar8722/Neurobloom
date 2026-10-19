# NeuroBloom: Intelligent Companion for Cognitive Growth

An AI-powered assistive learning platform designed to support students with neurodevelopmental differences including dyslexia, dysgraphia, dyscalculia, and ADHD.

## 🌟 Features

### Core Capabilities
- **Reading Assessment & Practice**: Real-time analysis of reading speed, accuracy, and comprehension
- **Writing Assistance**: Spelling and grammar error detection with feedback
- **Math Practice**: Interactive problem-solving with immediate feedback
- **Early Detection**: ML-based identification of learning disorders
- **Progress Tracking**: Comprehensive dashboards for teachers, parents, and students

### AI/ML Components
- **Natural Language Processing (NLP)**: Text analysis using NLTK and spaCy
- **Machine Learning Models**: Random Forest classifiers for disorder detection
- **Text-to-Speech (TTS)**: Google Cloud API for audio support
- **Speech-to-Text (STT)**: Google Cloud API for voice input
- **Adaptive Learning**: Personalized recommendations based on student performance

### User Roles
1. **Students**: Access learning activities, track progress, receive AI-powered feedback
2. **Teachers**: Monitor class performance, run assessments, track student growth
3. **Parents**: View child's progress, communicate with teachers

## 🏗️ Project Structure

```
neurobloom-backend/
├── app/
│   ├── __init__.py          # Flask app factory
│   ├── models.py            # Database models
│   └── routes.py            # API endpoints
├── models/
│   ├── dyslexia_model.pkl   # ML model for dyslexia detection
│   ├── dysgraphia_model.pkl # ML model for dysgraphia detection
│   └── dyscalculia_model.pkl # ML model for dyscalculia detection
├── utils/
│   ├── ml_models.py         # ML detection classes
│   ├── nlp_processor.py     # NLP functions
│   └── tts_stt.py           # Speech processing
├── data/                    # Datasets and training data
├── requirements.txt         # Python dependencies
├── run.py                   # Application entry point
└── .env.example             # Environment variables template

neurobloom-frontend/
├── src/
│   ├── pages/
│   │   ├── Home.js                  # Landing page
│   │   ├── Login.js                 # Authentication
│   │   ├── StudentDashboard.js      # Student interface
│   │   ├── TeacherDashboard.js      # Teacher interface
│   │   ├── ParentDashboard.js       # Parent interface
│   │   ├── ReadingActivity.js       # Reading practice
│   │   ├── WritingActivity.js       # Writing practice
│   │   └── MathActivity.js          # Math practice
│   ├── App.js                       # Main component
│   ├── App.css                      # Styling
│   └── index.js                     # React entry point
├── public/
│   └── index.html                   # HTML template
├── package.json                     # Dependencies
└── .env.example                     # Environment variables
```

## 🚀 Getting Started

### Prerequisites
- Python 3.8+
- Node.js 14+
- npm or yarn
- Google Cloud API credentials (optional, for TTS/STT)

### Backend Setup

1. **Create virtual environment:**
   ```bash
   cd neurobloom-backend
   python -m venv venv
   venv\Scripts\activate  # Windows
   ```

2. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Configure environment:**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Run the server:**
   ```bash
   python run.py
   ```
   The backend will be available at `http://localhost:5000`

### Frontend Setup

1. **Install dependencies:**
   ```bash
   cd neurobloom-frontend
   npm install
   ```

2. **Start development server:**
   ```bash
   npm start
   ```
   The frontend will open at `http://localhost:3000`

## 📊 Database Schema

### Users
- `User`: Base user model with authentication
- `StudentProfile`: Extended student information
- `TeacherProfile`: Teacher information

### Learning Activities
- `ReadingActivity`: Reading exercises and metrics
- `WritingActivity`: Writing exercises with error tracking
- `MathActivity`: Math problems and solutions

### Assessments
- `Assessment`: ML-based disorder detection results

## 🤖 ML Models

### DyslexiaDetector
**Features:**
- Average reading speed (words per minute)
- Reading accuracy percentage
- Spelling error count

**Output:** Risk score (0-1) and confidence

### DysgraphiaDetector
**Features:**
- Average spelling errors per activity
- Average grammatical errors per activity
- Average word count

**Output:** Risk score (0-1) and confidence

### DyscalculiaDetector
**Features:**
- Problem-solving accuracy
- Average time spent on problems
- Problem-solving consistency

**Output:** Risk score (0-1) and confidence

## 🔗 API Endpoints

### Student Endpoints
- `GET /api/student/profile` - Get student profile
- `POST /api/student/reading-activity` - Submit reading activity
- `POST /api/student/writing-activity` - Submit writing activity
- `POST /api/student/math-activity` - Submit math activity

### Teacher Endpoints
- `GET /api/teacher/dashboard/<student_id>` - Get student dashboard
- `GET /api/teacher/class-overview` - Get class overview

### Assessment Endpoints
- `POST /api/assessment/dyslexia` - Run dyslexia assessment
- `POST /api/assessment/dysgraphia` - Run dysgraphia assessment
- `POST /api/assessment/dyscalculia` - Run dyscalculia assessment

## 🛠️ Tech Stack

### Backend
- **Flask**: Web framework
- **SQLAlchemy**: ORM
- **TensorFlow/scikit-learn**: Machine learning
- **NLTK/spaCy**: NLP
- **Google Cloud APIs**: TTS/STT
- **AWS**: Cloud storage

### Frontend
- **React**: UI framework
- **React Router**: Navigation
- **Bootstrap**: Styling
- **Axios**: HTTP client
- **Chart.js**: Data visualization

## 📈 Key Metrics

The system tracks:
- **Reading**: Speed (WPM), accuracy, comprehension
- **Writing**: Spelling errors, grammatical errors, word count
- **Math**: Accuracy, time per problem, consistency
- **Overall**: Progress trends, risk scores, learning patterns

## 🔐 Security Features

- JWT-based authentication
- CORS enabled
- Environment-based configuration
- Database encryption for sensitive data
- API rate limiting (recommended)

## 📝 Usage Examples

### Running a Dyslexia Assessment
```bash
POST /api/assessment/dyslexia
{
  "student_id": 1
}
```

### Submitting Reading Activity
```bash
POST /api/student/reading-activity
{
  "student_id": 1,
  "text_content": "The quick brown fox...",
  "reading_speed": 250,
  "accuracy_percentage": 92,
  "time_spent": 45
}
```

### Getting Teacher Dashboard
```bash
GET /api/teacher/dashboard/1
```

## 🚧 Future Enhancements

1. **Emotion Recognition**: Detect emotional state during learning
2. **Reinforcement Learning**: Adaptive difficulty adjustment
3. **Mobile App**: Offline functionality
4. **Multi-language Support**: Support for various languages
5. **Advanced Analytics**: Deeper learning insights
6. **Video Integration**: Recorded sessions for review
7. **Parent Communication**: Direct messaging system
8. **Gamification**: Rewards and achievements

## 📚 References

Based on research by:
- Farhah & Uddin (2025): Multimodal AI adaptive learning
- Putri (2025): Assistive technology review
- Yenduri (2023): Immersive learning environments
- Giri (2020): ML-based dyscalculia identification
- Agarwal et al. (2023): Dysgraphia detection using handwriting data

## 📄 License

This project is open source and available under the MIT License.

## 👥 Team

- Sanika Tanawade
- Tejas Narute
- Onkar Kumbhar
- Prathamesh Latthe

Annasaheb Dange College of Engineering and Technology, Ashta

## 📧 Support

For questions or issues, please contact the development team or create an issue in the repository.

---

**Made with ❤️ for inclusive education**
