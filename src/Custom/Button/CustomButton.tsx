import { MouseEventHandler } from 'react';

interface Props {
  border: string;
  bgcolor: string;
  color: string;
  label?: React.ReactNode;
  padding: string;
  radius: string;
  width: string;
  fontFamily: string;
  fontSize: string;
  marginTop: string;
  cursor: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean; 
}

const CustomButton: React.FC<Props> = ({
  border,
  color,
  bgcolor,
  label,
  padding,
  radius,
  width,
  fontSize,
  fontFamily,
  marginTop,
  cursor,
  onClick,
  disabled, 
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled} 
      style={{
        backgroundColor: bgcolor,
        color: color,
        padding: padding,
        border,
        borderRadius: radius,
        width,
        fontFamily,
        fontSize,
        marginTop,
        cursor
      }}
    >
      {label}
    </button>
  );
};

export default CustomButton;
