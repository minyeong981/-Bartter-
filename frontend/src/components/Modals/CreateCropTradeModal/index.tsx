import classnames from 'classnames/bind';

import LinkButton from '@/components/Buttons/LinkButton.tsx';
import ModalContainer from '@/components/ModalContainer';

import styles from './createCropTradeModal.module.scss';

interface CreateCropTradeModalProps {
  onClickOutside: VoidFunction;
}

const cx = classnames.bind(styles);

export default function CreateCropTradeModal({
  onClickOutside,
}: CreateCropTradeModalProps) {
  return (
    <ModalContainer onClickOutside={onClickOutside}>
      <p className={cx('text')}>
        농사일기에서 정보를
        <br />
        가져오시겠습니까?
      </p>
      <div className={cx('buttonContainer')}>
        <LinkButton
          to="/trade/from"
          buttonStyle={{style: 'mono', size: 'tiny'}}
        >
          직접쓰기
        </LinkButton>
        <LinkButton
          to="/trade/to"
          buttonStyle={{style: 'primary', size: 'tiny'}}
        >
          가져오기
        </LinkButton>
      </div>
    </ModalContainer>
  );
}