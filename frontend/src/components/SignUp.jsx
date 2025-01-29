import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import '../styles/modal.css';
import user from "../assets/user.png";
import axios from 'axios';

function SignUp() {
  const [username, setUsername] = useState(''); // Changed from 'name' to 'username'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');  // Success message state

  // Handle SignUp
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://estiaproject-b3ef95234cdd.herokuapp.com/api/v1/register', {
        username, // Changed from 'name' to 'username'
        email,
        password,
      });

      // Debugging: Log the response to see the data structure
      console.log('Response:', response); 
      console.log('Response Data:', response.data);

      setSuccessMessage('Sign Up successful! You can now log in.'); // Set the success message
      setError(''); // Clear the error message

    } catch (err) {
      console.error('SignUp error:', err);

      // Check if there's a response from the API with an error message
      if (err.response) {
        setError(err.response.data.error); // Set error if any error response is received
      } else {
        setError('Internal Server Error');
      }

      setSuccessMessage(''); // Clear success message on error
    }
  };

  return (
    <div>
      <Popup
        trigger={
          <div className="sign-up-icon">
            <img
              src={user}
              alt="Sign Up"
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
            <h4 className="heading">Sign Up</h4>
            <form onSubmit={handleSignUp}>
              <label htmlFor="username">Username</label> {/* Changed label from 'name' to 'username' */}
              <input
                type="text"
                id="username"
                placeholder="Enter your username"
                className="searchbox-input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <label htmlFor="email">E-Mail</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="searchbox-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                className="searchbox-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {error && <p style={{ color: 'red' }}>{error}</p>}
              {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>} {/* Display success message */}
              <button type="submit" className="searchbox-button">
                Sign Up
              </button>
            </form>
            <hr />
            <p>
              Already have an account? <a href="#">Sign In</a>
            </p>
          </div>
        )}
      </Popup>
    </div>
  );
}

export default SignUp;
