import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUsers } from '../../hooks/use.user';
import { LoginData } from '../../models/user';
import styles from './loginForm.module.scss';

const LoginForm = () => {
  const { loginUser, status, error, isLoading } = useUsers();
  const [userName, setUserName] = useState('');
  const [passwd, setPasswd] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (status === 'logged') {
      navigate('/home');
    }
  });

  const handleLogin = async () => {
    const userCredentials: LoginData = { userName, passwd };
    try {
      await loginUser(userCredentials);
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <main>
      <form className={styles.loginContainer}>
        <h2>Login</h2>
        <label>Username:</label>
        <input
          className={styles.input}
          type="text"
          value={userName}
          onChange={(event) => setUserName(event.target.value)}
        />
        <label>Password:</label>
        <input
          className={styles.input}
          type="password"
          value={passwd}
          onChange={(event) => setPasswd(event.target.value)}
        />
        <button
          onClick={handleLogin}
          disabled={isLoading}
          className={styles.button}
        >
          Login
        </button>
        {status === 'error' && <div>Error: {error}</div>}
        <div>
          Don't have an account?{' '}
          <Link to="/register" className="register">
            Register
          </Link>
        </div>
      </form>
    </main>
  );
};

export default LoginForm;
