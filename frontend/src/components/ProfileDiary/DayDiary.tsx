import type { CropDiaryProps } from '@/routes/_layout/profile/$nickname/diary';

import styles from './DayDiary.module.scss';

export default function DayDiary({ date, diaries }: { date: string, diaries: CropDiaryProps[] }) {
    return (
        <div className={styles.dayDiaryContainer}>
            <div className={styles.date}>
                <span className={styles.dateIcon} /> {/* 큰 원 아이콘 */}
                {date}
            </div>
            <div className={styles.diaryImages}>
                {diaries.map((diary, index) => (
                    <div key={index} className={styles.diaryImage}>
                        <img src={diary.image} alt={diary.title} />
                    </div>
                ))}
            </div>
        </div>
    )
}
