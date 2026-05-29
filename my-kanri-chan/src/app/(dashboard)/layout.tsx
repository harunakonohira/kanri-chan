import styles from './layout.module.css';
import Sidebar from '@/components/layout/Sidebar';
import { ReactNode } from 'react';

export default function Dashboard({ children }: { children: ReactNode }) {
  return (
    <div className={styles.layout}>
      <main className={styles.main}>
        {children}
      </main>
      <aside className={styles.aside}>
        <Sidebar />
      </aside>
    </div>
  );
}
