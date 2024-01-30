import React, { useState } from 'react';
import './CustomInput.css';

interface CustomInputProps {
  label: string;
  width?: string;
  type?: string; // Add the type prop
}

const CustomInput: React.FC<CustomInputProps> = ({ label, width, type }) => {
  const [value, setValue] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <div className="custom-input">
      <input
        type={type || 'text'} // Use the provided type or default to 'text'
        value={value}
        onChange={handleChange}
        style={{ width: width || '200px' }}
        placeholder={label}
      />
    </div>
  );
};

export default CustomInput;
