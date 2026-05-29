import styles from './AddList.module.css';
import Link from 'next/link';

type AddListProps = {
  href: string;
  text: string;
};

export default function AddList({ href, text }: AddListProps) {
  return (
    <div className={styles.add}>
      <Link href={href}>{text}</Link>
    </div>
  );
}
