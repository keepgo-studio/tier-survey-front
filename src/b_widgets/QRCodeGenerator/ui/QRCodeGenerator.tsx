"use client";

import React, { Suspense, useState } from "react";
import Shared from "@shared";
import InputForm from "./InputForm";

export default function QRCodeGenerator() {
  const [url, setUrl] = useState("");

  return (
    <div className="p-6">
      {url ? (
        <Shared.QRCode url={url} />
      ) : (
        <Suspense>
          <InputForm onComplete={(url) => setUrl(url)} />
        </Suspense>
      )}
    </div>
  );
}
