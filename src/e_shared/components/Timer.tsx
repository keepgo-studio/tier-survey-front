"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { delay } from "../utils/utils";
import { LexendMega } from "../fonts/fonts";

type TimerProps = {
  theme?: "round" | "text";
  startTime: number;
  duration: number;
  width: number;
  height: number;
  onEnd?: () => void;
};

function RoundTimer({ 
  startTime,
  duration,
  onEnd,
  width,
  height, ...props }: TimerProps) {
  const canvasRef = useRef(null);

  // set size
  useEffect(() => {
    if (!canvasRef.current || !window) return;

    const retina = window.devicePixelRatio,
          canvas = canvasRef.current as HTMLCanvasElement,
          ctx = canvas.getContext("2d");

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
  }, [width, height]);

  // ------------------------------------------------

  const lifeCycle = useRef(false),
        elapsedTime = useRef(Date.now() - startTime);

  const fps = 10;

  const draw = useCallback(() => {
    if (!canvasRef.current || !window) return;

    const canvas = canvasRef.current as HTMLCanvasElement,
          ctx = canvas.getContext("2d");

    if (!ctx) return;

    const centerX = width / 2,
          centerY = height / 2,
          dis = Math.min(width, height),
          radius = dis / 2 - dis * 0.04;

    ctx.clearRect(0, 0, width, height);

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.lineWidth = dis * 0.08;
    ctx.strokeStyle = "#fff";
    ctx.stroke();

    const endAngle = ((Math.PI * 2) / duration) * elapsedTime.current;

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, -Math.PI / 2, endAngle - Math.PI / 2);
    ctx.lineWidth = dis * 0.09;
    ctx.strokeStyle = "#6F46B4";
    ctx.stroke();

  }, [width, height, duration]);

  const animation = useCallback(async () => {
    if (!lifeCycle.current) return;

    if (elapsedTime.current >= duration) {
      if (onEnd) onEnd();
      return;
    }

    draw();
    elapsedTime.current = Date.now() - startTime;

    await delay(fps);

    requestAnimationFrame(animation);
  }, [onEnd, draw, duration, startTime]);

  const controlAnimation = (state: "on" | "off") => {
    switch (state) {
      case "on":
        lifeCycle.current = true;
        elapsedTime.current = Date.now() - startTime;
        requestAnimationFrame(animation);
        break;
      case "off":
        lifeCycle.current = false;
        break;
    }
  };

  const ioRef = useRef<IntersectionObserver>(
    new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !lifeCycle.current) {
        controlAnimation("on");
      } else {
        controlAnimation("off");
      }
    })
  );

  const handleVisibility = () => {
    controlAnimation("off");

    if (document.visibilityState === "visible") {
      controlAnimation("on");
    }
  };

  useEffect(() => {
    if (!canvasRef.current || !window) return;

    const canvas = canvasRef.current as HTMLCanvasElement;
    const io = ioRef.current;

    io.observe(canvas);

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      lifeCycle.current = false;
      io.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <canvas ref={canvasRef} {...props} />;
}

function TextTimer({ onEnd, startTime, duration, width, height }: TimerProps) {
  const [elapsedTime, setElapsedTime] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval>>();
  const [tick, setTick] = useState(false);

  const interval = useCallback(() => {
    const current = duration - (Date.now() - startTime);

    if (current <= 0) {
      setTick(true);
      clearInterval(timerRef.current);
      if (onEnd) onEnd();
      return;
    }

    setElapsedTime(current);
    setTick(prev => !prev);
  }, [duration, onEnd, startTime]);

  useEffect(() => {
    interval();
    timerRef.current = setInterval(interval, 1000);

    return () => clearInterval(timerRef.current);
  }, [interval]);

  const hoursNum = Math.floor(elapsedTime / 3600000);
  const hours = hoursNum.toString().padStart(2, '0');
  const minutes = Math.floor((elapsedTime % 3600000) / 60000).toString().padStart(2, '0');
  const seconds = Math.floor((elapsedTime % 3600000) % 60000 / 1000).toString().padStart(2, '0');
  const fontSize = width / (4 + (hoursNum > 0 ? hours.length - 1 : 0));

  return (
    <div
      style={{
        width,
        height,
        fontSize,
        display: 'flex',
        alignItems: 'center',
        fontWeight: 300,
        userSelect: 'none'
      }}
      className={LexendMega.className}
    >
      {hours !== '00' && (
        <>
        <span className="flex-1">{hours}</span>
        <span className={tick ? "pb-[.2em]" : "opacity-0"}>:</span>  
        </>
      )}
      <span className="flex-1 text-center">{minutes}</span>
      <span className={tick ? "pb-[.2em]" : "opacity-0"}>:</span>
      <span className="flex-1 text-center">{seconds}</span>
    </div>
  );
}

export default function Timer({ theme, ...props }: TimerProps) {
  if (theme === "round") return <RoundTimer {...props} />;
  else if (theme === "text") return <TextTimer {...props} />;
}
