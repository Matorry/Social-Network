import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUsers } from "../hooks/use.user";
import { LoginData } from "../models/user";

const LoginForm = () => {
  const { loginUser, status, error, isLoading } = useUsers();
  const [userName, setUserName] = useState("");
  const [passwd, setPasswd] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (status === "logged") {
      navigate("/update-account");
    }
  });

  const handleLogin = async () => {
    const userCredentials: LoginData = { userName, passwd };
    try {
      await loginUser(userCredentials);
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <div>
        <label>Username:</label>
        <input
          type="text"
          value={userName}
          onChange={(event) => setUserName(event.target.value)}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={passwd}
          onChange={(event) => setPasswd(event.target.value)}
        />
      </div>
      <button onClick={handleLogin} disabled={isLoading}>
        Login
      </button>
      {status === "error" && <div>Error: {error}</div>}
      <div>
        Don't have an account? <Link to="/register">Register</Link>
      </div>
    </div>
  );
};

export default LoginForm;
