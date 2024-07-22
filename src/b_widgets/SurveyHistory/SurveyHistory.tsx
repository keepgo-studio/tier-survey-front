"use client"

import React, { useEffect, useReducer, useState } from 'react'
import Shared, { JoinedSurveyItem, SharedApi, SharedUtils, SupportGameJsonItem } from '@shared';
import Entities from '@entities';
import GameList from '../GameList/GameList';
import Link from 'next/link';
import Auth from '../Auth/Auth';
import Signout from '../Signout/Signout';

type State = {
  gameInfo: SupportGameJsonItem | null;
  hashedId: string | null;
};

type StateReducerParamMap = {
  "select-game": { game: SupportGame | null; }
};

type StateReducerParamKeys = keyof StateReducerParamMap;

export default function SurveyHistory({
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
        {state.gameInfo ? <JoinedSurvey gameInfo={state.gameInfo} hashedId={state.hashedId} /> : <p className='text-purple text-center text-sm p-2 uppercase font-bold'>- game not selected -</p>}
      </Shared.Frame>
    </Shared.Frame>
  )
}

function JoinedSurvey({
  gameInfo,
  hashedId
}: {
  gameInfo: SupportGameJsonItem;
  hashedId: string | null;
}) {
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState<JoinedSurveyItem[]>([]);

  useEffect(() => {
    if (!hashedId) return;

    setLoading(true);
    SharedApi.query("getJoinedSurvey", gameInfo["game-name"], { hashedId })
      .then(_list => setList(_list))
      .finally(() => setLoading(false));
  }, [gameInfo, hashedId]);

  if (!hashedId) return <Auth game={gameInfo['game-name']}/>;

  if (loading) return <Shared.Spinner />;

  return (
    <div className='p-2'>
      <h4 className="uppercase font-light text-xs text-bright-gray mb-2">
        logined accounts.
      </h4>

      <div className='grid grid-cols-[1fr_auto] items-center gap-2'>
        <Shared.HostInfo gameInfo={gameInfo} hashedId={hashedId} />
        <Signout game={gameInfo['game-name']} />
      </div>

      <div className='h-8'/>

      <h4 className="uppercase font-light text-xs text-bright-gray mb-2">
        joined survey list.
      </h4>

      <ul className='flex flex-col gap-4 max-h-[500px] overflow-y-auto'>
        {list.map((item) => (
          <li key={item.id}>
            <Shared.Frame className='!p-4'>
              {item.id === hashedId && <p className='px-3 py-1 text-xs bg-purple mb-2 w-fit float-right'>My survey</p>}

              <Shared.HostInfo gameInfo={gameInfo} hashedId={item.id} />
              
              <div className='h-2'/>

              <div className='flex items-center gap-2'>
                <div className="uppercase text-xs rounded-full border border-border py-2 px-3 bg-dark text-bright-gray fcenter gap-2 flex-1">
                  <span>joined at</span>
                  <span>{new Date(item.time).toISOString().slice(0, 10)}</span>
                </div>

                <Link href={SharedUtils.generateStatUrl(item.id, gameInfo['game-name'])} target='_blank'>
                  <Shared.Button className='bg-blue'>설문 보러 가기</Shared.Button>
                </Link>
              </div>
            </Shared.Frame>
          </li>
        ))}
      </ul>
    </div>
  );
}