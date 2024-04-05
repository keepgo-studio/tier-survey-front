"use client"

import React from 'react'
import { useSearchParams } from 'next/navigation';
import ErrorUser from './ErrorUser';
import UserInfo from './UserInfo';
import SurveyChart from './SurveyChart';
import SurveyTable from './SurveyTable';
import Champions from './Champions';

export default function LeagueOfLegendsStat() {
  const searchParam = useSearchParams(),
        hashedId = searchParam.get("hashedId");

  if (!hashedId) return (<ErrorUser />)

  return (
    <div className='p-6'>
      <UserInfo hashedId={hashedId} />
      <Champions hashedId={hashedId} />
      <SurveyChart hashedId={hashedId} />
      <SurveyTable hashedId={hashedId} />
    </div>
  )
}
