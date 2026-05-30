import styles from './ButtonRed.module.css';

type ButtonRedProps = {
  text: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export default function ButtonRed({ text, ...restOfProps }: ButtonRedProps) {
  return (
    <button type='submit' className={styles.button} {...restOfProps}>
      {text}
    </button>
  );
}
