'use client';

import styles from '@/app/(dashboard)/dashboard.module.css';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import ButtonRed from '@/components/ui/ButtonRed';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';

type ListActionProps = {
  id: string;
  name: string;
  color: string;
};

export default function ListAction({ id, name, color }: ListActionProps) {
  const router = useRouter();
  const handleDelete = async () => {
    await supabase.from('lists').delete().eq('id', id);
    window.location.href = '/';
  };

  const [isOpen, setIsOpen] = useState(false);
  const showModal = () => {
    setIsOpen(!isOpen);
  };

  const editFolder = async (name: string, color: string) => {
    await supabase
      .from('lists')
      .update({ name: name, color: color })
      .eq('id', id);
    setIsOpen(false);
    window.location.reload();
  };

  return (
    <>
      <div className={styles.listButtons}>
        <div className={styles.editButton}>
          <Button text='編集する' onClick={showModal} />
        </div>
        <div className={styles.deleteButton}>
          <ButtonRed text='削除する' onClick={handleDelete} />
        </div>
      </div>
      <Modal
        text='フォルダを編集'
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSuccess={() => router.refresh()}
        onSubmit={editFolder}
        buttonText='保存する'
        initialName={name}
        initialColor={color}
      />
    </>
  );
}
