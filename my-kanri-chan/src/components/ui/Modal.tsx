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
  buttonText: string;
  onSubmit?: (name: string, color: string) => void;
  initialName?: string;
  initialColor?: string;
};

export default function Modal({ text, isOpen, onClose, onSuccess, buttonText, onSubmit, initialName = '', initialColor = '' }: ModalProps) {
  const [folder, setFolder] = useState(initialName);
  const [color, setColor] = useState(initialColor);
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

  const addFolder = async (name: string, color: string) => {
    if (folder === '') {
      setError('フォルダ名を入力してください');
      return;
    }
    setError('');

    const { error } = await supabase
      .from('lists')
      .insert([
        { user_id: await getUserId(), name: name, color: color, position: 0 },
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
            name='name'
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
            placeholder=''
          />
        </div>
        {error && <p className={styles.error}>{error}</p>}
        <div className={styles.buttons}>
          <ButtonWhite text='キャンセル' onClick={onClose} />
          <Button text={buttonText} onClick={() => onSubmit ? onSubmit(folder, color) : addFolder(folder, color)} />
        </div>
      </div>
    </div>
  );
}
