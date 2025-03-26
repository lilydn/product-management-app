import styles from './TopBar.module.scss';

const TopBar = () => {
  return (
    <div className={styles.topBar}>
      <p className={styles.title}>Product Management App</p>
    </div>
  );
};

export { TopBar };
