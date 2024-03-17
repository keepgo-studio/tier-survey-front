"use client";

import React, { Children, useEffect, useRef, useState } from "react";
import { parseMinMax } from "@/e_shared/utils/utils";
import { attachDragAnimation } from "./slider.core";

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

      const val = parseMinMax(index, 0, n - 1);
      setCurrentIdx(() => val);

      if (onMoved) onMoved(val);
    }
  }, [index]);

  // 내부에서 변경되었을 때, 상위 index 값과 sync
  useEffect(() => {
    if (onMoved) onMoved(currentIdx);
  }, [currentIdx]);


  const rootRef = useRef<HTMLDivElement>(null);
  const cardWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (rootRef.current && cardWrapperRef.current) {
      attachDragAnimation(rootRef.current, cardWrapperRef.current, "100%");
    }
  }, []);

  return (
    <section className="w-full relative overflow-hidden" ref={rootRef}>
      <div className="absolute top-0 left-0 flex flex-nowrap  gap-4" ref={cardWrapperRef}>
        {Children.map(children, (child) => (
          <div className="flex-shrink-0">{child}</div>
        ))}
      </div>
    </section>
  );
}