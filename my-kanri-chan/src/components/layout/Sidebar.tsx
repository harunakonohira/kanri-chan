'use client';

import styles from './Sidebar.module.css';
import Button from '@/components/ui/Button';
import PageLink from '../ui/PageLink';
import FolderLink from '../ui/FolderLink';
import AddList from '../ui/AddList';
import Modal from '../ui/Modal';
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
  const [isOpen, setIsOpen] = useState(false);
  const showModal = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <div className={styles.sidebar}>
        <div>
          <div className={styles.title}>
            <p>わたしの管理ちゃん</p>
          </div>
          <ul className={styles.pages}>
            <PageLink href='#' text='今後7日間' />
            <PageLink href='#' text='受信トレイ' />
            <PageLink href='#' text='カレンダー' />
          </ul>
          <div className={styles.divider}></div>
          <div className={styles.lists}>
            <ul className={styles.folders}>
              <FolderLink href='#' text='転職準備' />
              <FolderLink href='#' text='学習' />
              <FolderLink href='#' text='読書' />
            </ul>
            <AddList text='+ フォルダを追加' onClick={showModal} />
          </div>
        </div>
        <div>
          <ul className={styles.pages}>
            <PageLink href='#' text='タイマー' />
            <PageLink href='#' text='レポート' />
            <PageLink href='#' text='設定' />
          </ul>
          <div className={styles.logout}>
            <Button text='ログアウト' onClick={handleLogout}></Button>
            {error && <p className={styles.error}>{error}</p>}
          </div>
        </div>
      </div>
      <Modal text='新規フォルダ作成' isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
