import React, { useState } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

function ReadingActivity() {
  const [text, setText] = useState('The quick brown fox jumps over the lazy dog.');
  const [readingTime, setReadingTime] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const user = JSON.parse(localStorage.getItem('user'));

  const startReading = () => {
    setStartTime(Date.now());
  };

  const finishReading = () => {
    if (startTime) {
      const timeSeconds = (Date.now() - startTime) / 1000;
      setReadingTime(timeSeconds);
      
      // Calculate reading speed (words per minute)
      const wordCount = text.split(/\s+/).length;
      const readingSpeed = (wordCount / timeSeconds) * 60;

      submitActivity(readingSpeed, timeSeconds);
    }
  };

  const submitActivity = async (readingSpeed, timeSpent) => {
    try {
      const response = await axios.post(`${API_URL}/student/reading-activity`, {
        student_id: user.student_id,
        text_content: text,
        reading_speed: readingSpeed,
        accuracy_percentage: 85, // Placeholder
        time_spent: timeSpent
      });
      
      setResponse({
        message: 'Reading activity recorded!',
        data: response.data
      });
      setSubmitted(true);
      
      setTimeout(() => {
        setSubmitted(false);
        setText('');
        setReadingTime(0);
      }, 3000);
    } catch (err) {
      setError('Failed to submit reading activity');
      console.error(err);
    }
  };

  return (
    <div>
      <h1 className="mb-4">📖 Reading Practice</h1>

      {error && <Alert variant="danger">{error}</Alert>}
      {submitted && response && <Alert variant="success">{response.message}</Alert>}

      <Card>
        <Card.Body>
          <Card.Title>Read the following text:</Card.Title>
          
          <div className="reading-text p-4 bg-light rounded mb-4" style={{ minHeight: '150px', fontSize: '18px' }}>
            {text || 'Select text to read...'}
          </div>

          <Form.Group className="mb-3">
            <Form.Label>Or paste your own text:</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </Form.Group>

          <div className="d-flex gap-2 mb-4">
            <Button onClick={startReading} variant="primary">
              ▶️ Start Reading
            </Button>
            <Button onClick={finishReading} variant="success" disabled={!startTime}>
              ⏹️ Finish Reading
            </Button>
          </div>

          {readingTime > 0 && (
            <div className="p-3 bg-info text-white rounded">
              <p>Time taken: {readingTime.toFixed(1)} seconds</p>
              <p>Reading Speed: {((text.split(/\s+/).length / readingTime) * 60).toFixed(0)} WPM</p>
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}

export default ReadingActivity;
