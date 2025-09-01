import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";
import styles from "./styles/App.module.css";

function App() {
  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.contentWrapper}>
        <Sidebar />
        <main className={styles.main}>
          <h2 className={styles.title}>Welcome to CivicLens</h2>
          <p className={styles.subtitle}>
            Start by checking the dashboard or reporting an issue.
          </p>
        </main>
      </div>
    </div>
  );
}

export default App;