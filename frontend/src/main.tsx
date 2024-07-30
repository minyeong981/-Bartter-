import './styles/index.scss';

import {createRouter, RouterProvider} from '@tanstack/react-router';
import {StrictMode} from 'react';
import ReactDOM from 'react-dom/client';

// Import the generated route tree
import {routeTree} from './routeTree.gen.ts';

// Create a new router instance
const router = createRouter({routeTree});

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

async function enableMocking() {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  const {worker} = await import('./mocks/browser');

  return worker.start();
}

// Render the app
const rootElement = document.getElementById('root')!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  enableMocking().then(() =>
    root.render(
      <StrictMode>
        <RouterProvider router={router} />
      </StrictMode>,
    ),
  );
}