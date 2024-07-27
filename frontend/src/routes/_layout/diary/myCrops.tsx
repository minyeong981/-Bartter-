import { createFileRoute } from '@tanstack/react-router';


export default function MyCrops() {
  return (
    <div>
      <h1>아직 등록된 농작물이 없습니다.</h1>
    </div>
  );
};

export const Route = createFileRoute('/_layout/diary/myCrops')({
  component: MyCrops
});
