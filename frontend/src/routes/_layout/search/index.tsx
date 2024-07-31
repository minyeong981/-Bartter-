import { createFileRoute } from '@tanstack/react-router';
import {useEffect,useState } from 'react';

import RecentSearch from '@/components/Search/RecentSearch';
import SearchBar from '@/components/Search/SearchBar';
import SearchResult from '@/components/Search/SearchResult';
import SearchSuggestion from '@/components/Search/SearchSuggestion';

import styles from './search.module.scss';



export default function Search() {

  // 1. input에 입력하는 검색어 onChange로 계속 업데이트
  const [ query, setQuery ] = useState<string>('');
  // 2. 최근 검색어 리스트 엔터를 쳐서 검색할때마다 최근 검색어 생성. 최근검색어 10개만 화면에 표시
  const [ recentSearch, setRecentSearch ] = useState<string[]>(['사과', '당근', '옥수수'])
  // 3. 검색어 제안리스트 현재 검색중인 query를 이용해 api로 요청하여 검색어 제안 보여줌 이것도 10개만 표시하기
  const [ suggestions, setSuggestions ] = useState<string[]>([]);
  // 4. 검색어를 엔터를 쳐서 입력. 결과 단어를 이용해 결과 컴포넌트에서 검색 결과 화면 보여줌.
  const [ result, setResult ] = useState<string>('');

  // handleSearch 함수! enter를 치면 감지!
  function handleSearch(searchTerm : string) {

    const trimmedSearchTerm = searchTerm.trim();
    setQuery(trimmedSearchTerm)

    // 최근검색어 추가
    setRecentSearch(prevSearches => {
      const updatedSearches = [trimmedSearchTerm, ...prevSearches.filter((term) => term !== trimmedSearchTerm)];
      return updatedSearches.slice(0, 10); // 10개 까지만 보여주기
    })

    // 검색 결과
    setResult(result)

  }
    

  // 검색어 input onChange로 입력감지
  function handleInputChange(input: string) {
    setQuery(input)
  }

  // 검색어 제안은 query가 변할때마다 감지하여 검색어제안을 보여주어야함.
  useEffect(() => {
    if (query.length > 0) {
    //   // 검색어 제안 가져오기 api로
    //   fetch(`https://example.com/api/suggestion?=${query}`)
    //     .then(response => response.json())
    //     .then((data) => {
    //       setSuggestions(data.suggestions);
    //     });
    setSuggestions(['사', '사과', '사과나무', '사용법'].slice(0,10))
    } else {
      setSuggestions([]);
    }
  }, [query])


  // SearchBar인 inputHeader은 계속 보여야함.
  // 검색어 없을 때 최근 검색어 보여주어야함 => RecentSearch 컴포넌트 이용해 최근검색어 렌더링
  // 검색어 입력중일때 query가 빈값이 아닐때 => SearchSuggestion 보여주기 검색어 제안 리스트
  // 검색어 엔터로 입력되었을 대 결과 컴포넌트 보여주어야함 => ResultSearch 
return (
  <div>
    <div>
      <SearchBar query={query} onSearch={handleSearch} onInputChange={handleInputChange} />
      { query === '' && <RecentSearch searches={recentSearch} onSearch={handleSearch}/> }
      { query !== '' && result.length===0 && <SearchSuggestion query={query} suggestions={suggestions} onSearch={handleSearch} /> }
      { result.length > 0  && <SearchResult result={result} /> }
    </div>
  </div>
);
}

export const Route = createFileRoute('/_layout/search/')({
  component: Search,
});
