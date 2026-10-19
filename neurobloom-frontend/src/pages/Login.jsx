import React, { useState } from 'react';
import { Card, Form, Button, Alert, Tabs, Tab } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:5000/api';

function Login({ setUser }) {
  const [loginData, setLoginData] = useState({ username: '', password: '', userType: 'student' });
  const [signupData, setSignupData] = useState({ 
    username: '', 
    email: '',
    password: '', 
    userType: 'student',
    age: '',
    grade_level: ''
  });
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('login');
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        username: loginData.username,
        password: loginData.password,
        user_type: loginData.userType
      });
      const userData = response.data;
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Unable to log in. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const response = await axios.post(`${API_URL}/auth/signup`, {
        username: signupData.username,
        email: signupData.email,
        password: signupData.password,
        user_type: signupData.userType,
        age: signupData.age || null,
        grade_level: signupData.grade_level
      });
      const userData = response.data;
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Unable to sign up. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
      <Card style={{ width: '400px' }}>
        <Card.Body>
          <Card.Title className="text-center mb-4">🧠 NeuroBloom</Card.Title>

          {error && <Alert variant="danger">{error}</Alert>}

          <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)} className="mb-3">
            <Tab eventKey="login" title="Login">
              <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    value={loginData.username}
                    onChange={(e) => setLoginData({...loginData, username: e.target.value})}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={loginData.password}
                    onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                    required
                    minLength={8}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Login as:</Form.Label>
                  <Form.Select
                    value={loginData.userType}
                    onChange={(e) => setLoginData({...loginData, userType: e.target.value})}
                  >
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                    <option value="parent">Parent</option>
                  </Form.Select>
                </Form.Group>

                <Button type="submit" variant="primary" className="w-100" disabled={submitting}>
                  {submitting ? 'Logging in...' : 'Login'}
                </Button>
              </Form>
            </Tab>

            <Tab eventKey="signup" title="Sign Up">
              <Form onSubmit={handleSignup}>
                <Form.Group className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    value={signupData.username}
                    onChange={(e) => setSignupData({...signupData, username: e.target.value})}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={signupData.email}
                    onChange={(e) => setSignupData({...signupData, email: e.target.value})}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={signupData.password}
                    onChange={(e) => setSignupData({...signupData, password: e.target.value})}
                    required
                    minLength={8}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Sign up as:</Form.Label>
                  <Form.Select
                    value={signupData.userType}
                    onChange={(e) => setSignupData({...signupData, userType: e.target.value})}
                  >
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                    <option value="parent">Parent</option>
                  </Form.Select>
                </Form.Group>

                {signupData.userType === 'student' && (
                  <>
                    <Form.Group className="mb-3">
                      <Form.Label>Age</Form.Label>
                      <Form.Control
                        type="number"
                        value={signupData.age}
                        onChange={(e) => setSignupData({...signupData, age: e.target.value})}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Grade Level</Form.Label>
                      <Form.Control
                        type="text"
                        value={signupData.grade_level}
                        onChange={(e) => setSignupData({...signupData, grade_level: e.target.value})}
                      />
                    </Form.Group>
                  </>
                )}

                <Button type="submit" variant="success" className="w-100" disabled={submitting}>
                  {submitting ? 'Creating account...' : 'Sign Up'}
                </Button>
              </Form>
            </Tab>
          </Tabs>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Login;
