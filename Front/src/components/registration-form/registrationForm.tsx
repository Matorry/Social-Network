import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUsers } from '../../hooks/use.user';
import { User, UserNoId } from '../../models/user';
import styles from './registrationForm.module.scss';

type Props = {
  mode: 'register' | 'update';
  currentUser?: User;
};

const RegistrationForm = ({ mode, currentUser }: Props) => {
  const { registerUser, updateUser, deleteUser, error } = useUsers();
  const navigate = useNavigate();

  useEffect(() => {
    if (mode === 'update' && currentUser) {
      setUserData(currentUser);
    }
  }, [mode, currentUser]);

  const [userData, setUserData] = useState<UserNoId>({
    userName: '',
    name: '',
    surname: '',
    isPublic: false,
    email: '',
    passwd: '',
    followers: [],
    followings: [],
    comments: [],
    likes: [],
    posts: [],
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    setUserData((prevUserData) => ({ ...prevUserData, [name]: value }));
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (mode === 'register') {
      try {
        await registerUser(userData);
        navigate('/login');
      } catch (error) {
        console.error('Error during registration:', error);
      }
      return;
    }
    try {
      await updateUser({ ...userData, id: currentUser!.id }, currentUser!.id);
      navigate('/login');
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteUser(currentUser!.id);
      navigate('/login');
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };

  return (
    <main>
      <form onSubmit={handleSubmit} className={styles.registrationForm}>
        <h2>{mode === 'register' ? 'Register' : 'Update Account'}</h2>
        <label>Username:</label>
        <input
          type="text"
          name="userName"
          value={userData.userName}
          onChange={handleInputChange}
          className={styles.input}
          required
        />

        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={userData.name}
          onChange={handleInputChange}
          className={styles.input}
          required
        />

        <label>Surname:</label>
        <input
          type="text"
          name="surname"
          value={userData.surname}
          onChange={handleInputChange}
          className={styles.input}
          required
        />

        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={userData.email}
          className={styles.input}
          onChange={handleInputChange}
          required
        />

        {mode === 'register' && (
          <>
            <label>Password:</label>
            <input
              type="password"
              name="passwd"
              value={userData.passwd}
              className={styles.input}
              onChange={handleInputChange}
              required
            />
          </>
        )}

        <div className={styles.checkboxContainer}>
          <label>Profile Privacy:</label>
          <input
            type="checkbox"
            name="isPublic"
            checked={userData.isPublic}
            onChange={handleInputChange}
          />
          <span>Public</span>
        </div>

        <button type="submit" className={styles.button}>
          {mode === 'register' ? 'Register' : 'Update'}
        </button>
        {mode === 'register' && (
          <span>
            Already have an account? <Link to="/login">Login</Link>
          </span>
        )}
        {error && <div style={{ color: 'red' }}>{error}</div>}
        {mode === 'update' && (
          <button
            type="button"
            onClick={handleDeleteAccount}
            className={styles.delete}
          >
            Delete Account
          </button>
        )}
      </form>
    </main>
  );
};

export default RegistrationForm;
