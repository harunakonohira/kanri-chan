import styles from '@/app/(dashboard)/dashboard.module.css';
import TaskList from '@/components/layout/TaskList';

export default async function List() {

  return (
    <div className={styles.dashboard}>
      <div className={styles.listTitle}>
        <h1 className={styles.pageTitle}>未分類タスク</h1>
      </div>
      <TaskList />
    </div>
  );
}
