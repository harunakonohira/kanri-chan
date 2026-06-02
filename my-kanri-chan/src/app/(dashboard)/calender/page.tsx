'use client';

import styles from '../dashboard.module.css';
import Button from '@/components/ui/Button';
import ButtonWhite from '@/components/ui/ButtonWhite';
import { useState, useEffect } from 'react';
import { getTasks } from '@/lib/getTask';

export default function Calender() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1);
  const daysInMonth = new Date(year, month, 0).getDate();
  const firstDay = (new Date(year, month - 1, 1).getDay() + 6) % 7;
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: firstDay }, (_, i) => i);

  const prevMonth = () => {
    if (month === 1) {
      setYear(year - 1);
      setMonth(12);
    } else {
      setMonth(month - 1);
    }
  };

  const goToday = () => {
    setYear(today.getFullYear());
    setMonth(today.getMonth() + 1);
  };

  const nextMonth = () => {
    if (month === 12) {
      setYear(year + 1);
      setMonth(1);
    } else {
      setMonth(month + 1);
    }
  };

  const [tasks, setTasks] = useState<
    {
      id: string;
      list_id: string | null;
      title: string;
      due_date: string | null;
      priority: string | null;
      is_done: boolean;
      lists: { color: string }[] | null;
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
      <div className={styles.listTitle}>
        <h1 className={styles.pageTitle}>
          {year}年{month}月
        </h1>
        <div className={styles.moveButtons}>
          <Button text='前月' onClick={prevMonth} />
          <ButtonWhite text='今日' onClick={goToday} />
          <Button text='翌月' onClick={nextMonth} />
        </div>
      </div>
      <div className={styles.calenderWrap}>
        <div className={styles.calendarGridHead}>
          <div className={styles.dayCellHead}>月</div>
          <div className={styles.dayCellHead}>火</div>
          <div className={styles.dayCellHead}>水</div>
          <div className={styles.dayCellHead}>木</div>
          <div className={styles.dayCellHead}>金</div>
          <div className={styles.dayCellHead}>土</div>
          <div className={styles.dayCellHead}>日</div>
        </div>
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
                {dayTasks.map((task) => {
                  return (
                    <div key={task.id} className={styles.taskChip}>
                      <div
                        className={styles.chipColor}
                        style={{
                          backgroundColor:
                            (task.lists as { color: string } | null)?.color ??
                            '#F97316',
                        }}
                      ></div>
                      <p className={styles.taskTitle}>{task.title}</p>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
