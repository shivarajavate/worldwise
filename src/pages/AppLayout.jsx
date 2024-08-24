import Sidebar from "../components/Sidebar.jsx";
import Map from "../components/Map.jsx";
import User from "../components/User.jsx";
import styles from "./AppLayout.module.css";

export default function AppLayout() {
  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
      <User />
    </div>
  );
}
