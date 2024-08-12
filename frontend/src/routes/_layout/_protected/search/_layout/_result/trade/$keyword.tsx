import {useSuspenseInfiniteQuery} from "@tanstack/react-query";
import {createFileRoute} from '@tanstack/react-router'
import classnames from "classnames/bind";

import EmptyPost from "@/components/Empty/EmptyPost.tsx";
import HeaderWithLabelAndBackButton from "@/components/Header/HeaderWithLabelAndBackButton.tsx";
import Threshold from "@/components/Threshold";
import TradeCard from "@/components/TradeCard";
import useInfiniteScroll from "@/hooks/useInfiniteScroll.tsx";
import barter from "@/services/barter.ts";
import querykeys from "@/util/querykeys.ts";

import styles from './trade.module.scss'


const cx = classnames.bind(styles)

const PAGE_LIMIT = 5;

export const Route = createFileRoute('/_layout/_protected/search/_layout/_result/trade/$keyword')({
  component: TradeResultPage
})

function TradeResultPage() {
  const {keyword} = Route.useParams()
  const {data, fetchNextPage} = useSuspenseInfiniteQuery({
    queryKey: [querykeys.TRADE_LIST, keyword, PAGE_LIMIT],
    queryFn: ({pageParam}) => barter.getTradePostListByKeyword(keyword, pageParam, PAGE_LIMIT),
    initialPageParam: 0,
    getNextPageParam: (prevPage, _, lastPageParam) => {
      if (prevPage.data.data.length && prevPage.data.data.length % PAGE_LIMIT === 0)
        return lastPageParam + 1;
    }
  })
  const {rootElementRef, lastElementRef} = useInfiniteScroll(fetchNextPage)

  const searchResultData = data.pages.map(page => page.data.data).flat()

  return (<>
    <HeaderWithLabelAndBackButton label="물물 교환" style={{position: "static"}}/>
    <div className={cx('result-box')}>
      <span className={cx('result-text')}>{keyword}</span>
      검색 결과
    </div>
    <div className={cx('resultList')} ref={rootElementRef}>
      {searchResultData.length ? searchResultData.map((trade => <TradeCard {...trade} />)) :
        <EmptyPost text={keyword + "로 검색한 결과가 없습니다."}/>}
      <Threshold ref={lastElementRef}/>
    </div>
  </>)
}