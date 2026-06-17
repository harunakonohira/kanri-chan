'use client';

import styles from '../dashboard.module.css';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function Report() {
  const [chartData, setChartData] = useState<
    { date: string; minutes: number }[]
  >([]);

  useEffect(() => {
    const load = async () => {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      sevenDaysAgo.setHours(0, 0, 0, 0);

      const { data } = await supabase
        .from('time_records')
        .select('created_at, duration_seconds')
        .gte('created_at', sevenDaysAgo.toISOString());

      const totals: { [date: string]: number } = {};
      (data ?? []).forEach((record) => {
        const date = record.created_at.split('T')[0];
        totals[date] = (totals[date] ?? 0) + record.duration_seconds;
      });

      const last7Days: string[] = [];
      for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        last7Days.push(d.toISOString().split('T')[0]);
      }

      const newChartData = last7Days.map((date) => ({
        date: date.split('-').slice(1).join('/'),
        minutes: Math.floor((totals[date] ?? 0) / 60),
      }));
      setChartData(newChartData);
    };
    load();
  }, []);
  const weekTotal = chartData.reduce((sum, item) => sum + item.minutes, 0);
  const todayTotal = chartData[chartData.length - 1]?.minutes ?? 0;

  const formatMinutes = (minutes: number) => {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return { h, m };
  };

  const today = formatMinutes(todayTotal);
  const week = formatMinutes(weekTotal);

  return (
    <div className={styles.dashboard}>
      <div className={styles.listTitle}>
        <h1 className={styles.pageTitle}>レポート</h1>
      </div>
      <div className={styles.summary}>
        <div className={styles.summaryCard}>
          <p className={styles.summaryLabel}>今日の合計</p>
          <p className={styles.summaryValue}>
            {today.h > 0 && (
              <>
                {today.h}
                <span>時間</span>
              </>
            )}
            {today.m}
            <span>分</span>
          </p>
        </div>
        <div className={styles.summaryCard}>
          <p className={styles.summaryLabel}>過去7日間の合計</p>
          <p className={styles.summaryValue}>
            {week.h > 0 && (
              <>
                {week.h}
                <span>時間</span>
              </>
            )}
            {week.m}
            <span>分</span>
          </p>
        </div>
      </div>
      <div className={styles.chartArea}>
        <ResponsiveContainer width='100%' height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='date' />
            <YAxis />
            <Tooltip />
            <Bar dataKey='minutes' fill='#F97316' name='稼働時間(分)' />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
