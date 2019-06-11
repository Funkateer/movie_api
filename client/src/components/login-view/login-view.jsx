import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import './login-view.scss';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = (e) => {

    // the two line below are temporay the first prevents the default auth logic to take place (when clicking on submit button),
    // the second allowas users to log-in even with made up credential it's for testing I'll implement auth in the near future
    e.preventDefault();
    props.onLoggedIn(username);

    console.log(username, password);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
  };

  return (
    <Container className='login-view'>
      <h1>Login</h1>
      <Form>
        <Form.Group controlId='formUsername'>
          <Form.Label>Username:</Form.Label>
          <Form.Control size='sm' type='text' placeholder='Username' value={username} onChange={e => setUsername(e.target.value)} />
        </Form.Group>
        <Form.Group controlId='formPassword'>
          <Form.Label>Password:</Form.Label>
          <Form.Control size='sm' type='password' placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} />
        </Form.Group>
        <Button variant='primary' onClick={handleSubmit} >Submit</Button>
        <Form.Group controlId='formNewUser'>
          <Form.Text>New user? Click <Button id='login-view__register' style={{ padding: 0 }} variant='link' onClick={() => props.newUser()}> here </Button> to register</Form.Text>
        </Form.Group>
      </Form>
    </Container>
  );
}

LoginView.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  newUser: PropTypes.func.isRequired,
  OnLoggedIn: PropTypes.func.isRequired
}
