import classnames from 'classnames/bind';

import titleCommunity from '@/assets/lottie/titleCommunity.json'
import titleNeighbor from '@/assets/lottie/titleNeighbor.json'
import titleTrade from '@/assets/lottie/titleTrade.json'
import PostList from '@/components/Community/PostList';

import EmptyPost from '../Empty/EmptyPost';
import Location from '../Header/Location';
import NeighborCarousel from '../Neighbor/NeighborCarousel';
import Title from '../Title';
import TradeCard from '../TradeCard';
import styles from './SearchResult.module.scss';

const cx = classnames.bind(styles);

interface SearchResultProps {
  results: SimpleKeywordList;
  search: string;
  location: string;
  onFollowClick: (userId: UserId, isFollow: IsFollowed) => void;
}

export default function SearchResult({
  search,
  results,
  location,
  onFollowClick,
}: SearchResultProps) {
  if (
    results.tradePostList.length === 0 &&
    results.communityPostList.length === 0 &&
    results.userProfileList.length === 0
  ) {
    return (
      <div>
        <EmptyPost text="검색어와 관련된 내용을" text2="찾을수 없습니다." />
      </div>
    );
  }

  return (
    <div className={cx('container')}>
      <div className={cx('location')}>
        <Location location={location} />
      </div>
      {results.tradePostList.length === 0 ? (
        <div>관련된 물물교환 게시글이 없습니다.</div>
      ) : (
        <div className={cx('barter')}>
            <Title title='물물교환' to={`/search/trade/${search.toString()}`} lottie={titleTrade}/>
            <div className={cx('trade')}>
              {results.tradePostList.map((trade, tradeIndex) => (
                <TradeCard key={tradeIndex} {...trade} />
              ))}
            </div>
          </div>
      )}

      {results.communityPostList.length === 0 ? (
        <div>관련된 동네모임 게시글이 없습니다.</div>
      ) : (
        <div className={cx('community')}>
            <Title title='동네 모임' to={`/search/community/${search.toString()}`} lottie={titleCommunity}/>
            <PostList posts={results.communityPostList} />
          </div>
      )}

      {results.userProfileList.length === 0 ? (
        <div>관련된 이웃이 없습니다.</div>
      ) : (
        <div className={cx('following')}>
          <Title title='이웃' to={`/search/neighbor/${search.toString()}`} lottie={titleNeighbor} />
          <NeighborCarousel
            followings={results.userProfileList}
            onClick={onFollowClick}
          />
        </div>
      )}
    </div>
  );
}