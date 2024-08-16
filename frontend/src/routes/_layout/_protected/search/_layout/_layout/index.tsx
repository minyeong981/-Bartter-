import { useMutation,useQuery, useQueryClient,  useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

import RecentSearch from '@/components/Search/RecentSearch'
import SearchResult from '@/components/Search/SearchResult'
import SearchSuggestion from '@/components/Search/SearchSuggestion'
import Spinner from '@/components/Spinner'
import { useSearch } from '@/context/SearchContext'
import barter from '@/services/barter'
import useRootStore from '@/store';
import querykeys from '@/util/querykeys'

export const Route = createFileRoute('/_layout/_protected/search/_layout/_layout/')({
  component: Search
})

export default function Search() {

  const { query, setQuery, keyword, setKeyword, isSearch, setIsSearch} = useSearch()
  const myId = useRootStore((state) => state.userId)
  const queryClient = useQueryClient();


  // 유저의 위치 가져오기
  const {data : Location} = useSuspenseQuery({
    queryKey: [querykeys.LOCATION, myId],
    queryFn: () => barter.getUserLocation(myId)
  })

  // 최근 검색어 가져오기
  const { isPending, data:recent } = useQuery({
    queryKey: [querykeys.SEARCH_RECENT],
    queryFn: barter.getRecentSearchKeywordList
  })

  // 검색어 제안 
  const { data:suggestion } = useQuery({
    queryKey: [querykeys.SEARCH_SUGGESTION, query],
    queryFn: () => barter.getAutoCompletedKeywordListByKeyword(query),
    enabled: query.trim().length > 0,
  })

  // 최근 검색어 삭제
  const deleteMutation = useMutation({
      mutationFn: barter.deleteRecentSearchKeyword,
      onError: () => {
      console.error('검색어 삭제 실패')
      },
      onSuccess: () => {
      queryClient.invalidateQueries({queryKey:[querykeys.SEARCH_RECENT]});
    },
    })

  // 검색 결과 => invalidateQueries 이용 최근 검색어 저장
  const searchMutation = useMutation({
    mutationFn: (keyword: string) => barter.searchByKeyword(keyword),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [querykeys.SEARCH_RECENT] }),
    });

  // 검색 결과
  const { data:Result } = useQuery({
    queryKey: [querykeys.SEARCH, keyword],
    queryFn: () => barter.searchByKeyword(keyword),
    enabled: keyword.length > 0,
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

    // 최근 검색어 클릭으로 검색하기
    function handleSearch(searchTerm : string, isEnter:boolean) {
      const trimmedSearchTerm = searchTerm.trim();

      if (isEnter && trimmedSearchTerm ) {
        setQuery(trimmedSearchTerm)
        setIsSearch(true)
        setKeyword(trimmedSearchTerm)
        searchMutation.mutate(trimmedSearchTerm) // 최근검색어에 바로 저장하기위해
      }
    }

    // 검색어 삭제
    function handleDeleteSearch(searchTerm : string) {
      deleteMutation.mutate(searchTerm);
    }

    function handleFollowClick(userId: UserId, isFollow: IsFollowed) {
      followMutation.mutate({userId, isFollow})
    }

    const recentData = recent?.data.data || [];
    const autoKeywordList = suggestion?.data.data || [];
    const location = Location.data.data.name.split(' ').slice(2,3).toString();

  return (
    <div>
      { query === '' && recentData && !isSearch &&
      <RecentSearch 
        searches={recentData} 
        onSearch={handleSearch} 
        onDeleteSearch={handleDeleteSearch}
        /> }
        { query !== '' && !isSearch &&
      <SearchSuggestion 
        suggestions={autoKeywordList} 
        onSearch={handleSearch}
        />}
        { keyword && isSearch && Result?.data.data && 
      <SearchResult 
        results={Result.data.data} 
        search={keyword} 
        location={location} 
        onFollowClick={handleFollowClick} 
        /> }
    </div>
  )
}