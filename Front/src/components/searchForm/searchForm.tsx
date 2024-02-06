import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUsers } from '../../hooks/use.user';
import styles from './searchForm.module.scss';

const SearchForm: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { searchUserByName, isLoading, error, search, getUserById } =
    useUsers();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    searchUserByName(searchTerm);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div>
        <label>Search person:</label>
        <input type="text" value={searchTerm} onChange={handleInputChange} />
        <button type="submit">Search</button>
      </div>
      {isLoading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {search && (
        <span>
          User found:
          <Link
            onClick={() => getUserById(search?.id)}
            to={`/user/:${search?.id}`}
          >
            {search?.userName}
          </Link>
        </span>
      )}
    </form>
  );
};

export default SearchForm;
