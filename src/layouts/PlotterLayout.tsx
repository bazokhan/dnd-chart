import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

const PlotterLayout: React.FC = ({ children }) => (
  <DndProvider backend={HTML5Backend}>
    <div className="w-full h-full flex space-x-4">{children}</div>
  </DndProvider>
);

export default PlotterLayout;
