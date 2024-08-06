import { useState } from 'react'
import { FaX } from "react-icons/fa6";

import styles from './RecentSearch.module.scss';

interface RecentSearchProps {
    searches: string[];
    onSearch: (searchTerm: string, isEnter:boolean) => void;
}

export default function RecentSearch({ searches, onSearch }: RecentSearchProps) {

    const [searchList, setSearchList] = useState<string[]>(searches);

    function onDelete(search : string) {
        setSearchList(searchList.filter((word) => word !== search))
    }

    return (
        <div className={styles.recentSearchContainer}>
            {searchList.map((search, searchIndex) => (
                <div key={searchIndex} className={styles.searchItem}>
                    <div className={styles.searchText} onClick={() => onSearch(search, true)}>
                        {search}
                    </div>
                    <button className={styles.deleteButton} onClick={() => onDelete(search)}>
                        <FaX />
                    </button>
                </div>
            ))}
        </div>
    );
}
