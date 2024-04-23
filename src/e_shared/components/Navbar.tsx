"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Anim, SharedHooks } from "@shared";

export default function Navbar() {
  const { AlertModal, asyncOpenClose } = SharedHooks.useModal();

  return (
    <>
      <nav className="p-4 shadow-prime bg-prime-deep-dark text-prime-white flex justify-between items-center">
        <div className="fcenter">
          <Image src="/favicon.png" alt="favicon" width={24} height={24} />
          
          <div className="w-2" />

          <Link href="/" className="flex items-center">
            <Anim.Text>
              <span className="font-light text-sm">Tier Survey</span>
            </Anim.Text>
          </Link>
        </div>

        <div className="fcenter gap-2">
          <span className="uppercase text-sm">region</span>
          <span>-</span>
          <Image
            src="/data/img/region/kr.png"
            width={24}
            height={20}
            alt="logo"
          />
        </div>
      </nav>
      <AlertModal />
    </>
  );
}
