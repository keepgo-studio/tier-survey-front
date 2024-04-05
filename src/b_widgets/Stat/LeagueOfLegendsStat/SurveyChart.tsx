"use client"

import { LeagueOfLegendsChart, SharedApi } from '@shared';
import React, { useEffect, useState } from 'react'

export default function SurveyChart({
  hashedId
}: {
  hashedId: string;
}) {
  const [chartData, setChartData] = useState<LeagueOfLegendsChart | null>(null);

  useEffect(() => {
    SharedApi.query("get-chart", "league of legends", {
      hashedId
    }).then(chart => {
      if (!chart) return;
      console.log(chart)
      setChartData({...chart});
    });
  }, [hashedId]);

  if (!chartData) return <div />;

  return (
    <section>
      <p>Update at: {chartData.updateDate.toISOString()}</p>

      <p>Participants cnt: {chartData.participantCnt}</p>

      <pre>
        <code>
          {JSON.stringify(chartData.tierCnt, null, 2)}
        </code>
      </pre>

      <p>Total level: {chartData.totalLevel}</p>
    </section>
  )
}
