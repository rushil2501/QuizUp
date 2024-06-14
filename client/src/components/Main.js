import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { setUserId } from '../redux/result_reducer';
import '../styles/Main.css';

export default function Main() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const dispatch = useDispatch();

  const handleLoginSuccess = (response) => {
    if (response.credential) {
      const base64Url = response.credential.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      const decoded = JSON.parse(jsonPayload);
      
      const googleId = decoded.name; // The Google ID is in the 'sub' field
      // console.log(decoded)
      dispatch(setUserId(googleId));
      setIsAuthenticated(true); // Set authentication status to true
    }
  };

  const handleLoginFailure = (error) => {
    console.error('Login failed:', error);
    // Handle login failure
  };

  return (
    <div className='container'>
      <h1 className='title text-light'>Quiz Application</h1>
      <ol>
        <li>You will be asked 5 questions one after another.</li>
        <li>10 points awarded for the correct answer.</li>
        <li>Each question has three options. You can choose only one option.</li>
        <li>You can review and change answers before the quiz finishes.</li>
        <li>The result will be declared at the end of the quiz.</li>
      </ol>

      <GoogleOAuthProvider clientId="944200709151-4t5mdmmfeqt0jkq9v6iuggvb35054uhq.apps.googleusercontent.com"> {/* Replace with your actual client ID */}
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={handleLoginFailure}
          className='google-login-button'
        />
      </GoogleOAuthProvider>

      {/* Conditionally render the 'Start Quiz' button */}
      {isAuthenticated && (
        <div className='start'>
          <Link className='btn' to={'quiz'}>Start Quiz</Link>
        </div>
      )}

    </div>
  );
}
   