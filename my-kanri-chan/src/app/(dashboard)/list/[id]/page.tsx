import styles from '@/app/(dashboard)/dashboard.module.css';
import { createClient } from '@/lib/supabase-server';
import ListAction from './ListAction';
import TaskList from '@/components/layout/TaskList';

type ListProps = {
  params: Promise<{ id: string }>;
};

export default async function List({ params }: ListProps) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase.from('lists').select('*').eq('id', id);
  const pageTitle = data?.[0]?.name;

  return (
    <div className={styles.dashboard}>
      <div className={styles.listTitle}>
        <h1 className={styles.pageTitle}>{pageTitle}</h1>
        <ListAction
          id={id}
          name={data?.[0]?.name ?? ''}
          color={data?.[0]?.color ?? ''}
        />
      </div>
      <TaskList />
    </div>
  );
}
