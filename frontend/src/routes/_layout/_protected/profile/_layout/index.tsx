import {useQuery} from '@tanstack/react-query';
import {createFileRoute} from '@tanstack/react-router';

import SettingButton from '@/components/Buttons/SettingButton';
import SettingLinkButton from '@/components/Buttons/SettingLinkButton.tsx';
import ProfileInfo from '@/components/User/ProfileInfo';
import barter from '@/services/barter';
import useRootStore from '@/store';
import querykeys from '@/util/querykeys';

export const Route = createFileRoute('/_layout/_protected/profile/_layout/')({
  component: MyProfile,
});

export default function MyProfile() {
  const userId = useRootStore(state => state.userId);
  const logout = useRootStore(state => state.logout);
  const navigate = Route.useNavigate();
  console.log(userId);

  const {isPending, data} = useQuery({
    queryKey: [querykeys.PROFILE, userId],
    queryFn: () => barter.getUserProfile(Number(userId)),
  });

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (!data?.data?.data) {
    return <div>사용자가 존재하지 않습니다.</div>;
  }

  async function handleLogout() {
    try {
      await barter.logout();
      await barter.deleteFcmToken();
    } finally {
      logout();
      sessionStorage.clear();
      await navigate({to: '/login/entrance'});
    }
  }

  return (
    <div>
      <ProfileInfo {...data.data.data} isMe={true} />
      <SettingLinkButton to="/profile/aireport">
        AI 요약보고서
      </SettingLinkButton>
      <SettingLinkButton
        to="/profile/$userId/cropStorage"
        params={{userId: userId.toString()}}
      >
        농작물 창고
      </SettingLinkButton>
      <SettingLinkButton
        to="/profile/$userId/diary"
        params={{userId: userId.toString()}}
      >
        농사 일지
      </SettingLinkButton>
      <SettingLinkButton to="/profile/writed">내가 쓴 글</SettingLinkButton>
      <SettingLinkButton to="/profile/picked">찜 목록</SettingLinkButton>
      <SettingLinkButton to="/profile/chat">채팅 목록</SettingLinkButton>
      <SettingLinkButton to="/profile/changelocation">
        위치 수정
      </SettingLinkButton>
      <SettingButton onClick={handleLogout}>로그아웃</SettingButton>
    </div>
  );
}