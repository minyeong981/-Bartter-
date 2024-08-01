import {createFileRoute, useSearch} from '@tanstack/react-router'
import { FaMapMarkerAlt } from 'react-icons/fa';

import PostList from '@/components/Community/PostList';
import HeaderWithLabelAndButtons from '@/components/Header/HeaderWithLabelAndButtons';
import useRootStore from '@/store';

import styles from './index.module.scss';

export const Route = createFileRoute('/_layout/search/$result/_layout/')({
  component: SearchResult
}) 

// useParams로 받아와야함 검색결과 인풋 => ex) 상추  

export default function SearchResult() {
  
  const { result } = Route.useParams()
  const { sortBy } : { sortBy : string} = Route.useSearch()

  const posts = useRootStore((state) => state.posts)
  return (
    <div >
      <HeaderWithLabelAndButtons label={<FaMapMarkerAlt />} />
      <div className={styles.resultBox}><div className={styles.resultText}>{result}</div> 검색 결과</div>

      { sortBy === '물물 교환' && '물물교환' }
      { sortBy === '동네 모임' && <PostList posts={posts} />}
    </div>
  )
}