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

export default function Survey({
  gameInfo,
}: {
  gameInfo: SupportGameJsonItem;
}) {
  const hashedId = Entities.hooks.useAppSelector(Entities.user.selectHashedId);
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
    SharedApi.query("check-survey", gameInfo["game-name"], { hashedId })
      .then((data) => {
        if (data) setSurveyInfo(data);
      })
      .finally(() => setLoading(false));
  }, [gameInfo, hashedId, router]);

  if (!hashedId || loading) return <Shared.Spinner />;

  return (
    <div>
      <Shared.Frame
        type="large"
        className="bg-dark-black !px-10 !py-12 !w-fit m-auto"
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
