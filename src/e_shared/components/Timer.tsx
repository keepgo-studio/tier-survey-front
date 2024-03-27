'use client'

import React, { useCallback, useEffect, useRef } from 'react'
import { delay } from '@shared-inner/utils/utils';

type TimerProps = React.ComponentPropsWithoutRef<"canvas"> & {
	theme?: "primary";
  startTime: number;
  endTime: number;
  totalTime: number;
  width: number;
  height: number;
  onEnd: () => void;
};

export default function Timer({
  theme = 'primary',
  startTime,
  endTime,
  totalTime,
  onEnd,
  ...props
}: TimerProps) {
  if (startTime > endTime || (endTime - startTime) > totalTime) {
    throw new Error("Wrong parameters entered");
  }

  const canvasRef = useRef(null);

  const resize = useCallback(() => {
    if (!canvasRef.current || !window) return;

    const retina = window.devicePixelRatio,
          { width, height } = props,
          canvas = canvasRef.current as HTMLCanvasElement,
          ctx = canvas.getContext('2d');

    if (!ctx) return;

    if (retina > 1) {
      canvas.width = width * retina;
      canvas.height = height * retina;
      ctx.scale(retina, retina);
    } else {
      canvas.width = width;
      canvas.height = height;
    }

    canvas.style.width = String(width) + "px";
    canvas.style.height = String(height) + "px";
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.width, props.height]);

  useEffect(() => {
    resize();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.width, props.height])


// ------------------------------------------------

  const lifeCycle = useRef(false),
        elapsedTime = useRef(Date.now() - startTime),
        prevTime = useRef(0);
        
  const fps = 10;

  const draw = useCallback(() => {
    if (!canvasRef.current || !window) return;

    const { width, height } = props,
          canvas = canvasRef.current as HTMLCanvasElement,
          ctx = canvas.getContext('2d');

    if (!ctx) return;

    const centerX = canvas.width / 2,
          centerY = canvas.height / 2,
          dis = Math.min(canvas.width, canvas.height),
          radius = dis / 2 - dis * 0.04;

    ctx.clearRect(0, 0, width, height);
    ctx.lineCap = "round";
    
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.lineWidth = dis * 0.01;
    ctx.strokeStyle = '#E6E6E6'; // Light grey color
    ctx.stroke();

    const endAngle = ((Math.PI * 2) / totalTime) * elapsedTime.current;

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, -Math.PI / 2, endAngle - Math.PI / 2);
    ctx.lineWidth = dis * 0.015;
    ctx.strokeStyle = '#00BFFF'; // Blue color
    ctx.stroke();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.width, props.height])

  const animation = useCallback(async () => {
    if (!lifeCycle.current) return;

    if (elapsedTime.current >= totalTime) {
      onEnd();
      return;
    }

    const now = Date.now();

    draw();
    elapsedTime.current += now - prevTime.current;
    prevTime.current = now;

    await delay(fps);

    requestAnimationFrame(animation);
  }, [onEnd, draw, totalTime]);

  const ioRef = useRef<IntersectionObserver>(new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !lifeCycle.current) {
      lifeCycle.current = true;
      prevTime.current = Date.now();
      requestAnimationFrame(animation);
    } else {
      lifeCycle.current = false;
    }
  }));

  useEffect(() => {
    if (!canvasRef.current || !window) return;

    const canvas = canvasRef.current as HTMLCanvasElement;
    const io = ioRef.current;

    io.observe(canvas);

    return () => {
      lifeCycle.current = false;
      io.disconnect();
    }
  }, []);

  return (
    <canvas ref={canvasRef} {...props} />
  )
}
