import { useState } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';  // react-icons import 추가

import styles from './Search.module.scss';

interface SearchProps {
  onSearch: (term: string) => void;
}

export default function Search({ onSearch }: SearchProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <div className={styles.searchBar}>
      <input
        type="text"
        placeholder="작물 검색하기"
        value={searchTerm}
        onChange={handleChange}
      />
      <button className={styles.clearButton} onClick={handleClear}>
        {searchTerm ? <FaTimes /> : <FaSearch />}
      </button>
    </div>
  );
}
