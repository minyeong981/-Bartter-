import {createFileRoute, Outlet, useNavigate} from '@tanstack/react-router';
import {useEffect} from 'react';

import barter from '@/services/barter.ts';
import useRootStore from '@/store';
import parser from '@/util/parser.ts';

export const Route = createFileRoute('/_layout/_protected')({
  component: Protected,
});

function Protected() {
  const {isLogin, login} = useRootStore(state => state);
  const navigate = useNavigate();

  console.log('in');

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

  if (!isLogin) return;

  return <Outlet />;
}