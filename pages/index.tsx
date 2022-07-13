import type { NextPage } from "next";
import SearchBar from "../components/SearchBar";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <SearchBar />
    </div>
  );
};

export default Home;
