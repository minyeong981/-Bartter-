import classnames from 'classnames/bind';

import styles from './cropButton.module.scss';

interface CropButtonProps {
  onClick: (value: string) => void;
  value: string;
  name: string;
  imgUrl: string;
  selected?: boolean;
}

const cx = classnames.bind(styles);

export default function CropButton({
  value,
  imgUrl,
  selected,
  name,
  onClick,
}: CropButtonProps) {
  function handleClick() {
    onClick(value);
  }

  return (
    <div className={cx('cropButton', {selected})}>
      <button id={value} onClick={handleClick}>
        <img src={'http://' + imgUrl} alt={name} />
      </button>
      <label htmlFor={name}>{name}</label>
    </div>
  );
}