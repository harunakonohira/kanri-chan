'use client';

import styles from '../dashboard.module.css';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';

export default function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const formatTime = (totalSeconds: number) => {
    const h = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const m = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const s = String(totalSeconds % 60).padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  useEffect(() => {
    if (!isRunning) return;

    const intervalId = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isRunning]);

  return (
    <div className={styles.dashboard}>
      <div className={styles.listTitle}>
        <h1 className={styles.pageTitle}>タイマー</h1>
      </div>
      <div className={styles.selectTask}></div>
      <div className={styles.timer}>
        <div className={styles.stopwatch}>{formatTime(seconds)}</div>
        <div className={styles.timerButtons}>
          <Button text='スタート' onClick={() => setIsRunning(true)} />
          <Button text='ストップ' onClick={() => setIsRunning(false)} />
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
