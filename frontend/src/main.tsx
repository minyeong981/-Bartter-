import './styles/index.scss';

import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {createRouter, RouterProvider} from '@tanstack/react-router';
import ReactDOM from 'react-dom/client';

import {handleForegroundMessages} from '@/config/firebaseConfig.ts';

import NotFound from './components/NotFound/index.tsx';
import {routeTree} from './routeTree.gen.ts';

const queryClient = new QueryClient();

export const router = createRouter({
  routeTree,
  context: {
    queryClient,
  },
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 0,
  defaultErrorComponent: () => (
    <NotFound
      errorMessage="서버 오류가 발생했어요!"
      description=" 잠시 후 다시 시도해 주세요."
    />
  ),
  defaultNotFoundComponent: () => (
    <NotFound
      errorMessage="에러가 발생했어요!"
      description="요청하신 페이지를 찾을 수 없습니다."
    />
  ),
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById('root')!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>,
  );

  handleForegroundMessages();
}