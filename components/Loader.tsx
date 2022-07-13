import styles from "styles/Loader.module.css";

const Loader = () => {
  return (
    <div className={styles.ldsWrapper}>
      <div className={styles.ldsHourglass}></div>
    </div>
  );
};

export default Loader;
