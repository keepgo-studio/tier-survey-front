"use client";

import Entities from "@entities";
import Shared, {
  CheckSurveyResponse,
  SharedApi,
  SupportGameJsonItem,
} from "@shared";
import { useEffect, useState } from "react";
import QRScreen from "./QRScreen";
import SurveyForm from "./SurveyForm";

export default function Survey({
  gameInfo,
}: {
  gameInfo: SupportGameJsonItem;
}) {
  const hashedId = Entities.hooks.useAppSelector(Entities.user.selectHashedId);
  const [surveyInfo, setSurveyInfo] = useState<CheckSurveyResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!hashedId) return;

    setLoading(true);
    SharedApi.query("check-survey", gameInfo["game-name"], { hashedId })
      .then((data) => {
        if (data) setSurveyInfo(data);
      })
      .finally(() => setLoading(false));
  }, [gameInfo, hashedId]);

  if (!hashedId)
    return (
      <Shared.Frame className="m-auto !w-fit uppercase p-4 text-red">
        wrong connection
      </Shared.Frame>
    );

  return (
    <div>
      <Shared.Frame
        type="large"
        className="bg-dark-black !px-10 !py-12 !w-fit m-auto"
      >
        {loading ? (
          <Shared.Spinner />
        ) : surveyInfo?.status === "open" ? (
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
