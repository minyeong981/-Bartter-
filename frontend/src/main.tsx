import './styles/index.scss';

import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {createRouter, RouterProvider} from '@tanstack/react-router';
import {StrictMode} from 'react';
import ReactDOM from 'react-dom/client';

import {
  handleIncomingMessages,
  requestPermission,
} from '@/config/firebaseConfig.ts';

import {routeTree} from './routeTree.gen.ts';

const queryClient = new QueryClient();

const router = createRouter({
  routeTree,
  context: {
    queryClient,
  },
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 0,
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

async function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register(
        '/firebase-messaging-sw.js',
        {scope: '/firebase-cloud-messaging-push-scope'},
      );

      console.log('Service Worker 등록', registration.scope);

      await requestPermission();

      handleIncomingMessages();
    } catch (error) {
      console.error('Service Worker 등록 실패 :', error);
    }
  } else {
    console.warn('Service Worker not supported in this browser');
  }
}

const rootElement = document.getElementById('root')!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  registerServiceWorker().then(_ =>
    root.render(
      <StrictMode>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </StrictMode>,
    ),
  );
}