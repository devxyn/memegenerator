interface ButtonProps {
  styles: string;
  label: string;
  onClick: () => void;
}

const Button = ({ styles, label, onClick }: ButtonProps) => {
  return (
    <button type='button' className={`text-white px-4 py-2 rounded hover:cursor-pointer ${styles}`} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
