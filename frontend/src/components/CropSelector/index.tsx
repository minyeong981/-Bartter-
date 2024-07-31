import classnames from 'classnames/bind';

import {IconArrowRight} from '@/assets/svg';
import LinkButton from '@/components/Buttons/LinkButton.tsx';

import styles from './cropSelector.module.scss';

const cx = classnames.bind(styles);

interface CropSelectorProps {
  from: string;
  to: string;
}

export default function CropSelector({from, to}: CropSelectorProps) {
  return (
    <div className={cx('crop-selector')}>
      <LinkButton buttonStyle={{style: 'flexible', type: 'outlined'}}>
        {from}
      </LinkButton>
      <IconArrowRight className={cx('icon')} />
      <LinkButton buttonStyle={{style: 'flexible', type: 'outlined'}}>
        {to}
      </LinkButton>
    </div>
  );
}