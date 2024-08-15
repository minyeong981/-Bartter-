import classnames from 'classnames/bind';
import type {ChangeEvent} from 'react';
import {useRef, useState} from 'react';
import {FaCamera, FaTimes} from 'react-icons/fa';
import heic2any from 'heic2any';
import Lottie from 'react-lottie-player';
import styles from './input.module.scss';
import loading from '@/assets/lottie/loading2.json';

const cx = classnames.bind(styles);

export interface ImageInputProps {
  onImageChange: (images: File[]) => void;
  maxImages: number;
}

function ImageInput({onImageChange, maxImages}: ImageInputProps) {
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false); // 로딩 상태 추가
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'heic'];

  async function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    if (files) {
      setIsLoading(true); // 업로드 시작 시 로딩 상태를 true로 설정
      const newImageFiles = Array.from(files);

      let possibleImages: File[] = [];
      let errorMessages: string[] = [];

      for (let image of newImageFiles) {
        const extension = image.name.split('.').pop()?.toLowerCase();
        console.log('확장자 -', extension);
        if (extension && !allowedExtensions.includes(extension)) {
          errorMessages.push(
            `지원하지 않는 파일 확장자입니다. (${image.name})`,
          );
          continue;
        }

        if (extension === 'heic') {
          console.log('heic - 변경 하기 ');
          try {
            const convertedBlob = await heic2any({
              blob: image,
              toType: 'image/jpeg',
            });
            const convertedFile = new File(
              [convertedBlob as BlobPart],
              image.name.replace(/\.heic$/i, '.jpg'),
              {
                type: 'image/jpeg',
              },
            );
            possibleImages.push(convertedFile);
          } catch (error) {
            errorMessages.push(
              `파일 '${image.name}'을(를) 변환하는 중 오류가 발생했습니다.`,
            );
            continue;
          }
        } else {
          possibleImages.push(image); // 조건에 맞는 이미지만 추가
        }
      }

      if (errorMessages.length > 0) {
        setErrorMessage(errorMessages.join(' '));
      } else {
        setErrorMessage(''); // 에러 메시지 초기화
      }

      if (possibleImages.length > 0) {
        const newImagePreviews = possibleImages.map(file => {
          const reader = new FileReader();
          return new Promise<string>(resolve => {
            reader.onloadend = () => {
              resolve(reader.result as string);
            };
            reader.readAsDataURL(file);
          });
        });

        Promise.all(newImagePreviews).then(previews => {
          let updatedFiles = [...imageFiles, ...possibleImages];
          let updatedPreviews = [...imagePreviews, ...previews];

          if (updatedFiles.length > maxImages) {
            updatedFiles = updatedFiles.slice(-maxImages);
            updatedPreviews = updatedPreviews.slice(-maxImages);
          }

          setImageFiles(updatedFiles);
          setImagePreviews(updatedPreviews);
          onImageChange(updatedFiles);
          setIsLoading(false); // 업로드 완료 시 로딩 상태를 false로 설정
        });
      } else {
        setIsLoading(false); // 에러가 발생해도 로딩 상태를 false로 설정
      }
    }
  }

  function handleIconClick() {
    fileInputRef.current?.click();
  }

  function handleRemoveImage(index: number) {
    setErrorMessage('');
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
        accept={allowedExtensions.map(ext => `image/${ext}`).join(',')}
        multiple
        onChange={handleImageChange}
        className={cx('imageInput')}
        ref={fileInputRef}
      />
      <div className={cx('cameraIconContainer')} onClick={handleIconClick}>
        <FaCamera className={cx('cameraIcon')} />
      </div>
      {isLoading && (
        <div className={cx('loadingMessage')}>
          <Lottie loop animationData={loading} play />
        </div>
      )}
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
      {errorMessage && (
        <div className={cx('error-message')}>{errorMessage}</div>
      )}
    </div>
  );
}

export default ImageInput;
