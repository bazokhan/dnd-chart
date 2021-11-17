import { Column, ColumnData } from '../types';

type Props = {
  title: string;
  items: Column[] | ColumnData[];
  onClear: () => void;
};

const SelectBox: React.FC<Props> = ({ title, items, onClear }) => (
  <div className="w-full rounded-lg my-2 flex justify-between items-center p-4 bg-gray-900 text-gray-400">
    <p className="text-xl mr-2">{title}</p>
    <div className="flex">
      {items?.map((item: Column | ColumnData) => (
        <span
          className="flex items-center px-4 py-1 font-sm rounded-md mx-2 bg-gray-800"
          key={item.name}
        >
          {item.name}
        </span>
      ))}
      {items?.length ? (
        <button
          className="font-xs flex justify-center items-center rounded-full bg-pink-500 text-white w-10 h-10 hover:bg-pink-800 transition"
          onClick={onClear}
        >
          x
        </button>
      ) : null}
    </div>
  </div>
);

export default SelectBox;
