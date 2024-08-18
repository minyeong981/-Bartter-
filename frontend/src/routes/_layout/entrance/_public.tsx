import {createFileRoute, Navigate, Outlet} from '@tanstack/react-router';

import useRootStore from '@/store';

export const Route = createFileRoute('/_layout/entrance/_public')({
  component: Public,
});

function Public() {
  const isLogin = useRootStore(state => state.isLogin);

  if (isLogin) return <Navigate to="/" />;

  return <Outlet />;
}