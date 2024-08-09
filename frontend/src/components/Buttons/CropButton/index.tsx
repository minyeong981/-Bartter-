import classnames from 'classnames/bind';

import styles from './cropButton.module.scss';

interface CropButtonProps<T> {
  onClick: (value: T) => void;
  value: T;
  name: string;
  imgUrl: string;
  selected?: boolean;
}

const cx = classnames.bind(styles);

export default function CropButton<T>({
  value,
  imgUrl,
  selected,
  name,
  onClick,
}: CropButtonProps<T>) {
  function handleClick() {
    onClick(value);
  }

  return (
    <div className={cx('cropButton', {selected})}>
      <button id={String(value)} onClick={handleClick}>
        <img src={imgUrl} alt={name} />
      </button>
      <label htmlFor={name}>{name}</label>
    </div>
  );
}