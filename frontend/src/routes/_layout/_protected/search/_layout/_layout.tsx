import { useMutation,useQueryClient } from '@tanstack/react-query'
import { createFileRoute,Outlet, useLocation } from '@tanstack/react-router'
import classnames from 'classnames/bind'
import { useEffect } from 'react'

import SearchBar from '@/components/Search/SearchBar'
import { useSearch  } from '@/context/SearchContext'
import barter from '@/services/barter'
import querykeys from '@/util/querykeys'

import styles from './../search.module.scss'

export const Route = createFileRoute('/_layout/_protected/search/_layout/_layout')({
  component: SearchLayout
})
const cx = classnames.bind(styles)

export default function SearchLayout() {

    const { query, setQuery, setIsSearch, keyword, setKeyword, isShow, setIsShow } = useSearch();
    const queryClient = useQueryClient();

    const location = useLocation();

    // 검색 결과 => invalidateQueries 이용 최근 검색어 저장
    const searchMutation = useMutation({
    mutationFn: (keyword: string) => barter.searchByKeyword(keyword),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [querykeys.SEARCH_RECENT] }),
    });

    function handleInputChange(input : string) {
        setQuery(input)
        setIsSearch(false) // 검색중이니까
    }

    // onChange로 입력마다 query에 받아오기
    function handleSearch(searchTerm : string, isEnter:boolean) {
        const trimmedSearchTerm = searchTerm.trim();
        setQuery(trimmedSearchTerm)

        // 엔터를 눌러 검색하기
        if ( isEnter && trimmedSearchTerm !== '') {
            setIsSearch(true) // 검색할거임
            searchMutation.mutate(trimmedSearchTerm)
            setKeyword(trimmedSearchTerm) // keyword입력
        }
    }

    // searchBar의 X클릭 => 최근검색 컴포넌트 렌더링
    function handleClear() {
        setIsSearch(false)
        setQuery('')
        setKeyword('')
    }

    useEffect(() => {
        const decodedPathname = decodeURIComponent(location.pathname);

        const searchKeywordPath = `search/${keyword}`; // 한글을 인식못해서 디코딩해줌.
    
        // console.log(99999);
        // console.log(decodedPathname);
        // console.log(keyword);
    
        if (decodedPathname.includes(searchKeywordPath)) {
        //   console.log('@@@@@@');
          setIsShow(false);
        } else {
          setIsShow(true);
        }
      }, [location.pathname, keyword, setIsShow, query]);
    
    return (
        <div className={cx('search-layout')}>
    { isShow &&           
        <SearchBar 
            query={query} 
            onSearch={handleSearch} 
            onInputChange={handleInputChange} 
            onClear={handleClear} 
            /> 
            }
            <Outlet />
        </div>
    )
}