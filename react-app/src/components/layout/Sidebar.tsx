import styles from "../../styles/Sidebar.module.css";

function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <a href="/" className={styles.link}>Dashboard</a>
      <a href="/report" className={styles.link}>Report Issue</a>
      <a href="/issues" className={styles.link}>Issues</a>
      <a href="/analytics" className={styles.link}>Analytics</a>
    </aside>
  );
}

export default Sidebar;