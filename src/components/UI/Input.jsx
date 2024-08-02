const Input = ({
  rightIcon,
  leftIcon,
  type,
  className,
  required,
  ...props
}) => {
  return (
    <div
      className={`${className} flex gap-2 items-center rounded-lg p-2 border-2 border-zinc-200 bg-white`}
    >
      {leftIcon}
      <input
        type={type || "text"}
        {...props}
        required={required || false}
        className="bg-transparent outline-none w-full "
      />
      {rightIcon}
    </div>
  );
};

export default Input;
