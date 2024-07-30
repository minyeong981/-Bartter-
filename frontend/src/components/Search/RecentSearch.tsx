import { FaX } from "react-icons/fa6";

import styles from './RecentSearch.module.scss';

interface RecentSearchProps {
    searchs: string[];
    onSearch: (searchTerm: string) => void;
}

export default function RecentSearch({ searchs, onSearch }: RecentSearchProps) {

    function onDelete() {
        console.log('delete 최근 검색어');
    }

    return (
        <div className={styles.recentSearchContainer}>
            {searchs.map((search, searchIndex) => (
                <div key={searchIndex} className={styles.searchItem}>
                    <div className={styles.searchText} onClick={() => onSearch(search)}>
                        {search}
                    </div>
                    <button className={styles.deleteButton} onClick={onDelete}>
                        <FaX />
                    </button>
                </div>
            ))}
        </div>
    );
}
