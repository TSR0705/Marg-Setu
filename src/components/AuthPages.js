import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// ========== LOGIN PAGE ==========
export const LoginPage = () => {
  const [role, setRole] = useState("Entrepreneur");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulated login logic
    if (email === "tanmaysingh8246@gmail.com" && password === "123456") {
      switch (role) {
        case "Entrepreneur":
          window.location.href = "/entrepreneur/dashboard";
          break;
        case "Investor":
          window.location.href = "/investor/dashboard";
          break;
        case "Mentor":
          window.location.href = "/mentor/dashboard";
          break;
        case "Brainstormer":
          window.location.href = "/brainstormer/dashboard";
          break;
        case "Admin":
          window.location.href = "/admin";
          break;
        default:
          break;
      }
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div style={styles.container}>
      <form style={styles.card} onSubmit={handleLogin}>
        <h2 style={styles.heading}>Login to Marg Setu</h2>
        {error && <p style={styles.error}>{error}</p>}

        <label style={styles.label}>Role</label>
        <select value={role} onChange={(e) => setRole(e.target.value)} style={styles.input}>
          <option>Entrepreneur</option>
          <option>Investor</option>
          <option>Mentor</option>
          <option>Brainstormer</option>
          <option>Admin</option>
        </select>

        <label style={styles.label}>Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />

        <label style={styles.label}>Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />

        <button type="submit" style={styles.button}>Login</button>

        <div style={styles.footer}>
          <Link to="/forgot-password" style={styles.link}>Forgot Password?</Link>
          <p style={styles.signupText}>
            Don’t have an account? <Link to="/signup" style={styles.link}>Sign Up</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

// ========== SIGNUP PAGE ==========
export const SignUpPage = () => {
  const [role, setRole] = useState("Entrepreneur");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = (e) => {
    e.preventDefault();

    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    if (!name || !email || !password) {
      setError("Please fill out all fields");
      return;
    }

    console.log("Sign Up Data:", { role, name, email, password });
    alert(`Account created for ${role}!`);
    window.location.href = "/login";
  };

  return (
    <div style={styles.container}>
      <form style={styles.card} onSubmit={handleSignUp}>
        <h2 style={styles.heading}>Create Your Marg Setu Account</h2>
        {error && <p style={styles.error}>{error}</p>}

        <label style={styles.label}>Role</label>
        <select value={role} onChange={(e) => setRole(e.target.value)} style={styles.input}>
          <option>Entrepreneur</option>
          <option>Investor</option>
          <option>Mentor</option>
          <option>Brainstormer</option>
          <option>Admin</option>
        </select>

        <label style={styles.label}>Full Name</label>
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
        />

        <label style={styles.label}>Email</label>
        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />

        <label style={styles.label}>Password</label>
        <input
          type="password"
          placeholder="Create a password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        <label style={styles.label}>Confirm Password</label>
        <input
          type="password"
          placeholder="Confirm password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          style={styles.input}
        />

        <button type="submit" style={styles.button}>Sign Up</button>

        <p style={styles.footerText}>
          Already have an account? <Link to="/login" style={styles.link}>Login</Link>
        </p>
      </form>
    </div>
  );
};

// ========== FORGOT PASSWORD PAGE ==========
export const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleForgotPassword = (e) => {
    e.preventDefault();

    if (!email) {
      setMessage("Please enter your email.");
      return;
    }

    // Simulate email send
    setMessage(`Reset link sent to ${email}. Check your inbox.`);
    setTimeout(() => {
      navigate("/login");
    }, 3000);
  };

  return (
    <div style={styles.container}>
      <form style={styles.card} onSubmit={handleForgotPassword}>
        <h2 style={styles.heading}>Forgot Password</h2>
        {message && <p style={{ color: "green", textAlign: "center" }}>{message}</p>}

        <label style={styles.label}>Enter your email</label>
        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />

        <button type="submit" style={styles.button}>Send Reset Link</button>

        <p style={styles.footerText}>
          <Link to="/login" style={styles.link}>Back to Login</Link>
        </p>
      </form>
    </div>
  );
};

// ========== COMMON STYLES ==========
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f0f4f8",
    fontFamily: "sans-serif"
  },
  card: {
    backgroundColor: "white",
    padding: "2rem",
    width: "350px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    borderRadius: "12px"
  },
  heading: {
    textAlign: "center",
    marginBottom: "1rem",
    color: "#2b6cb0"
  },
  label: {
    display: "block",
    marginTop: "1rem",
    fontWeight: "bold",
    color: "#333"
  },
  input: {
    width: "100%",
    padding: "0.6rem",
    marginTop: "0.3rem",
    border: "1px solid #ccc",
    borderRadius: "6px"
  },
  button: {
    width: "100%",
    padding: "0.7rem",
    backgroundColor: "#2b6cb0",
    color: "white",
    border: "none",
    borderRadius: "6px",
    marginTop: "1.2rem",
    cursor: "pointer",
    fontWeight: "bold"
  },
  footer: {
    marginTop: "1rem",
    textAlign: "center"
  },
  link: {
    color: "#2b6cb0",
    textDecoration: "none"
  },
  signupText: {
    marginTop: "0.5rem"
  },
  footerText: {
    marginTop: "1rem",
    textAlign: "center"
  },
  error: {
    color: "red",
    fontSize: "0.9rem",
    textAlign: "center"
  }
};
