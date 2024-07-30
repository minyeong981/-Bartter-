import classnames from 'classnames/bind';
import type { ChangeEvent } from 'react';
import { useRef,useState } from 'react';
import { FaCamera } from 'react-icons/fa';

import styles from './input.module.scss';

const cx = classnames.bind(styles);

function ImageInput() {
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    if (files) {
      const newImagePreviews = Array.from(files).map(file => {
        const reader = new FileReader();
        return new Promise<string>((resolve) => {
          reader.onloadend = () => {
            resolve(reader.result as string);
          };
          reader.readAsDataURL(file);
        });
      });

      Promise.all(newImagePreviews).then(previews => {
        setImagePreviews([...imagePreviews, ...previews]);
      });
    }
  }

  function handleIconClick() {
    fileInputRef.current?.click();
  }

  return (
    <div className={cx('imageInputContainer')}>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageChange}
        className={cx('imageInput')}
        ref={fileInputRef} // 파일 입력 참조 설정
      />
      <div className={cx('cameraIconContainer')} onClick={handleIconClick}>
        <FaCamera className={cx('cameraIcon')} />
      </div>
      <div className={cx('imagePreviewContainer')}>
        {imagePreviews.map((preview, index) => (
          <img key={index} src={preview} alt={`이미지 미리보기 ${index + 1}`} className={cx('imagePreview')} />
        ))}
      </div>
    </div>
  );
}

export default ImageInput;
