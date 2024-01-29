import { useState } from 'react';
import './CustomInput.css'


interface CustomInputProps {
  label: string;
  width?: string; 
}

const CustomInput: React.FC<CustomInputProps> = ({ label, width }) => {
  const [value, setValue] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <div className="custom-input">
      <input
        type="text"
        value={value}
        onChange={handleChange}
        style={{ width: width || '200px' }} 
        placeholder={label} 
      />
    </div>
  );
};

export default CustomInput;
