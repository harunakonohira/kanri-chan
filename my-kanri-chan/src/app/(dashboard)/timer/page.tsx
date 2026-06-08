'use client';

import styles from '../dashboard.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { getTasks } from '@/lib/getTask';
import Button from '@/components/ui/Button';
import ButtonWhite from '@/components/ui/ButtonWhite';
import Select from '@/components/ui/Select';

export default function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState('');
  const [showPraise, setShowPraise] = useState(false);
  const [praiseNumber, setPraiseNumber] = useState(1);

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

  const formatReportTime = (totalSeconds: number) => {
    const h = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const m = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const s = String(totalSeconds % 60).padStart(2, '0');
    return `${h}時間 ${m}分 ${s}秒`;
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
    loadReport();
    // eslint-disable-next-line react-hooks/purity
    const randomNumber = Math.floor(Math.random() * 10) + 1;
    setPraiseNumber(randomNumber);
    setShowPraise(true);
  };

  const [report, setReport] = useState<
    {
      id: string;
      task_id: string;
      duration_seconds: number;
      tasks: { title: string }[] | null;
    }[]
  >([]);

  const loadReport = async () => {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const { data } = await supabase
      .from('time_records')
      .select('id, task_id, duration_seconds, tasks(title)')
      .gte('created_at', todayStart.toISOString());
    setReport(data ?? []);
  };

  useEffect(() => {
    loadReport();
  }, []);

  return (
    <>
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
            <ButtonWhite text='ストップ' onClick={saveRecord} />
          </div>
          <div className={styles.reportLink}>
            <Link href='/report'>レポートを見る →</Link>
          </div>
        </div>
        <div className={styles.today}>
          <div className={styles.todayTitle}>本日の記録</div>
          <div className={styles.todayReports}>
            {report.map((record) => (
              <div key={record.id} className={styles.reportsRow}>
                <div className={styles.rowTitle}>
                  {(record.tasks as { title: string } | null)?.title ??
                    '未設定'}
                </div>
                <div className={styles.rowTime}>
                  {formatReportTime(record.duration_seconds)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {showPraise && (
        <div className={styles.praiseBackground}>
          <div className={styles.praiseModal}>
            <Image
              src={`/praise/${praiseNumber}.png`}
              alt='お疲れさま'
              width={240}
              height={240}
            />
            <div className={styles.modalButtonWrapper}>
              <Button text='閉じる' onClick={() => setShowPraise(false)} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
