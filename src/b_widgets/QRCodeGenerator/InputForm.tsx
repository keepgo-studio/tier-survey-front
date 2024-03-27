"use client";

import Shared, { SharedApi } from "@shared";
import { FormEvent, useState } from "react";
import Entities from "@entities";
import { generateQrUrl } from "./utils";

export default function InputForm({
  onComplete,
}: {
  onComplete: (url: string, limitMinute: number, endTime: number) => void;
}) {
  const MIN_MINUTE = 1, MAX_MINUTE = 30;

  const hashedId = Entities.hooks.useAppSelector(Entities.user.selectHashedId);
  const currentGame = Entities.hooks.useAppSelector(
    Entities.user.selectCurrentGame
  );

  const [password, setPassword] = useState("");
  const [limitMinuteStr, setLimitMinuteStr] = useState("0");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    
    if (hashedId === null) {
      throw new Error("[InputForm] - Cannot get hashedId");
    }

    const limitMinute = Number(limitMinuteStr);

    if (limitMinute < MIN_MINUTE || MAX_MINUTE < limitMinute) {
      alert(`type minute ${MIN_MINUTE} to ${MAX_MINUTE}`)
      return;
    }

    const data = await SharedApi.query("create-survey", currentGame!, {
      password,
      limitMinute,
      hashedId: hashedId,
    });

    if (data) {
      onComplete(
        generateQrUrl(hashedId),
        limitMinute,
        Date.now() + limitMinute * 60 * 1000
      );
    }
  }

  return (
    <form className="flex flex-col" onSubmit={onSubmit}>
      <label htmlFor="password">setting password</label>

      <Shared.Input
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Shared.Input
        required
        value={limitMinuteStr}
        onKeyDown={(e) => {
          const allowedKeys = [
            "ArrowLeft",
            "ArrowRight",
            "Backspace",
            "Control",
            "Meta",
            "Alt",
            "Enter"
          ];

          if (("0" <= e.key && e.key <= "9") || allowedKeys.includes(e.key)) {
            return;
          }

          e.preventDefault();
        }}
        onChange={(e) => setLimitMinuteStr(e.currentTarget.value)}
      />

      <button>Submit</button>
    </form>
  );
}
