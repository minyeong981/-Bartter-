import {createFileRoute} from '@tanstack/react-router';
import {useEffect} from 'react';

import barter from '@/services/barter.ts';
import useRootStore from '@/store';
import parser from '@/util/parser.ts';

export const Route = createFileRoute('/_layout/entrance/_public/Oauth')({
  component: OAuth,
});

function OAuth() {
  const navigate = Route.useNavigate();
  const {login} = useRootStore(state => state);

  useEffect(() => {
    barter
      .reIssue()
      .then(res => {
        const token = parser.getAccessToken(res);
        login(token);
        navigate({to: '/', replace: true});
      })
      .catch(e => {
        console.error(e.message);
        navigate({to: '/entrance', replace: true});
      });
  }, [login, navigate]);
}