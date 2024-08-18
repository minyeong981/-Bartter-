import { Link } from "@tanstack/react-router"
import Lottie from "react-lottie-player";

import Error from '@/assets/lottie/error.json'

import styles from './notFound.module.scss'


interface NotFoundProps {
    errorMessage: string;
    description: string;
}
export default function NotFound({ errorMessage, description} : NotFoundProps) {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
            <div className={styles.lottieContainer}>
                <Lottie loop animationData={Error} play className={styles.lottie} />
            </div>
                <p className={styles.errorMessage}>{errorMessage}</p>
                <p className={styles.description}>{description}</p>
                <Link to="/" className={styles.homeLink}>홈으로 돌아가기</Link>
            </div>
        </div>
    )
}