import React from "react";

interface Props {
  type?: any;
  id?: string;
  value?: any;
  onChange?: (event: any) => void;
  placeholder?: string;
  className?: any;
}
function TextField({
  id,
  type,
  value,
  onChange,
  placeholder,
  className,
}: Props) {
  return (
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`block w-full border-2 border-black px-2 py-2 outline-blue-300 ${className}`}
    />
  );
}

export default TextField;
