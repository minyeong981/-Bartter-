import { FaX } from "react-icons/fa6";

import EmptyPost from "../Empty/EmptyPost";
import styles from './RecentSearch.module.scss';

interface RecentSearchProps {
    searches: string[];
    onSearch: (searchTerm: string, isEnter:boolean) => void;
    onDeleteSearch: (searchTerm: string) => void;
}

export default function RecentSearch({ searches, onSearch, onDeleteSearch }: RecentSearchProps) {

    function handleDeleteSearch(search : string) {
        onDeleteSearch(search)
    }

    return (
        <div className={styles.recentSearchContainer}>
            {searches.length === 0 ? (
                <EmptyPost text="검색기록이 없습니다."/>
            ) : (
                searches.map((search, searchIndex) => (
                    <div key={searchIndex} className={styles.searchItem}>
                        <div className={styles.searchText} onClick={() => onSearch(search, true)}>
                            {search}
                        </div>
                        <button className={styles.deleteButton} onClick={() => handleDeleteSearch(search)}>
                            <FaX />
                        </button>
                    </div>
                ))
            )}
        </div>
    );
}
