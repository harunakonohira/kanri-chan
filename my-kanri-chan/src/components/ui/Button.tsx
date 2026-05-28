import styles from './Button.module.css';

type ButtonProps = {
  text: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export default function Button({ text, ...restOfProps }: ButtonProps) {
  return (
    <button type='submit' className={styles.button} {...restOfProps}>
      {text}
    </button>
  );
}
