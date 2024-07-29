import {createFileRoute} from '@tanstack/react-router';

import CommentList from '@/components/Community/CommentLIst';
import PostDetail from '@/components/Community/PostDetail';

export const Route = createFileRoute('/_layout/community/detail')({
  component: () => (
    <div>
      <PostDetail />
      <CommentList />
    </div>
  ),
});