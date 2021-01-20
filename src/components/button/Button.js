import "./button.css";

const Button = ({
  children,
  onClick,
  disabled = false,
  className = "normal-button",
  marginTop = "28px",
}) => {
  return (
    <button
      onClick={onClick ? onClick : undefined}
      disabled={disabled}
      style={{
        opacity: disabled && 0.7,
        cursor: disabled && "not-allowed",
        marginTop: marginTop,
      }}
      className={className}
    >
      {children}
    </button>
  );
};

export default Button;
