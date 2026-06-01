import styles from './PriorityBadge.module.css'

type PriorityBadgeProps = {
  priority: string | null;
}

export default function PriorityBadge({priority}: PriorityBadgeProps) {
    const labels: { [key: string]: string } = {
    high: '高',
    medium: '中',
    low: '低',
  };
  if (!priority) return null;
  return(
    <div className={`${styles.badge} ${styles[priority]}`}>
      {labels[priority]}
    </div>
  );
}