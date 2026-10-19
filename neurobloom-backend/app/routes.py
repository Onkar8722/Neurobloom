from flask import Blueprint, request, jsonify
from app import db
from app.models import (
    User, StudentProfile, Assessment, ReadingActivity, 
    WritingActivity, MathActivity
)
from utils.ml_models import DyslexiaDetector, DysgraphiaDetector
from utils.nlp_processor import process_text, analyze_writing
from datetime import datetime

student_bp = Blueprint('student', __name__, url_prefix='/api/student')
teacher_bp = Blueprint('teacher', __name__, url_prefix='/api/teacher')
assessment_bp = Blueprint('assessment', __name__, url_prefix='/api/assessment')

# ==================== Student Routes ====================

@student_bp.route('/profile', methods=['GET'])
def get_student_profile():
    """Get student profile"""
    student_id = request.args.get('student_id')
    student = StudentProfile.query.get(student_id)
    
    if not student:
        return jsonify({'error': 'Student not found'}), 404
    
    return jsonify({
        'id': student.id,
        'user_id': student.user_id,
        'age': student.age,
        'grade_level': student.grade_level,
        'learning_disabilities': student.learning_disabilities
    }), 200


@student_bp.route('/reading-activity', methods=['POST'])
def submit_reading_activity():
    """Submit reading activity"""
    data = request.json
    student_id = data.get('student_id')
    text_content = data.get('text_content')
    reading_speed = data.get('reading_speed')
    accuracy = data.get('accuracy_percentage')
    time_spent = data.get('time_spent')
    
    activity = ReadingActivity(
        student_id=student_id,
        text_content=text_content,
        reading_speed=reading_speed,
        accuracy_percentage=accuracy,
        time_spent=time_spent
    )
    
    db.session.add(activity)
    db.session.commit()
    
    return jsonify({'id': activity.id, 'message': 'Activity recorded'}), 201


@student_bp.route('/writing-activity', methods=['POST'])
def submit_writing_activity():
    """Submit writing activity"""
    data = request.json
    student_id = data.get('student_id')
    prompt = data.get('prompt')
    written_text = data.get('written_text')
    time_spent = data.get('time_spent')
    
    # Analyze writing
    spelling_errors, grammatical_errors = analyze_writing(written_text)
    
    activity = WritingActivity(
        student_id=student_id,
        prompt=prompt,
        written_text=written_text,
        spelling_errors=spelling_errors,
        grammatical_errors=grammatical_errors,
        word_count=len(written_text.split()),
        time_spent=time_spent
    )
    
    db.session.add(activity)
    db.session.commit()
    
    return jsonify({
        'id': activity.id,
        'spelling_errors': spelling_errors,
        'grammatical_errors': grammatical_errors,
        'message': 'Writing activity recorded'
    }), 201


@student_bp.route('/math-activity', methods=['POST'])
def submit_math_activity():
    """Submit math activity"""
    data = request.json
    student_id = data.get('student_id')
    problem = data.get('problem')
    student_answer = data.get('student_answer')
    correct_answer = data.get('correct_answer')
    time_spent = data.get('time_spent')
    
    is_correct = student_answer.strip() == correct_answer.strip()
    
    activity = MathActivity(
        student_id=student_id,
        problem=problem,
        student_answer=student_answer,
        correct_answer=correct_answer,
        is_correct=is_correct,
        time_spent=time_spent
    )
    
    db.session.add(activity)
    db.session.commit()
    
    return jsonify({
        'id': activity.id,
        'is_correct': is_correct,
        'message': 'Math activity recorded'
    }), 201


# ==================== Teacher Routes ====================

@teacher_bp.route('/dashboard/<int:student_id>', methods=['GET'])
def get_student_dashboard(student_id):
    """Get comprehensive student dashboard"""
    student = StudentProfile.query.get(student_id)
    
    if not student:
        return jsonify({'error': 'Student not found'}), 404
    
    # Get all assessments
    assessments = Assessment.query.filter_by(student_id=student_id).all()
    
    # Get activity summaries
    reading_activities = ReadingActivity.query.filter_by(student_id=student_id).all()
    writing_activities = WritingActivity.query.filter_by(student_id=student_id).all()
    math_activities = MathActivity.query.filter_by(student_id=student_id).all()
    
    # Calculate statistics
    reading_stats = {
        'count': len(reading_activities),
        'avg_speed': sum([a.reading_speed for a in reading_activities]) / len(reading_activities) if reading_activities else 0,
        'avg_accuracy': sum([a.accuracy_percentage for a in reading_activities]) / len(reading_activities) if reading_activities else 0
    }
    
    writing_stats = {
        'count': len(writing_activities),
        'avg_word_count': sum([a.word_count for a in writing_activities]) / len(writing_activities) if writing_activities else 0
    }
    
    math_stats = {
        'count': len(math_activities),
        'correct_count': sum([1 for a in math_activities if a.is_correct]),
        'accuracy': sum([1 for a in math_activities if a.is_correct]) / len(math_activities) * 100 if math_activities else 0
    }
    
    return jsonify({
        'student': {
            'id': student.id,
            'age': student.age,
            'grade_level': student.grade_level,
            'learning_disabilities': student.learning_disabilities
        },
        'assessments': [
            {
                'type': a.assessment_type,
                'risk_score': a.risk_score,
                'confidence': a.prediction_confidence,
                'date': a.created_at.isoformat()
            } for a in assessments
        ],
        'reading_stats': reading_stats,
        'writing_stats': writing_stats,
        'math_stats': math_stats
    }), 200


