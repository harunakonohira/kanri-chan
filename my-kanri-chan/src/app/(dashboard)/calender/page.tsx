'use client';

import styles from '../dashboard.module.css';
import { useState, useEffect } from 'react';
import { getTasks } from '@/lib/getTask';

export default function Calender() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const daysInMonth = new Date(year, month, 0).getDate();
  const firstDay = (new Date(year, month - 1, 1).getDay() + 6) % 7;
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: firstDay }, (_, i) => i);

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

  return (
    <div className={styles.dashboard}>
      <p>{year}</p>
      <p>{month}</p>
      <div className={styles.calendarGrid}>
        {blanks.map((b) => (
          <div key={`blank-${b}`} className={styles.dayCell}></div>
        ))}
        {days.map((day) => {
          const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          const dayTasks = tasks.filter((task) => task.due_date === dateStr);

          return (
            <div key={day} className={styles.dayCell}>
              <div>{day}</div>
              {dayTasks.map((task) => (
                <div key={task.id} className={styles.taskChip}>
                  {task.title}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
