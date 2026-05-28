import styles from './Input.module.css';

type InputProps = {
  id?: string;
  type: string;
  name: string;
  defaultValue?: string;
  placeholder?: string;
  required?: boolean;
  pattern?: string;
};

export default function Input({
  id = '',
  type,
  name,
  defaultValue = '',
  placeholder = '',
  ...restOfProps
}: InputProps) {
  return (
    <input
      className={styles.input}
      id={id}
      type={type}
      name={name}
      defaultValue={defaultValue}
      placeholder={placeholder}
      {...restOfProps}
    />
  );
}
