import React, { useState, useEffect } from 'react';
import { Container, Navbar, Nav, Row, Col, Card, Button } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

// Import components
import StudentDashboard from './pages/StudentDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import ParentDashboard from './pages/ParentDashboard';
import ReadingActivity from './pages/ReadingActivity';
import WritingActivity from './pages/WritingActivity';
import MathActivity from './pages/MathActivity';
import Login from './pages/Login';
import Home from './pages/Home';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Navbar bg="light" expand="lg" className="navbar-custom">
        <Container>
          <Navbar.Brand as={Link} to="/" className="fw-bold">
            🧠 NeuroBloom
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {user ? (
                <>
                  <Nav.Link as={Link} to="/dashboard">
                    Dashboard
                  </Nav.Link>
                  <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                </>
              ) : (
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="mt-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          {user && (
            <>
              {user.user_type === 'student' && (
                <>
                  <Route path="/dashboard" element={<StudentDashboard />} />
                  <Route path="/reading" element={<ReadingActivity />} />
                  <Route path="/writing" element={<WritingActivity />} />
                  <Route path="/math" element={<MathActivity />} />
                </>
              )}
              {user.user_type === 'teacher' && (
                <Route path="/dashboard" element={<TeacherDashboard />} />
              )}
              {user.user_type === 'parent' && (
                <Route path="/dashboard" element={<ParentDashboard />} />
              )}
            </>
          )}
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
