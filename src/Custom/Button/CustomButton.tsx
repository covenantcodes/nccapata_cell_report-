interface Props {
  border: string;
  bgcolor: string;
  color: string;
  label?: React.ReactNode;
  padding: string;
  radius: string;
  width: string;
  fontFamily: string;
  fontSize: string,
  marginTop: string,
  cursor: string,
  onClick: () => void;
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
}) => {
  return (
    <button
      onClick={onClick}
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
