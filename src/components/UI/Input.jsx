const Input = ({
  rightIcon,
  leftIcon,
  onChange,
  onBlur,
  type,
  name,
  id,
  value,
  className,
  placeholder,
  required,
}) => {
  return (
    <div
      className={`${className} flex gap-2 items-center rounded-lg p-2 border-2 border-zinc-200 bg-white`}
    >
      {leftIcon}
      <input
        type={type || "text"}
        placeholder={placeholder}
        name={name}
        id={id}
        onBlur={onBlur}
        onChange={onChange}
        value={value}
        required={required || false}
        className="bg-transparent outline-none w-full "
      />
      {rightIcon}
    </div>
  );
};

export default Input;
