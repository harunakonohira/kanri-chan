import styles from './dashboard.module.css';
import TaskList from "@/components/layout/TaskList";

export default function Home() {

  return (
    <div className={styles.dashboard}>
      <div className={styles.listTitle}>
        <h1 className={styles.pageTitle}>今後７日間</h1>
      </div>
      <TaskList weekOnly={true} />
    </div>
  );
}
