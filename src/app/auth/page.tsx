import React from "react";
import Widget from "@widgets";

export default function page({
  searchParams: { game, redirect },
}: {
  searchParams: { game?: SupportGame; redirect?: string };
}) {
  return (
    <section className="max-w-5xl m-auto flex-1 p-6">
      <h1 className="uppercase text-bright-gray text-4xl font-light w-full">
        sign in Riot
      </h1>

      <div className="h-12" />

      <div className="w-fit m-auto">
        {game && <Widget.Auth game={game} redirect={redirect}/>}
      </div>
    </section>
  );
}
