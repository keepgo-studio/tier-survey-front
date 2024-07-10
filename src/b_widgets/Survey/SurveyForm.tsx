import Shared, {
  SharedApi,
  SharedHooks,
  SharedUtils,
  SupportGameJsonItem,
} from "@shared";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

export default function SurveyForm({
  hashedId,
  gameInfo,
}: {
  hashedId: string;
  gameInfo: SupportGameJsonItem;
}) {
  const router = useRouter();
  const [statExist, setStatExist] = useState(false);
  const passwordRef = useRef<HTMLInputElement>(null);
  const timeRef = useRef<HTMLInputElement>(null);
  const { asyncOpenClose: confirm, ConfirmModal } = SharedHooks.useModal();

  useEffect(() => {
    SharedApi.query("check-stat-exist", gameInfo["game-name"], {
      hashedId,
    }).then((exist) => setStatExist(Boolean(exist)));
  }, [gameInfo, hashedId]);

  const submitHandler: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const password = passwordRef.current?.value ?? "",
          time = Number(timeRef.current?.value);

    const reply = await confirm(<p>want to create survey?</p>);

    if (time && reply) {
      await SharedApi.query("create-survey", gameInfo["game-name"], {
        password,
        hashedId,
        limitMinute: time
      })
      
      router.refresh();
    }
  };

  return (
    <>
      <form onSubmit={submitHandler}>
        <ul className="uppercase flex flex-col gap-10">
          <li>
            <label htmlFor="input-password">set survey password</label>

            <div className="h-2" />

            <p className="text-sm text-bright-gray">※ not required</p>

            <div className="h-3" />

            <Shared.Frame type="small" className="bg-dimm-dark">
              <input
                ref={passwordRef}
                className="py-3 px-4 bg-transparent block w-full h-full"
                id="input-password"
                name="password"
              />
            </Shared.Frame>
          </li>

          <li>
            <label htmlFor="input-time">set time</label>

            <div className="h-2" />

            <p className="text-sm text-purple">※ 분 단위로 작성해 주세요</p>

            <div className="h-3" />

            <Shared.Frame
              type="small"
              className="bg-dimm-dark justify-self-end"
            >
              <input
                ref={timeRef}
                className="py-3 px-4 bg-transparent block w-full h-full"
                id="input-time"
                name="time"
                required
              />
            </Shared.Frame>
          </li>
        </ul>

        <div className="h-8" />

        <div className="flex items-center gap-4 justify-end">
          {statExist && (
            <Link
              href={SharedUtils.generateStatUrl(
                hashedId,
                gameInfo["game-name"]
              )}
            >
              <Shared.Button
                style={{ backgroundColor: gameInfo["theme-color"] }}
              >
                기존 통계 보기
              </Shared.Button>
            </Link>
          )}

          <Shared.Button type="submit" className="bg-purple">
            설문 시작
          </Shared.Button>
        </div>
      </form>

      <ConfirmModal />
    </>
  );
}
