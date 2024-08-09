import { useMutation,useQuery,useQueryClient, useSuspenseQuery} from '@tanstack/react-query';
import { createFileRoute} from '@tanstack/react-router';
import {useEffect, useState } from 'react';

import RecentSearch from '@/components/Search/RecentSearch';
import SearchBar from '@/components/Search/SearchBar';
import SearchResult from '@/components/Search/SearchResult';
import SearchSuggestion from '@/components/Search/SearchSuggestion';
import Spinner from '@/components/Spinner';
import barter from '@/services/barter';
import useRootStore from '@/store';
import querykeys from '@/util/querykeys';

// import styles from './search.module.scss';

export default function Search() {

  const userId = useRootStore((state) => state.userId)
  const [ query, setQuery ] = useState<string>('');
  const [ isSearch, setIsSearch ] = useState<boolean>(false);
  const queryClient = useQueryClient();

  // 3. 검색어 제안리스트 현재 검색중인 query를 이용해 api로 요청하여 검색어 제안 보여줌 이것도 10개만 표시하기
  const [ suggestions, setSuggestions ] = useState<string[]>(['감자', '고구마', '오이', '당근', '수박', '가지', '배', '감', '바나나', '사과', '옥수수']);
 
  const initialSearchResult: SimpleKeywordList = {
    userProfileList: [],
    communityPostList: [],
    tradePostList: []
  }
  const [ results, setResults ] = useState<SimpleKeywordList>(initialSearchResult);

  const {data : Location} = useSuspenseQuery({
    queryKey: [querykeys.LOCATION, userId],
    queryFn: () => barter.getUserLocation(userId)
  })

  // 최근 검색어 가져오기
  const { isPending, data:recent } = useQuery({
    queryKey: [querykeys.SEARCH],
    queryFn: barter.getRecentSearchKeywordList
  })

  // 최근 검색어 삭제
  const deleteMutation = useMutation({
      mutationFn: barter.deleteRecentSearchKeyword,
      onError: () => {
      console.log('검색어 삭제 실패')
      },
      onSuccess: () => {
      queryClient.invalidateQueries({queryKey:[querykeys.SEARCH]});
    },
    })

  // 검색 결과
  const mutation = useMutation({
    mutationFn:barter.searchByKeyword,
    onError: () => {
    console.log('검색 실패')
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({queryKey:[querykeys.SEARCH]});
      setResults(data.data.data)
    },
  })

  // 검색어 제안
  // const mutation = useMutation({
  //   mutationFn: barter.
  // })

  if (isPending ) {
    return <Spinner />
  }

  // handleSearch 함수! enter를 치면 감지!
  async function handleSearch(searchTerm : string, isEnter: boolean) {
    const trimmedSearchTerm = searchTerm.trim();
    setQuery(trimmedSearchTerm)

    if (trimmedSearchTerm === '') {
      setIsSearch(false)
      setResults(initialSearchResult)
    }

    // 검색 결과 컴포넌트 띄우기
    if (isEnter && trimmedSearchTerm !== '') {
      setIsSearch(isEnter)
      mutation.mutate(trimmedSearchTerm)
    }
  }
    
  function handleInputChange(input: string) {
    setQuery(input)
  }

  function handleDeleteSearch(searchTerm : string) {
    deleteMutation.mutate(searchTerm);
  }
  
  const recentData = recent?.data.data || []
  const location = Location.data.data.name.split(' ').slice(2,3);

  // // 검색어 제안은 query가 변할때마다 감지하여 검색어제안을 보여주어야함.
  // useEffect(() => {
  //   if (query.length > 0) {
  //     // 검색어 제안 가져오기 api로
  //     fetch(`https://example.com/api/suggestion?=${query}`)
  //       .then(response => response.json())
  //       .then((data) => {
  //         setSuggestions(data.suggestions);
  //       });
  //   setSuggestions(['사', '사과', '사과나무', '사용법'].slice(0,10))
  //   } else {
  //     setSuggestions([]);
  //   }
  // }, [query])

return (
  <div>
      <SearchBar query={query} onSearch={handleSearch} onInputChange={handleInputChange} />
      { query === '' && recentData && 
      <RecentSearch 
        searches={recentData} 
        onSearch={handleSearch} 
        onDeleteSearch={handleDeleteSearch}
        /> }
      { query !== '' && !isSearch && <SearchSuggestion query={query} suggestions={suggestions} onSearch={handleSearch}/> }
      { query !== '' && isSearch && <SearchResult results={results} search={query} location={location} /> }
  </div>
);
}

export const Route = createFileRoute('/_layout/_protected/search/')({
  component: Search,
});