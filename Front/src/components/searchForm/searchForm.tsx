import React, { useState } from 'react';
import { useUsers } from '../../hooks/use.user';
import styles from './searchForm.module.scss';

const SearchForm: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { searchUser, isLoading, error, user } = useUsers();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    searchUser(searchTerm);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Search person:</label>
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            className={styles.input}
          />
          <button type="submit" className={styles.button}>
            Search
          </button>
        </div>
        {isLoading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        {user && <p>{user.userName}</p>}
      </form>
    </>
  );
};

export default SearchForm;
