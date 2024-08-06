import { Link } from "@tanstack/react-router";

import styles from './AdCard.module.scss';

export default function AdCard({
  image, 
  content, 
  linkText,
  link
}: {
  image: string;
  content: string;
  linkText: string;
  link: string;
}) {
  return (
    <div className={styles.card}>
      <img src={image} alt={linkText} className={styles.image} />
      <div className={styles.overlay}>
        <div className={styles.content}>{content}</div>
        <div className={styles.link}>
          <Link to={link}>{linkText}</Link>
        </div>
      </div>
    </div>
  );
}
