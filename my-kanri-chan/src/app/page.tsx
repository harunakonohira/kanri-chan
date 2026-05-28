'use client';

// import Image from "next/image";
import styles from './page.module.css';
import Button from '@/components/ui/Button';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      setError('ログインできませんでした');
    } else {
      router.push('/login');
    }
  };

  return (
    <>
      <Button text='ログアウト' onClick={handleLogout}></Button>
      {error && <p className={styles.error}>{error}</p>}
    </>
  );
}
