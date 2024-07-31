
import type { ChangeEvent, KeyboardEvent} from 'react';

import searchIcon from '@/assets/image/searchIcon.png';
import xIcon from '@/assets/image/xIcon.png';
import HeaderWithSearchAndBackButton from '@/components/Header/HeaderWithSearchandBackButton';
import stylesInput from '@/components/Search/Search.module.scss';

import styles from './SearchBar.module.scss';

interface SearchBarProps {
  query: string;
  onSearch: (searchTerm: string) => void;
  onInputChange: (input: string) => void;
}


export default function SearchBar({ query, onSearch, onInputChange} : SearchBarProps) {


  function handleClear() {
    onSearch('');
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      if (query.trim() !== '') {
        onSearch(query);
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
                value={query}
                onChange={(event) => onInputChange(event.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button className={stylesInput.clearButton} onClick={handleClear}>
                <img src={query ? xIcon : searchIcon} alt="Clear/Search" />
              </button>
            </div>
          </div>
        }
      />

    </div>


  );
}

