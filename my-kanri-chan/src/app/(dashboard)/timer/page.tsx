'use client';

import styles from '../dashboard.module.css';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { getTasks } from '@/lib/getTask';
import Button from '@/components/ui/Button';
import Select from '@/components/ui/Select';

export default function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState('');

  async function getUserId() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      const userId = user.id;
      return userId;
    }
  }

  const formatTime = (totalSeconds: number) => {
    const h = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const m = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const s = String(totalSeconds % 60).padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  const [tasks, setTasks] = useState<
    {
      id: string;
      list_id: string | null;
      title: string;
      due_date: string | null;
      priority: string | null;
      is_done: boolean;
    }[]
  >([]);

  useEffect(() => {
    const load = async () => {
      const data = await getTasks();
      setTasks(data);
    };
    load();
  }, []);

  useEffect(() => {
    if (!isRunning) return;

    const intervalId = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isRunning]);

  const saveRecord = async () => {
    setIsRunning(false);
    await supabase.from('time_records').insert({
      user_id: await getUserId(),
      task_id: selectedTaskId,
      duration_seconds: seconds,
    });
    setSeconds(0);
  };

  return (
    <div className={styles.dashboard}>
      <div className={styles.listTitle}>
        <h1 className={styles.pageTitle}>タイマー</h1>
      </div>
      <div className={styles.selectTask}>
        <Select
          first='タスクを選択'
          name='task'
          id='task'
          value={selectedTaskId}
          onChange={(e) => setSelectedTaskId(e.target.value)}
          options={tasks.map((task) => ({
            value: task.id,
            label: task.title,
          }))}
        />
      </div>
      <div className={styles.timer}>
        <div className={styles.stopwatch}>{formatTime(seconds)}</div>
        <div className={styles.timerButtons}>
          <Button text='スタート' onClick={() => setIsRunning(true)} />
          <Button text='ストップ' onClick={saveRecord} />
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
