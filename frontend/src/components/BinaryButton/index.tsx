import classnames from 'classnames/bind';
import type {ChangeEvent} from 'react';

import styles from './binaryButton.module.scss';

interface BinaryButtonProps {
  value1: string;
  label1: string;
  value2: string;
  label2: string;
  onSelect: (value: string) => void;
}

const cx = classnames.bind(styles);

export default function BinaryButton({
  value1,
  label1,
  value2,
  label2,
  onSelect,
}: BinaryButtonProps) {
  function handleSelect(e: ChangeEvent<HTMLInputElement>) {
    onSelect(e.currentTarget.value);
  }

  return (
    <div className={cx('binaryButton')} role="radiogroup">
      <input
        type="radio"
        id={value1}
        value={value1}
        onChange={handleSelect}
        name={`${value1}-${value2}`}
      />
      <label htmlFor={value1}>{label1}</label>
      <input
        type="radio"
        id={value2}
        value={value2}
        onChange={handleSelect}
        name={`${value1}-${value2}`}
      />
      <label htmlFor={value2}>{label2}</label>
    </div>
  );
}