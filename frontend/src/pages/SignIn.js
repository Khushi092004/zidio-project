import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setCredentials({ ...credentials, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", credentials);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);

      const userRole = response.data.role.toLowerCase();
      console.log("User role:", userRole); // Debugging

      if (userRole === "admin") navigate("/admin-dashboard");
      else if (userRole === "manager") navigate("/manager-dashboard");
      else if (userRole === "employee") navigate("/employee-dashboard");
      else alert("Unknown role: " + userRole);

    } catch (err) {
      console.error("Login Error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Invalid credentials. Please try again.");
    }
  };

  return (
    <div>
    <h2> Sign In</h2>
    <form onSubmit={handleSubmit}>
      <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
      <button type="submit">Login</button>
    </form>
    </div>
  );
};

export default SignIn;
