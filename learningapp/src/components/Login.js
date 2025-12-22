// src/components/Login.js
import React, { useState } from "react";
import axios from "axios";
import "./Login.css";

export default function Login({ setUserId, setSkills, setGoal, setPath, setShowWelcome }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const handleSignup = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/signup", { email, password });
      alert(res.data.message || "Signup successful! Now login.");
      setIsLogin(true);
    } catch (err) {
      alert(err.response?.data?.error || "Signup failed");
    }
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/login", { email, password });
      setUserId(res.data.userId);
      setSkills(res.data.skills || {});
      setGoal(res.data.goal || "");
      setPath(res.data.path || []);
      setShowWelcome(false);
    } catch (err) {
      alert(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1 className="login-title">🚀 Personalized Learning Path</h1>
        <div className="login-form">
          <input
            type="email"
            placeholder="Email"
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {isLogin ? (
            <button className="login-btn login-btn-primary" onClick={handleLogin}>
              Login
            </button>
          ) : (
            <button className="login-btn login-btn-success" onClick={handleSignup}>
              Signup
            </button>
          )}
          <button className="login-btn login-btn-link" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Create an account" : "Already have an account?"}
          </button>
        </div>
      </div>
    </div>
  );
}
