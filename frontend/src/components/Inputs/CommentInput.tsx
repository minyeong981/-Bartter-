import classnames from 'classnames/bind'

import GeneralButton from '../Buttons/GeneralButton';
import styles from './CommentInput.module.scss'

const cx = classnames.bind(styles);

interface CommentInputProps {
    content : string;
    onChange : (event: React.ChangeEvent<HTMLInputElement>) => void;
    onClick: (content : string) => void;
}
export default function CommentInput({
    content,
    onChange,
    onClick
    } : CommentInputProps ) {

    function handleClick() {
        onClick(content);
    }

    function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === 'Enter') {
            handleClick();
        }
    }

    return (
        <div className={cx('comment-input-container')}>
        <input
        className={cx('comment-input')}
        type="text"
        value={content}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        placeholder="댓글을 입력하세요"
      />
      <GeneralButton 
      buttonStyle={{style: 'primary', size: 'tiny'}}
      onClick={handleClick}
      >입력</GeneralButton>
      </div>
    )

}