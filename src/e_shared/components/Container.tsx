import React from "react";

export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <section className="p-8 border rounded-lg w-fit">
      {children}
    </section>
  );
}
