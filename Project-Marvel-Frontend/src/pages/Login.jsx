import React, { useState } from 'react'
import API from '../services/api'
import { useNavigate } from 'react-router-dom'


function Login() {
  const [user, setUser] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!user.email || !user.password) {
      alert("Please fill all fields ⚠️");
      return;
    }

    try {
      const res = await API.post("/auth/login", user);
      
      if (res.data.error) {
        alert(res.data.error);
        return;
      }

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data));

      // console.log("LOGIN RESPONSE:", res.data);

      // Role-based navigation with a hard redirect to refresh Navbar
      if (res.data.role === "ROLE_ADMIN") {
        window.location.assign("/");
      } else {
        window.location.assign("/");
      }
      
    } catch (err) {
      console.error(err);
      alert("Server error ❌");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Log in</h2>

        {/* EMAIL */}
        <div className="form-group">
          <label>Email address</label>
          <input
            type="email"
            className="form-input"
            placeholder="Enter email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </div>

        {/* PASSWORD */}
        <div className="form-group" style={{ position: 'relative' }}>
          <label>Password</label>
          <input
            type={showPassword ? "text" : "password"}
            className="form-input"
            placeholder="Enter password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          <span 
            onClick={() => setShowPassword(!showPassword)}
            style={{ 
              position: 'absolute', right: '15px', top: '42px', 
              cursor: 'pointer', color: '#666' 
            }}
          >
            {showPassword ? "👁️" : "👁️‍🗨️"}
          </span>
        </div>

        {/*  LOGIN BUTTON */}
        <button 
          className={`btn-login ${user.email && user.password ? 'active' : ''}`} 
          onClick={handleLogin}
        >
          Log in
        </button>

        <p className="signup-text">
          Don't have an account? <a href="/Register" className="signup-link">Sign Up</a>
        </p>
      </div>
    </div>
  )
}

export default Login;