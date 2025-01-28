import styles from './Button/Button.module.css';

// eslint-disable-next-line react/prop-types
export function RightButton({ onClick }) {
  return (
    <button className={`${styles.navButton} ${styles.right}`} onClick={onClick}>
      →
    </button>
  );
}