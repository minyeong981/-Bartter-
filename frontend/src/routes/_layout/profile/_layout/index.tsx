import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router'

import SettingButton from '@/components/Buttons/SettingButton';
import ProfileInfo from '@/components/User/ProfileInfo';
import barter from '@/services/barter';
import useRootStore from '@/store';
import querykeys from '@/util/querykeys';

export const Route = createFileRoute('/_layout/profile/_layout/')({
  component: MyProfile
})

export default function MyProfile() {

  const userId  = useRootStore((state) => state.userId)
  console.log(userId)

  const { isPending, data } = useQuery({
    queryKey: [querykeys.PROFILE, userId],
    queryFn: () => barter.getUserProfile(Number(userId))
  });

  if ( isPending ) {
    return <span>Loading...</span>
  }
  console.log(data?.data.data)

  if ( ! data?.data?.data) {
    return <div>사용자가 존재하지 않습니다.</div>
    } 

  return (
    <div>
    <ProfileInfo {...data.data.data} isMe={true}/>
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
    </div>
  )

}