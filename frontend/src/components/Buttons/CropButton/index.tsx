import classnames from 'classnames/bind';

import styles from './cropButton.module.scss';

interface CropButtonProps {
  onClick: (value: string) => void;
  value: string;
  imgUrl: string;
  selected?: boolean;
}

const cx = classnames.bind(styles);

export default function CropButton({
  value,
  imgUrl,
  selected,
  onClick,
}: CropButtonProps) {
  function handleClick() {
    onClick(value);
  }

  return (
    <div className={cx('cropButton', {selected})}>
      <button id={value} onClick={handleClick}>
        <img src={imgUrl} alt={value} />
      </button>
      <label htmlFor={value}>{value}</label>
    </div>
  );
}