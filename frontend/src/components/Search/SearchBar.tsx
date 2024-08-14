import type { KeyboardEvent} from 'react';
import { FaX } from 'react-icons/fa6';

import {IconSearch} from '@/assets/svg';
import HeaderWithSearchAndBackButton from '@/components/Header/HeaderWithSearchandBackButton';
import stylesInput from '@/components/Search/Search.module.scss';

import styles from './SearchBar.module.scss';

interface SearchBarProps {
  query: string;
  onSearch: (searchTerm: string, isEnter:boolean) => void;
  onInputChange: (input: string) => void;
  onClear: () => void;
}


export default function SearchBar({ query, onSearch, onInputChange, onClear} : SearchBarProps) {

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      if (query.trim() !== '') {
        onSearch(query, true);
      }
    }
  }


  return (
  
    <div className={styles.searchBarContainer}>
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
              <button className={styles.clearButton} >
                { query ? 
                <FaX onClick={onClear} style={{ fontSize: '20px'}} /> 
                : <IconSearch className={styles.icon} />
                }
              </button>
            </div>
          </div>
        }
      />

    </div>


  );
}