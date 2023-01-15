import * as React from 'react';

export interface IInputProps {
  label: string;
  type: 'text' | 'number';
  value: string | number;
  onChange: (val: string) => void;
}

const Input: React.FC<IInputProps> = ({
  label,
  type,
  onChange = () => {},
  value = '',
}) => {
  const [isFocused, setIsFocused] = React.useState<boolean>(false);

  const changeHandler = React.useCallback((ev) => {
    onChange(ev.target.value);
  }, []);

  return (
    <div className={'inputWrap ' + (isFocused ? ' active' : '')}>
      <label>{label}:</label>
      <input
        type={type}
        value={value}
        onChange={changeHandler}
        onFocus={() => {
          setIsFocused(true);
        }}
        onBlur={() => {
          setIsFocused(false);
        }}
      />
    </div>
  );
};

export default Input;
