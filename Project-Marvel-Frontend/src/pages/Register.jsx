import React from 'react'
import { useState } from 'react'
import API from '../services/api'

function Register() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: ""
  });
  const handleRegister = async () => {
    if (!user.name || !user.email || !user.password) {
      alert("Please fill all fields ⚠️")
      return
    }

    try {
      // Register the User
      await API.post("/auth/register", user)
      
      // 2. Step: Auto-Login immediately after registration
      // We send the email and password to the login endpoint
      const loginRes = await API.post("/auth/login", { 
        email: user.email, 
        password: user.password 
      })

      if (loginRes.data.error) {
        alert("Registered, but auto-login failed. Please login manually.")
        navigate("/Login")
        return
      }

      // 3. Step: Save session data (Same as Login.jsx)
      localStorage.setItem("token", loginRes.data.token)
      localStorage.setItem("user", JSON.stringify(loginRes.data))

      alert("Registration Successful! Welcome to the Multiverse 🚀")

      // 4. Step: Redirect based on role
      if (loginRes.data.role === "ROLE_ADMIN") {
        window.location.assign("/admin-dashboard")
      } else {
        window.location.assign("/")
      }

    } catch (err) {
      console.error(err)
      alert("Registration failed. Email might already exist ❌")
    }
  }
  return (
    <div className="auth-container"> {/* Same wrapper class */}
      <div className="auth-card-register">     {/* Same card class */}
        <h2 className="auth-title">Register</h2>

        {/* Name Field */}
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            className="form-input"
            placeholder="Enter your name"
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
        </div>

        {/* Email Field */}
        <div className="form-group">
          <label>Email address</label>
          <input
            type="email"
            className="form-input"
            placeholder="Enter email"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </div>

        {/* Password Field */}
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-input"
            placeholder="Create password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </div>

        {/* Button - uses logic for 'active' state if fields are filled */}
        <button 
          className={`btn-login ${user.name && user.email && user.password ? 'active' : ''}`} 
          onClick={handleRegister}
        >
          Sign Up
        </button>

        <p className="signup-text">
          Already have an account? <a href="/Login" className="signup-link">Login</a>
        </p>
      </div>
    </div>
  );
}

export default Register;