import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './login-view.scss';

/** @function LoginView */
export function LoginView(props) {
  const [username, setUsername ] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('https://cineteca.herokuapp.com/login', {
      Username: username,
      Password: password
    })
    .then(response => {
      const data = response.data;
      props.onLoggedIn(data);
    })
    .catch(event => {
      alert('no such user: ' + username);
    });
  };

  return (
    <Form className="login-view">
      <h2>Login</h2>
      <Form.Group controlId="formBasicEmail">
        <Form.Label >Username</Form.Label>
        <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
        <Form.Text className="text-muted">
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
      </Form.Group>

      <Button variant="primary" type="button" onClick={handleSubmit}>
        LOGIN
      </Button>

      New user?

      <p>
        <Link to={'/register'}>
          <span>Register here</span>
        </Link>
      </p>
    </Form>
  );// return
}

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired
};
