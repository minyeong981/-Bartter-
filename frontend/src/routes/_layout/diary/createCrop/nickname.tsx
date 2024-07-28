import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';

function CreateCropNickname() {
  const [nickname, setNickname] = useState('');

  return (
    <div>
      <div>
        <p>내 작물의</p>
        <p>별명을 지어주세요.</p>
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="별명을 입력하세요"
        />
      </div>
    </div>
  );
}

export const Route = createFileRoute('/_layout/diary/createCrop/nickname')({
  component: CreateCropNickname
});
