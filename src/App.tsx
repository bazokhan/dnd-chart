import { useMemo, useState } from 'react';
import 'tailwindcss/tailwind.css';
import ColumnsSidebar from './components/ColumnsSidebar';
import ErrorMessage from './components/ErrorMessage';
import LineRechart from './components/LineRechart';
import Loading from './components/Loading';
import SelectBox from './components/SelectBox';
import { COLUMN } from './constants';
import { API_URL } from './constants/api_url';
import useFetch from './hooks/useFetch';
import MainLayout from './layouts/MainLayout';
import PlotterLayout from './layouts/PlotterLayout';
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

  const dimension = useMemo(
    () =>
      (data as ColumnData[])?.find(
        (col: ColumnData) => col.name === dimensionColumn?.name
      ),
    [data, dimensionColumn?.name]
  );

  const measures = useMemo(
    () =>
      (data as ColumnData[])?.filter((col: ColumnData) =>
        measureColumns?.map(mCol => mCol.name).includes(col.name)
      ),
    [data, measureColumns]
  );

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
    <MainLayout>
      <PlotterLayout>
        <ColumnsSidebar
          loading={columnsLoading}
          error={columnsError}
          data={columnsData as Column[]}
          onClick={(column: Column) => updateSelectedColumns(column)}
        />
        <div className="flex flex-col w-full px-8">
          <SelectBox
            title="Dimension:"
            items={dimensionColumn ? [dimensionColumn] : []}
            onClear={() => setDimensionColumn(null)}
          />
          <SelectBox
            title="Measures:"
            items={measureColumns}
            onClear={() => setMeasureColumns([])}
          />
          {error ? (
            <ErrorMessage error={error} />
          ) : loading ? (
            <Loading />
          ) : dimension ? (
            <div className="w-80 md:w-[600px] lg:w-[900px] h-80 border border-blue-800">
              <LineRechart
                XAxisName={dimension.name}
                YAxisName={measureColumns?.map(col => col.name).join(' / ')}
                dimension={dimension}
                measures={measures}
              />
            </div>
          ) : (
            <p className="px-8 py-16 font-2xl border border-dashed text-gray-400 text-center rounded-lg my-4">
              Please select columns
            </p>
          )}
        </div>
      </PlotterLayout>
    </MainLayout>
  );
};

export default App;
