import { useState } from 'react';

import searchIcon from '@/assets/image/searchIcon.png'
import xIcon from '@/assets/image/xIcon.png'

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
      <img src={searchTerm ? xIcon : searchIcon} alt="Clear/Search" />
      </button>
    </div>
  );
}
