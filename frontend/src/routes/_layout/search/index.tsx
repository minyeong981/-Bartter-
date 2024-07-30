import { createFileRoute } from '@tanstack/react-router';
import type { ChangeEvent, KeyboardEvent} from 'react';
import {useState } from 'react';
import { FaSearch } from 'react-icons/fa';

import searchIcon from '@/assets/image/searchIcon.png';
import xIcon from '@/assets/image/xIcon.png';
import HeaderWithSearchAndBackButton from '@/components/Header/HeaderWithSearchandBackButton';
import stylesInput from '@/components/Search/Search.module.scss';

import styles from './search.module.scss';

interface SearchProps {
  searchHistory: string[];
}

const initialSearchData: SearchProps = {
  searchHistory: ['오이', '당근', '호박']
};

export default function Search() {
  const [searchInput, setSearchInput] = useState<string>('');
  const [searchList, setSearchList] = useState<string[]>(initialSearchData.searchHistory);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setSearchInput(event.target.value);
  }

  function handleClear() {
    setSearchInput('');
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      if (searchInput.trim() !== '') {
        setSearchList([...searchList, searchInput]);
        setSearchInput('');
      }
    }
  }

  return (
    <div className={styles.header}>
      <HeaderWithSearchAndBackButton
        label={
          <div className={styles.inputContainer}>
            <div className={stylesInput.searchBar}>
              <input
                type="text"
                placeholder="밭터 통합검색"
                value={searchInput}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
              />
              <button className={stylesInput.clearButton} onClick={handleClear}>
                <img src={searchInput ? xIcon : searchIcon} alt="Clear/Search" />
              </button>
            </div>
          </div>
        }
      />

      <div className={styles.searchList}>
        {searchList.map((search, searchIndex) => (
          <div key={searchIndex} className={styles.searchBox}>
            <FaSearch className={styles.searchIcon} /> {search}
          </div>
        ))}
      </div>
    </div>
  );
}

export const Route = createFileRoute('/_layout/search/')({
  component: Search,
});
