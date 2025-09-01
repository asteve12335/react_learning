import styles from "../../styles/Navbar.module.css";

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <h1 className={styles.title}>CivicLens</h1>
    </nav>
  );
}

export default Navbar;