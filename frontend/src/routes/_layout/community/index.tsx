import {createFileRoute} from '@tanstack/react-router';
import {useState} from 'react';

import GeneralButton from '@/components/Buttons/LinkButton';
import PostList from '@/components/Community/PostList';
import HeaderWithLabelAndButtons from '@/components/Header/HeaderWithLabelAndButtons';
import TwoButton from '@/components/TwoButton/TwoButton';
import useRootStore from '@/store';

import styles from './index.module.scss';

export const Route = createFileRoute('/_layout/community/')({
  component: Community,
});

export default function Community() {
  const posts = useRootStore(state => state.posts);
  console.log(posts);

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
      <HeaderWithLabelAndButtons label="내위치" />
      <TwoButton
        first="전체글"
        second="동네글"
        activeButton={activeComponent}
        onClick={handleButtonClick}
      />
      <div>{renderComponent()}</div>
      <div className={styles.floatingButton}>
        <GeneralButton
          buttonStyle={{style: 'floating', size: 'small'}}
          to="/community/create"
        >
          + 글 작성하기
        </GeneralButton>
      </div>
    </div>
  );
}