import {FaSearch} from 'react-icons/fa';

import styles from './SearchSuggestion.module.scss';

interface SearchSuggestionsProps {
  query: string;
  suggestions: string[];
  onSearch: (searchTerm: string) => void;
}

export default function SearchSuggestion({
  query,
  suggestions,
  onSearch,
}: SearchSuggestionsProps) {

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
        onClick={() => onSearch(suggestion)}
      >
        <FaSearch className={styles.icon} />
        {getHighlightedText(suggestion, query)}
      </div>
    ))}
  </div>
  );
}