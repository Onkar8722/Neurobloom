import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Button, ProgressBar, Alert } from 'react-bootstrap';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

function StudentDashboard() {
  const [studentData, setStudentData] = useState(null);
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    fetchStudentData();
  }, []);

  const fetchStudentData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/student/profile`, {
        params: { student_id: user.student_id }
      });
      setStudentData(response.data);

      // Fetch assessments
      const assessmentResponse = await axios.get(`${API_URL}/assessment/history`, {
        params: { student_id: user.student_id }
      });
      setAssessments(assessmentResponse.data);
    } catch (err) {
      setError('Failed to load student data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

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
                        now={(1 - assessment.risk_score) * 100}
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
