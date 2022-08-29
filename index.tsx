import * as React from 'react';
import { render } from 'react-dom';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import './bootstrap.min.css';
import './style.css';

const App = () => {
  return (
    <div>
      <div>
        <div>
          <img
            src="https://raw.githubusercontent.com/arvkas/wissen-react-coding-challenge-2022-pchbtb/main/images/wissenlogo.png"
            className="logoImg"
          />
          <h3 className="formTitle">Hello there, Sign in to continue.</h3>
          <div className="col-md-4">
            <Form className="ms-2 mt-4">
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className="mailLabel">Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label className="mailLabel">Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                className="btn btn-primary col-12 customBtn"
              >
                Next
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

render(<App />, document.getElementById('root'));
