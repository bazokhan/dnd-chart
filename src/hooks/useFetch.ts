import { useEffect, useState } from 'react';
import { FetchOptions, FetchResponse } from '../types';

const defaultOptions: FetchOptions = { method: 'GET' };

const useFetch = (
  url: string,
  options: FetchOptions = defaultOptions,
  skip = false
): FetchResponse => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (skip) return;
    setLoading(true);
    fetch(url, options)
      .then(res => res.json())
      .then(res => {
        if (res?.error) {
          throw new Error(res.error);
        }
        setData(res);
      })
      .catch(err => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [options, skip, url]);

  return { data, loading, error };
};

export default useFetch;
