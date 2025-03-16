import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react';

import { Button } from './button';

interface RadioButtonProps {
  children: ReactNode;
  defaultValue: string;
  onChange: (value: string) => void;
}

const RadioButtonContext = createContext<{ value: string; onChange: RadioButtonProps['onChange'] } | undefined>(
  undefined,
);

const RadioButton = ({ children, defaultValue, onChange }: RadioButtonProps) => {
  const [value, setValue] = useState(defaultValue);

  const handleChange = useCallback(
    (value: string) => {
      setValue(value);
      onChange(value);
    },
    [onChange],
  );

  return (
    <RadioButtonContext.Provider value={useMemo(() => ({ value, onChange: handleChange }), [value, handleChange])}>
      <div>{children}</div>
    </RadioButtonContext.Provider>
  );
};

interface RadioButtonItemProps {
  children: ReactNode;
  value: string;
}

const RadioButtonItem = ({ children, value }: RadioButtonItemProps) => {
  const radioButtonContext = useContext(RadioButtonContext);

  if (!radioButtonContext) {
    throw new Error('RadioButtonItem must be placed within a RadioButton.');
  }

  const handleClick = () => {
    if (value === radioButtonContext.value) {
      return;
    }

    radioButtonContext.onChange(value);
  };

  return (
    <Button
      variant={value === radioButtonContext.value ? 'secondary' : 'link'}
      className="cursor-pointer"
      onClick={handleClick}
    >
      {children}
    </Button>
  );
};

export { RadioButton, RadioButtonItem };
