import {createFileRoute, Outlet, useNavigate} from '@tanstack/react-router';
import {useEffect, useRef} from 'react';

import barter from '@/services/barter.ts';
import useRootStore from '@/store';
import parser from '@/util/parser.ts';

export const Route = createFileRoute('/_layout/_protected')({
  component: Protected,
});

function Protected() {
  const {isLogin, login} = useRootStore(state => state);
  const navigate = useNavigate();
  const isFirstRendered = useRef<boolean>(false);

  useEffect(() => {
    if (isLogin) return;

    barter
      .reIssue()
      .then(res => {
        const token = parser.getAccessToken(res);
        login(token);
      })
      .catch(e => {
        console.error(e.message);
        navigate({to: '/login/entrance'});
      });
  }, [isLogin, login, navigate]);

  useEffect(() => {
    if (!isFirstRendered.current || !isLogin) return;
    const fcmToken = sessionStorage.getItem('fcmToken');
    if (!fcmToken) return;
    (async () => await barter.postFcmToken(fcmToken))();
    isFirstRendered.current = false;
  }, []);

  if (!isLogin) return;

  return <Outlet />;
}