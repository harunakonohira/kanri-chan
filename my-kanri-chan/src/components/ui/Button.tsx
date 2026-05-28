import styles from './Button.module.css';

type ButtonProps = {
  text: string;
};

export default function Button({ text }: ButtonProps) {
  return (
    <button type='submit' className={styles.button}>
      {text}
    </button>
  );
}
