import styles from './Modal.module.css';
import Input from './Input';
import Button from './Button';
import ButtonWhite from './ButtonWhite';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';

type ModalProps = {
  text: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

export default function Modal({ text, isOpen, onClose, onSuccess }: ModalProps) {
  const [folder, setFolder] = useState('');
  const [color, setColor] = useState('');
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

  const addFolder = async () => {
    if (folder === '') {
      setError('フォルダ名を入力してください');
      return;
    }
    setError('');

    const { error } = await supabase
      .from('lists')
      .insert([
        { user_id: await getUserId(), name: folder, color: color, position: 0 },
      ]);

    if (error) {
      return;
    }
    onClose();
    onSuccess();
  };

  if (!isOpen) return null;
  return (
    <div className={styles.background}>
      <div className={styles.modal}>
        <p className={styles.title}>{text}</p>
        <div className={styles.row}>
          <Input
            type='text'
            name='folder'
            value={folder}
            id='name'
            onChange={(e) => setFolder(e.target.value)}
            placeholder='フォルダ名'
          />
        </div>
        <div className={styles.row}>
          <Input
            type='color'
            name='color'
            id='color'
            value={color}
            onChange={(e) => setColor(e.target.value)}
            placeholder='フォルダ名'
          />
        </div>
        {error && <p className={styles.error}>{error}</p>}
        <div className={styles.buttons}>
          <ButtonWhite text='キャンセル' onClick={onClose} />
          <Button text='追加' onClick={addFolder} />
        </div>
      </div>
    </div>
  );
}
