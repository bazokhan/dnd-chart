import { useDrop } from 'react-dnd';
import { COLUMN } from '../constants';
import { Column, ColumnData } from '../types';

type Props = {
  type: COLUMN;
  title: string;
  items: Column[] | ColumnData[];
  onClear: () => void;
};

const SelectBox: React.FC<Props> = ({ type, title, items, onClear }) => {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: type,
    drop: () => ({ name: 'Dustbin' }),
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  }));

  const isActive = canDrop && isOver;

  return (
    <div
      className={`w-full rounded-lg my-2 flex justify-between items-center px-4 py-2 ${
        isActive ? 'bg-gray-600' : 'bg-gray-900'
      } text-gray-400`}
    >
      <p className="text-xl mr-2">{title}</p>
      <div
        className="flex justify-end w-full mx-4 rounded-sm bg-gray-800 p-2 min-h-[40px]"
        ref={drop}
      >
        {items?.map((item: Column | ColumnData) => (
          <span
            className="flex items-center px-4 py-1 font-sm rounded-md mx-2 bg-gray-900"
            key={item.name}
          >
            {item.name}
          </span>
        ))}
      </div>
      {items?.length ? (
        <button
          className="font-xs flex justify-center items-center rounded-full bg-pink-500 text-white w-10 h-10 hover:bg-pink-800 transition"
          onClick={onClear}
        >
          x
        </button>
      ) : null}
    </div>
  );
};

export default SelectBox;
