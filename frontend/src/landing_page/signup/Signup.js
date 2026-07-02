import React, { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Dashboard app runs on a different port — set this to your dashboard's URL
  const API_URL = process.env.REACT_APP_API_URL;
  const DASHBOARD_URL = process.env.REACT_APP_DASHBOARD_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const endpoint = isLogin ? "/login" : "/register";
      const payload = isLogin ? { email, password } : { name, email, password };

      const res = await axios.post(`${API_URL}${endpoint}`, payload);
      const { token } = res.data;

      // Pass token via URL since frontend & dashboard are different origins/ports.
      // Dashboard will read it and store it in its OWN localStorage.

      console.log("API_URL:", API_URL);
      console.log("DASHBOARD_URL:", DASHBOARD_URL);
      console.log("Redirecting to:", `${DASHBOARD_URL}/?token=${token}`);

      window.location.href = `${DASHBOARD_URL}/?token=${token}`;
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "60px auto", padding: 20 }}>
      <h2>{isLogin ? "Login" : "Sign Up"}</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{
              display: "block",
              width: "100%",
              marginBottom: 10,
              padding: 8,
            }}
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            display: "block",
            width: "100%",
            marginBottom: 10,
            padding: 8,
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            display: "block",
            width: "100%",
            marginBottom: 10,
            padding: 8,
          }}
        />
        <button type="submit" style={{ width: "100%", padding: 10 }}>
          {isLogin ? "Login" : "Create Account"}
        </button>
      </form>

      <p
        style={{ marginTop: 10, cursor: "pointer", color: "blue" }}
        onClick={() => setIsLogin(!isLogin)}
      >
        {isLogin
          ? "Need an account? Sign up"
          : "Already have an account? Login"}
      </p>
    </div>
  );
};

export default Signup;
