import classnames from 'classnames/bind';

import styles from './cropImage.module.scss';

interface CropImageProps {
  imgSrc: string;
  label: string;
}

const cx = classnames.bind(styles);

export default function CropImage({imgSrc, label}: CropImageProps) {
  const id = `${label} image`;
  return (
    <div className={cx('cropImage')}>
      <img id={id} src={'http://' + imgSrc} alt={label}/>
      <label htmlFor={id}>{label}</label>
    </div>
  );
}