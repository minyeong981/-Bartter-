import type { ReactNode} from 'react';
import React, { createContext, useContext, useMemo,useState } from 'react';

// Context 생성
const SearchContext = createContext<SearchContextType | undefined>(undefined);

// 커스텀 훅 정의
export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch는 searchProvieder안에서 사용되어야함.');
  }
  return context;
};

// Provider 컴포넌트 정의
export const SearchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [query, setQuery] = useState<string>('');
  const [keyword, setKeyword ] = useState<string>('');
  const [ isSearch, setIsSearch ] = useState<boolean>(false);
  const [ isSearchBarShow, setIsSearchBarShow ] = useState<boolean>(true);


  // useMemo를 사용하여 context value를 메모이제이션
  const value = useMemo(() => ({
    query,
    setQuery,
    keyword,
    setKeyword,
    isSearch,
    setIsSearch,
    isSearchBarShow,
    setIsSearchBarShow
  }), [query, keyword, isSearch, isSearchBarShow]);

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
};
