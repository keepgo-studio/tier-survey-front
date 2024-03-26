"use client";

import Shared, { SharedApi, SharedUtils } from "@shared";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import Error from "./Error";
import Entities from "@entities";

export default function InputForm({
  onComplete,
}: {
  onComplete: (url: string) => void;
}) {
  const hashedId = Entities.hooks.useAppSelector(Entities.user.selectHashedId);

  const [keyword, setKeyword] = useState("");
  const [limitMinute, setLimitMinute] = useState(5);

  const currentGame = Entities.hooks.useAppSelector(
    Entities.user.selectCurrentGame
  );
  const router = useRouter();

  useEffect(() => {
    if (currentGame === null) router.replace("/");
  });

  async function onSubmit(e: FormEvent) {
    e.preventDefault();

    const data = await SharedApi.query("create-survey", currentGame!, {
      keyword,
      limitMinute,
      hashedId: hashedId!,
    });

    if (data) onComplete(`${SharedUtils.NEXT_API_URL}/qr/client/${hashedId}`);
  }

  if (!hashedId) return <Error />;

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
