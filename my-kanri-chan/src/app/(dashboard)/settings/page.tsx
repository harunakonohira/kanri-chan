'use client';

import styles from '../dashboard.module.css';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function Settings() {
  const [userEmail, setUserEmail] = useState('');

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

  return (
    <div className={styles.dashboard}>
      <div className={styles.listTitle}>
        <h1 className={styles.pageTitle}>設定</h1>
      </div>
      <div className={styles.settingRow}>
        <p className={styles.settingLabel}>メールアドレス</p>
        <p className={styles.settingValue}>{userEmail}</p>
      </div>
    </div>
  );
}
