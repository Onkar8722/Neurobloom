import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler
import joblib
import os

class DyslexiaDetector:
    """Machine Learning model for dyslexia detection"""
    
    def __init__(self):
        self.model = RandomForestClassifier(n_estimators=100, random_state=42)
        self.scaler = StandardScaler()
        self.is_trained = False
        self.model_path = 'models/dyslexia_model.pkl'
        self.scaler_path = 'models/dyslexia_scaler.pkl'
        
        # Try to load pre-trained model
        if os.path.exists(self.model_path):
            self.model = joblib.load(self.model_path)
            self.scaler = joblib.load(self.scaler_path)
            self.is_trained = True
    
    def train(self, X_train, y_train):
        """Train the model on historical data"""
        X_scaled = self.scaler.fit_transform(X_train)
        self.model.fit(X_scaled, y_train)
        self.is_trained = True
        
        # Save model
        os.makedirs('models', exist_ok=True)
        joblib.dump(self.model, self.model_path)
        joblib.dump(self.scaler, self.scaler_path)
    
    def predict(self, features):
        """
        Predict dyslexia risk
        
        Features expected:
        - avg_reading_speed (words per minute)
        - avg_accuracy (0-100)
        - spelling_errors (count)
        """
        if not self.is_trained:
            # Return default prediction if model not trained
            return self._heuristic_predict(features)
        
        # Extract features in correct order
        feature_vector = np.array([
            features.get('avg_reading_speed', 200),
            features.get('avg_accuracy', 80),
            features.get('spelling_errors', 0)
        ]).reshape(1, -1)
        
        feature_vector_scaled = self.scaler.transform(feature_vector)
        
        # Get probability of dyslexia risk
        probabilities = self.model.predict_proba(feature_vector_scaled)[0]
        risk_score = probabilities[1] if len(probabilities) > 1 else 0.5
        confidence = max(probabilities)
        
        return float(risk_score), float(confidence)
    
    def _heuristic_predict(self, features):
        """Heuristic-based prediction when model not trained"""
        reading_speed = features.get('avg_reading_speed', 200)
        accuracy = features.get('avg_accuracy', 80)
        spelling_errors = features.get('spelling_errors', 0)
        
        # Heuristic scoring
        risk_score = 0.0
        
        if reading_speed < 150:
            risk_score += 0.3
        if accuracy < 70:
            risk_score += 0.3
        if spelling_errors > 10:
            risk_score += 0.2
        
        risk_score = min(risk_score, 1.0)
        confidence = 0.65
        
        return float(risk_score), float(confidence)


class DysgraphiaDetector:
    """Machine Learning model for dysgraphia detection"""
    
    def __init__(self):
        self.model = RandomForestClassifier(n_estimators=100, random_state=42)
        self.scaler = StandardScaler()
        self.is_trained = False
        self.model_path = 'models/dysgraphia_model.pkl'
        self.scaler_path = 'models/dysgraphia_scaler.pkl'
        
        # Try to load pre-trained model
        if os.path.exists(self.model_path):
            self.model = joblib.load(self.model_path)
            self.scaler = joblib.load(self.scaler_path)
            self.is_trained = True
    
    def train(self, X_train, y_train):
        """Train the model on historical data"""
        X_scaled = self.scaler.fit_transform(X_train)
        self.model.fit(X_scaled, y_train)
        self.is_trained = True
        
        # Save model
        os.makedirs('models', exist_ok=True)
        joblib.dump(self.model, self.model_path)
        joblib.dump(self.scaler, self.scaler_path)
    
    def predict(self, features):
        """
        Predict dysgraphia risk
        
        Features expected:
        - avg_spelling_errors (count)
        - avg_grammatical_errors (count)
        - avg_word_count (number)
        """
        if not self.is_trained:
            return self._heuristic_predict(features)
        
        # Extract features in correct order
        feature_vector = np.array([
            features.get('avg_spelling_errors', 0),
            features.get('avg_grammatical_errors', 0),
            features.get('avg_word_count', 50)
        ]).reshape(1, -1)
        
        feature_vector_scaled = self.scaler.transform(feature_vector)
        probabilities = self.model.predict_proba(feature_vector_scaled)[0]
        risk_score = probabilities[1] if len(probabilities) > 1 else 0.5
        confidence = max(probabilities)
        
        return float(risk_score), float(confidence)
    
    def _heuristic_predict(self, features):
        """Heuristic-based prediction when model not trained"""
        spelling_errors = features.get('avg_spelling_errors', 0)
        grammatical_errors = features.get('avg_grammatical_errors', 0)
        word_count = features.get('avg_word_count', 50)
        
        # Heuristic scoring
        risk_score = 0.0
        
        if spelling_errors > 5:
            risk_score += 0.4
        if grammatical_errors > 3:
            risk_score += 0.3
        if word_count < 30:  # Low productivity
            risk_score += 0.2
        
        risk_score = min(risk_score, 1.0)
        confidence = 0.65
        
        return float(risk_score), float(confidence)


class DyscalculiaDetector:
    """Machine Learning model for dyscalculia detection"""
    
    def __init__(self):
        self.model = RandomForestClassifier(n_estimators=100, random_state=42)
        self.scaler = StandardScaler()
        self.is_trained = False
        self.model_path = 'models/dyscalculia_model.pkl'
        self.scaler_path = 'models/dyscalculia_scaler.pkl'
        
        # Try to load pre-trained model
        if os.path.exists(self.model_path):
            self.model = joblib.load(self.model_path)
            self.scaler = joblib.load(self.scaler_path)
            self.is_trained = True
    
    def train(self, X_train, y_train):
        """Train the model on historical data"""
        X_scaled = self.scaler.fit_transform(X_train)
        self.model.fit(X_scaled, y_train)
        self.is_trained = True
        
        # Save model
        os.makedirs('models', exist_ok=True)
        joblib.dump(self.model, self.model_path)
        joblib.dump(self.scaler, self.scaler_path)
    
    def predict(self, features):
        """
        Predict dyscalculia risk
        
        Features expected:
        - accuracy (0-1)
        - avg_time_spent (seconds)
        - problem_solving_consistency (0-1)
        """
        if not self.is_trained:
            return self._heuristic_predict(features)
        
        # Extract features in correct order
        feature_vector = np.array([
            features.get('accuracy', 0.5),
            features.get('avg_time_spent', 60),
            features.get('problem_solving_consistency', 0.5)
        ]).reshape(1, -1)
        
        feature_vector_scaled = self.scaler.transform(feature_vector)
        probabilities = self.model.predict_proba(feature_vector_scaled)[0]
        risk_score = probabilities[1] if len(probabilities) > 1 else 0.5
        confidence = max(probabilities)
        
        return float(risk_score), float(confidence)
    
    def _heuristic_predict(self, features):
        """Heuristic-based prediction when model not trained"""
        accuracy = features.get('accuracy', 0.5)
        time_spent = features.get('avg_time_spent', 60)
        consistency = features.get('problem_solving_consistency', 0.5)
        
        # Heuristic scoring
        risk_score = 0.0
        
        if accuracy < 0.5:
            risk_score += 0.5
        elif accuracy < 0.7:
            risk_score += 0.2
        
        if time_spent > 120:
            risk_score += 0.2
        
        if consistency < 0.4:
            risk_score += 0.2
        
        risk_score = min(risk_score, 1.0)
        confidence = 0.70
        
        return float(risk_score), float(confidence)
