"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import Shared from "@shared";

export default function Navbar() {
  return (
    <nav className="w-full py-4 px-6 flex items-center justify-between border-b-[0.5px] border-border">
      <Link href="/" className="clickable">
        <div className="flex items-center gap-3">
          <Shared.Frame className="w-12 h-12 fcenter" type="small">
            <Image src="/favicon.png" alt="favicon" width={26} height={26} />
          </Shared.Frame>
          <span className="text-sm uppercase">tier survey</span>
        </div>
      </Link>

      <Shared.Frame type="small" className="fcenter gap-2 py-3 px-4">
        <span className="uppercase text-xs font-light">region</span>
        <Image
          src="/data/img/region/kr.png"
          width={24}
          height={20}
          alt="logo"
        />
      </Shared.Frame>
    </nav>
  );
}
