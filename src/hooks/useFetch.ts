import { useEffect, useState } from 'react';
import { FetchOptions, FetchResponse } from '../types';

const defaultOptions: FetchOptions = { method: 'GET' };

// mock fetch
const fetch = (url: string, options: unknown): Promise<any> => {
  return new Promise((resolve, reject) => {
    if (url?.endsWith('columns')) {
      resolve({
        json: () => {
          return [
            {
              name: 'Product',
              function: 'dimension'
            },
            {
              name: 'Year',
              function: 'dimension'
            },
            {
              name: 'Country',
              function: 'dimension'
            },
            {
              name: 'Cost',
              function: 'measure'
            },
            {
              name: 'Revenue',
              function: 'measure'
            },
            {
              name: 'Units sold',
              function: 'measure'
            }
          ];
        }
      });
    } else if (url?.endsWith('data') && options) {
      resolve({
        json: () => {
          return [
            {
              name: 'Product',
              values: [
                'Diskette',
                'Memory Card',
                'HDTV Tuner',
                'Flat Panel Graphics Monitor',
                'Digital Camera',
                'Minitower Speaker',
                'Extension Cable',
                'Y Box'
              ]
            },
            {
              name: 'Cost',
              values: [333.08, 7.07, 10.77, 194.76, 13.18, 143.3, 20.2, 405]
            }
          ];
        }
      });
    } else {
      reject(new Error('Something went wrong'));
    }
  });
};

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
