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
  const [loading, setLoading] = useState(true);
  const [statExist, setStatExist] = useState(false);
  const passwordRef = useRef<HTMLInputElement>(null);
  const timeRef = useRef<HTMLInputElement>(null);
  const { asyncOpenClose: confirm, ConfirmModal } = SharedHooks.useModal();

  useEffect(() => {
    setLoading(true);
    SharedApi.query("check-stat-exist", gameInfo["game-name"], {
      hashedId,
    })
      .then((exist) => setStatExist(Boolean(exist)))
      .finally(() => setLoading(false));
  }, [gameInfo, hashedId]);

  const submitHandler: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const password = passwordRef.current?.value ?? "",
          time = Number(timeRef.current?.value);

    const reply = await confirm(
      "create new survey",
      <p>
        새로운 설문을 만듭니다.
        <br/>
        만약 기존 설문이 있다면, 기존 설문은 <span className="text-red">없어집니다.</span>
        <br/>
        <br/>
        그래도 괜찮으십니까? <span className="text-bright-gray">(첫 설문이면 괜찮습니다.)</span>
      </p>
    );

    if (time && reply) {
      setLoading(true);
      await SharedApi.query("create-survey", gameInfo["game-name"], {
        password,
        hashedId,
        limitMinute: time
      })
      .finally(() => setLoading(false));

      // await SharedApi.query("save-stat", gameInfo["game-name"], {
      //   apiType: "SUMMONER-V4",
      //   hashedId,
      //   hostHashedId: null
      // })
      
      router.refresh();
    }
  };

  if (loading) return <Shared.Spinner />

  return (
    <>
      <form onSubmit={submitHandler} className="max-w-md">
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
              <Shared.Button className="bg-blue">
                기존 설문 보기
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
