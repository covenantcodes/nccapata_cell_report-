interface Props {
  border: string;
  bgcolor: string;
  color: string;
  children?: React.ReactNode;
  padding: string;
  radius: string;
  width: string;
  onClick: () => void;
}

const CustomButton: React.FC<Props> = ({
  border,
  color,
  bgcolor,
  children,
  padding,
  radius,
  width,
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
        width
      }}
    >
      {children}
    </button>
  );
};

export default CustomButton;
