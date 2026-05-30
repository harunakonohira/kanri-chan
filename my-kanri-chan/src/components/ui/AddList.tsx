import styles from './AddList.module.css';

type AddListProps = {
  text: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export default function AddList({ text, ...restOfProps}: AddListProps) {
  return (
    <button type='button' className={styles.add} {...restOfProps}>
      {text}
    </button>
  );
}
