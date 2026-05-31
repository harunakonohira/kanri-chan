'use client';

// import Image from "next/image";
import styles from './TaskList.module.css';
import TaskModal from '@/components/ui/TaskModal';
import Button from '@/components/ui/Button';
import { useState } from 'react';

export default function TaskList() {
  const [isOpen, setIsOpen] = useState(false);
  const showTaskModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.tasks}>
      <div className={styles.tasksWrapper}></div>
      <div className={styles.taskButton}>
        <Button text='+ タスクを追加' onClick={showTaskModal}></Button>
      </div>
      <TaskModal
        text='新規タスク登録'
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        buttonText='登録する'
      />
    </div>
  );
}
