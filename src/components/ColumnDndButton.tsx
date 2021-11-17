import { useDrag } from 'react-dnd';
import { COLUMN } from '../constants';
import { Column } from '../types';

type Props = {
  column: Column;
  onClick: (column: Column) => void;
};

const ColumnDndButton: React.FC<Props> = ({ column, onClick }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: column.function,
    item: column,
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<Column>();
      if (item && dropResult) {
        console.log(item);
        onClick(item);
      }
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId()
    })
  }));

  return (
    <button
      ref={drag}
      className={`m-2 px-4 py-2 rounded-lg border border-gray-700 flex justify-between items-center transition transform hover:-translate-y-1 hover:text-white ${
        isDragging ? 'opacity-50' : 'opacity-100'
      } ${
        column.function === COLUMN.DIMENSION ? 'bg-blue-800' : 'bg-pink-800'
      }`}
      key={column.name}
      onClick={() => onClick(column)}
    >
      <span>{column.name}</span>
      <span className="text-xs italic ml-4">
        {column.function === COLUMN.DIMENSION ? 'Dimension' : 'Measure'}
      </span>
    </button>
  );
};

export default ColumnDndButton;
