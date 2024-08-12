import classnames from 'classnames/bind';

import PostList from "@/components/Community/PostList"

import LinkButton from '../Buttons/LinkButton';
import EmptyPost from '../Empty/EmptyPost';
import Location from '../Header/Location';
import NeighborCarousel from '../Neighbor/NeighborCarousel';
import TradeCard from './../TradeCard';
import styles from './SearchResult.module.scss'

const cx = classnames.bind(styles);

interface SearchResultProps {
  results: SimpleKeywordList;
  search: string;
  location: string;
  onFollowClick: (userId : UserId, isFollow:IsFollowed) => void;
}

export default function SearchResult({
  search, 
  results, 
  location,
  onFollowClick
} : SearchResultProps) {

    if ( results.tradePostList.length===0 && results.communityPostList.length===0 && results.userProfileList.length===0) {
      return ( <div><EmptyPost text='검색어와 관련된 내용을 찾을수 없습니다.' /></div> )
    }
    // console.log(results.userProfileList)

    return (
        <div className={cx('container')}>
            <div className={cx('title')}>
            <Location location={location} />
            </div>
          { results.tradePostList.length===0 ? (
            <div>관련된 물물교환 게시글이 없습니다.</div>
          ) : (     
          <> 
          <div className={cx('barter')}>
            <div className={cx('title')}>
            <div>물물 교환</div>
             </div>
             <div className={cx('trade')}>
            {results.tradePostList.map((trade, tradeIndex) => 
            <TradeCard key={tradeIndex} {...trade}/> )}
             </div>
        </div>
      <div className={cx('link-button-container')}>
        <LinkButton 
        buttonStyle={{style: 'primary', size: 'medium'}}
        search={{sortBy :'물물 교환'}} 
        to='/search/$keyword' 
        params={{keyword: `${search}`}}
        >
          물물 교환 더보기
        </LinkButton>
      </div>
        </>
        )
        }

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
          to='/search/$keyword' 
          params={{keyword: `${search}`}}
        >
          동네 모임 더보기
        </LinkButton>
      </div>
      </>
      )
      }

      { results.userProfileList.length===0 ? (
        <div>관련된 이웃이 없습니다.</div>
      ): (
        <div className={cx('following')}>
        <div className={cx('title')}>
          <div className={cx('following-text')}>이웃 </div>
        </div>
        <NeighborCarousel followings={results.userProfileList} onClick={onFollowClick}/>
        <div className={cx('link-button-container')}>
        <LinkButton
          buttonStyle={{style: 'primary', size: 'medium'}}
          search={{sortBy:'이웃'}} 
          to='/search/$keyword' 
          params={{keyword: `${search}`}}
        >
          이웃 더보기
        </LinkButton>
      </div>
      </div>
      )
      }
    </div>
    )
}