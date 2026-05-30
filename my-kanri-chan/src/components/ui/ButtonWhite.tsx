import styles from './ButtonWhite.module.css';

type ButtonWhiteProps = {
  text: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export default function ButtonWhite({ text, ...restOfProps }: ButtonWhiteProps) {
  return (
    <button type='submit' className={styles.button} {...restOfProps}>
      {text}
    </button>
  );
}
