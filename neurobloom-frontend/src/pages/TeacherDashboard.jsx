import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Button, Table, Alert, Form } from 'react-bootstrap';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

function TeacherDashboard() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchClassOverview();
  }, []);

  const fetchClassOverview = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/teacher/class-overview`);
      setStudents(response.data.students);
    } catch (err) {
      setError('Failed to load class data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchStudentDashboard = async (studentId) => {
    try {
      const response = await axios.get(`${API_URL}/teacher/dashboard/${studentId}`);
      setDashboardData(response.data);
      setSelectedStudent(studentId);
    } catch (err) {
      setError('Failed to load student dashboard');
      console.error(err);
    }
  };

  const runAssessment = async (studentId, assessmentType) => {
    try {
      const endpoint = `${API_URL}/assessment/${assessmentType}`;
      const response = await axios.post(endpoint, { student_id: studentId });
      alert(`${assessmentType} assessment completed. Risk Score: ${(response.data.risk_score * 100).toFixed(1)}%`);
      fetchStudentDashboard(studentId);
    } catch (err) {
      setError(`Failed to run ${assessmentType} assessment`);
      console.error(err);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="mb-4">Teacher Dashboard 👨‍🏫</h1>

      {error && <Alert variant="danger">{error}</Alert>}

      <Row className="mb-4">
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Your Class</Card.Title>
              <Table striped bordered hover>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.id}>
                      <td>{student.grade_level}</td>
                      <td>
                        <Button 
                          size="sm" 
                          onClick={() => fetchStudentDashboard(student.id)}
                          variant={selectedStudent === student.id ? 'primary' : 'outline-primary'}
                        >
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>

        <Col md={8}>
          {selectedStudent && dashboardData ? (
            <Card>
              <Card.Body>
                <Card.Title>Student Dashboard - {dashboardData.student.grade_level}</Card.Title>

                <div className="mb-4">
                  <h5>Quick Actions</h5>
                  <div className="d-flex gap-2">
                    <Button onClick={() => runAssessment(selectedStudent, 'dyslexia')} variant="outline-info" size="sm">
                      🔍 Dyslexia Assessment
                    </Button>
                    <Button onClick={() => runAssessment(selectedStudent, 'dysgraphia')} variant="outline-info" size="sm">
                      🔍 Dysgraphia Assessment
                    </Button>
                    <Button onClick={() => runAssessment(selectedStudent, 'dyscalculia')} variant="outline-info" size="sm">
                      🔍 Dyscalculia Assessment
                    </Button>
                  </div>
                </div>

                <Row>
                  <Col md={6}>
                    <h6>Reading Stats</h6>
                    <p>Activities: {dashboardData.reading_stats.count}</p>
                    <p>Avg Speed: {dashboardData.reading_stats.avg_speed?.toFixed(1)} WPM</p>
                    <p>Avg Accuracy: {dashboardData.reading_stats.avg_accuracy?.toFixed(1)}%</p>
                  </Col>
                  <Col md={6}>
                    <h6>Writing Stats</h6>
                    <p>Activities: {dashboardData.writing_stats.count}</p>
                    <p>Avg Word Count: {dashboardData.writing_stats.avg_word_count?.toFixed(0)}</p>
                  </Col>
                </Row>

                <Row className="mt-3">
                  <Col md={6}>
                    <h6>Math Stats</h6>
                    <p>Activities: {dashboardData.math_stats.count}</p>
                    <p>Accuracy: {dashboardData.math_stats.accuracy?.toFixed(1)}%</p>
                  </Col>
                  <Col md={6}>
                    <h6>Recent Assessments</h6>
                    {dashboardData.assessments.map((assessment, idx) => (
                      <div key={idx} className="mb-2 p-2 border rounded">
                        <strong>{assessment.type}</strong>: {(assessment.risk_score * 100).toFixed(1)}%
                      </div>
                    ))}
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ) : (
            <Card>
              <Card.Body>
                <p>Select a student to view their dashboard</p>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </div>
  );
}

export default TeacherDashboard;
