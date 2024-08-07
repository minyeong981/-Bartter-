import classnames from 'classnames/bind';
import type { ChangeEvent } from 'react';
import { useRef, useState } from 'react';
import { FaCamera, FaTimes } from 'react-icons/fa';

import styles from './input.module.scss';

const cx = classnames.bind(styles);

export interface ImageInputProps {
  onImageChange: (images: File[]) => void;
  maxImages: number;
}

function ImageInput({ onImageChange, maxImages }: ImageInputProps) {
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    if (files) {
      const newImageFiles = Array.from(files);
      const newImagePreviews = newImageFiles.map(file => {
        const reader = new FileReader();
        return new Promise<string>(resolve => {
          reader.onloadend = () => {
            resolve(reader.result as string);
          };
          reader.readAsDataURL(file);
        });
      });

      Promise.all(newImagePreviews).then(previews => {
        let updatedFiles = [...imageFiles, ...newImageFiles];
        let updatedPreviews = [...imagePreviews, ...previews];

        if (updatedFiles.length > maxImages) {
          updatedFiles = updatedFiles.slice(-maxImages);
          updatedPreviews = updatedPreviews.slice(-maxImages);
        }

        setImageFiles(updatedFiles);
        setImagePreviews(updatedPreviews);
        onImageChange(updatedFiles);
      });
    }
  }

  function handleIconClick() {
    fileInputRef.current?.click();
  }

  function handleRemoveImage(index: number) {
    const updatedFiles = imageFiles.filter((_, i) => i !== index);
    const updatedPreviews = imagePreviews.filter((_, i) => i !== index);

    setImageFiles(updatedFiles);
    setImagePreviews(updatedPreviews);
    onImageChange(updatedFiles);
  }

  return (
    <div className={cx('imageInputContainer')}>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageChange}
        className={cx('imageInput')}
        ref={fileInputRef}
      />
      <div className={cx('cameraIconContainer')} onClick={handleIconClick}>
        <FaCamera className={cx('cameraIcon')} />
      </div>
      <div className={cx('imagePreviewContainer')}>
        {imagePreviews.map((preview, index) => (
          <div key={index} className={cx('imageWrapper')}>
            <img
              src={preview}
              alt={`이미지 미리보기 ${index + 1}`}
              className={cx('imagePreview')}
            />
            <FaTimes
              className={cx('removeIcon')}
              onClick={() => handleRemoveImage(index)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImageInput;