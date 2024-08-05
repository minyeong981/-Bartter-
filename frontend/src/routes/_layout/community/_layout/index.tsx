import {createFileRoute} from '@tanstack/react-router';
import {useState} from 'react';

import PostList from '@/components/Community/PostList';
import TwoButton from '@/components/TwoButton/TwoButton';
import useRootStore from '@/store';

import styles from './../community.module.scss'

export const Route = createFileRoute('/_layout/community/_layout/')({
  component: CommunityList,
});

export default function CommunityList() {
  const posts = useRootStore(state => state.posts);

  const [activeComponent, setActiveComponent] = useState<string>('전체글');

  const renderComponent = () => {
    switch (activeComponent) {
      case '전체글':
        return <PostList posts={posts} />;
      case '동네글':
        return <PostList posts={posts} />;
      default:
        return null;
    }
  };

  const handleButtonClick = (button: string) => {
    setActiveComponent(button);
  };

  return (
    <div>
      <div className={styles.twoButtonFixed}>
      <TwoButton
        first="전체글"
        second="동네글"
        activeButton={activeComponent}
        onClick={handleButtonClick}
      />
      </div>
      <div className={styles.postList} >{renderComponent()}</div>
    </div>
  );
}