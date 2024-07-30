// import './MyCrops.scss';

interface Crop {
  id: number;
  name: string;
  image?: string;
}

interface MyCropsProps {
  crops: Crop[];
}

export default function MyCrops({ crops }: MyCropsProps) {
  return (
    <div className="my-crops">
      <h2>전체 개수: {crops.length}</h2>
      {crops.length > 0 ? (
        crops.map((crop) => (
          <div key={crop.id} className="crop-card">
            {crop.image && <img src={crop.image} alt={crop.name} />}
            <div>{crop.name}</div>
          </div>
        ))
      ) : (
        <p>등록된 농작물이 없습니다.</p>
      )}
    </div>
  );
}
