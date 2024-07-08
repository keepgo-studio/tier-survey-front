import React from "react";

interface FrameProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: "small" | "middle" | "large";
}

export default function Frame({
  children,
  className,
  type = "middle",
  ...props
}: FrameProps) {
  switch (type) {
    case "small":
      return (
        <section 
          {...props}
          className={"shadow-basic rounded-lg border-border p-1 border-[0.5px]" + " " + className}
        >
          {children}
        </section>
      );
    case "middle":
      return (
        <section 
          {...props}
          className={"shadow-basic rounded-2xl border-border p-2 border" + " " + className}
        >
          {children}
        </section>
      );
    case "large":
      return (
        <section 
          {...props}
          className={"shadow-basic rounded-3xl border-border p-3 border-2" + " " + className}
        >
          {children}
        </section>
      );
  }
}
