import styles from './PageLink.module.css';
import Link from 'next/link';

type PageLinkProps = {
  href: string;
  text: string;
};

export default function PageLink({ href, text }: PageLinkProps) {
  return (
    <li className={styles.page}>
      <Link href={href}>{text}</Link>
    </li>
  );
}
