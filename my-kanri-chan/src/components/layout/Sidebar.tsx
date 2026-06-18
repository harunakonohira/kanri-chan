'use client';

import styles from './Sidebar.module.css';
import Button from '@/components/ui/Button';
import PageLink from '../ui/PageLink';
import FolderLink from '../ui/FolderLink';
import AddList from '../ui/AddList';
import Modal from '../ui/Modal';
import { useState, useEffect, useCallback } from 'react';
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

  const [lists, setLists] = useState<
    { id: string; name: string; color: string }[]
  >([]);
  const getList = useCallback(async () => {
    const { data } = await supabase.from('lists').select('id, name, color');
    setLists(data ?? []);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getList();
  }, [getList]);

  return (
    <>
      <div className={styles.sidebar}>
        <div>
          <div className={styles.title}>
            <p>わたしの管理ちゃん</p>
          </div>
          <ul className={styles.pages}>
            <PageLink href='/' text='今後7日間' />
            <PageLink href='/unclassified' text='未分類タスク' />
            <PageLink href='/calender' text='カレンダー' />
          </ul>
          <div className={styles.divider}></div>
          <div className={styles.lists}>
            <ul className={styles.folders}>
              {lists.map((list) => {
                return (
                  <FolderLink
                    key={list.id}
                    href={`/list/${list.id}`}
                    text={list.name}
                    color={list.color}
                  />
                );
              })}
            </ul>
            <AddList text='+ フォルダを追加' onClick={showModal} />
          </div>
        </div>
        <div>
          <ul className={styles.pages}>
            <PageLink href='/timer' text='タイマー' />
            <PageLink href='/report' text='レポート' />
            <PageLink href='/settings' text='設定' />
          </ul>
          <div className={styles.logout}>
            <Button text='ログアウト' onClick={handleLogout}></Button>
            {error && <p className={styles.error}>{error}</p>}
          </div>
        </div>
      </div>
      <Modal
        text='新規フォルダ作成'
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSuccess={getList}
        buttonText='追加する'
      />
    </>
  );
}
