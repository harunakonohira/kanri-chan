'use client';

import styles from './TaskList.module.css';
import TaskModal from '@/components/ui/TaskModal';
import Button from '@/components/ui/Button';
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import Task from '../ui/Task';

type TaskListProps = {
  listId?: string | null;
};

export default function TaskList({ listId }: TaskListProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showDone, setShowDone] = useState(false);
  const showTaskModal = () => {
    setIsOpen(!isOpen);
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

  const priorityOrder: { [key: string]: number } = {
    high: 0,
    medium: 1,
    low: 2,
  };

  const getTask = useCallback(async () => {
    let query = supabase
      .from('tasks')
      .select('id, list_id, title, due_date, priority, is_done')
      .order('due_date', { ascending: true });

    if (listId) {
      query = query.eq('list_id', listId);
    }

    const { data } = await query;
    const sorted = (data ?? []).sort((a, b) => {
      if (a.due_date !== b.due_date) {
        return (a.due_date ?? '').localeCompare(b.due_date ?? '');
      }
      return (
        priorityOrder[a.priority ?? 'low'] - priorityOrder[b.priority ?? 'low']
      );
    });
    setTasks(sorted);
  }, [listId]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getTask();
  }, [getTask]);

  return (
    <div className={styles.tasks}>
      <div className={styles.done}>
        <label>
          <input
            type='checkbox'
            checked={showDone}
            onChange={() => setShowDone(!showDone)}
          />
          完了済みタスクを表示
        </label>
      </div>
      <div className={styles.tasksWrapper}>
        {tasks
          .filter((task) => showDone || !task.is_done)
          .map((task) => {
            return (
              <Task
                key={task.id}
                taskId={task.id}
                taskTitle={task.title}
                taskDate={task.due_date}
                taskPriority={task.priority}
                onSuccess={getTask}
                taskIsDone={task.is_done}
              />
            );
          })}
      </div>
      <div className={styles.taskButton}>
        <Button text='+ タスクを追加' onClick={showTaskModal}></Button>
      </div>
      <TaskModal
        text='新規タスク登録'
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        buttonText='登録する'
        onSuccess={getTask}
      />
    </div>
  );
}
