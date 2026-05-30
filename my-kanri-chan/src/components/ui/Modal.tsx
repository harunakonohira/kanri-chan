import styles from './Modal.module.css';
import Input from './Input';
import Button from './Button';
import ButtonWhite from './ButtonWhite';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useRef } from 'react';

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

export default function Modal({
  text,
  isOpen,
  onClose,
  onSuccess,
  buttonText,
  onSubmit,
  initialName = '',
  initialColor = '#9CA3AF',
}: ModalProps) {
  const [folder, setFolder] = useState(initialName);
  const [color, setColor] = useState(initialColor);
  const [error, setError] = useState('');
  const colorInputRef = useRef<HTMLInputElement>(null);

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
  useEffect(() => {
    if (isOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setColor(initialColor);
      setFolder(initialName);
    }
  }, [isOpen, initialColor, initialName]);
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
        <div className={`${styles.row} ${styles.inputNone}`}>
          <div className={styles.colorWrapper}>
            <div
              className={styles.colorSample}
              style={{ '--folder-color': color } as React.CSSProperties}
              onClick={() => colorInputRef.current?.click()}
            ></div>
            <Input
              type='color'
              name='color'
              id='color'
              ref={colorInputRef}
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </div>
          <p className={styles.colorCord}>{color}</p>
        </div>
        {error && <p className={styles.error}>{error}</p>}
        <div className={styles.buttons}>
          <ButtonWhite text='キャンセル' onClick={onClose} />
          <Button
            text={buttonText}
            onClick={() =>
              onSubmit ? onSubmit(folder, color) : addFolder(folder, color)
            }
          />
        </div>
      </div>
    </div>
  );
}
