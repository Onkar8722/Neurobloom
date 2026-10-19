import React from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <Row className="mb-5 mt-4">
        <Col md={8} className="mx-auto text-center">
          <h1 className="display-4 mb-4">🧠 Welcome to NeuroBloom</h1>
          <p className="lead mb-4">
            An AI-powered assistive platform for cognitive growth and personalized learning
          </p>
          <Link to="/login">
            <Button size="lg" variant="primary" className="me-3">
              Get Started
            </Button>
          </Link>
        </Col>
      </Row>

      <Row className="mb-5">
        <Col md={4} className="mb-3">
          <Card>
            <Card.Body>
              <Card.Title>📖 Reading Support</Card.Title>
              <Card.Text>
                Adaptive reading practice with real-time feedback to improve reading speed and comprehension.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4} className="mb-3">
          <Card>
            <Card.Body>
              <Card.Title>✍️ Writing Assistance</Card.Title>
              <Card.Text>
                AI-assisted writing practice with spelling and grammar feedback to enhance writing skills.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4} className="mb-3">
          <Card>
            <Card.Body>
              <Card.Title>🔢 Math Practice</Card.Title>
              <Card.Text>
                Interactive math problems with real-time feedback to build problem-solving confidence.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-5">
        <Col md={6} className="mb-3">
          <Card>
            <Card.Body>
              <Card.Title>🎯 Early Detection</Card.Title>
              <Card.Text>
                Identify signs of learning disorders like dyslexia, dysgraphia, and dyscalculia early.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} className="mb-3">
          <Card>
            <Card.Body>
              <Card.Title>📊 Progress Tracking</Card.Title>
              <Card.Text>
                Real-time dashboards for teachers and parents to monitor student progress and growth.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col md={12} className="text-center">
          <h3 className="mb-4">Features</h3>
          <ul className="list-unstyled">
            <li>✅ NLP-powered text analysis</li>
            <li>✅ Machine learning-based assessments</li>
            <li>✅ Text-to-Speech and Speech-to-Text</li>
            <li>✅ Personalized learning recommendations</li>
            <li>✅ Teacher and parent dashboards</li>
            <li>✅ Comprehensive progress reports</li>
          </ul>
        </Col>
      </Row>
    </div>
  );
}

export default Home;
