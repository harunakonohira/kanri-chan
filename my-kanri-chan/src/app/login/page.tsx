import styles from "./Login.module.css"
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

export default function Login() {
  return (
    <div className={styles.main}>
      <h1 className={styles.h1}>わたしの管理ちゃん</h1>
      <form className={styles.form}>
        <Input
          type='email'
          name='メールアドレス'
          placeholder='メールアドレス'
          required={true}
          id='your-mail'
        />
        <Input
          type='password'
          name='パスワード'
          placeholder='パスワード'
          required={true}
          id='your-password'
        />
        <Button text='ログイン'></Button>
        <p className={styles.error}>エラーメッセージ</p>
      </form>
    </div>
  );
}
