import { useMutation,useQuery,useQueryClient, useSuspenseQuery} from '@tanstack/react-query';
import { createFileRoute} from '@tanstack/react-router';
import { useState } from 'react';

import RecentSearch from '@/components/Search/RecentSearch';
import SearchBar from '@/components/Search/SearchBar';
import SearchResult from '@/components/Search/SearchResult';
import Spinner from '@/components/Spinner';
import barter from '@/services/barter';
import useRootStore from '@/store';
import querykeys from '@/util/querykeys';

// import styles from './search.module.scss';

export default function Search() {

  const myId = useRootStore((state) => state.userId)
  const [ query, setQuery ] = useState<string>('');
  const queryClient = useQueryClient();

  // 3. 검색어 제안리스트 현재 검색중인 query를 이용해 api로 요청하여 검색어 제안 보여줌 이것도 10개만 표시하기
  // const [ suggestions, setSuggestions ] = useState<string[]>(['감자', '고구마', '오이', '당근', '수박', '가지', '배', '감', '바나나', '사과', '옥수수']);
 
  const {data : Location} = useSuspenseQuery({
    queryKey: [querykeys.LOCATION, myId],
    queryFn: () => barter.getUserLocation(myId)
  })

  // 최근 검색어 가져오기
  const { isPending, data:recent } = useQuery({
    queryKey: [querykeys.SEARCH_RECENT],
    queryFn: barter.getRecentSearchKeywordList
  })

  // 최근 검색어 삭제
  const deleteMutation = useMutation({
      mutationFn: barter.deleteRecentSearchKeyword,
      onError: () => {
      console.log('검색어 삭제 실패')
      },
      onSuccess: () => {
      queryClient.invalidateQueries({queryKey:[querykeys.SEARCH_RECENT]});
    },
    })

  // 검색 결과
  const { data:Result } = useQuery({
    queryKey: [querykeys.SEARCH, query],
    queryFn: () => barter.searchByKeyword(query)
  })

  // 팔로우 하기, 취소
  const followMutation = useMutation({
    mutationFn: (data :{ userId : UserId, isFollow: IsFollowed}) => {
      if (data.isFollow) {
        return barter.unfollow(data.userId)
      } else {
        return barter.follow(data.userId)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey : [querykeys.SEARCH]});
    
    }
  })

  if (isPending ) {
    return <Spinner />
  }

  async function handleSearch(searchTerm : string) {
    const trimmedSearchTerm = searchTerm.trim();
    setQuery(trimmedSearchTerm)

  }
    
  function handleInputChange(input: string) {
    setQuery(input)
  }

  function handleDeleteSearch(searchTerm : string) {
    deleteMutation.mutate(searchTerm);
  }

  function handleFollowClick(userId: UserId, isFollow: IsFollowed) {
    followMutation.mutate({userId, isFollow})
  }
  
  const recentData = recent?.data.data || []
  const location = Location.data.data.name.split(' ').slice(2,3).toString();


return (
  <div>
      <SearchBar query={query} onSearch={handleSearch} onInputChange={handleInputChange} />
      { query === '' && recentData && 
      <RecentSearch 
        searches={recentData} 
        onSearch={handleSearch} 
        onDeleteSearch={handleDeleteSearch}
        /> }
      { query !== '' && Result?.data.data && <SearchResult results={Result.data.data} search={query} location={location} onFollowClick={handleFollowClick} /> }
  </div>
);
}

export const Route = createFileRoute('/_layout/_protected/search/')({
  component: Search,
});