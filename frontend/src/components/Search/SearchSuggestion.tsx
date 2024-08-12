import {FaSearch} from 'react-icons/fa';

import { useSearch } from '@/context/SearchContext';

import styles from './SearchSuggestion.module.scss';

interface SearchSuggestionsProps {
  suggestions: AutoCompletedKeyWord[];
  onSearch: (searchTerm: string, isEnter: boolean) => void;
}

export default function SearchSuggestion({
  suggestions,
  onSearch,
}: SearchSuggestionsProps) {

  const { query } = useSearch();
  
  // query와 일치하는 단어만 뽑아서
  // text.split(new RegExp(`(${highlight})`, 'gi'))
  // text가 "사과나무"이고 highlight가 "사과"인 경우, 결과는 ["", "사과", "나무"]
  function getHighlightedText(text : string, highlight: string) {
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));

    return (
      <>
      {parts.map((part, index) => 
      part.toLocaleLowerCase() === highlight.toLocaleLowerCase() ? 
    (<span key={index} className={styles.highlighted}>
      {part}
    </span>) : 
    (part)
    )}
      </>
    )
  }

  return (
    <div className={styles.suggestionsContainer}>
    {suggestions.map((suggestion, index) => (
      <div
        key={index}
        className={styles.suggestionItem}
        onClick={() => onSearch(suggestion, true)}
      >
        <FaSearch className={styles.icon} />
        {getHighlightedText(suggestion, query)}
      </div>
    ))}
  </div>
  );
}