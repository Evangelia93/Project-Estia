import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import '../styles/modal.css'; 
import user from "../assets/user.png";

function SignIn() {
  const [isSignIn, setIsSignIn] = useState(true); 
  return (
    <div>
      <Popup
        trigger={
          <div className="sign-up-icon">
            <img
              src={user}
              alt="Sign In"
              style={{
                width: "50px",
                marginLeft: "15px",
                cursor: "pointer",
              }}
            />
          </div>
        }
        modal
        nested
      >
        {close => (
          <div className="modal-content small-modal">
            <span className="close" onClick={close}>
              &times;
            </span>
            {isSignIn ? (
              <>
                {/* Sign In Form */}
                <h4 className="heading">Sign In</h4>
                <form>
                  <label htmlFor="email">E-Mail</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    className="searchbox-input"
                  />
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    placeholder="Enter your password"
                    className="searchbox-input"
                  />
                  <button type="submit" className="searchbox-button">
                    Sign In
                  </button>
                </form>
                <hr />
                <p>
                  Don't have an account?{' '}
                  <a
                    href="#"
                    onClick={() => setIsSignIn(false)} 
                  >
                    Sign Up
                  </a>
                </p>
              </>
            ) : (
              <>
                {/* Sign Up Form */}
                <h4 className="heading">Sign Up</h4>
                <form>
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Enter your name"
                    className="searchbox-input"
                  />
                  <label htmlFor="email">E-Mail</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    className="searchbox-input"
                  />
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    placeholder="Enter your password"
                    className="searchbox-input"
                  />
                  <button type="submit" className="searchbox-button">
                    Sign Up
                  </button>
                </form>
                <hr />
                <p>
                  Already have an account?{' '}
                  <a
                    href="#"
                    onClick={() => setIsSignIn(true)}
                  >
                    Sign In
                  </a>
                </p>
              </>
            )}
          </div>
        )}
      </Popup>
    </div>
  );
}

export default SignIn;