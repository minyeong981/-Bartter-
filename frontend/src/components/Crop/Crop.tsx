import './Crop.scss';

interface CropProps {
  cropImageSrc: string;
  cropNameSrc: string;
  isSelected: boolean;
}

export default function Crop({ cropImageSrc, cropNameSrc, isSelected }: CropProps) {
  return (
    <div className={`crop-card ${isSelected ? 'selected' : ''}`}>
      <div className="crop-image-container">
        <img src={cropImageSrc} alt={cropNameSrc} className="crop-image" />
      </div>
      <div className="crop-name">{cropNameSrc}</div>
    </div>
  );
}
