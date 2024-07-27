import './Crop.scss';

interface CropProps {
  cropImageSrc: string;
  cropNameSrc: string;
}

export default function Crop({ cropImageSrc, cropNameSrc }: CropProps) {
  return (
    <div className="crop-card">
      <div className="crop-image-container">
        <img src={cropImageSrc} alt={cropNameSrc} className="crop-image" />
      </div>
      <div className="crop-name">{cropNameSrc}</div>
    </div>
  );
}
