'use client'

import Entities from '@entities';
import Shared, { SharedApi, SharedUtils, SupportGameJsonItem } from '@shared'
import React, { useEffect, useReducer, useState } from 'react'
import GameList from '../GameList/GameList';
import Auth from '../Auth/Auth';
import Link from 'next/link';

type State = {
  gameInfo: SupportGameJsonItem | null;
  hashedId: string | null;
};

type StateReducerParamMap = {
  "select-game": { game: SupportGame | null; }
};

type StateReducerParamKeys = keyof StateReducerParamMap;

export default function SurveyList({
  gameList
}: {
  gameList: SupportGameJsonItem[];
}) {
  const hashedIdMap = Entities.hooks.useAppSelector(Entities.user.selectHashedId);

  function reducer<T extends StateReducerParamKeys>(state: State, action: { 
    type: T;
    payload: StateReducerParamMap[T];
  }) {
    switch(action.type) {
      case "select-game":
        const { game } = action.payload;
        const gameInfo = gameList.find(_g => _g['game-name'] === game) ?? null;
        
        state.gameInfo = gameInfo;
        state.hashedId = game ? hashedIdMap[game] : null;

        return { ...state };
      default: return state;
    }
  }

  const initState: State = { gameInfo: null, hashedId: null };
  const [state, dispatch] = useReducer(reducer, initState);

  return (
    <Shared.Frame type='large' className='!p-8 w-full max-w-2xl mx-auto'>
      <div className='text-sm uppercase flex items-center gap-2'>
        <div className='w-2 h-[1em] bg-purple'/>
        <span>select game to see survey</span>
      </div>

      <div className='h-4'/>

      <GameList onSelect={(game) => dispatch({ type: "select-game", payload: { game }})}/>

      <div className='h-8'/>

      <Shared.Frame className='!p-4 flex flex-col gap-4'>
        <h4 className="uppercase font-light text-xs text-bright-gray mb-2">
          survey info.
        </h4>

        {state.gameInfo ? <NavigateToStat gameInfo={state.gameInfo} hashedId={state.hashedId} /> : <p className='text-purple text-center text-sm p-2 uppercase font-bold'>- game not selected -</p>}
      </Shared.Frame>
    </Shared.Frame>
  )
}

function NavigateToStat({
  gameInfo,
  hashedId
}: {
  gameInfo: SupportGameJsonItem;
  hashedId: string | null;
}) {
  const [exist, setExist] = useState(false);
  const [createdAt, setCreatedAt] = useState(0);

  useEffect(() => {
    if (!hashedId) return;

      SharedApi.query("getSurvey", gameInfo['game-name'], { hashedId })
        .then(res => {
          if (res) {
            setCreatedAt(res.startTime);
            setExist(true);
          }
        });
  }, [gameInfo, hashedId])

  if (!exist) {
    return (
      <Shared.Frame className='!p-4'>
        <p className='text-center'>not found</p>
      </Shared.Frame>
    )
  }

  return (
    <Shared.Frame className='!p-4'>
      {hashedId ? (
        <div>
          <h4 className="uppercase font-light text-xs text-bright-gray">
            survey host info.
          </h4>

          <div className='h-2'/>

          <Shared.HostInfo gameInfo={gameInfo} hashedId={hashedId} />
          
          <div className='h-4'/>

          <div className="uppercase text-xs rounded-full border border-border py-2 px-3 bg-dark text-bright-gray flex gap-2 justify-center">
            <span>updated at</span>
            {createdAt && <span>{new Date(createdAt).toISOString().slice(0, 10)}</span>}
          </div>

          <div className='h-4'/>

          <div className='flex justify-end gap-2 flex-col sm:flex-row items-end'>
            <Link href={SharedUtils.generateHostQRUrl(gameInfo['game-name'])}>
              <Shared.Button className='bg-purple'>설문 다시하기</Shared.Button>
            </Link>
            <Link href={SharedUtils.generateStatUrl(hashedId, gameInfo["game-name"])}>
              <Shared.Button className='bg-blue'>설문 결과 보기</Shared.Button>
            </Link>
          </div>
        </div>
      ) : (
        <Shared.Frame type='small' className='!p-4 w-fit m-auto fcenter flex-col'>
          <h4 className='text-red bg-black rounded-full text-center w-full p-1 text-xs'>cannot found user</h4>

          <div className='h-4'/>

          <p className='text-sm uppercase'>sing in</p>

          <div className='h-6'/>

          <Auth game={gameInfo['game-name']} />
        </Shared.Frame>
      )}
    </Shared.Frame>
  )
}