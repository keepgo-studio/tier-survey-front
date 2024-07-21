"use client";

import Entities from "@entities";
import Shared, {
  SharedApi,
  SharedUtils,
  SupportGameJsonItem,
  Survey as FS_Survey,
} from "@shared";
import { useEffect, useState } from "react";
import QRScreen from "./QRScreen";
import SurveyForm from "./SurveyForm";
import { useRouter } from "next/navigation";
import Signout from "../Signout/Signout";

export default function Survey({
  gameInfo,
}: {
  gameInfo: SupportGameJsonItem;
}) {
  const router = useRouter();

  const hashedIdMap = Entities.hooks.useAppSelector(Entities.user.selectHashedId);
  const hashedId = hashedIdMap[gameInfo["game-name"]];
  
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [surveyInfo, setSurveyInfo] = useState<FS_Survey | null>(null);

  useEffect(() => {
    if (!hashedId) {
      const redirect = SharedUtils.generateHostQRUrl(gameInfo["game-name"]);
      router.push(SharedUtils.generateSignInUrl(gameInfo["game-name"], redirect));
      return;
    }

    setLoading(true);
    SharedApi.query("getSurvey", gameInfo["game-name"], { hashedId })
      .then((data) => {
        if (data) {
          const { limitMinute, startTime } = data;
          const endTime = startTime + limitMinute * 60 * 1000;

          setIsOpen(endTime > Date.now());
          setSurveyInfo({ ...data });
        }
      })
      .finally(() => setLoading(false));
  }, [gameInfo, hashedId, router]);

  if (!hashedId || loading) return <Shared.Spinner />;

  return (
    <div className="flex flex-col gap-4">
      {hashedId && <Signout game={gameInfo["game-name"]} />}

      <Shared.Frame
        type="large"
        className="bg-dark-black !p-6 sm:!px-10 sm:!py-12 !w-fit m-auto"
      >
        {isOpen ? (
          <QRScreen
            gameInfo={gameInfo}
            password={surveyInfo!.password}
            limitMinute={surveyInfo!.limitMinute}
            startTime={surveyInfo!.startTime}
            hashedId={hashedId}
          />
        ) : (
          <SurveyForm gameInfo={gameInfo} hashedId={hashedId} />
        )}
      </Shared.Frame>
    </div>
  );
}
