import { supabase } from '@/lib/supabase';

const priorityOrder: { [key: string]: number } = {
  high: 0,
  medium: 1,
  low: 2,
};

export async function getTasks(listId?: string | null, weekOnly?: boolean, unclassified?: boolean) {
  let query = supabase
    .from('tasks')
    .select('id, list_id, title, due_date, priority, is_done')
    .order('due_date', { ascending: true });

  if (listId) {
    query = query.eq('list_id', listId);
  }

  if (weekOnly) {
    const today = new Date();
    const weekLater = new Date();
    weekLater.setDate(today.getDate() + 7);
    const weekLaterStr = weekLater.toISOString().split('T')[0];
    query = query.lte('due_date', weekLaterStr);
  }

  if(unclassified) {
    query = query.is('list_id', null)
  }

  const { data } = await query;
  return (data ?? []).sort((a, b) => {
    if (a.is_done !== b.is_done) {
      return a.is_done ? 1 : -1;
    }
    if (a.due_date !== b.due_date) {
      return (a.due_date ?? '').localeCompare(b.due_date ?? '');
    }
    return (
      priorityOrder[a.priority ?? 'low'] - priorityOrder[b.priority ?? 'low']
    );
  });
}
