import styles from './Input.module.css';

type InputProps = {
  id?: string;
  type: string;
  name: string;
  value?: string;
  placeholder?: string;
  required?: boolean;
  pattern?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  ref?: React.Ref<HTMLInputElement>;
  checked?: boolean;
};

export default function Input({
  id = '',
  type,
  name,
  value = '',
  placeholder = '',
  ...restOfProps
}: InputProps) {
  return (
    <input
      className={styles.input}
      id={id}
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
      {...restOfProps}
    />
  );
}
