import styles from "./AppLayout.module.css";

export default function AppLayout() {
  return (
    <div className={styles.app}>
      <header>
        <h1>WorldWise</h1>
      </header>
      <main>{/* children components go here */}</main>
    </div>
  );
}
