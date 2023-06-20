import React from "react";

interface Props {
  children: any;
  type?: any;
  className?: any;
  onClick?: (e: any) => void;
}
function Button({ type, children, className, onClick }: Props) {
  return (
    <button
      type={type}
      className={`bg-blue-600 px-8 py-1 text-lg text-gray-50
      transition-all duration-300 hover:bg-blue-500 hover:ease-in-out 
      ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
