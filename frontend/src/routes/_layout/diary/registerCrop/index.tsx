import {createFileRoute, Navigate} from '@tanstack/react-router';

export const Route = createFileRoute('/_layout/diary/registerCrop/')({
  component: () => <Navigate to="/diary/registerCrop/1" />,
});