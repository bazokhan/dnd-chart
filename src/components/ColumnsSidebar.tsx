import { Column } from '../types';
import ColumnDndButton from './ColumnDndButton';
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
        <ColumnDndButton column={column} key={column.name} onClick={onClick} />
      ))
    )}
  </div>
);

export default ColumnsSidebar;
