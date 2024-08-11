import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router'

import SettingButton from '@/components/Buttons/SettingButton';
import ProfileInfo from '@/components/User/ProfileInfo';
import barter from '@/services/barter';
import useRootStore from '@/store';
import querykeys from '@/util/querykeys';

export const Route = createFileRoute('/_layout/_protected/profile/_layout/')({
  component: MyProfile
})

export default function MyProfile() {

  const userId  = useRootStore((state) => state.userId)

  const { data } = useSuspenseQuery({
    queryKey: [querykeys.PROFILE, userId],
    queryFn: () => barter.getUserProfile(Number(userId)),
  });

  if ( !userId ) {
    return <div>유정 정보가 없습니다. 다시 로그인 해주세요.</div>
  }

  const userData = data?.data?.data || [];

  return (
    <div>
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
    </div>
  )

}