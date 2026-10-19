# NeuroBloom API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
Currently using mock authentication. In production, implement JWT token validation.

---

## Student Endpoints

### 1. Get Student Profile
Get the student's profile information and learning focus areas.

**Endpoint:**
```
GET /student/profile?student_id={student_id}
```

**Parameters:**
- `student_id` (query, required): Student ID

**Response:**
```json
{
  "id": 1,
  "user_id": 1,
  "age": 15,
  "grade_level": "9",
  "learning_disabilities": ["dyslexia", "dysgraphia"]
}
```

**Status Codes:**
- `200`: Success
- `404`: Student not found

---

### 2. Submit Reading Activity
Record a reading session with metrics.

**Endpoint:**
```
POST /student/reading-activity
```

**Request Body:**
```json
{
  "student_id": 1,
  "text_content": "The quick brown fox jumps over the lazy dog.",
  "reading_speed": 250,
  "accuracy_percentage": 92.5,
  "time_spent": 45.2
}
```

**Response:**
```json
{
  "id": 101,
  "message": "Activity recorded"
}
```

**Notes:**
- `reading_speed`: Words per minute (WPM)
- `accuracy_percentage`: 0-100 scale
- `time_spent`: Duration in seconds

---

### 3. Submit Writing Activity
Record a writing session with error analysis.

**Endpoint:**
```
POST /student/writing-activity
```

**Request Body:**
```json
{
  "student_id": 1,
  "prompt": "Write about your favorite book.",
  "written_text": "My favorite book is Harry Potter...",
  "time_spent": 300
}
```

**Response:**
```json
{
  "id": 102,
  "spelling_errors": ["favorit", "harrey"],
  "grammatical_errors": ["Missing capitalization"],
  "message": "Writing activity recorded"
}
```

**Backend Processing:**
- Detects spelling errors using NLTK dictionary
- Identifies grammatical issues
- Calculates word count and quality metrics

---

### 4. Submit Math Activity
Record a math problem attempt.

**Endpoint:**
```
POST /student/math-activity
```

**Request Body:**
```json
{
  "student_id": 1,
  "problem": "15 + 8",
  "student_answer": "23",
  "correct_answer": "23",
  "time_spent": 30
}
```

**Response:**
```json
{
  "id": 103,
  "is_correct": true,
  "message": "Math activity recorded"
}
```

**Notes:**
- `time_spent`: Time to solve in seconds
- `is_correct`: Boolean indicating correctness

---

## Teacher Endpoints

### 1. Get Student Dashboard
Retrieve comprehensive student performance data.

**Endpoint:**
```
GET /teacher/dashboard/{student_id}
```

**Parameters:**
- `student_id` (path, required): Student ID

**Response:**
```json
{
  "student": {
    "id": 1,
    "age": 15,
    "grade_level": "9",
    "learning_disabilities": ["dyslexia"]
  },
  "assessments": [
    {
      "type": "dyslexia",
      "risk_score": 0.65,
      "confidence": 0.82,
      "date": "2024-01-15T10:30:00"
    }
  ],
  "reading_stats": {
    "count": 5,
    "avg_speed": 180.5,
    "avg_accuracy": 88.2
  },
  "writing_stats": {
    "count": 3,
    "avg_word_count": 150
  },
  "math_stats": {
    "count": 20,
    "correct_count": 16,
    "accuracy": 80.0
  }
}
```

**Status Codes:**
- `200`: Success
- `404`: Student not found

---

### 2. Get Class Overview
Retrieve overview of all students in the class.

**Endpoint:**
```
GET /teacher/class-overview
```

**Response:**
```json
{
  "students": [
    {
      "id": 1,
      "age": 15,
      "grade_level": "9",
      "learning_disabilities": ["dyslexia"],
      "latest_assessment": {
        "type": "dyslexia",
        "risk_score": 0.65,
        "date": "2024-01-15T10:30:00"
      }
    },
    {
      "id": 2,
      "age": 14,
      "grade_level": "8",
      "learning_disabilities": ["dyscalculia"],
      "latest_assessment": null
    }
  ]
}
```

**Status Codes:**
- `200`: Success

---

## Assessment Endpoints

### 1. Run Dyslexia Assessment
Analyze student's reading patterns for dyslexia risk.

**Endpoint:**
```
POST /assessment/dyslexia
```

**Request Body:**
```json
{
  "student_id": 1
}
```

**Response:**
```json
{
  "assessment_id": 1001,
  "risk_score": 0.68,
  "confidence": 0.81,
  "status": "At Risk"
}
```

**Features Analyzed:**
- Average reading speed
- Reading accuracy
- Spelling error patterns
- Phonetic errors

**Risk Score Interpretation:**
- `< 0.3`: Low risk
- `0.3 - 0.6`: Medium risk
- `> 0.6`: High risk / At Risk

**Status Codes:**
- `201`: Assessment created
- `400`: No reading activities found

---

### 2. Run Dysgraphia Assessment
Analyze student's writing patterns for dysgraphia risk.

**Endpoint:**
```
POST /assessment/dysgraphia
```

**Request Body:**
```json
{
  "student_id": 1
}
```

**Response:**
```json
{
  "assessment_id": 1002,
  "risk_score": 0.52,
  "confidence": 0.75,
  "status": "Medium Risk"
}
```

**Features Analyzed:**
- Spelling error frequency
- Grammatical error patterns
- Writing speed (word count)
- Handwriting quality indicators

