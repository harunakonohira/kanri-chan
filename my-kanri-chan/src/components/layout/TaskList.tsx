'use client';

// import Image from "next/image";
import styles from './TaskList.module.css';
import TaskModal from '@/components/ui/TaskModal';
import Button from '@/components/ui/Button';
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';

type TaskListProps = {
  listId?: string | null;
};

export default function TaskList({ listId }: TaskListProps) {
  const [isOpen, setIsOpen] = useState(false);
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

  const getTask = useCallback(async () => {
    let query = supabase
      .from('tasks')
      .select('id, list_id, title, due_date, priority, is_done');

    if (listId) {
      query = query.eq('list_id', listId);
    }

    const { data } = await query;
    setTasks(data ?? []);
  }, [listId]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getTask();
  }, [getTask]);

  return (
    <div className={styles.tasks}>
      <div className={styles.tasksWrapper}>
        {tasks.map((task) => {
          return(
            <div className={styles.task} key={task.id}>
              <p className="">{task.title}</p>
              <p className="">{task.due_date}</p>
            </div>
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
