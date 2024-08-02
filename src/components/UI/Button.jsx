const Button = ({ className, onClick, type, children, disabled }) => {
  return (
    <button
      disabled={disabled || false}
      className={`${className} flex-center gap-2 px-3  sm:px-5 py-2 text-base sm:text-lg transition-colors font-semibold`}
      type={type || "button"}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
