'use client';

import styles from '../dashboard.module.css';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function Timer() {
  return (
    <div className={styles.dashboard}>
      <div className={styles.listTitle}>
        <h1 className={styles.pageTitle}>タイマー</h1>
      </div>
      <div className={styles.selectTask}></div>
      <div className={styles.timer}>
        <div className={styles.stopwatch}></div>
        <div className={styles.timerButtons}>
          <Button text='スタート' />
          <Button text='ストップ' />
        </div>
        <div className={styles.reportLink}>
          <Link href='/report'>レポートを見る →</Link>
        </div>
      </div>
      <div className={styles.today}>
        <div className={styles.todayTitle}>本日の記録</div>
        <div className={styles.todayReports}>
          <div className={styles.reportsRow}>
            <div className={styles.rowTitle}></div>
            <div className={styles.rowTime}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
