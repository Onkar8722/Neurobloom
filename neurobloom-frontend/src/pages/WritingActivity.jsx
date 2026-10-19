import React, { useState } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

function WritingActivity() {
  const [prompt, setPrompt] = useState('Write about your favorite book.');
  const [userText, setUserText] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const user = JSON.parse(localStorage.getItem('user'));

  const submitWriting = async () => {
    if (!userText.trim()) {
      setError('Please write something first');
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/student/writing-activity`, {
        student_id: user.student_id,
        prompt: prompt,
        written_text: userText,
        time_spent: 300 // Placeholder
      });
      
      setResponse({
        message: 'Writing activity recorded!',
        data: response.data
      });
      setSubmitted(true);
      
      setTimeout(() => {
        setSubmitted(false);
        setUserText('');
      }, 3000);
    } catch (err) {
      setError('Failed to submit writing activity');
      console.error(err);
    }
  };

  return (
    <div>
      <h1 className="mb-4">✍️ Writing Practice</h1>

      {error && <Alert variant="danger">{error}</Alert>}
      {submitted && response && <Alert variant="success">{response.message}</Alert>}

      <Card>
        <Card.Body>
          <Card.Title>Writing Prompt</Card.Title>
          
          <Form.Group className="mb-4">
            <Form.Label><strong>Prompt:</strong></Form.Label>
            <p className="p-3 bg-light rounded">{prompt}</p>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Your Response:</Form.Label>
            <Form.Control
              as="textarea"
              rows={6}
              value={userText}
              onChange={(e) => setUserText(e.target.value)}
              placeholder="Type your response here..."
            />
            <small className="d-block mt-2">Word count: {userText.split(/\s+/).filter(w => w.length > 0).length}</small>
          </Form.Group>

          <div className="d-flex gap-2">
            <Button onClick={submitWriting} variant="success">
              ✅ Submit Writing
            </Button>
            <Button onClick={() => setUserText('')} variant="outline-secondary">
              🔄 Clear
            </Button>
          </div>

          {userText && (
            <div className="mt-4 p-3 bg-light rounded">
              <h6>Analysis:</h6>
              <p>Word count: {userText.split(/\s+/).filter(w => w.length > 0).length}</p>
              <p>Character count: {userText.length}</p>
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}

export default WritingActivity;
