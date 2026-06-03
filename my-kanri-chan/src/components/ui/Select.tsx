import styles from './Select.module.css';

type SelectProps = {
  first: string;
  name: string;
  id: string;
  options: { value: string; label: string }[];
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
};

export default function Select({ first, name, id, options, value='', onChange }: SelectProps) {
  return (
    <select name={name} id={id} value={value} onChange={onChange} className={styles.select}>
      <option value=''>{first}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
