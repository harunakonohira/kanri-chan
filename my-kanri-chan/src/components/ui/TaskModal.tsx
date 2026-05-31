'use client';

import styles from './TaskModal.module.css';
import Input from './Input';
import Select from './Select';
import Button from './Button';
import ButtonWhite from './ButtonWhite';
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';

type TaskModalProps = {
  text: string;
  buttonText: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

export default function TaskModal({
  text,
  buttonText,
  isOpen,
  onClose,
  onSuccess,
}: TaskModalProps) {
  const [title, setTitle] = useState('');
  const [listId, setListId] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('');
  const [error, setError] = useState('');

  async function getUserId() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      const userId = user.id;
      return userId;
    }
  }

  const [lists, setLists] = useState<
    { id: string; name: string; color: string }[]
  >([]);
  const getList = useCallback(async () => {
    const { data } = await supabase.from('lists').select('id, name, color');
    setLists(data ?? []);
  }, []);

  const addTask = async () => {
    if (title === '') {
      setError('タイトルを入力してください');
      return;
    }
    setError('');

    const { error } = await supabase.from('tasks').insert([
      {
        user_id: await getUserId(),
        list_id: listId || null,
        title: title,
        due_date: dueDate,
        priority: priority,
        is_done: false,
      },
    ]);
    console.log('error:', error);

    if (error) {
      return;
    }
    onClose();
    onSuccess();
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getList();
  }, [getList]);

  if (!isOpen) return null;
  return (
    <div className={styles.background}>
      <div className={styles.modal}>
        <p className={styles.title}>{text}</p>
        <div className={styles.row}>
          <Input
            type='text'
            name='title'
            value={title}
            id='name'
            onChange={(e) => setTitle(e.target.value)}
            placeholder='タイトル'
          />
        </div>
        <div className={styles.row}>
          <div className={styles.rowTitle}>フォルダ</div>
          <div className={styles.selectWrapper}>
            <Select
              name='list_id'
              id='listId'
              value={listId}
              onChange={(e) => setListId(e.target.value)}
              options={lists.map((list) => ({
                value: list.id,
                label: list.name,
              }))}
            />
          </div>
        </div>
        <div className={styles.row}>
          <Input
            type='date'
            name='due_date'
            value={dueDate}
            id='name'
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        <div className={styles.radioRow}>
          <div className={styles.rowTitle}>優先度</div>
          <div className={styles.radioWrapper}>
            <label>
              <Input
                type='radio'
                name='priority'
                value='high'
                id='name'
                onChange={(e) => setPriority(e.target.value)}
              />
              高
            </label>
            <label>
              <Input
                type='radio'
                name='priority'
                value='medium'
                id='name'
                onChange={(e) => setPriority(e.target.value)}
              />
              中
            </label>
            <label>
              <Input
                type='radio'
                name='priority'
                value='low'
                id='name'
                onChange={(e) => setPriority(e.target.value)}
              />
              低
            </label>
          </div>
        </div>
        <div className={styles.buttons}>
          <ButtonWhite text='キャンセル' onClick={onClose} />
          <Button text={buttonText} onClick={addTask} />
        </div>
      </div>
    </div>
  );
}
