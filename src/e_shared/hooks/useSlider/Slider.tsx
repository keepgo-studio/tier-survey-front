"use client";

import React, { Children, useEffect, useRef, useState } from "react";
import { parseNumMinMax } from "@/e_shared/utils/utils";
import MouseCoor from "./MouseCoor";

export default function Slider({
  children,
  onMoved,
  index,
}: {
  children: React.ReactNode;
  onMoved?: (idx: number) => void;
  index?: number;
}) {
  const [currentIdx, setCurrentIdx] = useState(0);

  // 외부에서 변경되었을 때, 상위 index 값과 sync
  useEffect(() => {
    if (index !== undefined) {
      const n = Children.count(children);

      const val = parseNumMinMax(index, 0, n - 1);
      setCurrentIdx(() => val);

      if (onMoved) onMoved(val);
    }
  }, [index]);

  // 내부에서 변경되었을 때, 상위 index 값과 sync
  useEffect(() => {
    if (onMoved) onMoved(currentIdx);
  }, [currentIdx]);

  const containerRef = useRef<HTMLDivElement>(null);
  const cardWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current && cardWrapperRef.current) {
      const container = containerRef.current,
        cardWrapper = cardWrapperRef.current;
      // [...cardWrapper.children]
      container.style.width = String(cardWrapper.offsetWidth) + "px";
      container.style.height = String(cardWrapper.offsetHeight) + "px";

      const coor = new MouseCoor();
      
      container.addEventListener("mousedown", (e) => {
        coor.mousedown(e.x, e.y);
      });

      (["mouseup", "mouseleave"] as const).forEach((eventName) =>
        container.addEventListener(eventName, (e) => {
          if (!coor.isMouseDown) return;

          const velocity = coor.mouseup(e.x, e.y);
        })
      );
    }
  }, []);

  return (
    <section className="relative" ref={containerRef}>
      <div className="absolute flex flex-nowrap" ref={cardWrapperRef}>
        {Children.map(children, (child) => (
          <div className="">{child}</div>
        ))}
      </div>
    </section>
  );
}

// const moveSlide = (dir: "+1" | "-1") => {
//   const n = Children.count(children);
//   let d = dir === "+1" ? 1 : -1;

//   setCurrentIdx(prev => parseNumMinMax(prev + d, 0, n - 1));
// }
