"use client";

import { QueryReturnType, query } from "@shared-inner/api/query";
import { useEffect, useState } from "react";

export default function useFetch<T extends AvailableQuery>(...queryParmas: Parameters<typeof query>) {
  const [data, setData] = useState<QueryReturnType<T>>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    query(...queryParmas)
      .then((res) => {
        if (isMounted) {
          setData(res);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [queryParmas]);

  return { data ,loading, error };
}
