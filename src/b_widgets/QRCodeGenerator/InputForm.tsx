"use client";

import { FormEvent, useCallback, useState } from "react";
import Shared, { SharedApi, SharedHooks, SharedUtils } from "@shared";
import Entities from "@entities";
import { useSearchParams } from "next/navigation";

function ModalPrompt() {
  return (
    <div>
      <h2>Want to include your self?</h2>

      <p>or you can participate with QR code participants :)</p>
    </div>
  );
}

export default function InputForm({
  onComplete,
}: {
  onComplete: (url: string, limitMinute: number, endTime: number) => void;
}) {
  const MIN_MINUTE = 1,
        MAX_MINUTE = 30;

  const gameName = useSearchParams().get("gameName");

  const hashedId = Entities.hooks.useAppSelector(
    Entities.user.selectHashedId
  );

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [limitMinuteStr, setLimitMinuteStr] = useState("0");

  const { asyncOpenClose, Modal } = SharedHooks.useModal(<ModalPrompt />);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();

    if (hashedId === null) {
      throw new Error("[InputForm] - Cannot get hashedId");
    }

    if (gameName === null) {
      throw new Error("[InputForm] - Cannot get ");
    }

    const limitMinute = Number(limitMinuteStr);

    if (limitMinute < MIN_MINUTE || MAX_MINUTE < limitMinute) {
      alert(`type minute ${MIN_MINUTE} to ${MAX_MINUTE}`);
      return;
    }

    if ((await asyncOpenClose()) === true) {
      console.log("host included!"); // temporary code
    }

    setLoading(true);

    const currentGame = SharedUtils.toNormalSpace(gameName) as SupportGame;

    const data = await SharedApi.query("create-survey", currentGame!, {
      password,
      limitMinute,
      hashedId: hashedId,
    });

    setLoading(false);

    if (data) {
      onComplete(
        SharedUtils.generateQrUrl(hashedId, currentGame),
        limitMinute,
        Date.now() + limitMinute * 60 * 1000
      );
    }
  }

  const kewDownListener: React.KeyboardEventHandler<HTMLInputElement> =
    useCallback((e) => {
      const allowedKeys = [
        "ArrowLeft",
        "ArrowRight",
        "Backspace",
        "Control",
        "Meta",
        "Alt",
        "Enter",
      ];

      if (("0" <= e.key && e.key <= "9") || allowedKeys.includes(e.key)) {
        return;
      }

      e.preventDefault();
    }, []);

  return (
    <>
      <section>
      {loading ? (<Shared.Loading />) : (
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
            onKeyDown={kewDownListener}
            onChange={(e) => setLimitMinuteStr(e.currentTarget.value)}
          />

          <button>Submit</button>
        </form>
      )}
      </section>

      <Modal />
    </>
  );
}
