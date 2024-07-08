import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export default function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button
      className={"rounded-xl py-3 px-6 text-base clickable" + " " + className}
      {...props}
    >
      {children}
    </button>
  );
}
