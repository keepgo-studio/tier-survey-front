'use client'

import Shared, { SharedApi, SharedUtils } from "@shared";
import { useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import Error from "./Error";

export default function InputForm({ onComplete }: { onComplete: (url: string) => void }) {
  const hashedId = useSearchParams().get("hashed-id");
  const [keyword, setKeyword] = useState("");
  const [limitMinute, setLimitMinute] = useState(5);

  if (!hashedId) return <Error />;

  async function onSubmit(e: FormEvent) {
    e.preventDefault();

    const data = await SharedApi.query("create-survey", {
      keyword,
      limitMinute,
      hashedId: hashedId!
    });

    if (data) onComplete(`${SharedUtils.NEXT_API_URL}/qr/client/${hashedId}`);
  }

  return (
    <form className="flex flex-col" onSubmit={onSubmit}>
      <Shared.Input
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />

      <Shared.Input
        type="number"
        min={5}
        max={30}
        value={limitMinute}
        onChange={(e) => setLimitMinute(Number(e.target.value))}
      />
      <button>Submit</button>
    </form>
  );
}