import React from "react";
import Shared, { SharedApi, SharedUtils } from "@shared";
import Widget from "@widgets";

export default async function page({
  searchParams,
}: {
  searchParams: {
    gameName?: string;
    hashedId?: string;
  };
}) {
  const { gameName, hashedId } = searchParams;
  const data = await SharedApi.serverQuery("get-all-support-games", null);
  const currentGame = SharedUtils.toNormalSpace(gameName ?? "") as SupportGame;
  const currentGameInfo = data.find(
    (_item) => _item["game-name"] === currentGame
  );

  if (!hashedId || !gameName || !currentGameInfo)
    return (
      <Shared.Frame className="m-auto !w-fit uppercase p-4 text-red">
        wrong connection
      </Shared.Frame>
    );

  return (
    <div className="max-w-5xl m-auto w-full h-full p-6">
      <Widget.Title gameInfo={currentGameInfo}>Join survey</Widget.Title>

      <div className="m-auto max-w-md">
        <h4 className="uppercase font-light text-xs text-bright-gray mb-3">
          host info.
        </h4>

        <Shared.HostInfo gameInfo={currentGameInfo} hashedId={hashedId} />

        <div className="h-10" />

        <h4
          className="uppercase font-light text-xs mb-3"
          style={{
            color: currentGameInfo["theme-color"],
          }}
        >
          requesting permissions.
        </h4>

        <Widget.PermissionPanel
          currentGame={currentGame}
          hostHashedId={hashedId}
        />
      </div>
    </div>
  );
}
