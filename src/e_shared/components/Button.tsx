import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export default function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button
      className={
        "rounded-xl py-2 px-5 text-base font-bold" +
        " " +
        (props.disabled
          ? "!cursor-not-allowed !bg-dimm-dark !text-gray"
          : "clickable") +
        " " +
        className
      }
      {...props}
    >
      {children}
    </button>
  );
}
