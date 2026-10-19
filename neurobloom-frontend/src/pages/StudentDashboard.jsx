import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Button, ProgressBar, Alert } from 'react-bootstrap';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

function StudentDashboard() {
  const [studentData, setStudentData] = useState(null);
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const storedUser = localStorage.getItem('user');

    if (!storedUser) {
      setError('Your session has expired. Please log in again.');
      setLoading(false);
      return () => controller.abort();
    }

    let user;
    try {
      user = JSON.parse(storedUser);
    } catch {
      localStorage.removeItem('user');
      setError('Your saved session is invalid. Please log in again.');
      setLoading(false);
      return () => controller.abort();
    }

    if (!Number.isInteger(user.student_id)) {
      setError('This account has no student profile. Please log out and sign up or log in again.');
      setLoading(false);
      return () => controller.abort();
    }

    const fetchStudentData = async () => {
      try {
        const [profileResponse, assessmentResponse] = await Promise.all([
          axios.get(`${API_URL}/student/profile`, {
            params: { student_id: user.student_id },
            signal: controller.signal
          }),
          axios.get(`${API_URL}/assessment/history`, {
            params: { student_id: user.student_id },
            signal: controller.signal
          })
        ]);
        setStudentData(profileResponse.data);
        setAssessments(assessmentResponse.data);
      } catch (err) {
        if (controller.signal.aborted) return;
        if (err.response?.status === 404) {
          setError('Student profile not found. Please log out and sign up or log in again.');
        } else {
          setError(err.response?.data?.error || 'Failed to load student data. Check that the backend is running.');
        }
        console.error(err);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    fetchStudentData();
    return () => controller.abort();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <div>
      <h1 className="mb-4">Welcome, {studentData?.age ? `Student` : 'User'}! 👋</h1>

      <Row className="mb-4">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Your Profile</Card.Title>
              <p><strong>Age:</strong> {studentData?.age}</p>
              <p><strong>Grade Level:</strong> {studentData?.grade_level}</p>
              <p><strong>Learning Focus Areas:</strong></p>
              <ul>
                {studentData?.learning_disabilities?.map((disability, idx) => (
                  <li key={idx}>{disability}</li>
                ))}
              </ul>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Learning Activities</Card.Title>
              <div className="d-grid gap-2">
                <Button href="/reading" variant="primary">📖 Reading Practice</Button>
                <Button href="/writing" variant="success">✍️ Writing Practice</Button>
                <Button href="/math" variant="info">🔢 Math Practice</Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col md={12}>
          <Card>
            <Card.Body>
              <Card.Title>Your Assessments</Card.Title>
              {assessments.length > 0 ? (
                <div>
                  {assessments.map((assessment, idx) => (
                    <div key={idx} className="mb-3 p-3 border rounded">
                      <strong>{assessment.assessment_type}</strong>
                      <ProgressBar 
                        now={assessment.risk_score * 100}
                        label={`Risk Score: ${(assessment.risk_score * 100).toFixed(1)}%`}
                        variant={assessment.risk_score > 0.6 ? 'danger' : 'success'}
                        className="mt-2"
                      />
                      <small className="d-block mt-2">Last updated: {new Date(assessment.created_at).toLocaleDateString()}</small>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No assessments yet. Complete some activities to get started!</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default StudentDashboard;
