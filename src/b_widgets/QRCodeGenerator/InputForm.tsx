"use client";

import Shared, { SharedApi } from "@shared";
import { FormEvent, useState } from "react";
import Entities from "@entities";
import { generateQrUrl } from "./utils";

export default function InputForm({
  onComplete,
}: {
  onComplete: (url: string) => void;
}) {
  const hashedId = Entities.hooks.useAppSelector(Entities.user.selectHashedId);
  const currentGame = Entities.hooks.useAppSelector(
    Entities.user.selectCurrentGame
  );

  const [keyword, setKeyword] = useState("");
  const [limitMinute, setLimitMinute] = useState(5);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();

    if (hashedId === null) {
      throw new Error('[InputForm] - Cannot get hashedId');
    }

    const data = await SharedApi.query("create-survey", currentGame!, {
      keyword,
      limitMinute,
      hashedId: hashedId,
    });

    if (data) onComplete(generateQrUrl(hashedId));
  }

  return (
    <form className="flex flex-col" onSubmit={onSubmit}>
      <Shared.Input
        value={keyword}
        required
        onChange={(e) => setKeyword(e.target.value)}
      />

      <Shared.Input
        type="number"
        required
        min={5}
        max={30}
        value={limitMinute}
        onChange={(e) => setLimitMinute(Number(e.target.value))}
      />

      <button>Submit</button>
    </form>
  );
}
