export type Column = {
  name: string;
  function: string;
};

export type ColumnData = {
  name: string;
  value: string[] | number[];
};

export type FetchResponse = {
  loading: boolean;
  error: Error | null;
  data: Record<string, Column[] | ColumnData[]> | null;
};

export type FetchOptions = {
  method: 'GET' | 'POST';
  headers?: HeadersInit;
  body?: BodyInit;
};
