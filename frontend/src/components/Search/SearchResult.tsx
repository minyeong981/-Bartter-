import classnames from 'classnames/bind';

import PostList from "@/components/Community/PostList"

import LinkButton from '../Buttons/LinkButton';
import Location from '../Header/Location';
import NeighborCarousel from '../Neighbor/NeighborCarousel';
import TradeCard from './../TradeCard';
import styles from './SearchResult.module.scss'

const cx = classnames.bind(styles);

export default function SearchResult({search, results} :{ search : string, results : SearchResult }) {
    // const location  = '장덕동'

    return (
        <div className={cx('container')}>
            <div className={cx('title')}>
            <Location location="위치 불러와야함" />
            </div>
        <div className={cx('barter')}>
            <div className={cx('title')}>
            <div>물물 교환</div>
             </div>
            <div>{results.tradePostList.map((trade, tradeIndex) => 
            <TradeCard key={tradeIndex} {...trade} imageURL=''/> )}</div>
        </div>
      <div className={cx('link-button-container')}>
        <LinkButton 
        buttonStyle={{style: 'primary', size: 'medium'}}
        search={{sortBy:'물물 교환'}} 
        to='/search/$result' 
        params={{result: `${search}`}}
        >
          물물 교환 더보기
        </LinkButton>
      </div>

      { results.communityPostList.length===0 ?  (
        <div>관련된 동네모임 게시글이 없습니다.</div>
        )
        : ( 
        <>
        <div className={cx('community')}>
        <div className={cx('title')}>
          <div>동네 모임</div>
        </div>
        <PostList posts={results.communityPostList} />
      </div>

      <div className={cx('link-button-container')}>
        <LinkButton
          buttonStyle={{style: 'primary', size: 'medium'}}
          search={{sortBy:'동네 모임'}} 
          to='/search/$result' 
          params={{result: `${search}`}}
        >
          동네 모임 더보기
        </LinkButton>
      </div>
      </>
      )
      }

      <div className={cx('following')}>
        <div className={cx('title')}>
          <div className={cx('followingText')}><div className={cx('resultText')}> {search}</div>이웃 </div>
        </div>
        <NeighborCarousel followings={results.userProfileList}/>

      </div>
    </div>
    )
}