@teacher_bp.route('/class-overview', methods=['GET'])
def get_class_overview():
    """Get overview of all students"""
    students = StudentProfile.query.all()
    
    class_data = []
    for student in students:
        assessments = Assessment.query.filter_by(student_id=student.id).all()
        latest_assessment = max(assessments, key=lambda x: x.created_at) if assessments else None
        
        class_data.append({
            'id': student.id,
            'age': student.age,
            'grade_level': student.grade_level,
            'learning_disabilities': student.learning_disabilities,
            'latest_assessment': {
                'type': latest_assessment.assessment_type,
                'risk_score': latest_assessment.risk_score,
                'date': latest_assessment.created_at.isoformat()
            } if latest_assessment else None
        })
    
    return jsonify({'students': class_data}), 200


# ==================== Assessment Routes ====================

@assessment_bp.route('/dyslexia', methods=['POST'])
def assess_dyslexia():
    """Run dyslexia assessment"""
    data = request.json
    student_id = data.get('student_id')
    
    # Get student's reading activities
    reading_activities = ReadingActivity.query.filter_by(student_id=student_id).all()
    
    if not reading_activities:
        return jsonify({'error': 'No reading activities found'}), 400
    
    # Extract features
    features = {
        'avg_reading_speed': sum([a.reading_speed for a in reading_activities]) / len(reading_activities),
        'avg_accuracy': sum([a.accuracy_percentage for a in reading_activities]) / len(reading_activities),
        'spelling_errors': sum([len(a.errors.get('spelling', [])) if a.errors else 0 for a in reading_activities])
    }
    
    # Run ML model
    detector = DyslexiaDetector()
    risk_score, confidence = detector.predict(features)
    
    # Save assessment
    assessment = Assessment(
        student_id=student_id,
        assessment_type='dyslexia',
        risk_score=risk_score,
        prediction_confidence=confidence,
        features_extracted=features
    )
    
    db.session.add(assessment)
    db.session.commit()
    
    return jsonify({
        'assessment_id': assessment.id,
        'risk_score': risk_score,
        'confidence': confidence,
        'status': 'At Risk' if risk_score > 0.6 else 'Low Risk'
    }), 201


@assessment_bp.route('/dysgraphia', methods=['POST'])
def assess_dysgraphia():
    """Run dysgraphia assessment"""
    data = request.json
    student_id = data.get('student_id')
    
    # Get student's writing activities
    writing_activities = WritingActivity.query.filter_by(student_id=student_id).all()
    
    if not writing_activities:
        return jsonify({'error': 'No writing activities found'}), 400
    
    # Extract features
    features = {
        'avg_spelling_errors': sum([len(a.spelling_errors) if a.spelling_errors else 0 for a in writing_activities]) / len(writing_activities),
        'avg_grammatical_errors': sum([len(a.grammatical_errors) if a.grammatical_errors else 0 for a in writing_activities]) / len(writing_activities),
        'avg_word_count': sum([a.word_count for a in writing_activities]) / len(writing_activities)
    }
    
    # Run ML model
    detector = DysgraphiaDetector()
    risk_score, confidence = detector.predict(features)
    
    # Save assessment
    assessment = Assessment(
        student_id=student_id,
        assessment_type='dysgraphia',
        risk_score=risk_score,
        prediction_confidence=confidence,
        features_extracted=features
    )
    
    db.session.add(assessment)
    db.session.commit()
    
    return jsonify({
        'assessment_id': assessment.id,
        'risk_score': risk_score,
        'confidence': confidence,
        'status': 'At Risk' if risk_score > 0.6 else 'Low Risk'
    }), 201


@assessment_bp.route('/dyscalculia', methods=['POST'])
def assess_dyscalculia():
    """Run dyscalculia assessment"""
    data = request.json
    student_id = data.get('student_id')
    
    # Get student's math activities
    math_activities = MathActivity.query.filter_by(student_id=student_id).all()
    
    if not math_activities:
        return jsonify({'error': 'No math activities found'}), 400
    
    # Extract features
    correct_count = sum([1 for a in math_activities if a.is_correct])
    avg_time = sum([a.time_spent for a in math_activities]) / len(math_activities)
    
    features = {
        'accuracy': correct_count / len(math_activities),
        'avg_time_spent': avg_time,
        'problem_solving_consistency': correct_count / len(math_activities)
    }
    
    # Simple scoring based on features
    risk_score = 1.0 - features['accuracy'] if features['accuracy'] < 0.6 else 0.2
    confidence = 0.8
    
    # Save assessment
    assessment = Assessment(
        student_id=student_id,
        assessment_type='dyscalculia',
        risk_score=risk_score,
        prediction_confidence=confidence,
        features_extracted=features
    )
    
    db.session.add(assessment)
    db.session.commit()
    
    return jsonify({
        'assessment_id': assessment.id,
        'risk_score': risk_score,
        'confidence': confidence,
        'status': 'At Risk' if risk_score > 0.6 else 'Low Risk'
    }), 201
