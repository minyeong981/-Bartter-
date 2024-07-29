import {createFileRoute} from '@tanstack/react-router';

import HeaderWithSearchAndBackButton from '@/components/Header/HeaderWithSearchandBackButton';

import styles from './search.module.scss';

export const Route = createFileRoute('/_layout/search/')({
  component: Search,
});

export default function Search() {
  return (
    <div className={styles.header}>
      <HeaderWithSearchAndBackButton
        label={
          <div className={styles.inputContainer}>
            <input placeholder="검색어를 입력하세요" />
          </div>
        }
      />
    </div>
  );
}