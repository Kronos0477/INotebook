import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
  const navigateTo = useNavigate();
  const [cred, setCred] = useState({ email: "", password: "", username: "" });

  const handleSignup = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Email: cred.email,
        Password: cred.password,
        Username: cred.username,
      }),
    });

    const json = await response.json();
    if (json.success) {
      // Save the auth token and redirect
      console.log(json)
      sessionStorage.setItem('token', json.authtoken);
      navigateTo('/');
    } else {
      // Handle error
      props.setAlert(`${json.error}`)
      setTimeout(() => {
        props.setAlert('')
      }, 1500);
      console.log(json.error);
    }
  };

  const onChange = (e) => {
    setCred({ ...cred, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleSignup}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={cred.email}
            onChange={onChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={cred.password}
            onChange={onChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            value={cred.username}
            onChange={onChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Sign Up</button>
      </form>
    </div>
  );}

export default Signup;