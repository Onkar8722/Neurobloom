import React from 'react';
import { Card, Row, Col, Alert } from 'react-bootstrap';

function ParentDashboard() {
  return (
    <div>
      <h1 className="mb-4">Parent Portal 👨‍👩‍👧</h1>

      <Alert variant="info">
        Parent dashboard to monitor your child's progress and learning activities.
      </Alert>

      <Row>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Child's Progress</Card.Title>
              <p>Overall Performance: 85%</p>
              <p>Learning Focus Areas: Reading, Writing</p>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Recent Activities</Card.Title>
              <ul>
                <li>Reading Practice - 2 hours ago</li>
                <li>Math Activity - 4 hours ago</li>
                <li>Writing Practice - 1 day ago</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Teacher Communication</Card.Title>
              <p>No new messages</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default ParentDashboard;
