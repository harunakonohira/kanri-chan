import styles from './FolderLink.module.css';
import Link from 'next/link';

type FolderLinkProps = {
  href: string;
  text: string;
  color: string;
};

export default function FolderLink({ href, text, color }: FolderLinkProps) {
  return (
    <li
      className={styles.folder}
      style={{ '--folder-color': color } as React.CSSProperties}
    >
      <Link href={href}>{text}</Link>
    </li>
  );
}
