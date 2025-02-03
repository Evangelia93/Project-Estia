import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import axios from 'axios';
import './SignIn.module.css';  


export default function SignIn() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (!email || !password) {
      setError('Email and Password are required');
      return;
    }

    try {
      const response = await axios.post('https://estiaproject-b3ef95234cdd.herokuapp.com/api/v1/auth/login', {
        email,
        password,
      });
      console.log('Login successful:', response.data);
      setSuccessMessage('Login successful!');
      setError('');
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.error || 'Unknown Error');
      setSuccessMessage('');
    }
  };

  // Handle Sign Up
  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (!username || !email || !password || !confirmPassword) {
      setError('All fields are required');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    try {
      const response = await axios.post('https://estiaproject-b3ef95234cdd.herokuapp.com/api/v1/auth/register', {
        username,
        email,
        password,
      });
      console.log('SignUp successful:', response.data);
      setSuccessMessage('Sign Up successful! Please login.');
      setIsLogin(true);
    } catch (err) {
      console.error('SignUp error:', err);
      setError(err.response?.data?.error || 'Unknown Error');
      setSuccessMessage('');
    }
  };

  return (

    <Popup
      trigger={<button className="navButton">Login / Sign Up</button>}
      modal
      nested
    >
      {close => (
        <div className="modal-content small-modal">
          <span className="close" onClick={close}>&times;</span>
          <div className="form-container">
            <div className="form-toggle">
              <button className={isLogin ? 'active' : ""} onClick={() => setIsLogin(true)}>Login</button>
              <button className={!isLogin ? 'active' : ""} onClick={() => setIsLogin(false)}>Sign Up</button>
            </div>

            {isLogin ? (
              <div className="form">
                <h2>Login Form</h2>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
                <button onClick={handleLogin}>Login</button>
                <p>Not a Member? <a href="#" onClick={() => setIsLogin(false)}>Sign up now</a></p>
              </div>
            ) : (
              <div className="form">
                <h2>Sign Up Form</h2>
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
                <button onClick={handleSignUp}>Sign Up</button>
                <p>Already a member? <a href="#" onClick={() => setIsLogin(true)}>Login now</a></p>
              </div>
            )}
          </div>
        </div>
      )}
    </Popup>
  );
}
