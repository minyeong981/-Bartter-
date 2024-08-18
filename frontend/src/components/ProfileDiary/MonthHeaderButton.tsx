
import styles from './MonthHeaderButton.module.scss';

interface MonthHeaderButtonProps {
    text: string;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
  }

export default function MonthHeaderButton(
    {text, onClick} : 
    MonthHeaderButtonProps
) {
    return (
        <button onClick={onClick} className={styles.Button} >{text}</button>
    )
}