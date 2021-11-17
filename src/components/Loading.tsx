const Loading: React.FC = () => (
  <div className="flex space-x-2 p-4">
    <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
    <div
      className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"
      style={{ animationDelay: '300ms' }}
    />
    <div
      className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"
      style={{ animationDelay: '600ms' }}
    />
  </div>
);

export default Loading;
