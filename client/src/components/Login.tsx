import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import "../styles/Login.css";

const Login = () => {
  const [email, setEmail] = useState("sara@example.com");
  const [password, setPassword] = useState("qwerty");
  const [error, setError] = useState(""); // State to handle errors

  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Check authentication status and redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    if (email && password) {
      try {
        const success = await login(email, password); // Assume login returns success or throws an error
        if (!success) {
          setError("Invalid email or password"); // Show error if credentials are wrong
        }
      } catch (err) {
        setError("Something went wrong. Please try again later.");
      }
    } else {
      setError("Both fields are required"); // Validation for empty fields
    }
  };

  return (
    <div className="login-container">
      <h2>Atomize</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        {/* Error message */}
        {error && <div className="error-message">{error}</div>}

        <div className="form-group">
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
