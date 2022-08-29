import * as React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { render } from 'react-dom';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Axios from 'axios';
import './bootstrap.min.css';
import './style.css';

const App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    console.log('asd');
    try {
      Axios.post('https://reqres.in/api/login', {
        email,
        password,
      })
        .then((response) => {
          let data = response.data;
          //do whatever u want here eg :set token to local storage
          if (data) {
            console.log(`token: ${data.token}`);
            //console.log(JSON.stringify(response.data.token));

            Axios.post(`https://reqres.in/api/${data.token}`).then(
              (response) => {
                let data = response.data;
                console.log('secure API' + JSON.stringify(response.headers));
              }
            );
          }
        })
        .catch((error) => {
          console.log('Incorrect email/Password');
        });
    } catch (e) {
      console.log('asdasd' + e.message);
    }
  }

  return (
    <div>
      <div>
        <div>
          <img
            src="https://raw.githubusercontent.com/arvkas/wissen-react-coding-challenge-2022-pchbtb/main/images/wissenlogo.png"
            className="logoImg"
          />
          <h3 className="formTitle">Hello there, Sign in to continue.</h3>
          <div className="col-md-3 formText">
            <Form className="ms-2 mt-4" onSubmit={handleSubmit}>
              <Form.Group
                className="mb-3 blockLevel"
                controlId="formBasicEmail"
              >
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
                    By Crating or logging into an account, you are agreeing with
                    our <strong>Terms & Conitions</strong> and{' '}
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
            <Toast />
          </div>
        </div>
      </div>
    </div>
  );
};
const Toast = (props) => {
  const { toastList, position } = props;
  const [list, setList] = useState(toastList);

  useEffect(() => {
    setList(toastList);
  }, [toastList, list]);

  return (
    <div className={`notification-container ${position}`}>
      {list.map((toast, i) => (
        <div key={i} className={`notification toast ${position}`}>
          <button>X</button>
          <div className="notification-image">
            <img src={toast.icon} alt="" />
          </div>
          <div>
            <p className="notification-title">{toast.title}</p>
            <p className="notification-message">{toast.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

render(<App />, document.getElementById('root'));
