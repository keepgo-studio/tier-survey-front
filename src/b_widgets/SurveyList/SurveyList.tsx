import React from 'react'
import Shared, { SharedApi } from '@shared';

export default async function SurveyList() {
  const data = await SharedApi.serverQuery("get-all-support-games", null);

  return (
    <ul>
      {data.map(item => (
        <li key={item['game-name']}>
          <button>
            Check Survey for {item['game-name']}
          </button>
        </li>
      ))}
    </ul>
  )
}
