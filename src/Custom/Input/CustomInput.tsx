import React, { useState } from 'react';
import './CustomInput.css';

interface CustomInputProps {
  label: string;
  width?: string;
  type?: string;
  validations?: ((value: string) => JSX.Element | undefined)[];
}

const CustomInput: React.FC<CustomInputProps> = ({ label, width, type, validations }) => {
  const [value, setValue] = useState('');
  const [validationError, setValidationError] = useState<JSX.Element | undefined>(undefined);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    if (validations) {
      let error: JSX.Element | undefined;
      for (const validate of validations) {
        error = validate(event.target.value);
        if (error) break; // Exit loop if there's a validation error
      }
      setValidationError(error);
    }
  };

  return (
    <div className="custom-input">
      <input
        type={type || 'text'}
        value={value}
        onChange={handleChange}
        style={{ width: width || '200px' }}
        placeholder={label}
      />
      {validationError && validationError}
    </div>
  );
};

export default CustomInput;
