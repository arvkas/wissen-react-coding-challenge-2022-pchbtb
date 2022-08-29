import * as React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { render } from 'react-dom';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Axios from 'axios';
import './bootstrap.min.css';
import './style.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(
    Boolean(localStorage.getItem('loginToken'))
  );
  const inactivityTime = function () {
    var time;
    window.onload = resetTimer;
    // DOM Events
    function resetTimer() {
      clearTimeout(time);
      time = setTimeout(() => {
        localStorage.removeItem('loginToken');
        localStorage.removeItem('loginEmail');
      }, 10000);
    }
  };
  inactivityTime;
  return (
    <div>
      <div>
        <div>
          <img
            src="https://raw.githubusercontent.com/arvkas/wissen-react-coding-challenge-2022-pchbtb/main/images/wissenlogo.png"
            className="logoImg"
          />
          <h3 className="formTitle">Hello there, Sign in to continue.</h3>
          <div className="formText">
            {loggedIn ? (
              <WelcomeSection setLoggedIn={setLoggedIn} />
            ) : (
              <FormSection setLoggedIn={setLoggedIn} />
            )}

            <ToastContainer />
          </div>
        </div>
      </div>
    </div>
  );
};

const WelcomeSection = (props) => {
  function HandleLoggedOut() {
    props.setLoggedIn(false);
    localStorage.removeItem('loginToken');
    localStorage.removeItem('loginEmail');
  }

  return (
    <div className="ms-2 mt-4">
      <p>
        Welcome <strong>{localStorage.getItem('loginEmail')}</strong>
      </p>
      <Button onClick={HandleLoggedOut}>Sign out</Button>
    </div>
  );
};
const FormSection = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  let validated = true;
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log('asd');
    if (email.length == 0 || password.length == 0) {
      validated = false;
      toast('Enter Email & password');
    }
    if (validated) {
      try {
        Axios.post('https://reqres.in/api/login', {
          email,
          password,
        })
          .then((response) => {
            let data = response.data;
            if (data) {
              props.setLoggedIn(true);
              localStorage.setItem('loginToken', data.token);
              localStorage.setItem('userEmail', email);
              console.log(`token: ${data.token}`);
              toast('Successfully logged in');
              Axios.post(`https://reqres.in/api/${data.token}`).then(
                (response) => {
                  let data = response.data;
                  console.log(`secure API ${JSON.stringify(response.headers)}`);
                }
              );
              setTimeout(() => {
                localStorage.removeItem('loginToken');
                localStorage.removeItem('loginEmail');
                window.location.reload();
              }, 300000);
            }
          })
          .catch((error) => {
            console.log('Incorrect email/Password');
            toast('Invalid username /password');
          });
      } catch (e) {
        console.log('asdasd' + e.message);
      }
    }
  };
  return (
    <Form className="ms-2 mt-4" onSubmit={handleSubmit}>
      <Form.Group className="mb-3 blockLevel" controlId="formBasicEmail">
        <label className="mailLabel">Email</label>
        <Form.Control
          type="email"
          className="inputField"
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>
      <Form.Group
        className="mb-3 mt-4 blockLevel"
        controlId="formBasicPassword"
      >
        <label className="mailLabel">Password</label>
        <Form.Control
          type="password"
          className="inputField"
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>
      <Form.Group
        className="mb-3 mt-4 blockLevel"
        controlId="formBasicCheckbox"
      >
        <Form.Label className="mailLabel">
          <input
            type="checkbox"
            name="terms"
            className="terms form-check-input"
          />
          <span>
            By Crating or logging into an account, you are agreeing with our{' '}
            <strong>Terms & Conitions</strong> and{' '}
            <strong>Privacy Polycis</strong>
          </span>
        </Form.Label>
      </Form.Group>
      <Button
        variant="primary"
        type="submit"
        className="btn btn-primary col-12 customBtn"
      >
        Next
      </Button>
    </Form>
  );
};

render(<App />, document.getElementById('root'));
