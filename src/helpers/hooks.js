import { useState } from 'react';

export const useInput = (initialValue) => {
  const [value, onChange] = useState(initialValue);

  return {
    value,
    onChange(e) {
      onChange(e.target.value);
    },
  };
};

export const useCheckbox = (initialValue) => {
  const [checked, onChange] = useState(initialValue);

  return {
    checked,
    onChange(e) {
      onChange(e.target.checked);
    },
  };
};
