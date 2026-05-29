'use client';

import styles from './Sidebar.module.css';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function Sidebar() {
  const [error, setError] = useState('');
  const router = useRouter();
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      setError('ログアウトできませんでした');
    } else {
      router.push('/login');
    }
  };
  return (
    <div className={styles.sidebar}>
      <div>
        <div className={styles.title}>
          <p>わたしの管理ちゃん</p>
        </div>
        <ul className={styles.pages}>
          <li className={`${styles.page} ${styles.active}`}>
            <Link href=''>今後7日間</Link>
          </li>
          <li className={styles.page}>
            <Link href=''>受信トレイ</Link>
          </li>
          <li className={styles.page}>
            <Link href=''>カレンダー</Link>
          </li>
        </ul>
        <div className={styles.divider}></div>
        <div className={styles.lists}>
          <ul className={styles.folders}>
            <li className={styles.folder}>
              <Link href=''>転職準備</Link>
            </li>
            <li className={styles.folder}>
              <Link href=''>デイトラ</Link>
            </li>
            <li className={styles.folder}>
              <Link href=''>読書</Link>
            </li>
          </ul>
          <div className={styles.add}>
            <Link href=''>＋ リストを追加</Link>
          </div>
        </div>
      </div>
      <div>
        <ul className={styles.pages}>
          <li className={styles.page}>
            <Link href=''>タイマー</Link>
          </li>
          <li className={styles.page}>
            <Link href=''>レポート</Link>
          </li>
          <li className={styles.page}>
            <Link href=''>設定</Link>
          </li>
        </ul>
        <div className={styles.logout}>
          <Button text='ログアウト' onClick={handleLogout}></Button>
          {error && <p className={styles.error}>{error}</p>}
        </div>
      </div>
    </div>
  );
}
