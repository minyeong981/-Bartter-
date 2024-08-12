import {createFileRoute, Navigate, Outlet} from '@tanstack/react-router';
import {useEffect, useRef} from 'react';

import barter from '@/services/barter.ts';
import useRootStore from '@/store';

export const Route = createFileRoute('/_layout/_protected')({
  component: Protected,
});

function Protected() {
  const {isLogin} = useRootStore(state => state);
  const isFirstRendered = useRef<boolean>(true);

  useEffect(() => {
    if (!isFirstRendered.current || !isLogin) return;
    const fcmToken = sessionStorage.getItem('fcmToken');
    if (!fcmToken) return;
    (async () => await barter.postFcmToken(fcmToken))();
    isFirstRendered.current = false;
  }, [isLogin]);

  if (!isLogin) return <Navigate to="/login/entrance" replace={true} />;

  return <Outlet />;
}