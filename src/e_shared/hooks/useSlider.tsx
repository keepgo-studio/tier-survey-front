'use client'

import Slider from '@shared-inner/components/Slider/Slider';
import React, { useCallback, useState } from 'react'

export default function useSlider() {
  const [currentIdx, setCurrentIdx] = useState(0);

  const onMovedHandler = useCallback(
    (idx: number) => setCurrentIdx(idx)
    ,[]
  );

  const renderSlider = (children: React.ReactNode) => (
    <Slider
      index={currentIdx}
      onMoved={onMovedHandler}
    >
      {children}
    </Slider>
  );

  return {
    moveNext: () => setCurrentIdx(currentIdx + 1),
    movePrev: () => setCurrentIdx(currentIdx - 1),
    renderSlider
  }
}
