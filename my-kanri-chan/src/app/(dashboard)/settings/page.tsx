'use client';

import styles from '../dashboard.module.css';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function Settings() {
  const [userEmail, setUserEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  async function getUserEmail() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      const userEmail = user.email;
      return userEmail;
    }
  }

  useEffect(() => {
    const load = async () => {
      const data = await getUserEmail();
      setUserEmail(data ?? '');
    };
    load();
  }, []);

  const updateUserPassword = async () => {
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) {
      setMessage('変更に失敗しました');
    } else {
      setMessage('パスワードを変更しました');
      setNewPassword('');
    }
  };

  return (
    <div className={styles.dashboard}>
      <div className={styles.listTitle}>
        <h1 className={styles.pageTitle}>設定</h1>
      </div>
      <div className={styles.settings}>
        <div className={styles.settingRow}>
          <p className={styles.settingLabel}>メールアドレス</p>
          <p className={styles.settingValue}>{userEmail}</p>
        </div>
        <div className={styles.settingRow}>
          <p className={styles.settingLabel}>パスワードの変更</p>
          <div className={styles.passwordWrapper}>
            <div className={styles.passwordInput}>
              <Input
                type='password'
                name='password'
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder='新しいパスワード'
              />
            </div>
            <div className={styles.passwordButton}>
              <Button text='変更する' onClick={updateUserPassword} />
            </div>
          </div>
          {message && <p className={styles.message}>{message}</p>}
        </div>
      </div>
    </div>
  );
}
