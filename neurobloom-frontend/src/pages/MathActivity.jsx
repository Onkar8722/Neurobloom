import React, { useState } from 'react';
import { Card, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

function MathActivity() {
  const [currentProblem, setCurrentProblem] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState(0);
  const [totalProblems, setTotalProblems] = useState(0);
  const [error, setError] = useState(null);

  const user = JSON.parse(localStorage.getItem('user'));

  const generateProblem = () => {
    const num1 = Math.floor(Math.random() * 20) + 1;
    const num2 = Math.floor(Math.random() * 20) + 1;
    const operations = ['+', '-', '*', '/'];
    const operation = operations[Math.floor(Math.random() * operations.length)];
    
    let correctAnswer;
    switch (operation) {
      case '+':
        correctAnswer = num1 + num2;
        break;
      case '-':
        correctAnswer = num1 - num2;
        break;
      case '*':
        correctAnswer = num1 * num2;
        break;
      case '/':
        correctAnswer = Math.floor(num1 / num2);
        break;
      default:
        correctAnswer = 0;
    }

    const problem = {
      expression: `${num1} ${operation} ${num2}`,
      correctAnswer: correctAnswer.toString()
    };

    setCurrentProblem(problem);
    setUserAnswer('');
    setFeedback(null);
  };

  const submitAnswer = async () => {
    if (!userAnswer.trim()) {
      setError('Please enter an answer');
      return;
    }

    try {
      const isCorrect = userAnswer.trim() === currentProblem.correctAnswer;
      
      await axios.post(`${API_URL}/student/math-activity`, {
        student_id: user.student_id,
        problem: currentProblem.expression,
        student_answer: userAnswer,
        correct_answer: currentProblem.correctAnswer,
        time_spent: 30 // Placeholder
      });

      setFeedback({
        isCorrect: isCorrect,
        correctAnswer: currentProblem.correctAnswer
      });

      if (isCorrect) {
        setScore(score + 1);
      }
      setTotalProblems(totalProblems + 1);
      setSubmitted(true);

      setTimeout(() => {
        generateProblem();
        setSubmitted(false);
      }, 2000);

    } catch (err) {
      setError('Failed to submit answer');
      console.error(err);
    }
  };

  React.useEffect(() => {
    generateProblem();
  }, []);

  return (
    <div>
      <h1 className="mb-4">🔢 Math Practice</h1>

      {error && <Alert variant="danger">{error}</Alert>}

      <Row className="mb-4">
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Score</Card.Title>
              <h2>{score}/{totalProblems}</h2>
              {totalProblems > 0 && (
                <p>Accuracy: {((score / totalProblems) * 100).toFixed(1)}%</p>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col md={8}>
          <Card>
            <Card.Body>
              <Card.Title>Problem</Card.Title>
              
              {currentProblem && (
                <>
                  <div className="p-4 bg-light rounded mb-4" style={{ fontSize: '36px', textAlign: 'center' }}>
                    <strong>{currentProblem.expression} = ?</strong>
                  </div>

                  <Form.Group className="mb-3">
                    <Form.Label>Your Answer:</Form.Label>
                    <Form.Control
                      type="number"
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && submitAnswer()}
                      placeholder="Enter your answer"
                      autoFocus
                    />
                  </Form.Group>

                  <Button onClick={submitAnswer} variant="success" className="mb-3">
                    ✅ Submit Answer
                  </Button>

                  {submitted && feedback && (
                    <Alert variant={feedback.isCorrect ? 'success' : 'danger'} className="mt-3">
                      {feedback.isCorrect ? '✅ Correct!' : `❌ Incorrect! The answer is ${feedback.correctAnswer}`}
                    </Alert>
                  )}
                </>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default MathActivity;