---

### 3. Run Dyscalculia Assessment
Analyze student's math performance for dyscalculia risk.

**Endpoint:**
```
POST /assessment/dyscalculia
```

**Request Body:**
```json
{
  "student_id": 1
}
```

**Response:**
```json
{
  "assessment_id": 1003,
  "risk_score": 0.42,
  "confidence": 0.78,
  "status": "Low Risk"
}
```

**Features Analyzed:**
- Problem-solving accuracy
- Time per problem
- Consistency across problems
- Pattern recognition in errors

**Status Codes:**
- `201`: Assessment created
- `400`: No math activities found

---

## Error Responses

### 400 Bad Request
```json
{
  "error": "No reading activities found"
}
```

### 404 Not Found
```json
{
  "error": "Student not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error. Please try again."
}
```

---

## Data Models

### User
```json
{
  "id": 1,
  "username": "john_doe",
  "email": "john@example.com",
  "user_type": "student",
  "created_at": "2024-01-10T08:00:00"
}
```

### StudentProfile
```json
{
  "id": 1,
  "user_id": 1,
  "age": 15,
  "grade_level": "9",
  "learning_disabilities": ["dyslexia", "dysgraphia"],
  "created_at": "2024-01-10T08:00:00"
}
```

### Assessment
```json
{
  "id": 1001,
  "student_id": 1,
  "assessment_type": "dyslexia",
  "risk_score": 0.68,
  "prediction_confidence": 0.81,
  "features_extracted": {
    "avg_reading_speed": 180,
    "avg_accuracy": 85.5,
    "spelling_errors": 12
  },
  "created_at": "2024-01-15T10:30:00"
}
```

### ReadingActivity
```json
{
  "id": 101,
  "student_id": 1,
  "text_content": "...",
  "reading_speed": 250,
  "accuracy_percentage": 92.5,
  "comprehension_score": 88.0,
  "errors": {
    "spelling": ["teh", "recieve"],
    "phonetic": ["their/there"]
  },
  "time_spent": 45.2,
  "created_at": "2024-01-15T10:30:00"
}
```

### WritingActivity
```json
{
  "id": 102,
  "student_id": 1,
  "prompt": "Write about your favorite book.",
  "written_text": "...",
  "spelling_errors": ["favorit"],
  "grammatical_errors": ["Missing capitalization"],
  "handwriting_quality": 0.78,
  "word_count": 150,
  "time_spent": 300,
  "created_at": "2024-01-15T10:35:00"
}
```

### MathActivity
```json
{
  "id": 103,
  "student_id": 1,
  "problem": "15 + 8",
  "student_answer": "23",
  "correct_answer": "23",
  "is_correct": true,
  "time_spent": 30,
  "created_at": "2024-01-15T10:40:00"
}
```

---

## Common Use Cases

### Use Case 1: Student Completes Reading Activity
1. POST `/student/reading-activity` with activity data
2. Backend stores data and analyzes
3. System detects patterns if enough data exists
4. Response includes activity ID

### Use Case 2: Teacher Checks Student Dashboard
1. GET `/teacher/dashboard/{student_id}`
2. System aggregates all student data
3. Returns comprehensive dashboard with statistics
4. Teacher can identify struggling areas

### Use Case 3: Teacher Runs Dyslexia Assessment
1. POST `/assessment/dyslexia` with student_id
2. System retrieves reading activities
3. ML model analyzes patterns
4. Risk score returned (0-1)
5. Assessment saved to database

### Use Case 4: Class Overview
1. GET `/teacher/class-overview`
2. System retrieves all students
3. Returns latest assessment for each
4. Teacher can identify at-risk students

---

## Rate Limiting (Recommended)

Current implementation has no rate limiting. For production:
- Limit: 100 requests per minute per IP
- Endpoint-specific limits for heavy operations
- Implement with Flask-Limiter

---

## CORS Configuration

Currently allows all origins. For production:
```python
CORS(app, resources={
    r"/api/*": {
        "origins": ["https://yourdomain.com"],
        "methods": ["GET", "POST", "PUT", "DELETE"],
        "allow_headers": ["Content-Type", "Authorization"]
    }
})
```

---

## Testing API

### Using cURL
```bash
# Get student profile
curl http://localhost:5000/api/student/profile?student_id=1

# Submit reading activity
curl -X POST http://localhost:5000/api/student/reading-activity \
  -H "Content-Type: application/json" \
  -d '{
    "student_id": 1,
    "text_content": "Sample text",
    "reading_speed": 250,
    "accuracy_percentage": 92,
    "time_spent": 45
  }'

# Run dyslexia assessment
curl -X POST http://localhost:5000/api/assessment/dyslexia \
  -H "Content-Type: application/json" \
  -d '{"student_id": 1}'
```

### Using Postman
1. Import the API endpoints
2. Set base URL: `http://localhost:5000/api`
3. Create requests for each endpoint
4. Test with different student IDs

---

## Future API Enhancements

- [ ] GraphQL support
- [ ] Websocket for real-time updates
- [ ] File upload endpoints (for handwriting samples)
- [ ] Batch assessment operations
- [ ] Advanced filtering and pagination
- [ ] Analytics/reporting endpoints
- [ ] Export data endpoints (CSV, PDF)
- [ ] Integration with external services

---

**Last Updated**: January 2024
**API Version**: 1.0
