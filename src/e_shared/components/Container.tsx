import React from "react";

export default function Container({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLDivElement>) {
  return (
    <section
      className={"bg-prime-deep-dark shadow-prime p-6 " + className}
      {...props}
    >
      {children}
    </section>
  );
}
