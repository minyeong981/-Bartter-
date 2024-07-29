import { createFileRoute } from '@tanstack/react-router'

import HeaderWithLabelAndBackButton from '@/components/Header/HeaderWithLabelAndBackButton';

export default function PostCreate() {


  return (
    <div>
      <HeaderWithLabelAndBackButton label='글 작성하기' />
hello
    </div>
  );
}

export const Route = createFileRoute('/_layout/community/create')({
  component: PostCreate
});
