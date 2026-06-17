'use client';

import styles from '../dashboard.module.css';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
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

      const newChartData = Object.keys(totals).map((date) => ({
        date: date.split('-').slice(1).join('/'),
        minutes: Math.floor(totals[date] / 60),
      }));
      setChartData(newChartData);
    };
    load();
  }, []);
  return (
    <div className={styles.dashboard}>
      <div className={styles.listTitle}>
        <h1 className={styles.pageTitle}>レポート</h1>
      </div>
      <div className={styles.chartArea}>
        <ResponsiveContainer width='100%' height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey='date' />
            <YAxis />
            <Bar dataKey='minutes' fill='#F97316' />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
