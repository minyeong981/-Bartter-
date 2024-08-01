import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react';

import PostList from '@/components/Community/PostList';
import HeaderWithLabelAndBackButton from '@/components/Header/HeaderWithLabelAndBackButton'
import TwoButton from '@/components/TwoButton/TwoButton';
import useRootStore from '@/store';

export const Route = createFileRoute('/_layout/profile/writed/')({
  component: ProfileWrited
})

export default function ProfileWrited() {

  const posts = useRootStore((state) => state.posts)
  const [activeComponent, setActiveComponent] = useState<string>('물물교환');


  function renderComponent() {
    switch (activeComponent) {
      case '물물 교환':
        return <div>물물교환</div>;
      case '동네 모임':
        return <PostList posts={posts} />;
      default:
        return null;
    }
  };

  function handleButtonClick(button : string) {
    setActiveComponent(button)
  }

  return (
    <div>
      <HeaderWithLabelAndBackButton label='내가 쓴 글'/>
      <TwoButton 
      first='물물 교환'
      second='동네 모임'
      activeButton={activeComponent}
      onClick={handleButtonClick}/>
      <div>
        {renderComponent()}
      </div>
    </div>
  )
}