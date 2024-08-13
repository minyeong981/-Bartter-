import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import {createFileRoute } from '@tanstack/react-router';
import classnames from 'classnames/bind';
import { useEffect, useState } from 'react';

import LinkButton from '@/components/Buttons/LinkButton';
import SettingLinkButton from '@/components/Buttons/SettingLinkButton.tsx';
import ProfileInfo from '@/components/User/ProfileInfo';
import barter from '@/services/barter';
import useRootStore from '@/store';
import querykeys from '@/util/querykeys';

import styles from './../../profile.module.scss';

const cx = classnames.bind(styles);

export const Route = createFileRoute('/_layout/_protected/profile/$userId/_layout/')({
  component: Profile,
});

function Profile() {
  const myId = useRootStore(state => state.userId);
  const queryClient = useQueryClient();

  const { userId }: { userId: string } = Route.useParams();

  const { data: profileData } = useSuspenseQuery({
    queryKey: [querykeys.PROFILE, userId],
    queryFn: () => barter.getUserProfile(Number(userId)),
  });

  const { data: cropData } = useSuspenseQuery({
    queryKey: [querykeys.CROP_PROFILE, userId],
    queryFn: () => barter.getCropListTradedByUser(Number(userId)),
  });

  const [isFollowed, setIsFollowed] = useState<boolean>(false);

  const userData = profileData?.data?.data;
  const cropCount: number = cropData?.data?.data?.receive?.length ?? 0;

  useEffect(() => {
    if (userData?.isFollowed !== undefined) {
      setIsFollowed(userData.isFollowed);
    }
  }, [userData]);

  const onFollow = useMutation({
    mutationFn: (userId: number) => {
      return barter.follow(userId);
    },
    onError: () => {
      window.alert('팔로우 실패');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [querykeys.PROFILE] });
      setIsFollowed(true);
    },
  });

  const unFollow = useMutation({
    mutationFn: (userId: UserId) => {
      return barter.unfollow(userId);
    },
    onError: () => {
      window.alert('언팔로우 실패');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [querykeys.PROFILE] });
      setIsFollowed(false);
    },
  });

  function handleFollow() {
    if (isFollowed !== undefined) {
      if (isFollowed) {
        unFollow.mutate(Number(userId));
      } else {
        onFollow.mutate(Number(userId));
      }
    }
  }

  const renderProfileActions = (isMe: boolean) => (
    <>
      <ProfileInfo {...userData} isMe={isMe} onClick={handleFollow} />
      <div className={cx('crops-count')}>받은 농작물 {cropCount} 개</div>
      <SettingLinkButton       
      to="/profile/$userId/cropStorage"
      params={{userId: userId.toString()}}
        text='농작물 창고'
      />
      <SettingLinkButton       
      to="/profile/$userId/diary"
      params={{userId: userId.toString()}}
        text='농사 일지'
      />
      {isMe && <SettingLinkButton to="/profile/writed" text='내가 쓴 글'/>}
      {isMe && <SettingLinkButton to="/profile/picked" text='찜 목록'/>}
      {isMe && <SettingLinkButton to="/profile/chat" text='채팅 목록'/>}
      {isMe && <SettingLinkButton to="/profile/changelocation" text='위치 수정'/>}
      {isMe &&     
      <div className={cx('logoutButton')}>
        <LinkButton buttonStyle={ { style: 'floating', size:'medium'}} >로그아웃</LinkButton>
    </div>}
    </>
  );

  return (
    <div>
      {Number(myId) === Number(userId)
        ? renderProfileActions(true)
        : renderProfileActions(false)}
    </div>
  );
}
