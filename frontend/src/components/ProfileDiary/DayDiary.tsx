

import styles from './DayDiary.module.scss';
import DayDiaryImage from './DayDiaryImage';

interface DayDiaryProps {
    diaries : CropDiaryThumbnail[];
}

export default function DayDiary({ diaries }: DayDiaryProps) {

    return (
        <div className={styles.dayDiaryContainer}>
            <div className={styles.date}>
                <span className={styles.dateIcon} /> 
                {diaries[0].performDate}
            </div>
            <div className={styles.diaryImages}>
                {diaries.map((diary, index) => (
                    <DayDiaryImage key={index} {...diary}/>
                ))}
            </div>
        </div>
    )
}
