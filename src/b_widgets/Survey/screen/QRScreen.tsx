import Entities from '@entities'
import Shared, { SharedUtils } from '@shared';
import Link from 'next/link';
import React, { useState } from 'react'

export default function QRScreen({
  hashedId,
  currentGame,
  onEnd,
}: {
  hashedId: string;
  currentGame: SupportGame;
  onEnd: () => void;
}) {
  const url = SharedUtils.generateParticipantQRUrl(
    hashedId,
    currentGame
  );

  const selector = Entities.hooks.useAppSelector,
        disptach = Entities.hooks.useAppDispatch(),
        { setOpen } = Entities.survey;

  const limitMinute = selector(Entities.survey.selectLimitMinute) ?? 0,
        endTime = selector(Entities.survey.selectEndTime) ?? 0;

  const totalTime = limitMinute * 60 * 1000;
  const startTime = endTime - totalTime;

  const [isCopied, setIsCopied] = useState(false);
  
  function copyHandler() {
    navigator.clipboard.writeText(url);
    setIsCopied(true);
  }

  return (
    <div>
      <Shared.Timer
        startTime={startTime}
        endTime={endTime}
        totalTime={totalTime}
        width={400}
        height={400}
        onEnd={() => onEnd}
      />

      <Shared.QRCode url={url} />

      <Link href={url} target="_blank">
        <Shared.Container>Join survey</Shared.Container>
      </Link>
      
      <button onClick={copyHandler}>
        Copy QR URL {isCopied && '✅'}
      </button>

      <button onClick={() => disptach(setOpen(false))}>
        New survey
      </button>
    </div>
  )
}
