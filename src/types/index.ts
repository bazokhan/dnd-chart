export type Column = {
  name: string;
  function: string;
};

export type ColumnData = {
  name: string;
  values: string[] | number[];
};

export type FetchResponse = {
  loading: boolean;
  error: Error | null;
  data: Column[] | ColumnData[] | null;
};

export type FetchOptions = {
  method: 'GET' | 'POST';
  headers?: HeadersInit;
  body?: BodyInit;
};

export type DataPoint = Record<string, string | number>;
