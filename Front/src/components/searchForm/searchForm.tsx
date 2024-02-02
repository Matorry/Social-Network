import React, { useState } from 'react';
import styles from './searchForm.module.scss';

const SearchForm: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Logica de busqueda
    console.log('Realizar búsqueda con el término:', searchTerm);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Search person:
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          className={styles.input}
        />
      </label>
      <button type="submit" className={styles.button}>
        Search
      </button>
    </form>
  );
};

export default SearchForm;
