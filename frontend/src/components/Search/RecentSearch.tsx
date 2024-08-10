import classname from 'classnames/bind'
import { FaX } from "react-icons/fa6";

import EmptyPost from "../Empty/EmptyPost";
import styles from './RecentSearch.module.scss';

interface RecentSearchProps {
    searches: string[];
    onSearch: (searchTerm: string, isEnter: boolean) => void;
    onDeleteSearch: (searchTerm: string) => void;
}

const cx = classname.bind(styles)
export default function RecentSearch({ searches, onSearch, onDeleteSearch }: RecentSearchProps) {

    function handleDeleteSearch(search: string) {
        onDeleteSearch(search);
    }

    return (
        <div className={cx("container")}>
            {searches.length === 0 ? (
                <EmptyPost text="검색기록이 없습니다." />
            ) : (
                searches.map((search, searchIndex) => (
                    <div key={searchIndex} className={cx('search-item')}>
                        <div className={cx('search-text')} onClick={() => onSearch(search, true)}>
                            {search}
                        </div>
                        <button className={cx('delete-button')} onClick={() => handleDeleteSearch(search)}>
                            <FaX />
                        </button>
                    </div>
                ))
            )}
        </div>
    );
}
