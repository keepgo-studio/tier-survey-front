import Entities from "@entities";
import Shared from "@shared";
import React from "react";
import { RiLogoutBoxLine } from "react-icons/ri";

export default function Signout({
  game
}: {
  game: SupportGame;
}) {
  const dispath = Entities.hooks.useAppDispatch();

  const signOut = () => {
    dispath(Entities.user.logout(game));
  };

  return (
    <div>
      <Shared.Button
        className="border border-border bg-dark !text-xs fcenter gap-2"
        onClick={signOut}
      >
        <RiLogoutBoxLine className="text-base text-red" />
        <span className="text-bright-gray">로그아웃</span>
      </Shared.Button>
    </div>
  );
}
