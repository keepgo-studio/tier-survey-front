import Entities from "@entities";
import Shared, { SharedApi, SharedHooks } from "@shared";
import React, { FormEvent, useState } from "react";

export default function QRMakerScreen({
  currentGame,
}: {
  currentGame: SupportGame;
}) {
  const MIN_MINUTE = 1;

  const selector = Entities.hooks.useAppSelector,
        disptach = Entities.hooks.useAppDispatch(),
        { setOpen, setLimitMinute, setEndTime } = Entities.survey;

  const hashedId = selector(Entities.user.selectHashedId);
  const endTime = selector(Entities.survey.selectEndTime) ?? 0,
        isSurveyExist = Date.now() < endTime;

  const [password, setPassword] = useState("");
  const [minute, setMinute] = useState(MIN_MINUTE);

  const { asyncOpenClose: confirm, ConfirmModal } = SharedHooks.useModal();

  async function onSubmit(e: FormEvent) {
    e.preventDefault();

    if (hashedId === null) {
      throw new Error("[InputForm]: Cannot get hashedId");
    }

    if (minute < MIN_MINUTE) {
      return;
    }

    if ((await confirm("Want to create survey?")) === false) {
      return;
    }

    const data = await SharedApi.query("create-survey", currentGame!, {
      password,
      limitMinute: minute,
      hashedId: hashedId,
    });

    if (data) {
      disptach(setLimitMinute(minute));
      disptach(setEndTime(Date.now() + minute * 60 * 1000));
      disptach(setOpen(true));
    }
  }

  return (
    <>
      <Shared.Container>
        <form onSubmit={onSubmit} className="flex flex-col gap-4 items-end">
          <div className="w-full">
            <label htmlFor="password">
              비밀번호
              <br />
              <span className="text-gray-400 text-sm">
                (※ 없어도 됩니다 )
              </span>
            </label>

            <Shared.Input
              name="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="w-full">
            <label htmlFor="number">
              설문 시간
              <br />
              <span className="text-purple-400 text-sm">
                (※분 단위로 작성해 주세요)
              </span>
            </label>

            <Shared.Input
              required
              type="number"
              value={minute}
              min={MIN_MINUTE}
              onChange={(e) => setMinute(Number(e.currentTarget.value))}
            />
          </div>

          <input type="submit" className="button-prime" value="Submit" />
        </form>

        {isSurveyExist && (
          <button onClick={() => disptach(setOpen(true))}>
            go to opened survey
          </button>
        )}
      </Shared.Container>

      <ConfirmModal />
    </>
  );
}
