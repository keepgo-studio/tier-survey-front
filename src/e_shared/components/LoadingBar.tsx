'use client'

import React, { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation';
import NProgress from "nprogress";
import "nprogress/nprogress.css";

export default function LoadingBar() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  NProgress.configure({
    showSpinner: false,
    minimum: 0.1,
    speed: 300,
    easing: "ease",
    trickle: true,
    trickleSpeed: 500,
  });

  useEffect(() => {
    NProgress.start();

    NProgress.done(false);
  }, [pathname, searchParams]);

  return (
    <></>
  )
}
