'use client'

// import Image from "next/image";
import styles from '../page.module.css';
import TaskModal from '@/components/ui/TaskModal';
import Button from '@/components/ui/Button';
import { useState } from 'react';

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const showTaskModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
    <div className={styles.taskButton}></div>
      <Button text='+ タスクを追加' onClick={showTaskModal}></Button>
      <TaskModal
        text='新規タスク登録'
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        buttonText='登録する'
      />
    </>
  );
}
