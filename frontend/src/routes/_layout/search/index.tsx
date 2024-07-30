import { createFileRoute } from '@tanstack/react-router';
import type { ChangeEvent, KeyboardEvent} from 'react';
import {useState } from 'react';

import RecentSearch from '@/components/Search/RecentSearch';
import SearchBar from '@/components/Search/SearchBar';
import SearchResult from '@/components/Search/SearchResult';
import SearchSuggestion from '@/components/Search/SearchSuggestions';

import styles from './search.module.scss';



export default function Search() {
  const [ query, setQuery] = useState<string>('');
  // const [recentSearch, setRecentSearch] = useState<string[]>(['오이고추', '고구마', '무']);
  // const [suggestions, setSuggestions] = useState<string[]>([]);
  // const [results, setResults] = useState<Result[]>([]);


  function handleSearch(searchTerm : string) {
    setQuery(searchTerm)
  }

  return (
  
    <div className={styles.header}>


      <div>
        <SearchBar query ={query} onSearch={handleSearch} />
       {/* {query === '' && <RecentSearch search={recentSearch} onSearch={handleSearch}/> }
       {query !== '' && results.length === 0 && <SearchSuggestion query={query} suggestions={suggestions} onSearch={handleSearch} />}
       {results.length > 0 && <SearchResult results={results} />} */}
      </div>


    </div>


  );
}

export const Route = createFileRoute('/_layout/search/')({
  component: Search,
});
