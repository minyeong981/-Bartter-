// import { createFileRoute } from '@tanstack/react-router'

// import GeneralButton from '../../../components/Buttons/GeneralButton'

// export const Route = createFileRoute('/_layout/diary/myCrops')({
//   component: () => 
//     <div>
//       <p>아직 등록된 농작물이 없습니다.</p>
//       <GeneralButton buttonStyle={{style:'primary', size:'small'}}>+ 등록하기</GeneralButton>

//     </div>
// })



import { createFileRoute } from '@tanstack/react-router';
import React from 'react';

const MyCrops: React.FC = () => {
  return (
    <div>
      <h1>My Crops</h1>
      {/* 여기에 내 작물 관련 내용을 추가하세요 */}
    </div>
  );
};

export const Route = createFileRoute('/_layout/diary/myCrops')({
  component: MyCrops
});

export default MyCrops;
