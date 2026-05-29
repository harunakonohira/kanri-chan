import styles from './FolderLink.module.css';
import Link from 'next/link';

type FolderLinkProps = {
  href: string;
  text: string;
};

export default function FolderLink({ href, text }: FolderLinkProps) {
  return (
    <li className={styles.folder}>
      <Link href={href}>{text}</Link>
    </li>
  );
}
