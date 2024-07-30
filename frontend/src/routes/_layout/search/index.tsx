import { createFileRoute } from '@tanstack/react-router';
import {useEffect,useState } from 'react';

import RecentSearch from '@/components/Search/RecentSearch';
import SearchBar from '@/components/Search/SearchBar';
import SearchResult from '@/components/Search/SearchResult';
import SearchSuggestion from '@/components/Search/SearchSuggestions';

import styles from './search.module.scss';



export default function Search() {
  const [ query, setQuery] = useState<string>('');
  const [recentSearch, setRecentSearch] = useState<string[]>(['오이고추', '고구마', '무']);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [result, setResult] = useState<string>('');

  function handleSearch(searchTerm: string) {
      setQuery(searchTerm);
      
      // 최근 검색어 목록 업데이트
      setRecentSearch(prevSearches => {
        const updatedSearches = [searchTerm, ...prevSearches];
        return updatedSearches.slice(0, 10); // 최대 10개로 제한
      });

      // 검색 결과 가져오기 (예제 API 호출)
      fetch(`https://example.com/api/search?q=${searchTerm}`)
        .then(response => response.json())
        .then(data => {
          setResult(data.results);
        });
    }

    useEffect(() => {
      if (query.length > 0) {
        // 검색 제안 가져오기 (예제 API 호출)
        fetch(`https://example.com/api/suggestions?q=${query}`)
          .then(response => response.json())
          .then(data => {
            setSuggestions(data.suggestions);
          });
      } else {
        setSuggestions([]);
      }
    }, [query]);

    return (
    
    <div className={styles.header}>
      <div>
        <SearchBar query ={query} onSearch={handleSearch} />
       {query === '' && <RecentSearch searchs={recentSearch} onSearch={handleSearch}/> }
       {query !== '' && result.length === 0 && <SearchSuggestion query={query} suggestions={suggestions} onSearch={handleSearch} />}
       {result.length > 0 && <SearchResult result={result} />}
      </div>
    </div>

  );
}

export const Route = createFileRoute('/_layout/search/')({
  component: Search,
});
