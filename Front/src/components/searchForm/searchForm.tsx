import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUsers } from '../../hooks/use.user';
import styles from './searchForm.module.scss';

const SearchForm: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { searchUser, isLoading, error, search } = useUsers();

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
        {search && (
          <span>
            User found:
            <Link to={`/user/${search?.id}`}>{search?.userName}</Link>
          </span>
        )}
      </form>
    </>
  );
};

export default SearchForm;
