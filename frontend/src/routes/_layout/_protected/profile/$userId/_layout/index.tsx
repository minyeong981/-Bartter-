import { useMutation, useQuery , useQueryClient} from '@tanstack/react-query';
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

  const { isPending, data:profileData } = useQuery({
    queryKey: [querykeys.PROFILE, userId],
    queryFn: () => barter.getUserProfile(Number(userId))
  });

  const { data:cropData } = useQuery({
    queryKey: [querykeys.CROP_PROFILE, userId],
    queryFn: () => barter.getCropListTradedByUser(Number(userId))
  });

  const [ isFollowed, setIsFollowed ] = useState<boolean>(false);

  useEffect(() => {
    if (profileData?.data.data.isFollowed !== undefined) {
      setIsFollowed(profileData.data.data.isFollowed);
    }
  }, [profileData]);

  const onFollow = useMutation({
    mutationFn: (userId : UserId) => {
      return barter.follow(userId)
    },
    onError: ()=> {
      window.alert('팔로우 실패')
      }, 
      onSuccess: () => {
        queryClient.invalidateQueries([querykeys.PROFILE])
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
        queryClient.invalidateQueries([querykeys.PROFILE])
        setIsFollowed(false)
      }
  })

  if ( isPending ) {
    return <span>Loading...</span>
  }

  if ( ! profileData?.data?.data) {
    return <div>사용자가 존재하지 않습니다.</div>
    } 
  
  if ( ! cropData?.data?.data) {
    return <div>받은 농작물이 존재하지 않습니다.</div>
    } 

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
    <div>{ myId === userId ? (

      <>
      <ProfileInfo {...profileData.data.data} isMe={true}/>
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
          <ProfileInfo {...profileData.data.data} isMe={false} onClick={handleFollow} />
          <div className={styles.cropsCount}>받은 농작물 {cropData.data.data.receive.length} 개</div>
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