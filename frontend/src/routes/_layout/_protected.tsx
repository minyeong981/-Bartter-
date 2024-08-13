import {createFileRoute, Navigate, Outlet} from '@tanstack/react-router';
import {useEffect, useRef} from 'react';

import barter from '@/services/barter.ts';
import useRootStore from '@/store';

export const Route = createFileRoute('/_layout/_protected')({
  component: Protected,
});

function Protected() {
  const {isLogin, userId} = useRootStore(state => state);
  const prevUserId = useRef<UserId>(0);

  useEffect(() => {
    if (!isLogin || prevUserId.current === userId) return;
    const fcmToken = sessionStorage.getItem('fcmToken');
    if (!fcmToken) return;
    (async () => await barter.postFcmToken(fcmToken))();
    prevUserId.current = userId;
  }, [isLogin, userId]);

  if (!isLogin) return <Navigate to="/login/entrance" replace={true} />;

  return <Outlet />;
}