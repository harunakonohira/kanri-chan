// 'use client';

// import Image from "next/image";
import styles from './dashboard.module.css';
// import TaskModal from '@/components/ui/TaskModal';
// import Button from '@/components/ui/Button';
// import { useState } from 'react';
import TaskList from "@/components/layout/TaskList";

export default function Home() {

  return (
    <div className={styles.dashboard}>
      <div className={styles.listTitle}>
        <h1 className={styles.pageTitle}>今後７日間</h1>
      </div>
      <TaskList />
    </div>
  );
}
