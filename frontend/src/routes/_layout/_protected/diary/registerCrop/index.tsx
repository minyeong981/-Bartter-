import {createFileRoute, Navigate} from '@tanstack/react-router';

export const Route = createFileRoute('/_layout/_protected/diary/registerCrop/')({
  component: () => <Navigate to="/diary/registerCrop/1"/>,
});