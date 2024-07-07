"use client";

import React, { useEffect, useRef, useState } from "react";
import Shared from "@shared";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { usePathname } from "next/navigation";

gsap.registerPlugin(useGSAP);

export default function Transition({ children }: { children: React.ReactNode }) {
  const [displayChildren, setDisplayChildren] = useState(children);
  const container = useRef(null);
  const pathname = usePathname();
  const transitionKey = useRef("");

  useEffect(() => {
    if (transitionKey.current !== pathname) {
      transitionKey.current = pathname;
      gsap.to(container.current, { opacity: 1 }).then(() => {
        // setDisplayChildren(children);
        // gsap.to(container.current, { opacity: 1 });
      });
    }
  }, [pathname]);

  return (
    <main className="bg-prime-dark text-prime-white h-screen grid grid-rows-[auto_1fr_auto]">
      <Shared.Navbar />

      <div ref={container}>{displayChildren}</div>

      <Shared.Footer />
    </main>
  );
}
