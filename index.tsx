import React from 'react';
import { render } from 'react-dom';
import { Button } from 'react-bootstrap';
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
          <h3>Hello there, Sign in to continue.</h3>
          <div>
            <form>
              <div>
                <label className="labelTxt">Email:</label>
                <input type="text" />
                <div></div>
              </div>
              <div>
                <label>Password</label>
                <input />
                <div></div>
              </div>
              <button>Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

render(<App />, document.getElementById('root'));
