import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUsers } from '../../hooks/use.user';
import { UserNoId } from '../../models/user';
import styles from './registrationForm.module.scss';

type Props = {
  mode: 'register' | 'update';
  currentUser?: UserNoId;
};

const RegistrationForm = ({ mode, currentUser }: Props) => {
  const { registerUser, updateUser, deleteUser, error, user } = useUsers();
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
    followingRelations: { followers: [], followings: [] },
    isPublic: true,
    email: '',
    passwd: '',
    comments: [],
    likes: [],
    posts: [],
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData((prevUserData) => ({ ...prevUserData, [name]: value }));
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
      await updateUser({ ...userData, id: user.id });
      navigate('/login');
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteUser(user.id);
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
