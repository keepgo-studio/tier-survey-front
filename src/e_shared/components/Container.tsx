import React from "react";

export default function Container({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLDivElement>) {
  return (
    <section
      className={"bg-prime-deep-dark rounded-lg p-8 border border-prime-gray shadow-prime" + " " + className}
      {...props}
    >
      {children}
    </section>
  );
}
