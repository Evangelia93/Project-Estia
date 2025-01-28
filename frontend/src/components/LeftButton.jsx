import styles from './Button/Button.module.css';

// eslint-disable-next-line react/prop-types
export function LeftButton({ onClick }) {
  return (
    <button className={`${styles.navButton} ${styles.left}`} onClick={onClick}>
      ←
    </button>
  );
}