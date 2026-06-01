import styles from './Task.module.css';
import TaskModal from './TaskModal';
import PriorityBadge from './PriorityBadge';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

type TaskProps = {
  taskId?: string | null;
  taskTitle: string | null;
  taskDate: string | null;
  taskPriority: string | null;
  taskIsDone: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  onSuccess: () => void;
  initialTitle?: string;
  initialDate?: string;
  initialListId?: string;
  initialPriority?: string;
};

export default function Task({
  taskId,
  taskTitle,
  taskDate,
  taskPriority,
  taskIsDone,
  onSuccess,
  initialTitle = '',
  initialDate = '',
  initialListId = '',
  initialPriority = '',
  ...restOfProps
}: TaskProps) {
  const [isOpen, setIsOpen] = useState(false);
  const onEdit = () => {
    setIsOpen(!isOpen);
  };
  const [title, setTitle] = useState(initialTitle);
  const [date, setDate] = useState(initialDate);
  const [listId, setListId] = useState(initialListId);
  const [priority, setPriority] = useState(initialPriority);
  const onDelete = async () => {
    await supabase.from('tasks').delete().eq('id', taskId);
    onSuccess();
  };
  const formattedDate = taskDate ? taskDate.split('-').slice(1).join('/') : '';
  const toggleDone = async () => {
    await supabase
      .from('tasks')
      .update({ is_done: !taskIsDone })
      .eq('id', taskId);
    onSuccess();
  };
  useEffect(() => {
    if (isOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTitle(initialTitle);
      setDate(initialDate);
      setListId(initialListId);
      setPriority(initialPriority);
    }
  }, [isOpen, initialTitle, initialDate, initialListId, initialPriority]);
  return (
    <>
      <div className={styles.task} key={taskId}>
        <div className={styles.taskBlock}>
          <div className={styles.taskCheck}>
            <input
              className={styles.checkbox}
              type='checkbox'
              name=''
              id=''
              checked={taskIsDone}
              onChange={toggleDone}
            />
          </div>
          <div className={styles.taskFolder}></div>
          <p className={taskIsDone ? styles.done : ''}>{taskTitle}</p>
        </div>
        <div className={styles.taskBlock}>
          <PriorityBadge priority={taskPriority} />
          <p className=''>{formattedDate}</p>
          <button className={styles.taskEdit} onClick={onEdit}>
            <svg
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M8.707 19.707L18 10.414L13.586 6L4.293 15.293C4.16506 15.4211 4.07418 15.5814 4.03 15.757L3 21L8.242 19.97C8.418 19.926 8.579 19.835 8.707 19.707ZM21 7.414C21.3749 7.03895 21.5856 6.53033 21.5856 6C21.5856 5.46967 21.3749 4.96106 21 4.586L19.414 3C19.0389 2.62506 18.5303 2.41443 18 2.41443C17.4697 2.41443 16.9611 2.62506 16.586 3L15 4.586L19.414 9L21 7.414Z'
                fill='#F97316'
              />
            </svg>
          </button>
          <button className={styles.taskEdit} onClick={onDelete}>
            <svg
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M6 7H5V20C5 20.5304 5.21071 21.0391 5.58579 21.4142C5.96086 21.7893 6.46957 22 7 22H17C17.5304 22 18.0391 21.7893 18.4142 21.4142C18.7893 21.0391 19 20.5304 19 20V7H6ZM16.618 4L15 2H9L7.382 4H3V6H21V4H16.618Z'
                fill='#EF4444'
              />
            </svg>
          </button>
        </div>
      </div>
      <TaskModal
        text='タスクを編集'
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        buttonText='保存する'
        taskId={taskId ?? ''}
        initialTitle={taskTitle ?? ''}
        initialDate={taskDate ?? ''}
        initialPriority={taskPriority ?? ''}
        onSuccess={onSuccess}
      />
    </>
  );
}
