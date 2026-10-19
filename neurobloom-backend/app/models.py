from app import db
from datetime import datetime

class User(db.Model):
    """Base user model for students, teachers, and parents"""
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    user_type = db.Column(db.String(20), nullable=False)  # student, teacher, parent
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    student_profile = db.relationship('StudentProfile', uselist=False, back_populates='user')
    teacher_profile = db.relationship('TeacherProfile', uselist=False, back_populates='user')


class StudentProfile(db.Model):
    """Extended profile for students"""
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    age = db.Column(db.Integer)
    grade_level = db.Column(db.String(10))
    learning_disabilities = db.Column(db.JSON)  # dyslexia, dysgraphia, dyscalculia, ADHD
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    user = db.relationship('User', back_populates='student_profile')
    assessments = db.relationship('Assessment', back_populates='student')
    reading_activities = db.relationship('ReadingActivity', back_populates='student')
    writing_activities = db.relationship('WritingActivity', back_populates='student')
    math_activities = db.relationship('MathActivity', back_populates='student')


class TeacherProfile(db.Model):
    """Extended profile for teachers"""
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    school_name = db.Column(db.String(255))
    qualifications = db.Column(db.JSON)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    user = db.relationship('User', back_populates='teacher_profile')


class Assessment(db.Model):
    """Learning disorder assessment results"""
    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('student_profile.id'), nullable=False)
    assessment_type = db.Column(db.String(50), nullable=False)  # dyslexia, dysgraphia, dyscalculia, adhd
    risk_score = db.Column(db.Float)  # 0-1
    prediction_confidence = db.Column(db.Float)
    features_extracted = db.Column(db.JSON)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    student = db.relationship('StudentProfile', back_populates='assessments')


class ReadingActivity(db.Model):
    """Reading assessment and practice data"""
    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('student_profile.id'), nullable=False)
    text_content = db.Column(db.Text)
    reading_speed = db.Column(db.Float)  # words per minute
    accuracy_percentage = db.Column(db.Float)
    comprehension_score = db.Column(db.Float)
    errors = db.Column(db.JSON)  # spelling, phonetic, etc.
    time_spent = db.Column(db.Float)  # seconds
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    student = db.relationship('StudentProfile', back_populates='reading_activities')


class WritingActivity(db.Model):
    """Writing assessment and practice data"""
    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('student_profile.id'), nullable=False)
    prompt = db.Column(db.Text)
    written_text = db.Column(db.Text)
    spelling_errors = db.Column(db.JSON)
    grammatical_errors = db.Column(db.JSON)
    handwriting_quality = db.Column(db.Float)  # 0-1
    word_count = db.Column(db.Integer)
    time_spent = db.Column(db.Float)  # seconds
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    student = db.relationship('StudentProfile', back_populates='writing_activities')


class MathActivity(db.Model):
    """Math assessment and practice data"""
    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('student_profile.id'), nullable=False)
    problem = db.Column(db.String(255))
    student_answer = db.Column(db.String(255))
    correct_answer = db.Column(db.String(255))
    is_correct = db.Column(db.Boolean)
    time_spent = db.Column(db.Float)  # seconds
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    student = db.relationship('StudentProfile', back_populates='math_activities')
