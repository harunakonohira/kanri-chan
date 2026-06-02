'use client';

import styles from './TaskList.module.css';
import TaskModal from '@/components/ui/TaskModal';
import Button from '@/components/ui/Button';
import { useState, useEffect, useCallback } from 'react';
import Task from '../ui/Task';
import { getTasks } from '@/lib/getTask';

type TaskListProps = {
  listId?: string | null;
  weekOnly?: boolean;
  unclassified?: boolean;
};

export default function TaskList({ listId, weekOnly, unclassified }: TaskListProps) {
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

  const loadTasks = useCallback(async () => {
    const data = await getTasks(listId, weekOnly, unclassified);
    setTasks(data);
  }, [listId, weekOnly, unclassified]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadTasks();
  }, [loadTasks]);

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
                onSuccess={loadTasks}
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
        onSuccess={loadTasks}
        initialListId={listId ?? ''}
      />
    </div>
  );
}
