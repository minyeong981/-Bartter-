import classnames from 'classnames/bind';

import useCommunityStore from '@/store';

import LinkButton from '../Buttons/LinkButton';
import PostList from "../Community/PostList"
import Location from '../Header/Location';
import NeighborCarousel from '../Neighbor/NeighborCarousel';
import styles from './SearchResult.module.scss'

const cx = classnames.bind(styles);

export default function SearchResult({ result } : {result : string }) {
    const posts = useCommunityStore(state => state.posts);
    const location  = '장덕동'

    return (

        <div className={cx('container')}>
            <div className={cx('title')}>
            <Location location={location} />
            </div>
        <div className={cx('barter')}>
            <div className={cx('title')}>
            <div>물물 교환</div>
             </div>
            <div>물물교환 리스트</div>
        </div>

      <div className={cx('link-button-container')}>
        <LinkButton 
        buttonStyle={{style: 'primary', size: 'medium'}}
        search={{sortBy:'물물 교환'}} 
        to='/search/$result' 
        params={{result: `${result}`}}
        >
          물물 교환 더보기
        </LinkButton>
      </div>

      <div className={cx('community')}>
        <div className={cx('title')}>
          <div>동네 모임</div>
        </div>
        <PostList posts={posts} />
      </div>
      <div className={cx('link-button-container')}>
        <LinkButton
          buttonStyle={{style: 'primary', size: 'medium'}}
          search={{sortBy:'동네 모임'}} 
          to='/search/$result' 
          params={{result: `${result}`}}
        >
          동네 모임 더보기
        </LinkButton>
      </div>

      
      <div className={cx('following')}>
        <div className={cx('title')}>
          <div className={cx('followingText')}><div className={cx('resultText')}> {result}</div>를 키우는 이웃 </div>
        </div>
        <NeighborCarousel />

      </div>
      <div className={cx('link-button-container')}>
        <LinkButton
          buttonStyle={{style: 'primary', size: 'medium'}}
          search={{sortBy:'내 이웃'}} 
          to='/search/$result' 
          params={{result: `${result}`}} 
        >
          이웃 더보기
        </LinkButton>
      </div>

        </div>
    )
}