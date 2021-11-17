import { COLUMN } from '../constants';
import { Column } from '../types';
import ErrorMessage from './ErrorMessage';
import Loading from './Loading';

type Props = {
  error?: Error | null;
  loading?: boolean;
  data?: Column[];
  onClick: (column: Column) => void;
};

const ColumnsSidebar: React.FC<Props> = ({ error, loading, data, onClick }) => (
  <div className="flex flex-col h-full bg-gray-900 text-gray-400">
    <h2 className="text-xl font-bold py-4 px-8 border-b border-gray-700">
      Columns
    </h2>
    {error ? (
      <ErrorMessage error={error} />
    ) : loading ? (
      <Loading />
    ) : (
      data?.map((column: Column) => (
        <button
          className="m-2 px-4 py-2 rounded-lg border border-gray-700 flex justify-between items-center hover:bg-gray-700 transition transform hover:-translate-y-1 hover:text-white"
          key={column.name}
          onClick={() => onClick(column)}
        >
          <span>{column.name}</span>
          <span className="text-xs italic ml-4">
            {column.function === COLUMN.DIMENSION ? 'Dimension' : 'Measure'}
          </span>
        </button>
      ))
    )}
  </div>
);

export default ColumnsSidebar;
