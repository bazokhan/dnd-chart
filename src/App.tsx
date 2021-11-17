import { useMemo, useState } from 'react';
import 'tailwindcss/tailwind.css';
import ErrorMessage from './components/ErrorMessage';
import Loading from './components/Loading';
import { API_URL, COLUMN } from './constants';
import useFetch from './hooks/useFetch';
import { Column, ColumnData, FetchOptions } from './types';

const App = () => {
  const [dimensionColumn, setDimensionColumn] = useState<Column | null>(null);
  const [measureColumns, setMeasureColumns] = useState<Column[]>([]);
  const options: FetchOptions = useMemo(
    () => ({
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // Example request body:
      // {
      //   "measures": ["Cost"],
      //   "dimension": "Product"
      //  }
      body: JSON.stringify({
        measures: measureColumns?.map(col => col.name),
        dimension: dimensionColumn?.name
      })
    }),
    [dimensionColumn, measureColumns]
  );

  const {
    data: columnsData,
    loading: columnsLoading,
    error: columnsError
  } = useFetch(`${API_URL}/columns`);

  const { data, loading, error } = useFetch(
    `${API_URL}/data`,
    options,
    // Skip executing the post request if the user hadn't selected any columns yet
    !dimensionColumn || !measureColumns?.length
  );

  console.log({ data, loading, error });
  console.log(columnsData, columnsLoading, columnsError);

  const updateSelectedColumns = (column: Column) => {
    if (column.function === COLUMN.DIMENSION) {
      // Selected dimension column has to be only one
      setDimensionColumn(column);
    } else if (column.function === COLUMN.MEASURE) {
      // Selected measure columns can be more than one
      // Remove the measure column if it exists, or add it to the array if it doesn't
      const hasColumn = measureColumns.find(col => col.name === column.name);
      if (!hasColumn) {
        // Push the clicked column
        setMeasureColumns([...measureColumns, column]);
      } else {
        // Return all but the clicked column
        setMeasureColumns(
          measureColumns.filter(col => col.name !== column.name)
        );
      }
    }
  };

  return (
    <div className="flex">
      <div className="flex flex-col">
        {columnsError ? (
          <ErrorMessage error={columnsError} />
        ) : columnsLoading ? (
          <Loading />
        ) : (
          columnsData?.map(column => (
            <button
              key={column.name}
              onClick={() => updateSelectedColumns(column as Column)}
            >
              {column.name}
            </button>
          ))
        )}
      </div>
      <div className="flex flex-col">
        <div>Dimension column {dimensionColumn?.name}</div>
        <div>
          Measure columns{' '}
          {measureColumns?.map(col => (
            <span key={col.name}>{col.name}</span>
          ))}
        </div>
        <div className="max-w-lg p-4">
          {error ? (
            <ErrorMessage error={error} />
          ) : loading ? (
            <Loading />
          ) : data?.length ? (
            data.map(col => (
              <div key={col.name}>
                <p className="font-bold underline">{col.name}</p>
                <p>{(col as ColumnData).values.join('-')}</p>
              </div>
            ))
          ) : (
            <p>Please select columns</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
