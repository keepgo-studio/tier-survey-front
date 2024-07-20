"use client";

import Entities from "@entities";
import Shared, {
  CheckSurveyResponse,
  SharedApi,
  SharedUtils,
  SupportGameJsonItem,
} from "@shared";
import { useEffect, useState } from "react";
import QRScreen from "./QRScreen";
import SurveyForm from "./SurveyForm";
import { useRouter } from "next/navigation";
import Signout from "../Signout.tsx/Signout";

export default function Survey({
  gameInfo,
}: {
  gameInfo: SupportGameJsonItem;
}) {
  const hashedIdMap = Entities.hooks.useAppSelector(Entities.user.selectHashedId);
  const hashedId = hashedIdMap[gameInfo["game-name"]];
  const [surveyInfo, setSurveyInfo] = useState<CheckSurveyResponse | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    if (!hashedId) {
      const redirect = SharedUtils.generateHostQRUrl(gameInfo["game-name"]);
      router.push(
        SharedUtils.generateSignInUrl(gameInfo["game-name"], redirect)
      );
      return;
    }

    setLoading(true);
    SharedApi.query("checkSurvey", gameInfo["game-name"], { hashedId })
      .then((data) => {
        if (data) setSurveyInfo(data);
      })
      .finally(() => setLoading(false));
  }, [gameInfo, hashedId, router]);

  if (!hashedId || loading) return <Shared.Spinner />;

  return (
    <div className="flex flex-col gap-4">
      {hashedId && <Signout />}

      <Shared.Frame
        type="large"
        className="bg-dark-black !p-6 sm:!px-10 sm:!py-12 !w-fit m-auto"
      >
        {surveyInfo?.status === "open" ? (
          <QRScreen
            gameInfo={gameInfo}
            limitMinute={surveyInfo.data!.limitMinute}
            startTime={surveyInfo.data!.startTime}
            hashedId={hashedId}
          />
        ) : (
          <SurveyForm gameInfo={gameInfo} hashedId={hashedId} />
        )}
      </Shared.Frame>
    </div>
  );
}
