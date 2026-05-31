import styles from './Select.module.css';

type SelectProps = {
  name: string;
  id: string;
  options: { value: string; label: string }[];
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
};

export default function Select({ name, id, options, value='', onChange }: SelectProps) {
  return (
    <select name={name} id={id} value={value} onChange={onChange} className={styles.select}>
      <option value=''>未分類</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
