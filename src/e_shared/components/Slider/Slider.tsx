"use client";

import React, { Children, useEffect, useRef, useState } from "react";
import { attachDragAnimation } from "./slider.core";
import { parseMinMax } from "@shared-inner/utils/utils";

/**
 * 
 * @description
 * 
 * ## Slider Width
 * total width of 'Slider Component' is depends on Parent Component
 * 
 * ## Slider Height
 * total height depends on Item's height
 */
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
    if (index !== undefined && Children.count(children)) {
      const n = Children.count(children),
            val = parseMinMax(index, 0, n - 1);

      setCurrentIdx(() => val);

      if (onMoved) onMoved(val);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  // 내부에서 변경되었을 때, 상위 index 값과 sync
  useEffect(() => {
    if (onMoved) onMoved(currentIdx);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIdx]);


  const rootRef = useRef<HTMLDivElement>(null);
  const cardWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (Children.count(children) > 0 && rootRef.current && cardWrapperRef.current) {
      const cleanup = attachDragAnimation(
        rootRef.current, 
        cardWrapperRef.current,
        (idx) => setCurrentIdx(idx)
      );

      return () => cleanup();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Children.count(children)]);

  return (
    <section className="w-full relative overflow-hidden" ref={rootRef} draggable={false}>
      <div className="absolute top-0 left-0 flex flex-nowrap" ref={cardWrapperRef} draggable={false}>
        {Children.map(children, (child, idx) => (
          <div className="flex-shrink-0" onClick={() => setCurrentIdx(idx)}>{child}</div>
        ))}
      </div>
    </section>
  );
}