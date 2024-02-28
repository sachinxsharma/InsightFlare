import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const changeInputHandler = (e) => {
    setUserData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const registerUser = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/users/register`, userData);
      if (response && response.data) {
        const newUser = response.data;
        console.log(newUser);
        navigate('/');
      } else {
        setError("Couldn't register user. Please try again.");
      }
    } catch (err) {
      if (err.response) {
        // The request was made and the server responded with a status code that falls out of the range of 2xx
        setError(err.response.data.message || "An error occurred while registering user. Please try again.");
      } else if (err.request) {
        // The request was made but no response was received
        setError("Network error occurred. Please check your internet connection and try again.");
      } else {
        // Something happened in setting up the request that triggered an Error
        setError("An error occurred while registering user. Please try again.");
      }
    }
  };
  
  

  return (
    <section className="register">
      <div className="container">
        <h2>Sign Up</h2>
        <form className="form register__form" onSubmit={registerUser}>
          {error && <p className="form__error-message">{error}</p>}
          <input type="text" placeholder="Full Name" name='name' value={userData.name} onChange={changeInputHandler} autoFocus />
          <input type="text" placeholder="Email" name='email' value={userData.email} onChange={changeInputHandler} />
          <input type="password" placeholder="Password" name='password' value={userData.password} onChange={changeInputHandler} />
          <input type="password" placeholder="Confirm password" name='password2' value={userData.password2} onChange={changeInputHandler} />
          <button type='submit' className="btn primary">Register</button>
        </form>
        <small>Already have an account? <Link to="/login">Sign in</Link></small>
      </div>
    </section>
  );
};

export default Register;
