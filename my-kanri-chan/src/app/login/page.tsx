'use client';

import styles from './Login.module.css';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // ページリロードを防ぐ
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      setError('メールアドレスかパスワードが違います');
    } else {
      router.push('/');
    }
  };

  return (
    <div className={styles.main}>
      <h1 className={styles.h1}>わたしの管理ちゃん</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          type='email'
          name='メールアドレス'
          placeholder='メールアドレス'
          required={true}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id='your-mail'
        />
        <Input
          type='password'
          name='パスワード'
          placeholder='パスワード'
          required={true}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id='your-password'
        />
        <Button text='ログイン'></Button>
        {error && <p className={styles.error}>{error}</p>}
      </form>
    </div>
  );
}
