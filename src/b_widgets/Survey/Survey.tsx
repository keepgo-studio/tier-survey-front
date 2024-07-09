"use client";

import Entities from "@entities";
import Shared, { SharedApi } from "@shared";
import { useEffect, useState } from "react";

export default function Survey({ currentGame }: { currentGame: SupportGame }) {
  const hashedId = Entities.hooks.useAppSelector(Entities.user.selectHashedId);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!hashedId) return;

    setLoading(true);
    SharedApi.query("check-survey", currentGame, { hashedId })
      .then((data) => {
        if (!data) return;

        data.status ===
      })
      .finally(() => setLoading(false));
  }, [currentGame, hashedId]);

  if (!hashedId)
    return (
      <Shared.Frame className="m-auto !w-fit uppercase p-4 text-red">
        wrong connection
      </Shared.Frame>
    );

  return (
    <section className="m-auto max-w-md h-full">
      <Shared.Frame type="large" className="bg-dark-black px-10 py-12 grid">
        {loading ? (
          <Shared.Spinner />
        ) : (
          <form>
            <ul className="uppercase flex flex-col gap-10">
              <li>
                <label htmlFor="password">set survey password</label>

                <div className="h-2" />
                
                <p className="text-sm text-bright-gray">※ not required</p>

                <div className="h-3" />

                <Shared.Frame type="small" className="bg-dimm-dark">
                  <input className="py-3 px-4 bg-transparent block w-full h-full" id="password"/>
                </Shared.Frame>
              </li>

              <li>
                <label htmlFor="time">set time</label>

                <div className="h-2" />

                <p className="text-sm text-purple">※ 분 단위로 작성해 주세요</p>

                <div className="h-3" />

                <Shared.Frame type="small" className="bg-dimm-dark justify-self-end">
                  <input className="py-3 px-4 bg-transparent block w-full h-full" id="time"/>
                </Shared.Frame>
              </li>
            </ul>

            <div className="h-8" />

            <div>
              <Shared.Button type="submit" className="bg-purple justify-self-end">
                설문 시작
              </Shared.Button>
            </div>
          </form>
        )}
      </Shared.Frame>
    </section>
  );
}

