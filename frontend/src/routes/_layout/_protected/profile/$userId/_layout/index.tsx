import { useMutation, useQueryClient,useSuspenseQuery } from '@tanstack/react-query';
import {createFileRoute} from '@tanstack/react-router';
import { useEffect,useState } from 'react';

import SettingButton from '@/components/Buttons/SettingButton';
import ProfileInfo from '@/components/User/ProfileInfo';
import barter from '@/services/barter';
import useRootStore from '@/store';
import querykeys from '@/util/querykeys';

import styles from './../../profile.module.scss';

export const Route = createFileRoute('/_layout/_protected/profile/$userId/_layout/')({
  component: Profile,
});

function Profile() {
  const myId = useRootStore((state) => state.userId)
  const queryClient = useQueryClient();

  const { userId } : {userId : UserId } = Route.useParams();

  const { data:profileData } = useSuspenseQuery({
    queryKey: [querykeys.PROFILE, userId],
    queryFn: () => barter.getUserProfile(Number(userId))
  });

  const { data:cropData } = useSuspenseQuery({
    queryKey: [querykeys.CROP_PROFILE, userId],
    queryFn: () => barter.getCropListTradedByUser(Number(userId))
  });

  const [ isFollowed, setIsFollowed ] = useState<boolean>(false);

  const userData = profileData.data.data;
  const cropCount : number = cropData?.data?.data?.receive?.length ?? 0;

  useEffect(() => {
    if (userData.isFollowed !== undefined) {
      setIsFollowed(userData.isFollowed);
    }
  }, [userData]);

  const onFollow = useMutation({
    mutationFn: (userId : UserId) => {
      return barter.follow(userId)
    },
    onError: ()=> {
      window.alert('팔로우 실패')
      }, 
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey : [querykeys.PROFILE]});
        setIsFollowed(true)
      }
  })

  const unFollow = useMutation({
    mutationFn: (userId : UserId) => {
      return barter.unfollow(userId)
    },
    onError: ()=> {
      window.alert('언팔로우 실패')
      }, 
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey : [querykeys.PROFILE]});
      }
  })

  function handleFollow() {
    if (isFollowed !== undefined) {
      if (isFollowed) {
        unFollow.mutate(userId);
      } else {
        onFollow.mutate(userId);
      }
    }
  }

  return (
    <div>{ Number(myId) === Number(userId) ? (

      <>
      <ProfileInfo {...userData} isMe={true}/>
    <SettingButton to="/profile/aireport">AI 요약보고서</SettingButton>
    <SettingButton
      to="/profile/$userId/cropStorage"
      params={{userId: userId.toString()}}
    >
      농작물 창고
    </SettingButton>
    <SettingButton
      to="/profile/$userId/diary"
      params={{userId: userId.toString()}}
    >
      농사 일지
    </SettingButton>
    <SettingButton to="/profile/writed">내가 쓴 글</SettingButton>
    <SettingButton to="/profile/picked">찜 목록</SettingButton>
    <SettingButton to="/profile/chat">채팅 목록</SettingButton>
    <SettingButton to="/profile/changelocation">위치 수정</SettingButton>
    <SettingButton to="/community">로그아웃</SettingButton>
      </>
          )
          : ( 
          <>
          <ProfileInfo {...userData} isMe={false} onClick={handleFollow} />
          <div className={styles.cropsCount}>받은 농작물 {cropCount} 개</div>
          <SettingButton
            to="/profile/$userId/cropStorage"
            params={{userId: userId.toString() }}
          >
            농작물 창고
          </SettingButton>
          <SettingButton
            to="/profile/$userId/diary"
            params={{userId: userId.toString() }}
          >
            농사 일지
          </SettingButton>
          </>
          )
          }
    </div>
  );
}