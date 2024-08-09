import classnames from 'classnames/bind';

import styles from './chatInfoCard.module.scss';

const cx = classnames.bind(styles);

export default function ChatInfoCard() {
  return (
    <div className={cx('chatInfoCard')}>
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyPkxMuo6NOHcNx-aO-wOo3eyVnB2oTq-ZwA&s"
        className={cx('chatImage')}
        alt="물물교환 이미지"
      />
      <div className={cx('info')}>
        <h1 className={cx('title')}>게시글 제목</h1>
        <p className={cx('author')}>작성자</p>
        <p className={cx('status')}>물물교환 가능</p>
      </div>
      <button className={cx('button')}>예약하기</button>
    </div>
  );
}